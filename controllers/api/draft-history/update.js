const historyModel = require.main.require('./models/history')

module.exports = async (req, res) => {
  const { id, date, title, money, status } = req.body

  try {
    const updateHistory = await historyModel.findOneAndUpdate(
      { _id: id },
      { date, title, money, status }
    )
    res.json(updateHistory)
  } catch (error) {
    res.status(400).json({ status: 'false' })
  }
}
