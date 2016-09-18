var application = require('./../app');
var coordinates = require('./../models/test_data');
var View = require("../views/Base");
var pjson = require("../package.json");

var cordDATA = coordinates.getData();
var db = application.getDB();

console.log("db :::   " + db);

// db.open(function(e, d){
// 	if(e){
// 		console.log(e);
// 	}else{		
// 		console.log('mongo :: connected to database: viet');	

// db.collection('coordinates').insert(coordinates.getData(), {}, function(){
// 		console.log("db insert OK");
//  	});

// 		}	
// });

module.exports = {
 
	name : "viet",
	insert: "",
	run : function(req, res){		
			that = this;	
		//	var v = new View(res, 'home');
			that.actions(req, res, function(req, res){
				that.myRender(req, res);				
			})			
		},	

	actions : function(req, res, callback){
		//	var tempValname = "";	
			if(req.query.action === "getBlocks"){
				var data = db.collection('coordinates').find({}).toArray(function(err, records){				
					res.send(records);		
				});	
			}else if(req.query.action === "getEvangelists"){
				var data = db.collection('evangelists').find({}).toArray(function(err, records){				
					res.send(records);		
				});	
			}else if(req.query.action === "insert"){
				var data = {};
				
				data.name = req.query.n;
				data.email = req.query.e;
				data.cong = req.query.z;
				data.pass = req.query.h;
				if(this.insert.indexOf(req.query.n) == -1){
				db.collection('evangelists').insert(data, function(){ 
					//res.send(records);
					res.status(200).send("OK");
				});
			}
				this.insert = req.query.n;
			}else if(req.query.action === "getUser"){

				// function asynGet(callback, query) {		
				// 	db.collection('evangelists').find(query).toArray(callback);
				// }				
				  var usr = req.query.usrpwd;

				// asynGet(function(err, records){						
				// 		if(records.length == 1){
				// 			res.send(records);	
				// 			}
				// 	}, {pass: new RegExp(usr, 'i')});

				db.collection('evangelists').find({pass: new RegExp(usr, 'i')}).toArray(function(err, records){				
					console.log("user.. FOUND..." + records.length);
						if(records.length == 1){
							res.send(records);
							records = false;	
							}else{records = false;}	
				});	
//console.log(" outside find " + data.length);
			}else if(req.query.action === "assign"){
				console.log(req.query.date);
					var user = JSON.parse(req.query.user);
					var blockName = "Obvod_" + req.query.blockID;
					console.log(" user : " + user.name + " blockID " + blockName);
					db.collection('coordinates').update({name: blockName}, {$set: {assigned_to : user.name, spec1 : req.query.date}}, function(){
						res.status(200).send("OK");
					});										
			}else{
				callback(req, res);
			}
	},

	myRender : function(req, res){
				console.log("tu som myRender " + req.url);
				var title = location = "";
				switch(req.url){
					case "viet" : location = "home";break;
					case "/zvestovatelia" : location = "zvestovatelia"; title = "zvestovatelia"; console.log("tu switch " + location);break;
					default : location = "home"; title = "Vietnamska aktivita";
				}
				console.log(location + " " + title);
				var v = new View(res, location);
				v.render({ title: title, ver: pjson.version, layout: false });
				//res.render(location, { title: title });
		//callback();		
	}

}

		


