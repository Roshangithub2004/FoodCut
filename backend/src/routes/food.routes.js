const express  = require('express')
const foodController = require('../controllers/food.controller')
const authMiddlewares = require ('../middlewares/auth.middleware') 

const multer = require('multer')
const { route } = require('./food-partner.routes')
const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
}) 

router.post('/',
    authMiddlewares.authfoodPartnerMiddleware,
    upload.single('video'),
    foodController.createFood)


router.get('/',
    authMiddlewares.authUserMiddleware,
    foodController.getFoodItems
)

router.post('/like',
    authMiddlewares.authUserMiddleware,
    foodController.foodLike)

router.post('/save',
    authMiddlewares.authUserMiddleware,
    foodController.foodSave)

module.exports = router