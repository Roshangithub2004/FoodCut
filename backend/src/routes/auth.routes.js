const express = require('express')
const authControllers = require('../controllers/auth.controllers')
const router = express.Router()


router.post('/user/register', authControllers.registerUser)
router.post('/user/login', authControllers.loginUser)
router.get('/user/logout', authControllers.logoutUser)


module.exports = router