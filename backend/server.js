const app = require('./src/app.js')
const connectDB = require('./src/db/db.js')
require('dotenv').config()

const PORT = process.env.PORT

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`app started listening on port : ${PORT}`)
        })
    } catch (error) {
        console.error('server startup failed', error)
        process.exit(1)
    }
}

startServer()
