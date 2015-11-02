var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var routes = require('./routes/routes');
var DMTPAPP = require('./models/AppModel');
var session = require('express-session');

var app = express();
var db = mongoose.connect('mongodb://localhost:27017/meandb');
db.connection.on("error", function (error) {
    console.log("connect failed：" + error);
});
db.connection.on("open", function () {
    console.log("connect success");
});


app.set('views', __dirname + '/app');
app.set('view engine', 'html');
app.use(express.static(require('path').join(__dirname, 'app')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(multer());
app.engine('.html', require('ejs').__express);

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});

//add session
app.use(session({
    //genid: function(req) {
    //	return genuuid() // use UUIDs for session IDs
    //},
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use('/index', function (req, res, next) {
    if (req.session.user_id) {
        next();
    } else {
        res.redirect('/login');
    }
});


routes(app);
//Definition model

var App = DMTPAPP.App;

var App1 = new App({
    name: 'DCS',
    types: ['LOK', 'IGH']
});

App1.types.push('CGO','RPL');
App1.save(function (error, doc) {
    if (error) {
        console.log("error :" + error);
    } else {
        console.log(doc);
    }
});

app.get('/index', function (req, res) {
    res.render('index');
});

app.get('/login', function (req, res) {
    res.render('login');
});
var server = app.listen(8800, function () {
    console.log('listening on port %d', server.address().port);
});
