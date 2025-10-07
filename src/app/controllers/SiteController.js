const Auth = require('../models/Auth')

class SiteController {
    // GET /
    index(req, res, next) {
        res.render('home')
    }

    // GET /homepage-2
    homepage2(req, res, next) {
        const username = req.cookies.username
        res.render('home2', {username})
    }
}

module.exports = new SiteController()
