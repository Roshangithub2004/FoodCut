const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'food',
        required:true
    },

    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodpartner",
    },

    likeCount:{
        type:Number,
        default:0
    }

},{timeseries:true})

const likeModel = mongoose.model('like', likeSchema)
module.exports = likeModel