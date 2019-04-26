const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../models/user')
const { Strategy: JWTStrategy } = require('passport-jwt')
const { JWTStrateyOption, checkTokenExpire } = require('./token')

// @Middleware check token
passport.use(
  new JWTStrategy(JWTStrateyOption, async (jwtPayload, done) => {
    if (!checkTokenExpire(jwtPayload)) done(null, false)
    done(null, jwtPayload)
  })
)

// @Login
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, passport, done) => {
      const user = await userModel.findOne({ email })
      console.log(user)
      if (!user) {
        return done(null, false, {
          errors: { 'email or password': 'is invalid' },
        })
      }
      if (!userModel.comparePassword(passport, user.password)) {
        return done(null, false, {
          errors: { 'email or password': 'is invalid' },
        })
      }
      return done(null, user)
    }
  )
)
