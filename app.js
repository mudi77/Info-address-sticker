var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var MongoDB	= require('mongodb');
var Server = require('mongodb').Server;
var mongojs = require('mongojs');


app.set('views', __dirname + '/templates');
app.set('view engine', 'hjs');

app.use(express.bodyParser());
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('/public'));

		http.createServer(app).listen(process.env.PORT || 8081, function() {
		  console.log("nodeJs SERVER started..");
		});


var db = "viet";

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/viet";
//     db,
//	 users;
	 
// var mongodbHost = '127.0.0.1';
// var mongodbPort = '27017';
// var mongodbHost = '@ds033976.mlab.com';
// var mongodbPort = '33976';
// var authenticate = 'igor:Lienocka1';
// var mongodbDatabase = 'heroku_cn0nx3mh';

// var MONGODB_URI = 'mongodb://'+authenticate+mongodbHost+':'+mongodbPort + '/' + mongodbDatabase;


console.log(" MONGODB_URI " + process.env.MONGODB_URI);

module.exports.getDB = function(){
	console.log(" url : " + MONGODB_URI);
	return mongojs(MONGODB_URI);
//	return mongojs('heroku_cn0nx3mh:ma03jjlbsft8eb62dmcode3eg1@ds033976.mlab.com:33976/heroku_cn0nx3mh?authMechanism=SCRAM-SHA-1');
};

var viet = require('./controllers/viet');

app.get('/', function(req, res){
		viet.run(req, res);		
	});
app.post('/', function(req, res){
		viet.run(req, res);				
	});
