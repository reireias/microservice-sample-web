const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
const { Strategy } = require('passport-github2')
const bodyParser = require('body-parser')
const axios = require('axios')
const { Nuxt, Builder } = require('nuxt')

const userServiceBaseUrl = process.env.USER_SERVICE + '/v1'
const tweetServiceBaseUrl = process.env.TWEET_SERVICE + '/v1'
const app = express()

app.use(morgan('short'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto'
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL || 'http://localhost:3000/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(async () => {
        const params = {
          name: profile.username,
          avatarUrl: profile.photos[0].value
        }
        const result = await axios.put(
          `${userServiceBaseUrl}/users/loginUser`,
          params
        )
        return done(null, {
          _id: result.data._id,
          name: profile.username,
          avatarUrl: profile.photos[0].value
        })
      })
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})

app.get(
  '/api/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
)
app.get(
  '/api/auth/github/callback',
  passport.authenticate('github'),
  (req, res) => {
    res.json({ user: req.user })
  }
)
app.get('/api/auth/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
app.get('/api/session', (req, res) => {
  res.json({ user: req.user })
})

app.get('/api/timeline', (req, res, next) => {
  ;(async () => {
    const followsRes = await axios.get(
      `${userServiceBaseUrl}/users/${req.user._id}/follows`
    )
    const userMap = {}
    userMap[req.user._id] = req.user
    followsRes.data.forEach(follow => {
      userMap[follow._id] = follow
    })
    const userIds = Object.keys(userMap)
    const tweetsRes = await axios.post(
      `${tweetServiceBaseUrl}/timeline`,
      userIds
    )
    const timeline = tweetsRes.data.map(tweet => {
      const record = tweet
      record.name = userMap[tweet.userId].name
      record.avatarUrl = userMap[tweet.userId].avatarUrl
      return record
    })
    res.status(200).json(timeline)
  })().catch(next)
})

app.post('/api/tweets', (req, res, next) => {
  ;(async () => {
    const params = {
      userId: req.user._id,
      content: req.body.content
    }
    await axios.post(`${tweetServiceBaseUrl}/tweets`, params)
    res.status(200).json({})
  })().catch(next)
})

app.get('/api/users', (req, res, next) => {
  ;(async () => {
    const responses = await Promise.all([
      axios.get(`${userServiceBaseUrl}/users`),
      axios.get(`${userServiceBaseUrl}/users/${req.user._id}/follows`)
    ])
    const usersRes = responses[0]
    const followsRes = responses[1]
    const followIds = followsRes.data.map(follow => follow._id)
    const users = usersRes.data
      .filter(user => user._id !== req.user._id)
      .map(user => {
        user.follow = followIds.includes(user._id)
        return user
      })
    res.status(200).json(users)
  })().catch(next)
})

app.post('/api/follow', (req, res, next) => {
  ;(async () => {
    const followRes = await axios.post(
      `${userServiceBaseUrl}/users/${req.user._id}/follows`,
      { followId: req.body._id }
    )
    res.status(followRes.status).json({})
  })().catch(next)
})

app.delete('/api/follow', (req, res, next) => {
  ;(async () => {
    const followRes = await axios.delete(
      `${userServiceBaseUrl}/users/${req.user._id}/follows`,
      { params: { followId: req.query._id } }
    )
    res.status(followRes.status).json({})
  })().catch(next)
})

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
}
start()
