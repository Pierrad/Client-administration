const express = require('express')
const app = express()


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'clientAdministrationApi';
let db

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});


app.use(express.json())

// Add get and post method for REST API here

app.listen(8080, () => {
  console.log("Listening...")
})