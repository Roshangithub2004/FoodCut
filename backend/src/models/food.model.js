const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({

    name:{
        type:String,
        reqiure:true
    },

    video:{
        type:String,
        reqiure:true
    },

    descriptions:{
        type:String,

    },

    foodPartner:{
        type:String,
        ref:"foodPartner"
    }

})

foodModel = mongoose.model("food", foodSchema)
module.exports = foodModel