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
    token: {
        type: Map,
        of: String,
        default: {}
    },
    subscriptions: {
        type: Array,
        default: ["standard"]
    }
})

const User = mongoose.model('User', userShema);
module.exports = User;