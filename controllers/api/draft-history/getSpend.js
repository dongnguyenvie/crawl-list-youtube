const historyModel = require.main.require('./models/history')

module.exports = (req, res) => {
  const { _id } = req.user
  const { page } = req.query
  let currentPage = 1
  const perPage = 50

  if (page) {
    currentPage = page
  }

  try {
    historyModel
      .find({ user: _id, status: 0 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function(err, rs) {
        historyModel.countDocuments().exec(function(err, count) {
          if (err) return res.json(err)
          let result = {
            data: rs,
            page: currentPage,
            totalPage: Math.ceil(count / perPage),
            limit: perPage
          }
          return err ? res.status(500).json(err) : res.json(result)
        })
      })
  } catch (error) {
    res.status(400).json({ status: 'false' })
  }
}
