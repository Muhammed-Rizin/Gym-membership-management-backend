const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    rate: {
        type: Number,
        required: true,
    },
    operationHours: {
        type: Number,
        required: true,
    },
    expire: {
        type: Number,
        required: true,
    },
    show : {
        type: Boolean,
        default: true
    },
    facilities: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Facility',
            },
            facility: {
                type: String,
                required: true,
            }
        },
    ]
    // Block or unblock
},{
    timestamps : true
});

const MemberShip = mongoose.model('MemberShip', membershipSchema);

module.exports = MemberShip;
