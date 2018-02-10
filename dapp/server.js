/*Copyright 2018 Sebastian Coates, John Tagliaferro, Mateo Guaman, & Logan Herodes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var express = require('express');
var bodyParser = require('body-parser');
var assert = require('assert');
var path = require('path');
const pug = require('pug');
var cookie = require('cookie');
var app = express();
var request = require('request');

var Web3 = require('web3');
var web3 = new Web3();

var worksiteContractJSON =  [ { "constant": true, "inputs": [], "name": "boss", "outputs": [ { "name": "", "type": "address", "value": "0x2bbba437db0f0e362a9728de2cdb8ff9ffc15694" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "worker", "type": "address" }, { "name": "payment", "type": "uint32" } ], "name": "makePayment", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "worker", "type": "address" } ], "name": "hire", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "budget", "outputs": [ { "name": "", "type": "uint32", "value": "1000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_workers", "type": "address[]", "index": 0, "typeShort": "address", "bits": "[]", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;workers", "template": "elements_input_json", "value": [] }, { "name": "_budget", "type": "uint32", "index": 1, "typeShort": "uint", "bits": "32", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;budget", "template": "elements_input_uint", "value": "1000" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];

worksiteContract = new web3.eth.Contract(worksiteContractJSON, "0x729ec7e1650df28eab47d8d659a92cea43ccb01c")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// views is directory for all template files
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
// set port
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
}); 


app.get('/', (req, res) => {
        res.sendFile("file.html"); 
});

app.get('/pay_worker', (req, res) => {
        res.redirect('/');
        worksiteContract.makePayment(req.query.name, req.query.amount);
});

app.get('/validate_payment', (req, res) => {
        res.redirect('/');
        worksiteContract.validatePayment();
});

 /// catch 404 and forwarding to error handler
 app.use(function(req, res, next) {
             var err = new Error('Not Found');
             err.status = 404;
             next(err);
         });
 
 /// error handlers
 
 // development error handler
 // will print stacktrace
if (app.get('env') === 'development') {
             app.use(function(err, req, res, next) {
                        res.status(err.status || 500);
                      res.render('error', {
                                message: err.message,
                                   error: err
                        });
        });
}





