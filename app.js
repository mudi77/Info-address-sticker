var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
//var MongoDB	= require('mongodb').Db;
var MongoDB	= require('mongodb');
var Server = require('mongodb').Server;

var mongojs = require('mongojs');

//var viet = require('./controllers/viet');

app.set('views', __dirname + '/templates');
app.set('view engine', 'hjs');

app.use(express.bodyParser());
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('/public'));

		http.createServer(app).listen(process.env.PORT || 8080, function() {
		  console.log("nodeJs SERVER started..");
		});

console.log(" MONGODB_URI " + process.env.MONGODB_URI);

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/viet", 
//     db,
//     users;

var MONGODB_URI = "mongodb://heroku_cn0nx3mh:ma03jjlbsft8eb62dmcode3eg1@ds033976.mlab.com:33976/heroku_cn0nx3mh";

module.exports.getDB = function(){
	return mongojs(MONGODB_URI+'?authMechanism=SCRAM-SHA-1', ['coordinates']);
};


// MongoDB.MongoClient.connect(MONGODB_URI, function (err, db) {
    
// });

var viet = require('./controllers/viet');

app.get('/', function(req, res){
		viet.run(req, res);		
	});
app.post('/', function(req, res){
		viet.run(req, res);				
	});
