var express=require('express');

var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var multer=require('multer');
var routes = require('./routes/routes');
var app=express();
var db=mongoose.connect('mongodb://localhost:27017/meandb');
db.connection.on("error",function(error){
	console.log("connect failed："+error);
});
db.connection.on("open",function(){
	console.log("connect success");
});

//app.use(logger('dev'));
app.set('views', __dirname + '/app');
app.set('view engine', 'html');
app.use(express.static(require('path').join(__dirname, 'app')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer());
app.engine( '.html', require( 'ejs' ).__express );

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

routes(app);

app.get('/login',function(req,res){
    res.render('login');
});

app.get('/index',function(req,res){
    res.render('index');
});
app.get('/signup',function(req,res){
    res.render('signup');
});


var server =app.listen(8888,function(){
    console.log('listening on port %d',server.address().port);
});
