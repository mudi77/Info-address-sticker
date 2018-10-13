	var mobileSuffix = "";
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 		mobileSuffix = "_mobile"; 		
	}


window.onload = function(){

document.getElementsByClassName("loading")[0].style.display = "none";

var refElement = document.createElement("div");
	refElement.setAttribute("id","mobile");
	refElement.style.height = "1in";
	refElement.style.width = "1in"; 
	refElement.style.left = "100%"; 
	refElement.style.top = "100%"; 
	refElement.style.position = "fixed"; 
document.getElementsByTagName("html")[0].appendChild(refElement);	

var dpi_x = document.getElementById('mobile').offsetWidth;
var dpi_y = document.getElementById('mobile').offsetHeight;
var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / dpi_x;
var height = (window.innerHeight || document.documentElement.clientHeight  || document.body.clientHeight) / dpi_y;

var blockDevice = (Math.round(width) * Math.round(height)) < 40 ? true : false;

var body = document.getElementsByTagName("body")[0];

if(blockDevice){
	body.setAttribute("class", "blockElement");
	body.innerHTML = "<center><b>Xin lỗi   :(</b></center><br>NEPODPOROVANE ZARIADENIE... PREPACTE ALE OBSAH SA NEZOBRAZI.. skuste prosim tablet alebo PC  <b>;)</b>";
}else{
	//body.setAttribute("class", "");
}

}

function tableInit(inputHeight){

	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var height = window.innerHeight || document.documentElement.clientHeight  || document.body.clientHeight;

	var thisWidth = parseInt(width * 0.34);
	var thisHeight = parseInt(inputHeight * parseInt(height)); 

	$('#tableViet').tableScroll({width:thisWidth,height:thisHeight});
}

function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 48.712, lng: 21.27},
          zoom: 12
        });

        // var drawingManager = new google.maps.drawing.DrawingManager({
        //   drawingMode: google.maps.drawing.OverlayType.MARKER,
        //   drawingControl: true,
        //   drawingControlOptions: {
        //     position: google.maps.ControlPosition.TOP_CENTER,
        //     drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
        //   },
        //   markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.svg'},
        //   circleOptions: {
        //     fillColor: '#ffff00',
        //     fillOpacity: 1,
        //     strokeWeight: 5,
        //     clickable: false,
        //     editable: true,
        //     zIndex: 1
        //   }
        // });
        // drawingManager.setMap(map);

// var BLOCKS = [], RESULT = "";

//  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
//   if (event.type == 'polygon') {
//     var str = "";
//     var obj = {};
//     var result = "";
//     for (var i = 0; i < event.overlay.getPath().getLength(); i++){
//     str += event.overlay.getPath().getAt(i).toUrlValue(5) + "\n";  
//     //console.log(event.overlay.getPath().getAt(i).toUrlValue(5));
//     obj["lat" + i] = event.overlay.getPath().getAt(i).toUrlValue(5).split(",")[0];
//     obj["lng" + i] = event.overlay.getPath().getAt(i).toUrlValue(5).split(",")[1];      
//     }
//     obj["name"] = "Obvod_" + BLOCKS.length; 
//     obj["id"] = Date.now();
//     obj["assigned_to"] = ""; 
//     obj["spec1"] = "";
//     obj["spec2"] = "";
//     obj["spec3"] = "";
//     BLOCKS.push(obj);
//     document.getElementById('info').innerHTML = str;

//     function isOdd(num){
//       return num % 2;
//     }

//     RESULT = "";
//     var obj = BLOCKS[BLOCKS.length-1], i=0, spacer = "";    
//     for(var key in obj){
//       if(obj[key].indexOf(".") == -1)break;
//       spacer = isOdd(i) ? "\n" : ", "; 
//       RESULT += obj[key] + spacer;
//       i++;
//     }
//     console.log(RESULT);
//   }
// });  

//DRAWING CANCEL BY SPACE !!!
// document.addEventListener('keydown', function (event) {
//     if (event.keyCode === 32) { 
//         cancelDrawingShape = true;
//         drawingManager.setDrawingMode(null);       
//     }
// });


//************************************************************************************************
var BUTTONS = {
	btnZvest : document.getElementById("zvs"),
	btnObv : document.getElementById("obv"),
	btnBack : function(){return document.getElementById("btnBack")},
	btnViet : document.getElementById("btnViet"),
	btnZauj : document.getElementById("btnZauj"),
	btnPokn : document.getElementById("btnPokn"),
	btnSmile : document.getElementById("btnSmile")
}

var MENU = {
	status : true,
	flagInsert : true,
	vietnameAdding : "initial",
    marker : "initial",
	obvody : (function(){
		BUTTONS.btnObv.addEventListener("click", function(){
 			if(MENU.status){
				MENU.status = false;
        		$.ajax({
            		url: '/?action=getBlocks',
            		type: 'get',
            		dataType: 'json',
            		success: function(blockData){        
                		var named, assignment, date, color = info = notes = "";
                		for(var i = 0; i<blockData.length; i++){ 
                    		var cordLength = (Object.keys(blockData[i]).length -7) / 2;
                    		name = blockData[i].name;  
                    		if(blockData[i].assigned_to === ""){          		
								assignment = "yet unassigned";
								color = "#46C646";
								date = "";
                    		}else{
                    			assignment = "<strong>"+blockData[i].assigned_to+"</strong>";
                    			date = blockData[i].spec1;                    		
                    			color = "yellow";
                    		}         
                     	
                    		var block = [], n = 0;                                            		
                        	for(var key in blockData[i]){
                        	
                        		if(key.indexOf("l") == 0){
                        			var lat = blockData[i]["lat" + n];
                        			var lng = blockData[i]["lng" + n];                        
                       
                        			var obj = new google.maps.LatLng(lat, lng);
                        			block.push(obj);
                        			if(n  === cordLength-1){break;}else{n++;}
                        		}
                        	}
                     		
                        	var tempPolygon = new google.maps.Polygon({
								paths: block,
								draggable: false, 
								editable: false,
								strokeColor: '#585858',
								strokeOpacity: 0.8,
								strokeWeight: 2,
								fillColor: color,
								fillOpacity: 0.5
							});
                         
 							tempPolygon.setMap(map); 
 							var temp, flag = true;
 							google.maps.event.addListener(tempPolygon,"mouseover",function(){
 								this.setOptions({fillOpacity: 0.35, strokeWeight: 4, strokeColor: 'black'});
 	                        	if(MENU.vietnameAdding.indexOf("he") > -1){                            
                                	if(this != temp){                                    
                                    	this.setMap(null);
                                    	if(temp) temp.setMap(map);
                            		}	                            			
                            		temp = this;           						
 								}                        
							});						

							google.maps.event.addListener(tempPolygon,"mouseout",function(){
 								this.setOptions({fillOpacity: 0.5, strokeWeight: 2, strokeColor: '#585858'}); 			
							});					
					
							var infoWindowMarkup = "<strong>OBVOD " + name.split("_")[1] + "</strong><br><br>Status : " 
										 + assignment + "<br>Datum : " + date + "<br>Info : " + info 
										 + "<br>Poznamky : " + notes + "<br><br><input id='pswdInput' class='pswdInput' placeholder='heslo'>"
										 + "</input>&nbsp;<button id='assgnBtn' disabled='true' class='assgnButton'>PRIDELIT</button>";

				
							var prev_infowindow = false; 
							(function(){
								var infowindow = new google.maps.InfoWindow({
          							content: infoWindowMarkup
        						}); 
							google.maps.event.addListener(tempPolygon,"click",function(event){ 
								if(prev_infowindow)	{
									prev_infowindow.close();
								}	
								prev_infowindow = infowindow;									
 								infowindow.setPosition(event.latLng);
 								infowindow.open(map);

 								var tempUser = "";
 								document.getElementById("pswdInput").addEventListener("keyup", function(){
 								
 									if(this.value.length >= 4){								
 										if(this.value.indexOf(tempUser.substring(0, 3)) != -1){
 							
 										$.ajax({
            								url: '/?action=getUser&usrpwd=' + this.value,
            								type: 'get',
            								dataType: 'json',
            								success: function(userData){            								
            									tempUser = userData[0].name;           							
            									var assignmentBtn = document.getElementById("assgnBtn");
            							    		assignmentBtn.disabled = false;
            							    		assignmentBtn.style.backgroundColor = "#4CAF50";
            							    		assignmentBtn.style.cursor = "pointer";
            							    		assignmentBtn.addEventListener("click", function(el){
														prev_infowindow.close();												
							
												var blockID = this.parentElement.getElementsByTagName("strong")[0].innerHTML.split(" ")[1];
												var date = new Date();
													date = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
												$.ajax({
                	 								type: 'POST',
                	 								url: "/?action=assign&user=" + JSON.stringify(userData[0]) + "&blockID=" + blockID + "&date=" + date,
                	 								success: function(){
														var music = document.createElement("div");
															music.innerHTML += "<audio id='mscOk' name='myMusic' loop='false' hidden='true' src='/multimedia/OK_Ok.ogg'></audio>";
															document.getElementById("container").appendChild(music);

                											var littleMusic = document.getElementById("mscOk");
			                									littleMusic.volume = 0.8;
			                									littleMusic.loop = false;
			                									littleMusic.play();                			            		
               										},
               										error: function(XMLHttpRequest, textStatus, errorThrown){
                            							console.log('error', errorThrown);
                           							}			
        										});													
												}, false);
            							    		console.log(" user id " + userData[0].name + " block ");					    	
                           						},
            							error: function(XMLHttpRequest, textStatus, errorThrown){
                            				console.log('error', errorThrown);
                            			}
            						})};	

									}

 							}, false);

						});

					})();
            	}	
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                            console.log('error', errorThrown);
                            }
                    });
    }

	}, false);	
	
	})(),
//*****************************************************************************************************
	zvestovatelia : (function(){
			BUTTONS.btnZvest.addEventListener("click", function(){					
				var container = document.getElementById("container");
					container.innerHTML ="<div class='mobileImage'></div><span class='title'><h1>Zvestovatelia</h1></span><button class='btnBack' id='btnBack'></button>";
					container.innerHTML += "<table class='table'><tbody><tr><td><button class='btnMain' id='zoznam'>ZOZNAM</button></td><td>"
                                        + "<button class='btnMain' id='pridanie'>PRIDANIE</button></td></tr><tr><td></td><td></td></tr><tr><td>"
                                        + "</td><td></td></tr></tbody></table>";		

        		document.getElementById("zoznam").addEventListener('click', function(){                                
            	var tableWrapper = document.createElement("div");
		      	tableWrapper.className = "tablescroll";
		      	var table1 = document.createElement("table");
		      		table1.id = "tableViet";
		      		table1.setAttribute("cellspacing", 0);
		      		table1.innerHTML = "<thead><tr><th>MENO</th><th>EMAIL</th><th>ZBOR</th></tr></thead>";

		      	$.ajax({
                	url: '/?action=getEvangelists',
                	type: 'get',
                	dataType: 'json',
                	success: function(data){        
                		var tbody = document.createElement("tbody");
                		for(var i=0; i < data.length; i++){
                			var tr = document.createElement("tr");
                			i === 0 ? tr.className ="first" : false;
                			var td1 = document.createElement("td");                		
                				td1.innerHTML = data[i].name;
                			var td2 = document.createElement("td");
                				td2.innerHTML = data[i].email;
                			var td3 = document.createElement("td");
                				td3.innerHTML = data[i].cong;
                			tr.appendChild(td1);
                			tr.appendChild(td2);
                			tr.appendChild(td3);
                			tbody.appendChild(tr);                		
                		}
                    	table1.appendChild(tbody);	
                    	tableInit(0.5);
                	},
            	error: function(XMLHttpRequest, textStatus, errorThrown){
                    console.log('error', errorThrown);
                }
            });			
			tableWrapper.appendChild(table1);
            container.removeChild(container.childNodes[3]);
			container.appendChild(tableWrapper);

        },false);    

		document.getElementById("pridanie").addEventListener('click', function(){
            var table = document.createElement("div");
                table.setAttribute("id", "tableInputViet");
                table.setAttribute("class", "tableInputViet");
                
                table.innerHTML += "<div class='row onerow'><div class='cell onecol'><span class='vietContent'>Meno:</span>"
                + "</div><div class='cell onecol'><input class='inputViet' type='text' autocorrect='off' name='name'></div><div class='cell onecol'>"
                + "<span class='vietContent'>Email:</span></div><div class='cell onecol'><input class='inputViet' type='email' autocorrect='off'>"
                + "</div></div><div class='row onerow'><div class='cell onecol'><span class='vietContent'>Zbor:</span></div><div class='cell onecol'><input type='text' class='inputViet' autocorrect='off'></div><div class='cell onecol'><span class='vietContent'>Heslo:</span></div><div class='cell onecol'><input class='inputViet' autocorrect='off' type='password' name='password'></div></div><div class='row tworow'><div class='cell onecol'><span class='vietContent'>INFO:</span></div><div class='cell threecol'><textarea></textarea></div></div>"
                + "<div class='row tworow'><div class='cell twocol'><img id='vietImg' src='/images/evangelists.png'></div><div class='cell twocol'><button type='submit' id='btnSave' class='btnVietSave'>ULOŽIŤ</button></div></div>";


			function addUser(){
					var dataUser = [], nodes = document.getElementsByTagName("input");		
					for(var i=0; i<nodes.length; i++){	
							dataUser.push(nodes[i].value);
						}
							 $.ajax({
			                	 type: 'POST',
			                	 url: "/?action=insert&n="+dataUser[0]+"&e="+dataUser[1]+"&z="+dataUser[2]+"&h="+dataUser[3],
			                	 data: dataUser,        
			                	 success: function() {
			                			  console.log("sent");
			                			  MENU.flagInsert = false;

			                		var littleMusic = document.getElementById("msc");
			                		littleMusic.volume = 0.8;
			                		littleMusic.loop = false;
			                		littleMusic.play();              	
			               		}      
			        		});
			};
            container.removeChild(container.childNodes[3]);
            container.appendChild(table);

            var checkInputUser = function(){
                var inputs = container.getElementsByClassName("inputViet");
                var count = 0;
                for(var i = 0; i < inputs.length; i++){  
                    if(inputs[i].name && inputs[i].value){                  
                        count++;
                    }
                }
                var save = document.getElementById("btnSave");
                if(count == 2){                    
                    save.className += " ok";
                }else{
                    save.className = "";         
                    save.className = "btnVietSave";                    
                }
            }

            var inputs = document.getElementsByTagName("input");
            for(var i = 0; i<inputs.length; i++){                 
                if(inputs[i].name == "name" || inputs[i].name == "password"){
                    inputs[i].addEventListener("blur",checkInputUser,false);
                }
            }
			document.getElementById("btnSave").addEventListener("click", addUser, false);            
            MENU.mobileKeyboardLayout();

			var music = document.createElement("div");
				music.innerHTML = "<audio id='msc' name='myMusic' loop='false' hidden='true' src='/multimedia/jmje.ogg'></audio>";
			container.appendChild(music);

},false);


		MENU.back(container);
 	}, false);
	})(),
//*****************************************************************************************************
	vietnamci : (function(){
            var allMarkers = [];		
			BUTTONS.btnViet.addEventListener("click", function(){	

			var container = document.getElementById("container");		
				container.innerHTML = "<div class='mobileImage'></div><span class='title'><h1>Nasli sme v obvode</h1></span><button class='btnBack' id='btnBack'></button>";
				container.innerHTML += "<table class='table'><tbody><tr><td><button class='btnMain' id='zoznam'>ZOZNAM</button></td><td>"
			 	 						+ "<button class='btnMain' id='pridanie'>PRIDANIE</button></td></tr><tr><td></td><td></td></tr><tr><td>"
			 	 						+ "</td><td></td></tr></tbody></table>";

            function addMarker(id, posLat, posLng, sex, flag, draggable){
                var icon = {
                    url: "/images/user_" + sex + "_head.svg",
					cursor: 'default',
					scaledSize: new google.maps.Size(30, 30)                    
                };                                

                var position = new google.maps.LatLng(posLat - 0.005, posLng + 0.00098);
                MENU.marker = new google.maps.Marker({
                    id: id,    
                    position: position,
                    icon: icon,
                    map: map,
                    draggable: draggable,
                    scaledSize: new google.maps.Size(1, 2)
                });       
                      
               allMarkers.push(MENU.marker);                   
            }

			document.getElementById("zoznam").addEventListener('click', function(){
                if(MENU.marker && MENU.marker.id && MENU.marker.id.indexOf("initial") == -1 && MENU.marker.id.indexOf("tempID") > -1) 	MENU.marker.setMap(null);
                if(MENU.status){
                    BUTTONS.btnObv.click();
                    MENU.status = false;
                }

                var infoHover = function(e){                    
                    if(this.tagName == "TD" && !this.childNodes[1]){
                        var infoBubble = document.createElement("div");          
                        infoBubble.innerHTML = this.alt;
                        infoBubble.className = "bubbleInfo"; 
                        infoBubble.style.top = e.clientY + "px";

                        this.appendChild(infoBubble);

                        this.addEventListener("mouseout",function(){
                            if(this.childNodes[1] && infoBubble.parentElement) infoBubble.parentElement.removeChild(infoBubble);
                        },false)
                    }

                    if(this.tagName == "TR"){
                        var id = this.childNodes[0].innerHTML;
                        var index = id.substring(id.indexOf("_")+1,id.length);
                        var tempMarker = allMarkers[index-1];               
                        tempMarker.setAnimation(google.maps.Animation.BOUNCE);

                        this.addEventListener("mouseout",function(){
                            tempMarker.setAnimation(null);
                        },false);
                    }
                }

				var tableWrapper = document.createElement("div");
					tableWrapper.className = "tablescroll";
				var table = document.createElement("table");
					table.id = "tableViet";
					table.setAttribute("cellspacing", 0);
					table.innerHTML = "<thead><tr><th>OZNAČENIE</th><th>ULICA</th><th>POHLAVIE</th><th>VEK</th><th>INFO</th></tr></thead>";
			
				$.ajax({
            	   url: '/?action=getVietnamese',
            	   type: 'get',
            	   dataType: 'json',
            	   success: function(data){        
                	   var tbody = document.createElement("tbody");
                	   for(var i=0; i < data.length; i++){
                    		var tr = document.createElement("tr");

                            tr.addEventListener("mouseover",infoHover,false);
                            tr.addEventListener("click",infoHover,false);

                    		i === 0 ? tr.className ="first" : false;
                    		var td1 = document.createElement("td");                		
                    		td1.innerHTML = data[i].name;
                    		var td2 = document.createElement("td");
                    		td2.innerHTML = data[i].street;
                    		var td3 = document.createElement("td");
                    		td3.innerHTML = data[i].sex;
                    		var td4 = document.createElement("td");
                    		td4.innerHTML = data[i].age;
                    		var td5 = document.createElement("td");
                    		td5.innerHTML = "info";
                            td5.style.color = "green";
                            td5.style.cursor = "pointer";
                            td5.alt = data[i].info;

                            td5.addEventListener("mouseover",infoHover,false);
                            td5.addEventListener("click",infoHover,false);

                    		tr.appendChild(td1);
                    		tr.appendChild(td2);
                    		tr.appendChild(td3);
                    		tr.appendChild(td4);
                    		tr.appendChild(td5);
                    		tbody.appendChild(tr);  
                    		var sex = data[i].sex == "muz" ? "he" : "she";   

                      	if(allMarkers[i] && allMarkers[i].id != data[i].name && allMarkers[i].id != "id.."){                
                    		addMarker(data[i].name, data[i].coords.lat, data[i].coords.lng, sex, "initial", false); 
                        }else if(allMarkers[i] == undefined){
                            addMarker(data[i].name, data[i].coords.lat, data[i].coords.lng, sex, "initial", false); 
                        }
                        info = data; 
                	}
                    var tfoot = document.createElement("tfoot");
                    tfoot.innerHTML = "<tr><th>SPOLU:</th><th>" + data.length + "</th><th></th><th></th><th></th></tr>";
                    table.appendChild(tbody);
                    table.appendChild(tfoot);	
                    tableInit(0.5);              
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    console.log('error', errorThrown);
                }
            });
			tableWrapper.appendChild(table);
			container.removeChild(container.childNodes[3]);
			container.appendChild(tableWrapper);

//if(MENU.marker && MENU.marker.id && MENU.marker.id.indexOf("initial") == -1 && MENU.marker.id.indexOf("tempID") > -1) MENU.marker.setMap(null);
			}, false);

//***********************

			document.getElementById("pridanie").addEventListener('click', function(){				
                if(MENU.marker && MENU.marker.id && MENU.marker.id.indexOf("id..") > -1) MENU.marker.setMap(null); 
				if(allMarkers.length > 0 && allMarkers[allMarkers.length-1].id.indexOf("id..") > -1) allMarkers.pop(); 

                if(MENU.status){
					BUTTONS.btnObv.click();
					MENU.status = false;
				}

				$.ajax({
            		url: '/?action=getVietnamese',
            		type: 'get',
            		dataType: 'json',
            		success: function(data){               		     
                	    injectContent(data);     		
                		}        
                });		

				function injectContent(data){
					var form = document.createElement("form");	
					form.setAttribute("method", "post");
					var table = document.createElement("div");
					table.setAttribute("id", "tableInputViet");
					table.setAttribute("class", "tableInputViet");
				
                    table.innerHTML += "<div class='row onerow'><div class='cell onecol'><span class='vietContent'>Označenie:</span>"
                    + "</div><div class='cell onecol'><input class='inputViet centerRed' autocorrect='off' name='name' value='XY_" + (data.length + 1) + "'></div><div class='cell onecol'>"
                    + "<span class='vietContent'>Ulica:</span></div><div class='cell onecol'><input class='inputViet' autocorrect='off' name='street' id='street'>"
                    + "</div></div><div class='row onerow'><div class='cell onecol'><span class='vietContent'>Pohlavie:</span></div><div class='cell onecol'><select class='inputViet' name='sex'><option value='muž'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;muž</option>"
                    + "<option value='žena'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;žena</option></select></div><div class='cell onecol'><span class='vietContent'>Vek:</span></div><div class='cell onecol'><select class='inputViet' name='age'><option value='mlady'>&nbsp;&nbsp;&nbsp;mladý</option>"
                    + "<option value='stredny'>&nbsp;&nbsp;&nbsp;stredný</option><option value='starsi'>&nbsp;&nbsp;&nbsp;starši</option></select></div></div><div class='row tworow'><div class='cell onecol'><span class='vietContent'>INFO:</span></div><div class='cell threecol'><textarea placeholder='..napíš info napr. meno zvestovateľa, kedy si našiel..'></textarea></div></div>"
                    + "<div class='row tworow'><div class='cell twocol'><img id='vietImg' class='tip' src='/images/user_he.svg'></div><div class='cell twocol'><button type='submit' id='btnVietSave' class='btnVietSave'>ULOŽIŤ</button></div></div>";

					form.appendChild(table);

					container.removeChild(container.childNodes[3]);
					container.appendChild(form);

					var dataVietnamee = {};						
					document.getElementById("btnVietSave").addEventListener("click", function(e){			
						e.preventDefault();
						var inputs = document.getElementsByClassName("inputViet");
                        var infoTextArea = document.getElementsByTagName("textarea")[0]; 
                        var saveButton = this;							

						for(i in inputs){								
							dataVietnamee[inputs[i].name] = inputs[i].value;
						}
                        dataVietnamee["info"] = infoTextArea.value;
                        dataVietnamee["coords"] = {lat: MENU.marker.getPosition().lat() + 0.005, lng: MENU.marker.getPosition().lng() - 0.00098};
                     
                        MENU.marker.setDraggable(false);
						  $.ajax({
							type: 'POST',
							url: "/?action=insertViet",			     
							dataType: 'text',
							data: JSON.stringify(dataVietnamee),
							contentType: 'application/json',		       
							success: function(){
							    console.log("sent");

                                var music = document.createElement("div");
                                    music.innerHTML += "<audio name='myMusic' id='mscThanks' loop='false' hidden='true' src='/multimedia/Dakujem_Cam_dn.ogg'></audio>";
                                    container.appendChild(music);

                                var littleMusic = document.getElementById("mscThanks");
                                    littleMusic.volume = 0.8;
                                    littleMusic.loop = false;
                                    littleMusic.play();  

                                    saveButton.className = "";
                                    saveButton.className = "btnVietSave";   
						    }      
						});  

                        if(allMarkers[allMarkers.length-1].id.indexOf("id..") > -1) allMarkers.pop(); 
                        if(MENU.marker.id.indexOf("id..") > -1) MENU.marker.id = "tempID"; 
                        
					}, false);

                    sex = "he";
					document.getElementsByTagName("select")[0].addEventListener("change", function(){								
                        sex = this.value == "muz" ? "he" : "she";								
						document.getElementById("vietImg").src = "/images/user_" + sex + ".svg"; 
					}, false);					
                           
                    var guide = function(text, X, Y){
                        if(!document.getElementsByClassName("bubble")[0]){
                            var bubble = document.createElement("div"); 
                            bubble.innerHTML = text;
                            bubble.setAttribute("class","bubble bubleEfect");
                            var body = document.getElementsByTagName("body")[0];                                

                            if(!document.getElementsByClassName("bubble")[0]){  
                                         
                                bubble.style.top = Math.round(X - 45) + "px";
                                bubble.style.left = Math.round(Y + 45) + "px";

                                body.appendChild(bubble);                                                                       
                                var timeout = setTimeout(function() {body.removeChild(bubble)}, 5000);
                            }else{                                       

                                 }
                        }                                    
                    }
                    MENU.mobileKeyboardLayout();

                    var checkInput = function(){
                        var inputStreet = document.getElementById("street");
                        var save = document.getElementById("btnVietSave");  
                          
                        if(inputStreet.value && allMarkers.length > 0 && allMarkers[allMarkers.length-1].id.indexOf("id..") > -1){                            
                            save.className += " ok";
                        }else{
                            save.className = "";
                            save.className = "btnVietSave";
                        }
                    }
                    document.getElementById("street").addEventListener("blur",checkInput,false); 
				    document.getElementById("vietImg").addEventListener("click", function(event){            
                        var imgSrc = "url('/images/user_" + sex + "_small.png'),auto";
                        var vietnameeImg = this;     
                        var body = document.getElementsByTagName("body")[0];            

                        MENU.vietnameAdding = sex;
                        document.getElementById("container").style.pointerEvents = "none";

                        if(!mobileSuffix){       																    
                            body.className = "";
						    body.style.cursor = imgSrc;
						    document.getElementById("map").style.cursor = imgSrc;                      
							vietnameeImg.style.visibility = "hidden";
							


                            guide("Kliknutim na mapku ma umiestnis kde si ma nasiel..", event.clientY, event.clientX);  

                        }else{

                            guide("Klikni na mapku na miesto kde si ma našiel..", event.clientY, event.clientX);  

                        }
				    }, false);	

				    google.maps.event.addListener(map, "click", function (e){	
                        if(MENU.vietnameAdding.indexOf("initial") == -1 && MENU.vietnameAdding.indexOf("none") == -1){						    
							MENU.vietnameAdding = "none";
                        //    var vietnameeImg = document.getElementById("vietImg");
						//	vietnameeImg.style.visibility = "initial";
                        //    vietnameeImg.style.zIndex = 100;

							var latLng = e.latLng;							    						    
							dataVietnamee["coords"] = {lat: latLng.lat(), lng: latLng.lng()};
			
    						var mp = document.getElementById("map");
                			var body = document.getElementsByTagName("body")[0];

                			if(mp.className.indexOf("cursorGrab") == -1)
    							mp.className += " cursorGrab";
    						if(body.className.indexOf("cursorGrab") == -1)														
    							body.className += " cursorGrab";	
               
                            document.getElementById("container").style.pointerEvents = "auto";                                   
                            addMarker("id..", latLng.lat() + 0.005, latLng.lng()  - 0.00098, sex, false, true);
                            checkInput();
                        }                           
				    });
				}
			}, false);
		MENU.back(container);
 	}, false);

    if(!mobileSuffix){
	   	google.maps.event.addListener(map, 'mousemove', function(event){
         	if(MENU.vietnameAdding.indexOf("he") > -1) {            				
            	map.setOptions({ draggableCursor: 'url(/images/user_' + MENU.vietnameAdding + '_small.png), move' });
         	}else if(MENU.vietnameAdding != "initial"){
            	map.setOptions({ draggableCursor: 'auto'});
            	var mp = document.getElementById("map");
            	var body = document.getElementsByTagName("body")[0]
            					
                if(mp.className.indexOf("cursorGrab") == -1)
                	mp.className += " cursorGrab";
                if(body.className.indexOf("cursorGrab") == -1)
                	body.className += " cursorGrab";                                						
         	}
      	});		
    }

	})(),
//*****************************************************************************************************
	zaujemci : (function(){
		BUTTONS.btnZauj.addEventListener("click", function(){	

		var container = document.getElementById("container")
			container.innerHTML ="<div class='mobileImage'></div><span class='title'><h1>Zaujemcovia</h1></span><button class='btnBack' id='btnBack'></button>"
		+ "";
		MENU.back(container);
 	  }, false);
	})(),
//*****************************************************************************************************
	pokyny : (function(){
		BUTTONS.btnPokn.addEventListener("click", function(){	

		var container = document.getElementById("container");
			container.innerHTML ="<div class='mobileImage'></div><span class='title'><h1>Pokyny</h1></span><button class='btnBack' id='btnBack'></button>";
		
		var pokynyTableWrapper = document.createElement("div");	
			pokynyTableWrapper.className = "pokynyTableWrapper" + mobileSuffix;

		var uvod = "<strong>Cudzojazycna aktivita</strong> - velka prilezitost najst milych ludi, ktori su ochotni pocuvat biblicku pravdu :) + ucast"
				 + " na zaujimavej a povzbudzujucej forme sluzby";

		var obvody = "<strong>Obvody</strong> - je tu 80 obvodov ide o prve rozdelenie obvodov mozno sa casom ukaze ze bude treba 	niektore rozdelit "
				   + "alebo spojit myslienka bola taka aby v ramci obvodu bolo priblizne rovnaky pocet bytov, niektore obvody su aj v priemyselnych "
				   + "alebo okrajovych castiach Kosic. Hranice obvodov by mali byt v zhode s ulicami avsak nie kazdy obvod je tak ohraniceny.. "
				   + "Kedze je potrebne prepracovat cele Kosice prosim vyberajte obvody mestske aj tie odlahle.. ";

		var zvestovatelia = "<strong>Zvestovatelia</strong> - do tejto aktivity sa moze zapojit pokrsteny zvestovatel ktory ma seriozny zaujem sa podielat vo vyhladavacej sluzbe, "
						  +	"a ucit sa vietnamsky jazyk.. Skor ako sa prihlasite o obvod zaregistrujte sa v casti 'Zvestovatelia' zadajte heslo s apon 6 znakmi";

		var vyhladavanie = "<strong>Vyhladavacia sluzba</strong> - </h2>";				  

		var app_info = "<strong>Aplikacia</strong> - sluzi na organizovanie vietnamskej aktivity pre zdielanie a ukladanie informacii"
				   	 + " ide o prvu verziu (zaregistrovanie, pridelenie obvodu) casom budu doplnene ostatne casti.. je to optimalizovane pre <b>PC a Tablety nie telefony</b>";

		var content = "<table class='pokynyTable'><tr><td>"+uvod+"</td></tr><tr><td>"+obvody+"</td></tr>"
					+ "<tr><td>"+zvestovatelia+"</td></tr><tr><td>"+vyhladavanie+"</td></tr>"
					+ "<tr><td>"+app_info+"</td></tr></table>";		
		pokynyTableWrapper.innerHTML = content;
		container.appendChild(pokynyTableWrapper);			

		MENU.back(container);
 	}, false);
	})(),
//*****************************************************************************************************
	smile : (function(){
			BUTTONS.btnSmile.addEventListener("click", function(){	

			var container = document.getElementById("container")
				container.innerHTML ="<div class='mobileImage'></div><span class='title'><h1> :) </h1></span><button class='btnBack' id='btnBack'></button>"
			+ "";

			var vietPhrases = [{"Ahoj":{"viet":"Chao","name":"Ahoj_Chao"}},
							   {"Ahoj 2":{"viet":"Tam Biet","name":"Ahoj_Tam_Biet"}},
							   {"Ano":{"viet":"Co","name":"Ano_Co"}},
							   {"Dakujem":{"viet":"Cam dn","name":"Dakujem_Cam_dn"}},
							   {"Dobry Den":{"viet":"Cin Chao","name":"DobryDen_Cin_Chao"}},
							   {"Dovidenia":{"viet":"Heng Ap lai","name":"Dovidenia_heng_ap_lai"}},
							   {"Mozno":{"viet":"Co le Co the chac la","name":"Mozno_Co_le_Co_the_chac_la"}},
							   {"OK":{"viet":"Ok","name":"OK_Ok"}},
							   {"Prepacte":{"viet":"Xin loi","name":"Prepacte_Xin_loi"}},
							   {"Prosim":{"viet":"Khong co gi","name":"Prosim_Khong_co_gi"}}];

			var random = Date.now().toString().substring(12,13);
			var fileName, slov, viet, name = "";	

			for(obj in vietPhrases[random]){
				fileName = vietPhrases[random][obj].name;
				slov = obj;
				viet = vietPhrases[random][obj].viet;
				name = vietPhrases[random][obj].name;
			}

			container.innerHTML += "<pre><h2>" + slov + ":</h2>   <h3>'" + viet + "'</h3></pre>";

			var music = document.createElement("div");
				music.innerHTML = "<audio id='msc' name='myMusic' loop='false' hidden='true' src='/multimedia/" + name + ".ogg'></audio>";
			container.appendChild(music);
			var littleMusic = document.getElementById("msc");
			                		littleMusic.volume = 0.8;
			                		littleMusic.loop = false;
			                		littleMusic.play();      

			MENU.back(container);
 		}, false);
	})(),
//*****************************************************************************************************
	back : function(el){			
			BUTTONS.btnBack().addEventListener("click", function(){
			 	el.innerHTML = "<div class='mobileImage'></div><span class='title'><h1>Cudzojazycna aktivita</h1></span>";
			 	var table = document.createElement("table");
			 	 	table.className = "table";
			 	for(var i = 1; i<=3; i++){
			 		var tr = document.createElement("tr");
			 		var td1 = document.createElement("td");	 	
			 		var td2 = document.createElement("td");
					if(i == 1){
				 		td1.appendChild(BUTTONS.btnObv);
				 		tr.appendChild(td1);	
				 		td2.appendChild(BUTTONS.btnZvest);
				 		tr.appendChild(td2);
				 	}
				 	if(i == 2){
				 		td1.appendChild(BUTTONS.btnViet);
				 		tr.appendChild(td1);	
				 		td2.appendChild(BUTTONS.btnZauj);
				 		tr.appendChild(td2);
				 	}
				 	if(i == 3){
				 		td1.appendChild(BUTTONS.btnPokn);
				 		tr.appendChild(td1);	
				 		td2.appendChild(BUTTONS.btnSmile);
				 		tr.appendChild(td2);
				 	}
				table.appendChild(tr);
			}
		 	el.appendChild(table);

            var bubble = document.getElementsByClassName("bubble ")[0];           
            if(bubble) bubble.style.visibility = "hidden"; 

            if(MENU.marker && MENU.marker.id && MENU.marker.id.indexOf("initial") == -1 && MENU.marker.id.indexOf("id..") > -1) MENU.marker.setMap(null);
		}, false);
	},

    mobileKeyboardLayout : function(){
        function changeLayout(input){
            var tbl = document.getElementById("tableInputViet"); 
            var rows = tbl.childNodes;
            var row = input.parentElement.parentElement;
            var img = document.getElementById("vietImg");

            tbl.className += " tempInputTableShrink";
            for(var i = 0; i < rows.length; i++){       
                 if(rows[i] != row){               
                    rows[i].className = "tempInputRemover";
                }
            }
            if(img) img.className = "tempInputRemover";           
            
                input.addEventListener("blur",function(){                                                   
                    rows[0].className = "row onerow";   
                    rows[1].className = "row onerow"; 
                    rows[2].className = "row tworow"; 
                    rows[3].className = "row tworow";                          
                    tbl.className = "";
                    tbl.className = "tableInputViet";
                    if(img) img.className = "initial";
                }, false);
        }

        if(mobileSuffix){ 
            var inputs = document.getElementsByTagName("input");
            for(var i = 0; i < inputs.length; i++){
                inputs[i].addEventListener("click", function(){                             
                    changeLayout(this);
                }, false);        
            }
            var textarea = document.getElementsByTagName("textarea")[0];
                textarea.addEventListener("click", function(){
                    changeLayout(this);
                },false);
        }      
    }

}

}

//COMMANDS
//git add . 
//git commit -m "meassage"
//git push origin master
//heroku config --app viet-akt
//mongo ds033976.mlab.com:33976/heroku_cn0nx3mh -u <heroku_cn0nx3mh> -p <ma03jjlbsft8eb62dmcode3eg1>
//heroku logs --app viet-akt
//heroku restart --app viet-akt

//********************  BUGS  **************************
//-FIREFOX - inputs too much height
//-FIREFOX - blocks information : name is not in bold
//-Tablet CHROME - remove Home button when SW keyboard 
//-Tablet CHROME - revert back table shrink once keyboard close
//-Tablet CHROME - Home button is choppy not smooth 
//-Tablet CHROME - improve leyout shrink in SW keyboard (border overlaps title background)
//-Tablet CHROME - when button is pressed and finger moved little button square is displayed
//-Tablet NATIVE - when button is pressed there is ALWAYS displayed a button square
//-Tablet NATIVE - table adding cells are not centered vertically to middle
//-Tablet NATIVE - table when input in focus change to square
//-Tablet NATIVE - improve leyout shrink in SW keyboard (border overlaps title background)
//-Tablet NATIVE - when SW keyboard is closed - table layout is not like original 
//-Tablet NATIVE - when vietnamese image is clicked button square is displayed
//-Tablet NATIVE - shrink layout needs to be implemented even when input selection !!
//-Tablet NATIVE - in lists there is quite big font
//-Tablet NATIVE - in list infohover off screen at right side
//-Tablet NATIVE - 

//********************* FEATURES ************************
//
//-display / print block
//-block numbers
//-add EDIT(delete) feature
//-add block in blocked mode once worked out
//-add info about vietnamese when clicked on it
//
//
//
