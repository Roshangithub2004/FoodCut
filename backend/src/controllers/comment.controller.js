const mongoose = require('mongoose')
const commentModel = require('../models/comment.model')
const foodModel = require('../models/food.model')

const createComment = async (req, res) => {
    try {
        const { foodId, comment } = req.body

        if (!foodId || !mongoose.Types.ObjectId.isValid(foodId)) {
            return res.status(400).json({ message: 'Invalid foodId' })
        }

        if (!comment || !comment.trim()) {
            return res.status(400).json({ message: 'Comment is required' })
        }

        const food = await foodModel.findById(foodId)
        if (!food) {
            return res.status(404).json({ message: 'Food not found' })
        }

        const createdComment = await commentModel.create({
            user: req.user._id,
            food: foodId,
            comment: comment.trim()
        })

        return res.status(201).json({
            message: 'Comment added successfully',
            comment: createdComment
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getFoodComments = async (req, res) => {
    try {
        const { foodId } = req.params

        if (!foodId || !mongoose.Types.ObjectId.isValid(foodId)) {
            return res.status(400).json({ message: 'Invalid foodId' })
        }

        const comments = await commentModel
            .find({ food: foodId })
            .populate('user', 'fullName email')
            .sort({ createdAt: -1 })

        return res.status(200).json({ comments })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params

        if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: 'Invalid commentId' })
        }

        const comment = await commentModel.findById(commentId)
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' })
        }

        if (String(comment.user) !== String(req.user._id)) {
            return res.status(403).json({ message: 'You can only delete your own comment' })
        }

        await commentModel.deleteOne({ _id: commentId })

        return res.status(200).json({ message: 'Comment deleted successfully' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createComment,
    getFoodComments,
    deleteComment
}
