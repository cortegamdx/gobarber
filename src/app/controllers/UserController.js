const { User } = require('../models')

class UserController {
  // retorna a view
  create (req, res) {
    return res.render('auth/signup')
  }
  async store (req, res) {
    const { filename: avatar } = req.file

    await User.create({ ...req.body, avatar })

    return res.redirect('/')
  }
}

module.exports = new UserController()
