var express = require('express');
var bodyParser = require('body-parser');
var assert = require('assert');
var path = require('path');
const pug = require('pug');
var cookie = require('cookie');
var app = express();
var request = require('request');

var Web3 = require('web3');
// var web3 = new Web3();

// parse x-www-form-urlencoded and json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));






// set port
app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
        res.render("home.pug");        
});




app.get('/pay_worker', (req, res, ) => {
        worksiteContract.makePayt(5);
});

app.get('/validate_payment', (req, res) => {
        worksiteContract.validatePayment();
});


