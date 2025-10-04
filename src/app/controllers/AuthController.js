const Auth = require('../models/Auth')

class SiteController {
    // GET /user/login
    login(req, res, next) {
        res.render('auth/main')
    }

    // Post /user/login/redirect-main
    redirectMain(req, res, next) {}

    // GET /user/register
    register(req, res, next) {
        res.render('auth/register')
    }
    
    // POST /user/register/stored
    stored(req, res, next) {
        const user = new Auth(req.body)
        
        user.save()
            .then(() => res.redirect('/user/login'))
            .catch(next)
    }

    // POST /user/logout
}

module.exports = new SiteController()
