const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const config = require('./config/database')
config.database
const app = express()

const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')

app.use(express.json())
app.use(cors({
    credentials: true,
    origin : process.env.origin,
    methods : "GET,PUT,PATCH,POST,DELETE"
}))

app.use('/user', userRoute)
app.use('/admin', adminRoute)

app.listen(5000, () => console.log('server running on port 5000'))
