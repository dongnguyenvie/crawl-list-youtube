const express = require('express')
const routes = express.Router()

const register = require.main.require('./controllers/api/users/register')
const login = require.main.require('./controllers/api/users/login')

routes.post('/login', login)
routes.post('/register', register)

module.exports = routes