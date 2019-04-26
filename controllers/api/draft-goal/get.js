const goalSchema = require.main.require('./models/goal')

module.exports = (req, res) => {
  const { _id } = req.user
  const { page, isCompoleted } = req.query
  let currentPage = 1
  const perPage = 50
  const compoleted = {}

  if (page) {
    currentPage = page
  }

  if (isCompoleted === '0' || isCompoleted === '1') {
    console.log(isCompoleted)

    compoleted.isCompoleted = isCompoleted
  }

  try {
    goalSchema
      .find({ user: _id, ...compoleted })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function(err, rs) {
        goalSchema.countDocuments().exec(function(err, count) {
          if (err) return res.json(err)
          let result = {
            data: rs,
            page: currentPage,
            totalPage: Math.ceil(count / perPage),
            limit: perPage,
          }
          return err ? res.status(500).json(err) : res.json(result)
        })
      })
  } catch (error) {
    res.status(400).json({ status: 'false' })
  }
}
