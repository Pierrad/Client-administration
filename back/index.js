require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const Utils = require("./utils/misc");
const userCtrl = require("./controllers/userController");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (!err) {
        console.log('✅ MongoDB Connection Succeeded. URL: ' + process.env.MONGO_DB_URL);
    } else {
        console.log('Error in DB connection: ' + err);
    }
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000,
    message: {
        status: 403,
        success: false,
        message: "Too many request from this IP, DDoS is bad 😈 ..."
    }
});

const app = express()
app.use(bodyParser());
app.use(limiter);
app.use(helmet());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, GET, DELETE, OPTIONS");
    next();
});

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS')
    res.status(200).send()
})

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

app.get('/', (req, res) => {
    res.send({
        "message": "hello and welcome to client administration api",
        "version": 1.0
    });
})

app.get('/users/logout', (req, res) => { userCtrl.logout(req, res); }); 
app.post('/users', (req, res) => { userCtrl.register(req, res); });  
app.get('/users/:id', (req, res) => { userCtrl.getUser(req, res); });
app.delete('/users/:id', (req, res) => { userCtrl.deleteUser(req, res); }); 

app.post('/users/login', (req, res) => { userCtrl.login(req, res); }); 

app.listen(process.env.API_PORT, () => {
    console.log(`✅ Example app listening at http://localhost:${process.env.API_PORT}`);
})