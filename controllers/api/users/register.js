const userModel = require.main.require('./models/user')
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
  const {
    name,
    userName,
    email,
    password,
  } = req.body

  const checker = await userModel.findOne({ email })
  if (checker)
    return res.status(400).json({ message: 'Email already exists! ' })

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  // Save new user
  const newUser = new userModel({
    name,
    userName,
    email,
    password: hashPassword,
  })
  const userSave = await newUser.save()
  res.json(userSave)
}
