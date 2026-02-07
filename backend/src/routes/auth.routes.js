const express = require('express')
const authControllers = require('../controllers/auth.controller')
const router = express.Router()

// User auth APIs
router.post('/user/register', authControllers.registerUser)
router.post('/user/login', authControllers.loginUser)
router.get('/user/logout', authControllers.logoutUser)

// foodPartner auth APIs
router.post('/food-partner/register', authControllers.registerFoodPartner)
router.post('/food-partner/login', authControllers.loginFoodPartner)
router.get('/food-partner/logout', authControllers.logouFoodPartner)

module.exports = router