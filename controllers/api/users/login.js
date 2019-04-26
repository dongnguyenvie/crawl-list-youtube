const passport = require('passport')
const message = require.main.require('./config/message')
const { createdToken } = require.main.require('./config/token')

module.exports = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log(err)
    if (err || !user) {
      return res.status(400).json({
        message: message.LOGIN_ERROR,
        user: info,
      })
    }
    req.login(user, { session: false }, err => {
      if (err)
        return res.status(400).json({
          message: message.LOGIN_ERROR,
          user: info,
        })
    })
    const token = createdToken(user)
    return res.json({ accessToken: token })
  })(req, res)
}
