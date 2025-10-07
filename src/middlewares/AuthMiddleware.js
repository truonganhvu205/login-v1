require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function AuthMiddleware(req, res, next) {
    // const authorizationToken = req.headers['authorization']
    // const token = authorizationToken && authorizationToken.split(' ')[1]
    const token = req.cookies.accessToken

    if(!token) {
        res.sendStatus(401)
        return
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) {
            res.sendStatus(403)
            return
        } else {
            req.user = data
            next()
        }
    })
}
