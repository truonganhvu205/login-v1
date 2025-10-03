const siteRouter = require('./site')
const AuthRouter = require('./auth')

function routes(app) {
    app.use('/user', AuthRouter)
    app.use('/', siteRouter)
}

module.exports = routes
