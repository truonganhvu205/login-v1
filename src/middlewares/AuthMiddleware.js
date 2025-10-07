const Auth = require('../app/models/Auth')
require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function AuthMiddleware(req, res, next) {
    let accessToken = req.cookies.accessToken

    if(!accessToken) {
        res.redirect('/user/login')
        return
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if(err) {
            const refreshToken = req.cookies.refreshToken
            const refreshTokenDb = await Auth.findOne({refreshToken: refreshToken})

            if(!refreshToken) {
                return res.sendStatus(403)
            }

            if(!refreshTokenDb) {
                return res.sendStatus(403)
            }

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
                if(err) {
                    return res.sendStatus(403)
                }

                accessToken = jwt.sign({username: data.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'})
                
                res.cookie('accessToken', accessToken, {httpOnly: true, maxAge: 5 * 60 * 1000 })
                req.user = data
                return next()
            })
        } else {
            req.user = data
            return next()
        }
    })
}
