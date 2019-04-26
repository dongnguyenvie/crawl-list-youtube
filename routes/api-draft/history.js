const express = require('express')
const routes = express.Router()

const addHistory = require.main.require('./controllers/api/history/add')
const deleteHistory = require.main.require('./controllers/api/history/delete')
const updateHistory = require.main.require('./controllers/api/history/update')
const getSpend = require.main.require('./controllers/api/history/getSpend')
const getIncome = require.main.require('./controllers/api/history/getIncome')

routes.post('/', addHistory)
routes.delete('/', deleteHistory)
routes.put('/', updateHistory)
// get history of spend
routes.get('/spend', getSpend)
routes.get('/income', getIncome)

module.exports = routes
