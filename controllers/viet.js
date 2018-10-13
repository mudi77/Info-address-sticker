var application = require('./../app');
var coordinates = require('./../models/test_data');
var View = require("../views/Base");
var pjson = require("../package.json");

var db = application.getDB();

module.exports = {
 
	name : "viet",
	insert: "",
	run : function(req, res){		
			that = this;	
			that.actions(req, res, function(req, res){
				that.myRender(req, res);				
			})			
		},	

	actions : function(req, res, callback){
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
					db.collection('coordinates').update(
						{name: blockName}, {$set: {assigned_to : user.name, spec1 : req.query.date}}, function(){
						res.status(200).send("OK");
					});										
			}else if(req.query.action === "getVietnamese"){
				var data = db.collection('vietnamese').find({}).toArray(function(err, records){				
					res.send(records);		
				});


			}else if(req.query.action === "insertViet"){
					db.collection('vietnamese').insert(req.body, function(){ 

					res.status(200).send("OK");
					});	

			}else{
				callback(req, res);
			}
	},

	myRender : function(req, res){

				var title = location = "";
				switch(req.url){
					case "viet" : location = "home";break;
					case "/zvestovatelia" : location = "zvestovatelia"; title = "zvestovatelia";break;
					default : location = "home"; title = "Cudzojazycna aktivita";
				}
				console.log(location + " " + title);
				var view = new View(res, location);
				view.render({ title: title, ver: pjson.version, layout: false });	
	}

}

		


