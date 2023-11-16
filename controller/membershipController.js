const Facility = require('../model/facilityModel')
const MemberShip = require('../model/membershipModel')
const mongoose = require('mongoose')

exports.addFacility = async (req,res) => {
    try {
        const data = req.body.data
        const newFacility = new Facility({
            facility : data
        })
        
        newFacility.save()
        res.status(200).json({message :' Success'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'Internal server error'})
    }
}

exports.getFacilities = async (req,res) => {
    try {
        const data = await Facility.find()
        res.status(200).json({data})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'Internal server error'})
    }
}

exports.addMemberShip = async (req,res) => {
    try {
        const data = req.body.data
        const newMemberShip = new MemberShip({
            rate : data.rate,
            operationHours : data.operationHours,
            expire : data.expire,
            facilities : data.facilities
        })

        await newMemberShip.save()

        res.status(200).json({message : 'Success'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'Internal server error'})
    }
}

exports.getMemberShips = async (req, res) => {
    try {
        const data = await MemberShip.find().sort({rate : 1}).populate('facilities._id')
        data.facilities = data.facilities?.map((facility) => ({
            _id: facility._id,
            facility: facility.facility,
        }));
        res.status(200).json({data})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'Internal server error'})
    }
}

exports.getMemberShipsForUser = async (req, res) => {
    try {
        const data = await MemberShip.find({show : true}).sort({rate : 1}).populate('facilities._id')
        data.facilities = data.facilities?.map((facility) => ({
            _id: facility._id,
            facility: facility.facility,
        }));
        res.status(200).json({data})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'Internal server error'})
    }
}

exports.getMemberShipDetails = async (req,res) => {
    try {
        const id = req.query.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message : 'invalid id'})
        }
        const data = await MemberShip.findById(id)
        if(!data) {
            return res.status(404).json({message : 'invalid id'})
        }
        res.status(200).json({data : data})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'Internal server error'})
    }
}

exports.updateMemberShip = async (req, res) => {
    try {
        const data = req.body.data
        await MemberShip.findByIdAndUpdate(data._id, { $set: data })
        res.status(200).json({message : 'success'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'Internal server error'})
    }
}