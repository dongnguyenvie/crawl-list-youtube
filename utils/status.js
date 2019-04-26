const index = (_, res) => {
  res.json({ status: 'API WORKED' })
}

module.exports = app => {
  app.use('/', (req, res) => {
    res.send('Contact me: DongNguyenVie@gmail.com')
  })
}
