const express = require('express')
const session = require('express-session')
const LokiStore = require('connect-loki')(session)
const nunjucks = require('nunjucks')
const path = require('path')
const flash = require('connect-flash')

class App {
  constructor () {
    this.express = express()
    // valid if the application is in dev ambient
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }
  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    this.express.use(
      session({
        store: new LokiStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions', 'sessions.db')
        }),
        name: 'root',
        // criptografar a sessão
        secret: 'MyAppSecret',
        resave: true,
        saveUninitialized: true
      })
    )
  }
  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      autoescape: this.isDev,
      express: this.express,
      watch: true
    })
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }
  routes () {
    this.express.use(require('./routes'))
  }
}
module.exports = new App().express
