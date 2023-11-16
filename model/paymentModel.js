const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    memberShip : {
        type : mongoose.Schema.Types.ObjectId,
        ref:  "MemberShip",
        required: true
    },
    paymentId : {
        type: String,
        required: true
    },
    rate: {
        type : Number,
        required: true
    },
},{
    timestamps : true
})

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment