var application = require('./../app');
var coordinates = require('./../models/test_data');
var View = require("../views/Base");
var pjson = require("../package.json");

//var cordDATA = coordinates.getData();
var db = application.getDB();

//console.log("connected to db ::: " + db);

// db.collection('coordinates').insert(coordinates.getData(), {}, function(){
// 		console.log("db insert OK");
//  	});

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
							
				var usr = req.query.usrpwd;				

				db.collection('evangelists').find({pass: new RegExp(usr, 'i')}).toArray(function(err, records){				
					console.log("user.. FOUND..." + records.length);
						if(records.length == 1){
							res.send(records);
							records = false;	
							}else{records = false;}	
				});	
			}else if(req.query.action === "assign"){	
					var user = JSON.parse(req.query.user);
					var blockName = "Obvod_" + req.query.blockID;		
					db.collection('coordinates').update({name: blockName}, {$set: {assigned_to : user.name, spec1 : req.query.date}}, function(){
						res.status(200).send("OK");
					});										
			}else if(req.query.action === "getVietnamese"){
				var data = db.collection('vietnamese').find({}).toArray(function(err, records){				
					res.send(records);		
				});


			}else if(req.query.action === "insertViet"){
					// console.log("tu sommmmm  " + Object.keys(req.body));
					// console.log("tu sommmmm  " + req.body.age);		

					db.collection('vietnamese').insert(req.body, function(){ 
					//res.send(records);
					res.status(200).send("OK");
					});	

				//	res.status(200).send("OK");

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
	}

}

		


