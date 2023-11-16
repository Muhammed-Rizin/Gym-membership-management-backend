const express = require('express')
const adminRoute = express()
const adminController = require('../controller/adminController')
const userController = require('../controller/userController')
const membershipController = require('../controller/membershipController')
const paymentController = require('../controller/paymentController')
const middleware = require('../middleware/auth')

adminRoute.post('/login', adminController.adminLogin)
adminRoute.get('/users', userController.getUserList)

adminRoute.post('/add_facility', middleware.verify,  membershipController.addFacility)
adminRoute.get('/facilities', middleware.verify,  membershipController.getFacilities)

adminRoute.post('/add_membership',middleware.verify,  membershipController.addMemberShip)
adminRoute.get('/memberships', middleware.verify,  membershipController.getMemberShips)
adminRoute.get('/membership_detail', middleware.verify, membershipController.getMemberShipDetails)
adminRoute.patch('/edit_membership', middleware.verify, membershipController.updateMemberShip)

adminRoute.get('/payments', middleware.verify, paymentController.getFullPaymentHistory)

module.exports = adminRoute