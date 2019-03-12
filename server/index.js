const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
const { Strategy } = require('passport-github2')
const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')
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
      process.nextTick(() => {
        const name = profile.username
        const avatarUrl = profile.photos[0].value
        // TODO: create or update user data
        return done(null, {
          _id: 'dummy',
          name: name,
          avatarUrl: avatarUrl
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
