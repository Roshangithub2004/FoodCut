const foodModel = require('../models/food.model')
const storageService = require('../services/storage.service')
const {v4:uuid} = require('uuid')
const likeModel = require('../models/likes.model')
const saveModel = require('../models/save.model')


const createFood = async (req, res) => {
    // console.log(req.foodPartner)
    // console.log(req.body)
    // console.log(req.file)

    const {name, description} = req.body
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
    

    // console.log(fileUploadResult)

    const foodItem = await foodModel.create({
        name,
        description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id 
    })
    res.status(201).json({
        message:"food created successfully",
        food: foodItem
    })
}

const getFoodItems = async (_req, res) =>{
    const foodItem = await foodModel.find({})
    res.status(200).json({
        message: "Food items featched successfully",
        foodItem
    })
    // console.log(foodItem)
}

const foodLike = async(req, res) => {
    const {foodId} = req.body
    const user = req.user

    const isFoodLicked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (!isFoodLicked){
        await likeModel.deleteOne({
            user:user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message:"Food unliked sucessfully"
        })
    }

    const like = await likeModel.create({
        user:user._id,
        food: foodId
    })
    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })
    res.status(401).json({
        message:"Food liked sucessfully",
        like
    })
}

const foodSave = async(req, res) => {
    const {foodId} = req.body
    const user = req.user

    const isFoodSaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (!isFoodSaved){
        await saveModel.deleteOne({
            user:user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { saveCount: -1 }
        })

        return res.status(200).json({
            message:"Food saved sucessfully"
        })
    }

    const save = await saveModel.create({
        user:user._id,
        food: foodId
    })
    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { saveCount: 1 }
    })
    res.status(401).json({
        message:"Food saved sucessfully",
        save
    })
}

module.exports = {
    createFood,
    getFoodItems,
    foodLike,
    foodSave

}