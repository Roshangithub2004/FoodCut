const express = require('express')
const commentController = require('../controllers/comment.controller')
const authMiddlewares = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/', authMiddlewares.authUserMiddleware, commentController.createComment)
router.get('/food/:foodId', authMiddlewares.authUserMiddleware, commentController.getFoodComments)
router.delete('/:commentId', authMiddlewares.authUserMiddleware, commentController.deleteComment)

module.exports = router
