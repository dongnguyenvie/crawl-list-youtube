const jwt = require('jsonwebtoken')
const { ExtractJwt } = require('passport-jwt')
const { TIME_EXISTS_TOKEN, SECRET } = require('./')

const timeOut = hour => {
  const now = Date.now() / 1000
  const oneHour = 3600
  return now + oneHour * hour
}

module.exports = {
  createdToken(user) {
    const { _id, name, email, userName } = user
    const payload = { _id, name, email, userName }
    return jwt.sign(payload, SECRET)
  },
  checkTokenExpire({ iat }) {
    // console.log(iat)
    return timeOut(TIME_EXISTS_TOKEN) <= iat ? false : true
  },
  JWTStrateyOption: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
  },
}
