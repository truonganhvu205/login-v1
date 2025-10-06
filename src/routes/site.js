const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/AuthMiddleware')

const siteController = require('../app/controllers/SiteController')

router.get('/:slug', authMiddleware, siteController.homepage2)
router.get('/', siteController.index)

module.exports = router
