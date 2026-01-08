const mongoose = require('mongoose')

const foodPartnerSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
    },

    email:{
        type:String,
        unique:true,
        require:true
    },

    password:{
        type:String
    },
}, timestamps = true)

const foodPartnerModel = mongoose.model("foodPartner", foodPartnerSchema)

module.exports = foodPartnerModel

