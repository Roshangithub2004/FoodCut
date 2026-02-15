const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('database is connected')
    } catch (err) {
        console.error('problem in database connection', err)
        throw err
    }
}

module.exports = connectDB
