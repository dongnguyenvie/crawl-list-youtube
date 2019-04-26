const { Schema, model } = require('mongoose')

const modelName = 'goal'

const goalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: String,
  duration: String,
  milestone: String,
  isCompoleted: Boolean,
})

module.exports = model(modelName, goalSchema, modelName)