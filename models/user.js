const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const modelName = 'users'

const userSchema = new Schema({
  name: String,
  email: String,
  userName: String,
  password: String,
})

module.exports = model(modelName, userSchema, modelName)

module.exports.comparePassword = (password, passwordRemote) => {
  console.log(password, passwordRemote)
  return bcrypt.compareSync(password, passwordRemote)
}
