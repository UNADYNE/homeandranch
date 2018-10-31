const mongoose = require('mongoose');


const ContactSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true
    },
    lastName: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        index: true
    },
    message: {
        type: String
    },
    date: {
        type: Date
    }
});

const Contact = module.exports = mongoose.model('Contact', ContactSchema);

module.exports.storeContact = (data, callback) => {
    data.save(callback);
};