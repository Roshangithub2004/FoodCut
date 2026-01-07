const mongoose = require('mongoose')

const foodPartnerSchema = new mongoose.Schema({
    name:{
        type:Strint,
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
})

const foodPartnerModel = mongoose.model("foodPartnet", foodPartnerSchema)

module.exports = foodPartnerModel

