const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

exports.database = 
    mongoose.connect(process.env.mongoURL)
    .then(() => console.log('MongoDb server connected'))
    .catch((err) => console.log('MongoDb server not connected error: ', err))