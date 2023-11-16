const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const Admin = require('../model/adminModel')
exports.adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        const adminData = await Admin.findOne({email : email})
        if(!adminData){
            return res.status(404).json({message : 'Email or password is wrong'})
        }

        if(adminData.password != password){
            return res.status(400).json({message : 'Email or password is wrong'})
        }

        const token = jwt.sign({_id : adminData._id}, process.env.jwtSecret)
        await Admin.findOneAndUpdate({_id : adminData._id}, { token: token });
        res.status(201).json({token})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'Internal server error'})
    }
}