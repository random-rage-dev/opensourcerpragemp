mp.events.add("server:lspd:clothes", (player,name) => {
    if (name == "Standard-Uniform") {
                
        gm.mysql.handle.query("UPDATE characters SET factioncloth = 'Standard-Uniform' WHERE id = ?", [player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Faction Clothes: "+err);
            if (player.data.gender == 0) {
                player.setClothes(3,30,0,2); // Torso
                player.setClothes(8,122,0,2); // Shirt
                player.setClothes(11,55,0,2); // Jacke
                player.setClothes(4,47,0,2); // Hose
                player.setClothes(6,35,0,2); // Schuhe
            } else {
                player.setClothes(3,14,0,2); // Torso
                player.setClothes(8,152,0,2); // Shirt
                player.setClothes(11,48,0,2); // Jacke
                player.setClothes(4,112,0,2); // Hose
                player.setClothes(6,27,0,2); // Schuhe
            }                 
        });
    } else {
        if (name == "Parade-Uniform") {
            gm.mysql.handle.query("UPDATE characters SET factioncloth = 'Parade-Uniform' WHERE id = ?", [player.data.charId], function(err3,res3) {
                if (err3) console.log("Error in Update Faction Clothes: "+err3);
                if (player.data.gender == 0) {
                    player.setClothes(3,30,0,2); // Torso
                    player.setClothes(8,58,0,2); // Shirt
                    player.setClothes(11,55,0,2); // Jacke
                    player.setClothes(4,35,0,2); // Hose
                    player.setClothes(6,25,0,2); // Schuhe
                } else {
                    player.setClothes(3,57,0,2); // Torso
                    player.setClothes(8,35,0,2); // Shirt
                    player.setClothes(11,48,0,2); // Jacke
                    player.setClothes(4,34,0,2); // Hose
                    player.setClothes(6,25,0,2); // Schuhe
                }                
            });
        } else {
            if (name == "Zivil") {
                gm.mysql.handle.query("UPDATE characters SET factioncloth = 'Zivil' WHERE id = ?", [player.data.charId], function(err4,res4) {
                    if (err4) console.log("Error in Update Faction Clothes: "+err4);
                    gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[player.data.charId], function(err5,res5) {
                        if (err5) console.log("Error in Select Character: "+err5);
                        
                        res5.forEach(function(modelData) {
                            player.setProp(0,modelData.hat,modelData.hattext); //Hut
                            player.setProp(1,modelData.eye,modelData.eyetext); //Brille
                            player.setClothes(1,modelData.mask,modelData.masktext,0); //Masken
                            player.setClothes(3,modelData.torso,0,0); //Torso
                            player.setClothes(4,modelData.leg,modelData.legtext,0); //Hose
                            player.setClothes(6,modelData.shoe,modelData.shoetext,0); //Schuhe
                            player.setClothes(11,modelData.jacket,player.data.jackettext,0);//Jacke
                            player.setClothes(8,modelData.shirt,modelData.shirttext,0); //Shirt
                            player.setClothes(9,modelData.body,modelData.bodytext,0); //Body
                        });                          
                   });                                   
               });                
            }
        }
    }
});
mp.events.add("server:lspd:mainMenu", (player,slot) => {
	let target = player.data.target;
	if(slot == 0)
	{
		// Dienstausweis zeigen
	}
	else if(slot == 1)
	{
		target.notify("Dir wurden Handstellen angelegt!");
		player.notify("Bürger festgenommen");
	}
	else if(slot == 2)
	{
		target.notify("Die Handschellen wurden dir abgenommen!");
		player.notify("Bürger freigelassen");
	}
	else if(slot == 3)
	{
		// Durchsuchen
	}
	else if(slot == 4)
	{
		//Bußgeld ausstellen
	}
	else if(slot ==5)
	{
		player.call("client:lspd:closeMainMenu");
		player.call("client:lspd:openMemberMenu");
	}
});
mp.events.add("server:lspd:memberMenu", (player,slot) => {
    let target = player.data.target;
    if(slot == 0)
    {
        if(target.data.faction == "Civillian")
        {
           // Person Einstellen     
        }else {
            player.notifyWithPicture("Los Santos Police Departement", "Einstellung", "Hat bereits eine Anstellung!","CHAR_CALL911");
        }
    }
    else if (slot == 1)
    {
        if(target.data.faction == "LSPD")
        {
            //Befördern
        }
    }
    else if(slot == 2)
    {
        if(target.data.faction == "LSPD")
        {
            //Dienstnummer zuweisen
        }
    }
    else if(slot == 3)
    {
        if(target.data.faction == "LSPD")
        {
            //Mitarbeiter entlassen
            player.notify("Ist Member");
            player.call("client:lspd:closeMemberMenu");
            player.call("client:lspd:askedForDismiss");
        }
    }
});
mp.events.add("server:lspd:dismissMember", (player,itemText) => {
    let target = player.data.target;
    if(itemText == "Ja")
    {
        target.notifyWithPicture("Los Santos Police Departement", "Entlassung", "Deine Anstellung wurde beendet","CHAR_CALL911");
        target.call("client:faction:delmarkers");
        player.notifyWithPicture("Los Santos Police Departement", "Mitarbeiterverwaltung","Du hast "+target.data.firstname + " "+ target.data.lastname + " entlassen.","CHAR_CALL911");
        target.data.faction = "Civillian";
        target.data.factionDuty = 0;
        target.data.factionrang = 0;
        gm.mysql.handle.query("UPDATE characters SET faction = ?, duty = ?, factionrang = ?, factioncloth = 'Zivil' WHERE id = ?", [target.data.faction, target.data.factionDuty,target.data.factionrang,target.data.charId], function(err12, ress12) {
            if(err12) console.log("Error in LSPD Dismiss Member");
        });
        gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[target.data.charId], function(err5,res5) {
            if (err5) console.log("Error in Select Character: "+err5);
            
            res5.forEach(function(modelData) {
                target.setProp(0,modelData.hat,modelData.hattext); //Hut
                target.setProp(1,modelData.eye,modelData.eyetext); //Brille
                target.setClothes(1,modelData.mask,modelData.masktext,0); //Masken
                target.setClothes(3,modelData.torso,0,0); //Torso
                target.setClothes(4,modelData.leg,modelData.legtext,0); //Hose
                target.setClothes(6,modelData.shoe,modelData.shoetext,0); //Schuhe
                target.setClothes(11,modelData.jacket,player.data.jackettext,0);//Jacke
                target.setClothes(8,modelData.shirt,modelData.shirttext,0); //Shirt
                target.setClothes(9,modelData.body,modelData.bodytext,0); //Body
            });                          
       });
       player.call("client:lspd:closeDismissMenu");

    }
    else{
        player.call("client:lspd:closeDismissMenu");
        player.call("client:lspd:closeMainMenu");
		player.call("client:lspd:openMemberMenu");
    }
});
mp.events.add("server:lspd:officeComputer", (player, itemText) => {
    if(itemText == "Aktive Mitarbeiter")
    {
        gm.mysql.handle.query("SELECT * FROM characters WHERE faction = 'LSPD' AND duty = '1'",[],function(err,res) {
            if(err) console.log("Error in Select Active LSPD Members: "+err);
            if (res.length > 0) {
                var PlayerList = [];
                var i = 1;
                res.forEach(function(players) {
                    let obj = { "firstname": String(players.firstname), "lastname": String(players.lastname),"factionrang": String(players.factionrang), "onlineid": String(players.onlineId)};
                    PlayerList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if (mp.players.exists(player)) player.call("client:lspd:activeMemberList", [JSON.stringify(PlayerList)]);
                    }
                    i++;
                });
            } else {
                //Keine Spieler Online
            }
        });    
    } 
    else if(itemText == "Dispatches")
    {
            player.notify("Dispatches");
    }
    else if (itemText == "Ausnahmezustand")
    {
        gm.mysql.handle.query("SELECT ausnahme FROM faction WHERE name = 'LSPD'",[],function(err1,res1) {
            if (err1) console.log("Error in Select ausnahmezustand: "+err1);
            if (res1[0].ausnahme == 0) {
                gm.mysql.handle.query("UPDATE faction SET ausnahme = '1' WHERE name = 'LSPD'",[],function(err,res) {
                    if (err) console.log("Error in Update ausnahmezustand: "+err);
                    mp.players.forEach(
                        (playerToSearch, id) => {
                            if (playerToSearch.data.faction == "LSPD" && playerToSearch.data.factionDuty == 1) {                
                                playerToSearch.notifyWithPicture("Los Santos Police Departement", "Ausnahmezustand", "Der Ausnahmezustand wurde aktiviert!","CHAR_CALL911");
                            }                      
                        }
                    );
                });
            } else {
                gm.mysql.handle.query("UPDATE faction SET ausnahme = '0' WHERE name = 'LSPD'",[],function(err,res) {
                    if (err) console.log("Error in Update ausnahmezustand: "+err);
                    mp.players.forEach(
                        (playerToSearch, id) => {
                            if (playerToSearch.data.faction == "LSPD" && playerToSearch.data.factionDuty == 1) {                
                                playerToSearch.notifyWithPicture("Los Santos Police Departement", "Ausnahmezustand", "Der Ausnahmezustand wurde deaktiviert!","CHAR_CALL911");
                            }                      
                        }
                    );
                });
            }            
        });   
    }
});

mp.events.add("server:lspd:weapons",(player,weapon) => {
    if (weapon == "Taschenlampe") {
        gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '192' OR itemId = '193'",[player.data.charId],function(err,res){
            if (err) console.log("Error in Select Weapon: "+err);
            if (res.length > 0) {
                player.notify("~r~Altah übertreib nicht eine "+weapon+" reicht!");
            } else {
                gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,192,1)",[player.data.charId], function(err1,res) {
                    if (err1) console.log("Error in Insert Weapon: "+err1);
                });
            }
        });
    }
    if (weapon == "Schlagstock") {
        gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '194' OR itemId = '195'",[player.data.charId],function(err,res){
            if (err) console.log("Error in Select Weapon: "+err);
            if (res.length > 0) {
                player.notify("~r~Altah übertreib nicht eine "+weapon+" reicht!");
            } else {
                gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,194,1)",[player.data.charId], function(err1,res) {
                    if (err1) console.log("Error in Insert Weapon: "+err1);
                });
            }
        });
    }
    if (weapon == "Tazer") {
        gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '196' OR itemId = '197'",[player.data.charId],function(err,res){
            if (err) console.log("Error in Select Weapon: "+err);
            if (res.length > 0) {
                player.notify("~r~Altah übertreib nicht eine "+weapon+" reicht!");
            } else {
                gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,196,1)",[player.data.charId], function(err1,res) {
                    if (err1) console.log("Error in Insert Weapon: "+err1);
                });
            }
        });
    }
    if (weapon == "Pistole Kaliber .50") {
        gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '198' OR itemId = '199'",[player.data.charId],function(err,res){
            if (err) console.log("Error in Select Weapon: "+err);
            if (res.length > 0) {
                player.notify("~r~Altah übertreib nicht eine "+weapon+" reicht!");
            } else {
                gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,198,1)",[player.data.charId], function(err1,res) {
                    if (err1) console.log("Error in Insert Weapon: "+err1);
                });
            }
        });
    }
    if (weapon == "AP-Pistole") {
        gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = '200' OR itemId = '201'",[player.data.charId],function(err,res){
            if (err) console.log("Error in Select Weapon: "+err);
            if (res.length > 0) {
                player.notify("~r~Altah übertreib nicht eine "+weapon+" reicht!");
            } else {
                gm.mysql.handle.query("INSERT INTO user_items(charId,itemId,amount) VALUES(?,200,1)",[player.data.charId], function(err1,res) {
                    if (err1) console.log("Error in Insert Weapon: "+err1);
                });
            }
        });
    }
});

mp.events.add("server:lspd:mitarbeiter",(player) => {
    gm.mysql.handle.query("SELECT * FROM characters WHERE faction = 'LSPD'",[],function(err,res) {
        if (err) console.log("Error in Select LSPD Characters: "+err);
        if (res.length > 0) {
            var LSPDList = [];
            var i = 1;
            res.forEach(function(lspd) {
                let obj = { "firstname": String(lspd.firstname), "lastname": String(lspd.lastname),"factionrang": String(lspd.factionrang), "id": String(lspd.id)};
                LSPDList.push(obj);
                if (parseInt(i) == parseInt(res.length)) {
                    if (mp.players.exists(player)) player.call("client:lspd:Memberlist", [JSON.stringify(LSPDList)]);
                }
                i++;
            });
        } else {   
            player.notify("Es gibt keine LSPD Beamten");
        }
     });
});

mp.events.add("server:lspd:mitarbeiter",(player,id) => {
    gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[id],function(err,res) {
        if (err) console.log("Error in Select Kündigen Char: "+err);
        res.forEach(function(lspd) {
            if (lspd.isOnline == 1) {
                gm.mysql.handle.query("UPDATE characters SET faction = 'Civillian', duty = '0', factionrang = '0', factioncloth = 'Zivil' WHERE id = ?",[id],function(err1,res1) {
                    if (err1) console.log("Error in Update Faction Char: "+err1);
                    mp.players.forEach(
                        (playerToSearch, id) => {
                            if (playerToSearch.id == lspd.onlineId) {                
                                playerToSearch.data.faction == 'Civillian';
                                playerToSearch.data.factionDuty == 0;
                                playerToSearch.data.factionrang == 0;
                                playerToSearch.setProp(0,lspd.hat,lspd.hattext); //Hut
                                playerToSearch.setProp(1,lspd.eye,lspd.eyetext); //Brille
                                playerToSearch.setClothes(1,lspd.mask,lspd.masktext,0); //Masken
                                playerToSearch.setClothes(3,lspd.torso,0,0); //Torso
                                playerToSearch.setClothes(4,lspd.leg,lspd.legtext,0); //Hose
                                playerToSearch.setClothes(6,lspd.shoe,lspd.shoetext,0); //Schuhe
                                playerToSearch.setClothes(11,lspd.jacket,lspd.jackettext,0);//Jacke
                                playerToSearch.setClothes(8,lspd.shirt,lspd.shirttext,0); //Shirt
                                playerToSearch.setClothes(9,lspd.body,lspd.bodytext,0); //Body
                                playerToSearch.call("client:faction:delmarkers");
                            }                      
                        }                        
                    );
                    player.notify("~g~Der Bürger wurde entlassen");
                });
            } else {
                gm.mysql.handle.query("UPDATE characters SET faction = 'Civillian', duty = '0', factionrang = '0', factioncloth = 'Zivil' WHERE id = ?",[id],function(err1,res1) {
                    if (err1) console.log("Error in Update Faction Char: "+err1);
                    player.notify("~g~Der Bürger wurde entlassen");
                });
            }
        });
    });
});

mp.events.add("server:lspd:spawnVehicle",(player,type) => {
        const one = new mp.Vector3(431.3031005859375, -997.4159545898438, 25.75902557373047);
        const onehead = 175;
        const two = new mp.Vector3(436.0919189453125, -997.0447387695312, 25.763492584228516);
        const twohead = 178;
        const three = new mp.Vector3(447.4159851074219, -996.7778930664062, 25.767000198364258);
        const threehead = 174;
        const four = new mp.Vector3(462.73651123046875, -1014.9760131835938, 28.0690975189209);
        const fourhead = 86;
    if (type == "Stanier") {       
        if (getVehicleFromPosition(one, 3).length > 0) {    
            if (getVehicleFromPosition(two, 3).length > 0) {   
                if (getVehicleFromPosition(three, 3).length > 0) {     
                    if (getVehicleFromPosition(four, 3).length > 0) {
                        player.notify("~r~Alle Garagenplätze sind Belegt");    
                        return; 
                   }  else {
                    var veh = mp.vehicles.new("police", four, {
                        heading: fourhead,
                        numberPlate: "LSPD",
                        locked: true,
                        engine: false,
                        dimension: 0
                   });  
                   veh.setColorRGB(255,255,255,255,255,255);
                   player.notify("~g~Dein Fahrzeug steht auf Stellplatz 4");
                   }                   
                } else {
                    var veh = mp.vehicles.new("police", three, {
                        heading: threehead,
                        numberPlate: "LSPD",
                        locked: true,
                        engine: false,
                        dimension: 0
                   });  
                    player.notify("~g~Dein Fahrzeug steht auf Stellplatz 3");
                    veh.setColorRGB(255,255,255,255,255,255);
                }                
            } else {
                var veh = mp.vehicles.new("police", two, {
                    heading: twohead,
                    numberPlate: "LSPD",
                    locked: true,
                    engine: false,
                    dimension: 0
               });    
                player.notify("~g~Dein Fahrzeug steht auf Stellplatz 2");
                veh.setColorRGB(255,255,255,255,255,255);
            }  
        } else {
            var veh = mp.vehicles.new("police", one, {
                heading: onehead,
                numberPlate: "LSPD",
                locked: true,
                engine: false,
                dimension: 0
           });  
            player.notify("~g~Dein Fahrzeug steht auf Stellplatz 1");  
            veh.setColorRGB(255,255,255,255,255,255);
        }                        
    }
    if (type == "Interceptor") {
        if (getVehicleFromPosition(one, 3).length > 0) {    
            if (getVehicleFromPosition(two, 3).length > 0) {   
                if (getVehicleFromPosition(three, 3).length > 0) {     
                    if (getVehicleFromPosition(four, 3).length > 0) {
                        player.notify("~r~Alle Garagenplätze sind Belegt");    
                        return; 
                   }  else {
                    var veh = mp.vehicles.new("police3", four, {
                        heading: fourhead,
                        numberPlate: "LSPD",
                        locked: true,
                        engine: false,
                        dimension: 0                        
                   });  
                   veh.setColorRGB(255,255,255,255,255,255);
                   player.notify("~g~Dein Fahrzeug steht auf Stellplatz 4");
                   }                   
                } else {
                    var veh = mp.vehicles.new("police3", three, {
                        heading: threehead,
                        numberPlate: "LSPD",
                        locked: true,
                        engine: false,
                        dimension: 0
                   });  
                   veh.setColorRGB(255,255,255,255,255,255);
                    player.notify("~g~Dein Fahrzeug steht auf Stellplatz 3");
                }                
            } else {
                var veh = mp.vehicles.new("police3", two, {
                    heading: twohead,
                    numberPlate: "LSPD",
                    locked: true,
                    engine: false,
                    dimension: 0                    
               });    
                player.notify("~g~Dein Fahrzeug steht auf Stellplatz 2");
                veh.setColorRGB(255,255,255,255,255,255);
            }  
        } else {
            var veh = mp.vehicles.new("police3", one, {
                heading: onehead,
                numberPlate: "LSPD",
                locked: true,
                engine: false,
                dimension: 0
           });  
            player.notify("~g~Dein Fahrzeug steht auf Stellplatz 1");  
            veh.setColorRGB(255,255,255,255,255,255);
        } 
    } 
    if (type == "Police Buffalo") {
        if (getVehicleFromPosition(one, 3).length > 0) {    
            if (getVehicleFromPosition(two, 3).length > 0) {   
                if (getVehicleFromPosition(three, 3).length > 0) {     
                    if (getVehicleFromPosition(four, 3).length > 0) {
                        player.notify("~r~Alle Garagenplätze sind Belegt");    
                        return; 
                   }  else {
                    var veh = mp.vehicles.new("police2", four, {
                        heading: fourhead,
                        numberPlate: "LSPD",
                        locked: false,
                        engine: false,
                        dimension: 0
                   });  
                   player.notify("~g~Dein Fahrzeug steht auf Stellplatz 4");
                   veh.setColorRGB(255,255,255,255,255,255);
                   veh.setVariable("faction", "LSPD");
                   }                   
                } else {
                    var veh = mp.vehicles.new("police2", three, {
                        heading: threehead,
                        numberPlate: "LSPD",
                        locked: false,
                        engine: false,
                        dimension: 0
                   });  
                    player.notify("~g~Dein Fahrzeug steht auf Stellplatz 3");
                    veh.setColorRGB(255,255,255,255,255,255);
                    veh.setVariable("faction", "LSPD");
                }                
            } else {
                var veh = mp.vehicles.new("police2", two, {
                    heading: twohead,
                    numberPlate: "LSPD",
                    locked: false,
                    engine: false,
                    dimension: 0
               });    
                player.notify("~g~Dein Fahrzeug steht auf Stellplatz 2");
                veh.setColorRGB(255,255,255,255,255,255);
                veh.setVariable("faction", "LSPD");
            }  
        } else {
            var veh = mp.vehicles.new("police2", one, {
                heading: onehead,
                numberPlate: "LSPD",
                locked: false,
                engine: false,
                dimension: 0
           });  
            player.notify("~g~Dein Fahrzeug steht auf Stellplatz 1");  
            veh.setColorRGB(255,255,255,255,255,255);
            veh.setVariable("faction", "LSPD");
        }         
    }
});

mp.events.add("server:lspd:parkin",(player,x,y,z) => {
    const pos = new mp.Vector3(player.position);
    console.log("Test: "+pos);
    const veh = getVehicleFromPosition(pos, 2)[0];
    console.log("Test: "+veh);
    veh.destroy();
  });

function getVehicleFromPosition(position, range) {
    const returnVehicles = [];

    mp.vehicles.forEachInRange(position, range,
        (vehicle) => {
            returnVehicles.push(vehicle);
        }
    );
    return returnVehicles;
}