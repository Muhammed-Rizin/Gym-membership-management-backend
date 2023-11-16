const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const User = require('../model/userModel')

exports.userLogin = async (req, res) => {
    try {
        const { email } = req.body

        const userData = await User.findOne({ email: email })
        if (!userData) {
            return res.status(404).json({ message: 'User not Found' })
        }
        const password = await bcrypt.compare(req.body.password, userData.password)
        if (!password) {
            return res.status(400).json({ message: 'Password Is incorrect' })
        }

        const token = jwt.sign({ _id: userData._id }, process.env.jwtSecret)
        await User.findByIdAndUpdate(userData._id, { token: token })
        const data = await User.findById(userData._id)

        res.status(201).json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.userRegister = async (req, res) => {
    try {
        const { password, email, name } = req.body

        const alreadyData = await User.findOne({ email: email })
        if (alreadyData) {
            return res.status(409).json({ message: 'Email already registered' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userData = new User({
            name: name,
            password: hashedPassword,
            email: email,
        })

        const result = await userData.save()
        const { _id } = await result.toJSON()

        const token = jwt.sign({ _id: _id }, process.env.jwtSecret)
        await User.findByIdAndUpdate(result._id, { token: token })
        const data = await User.findById(result._id)

        res.status(201).json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const token = req.query.token 
        const userData = await User.findOne({token : token })

        res.status(200).json({data : userData})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.getUserList = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $lookup: {
                    from: 'payments', 
                    localField: '_id',
                    foreignField: 'user',
                    as: 'payments'
                }
            },
            {
                $lookup: {
                    from: 'memberships',
                    localField: 'payments.memberShip',
                    foreignField: '_id',
                    as: 'memberships'
                }
            },
            {
                $sort : {
                    _id : -1
                }
            }
        ])
        res.status(200).json({ users })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
}