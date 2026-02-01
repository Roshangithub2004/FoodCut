const express = require('express')
const authControllers = require('../controllers/auth.controller')
const router = express.Router()

// User auth APIs
router.post('/user/register', authControllers.registerUser)
router.post('/user/login', authControllers.loginUser)
router.get('/user/logout', authControllers.logoutUser)

// foodPartner auth APIs
router.post('/foodPartnet/register', authControllers.registerFoodPartner)
router.post('/foodPartnet/login', authControllers.loginFoodPartner)
router.get('/foodPartnet/logout', authControllers.logouFoodPartner)

module.exports = router