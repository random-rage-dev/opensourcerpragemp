module.exports =
{
    registerAccount: function(player){
        player.data.money = 5000;
        player.position = new mp.Vector3(15, 15, 71);   //  Use the same values that are default inside your DB
        player.health = 100;
        player.armour = 50;
        player.loggedInAs = player.name;
    },
    saveAccount: function(player){
        gm.mysql.handle.query('UPDATE accounts SET money = ?, posX = ?, posY = ?, posZ = ?, posR = ? WHERE username = ?', [player.data.money, player.position.x.toFixed(2), player.position.y.toFixed(2), player.position.z.toFixed(2), player.heading, player.name], function(err, res, row){
            if(err) console.log(err);
        });
    },
    loadAccount: function(player){
        gm.mysql.handle.query('SELECT * FROM accounts WHERE username = ?', [player.name], function(err, res, row){
            if(err) console.log(err);            
            if(res.length){
                res.forEach(function(playerData){
                    if (playerData.banned == 0) {
                        if (playerData.hardwareID == "none") {
                            gm.mysql.handle.query("UPDATE accounts SET hardwareID = ?, socialClub = ? WHERE id = ?",[player.serial,player.socialClub, playerData.id], function (err2,res2) {
                                if (err2) console.log("Error in Update HWID" + err2);

                                //if(player.data.isPed != 1) {
                                    gm.mysql.handle.query("SELECT * FROM characters WHERE accountID = ? LIMIT 1", [playerData.id], function (err2, res2) {
                                        if (err2) console.log("Error in setModel + Clothes on Login" + err2);
            
            
                                        if (res2.length > 0) {
                                        try{
                                            res2.forEach(function (modelData) {
                                                var model = JSON.parse(modelData.data);
                                                if(modelData.ped == 1) {
                                                    player.model = mp.joaat(modelData.pedHash);
                                                    player.position = new mp.Vector3(-797.3433227539062, 332.110595703125, 153.8050079345703);
                                                    player.heading = 268.0709228515625;
                                                    player.call("client:characters:selection",[modelData.firstname, modelData.lastname]);         


                                                }else {
                                            
                                                if (model["Gender"] == 0) {
                                                    player.model = mp.joaat("mp_m_freemode_01");
                                                } else if (model["Gender"] == 1) {
                                                    player.model = mp.joaat("mp_f_freemode_01");
                                                }
                                                player.data.gender = model["Gender"];
            
                                                var i = 0;
                                                model["Features"].forEach(function (featureData) {
                                                    player.setFaceFeature(i, featureData);
                                                    i = i + 1;
                                                });
            
                                                player.setHeadBlend(model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Similarity"], model["Parents"]["SkinSimilarity"], 0)
            
                                                player.setClothes(2, model['Hair']['0'], 0, 2);
                                                player.setHairColor(model['Hair']['1'], model['Hair']['2']);
                                                player.eyeColor = model['Hair']['5'];
            
                                                var i2 = 0;
                                                model["Appearance"].forEach(function (featureData) {
                                                    switch (i2) {
                                                        case 1:
                                                            color = model['Hair'][4];
                                                            break;
            
                                                        case 2:
                                                            color = model['Hair'][3];
                                                            break;
            
                                                        case 5:
                                                            color = model['Hair'][6];
                                                            break;
            
                                                        case 8:
                                                            color = model['Hair'][7];
                                                            break;
            
                                                        case 10:
                                                            color = model['Hair'][8];
                                                            break;
            
                                                        default:
                                                            color = 0;
                                                    }
                                                    player.setHeadOverlay(i2, [model['Appearance'][i2].Value, model['Appearance'][i2].Opacity, color, 0]);
                                                    i2 = i2 + 1; // TODO: Finde raus warum es da knallt!
                                                });           
            
                                                player.position = new mp.Vector3(-797.3433227539062, 332.110595703125, 153.8050079345703);
                                                player.heading = 268.0709228515625;
                                                
                                                
            
            
                                                player.setProp(0,modelData.hat,modelData.hattext); //Hut
                                                player.setProp(1,modelData.eye,modelData.eyetext); //Brille
                                                player.setClothes(1,modelData.mask,modelData.masktext,0); //Masken
                                                player.setClothes(3,modelData.torso,0,0); //Torso
                                                player.setClothes(4,modelData.leg,modelData.legtext,0); //Hose
                                                player.setClothes(6,modelData.shoe,modelData.shoetext,0); //Schuhe
                                                player.setClothes(11,modelData.jacket,modelData.jackettext,0);//Jacke
                                                player.setClothes(8,modelData.shirt,modelData.shirttext,0); //Shirt
                                                player.setClothes(9,modelData.body,modelData.bodytext,0); //Body*/
                                                player.setVariable("state", "INGAME");
            
                                                player.health = modelData.health;
                                                player.armor = modelData.armor;
                                            }
                                            });
                                        } catch(e){
                                            console.log("ERROR - run in catch 2- login.js: " + e);
                                        }
                                    }
                                    });

                                gm.mysql.handle.query('SELECT *  FROM characters WHERE accountID = ?', [playerData.id], function (err1, res1, row1) {
                                if (err1) console.log("Error in Select Characters: "+err1);	
                                    if(res1.length) {
                                        var charList = [];
                                        res1.forEach(function(chars) {
                                            let obj = {"firstname": String(chars.firstname), "lastname": String(chars.lastname), "id": String(chars.id)};
                                            charList.push(obj);
                                        });					
                                        player.call("client:characters:choosechar", [JSON.stringify(charList)]);
                                        player.call("loginHandler", ["destroy"]);	
                                        player.call("client:characters:showCamera");		
                                    }
                                });
                            });
                        } else {
                            if (playerData.hardwareID == player.serial) {
                                //if(player.data.isPed != 1) {
                                    //if(player.data.isPed != 1) {
                                    gm.mysql.handle.query("SELECT * FROM characters WHERE accountID = ? LIMIT 1", [playerData.id], function (err2, res2) {
                                        if (err2) console.log("Error in setModel + Clothes on Login");
            
            
                                        if (res2.length > 0) {
                                        try{
                                            res2.forEach(function (modelData) {
                                                console.log("Test"+modelData.ped);
                                                var model = JSON.parse(modelData.data);
                                                if(modelData.ped == 1) {
                                                    player.model = mp.joaat(modelData.pedHash);
                                                    player.position = new mp.Vector3(-797.3433227539062, 332.110595703125, 153.8050079345703);
                                                    player.heading = 268.0709228515625;
                                                    player.call("client:characters:showCamera");  


                                                }else {
                                                console.log("Test");
                                                if (model["Gender"] == 0) {
                                                    player.model = mp.joaat("mp_m_freemode_01");
                                                } else if (model["Gender"] == 1) {
                                                    player.model = mp.joaat("mp_f_freemode_01");
                                                }
                                                player.data.gender = model["Gender"];
                                                console.log("Test2");
            
                                                var i = 0;
                                                model["Features"].forEach(function (featureData) {
                                                    player.setFaceFeature(i, featureData);
                                                    i = i + 1;
                                                });
                                                console.log("Test");
            
                                                player.setHeadBlend(model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Similarity"], model["Parents"]["SkinSimilarity"], 0)
            
                                                player.setClothes(2, model['Hair']['0'], 0, 2);
                                                player.setHairColor(model['Hair']['1'], model['Hair']['2']);
                                                player.eyeColor = model['Hair']['5'];
                                                console.log("Test2");
            
                                                var i2 = 0;
                                                model["Appearance"].forEach(function (featureData) {
                                                    switch (i2) {
                                                        case 1:
                                                            color = model['Hair'][4];
                                                            break;
            
                                                        case 2:
                                                            color = model['Hair'][3];
                                                            break;
            
                                                        case 5:
                                                            color = model['Hair'][6];
                                                            break;
            
                                                        case 8:
                                                            color = model['Hair'][7];
                                                            break;
            
                                                        case 10:
                                                            color = model['Hair'][8];
                                                            break;
            
                                                        default:
                                                            color = 0;
                                                    }
                                                    player.setHeadOverlay(i2, [model['Appearance'][i2].Value, model['Appearance'][i2].Opacity, color, 0]);
                                                    i2 = i2 + 1; // TODO: Finde raus warum es da knallt!
                                                });
            
            
                                                player.position = new mp.Vector3(-797.3433227539062, 332.110595703125, 153.8050079345703);
                                                player.heading = 268.0709228515625;
                                                
                                            
                                                
                                                if(modelData.duty == 1 && modelData.factioncloth != "Zivil") {
                                                    if(modelData.faction == "LSPD") { 
                                                        player.setProp(0,modelData.hat,modelData.hattext); //Hut
                                                        player.setProp(1,modelData.eye,modelData.eyetext); //Brille
                                                        mp.events.call("server:lspd:clothes", player, modelData.factioncloth); 
                                                    }
                                                
                                                    
                                                }else {
                                                player.setProp(0,modelData.hat,modelData.hattext); //Hut
                                                player.setProp(1,modelData.eye,modelData.eyetext); //Brille
                                                player.setClothes(1,modelData.mask,modelData.masktext,0); //Masken
                                                player.setClothes(3,modelData.torso,0,0); //Torso
                                                player.setClothes(4,modelData.leg,modelData.legtext,0); //Hose
                                                player.setClothes(6,modelData.shoe,modelData.shoetext,0); //Schuhe
                                                player.setClothes(11,modelData.jacket,modelData.jackettext,0);//Jacke
                                                player.setClothes(8,modelData.shirt,modelData.shirttext,0); //Shirt
                                                player.setClothes(9,modelData.body,modelData.bodytext,0); //Body*/
                                                }
                                                player.setVariable("state", "INGAME");
            
                                                player.health = modelData.health;
                                                player.armor = modelData.armor;
                                                player.call("client:characters:showCamera");
                                                player.dimension = modelData.id;
                                                //player.call("client:characters:selection",[player.data.firstname, player.data.lastname]);
                                            }
                                            });
                                        } catch(e){
                                            console.log("ERROR - run in catch 3- login.js: " + e);
                                        }
                                    }
                                    });
                                gm.mysql.handle.query('SELECT * FROM characters WHERE accountID = ?', [playerData.id], function (err1, res1, row1) {
                                    if (err1) console.log("Error in Select Characters: "+err1);	
                                        if(res1.length) {
                                            var charList = [];
                                            res1.forEach(function(chars) {
                                                let obj = {"firstname": String(chars.firstname), "lastname": String(chars.lastname), "id": String(chars.id)};
                                                charList.push(obj);
                                            });					
                                            player.call("client:characters:choosechar", [JSON.stringify(charList)]);
                                            player.call("loginHandler", ["destroy"]);		
                                        }
                                    });
                            } else {
                                player.kick("~r~Hardware ID Falsch!");
                            }
                        }
                    } else {
                        if(playerData.bannedDay != "none") {
                        function get_today(){
                                var today = new Date();
                        
                                var day = today.getDate(); // Tag
                        
                                // Monatsangabe startet bei 0!
                                var month = today.getMonth()+1; // Monat
                        
                                var year = today.getFullYear(); // Jahr
                                if(day < 10) {
                                        day = '0'+ day;
                                }
                                if(month < 10) {
                                        month = '0'+ month;
                                }
                                today = day + '.' + month + '.' + year;
                        
                                return today;
                        }
                            if(playerData.bannedDay != get_today())
                            {
                            player.call("client:login:banned",[0,playerData.bannedDay]);
                            }
                            else {
                               player.call("loginHandler", ["destroy"]);             
                            }
                        }else {
                        player.call("client:login:banned", [1,0]);
                        }
                    }                    				 
                });
            }
        });
        console.log(`${player.name} hat sich eingeloggt`);
    }
}

mp.events.add("server:charchooser:menuclick", (player, id) => {
    gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?", [id], function (err, res) {
        if (err) console.log("Error in Select Characters :"+err);
        if (res.length > 0) {
            res.forEach(function(datas) {
                    player.data.accountID = datas.accountID;
                    player.data.posX = datas.posX;
                    player.data.posY = datas.posY;
                    player.data.posZ = datas.posZ;
                    player.data.posR = datas.posR;
                    player.data.charId = datas.id;
                    player.data.health = datas.health;
                    player.data.dimension = datas.dimension;
                    
                    player.data.armor = datas.armor;
                    player.data.drink = datas.drink;
                    player.data.food = datas.food;
                    player.data.phoneNumber = datas.phoneNumber;
                    player.data.money = datas.money;
                    player.data.adminLvl = datas.adminRank;  
                    player.data.isPed = datas.ped;
                    player.data.pedHash = datas.pedHash;

                    player.data.faction = datas.faction;
                    player.data.factionDuty = datas.duty;
                    player.data.factionrang = datas.factionrang;

                    player.data.firstname = datas.firstname;
                    player.data.lastname = datas.lastname;

                    player.data.hat = datas.hat;
                    player.data.hattext = datas.hattext;
                    player.data.eye = datas.eye;
                    player.data.eyetext = datas.eyetext;
                    player.data.mask = datas.mask;
                    player.data.masktext = datas.masktext;
                    player.data.torso = datas.torso;
                    player.data.jacket = datas.jacket;
                    player.data.jackettext = datas.jackettext;
                    player.data.leg = datas.leg;
                    player.data.legtext = datas.legtext;
                    player.data.shoe = datas.shoe;
                    player.data.shoetext = datas.shoetext;
                    player.data.shirt = datas.shirt;
                    player.data.shirttext = datas.shirttext;
                    player.data.spawnTimer = 0;
                    player.data.prop0 = null;
                    player.data.prop1 = null;
					
                    player.data.waitOneTime = 0;
                    player.data.isOnline = datas.isOnline;

                    player.data.inventory = 10;

                    player.data.ergeben == 0;

                    
                    
                    
                    
                if (datas.created == 0) {
                        player.dimension = -100;
                        player.alpha = 0;
                        player.position = new mp.Vector3(402.9683837890625, -996.2813720703125, -99.00025939941406);
                        player.heading = 180.54197692871094;
                        player.call("startCreator");
                
                        player.model = mp.joaat("mp_m_freemode_01");
                                          
                } else {             
                    if(player.data.isPed != 1) {
                        gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?", [player.data.charId], function (err2, res20) {
                            if (err2) console.log("Error in setModel + Clothes on Login");


                            if (res20.length > 0) {
                            try{
                                res20.forEach(function (modelData) {
                                    var model = JSON.parse(modelData.data);

                                    if (model["Gender"] == 0) {
                                        player.model = mp.joaat("mp_m_freemode_01");
                                    } else if (model["Gender"] == 1) {
                                        player.model = mp.joaat("mp_f_freemode_01");
                                    }
                                    player.data.gender = model["Gender"];

                                    var i = 0;
                                    model["Features"].forEach(function (featureData) {
                                        player.setFaceFeature(i, featureData);
                                        i = i + 1;
                                    });

                                    player.setHeadBlend(model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Mother"], model["Parents"]["Father"], 0, model["Parents"]["Similarity"], model["Parents"]["SkinSimilarity"], 0)

                                    player.setClothes(2, model['Hair']['0'], 0, 2);
                                    player.setHairColor(model['Hair']['1'], model['Hair']['2']);
                                    player.eyeColor = model['Hair']['5'];

                                    var i2 = 0;
                                    model["Appearance"].forEach(function (featureData) {
                                        switch (i2) {
                                            case 1:
                                                color = model['Hair'][4];
                                                break;

                                            case 2:
                                                color = model['Hair'][3];
                                                break;

                                            case 5:
                                                color = model['Hair'][6];
                                                break;

                                            case 8:
                                                color = model['Hair'][7];
                                                break;

                                            case 10:
                                                color = model['Hair'][8];
                                                break;

                                            default:
                                                color = 0;
                                        }
                                        player.setHeadOverlay(i2, [model['Appearance'][i2].Value, model['Appearance'][i2].Opacity, color, 0]);
                                        i2 = i2 + 1; // TODO: Finde raus warum es da knallt!
                                    });


                                    player.position = new mp.Vector3(-797.3433227539062, 332.110595703125, 153.8050079345703);
                                    player.heading = 268.0709228515625;
                                    
                                    
                                    if(modelData.duty == 1) {
                                        player.setProp(0,modelData.hat,modelData.hattext); //Hut
                                        player.setProp(1,modelData.eye,modelData.eyetext); //Brille
                                        if(modelData.faction == "LSPD") { mp.events.call("server:lspd:clothes", player, modelData.factioncloth); }
                                        
                                    }else {        

                                    player.setProp(0,modelData.hat,modelData.hattext); //Hut
                                    player.setProp(1,modelData.eye,modelData.eyetext); //Brille
                                    player.setClothes(1,modelData.mask,modelData.masktext,0); //Masken
                                    player.setClothes(3,modelData.torso,0,0); //Torso
                                    player.setClothes(4,modelData.leg,modelData.legtext,0); //Hose
                                    player.setClothes(6,modelData.shoe,modelData.shoetext,0); //Schuhe
                                    player.setClothes(11,modelData.jacket,modelData.jackettext,0);//Jacke
                                    player.setClothes(8,modelData.shirt,modelData.shirttext,0); //Shirt
                                    player.setClothes(9,modelData.body,modelData.bodytext,0); //Body
                                    }
                                    player.setVariable("state", "INGAME");

                                    player.health = modelData.health;
                                    player.armour = modelData.armor;
                                    
                                    player.call("client:characters:selection",[player.data.firstname, player.data.lastname]);
                                    mp.events.call("server:faction:loadmarker",player);
                                    gm.mysql.handle.query("UPDATE characters SET isOnline = '1' , onlineId = ? WHERE id = ?", [player.id,player.data.charId],function(err5,res5) {
                                        if(err5) console.log("Error in Update Online Status: "+err5);
                                    });

                                });
                            } catch(e){
                                console.log("ERROR - run in catch 1- login.js: " + e);
                            }
                        }
                        });
                      } else {
                        player.model = mp.joaat(player.data.pedHash);
                        player.position = new mp.Vector3(-797.3433227539062, 332.110595703125, 153.8050079345703);
                        player.heading = 268.0709228515625;

                        player.call("client:characters:selection",[player.data.firstname, player.data.lastname]);
                    }
                 
                }
            });
            gm.mysql.handle.query("SELECT * FROM shortcuts WHERE charId = ?", [player.data.charId], function (err10,res10) {
                if (err10) console.log("Error in loadShortcuts: "+err10);

                if (res10.length > 0) {
                    res10.forEach(function (shortcutData) { 
                        player.data.numpad1A = shortcutData.num1animA;
                        player.data.numpad1B = shortcutData.num1animB;
                        player.data.numpad1C = shortcutData.num1animC;
                        player.data.numpad1D = shortcutData.num1animD;
                        player.data.numpad1Name = shortcutData.num1name;
                        player.data.numpad2A = shortcutData.num2animA;
                        player.data.numpad2B = shortcutData.num2animB;
                        player.data.numpad2C = shortcutData.num2animC;
                        player.data.numpad2D = shortcutData.num2animD;
                        player.data.numpad2Name = shortcutData.num2name;  
                        player.data.numpad3A = shortcutData.num3animA;
                        player.data.numpad3B = shortcutData.num3animB;
                        player.data.numpad3C = shortcutData.num3animC;
                        player.data.numpad3D = shortcutData.num3animD;
                        player.data.numpad3Name = shortcutData.num3name;  
                        player.data.numpad4A = shortcutData.num4animA;
                        player.data.numpad4B = shortcutData.num4animB;
                        player.data.numpad4C = shortcutData.num4animC;
                        player.data.numpad4D = shortcutData.num4animD;
                        player.data.numpad4Name = shortcutData.num4name;  
                        player.data.numpad5A = shortcutData.num5animA;
                        player.data.numpad5B = shortcutData.num5animB;
                        player.data.numpad5C = shortcutData.num5animC;
                        player.data.numpad5D = shortcutData.num5animD;
                        player.data.numpad5Name = shortcutData.num5name;  
                        player.data.numpad6A = shortcutData.num6animA;
                        player.data.numpad6B = shortcutData.num6animB;
                        player.data.numpad6C = shortcutData.num6animC;
                        player.data.numpad6D = shortcutData.num6animD;
                        player.data.numpad6Name = shortcutData.num6name;  
                        player.data.numpad7A = shortcutData.num7animA;
                        player.data.numpad7B = shortcutData.num7animB;
                        player.data.numpad7C = shortcutData.num7animC;
                        player.data.numpad7D = shortcutData.num7animD;
                        player.data.numpad7Name = shortcutData.num7name;  
                        player.data.numpad8A = shortcutData.num8animA;
                        player.data.numpad8B = shortcutData.num8animB;
                        player.data.numpad8C = shortcutData.num8animC;
                        player.data.numpad8D = shortcutData.num8animD;
                        player.data.numpad8Name = shortcutData.num8name;  
                        player.data.numpad9A = shortcutData.num9animA;
                        player.data.numpad9B = shortcutData.num9animB;
                        player.data.numpad9C = shortcutData.num9animC;
                        player.data.numpad9D = shortcutData.num9animD;
                        player.data.numpad9Name = shortcutData.num9name;      
                    });
                }
            });
            gm.mysql.handle.query("SELECT * FROM licenses WHERE charId = ?", [player.data.charId], function (err6,res6) {
                if (err6) console.log("Error in Select Licenses on Login :"+err6);
                res6.forEach(function(licenses) {
                    player.data.weapona = licenses.weapona;
                    player.data.weaponb = licenses.weaponb;
                    player.data.pkw = licenses.pkw;
                    player.data.lkw = licenses.lkw;
                    player.data.pilot = licenses.pilot;
                    player.data.job = licenses.job;
                });
            });
            gm.mysql.handle.query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [player.data.charId], function (err10, res10) {
                if (err10) console.log("Error in Select Vehicle Keys on Login"+err10);
                let vehKeysList = [];
                res10.forEach(function(vehKeys) {
                    let obj = {"vehid": parseInt(vehKeys.vehID), "active":String(vehKeys.isActive)};
                    vehKeysList.push(obj);
                });
                vehKeysList = JSON.stringify(vehKeysList);
                player.setVariable("currentKeys",vehKeysList);  
            }); 
            player.call("client:world:weatherUpdate",[gm.weather.currentWeather]);
            player.call("ConnectTeamspeak", [true]);
            player.call("openHud");
            player.call("changeValue", ['money', player.data.money]);    
            player.call("changeValue", ['food', player.data.food]);
            player.call("changeValue", ['drink', player.data.drink]);        
        } else {
            console.log("Error in Characters");
        }
     });
});
mp.events.add("server:login:banned", (player) => {
    player.kick();
});