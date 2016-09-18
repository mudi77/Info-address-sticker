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

app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('/public'));

// http.createServer(app).listen(8080, function() {
// 		  console.log("node js SERVER started..");
// 		});



//PRIPAJANIE SA NA MONGO DB
// MongoClient.connect('mongodb://127.0.0.1:27017/viet', function(err, db) {
// 	if(err) {
// 		console.log('Sorry, there is no mongo db server running.');
// 	} else {
		// var attachDB = function(req, res, next) {
		// 	req.db = db;
		// 	next();
		// };
			
		// app.all('/', attachDB, function(req, res, next) {
		// 	Dert.run(req, res, next);
		// });		

		// app.all('/dert', attachDB, function(req, res, next) {
		// 	Dert.run(req, res, next);
		// });


		http.createServer(app).listen(process.env.PORT || 8080, function() {
		  console.log("nodeJs SERVER started..");
		});
// 	}
// });


//var db = new MongoDB("viet", new Server("127.0.0.1", 27017, {auto_reconnect: true}), {w: 1});
console.log("process.env.MONGODB_URI : " + process.env.MONGODB_URI);
//console.log("db version ::: " + MongoDB.version())

var MONGODB_URI = "mongodb://heroku_cn0nx3mh:ma03jjlbsft8eb62dmcode3eg1@ds033976.mlab.com:33976/heroku_cn0nx3mh", 
    db,
    users;

 //  var db = mongojs(MONGODB_URI+'?authMechanism=SCRAM-SHA-1', ['coordinates']); 

// MongoClient.connect(MONGODB_URI, function (err, database) {
//   if (err) throw err;
//   db = database;
 
//   console.log("db started");
// });



// db.open(function(e, d){
// 	if(e){
// 		console.log(e);
// 	}else{		
// 		console.log('mongo :: connected to database: viet');
// 	//	runBlock();
// 		}	
// });

console.log("db from app ::: " + db);

module.exports.getDB = function(){
	return mongojs(MONGODB_URI+'?authMechanism=SCRAM-SHA-1', ['coordinates']);
};

// function runBlock(){
// 	var data = {test:"testing"};

// 	db.collection('viet-block-coordinates').insert(data, {}, function(){

// 	console.log("db insert OK");

//  	});
// }

var viet = require('./controllers/viet');

app.get('/', function(req, res){
	
		//res.render('home', { title: 'Vietnamská aktivita' });
		//console.log("GET : home..");
	//	res.send('Hello');
		viet.run(req, res);
		
	});
app.post('/', function(req, res){
	
		//res.render('home', { title: 'Vietnamská aktivita' });
		//console.log("GET : home..");
		viet.run(req, res);
		
	});
// app.get('/zvestovatelia', function(req, res){
	
// 		//res.render('home', { title: 'Vietnamská aktivita' });
// 		//console.log("GET : home..");
// 		viet.run(req, res);
		
// 	});




