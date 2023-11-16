const Payment = require('../model/paymentModel')
const User = require('../model/userModel')

exports.newPayment = async (req, res) => {
    try {
        const {amount, membership, paymentId} = req.body.data
        const userId = req.body.userId
        const newPayment = new Payment({
            rate : amount,
            user: userId,
            memberShip : membership,
            paymentId: paymentId
        })
        await newPayment.save()
        res.status(200).json({message : 'Success'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'Internal server error'})
    }
}

exports.getPaymentHistory = async (req,res) => {
    try {
        const userId = req.body.userId
        const userData = await User.findById(userId)
        const paymentHistory = await Payment.find({user : userData._id}).populate('memberShip').populate('user')
        res.status(200).json({data :paymentHistory})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'Internal server error'})
    } 
}

exports.getFullPaymentHistory = async (req,res) => {
    try {
        const paymentHistory = await Payment.find({}).populate('memberShip').populate('user')
        res.status(200).json({data :paymentHistory})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'Internal server error'})
    } 
}