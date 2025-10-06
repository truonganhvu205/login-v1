require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function AuthMiddleware(req, res, next) {
    const authorizationToken = req.headers['authorization']
    const token = authorizationToken.split(' ')[1]

    if(!token) {
        res.sendStatus(401)
        return
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if(err) {
            res.sendStatus(403)
            return
        } else {
            req.user = data
            next()
        }
    })
}
