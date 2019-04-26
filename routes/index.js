const { ROOT_URL_API } = require.main.require('./config')
const passport = require('passport')
require.main.require('./config/passport')

// @Import routes
const Auth = require('./api/auth')
const crawlYTB = require('./api/crawl-ytb')

// @Manager Group Routes
module.exports = app => {
  renderRoutesPublic('/', Auth)
  renderRoutes('/', crawlYTB)
  // renderRoutes('/history', History)
  // renderRoutes('/goal', Goal)
  /**
   *
   * @Function render routes
   * @param {*} pathAPI String
   * @param {*} routes routes
   */
  function renderRoutesPublic(pathAPI, routes) {
    app.use(ROOT_URL_API + pathAPI, routes)
  }

  function renderRoutes(pathAPI, routes) {
    app.use(
      ROOT_URL_API + pathAPI,
      passport.authenticate('jwt', { session: false }),
      routes
    )
  }
}
