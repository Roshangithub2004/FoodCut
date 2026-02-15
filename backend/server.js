const { default: mongoose } = require('mongoose')
const app = require('./src/app.js')
const connectDB = require('./src/db/db.js')
require('dotenv').config()

connectDB()
app.listen(3000, ()=>{
    console.log("app started listening on port : 3000")
})