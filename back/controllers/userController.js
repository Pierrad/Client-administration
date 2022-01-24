const bcrypt = require('bcrypt');
const validator = require("email-validator");
const { passwordStrength } = require('check-password-strength');
const crypto = require('crypto');

const Utils = require("../utils/misc")
const User = require('../models/userModel')

const USER_TOKEN_EXPIRATION = 86400;

exports.register = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.email || !req.body.firstName || !req.body.lastName || !req.body.address) {
            return res.status(200).json({
                "message": "missing args",
                "success": false
            });
        };

        let isAlreadyUserEmail = await User.findOne( { "email": (req.body.email).toLowerCase() } );
        if (!!isAlreadyUserEmail) {
            return res.status(400).json({
                'message': 'email already exists',
                'success': false
            }); 
        }

        let difficulty = passwordStrength(req.body.password, Utils.passwordDefaultOptions)
        if (difficulty.id < 2) {
            return res.status(400).json({
                'message': 'password too weak 🔐',
                'success': false
            }); 
        }
        if (!validator.validate(req.body.email)) {
            return res.status(400).json({
                'message': 'wrong email format',
                'success': false
            }); 
        }

        let newUser = new User({
            "username": req.body.username,
            "password": bcrypt.hashSync(req.body.password, 10),
            "email": req.body.email.toLowerCase(),
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "address": req.body.address,
        });

        let user = await newUser.save(); 
        if (!user) {
            return res.status(400).json({
                'message': 'register error',
                'success': false
            });
        };

        return res.status(200).json({
            'user': user,
            'message': 'user created',
            'success': true
        });
    } catch (error) {
        console.log("🔴 Internal error /users/register : ", error)
        return res.status(500).json({
            'message': 'Internal error',
            'success': false
        });        
    }
}

exports.login = async (req, res) => {
    try {
        if (!req.body.password  || !req.body.email) {
            return res.status(400).json({
                'message': 'missing arguments',
                'success': false
            });     
        }

        let user = await User.findOne({ "email": (req.body.email).toLowerCase() });
        if (!user) {
            return res.status(400).json({
                'message': 'user does not exist',
                'success': false
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).json({
                'message': 'wrong password',
                'success': false
            });
        } 

        let token = crypto.randomBytes(100).toString("hex");
        let expiration = parseInt((Date.now() / 1000) + USER_TOKEN_EXPIRATION);
        user.token.set("token", token)
        user.token.set("expiration", expiration)
        await user.save()

        user.token.set("expiration", undefined);
        
        return res.status(200).json({
            'user': user,
            'message': 'well login',
            'success': true
        });
    } catch (error) {
        console.log("🔴 Internal error /users/login : ", error)
        return res.status(500).json({
            'message': 'Internal error',
            'success': false
        });        
    }
}

exports.getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({
                'message': 'user does not exist',
                'success': false
            });
        }

        user.token.set("token", undefined);
        user.token.set("expiration", undefined);
        
        return res.status(200).json({
            'user': user,
            'message': 'user sent',
            'success': true
        });

    } catch (error) {
        console.log("🔴 Internal error /users/getUser : ", error)
        return res.status(500).json({
            'message': 'Internal error',
            'success': false
        });        
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let connectedUser = await User.findOne({ "token.token" : req.headers.authorization });
        if (!connectedUser) {
            return res.status(400).json({
                'message': 'unauthorized',
                'success': false
            });
        }

        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({
                'message': 'user does not exist',
                'success': false
            });
        }

        if (JSON.stringify(user.toObject()._id) !== JSON.stringify(connectedUser.toObject()._id)) {
            return res.status(400).json({
                'message': 'unauthorized',
                'success': false
            });
        }

        let deletedUser = await User.remove({"_id": user._id});

        return res.status(200).json({
            'message': 'user deleted',
            'success': true
        });

    } catch (error) {
        console.log("🔴 Internal error /users/deleteUser : ", error)
        return res.status(500).json({
            'message': 'Internal error',
            'success': false
        });        
    }
}

exports.logout = async (req, res) => {
    try {
        let user = await User.findOne({ "token.token" : req.headers.authorization });
        if (!user) {
            return res.status(400).json({
                'message': 'unauthorized',
                'success': false
            });
        }

        user.token = {};
        await user.save()
        return res.status(200).json({
            'message': 'user logout',
            'success': true
        });
    } catch (error) {
        console.log("🔴 Internal error /users/logout : ", error)
        return res.status(500).json({
            'message': 'Internal error',
            'success': false
        }); 
    }
}

exports.subscription = async (req, res) => {
    try {
        let user = await User.findById(req.body.id);
        if (!user) {
            return res.status(400).json({
                'message': 'user does not exist',
                'success': false
            });
        }
        user.subscription = req.body.subscription;
        await user.save();

        return res.status(200).json({
            'message': 'subscription updated',
            'success': true
        });

    } catch (error) {
        console.log("🔴 Internal error /users/subscription : ", error)
        return res.status(500).json({
            'message': 'Internal error',
            'success': false
        });        
    }
}