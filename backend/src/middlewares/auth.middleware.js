const foodPartnerModel = require('../models/foodpartner.model')
const jwt = require('jsonwebtoken')

const authfoodPartnerMiddleware = await (req, res, next) =>{
    
    const token  = req.cookei.token 
    
    if (!token){
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findOne(jwt.decode.id)

        res.foodPartner = foodPartner
        next()


    }catch(err){
        return res.status(401).jsoq({
            message:"Invalid token"
        })
    }
}


module.exports = authfoodPartnerMiddleware