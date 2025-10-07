module.exports = function usernameAuth(req, res, next) {
    res.locals.username = req.cookies.username
    next()
}
