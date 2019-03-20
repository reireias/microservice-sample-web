require('browser-env')()
const hooks = require('require-extension-hooks')
const Vue = require('vue')
const Vuex = require('vuex')
const Vuetify = require('vuetify')

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.config.productionTip = false
// MEMO: bug https://github.com/prettier/prettier/issues/5018
window.Date = global.Date = Date

hooks('vue')
  .plugin('vue')
  .push()
hooks(['vue', 'js'])
  .plugin('babel')
  .push()
