require('dotenv').config()

const ROOT_URL_API = '/api/v1'
const TIME_EXISTS_TOKEN = process.env.TIME_EXISTS_TOKEN
const SECRET = process.env.SECRET

module.exports = {
    ROOT_URL_API,
    TIME_EXISTS_TOKEN,
    SECRET
}