require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const path = require('path');

const Utils = require("./utils/misc");
const userCtrl = require("./controllers/userController");


// Connexion à la base de données mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (!err) {
        console.log('✅ MongoDB Connection Succeeded. URL: ' + process.env.MONGO_DB_URL);
    } else {
        console.log('Error in DB connection: ' + err);
    }
});

// On limite les requêtes pour éviter un DDOS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000,
    message: {
        status: 403,
        success: false,
        message: "Too many request from this IP, DDoS is bad 😈 ..."
    }
});

// On crée notre application express
const app = express()
app.use(bodyParser());
app.use(limiter);
app.use(helmet());



// On définit le header de toutes nos requêtes
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, GET, DELETE, OPTIONS");
    res.header(
        'Content-Security-Policy',
        "default-src 'self' 'unsafe-eval'; font-src 'self'; img-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self'; frame-src 'self'"
      );
    next();
});

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS')
    res.status(200).send()
})

// Si la requête n'est pas permise alors on renvoie un message d'erreur sinon on log la route appellé dans la console
app.all('*', function(req, res, next){
    if (!Utils.allowedRoutesCheck(req)) {
        return res.status(500).json({
            'message': 'access denied',
            'success': false
        });
    } else {
        console.log('🔵 called route ' + req.originalUrl);
        next();
    }
});

// Les différentes routes de notre API
app.get('/', (req, res) => {
    res.send({
        "message": "hello and welcome to client administration api",
        "version": 1.0
    });
});

app.use('/doc', express.static(__dirname + '/doc'));
app.get('/users/logout', (req, res) => { userCtrl.logout(req, res); }); 
app.post('/users', (req, res) => { userCtrl.register(req, res); });  
app.get('/users/:id', (req, res) => { userCtrl.getUser(req, res); });
app.delete('/users/:id', (req, res) => { userCtrl.deleteUser(req, res); }); 
app.post('/users/login', (req, res) => { userCtrl.login(req, res); });
app.post('/users/subscription', (req, res) => { userCtrl.subscription(req, res); });

// On démarre le serveur sur le port défini dans le fichier .env
app.listen(process.env.API_PORT, () => {
    console.log(`✅ Example app listening at http://localhost:${process.env.API_PORT}`);
})