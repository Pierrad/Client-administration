const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShema = new mongoose.Schema({
	username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    token: {
        type: Map,
        of: String,
        default: {}
    },
    subscription: {
        type: String,
        default: "standard"
    }
})

const User = mongoose.model('User', userShema);
module.exports = User;