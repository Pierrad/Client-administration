// Les dépendances
const bcrypt = require('bcrypt');
const validator = require("email-validator");
const { passwordStrength } = require('check-password-strength');
const crypto = require('crypto');

const Utils = require("../utils/misc")
const User = require('../models/userModel')

const USER_TOKEN_EXPIRATION = 86400;


/**
 * @api {post} /users Register a new user
 * @apiName Register
 * @apiGroup User
 *
 * @apiParam {string} username The user's username
 * @apiParam {string} email The user's email
 * @apiParam {string} password The user's password
 * @apiParam {string} firstname The user's firstname
 * @apiParam {string} lastname The user's lastname
 * @apiParam {string} address The user's address
 *
 * @apiSuccess {Object} user User object created
 * @apiError MissingArgs Missing arguments
 * @apiError UserExists User already exists
 * @apiError InternalError Internal error
 * @apiError PasswordTooWeek Password is too week
 */
exports.register = async (req, res) => {
    try {
        // On check que l'on a bien tous les champs requis
        if (!req.body.username || !req.body.password || !req.body.email || !req.body.firstName || !req.body.lastName || !req.body.address) {
            return res.status(200).json({
                "message": "missing args",
                "success": false
            });
        };

        // On check que l'email n'est pas déjà dans la base de donnée.
        let isAlreadyUserEmail = await User.findOne( { "email": (req.body.email).toLowerCase() } );
        if (!!isAlreadyUserEmail) {
            return res.status(400).json({
                'message': 'email already exists',
                'success': false
            }); 
        }

        // On check la validité du mot de passe 
        let difficulty = passwordStrength(req.body.password, Utils.passwordDefaultOptions)
        if (difficulty.id < 2) {
            return res.status(400).json({
                'message': 'password too weak 🔐',
                'success': false
            }); 
        }
        
        // On check le format de l'email pour vérifier qu'il est correct
        if (!validator.validate(req.body.email)) {
            return res.status(400).json({
                'message': 'wrong email format',
                'success': false
            }); 
        }

        // Définition des champs à insérer dans la base de donnée
        let newUser = new User({
            "username": req.body.username,
            "password": bcrypt.hashSync(req.body.password, 10),
            "email": req.body.email.toLowerCase(),
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "address": req.body.address,
        });

        // On insère le nouvel utilisateur dans la base de donnée
        let user = await newUser.save(); 
        if (!user) {
            return res.status(400).json({
                'message': 'register error',
                'success': false
            });
        };

        // On retourne le nouvel utilisateur dans la requête
        return res.status(200).json({
            'user': user,
            'message': 'user created',
            'success': true
        });
    } catch (error) {
        // Si une erreur interne est survenue, on retourne une erreur 500
        console.log("🔴 Internal error /users/register : ", error)
        return res.status(500).json({
            'message': 'Internal error',
            'success': false
        });        
    }
}


/**
 * @api {post} /users/login Login an existing user
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {string} email The user's email
 * @apiParam {string} password The user's password
 *
 * @apiSuccess {Object} user User object created
 * @apiError MissingArgs Missing arguments
 * @apiError UserDoesNotExists User doesn't exists
 * @apiError InternalError Internal error
 */
exports.login = async (req, res) => {
    try {
        // On check que l'on a bien tous les champs requis
        if (!req.body.password  || !req.body.email) {
            return res.status(400).json({
                'message': 'missing arguments',
                'success': false
            });     
        }

        // On check que l'email est bien dans la base de donnée
        let user = await User.findOne({ "email": (req.body.email).toLowerCase() });
        if (!user) {
            return res.status(400).json({
                'message': 'user does not exist',
                'success': false
            });
        }

        // On check que le mot de passe est correct
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).json({
                'message': 'wrong password',
                'success': false
            });
        } 

        // Création du token d'authentification
        let token = crypto.randomBytes(100).toString("hex");
        let expiration = parseInt((Date.now() / 1000) + USER_TOKEN_EXPIRATION);
        user.token.set("token", token)
        user.token.set("expiration", expiration)
        // On save le token dans la base de donnée
        await user.save()

        user.token.set("expiration", undefined);
        
        // On retourne les informations de l'utilisateur dans la requête
        return res.status(200).json({
            'user': user,
            'message': 'well login',
            'success': true
        });
    } catch (error) {
        // Si une erreur interne est survenue, on retourne une erreur 500
        console.log("🔴 Internal error /users/login : ", error)
        return res.status(500).json({
            'message': 'Internal error',
            'success': false
        });        
    }
}


/**
 * @api {get} /users/:id Get an existing user
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {string} id The user's ID
 *
 * @apiSuccess {Object} user User object created
 * @apiError MissingArgs Missing arguments
 * @apiError UserDoesNotExists User already exists
 * @apiError InternalError Internal error
 */
exports.getUser = async (req, res) => {
    try {
        // On vérifie que l'utilisateur existe bien dans la base de donnée via son ID
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({
                'message': 'user does not exist',
                'success': false
            });
        }

        user.token.set("token", undefined);
        user.token.set("expiration", undefined);

        // On retourne l'utilisateur dans la requête
        return res.status(200).json({
            'user': user,
            'message': 'user sent',
            'success': true
        });

    } catch (error) {
        // Si une erreur interne est survenue, on retourne une erreur 500
        console.log("🔴 Internal error /users/getUser : ", error)
        return res.status(500).json({
            'message': 'Internal error',
            'success': false
        });        
    }
}

/**
 * @api {delete} /users/:id Remove an existing user
 * @apiName RemoveUser
 * @apiGroup User
 *
 * @apiParam {string} id The user's ID
 * @apiParam {string} token The user's token authentication
 *
 * @apiSuccess {string} message A simple message to confirm the deletion
 * @apiError Unauthorize Unauthorized
 * @apiError UserDoesNotExists User doesn't exists
 * @apiError InternalError Internal error
 */
exports.deleteUser = async (req, res) => {
    try {
        // On vérifie que l'utilisateur existe bien dans la base de donnée via son token d'authentification
        let connectedUser = await User.findOne({ "token.token" : req.headers.authorization });
        if (!connectedUser) {
            return res.status(400).json({
                'message': 'unauthorized',
                'success': false
            });
        }

        // On vérifie que l'utilisateur existe bien dans la base de donnée via son ID
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({
                'message': 'user does not exist',
                'success': false
            });
        }

        // On vérifie bien que l'utilisateur est bien celui qui est connecté via le token et l'id
        if (JSON.stringify(user.toObject()._id) !== JSON.stringify(connectedUser.toObject()._id)) {
            return res.status(400).json({
                'message': 'unauthorized',
                'success': false
            });
        }

        // On supprime l'utilisateur de la base de donnée
        let deletedUser = await User.remove({"_id": user._id});

        // On renvoie le message de succès
        return res.status(200).json({
            'message': 'user deleted',
            'success': true
        });

    } catch (error) {
        // Si une erreur interne est survenue, on retourne une erreur 500
        console.log("🔴 Internal error /users/deleteUser : ", error)
        return res.status(500).json({
            'message': 'Internal error',
            'success': false
        });        
    }
}

/**
 * @api {get} /users/logout Logout an existing user
 * @apiName Logout
 * @apiGroup User
 *
 * @apiParam {string} token The user's token authentication
 *
 * @apiSuccess {string} message A simple message to confirm the logout
 * @apiError Unauthorize Unauthorized
 * @apiError InternalError Internal error
 */
exports.logout = async (req, res) => {
    try {
        // On vérifie que l'utilisateur existe bien dans la base de donnée via son token d'authentification
        let user = await User.findOne({ "token.token" : req.headers.authorization });
        if (!user) {
            return res.status(400).json({
                'message': 'unauthorized',
                'success': false
            });
        }
        
        // On supprime le token de l'utilisateur
        user.token = {};
        await user.save()
        // On renvoie un message de succès
        return res.status(200).json({
            'message': 'user logout',
            'success': true
        });
    } catch (error) {
        // Si une erreur interne est survenue, on retourne une erreur 500
        console.log("🔴 Internal error /users/logout : ", error)
        return res.status(500).json({
            'message': 'Internal error',
            'success': false
        }); 
    }
}

/**
* @api {post} /users/subscription Modify the subscription of an existing user
* @apiName Subscription
* @apiGroup User
*
* @apiParam {string} id The user's ID
*
* @apiSuccess {string} message A simple message to confirm the modification of the subscription
* @apiError UserDoesNotExists User already exists
* @apiError InternalError Internal error
*/
exports.subscription = async (req, res) => {
    try {
        // On vérifie que l'utilisateur existe bien dans la base de donnée via son ID

        let user = await User.findById(req.body.id);
        if (!user) {
            return res.status(400).json({
                'message': 'user does not exist',
                'success': false
            });
        }

        // On modifie la valeur de la subscription de l'utilisateur
        user.subscription = req.body.subscription;
        await user.save();

        // On renvoie un message de succès
        return res.status(200).json({
            'message': 'subscription updated',
            'success': true
        });

    } catch (error) {
        // Si une erreur interne est survenue, on retourne une erreur 500
        console.log("🔴 Internal error /users/subscription : ", error)
        return res.status(500).json({
            'message': 'Internal error',
            'success': false
        });        
    }
}