const express = require('express')
const app = express()
const path = require('path')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config({ path: path.join(__dirname, 'config/config.env') })
const port = process.env.PORT || 5000
const cors = require('cors')

connectDB()

app.use(express.json())
app.use(cors())

const formRouter = require('./routers/formRouter')
app.use('/api/v1/form', formRouter)


const errorMiddleware = require('./middleware/error')
app.use(errorMiddleware)
app.listen(port, () => {
    console.log(`Server Running on ${port}`)
})