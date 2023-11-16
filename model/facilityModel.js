const mongoose = require('mongoose')
const facilitySchema = new mongoose.Schema({
    facility: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Facility', facilitySchema)