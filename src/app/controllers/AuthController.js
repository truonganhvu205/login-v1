const Auth = require('../models/Auth')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 10

class SiteController {
    // GET /user/login
    login(req, res, next) {
        res.render('auth/main')
    }

    // Post /user/login/redirect-home
    async redirectHome(req, res, next) {
        const username = req.body.username
        const password = req.body.password
        
        const user = await Auth.findOne({username: username}).lean()
        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!user || !passwordMatch) {
            res.render('auth/main', {err: 'Your username or password is wrong!'})
            return
        }
        
        try{
            const accessToken = jwt.sign({username: user.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
            const refreshToken = jwt.sign({username: user.username}, process.env.REFRESH_TOKEN_SECRET)
            
            await Auth.updateOne({username: user.username}, {$set: {refreshToken}})
            res.redirect('/')
        } catch(err) {
            next(err)
        }
    }

    // POST /user/refresh-token
    refreshToken(req, res, next) {}

    // GET /user/register
    register(req, res, next) {
        res.render('auth/register')
    }
    
    // POST /user/register/stored
    async stored(req, res, next) {
        const password = req.body.password
        const hash = await bcrypt.hashSync(password, saltRounds)

        const user = new Auth({
            username: req.body.username, 
            password: hash,
        })
        
        user.save()
            .then(() => res.redirect('/user/login'))
            .catch(next)
    }

    // POST /user/logout
    logout(req, res, next) {}
}

module.exports = new SiteController()
