const foodPartnerModel = require("../models/foodpartner.model")
const foodModel = require("../models/food.model")

const getFoodPartnerById = async (req, res) => {
    const { id } = req.params

    const foodPartner = await foodPartnerModel.findById(id)
    const foodItemsByFoodPartner = await foodModel.find({foodPartner:id})

    if (!foodPartner) {
        return res.status(404).json({
            message: "Food partner not found"
        })
    }

    return res.status(200).json({
        message: "Food partner received successfully",
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems:foodItemsByFoodPartner
        }
    })
}

module.exports = {
    getFoodPartnerById
}
