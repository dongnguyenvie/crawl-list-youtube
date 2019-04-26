const express = require('express')
const route = express.Router()


route.get('/test', (req, res) => {
    console.log(req)
    res.json({status: 'success'})
})

module.exports = route
