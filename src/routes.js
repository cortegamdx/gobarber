const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})
routes.get('/files/:file', FileController.show)

// rota login
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)
// rota cadastro
routes.get('/signup', guestMiddleware, UserController.create)

// Aplica o middleware para todas as rotas
// iniciadas com /app
routes.use('/app', authMiddleware)

// rota de logout
routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

// Enviar um arquivo pela rota usando a função single('fieldname')
routes.post('/signup', upload.single('avatar'), UserController.store)
module.exports = routes
