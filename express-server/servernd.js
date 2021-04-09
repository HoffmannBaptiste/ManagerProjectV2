// require all modules needed

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
const cors = require('cors');
const jwt = require('./model/services/jwt');
const errorHandler = require('./model/services/error-handler');

app.use(cors({
    credentials: true,
    origin: true
  }));
app.options('*', cors());

// use server on port 3000
// app.listen(3000);

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// use server on port 3000
app.listen(3000);

// global error handler
app.use(errorHandler);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/appRoutes'); //importing route
routes(app, path); //register the route
