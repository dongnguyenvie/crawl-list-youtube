const express = require('express')
const routes = express.Router()

const crawlYTB = require.main.require('./controllers/api/crawl-ytb/')

routes.post('/crawl-ytb', crawlYTB)

module.exports = routes