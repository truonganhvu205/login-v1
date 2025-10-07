const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/AuthController')

router.post('/logout', authController.logout)

router.post('/register/stored', authController.stored)
router.get('/register', authController.register)

router.post('/login/refresh-token', authController.refreshToken)

router.post('/login/redirect-main', authController.redirectHome)
router.get('/login', authController.login)

module.exports = router
