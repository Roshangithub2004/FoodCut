const mongoose = require('mongoose')

const connectDB = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("database is connected")
    })
    .catch((err)=>{
        console.log("problem in database connection ", err)
    })
}

module.exports = connectDB