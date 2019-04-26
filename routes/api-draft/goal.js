const express = require('express')
const routes = express.Router()

const addGoal = require.main.require('./controllers/api/goal/add')
const updateGoal = require.main.require('./controllers/api/goal/update')
const deleteGoal = require.main.require('./controllers/api/goal/delete')
const getGoal = require.main.require('./controllers/api/goal/get')

routes.post('/', addGoal)
routes.put('/', updateGoal)
routes.delete('/', deleteGoal)
routes.get('/', getGoal)

module.exports = routes
