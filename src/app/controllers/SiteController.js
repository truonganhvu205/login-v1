const Auth = require('../models/Auth')

class SiteController {
    // GET /
    index(req, res, next) {
        res.render('home')
    }

    // GET /homepage-2
    homepage2(req, res, next) {
        res.render('home2')
    }
}

module.exports = new SiteController()
