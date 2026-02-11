const foodModel = require('../models/food.model')
const storageService = require('../services/storage.service')
const {v4:uuid} = require('uuid')

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

module.exports = {
    createFood,
    getFoodItems,
}