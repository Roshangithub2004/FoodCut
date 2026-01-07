const {mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    }, 
    password:{
        type:String
    },

}, {
    timestamps:true
    }
)

const userModel = mongoose.model('User', userSchema) 
module.exports = userModel