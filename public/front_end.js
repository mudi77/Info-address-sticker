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
//alert("device screen :: " + Math.round(width) + " x " + Math.round(height) + " sum :: " + Math.round(width) * Math.round(height));
var blockDevice = (Math.round(width) * Math.round(height)) < 40 ? true : false;

var body = document.getElementsByTagName("body")[0];
if(blockDevice){
	
	body.setAttribute("class", "blockElement");
	body.innerHTML = "<center><b>Xin lỗi   :(</b></center><br>NEPODPOROVANE ZARIADENIE... PREPACTE ALE OBSAH SA NEZOBRAZI.. skuste prosim tablet alebo PC  <b>;)</b>";
}else{
	body.setAttribute("class", "");
}

}

function table(){

var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight  || document.body.clientHeight;

var thisWidth = parseInt(width * 0.34);
var thisHeight = parseInt(height * 0.4); 

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
        //   markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
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
							assignment = "neprideleny";
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
                     		
                        var temPolygon = new google.maps.Polygon({
							paths: block,
							draggable: false, 
							editable: false,
							strokeColor: '#585858',
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillColor: color,
							fillOpacity: 0.5
						});
                         
 					temPolygon.setMap(map); 
 					google.maps.event.addListener(temPolygon,"mouseover",function(){
 						this.setOptions({fillOpacity: 0.35, strokeWeight: 4, strokeColor: 'black'});
					});   
					google.maps.event.addListener(temPolygon,"mouseout",function(){
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
						google.maps.event.addListener(temPolygon,"click",function(event){ 
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
									//		var blockID = this.parentElement.getElementsByTagName("strong")[0].innerText.split(" ")[1];
											var blockID = this.parentElement.getElementsByTagName("strong")[0].innerHTML.split(" ")[1];
											var date = new Date();
												date = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
													 $.ajax({
                	 								 type: 'POST',
                	 								 url: "/?action=assign&user=" + JSON.stringify(userData[0]) + "&blockID=" + blockID + "&date=" + date,
                	 						//		 data: userData,
                	 						//		 dataType: "json",
                	 								 success: function(){
var music = document.createElement("div");
				music.innerHTML += "<audio id='mscOk' name='myMusic' loop='false' hidden='true' src='/multimedia/OK_Ok.ogg'></audio>";
				document.getElementById("container").appendChild(music);


                									 	console.log("sent");   
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

	zvestovatelia : (function(){
			BUTTONS.btnZvest.addEventListener("click", function(){					
		var container = document.getElementById("container")
			container.innerHTML ="<div class='mobileImage'></div><span class='title'><h1>Zvestovatelia</h1></span><button class='btnBack' id='btnBack'></button>";
					
		var getEvangelists = function(refresh){
					if(refresh){						
						var tbl = document.getElementsByClassName("tablescroll")[0];
						tbl.parentElement.removeChild(tbl);
					};

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
                table();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                            console.log('error', errorThrown);
                            }
            });			
			tableWrapper.appendChild(table1);
			container.appendChild(tableWrapper);

            };	
            getEvangelists();

			var table2 = document.createElement("table");
			table2.setAttribute("id", "tableEvanInput");
			table2.setAttribute("class", "tableEvanInput");
			table2.innerHTML += "<tr><td><input class='inputEvan' type='text' autocorrect='off' placeholder='Meno'>"
			+ "</td><td><input class='inputEvan' type='email' autocorrect='off' placeholder='Email'></td><td>"
			+ "<input class='inputEvan' type='text' autocorrect='off' placeholder='Zbor'></td><td><input class='inputEvan' type='password' autocorrect='off' placeholder='Heslo'>"
			+ "</td><td id='btnholder'></td></tr>"; 

			var btnSubmit = document.createElement("button");
			btnSubmit.setAttribute("class", "btnSubmit");			
			btnSubmit.innerHTML = "PRIDAT";
			function addUser(){
					var dataUser = [], nodes = this.parentElement.parentElement.childNodes;		
					for(var i=0; i<nodes.length; i++){				
							dataUser.push(nodes[i].childNodes[0].value);
						}
		//		 	if(MENU.flagInsert){
		//		 		MENU.flagInsert = false;
							 $.ajax({
			                	 type: 'POST',
			                	 url: "/?action=insert&n="+dataUser[0]+"&e="+dataUser[1]+"&z="+dataUser[2]+"&h="+dataUser[3],
			                	 data: dataUser,        
			                	 success: function() {
			                			  console.log("sent");
			                			  MENU.flagInsert = false;
			                			  getEvangelists("refresh");  
			        //        		btnSubmit.removeEventListener("click", addUser, false); 
			                		var littleMusic = document.getElementById("msc");
			                		littleMusic.volume = 0.8;
			                		littleMusic.loop = false;
			                		littleMusic.play();              	
			               		}      
			        		});
		//			}	

			};
			btnSubmit.addEventListener("click", addUser, false);
			container.appendChild(table2);
			document.getElementById("btnholder").appendChild(btnSubmit);

var inputs = document.getElementsByTagName("input");

for(var i = 0; i < inputs.length; i++){
	inputs[i].addEventListener("click", function(){

var back, table;
    if(mobileSuffix){ 
		 	back = document.getElementById("btnBack");
		 	table = document.getElementsByClassName("tablescroll")[0];    	   	
        	
    	var back = document.getElementById("btnBack");
    	if(back){
    		back.style.visibility = "hidden";
    		table.style.visibility = "hidden";
    	}

		this.addEventListener("focusout",function(){
			console.log("tu som");
			back.style.visibility = "visible";
		    table.style.visibility = "visible";
		}, false);
	}else if(back & table){
			back.style.visibility = "visible";
		    table.style.visibility = "visible";
	}


}, false);
}

			var music = document.createElement("div");
				music.innerHTML = "<audio id='msc' name='myMusic' loop='false' hidden='true' src='/multimedia/jmje.ogg'></audio>";
			container.appendChild(music);

		MENU.back(container);
 	}, false);
	})(),

	vietnamci : (function(){
			BUTTONS.btnViet.addEventListener("click", function(){	

		// var container = document.getElementById("container");
		// console.log(container.childNodes[1]);
		// var temp = container.childNodes[1] + "";
			container.innerHTML = "<div class='mobileImage'></div><span class='title'><h1>Vietnamci</h1></span><button class='btnBack' id='btnBack'></button>"
		+ "";
 
	//	container.appendChild(temp);
		MENU.back(container);
 	}, false);
	})(),

	zaujemci : (function(){
			BUTTONS.btnZauj.addEventListener("click", function(){	

		var container = document.getElementById("container")
			container.innerHTML ="<div class='mobileImage'></div><span class='title'><h1>Zaujemcovia</h1></span><button class='btnBack' id='btnBack'></button>"
		+ "";
		MENU.back(container);
 	}, false);
	})(),

	pokyny : (function(){
			BUTTONS.btnPokn.addEventListener("click", function(){	

		var container = document.getElementById("container");
			container.innerHTML ="<div class='mobileImage'></div><span class='title'><h1>Pokyny</h1></span><button class='btnBack' id='btnBack'></button>";
		
		var pokynyTableWrapper = document.createElement("div");	
			pokynyTableWrapper.className = "pokynyTableWrapper" + mobileSuffix;

		var uvod = "<strong>Vietnamska aktivita</strong> - velka prilezitost najst milych ludi, ktori su ochotni pocuvat biblicku pravdu :) + ucast"
				 + " na zaujimavej a povzbudzujucej forme sluzby";

		var obvody = "<strong>Obvody</strong> - je tu 80 obvodov ide o prve rozdelenie obvodov mozno sa casom ukaze ze bude treba niektore rozdelit "
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
			console.log(obj + " vietnamsky : " + vietPhrases[random][obj].viet + " file : " + vietPhrases[random][obj].name);
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

	back : function(el){			
			BUTTONS.btnBack().addEventListener("click", function(){
			 	el.innerHTML = "<div class='mobileImage'></div><span class='title'><h1>Vietnamska aktivita</h1></span>";
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
		}, false);
	}
}

}

//********************  BUGS  **************************

//add multimedia and pick them randomly :)

//tilt after navigation doesn't display rotating device FIXED
//-tilt to portrait in zvestovatelia displays table.. FIXED

//-in smartphone is not show rotating device   FIXED
//-in smartphone lauout is broken 	FIXED
//- block at ALL smartphones 
//- cross browser cross device layout in POKYNY !!!
//- HOME button proportional !!!

//********************* FEATURES ************************
//-add vietnamiese 
//-display / print block
//-block numbers
//
//
//
//
