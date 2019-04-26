const mongoose = require('mongoose')
const option = { useNewUrlParser: true, useFindAndModify: false }

const mongooseConfig = URI => {
  mongoose.connect(URI, option)
  const { connection: db } = mongoose
  db.on('error', () => console.log('Fail to connect with MongoDB'))
  db.once('open', () => console.log('MongoDB connected success'))
}

module.exports = mongooseConfig
