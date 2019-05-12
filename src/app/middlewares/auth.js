module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // transforma em uma variavel global que
    // pode ser usada em toda aplicação
    res.locals.user = req.session.user
    return next()
  }
  return res.redirect('/')
}
