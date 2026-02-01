const express  = require('express')
const foodController = require('../controllers/food.controller')
const authMiddlewares = require ('../middlewares/auth.middleware')

const multer = require('multer')
router = express.Router()

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

module.exports = router