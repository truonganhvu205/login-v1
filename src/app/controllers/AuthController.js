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
    
    // POST /user/register/stored
    stored(req, res, next) {
        const user = new Auth(req.body)
        
        user.save()
            .then()
            .catch(next)
    }
}

module.exports = new SiteController()
