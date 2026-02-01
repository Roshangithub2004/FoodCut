const foodPartnerModel = require('../models/foodpartner.model')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const authfoodPartnerMiddleware = async (req, res, next) =>{
    
    const token  = req.cookies.token 
    
    if (!token){
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findOne({_id:decoded.id})

        req.foodPartner = foodPartner
        next()


    }catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

const authUserMiddleware = async (req, res, next)=>{

    const token = req.cookies.token

    if (!token){
        return res.status(401).json({
            message: "Please Login First"
        })

    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findOne({_id:decoded.id})
        req.user = user
        next()
        
    }catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
        
    
}


module.exports = {
    authfoodPartnerMiddleware,
    authUserMiddleware
}