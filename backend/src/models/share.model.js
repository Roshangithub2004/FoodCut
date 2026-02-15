const mongoose = require('mongoose')

const shareSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'food',
        required:true
    },
    platform: {
        type: String,
        default: "copylink"
    },

}, {timestamps:true})

const shareModel = mongoose.model('share', shareSchema)

module.exports = {
    shareModel
}