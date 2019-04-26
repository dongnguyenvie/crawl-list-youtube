const goalSchema = require.main.require('./models/goal')

module.exports = async (req, res) => {
  const { id, title, duration, milestone, isCompoleted } = req.body

  try {
    const updateGoal = await goalSchema.findOneAndUpdate(
      { _id: id },
      { title, duration, milestone, isCompoleted }
    )
    res.json(updateGoal)
  } catch (error) {
    res.status(400).json({ status: 'false' })
  }
}
