const goalSchema = require.main.require('./models/goal')

module.exports = async (req, res) => {
  const {
    user: { _id },
    body: { title, duration, milestone, isCompoleted },
  } = req

  const newGoal = new goalSchema({
    user: _id,
    title,
    duration,
    milestone,
    isCompoleted,
  })

  try {
    const goalSaved = await newGoal.save()
    res.json(goalSaved)
  } catch (error) {
    res.status(400).json({ status: 'false' })
  }
}
