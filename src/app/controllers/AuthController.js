const Auth = require('../models/Auth')

class SiteController {
    // GET /user/login
    login(req, res, next) {
        res.render('auth/main')
    }

    // GET /user/register
    register(req, res, next) {
        res.render('auth/register')
    }
    
    // // POST /user/register/stored
    // register(req, res, next) {
    //     res.render('auth/main')
    // }
}

module.exports = new SiteController()
