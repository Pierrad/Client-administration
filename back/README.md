# Back for client part

# Installation

- Node > 15 (https://nodejs.org/en/)
- MongoDB (https://docs.mongodb.com/manual/administration/install-community/)


- ```nvm use (Not needed if you have Node > 15)```
- ```cp .env.example .env```
- ```npm install```
- ```node index.js```


# Testing

You can run the test with the following command : 
- ```npm test```

This command switch the Node environment to testing and connect the API to a testing database so that the test
do not modify the production environment. 

We use Jest and Supertest for testing.