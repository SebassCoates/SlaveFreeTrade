var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var path = require('path');
const pug = require('pug');
var cookie = require('cookie');
var app = express();
const crypto = require('crypto');
var request = require('request');

var Web3 = require('web3');
// var web3 = new Web3();

// parse x-www-form-urlencoded and json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var contract = web3.eth.contract(abiArray).at(contractAddress);


var source = "" + 
"pragma solidity ^0.4.6;" + 
`
contract Worksite {
        address public boss;
        uint public budget;
        mapping(address => Worker) public employees;

        function Worksite(uint[] salaries, address[] workers, uint _budget) public {
                assert(salaries.length == workers.length);
                assert(_budget > 0);
                
                boss = msg.sender; // Contract created by boss!!
                budget = _budget;

                for (uint i = 0; i < salaries.length; i++) {
                        Worker w = new Worker(salaries[i], workers[i]);
                        employees[workers[i]] = w;
                }
        }

        function hire(uint salary, address worker) public {
                Worker w = new Worker(salary, worker);
                employees[worker] = w;
        }

        function fire(address worker) public {
                employees[worker].fireWorker();
        }

        function makePayt(address worker, uint payment) public {
                assert(budget - payment > 0);

                employees[worker].payWorker(payment);
                budget -= payment;
        }

        function adjustBudget(uint newBudget) public {
                assert(newBudget > 0);

                budget = newBudget;
        }
}`;
var compiled = web3.eth.compile.solidity(source);
var abi = compiled.info.abiDefinition;
var myContract;








// set port
app.set('port', (process.env.PORT || 5000));





app.get('/create_contract', (req, res) => {
        web3.eth.contract(abi).new({data: code}, function (err, contract) {
                if(err) {
                        console.error(err);
                        return;
                } else if(contract.address) {
                        myContract = contract;
                }
        });

}

app.get('/pay_worker', (req, res) => {
        contract.pay_worker();
}

app.get('/validate_payment', (req, res) => {
        contract.validate_payment();
}























































// connect to Mongo Server
//var mongoUri = "mongodb://heroku_19p6g17v:uud3cjf7v0h6u2v5044e7cf1ca@ds159235.mlab.com:59235/heroku_19p6g17v";
//process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/SERVER3';
/*
MongoClient.connect(mongoUri, function(err, db_) {
  assert.equal(null, err);
  console.log("Connected to mongo server");

  db = db_
});
*/
// views is directory for all template files
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));


function isEmpty(obj) {
   for (var x in obj) { return false; }
      return true;
}

//NEW SECTION!!
app.get('/', (req, res) => {
    cookies = (cookie.parse(req.headers.cookie || ''));
    if ((!isEmpty(cookies))) {
      db.collection("cookies").findOne({credential:cookies.credential}, (err, doc) => {
        if (doc != null) {
          username = doc.username;
          res.render('home.pug', {
            meal: "Lunch",
            signin: "",
            signup: "",
            username: username,
            logout: "Logout"
          });
        } else {
          res.render('home.pug', {
            meal: "Lunch",
            signin: "Login",
            signup: "Signup",
            username: ""
          });
        }
      })
    } else {
      res.render('home.pug', {
        meal: "Lunch",
        signin: "Login",
        signup: "Signup",
        username: ""
      });
    }
});

app.get('/test1', (req, res) => {
  db.collection('current_foods').find().toArray((err, arr) => {
    res.json(arr)
  })
})

app.get('/test', (req, res, next) => {
  getMenu()
  db.collection('current_foods').findOne((err, doc) => {
    if (err) {
      console.log("in test", err);
      res.send(err);
    } else {
      let meal = make_meal(doc, {cal: 200, fat: 5, carb: 4, prot: 2})
      console.log('return: ', meal);
      res.json(meal);
    }
  })
});

function getMenu(req, res)  {
  d = new Date();
  day = d.getDate();
  month = d.getMonth() + 1;
  year  = d.getFullYear();
  request('https://tuftsdiningdata.herokuapp.com/menus/dewick/'
    +day+'/'+month+'/'+year,
    function(error,response,body) {
      time = d.getHours();

      if (time > 20 || time < 10)      meal_period = "Breakfast";
      else if (time >= 10 && time < 17) meal_period = "Lunch";
      else                             meal_period = "Dinner";

      data = JSON.parse(response.body).data[meal_period]; //parsing JSON
      switch(meal_period){
        case "Breakfast": data = setBreakfast(data); break;
        case "Lunch"    : data = setLunch(data);     break;
        case "Dinner"   : data = setDinner(data);    break;
        default         : res.send("error");

      }

      db.collection('nutrition').find().toArray(function(err, body){
        if(!err) {
          for (i = 0; i < data["entree"].length; ++i) {
            name = data["entree"][i];

            // temp = {};
            // temp[name] = body[0][name];
            // console.log(i, temp[name]);
            data["entree"][i] = body[0][name];
          }
          for (i = 0; i < data["sides"].length; ++i) {
            name = data["sides"][i];

            temp = {};
            temp[name] = body[0][name];

            data["sides"][i] = temp;
          }
        }
        data['day'] = day
        db.collection('current_foods').remove();
        db.collection('current_foods').insertOne(data)
        // .then(console.log("inserted ", data))
        // res.send(data)
      });
    });
}

function setBreakfast(data) {
  let dataNew = {};
  dataNew['period'] = "b"
  dataNew["entree"] = data["BREAKFAST ENTREE"].concat(data["BREAKFAST MEATS"]).concat(data["BREAKFAST POTATO"]);
  dataNew["sides"]  = data["HOT BREAKFAST CEREAL BAR"] .concat( data["BRK BREADS,PASTRIES & TOPPINGS"]);
  return dataNew;
}

function setLunch(data) {
  let dataNew = {};
  dataNew['period'] = "l"
  dataNew["entree"] = data["PIZZA"] .concat( data["Hearty Soups"]) .concat( data["LUNCH ENTREE"]) .concat( data["CHAR-GRILL STATIONS"]);
  dataNew["sides"]  = data["FRUIT & YOGURT"] .concat( data["BREADS & ROLLS"]) .concat( data["POTATO & RICE ACCOMPANIMENTS"]) .concat(
  data["VEGETARIAN OPTIONS"]) .concat( data["CREATE-YOUR-OWN "]) .concat( data["DELI & PANINI"]) .concat( data["VEGETABLES"]) .concat(
  data["SPECIALTY SALADS"]) .concat( data["FRESH BAKED DESSERTS"]);
  return dataNew;
}

function setDinner(data) {
  let dataNew = {};
  const empty = [];
  dataNew['period'] = "d"
  dataNew["entree"] = data["CARVED MEATS & POULTRY"] .concat( data["PIZZA"] || empty) .concat( data["Hearty Soups"] || empty) .concat( data["DINNER ENTREES"] || empty) .concat( data["CHAR-GRILL STATIONS"] || empty) .concat( data["NOODLERY & STIR FRY"] || empty);
  dataNew["sides"]  = (data["BREADS & ROLLS"] || empty).concat( data["POTATO & RICE ACCOMPANIMENTS"] || empty) .concat( /*data["PASTA & SAUCES"] || empty) .concat(*/ data["FRUIT & YOGURT"] || empty)
  .concat( data["DELI & PANINI"] || empty) .concat( data["VEGETABLES"] || empty) .concat( data["VEGETARIAN OPTIONS"] || empty) .concat( data["SPECIALTY SALADS"] || empty) .concat( data["FRESH BAKED DESSERTS"] || empty) .concat( data["SUNDAE BAR"] || empty);
  return dataNew;
}

//END NEW SECTION!

app.get('/homebg.jpg', (req, res) => {
    res.send(path.join(__dirname + '/public/homebg.jpg'));
});

app.get('/prefsbg.jpg', (req, res) => {
    res.send(path.join(__dirname + '/public/prefsbg.jpg'));
});

app.get('/formsbg.jpg', (req, res) => {
    res.send(path.join(__dirname + '/public/formsbg.jpg'));
});

app.get('/login', (req, res) => {
    error = "error: ";
    err = req.query.err;
    if (err == undefined)
      error = ""
    else if (err == "0")
      error += "undefined login credentials"
    else if (err == "1")
      error += "invalid username or password"

    res.render("login", {
        error: error
  });
});

app.get('/signup', (req, res) => {
  error = "error: ";
  err = req.query.err;
  if (err == undefined)
      error = ""
  else if (err == "0")
    error += "undefined login credentials"
  else if (err == "1")
    error += "passwords must match"
  else if (err == "2")
    error += "username already in use"

  res.render("signup", {
        error: error
  });
});

app.get('/preferences', (req, res) => {
    res.render('preferences.pug', {
      meal: "Lunch"
    });
});

app.post('/submitlogin', (req, res) => {
    const hash = crypto.createHash('sha256');

    username  = req.body.username.toLowerCase();
    password  = req.body.password;

    if (username == undefined || password == undefined){
          res.redirect('/login?err=0');
          res.end();
    }

    //Prevent hackage
    username = username.replace(/[^\w\s]/gi, '');
    password = password.replace(/[^\w\s]/gi, '');

    db.collection("users").findOne({username:username}, function(err, doc) {
      if (doc == null) {
          res.redirect('/login?err=1');
          res.end();
      } else { //valid login
          salt = doc.salt;
          hash.update(password);
          hash.update(salt);
          hashedpass = hash.digest('hex');
          if (hashedpass == doc.password){
            credential = crypto.randomBytes(10).toString('hex');
            db.collection("cookies").insertOne( {
              "createdAt"  : new Date(),
              "username"   : username,
              "credential" : credential
            }).then(function() {
              res.setHeader('Set-Cookie', cookie.serialize('credential',credential));
              res.redirect('/');
              res.end();
            })
          }
      }
    });
});

app.get('/logout', (req, res) => {
    cookies = (cookie.parse(req.headers.cookie || ''));
    if ((!isEmpty(cookies))) {
      db.collection("cookies").findOne({credential:cookies.credential}, (err, doc) => {
        if (doc == null) {
          res.redirect('/');
        } else {
          db.collection("cookies").removeOne({credential:cookies.credential}).then(function() {
            res.setHeader('Set-Cookie', cookie.serialize('credential', ''));
          });
        }
      });
    }
    else {
      res.redirect('/');
    }
});

app.post('/submitsignup', (req, res) => {
    const hash = crypto.createHash('sha256');

    username  = req.body.username.toLowerCase();
    password  = req.body.password;
    password2 = req.body.password2;

    if (username == undefined || password == undefined || password2 == undefined){
          res.redirect('/signup?err=0');
          res.end();
    }

    //Prevent hackage
    username = username.replace(/[^\w\s]/gi, '');
    password = password.replace(/[^\w\s]/gi, '');
    password2 = password2.replace(/[^\w\s]/gi, '');

    if (password != password2) {
          res.redirect('/signup?err=1');
          res.end();
    }

    salt = crypto.randomBytes(20).toString('hex');

    db.collection("users").findOne({username:username}, function(err, doc){
      if (doc == null) {
        hash.update(password);
        hash.update(salt);
        password = hash.digest('hex');
        db.collection("users").insertOne( {
          "username" : username,
          "password" : password,
          "salt"     : salt
        }).then(function() {
          credential = crypto.randomBytes(10).toString('hex');
            db.collection("cookies").insertOne( {
              "createdAt"  : new Date(),
              "username"   : username,
              "credential" : credential
            }).then(function() {
              res.setHeader('Set-Cookie', cookie.serialize('credential',credential));
              res.redirect('/');
              res.end();
            })
        });
      } else {
        res.redirect('/signup?err=2');//username already exists
        res.end();
      }
    });
});

app.get('/meals', (req, res) => {
  // res.sendFile(path.join(__dirname + '/public/meals.html'));
    res.send("Not implemented yet!! :(")
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
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
