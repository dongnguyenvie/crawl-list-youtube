const { Schema, model } = require('mongoose')

const modelName = 'history'

const historySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  date: String,
  title: String,
  money: String,
  status: Boolean
})

module.exports = model(modelName, historySchema, modelName)