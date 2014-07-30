// set up ========================
var express  = require('express');
var app      = express();                 // create our app w/ express
var mongoose = require('mongoose');           // mongoose for mongodb

// configuration =================

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');   // connect to mongoDB database on modulus.io

app.configure(function() {
  app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
  app.use(express.logger('dev'));             // log every request to the console
  app.use(express.bodyParser());              // pull information from html in POST
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
