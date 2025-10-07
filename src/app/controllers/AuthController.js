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
        const {username, password} = req.body
        const user = await Auth.findOne({username: username}).lean()
        
        if(!user) {
            res.render('auth/main', {err: 'Your username or password is wrong! or not exist yet.'})
            return
        }
        
        const passwordMatch = bcrypt.compare(password, user.password)

        if(!passwordMatch) {
            res.render('auth/main', {err: 'Your username or password is wrong! or not exist yet.'})
            return
        }
        
        try{
            const accessToken = jwt.sign({username: user.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'})
            const refreshToken = jwt.sign({username: user.username}, process.env.REFRESH_TOKEN_SECRET)
            
            await Auth.updateOne({username: user.username}, {$set: {refreshToken}})

            res.cookie('username', username, {httpOnly: true})
            res.cookie('accessToken', accessToken, {httpOnly: true, maxAge: 5 * 60 * 1000 })
            res.cookie('refreshToken', refreshToken, {httpOnly: true})
            res.redirect('/')
        } catch(err) {
            next(err)
        }
    }

    // GET /user/register
    register(req, res, next) {
        res.render('auth/register', {showHeader: false})
    }
    
    // POST /user/register/stored
    async stored(req, res, next) {
        try {
            const {username, password} = req.body
            const hash = bcrypt.hashSync(password, saltRounds)

            const userExist = await Auth.findOne({username}).lean()

            if(userExist) {
                res.render('auth/register', {err: 'This username exists! Please choose another one.'})
            } else {
                const user = new Auth({
                    username: username, 
                    password: hash,
                })
                await user.save()
                
                res.redirect('/user/login')
            }
        } catch(err) {
            next(err)
        }
    }

    // POST /user/logout
    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken
            await Auth.updateOne({refreshToken: refreshToken}, {$set: {refreshToken: null}})

            res.clearCookie('username')
            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')
            res.redirect('/')
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new SiteController()
