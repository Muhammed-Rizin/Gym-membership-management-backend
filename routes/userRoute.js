const express = require('express')
const userRoute = express()
const userController = require('../controller/userController')
const membershipController = require('../controller/membershipController')
const paymentController = require('../controller/paymentController')
const middleware = require('../middleware/auth')

userRoute.post('/login', userController.userLogin)
userRoute.post('/register', userController.userRegister)

userRoute.get('/user_details', userController.getUserDetails)

userRoute.get('/memberships',membershipController.getMemberShipsForUser)

userRoute.post('/payment', middleware.verify, paymentController.newPayment)
userRoute.get('/get_user_payments', middleware.verify, paymentController.getPaymentHistory)


module.exports = userRoute