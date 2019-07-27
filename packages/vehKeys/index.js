/// Schlüsselverwaltung

var vehKeysColShape = mp.colshapes.newSphere(170.0738, -1799.4508, 29.3158, 2, 0);

mp.events.add("server:Keybind:KeyE", (player) => {
    if(vehKeysColShape.isPointWithin(player.position)) {
        mp.events.call("server:vehKeys:openKeyCopy", player);
    }
});

mp.events.add("server:vehKeys:openKeys", (player) => {
    gm.mysql.handle.query("SELECT vehiclekeys.*, vehicles.numberplate from vehiclekeys LEFT JOIN vehicles ON vehiclekeys.vehID = vehicles.id WHERE vehiclekeys.keyOwner = ?", [player.data.charId], function (err, res) {
        if (err) console.log(err);
        if (res.length > 0) {
            var i = 1;
            let KeyList = [];
            res.forEach(function(veh) {
                let obj = {"kennzeichen": String(veh.numberplate), "amount": String(veh.amount), "id": String(veh.id)};
                KeyList.push(obj);

                if (parseInt(i) == parseInt(res.length)) {
                    if(mp.players.exists(player)) player.call("client:VehKeys:drawMenu", [JSON.stringify(KeyList)]);
                }
                i++;
            });
        } else {
            if(mp.players.exists(player)) player.call("client:VehKeys:drawMenu", ["none"]);
        }
    });
});

mp.events.add("server:vehKeys:openKeyCopy", (player) => {
    gm.mysql.handle.query("SELECT vehiclekeys.*, vehicles.numberplate from vehiclekeys LEFT JOIN vehicles ON vehiclekeys.vehID = vehicles.id WHERE vehiclekeys.keyOwner = ? AND vehiclekeys.isActive='Y'", [player.data.charId], function (err, res) {
        if (err) console.log(err);
        if (res.length > 0) {
            var i = 1;
            let KeyList = [];
            res.forEach(function(veh) {
                let obj = {"kennzeichen": String(veh.numberplate), "amount": String(veh.amount), "id": String(veh.id)};
                KeyList.push(obj);

                if (parseInt(i) == parseInt(res.length)) {
                    if(mp.players.exists(player)) player.call("client:VehKeys:openKeyCopy", [JSON.stringify(KeyList)]);
                }
                i++;
            });
        } else {
            if(mp.players.exists(player)) player.call("client:VehKeys:openKeyCopy", ["none"]);
        }
    });
});


mp.events.add("server:vehKeys:giveKey", (player, selectedDescription) => {
  if (mp.players.exists(player)) {
    getNearestPlayer(player, 2);
    if(mp.players.exists(currentTarget)) {
      gm.mysql.handle.query("SELECT * FROM vehiclekeys WHERE keyOwner = ? AND id = ?", [player.data.charId, selectedDescription], function(err, res) {
        if(err) console.log("Error in select Vehicle Keys: "+err);
        if(res.length > 0) {
          res.forEach(function (keys) {
              if(keys.amount >= 2) {
                let newAm = parseInt(parseInt(keys.amount) - 1);
                gm.mysql.handle.query("UPDATE vehiclekeys SET amount = ? WHERE id = ? and keyOwner = ?", [newAm, selectedDescription, player.data.charId], function(err1, res1) {
                  if(err1) console.log("Error in update Vehicle Keys: "+err1);
                });
                gm.mysql.handle.query("SELECT * FROM vehiclekeys WHERE vehID = ? AND keyOwner = ? AND isActive = 'Y'", [keys.vehID, currentTarget.data.charId], function (err2, res2) {
                  if(err2) console.log("Error in select target keys: "+err2);
                  if(res2.length > 0) {
                    res2.forEach(function(keys2) {
                      let newAm = parseInt(parseInt(keys2.amount) + 1);
                      gm.mysql.handle.query("UPDATE vehiclekeys SET amount = ? WHERE vehID = ? AND keyOwner = ?", [newAm, keys.vehID, currentTarget.data.charId], function(err3, res3) {
                        if(err3) console.log("Error in second Key Update: "+err3);
                      });
                    });
                  } else {
                    gm.mysql.handle.query("INSERT INTO vehiclekeys(vehID,keyOwner,amount,isActive) VALUES(?,?,1,?)", [keys.vehID, currentTarget.data.charId, keys.isActive], function(err4, res4) {
                      if(err4) console.log("Error in Insert into vehKeys: "+err4);
                      else {
                        gm.mysql.handle.query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [currentTarget.data.charId], function (err10, res10) {
                            if (err10) console.log("Error in Select Vehicle Keys on Login");
                            let vehKeysList = [];
                            res10.forEach(function(vehKeys) {
                                let obj = {"vehid": parseInt(vehKeys.vehID), "active":String(vehKeys.isActive)};
                                vehKeysList.push(obj);
                            });
                            vehKeysList = JSON.stringify(vehKeysList);
                            currentTarget.setVariable("currentKeys",vehKeysList);
                            console.log(vehKeysList);
                            currentTarget.call(`notification`, ["2", "Du hast einen Schlüssel weggeworfen"]);     
                        }); 
                      }
                    });
                  }
                });
                player.call(`notification`, ["2", "Du hast einen Schlüssel weitergegeben"]);
                currentTarget.call(`notification`, ["2", "Du hast einen Schlüssel bekommen"]);
              } else {
                gm.mysql.handle.query("DELETE FROM vehiclekeys WHERE id = ? and keyOwner = ?", [selectedDescription, player.data.charId], function(err5, res5) {
                    if(err5) console.log("Error in update Vehicle Keys: "+err5);
                    else {
                        gm.mysql.handle.query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [player.data.charId], function (err9, res9) {
                            if (err9) console.log("Error in Select Vehicle Keys on Login");
                            let vehKeysList = [];
                            res9.forEach(function(vehKeys) {
                                let obj = {"vehid": parseInt(vehKeys.vehID), "active":String(vehKeys.isActive)};
                                vehKeysList.push(obj);
                            });
                            vehKeysList = JSON.stringify(vehKeysList);
                            player.setVariable("currentKeys",vehKeysList);
                            console.log(vehKeysList);
                            player.call(`notification`, ["2", "Du hast einen Schlüssel weggeworfen"]);     
                        }); 
                    }
                });
                gm.mysql.handle.query("SELECT * FROM vehiclekeys WHERE vehID = ? AND keyOwner = ? AND isActive = 'Y'", [keys.vehID, currentTarget.data.charId], function (err6, res6) {
                  if(err6) console.log("Error in select target keys: "+err6);
                  if(res6.length > 0) {
                    res6.forEach(function(keys2) {
                      let newAm = parseInt(parseInt(keys2.amount) + 1);
                      gm.mysql.handle.query("UPDATE vehiclekeys SET amount = ? WHERE vehID = ? AND keyOwner = ?", [newAm, keys.vehID, currentTarget.data.charId], function(err7, res7) {
                        if(err7) console.log("Error in second Key Update: "+err7);
                      });
                    });
                  } else {
                    gm.mysql.handle.query("INSERT INTO vehiclekeys(vehID,keyOwner,amount,isActive) VALUES(?,?,1,?)", [keys.vehID, currentTarget.data.charId, keys.isActive], function(err8, res8) {
                      if(err8) console.log("Error in Insert into vehKeys: "+err8);
                      else {
                        gm.mysql.handle.query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [currentTarget.data.charId], function (err11, res11) {
                            if (err11) console.log("Error in Select Vehicle Keys on Login");
                            let vehKeysList = [];
                            res11.forEach(function(vehKeys) {
                                let obj = {"vehid": parseInt(vehKeys.vehID), "active":String(vehKeys.isActive)};
                                vehKeysList.push(obj);
                            });
                            vehKeysList = JSON.stringify(vehKeysList);
                            currentTarget.setVariable("currentKeys",vehKeysList);
                            console.log(vehKeysList);
                        }); 
                      }
                    });
                  }
                });
                player.call(`notification`, ["2", "Du hast einen Schlüssel weitergegeben"]);
                currenttarget.call(`notification`, ["2", "Du hast einen Schlüssel bekommen"]);
              }
          });
        }
      });
    }
  }
});

mp.events.add("server:vehKeys:deleteKey", (player, selectedDescription) => {
    if (mp.players.exists(player)) {
        gm.mysql.handle.query("SELECT amount FROM vehiclekeys WHERE id = ?", [selectedDescription], function(err, res){
        if (err) console.log("Error in Select vehiclekeys: "+err);
            if (res.length > 0) {
                res.forEach(function (keys){
                    var vehid = keys.vehID;
                    if (keys.amount >=2) {
                        //Update
                        var updateamount = 1;
                        var newAm = parseInt(parseInt(keys.amount) - parseInt(updateamount));
                        gm.mysql.handle.query("UPDATE vehiclekeys SET amount = ? WHERE id = ? AND keyOwner = ?", [newAm, selectedDescription, player.data.charId], function(err2, res2) {
                        if (err2) console.log("Error in Update vehiclekeys: "+err2);
                            if (res2.length > 0) {
                                player.notify("~r~Das hat nicht Funktioniert");
                            } else {
                                player.call(`notification`, ["2", "Du hast einen Schlüssel weggeforen"]);
                            }
                        });
                    } else {
                        // Delete
                        gm.mysql.handle.query("DELETE FROM vehiclekeys WHERE id = ? AND keyOwner = ?", [selectedDescription, player.data.charId], function(err1, res1){
                        if (err1) console.log("Error in Delete vehiclekeys :"+err1);
                            if (res1 > 0) {
                                player.notify("~r~Das hat nicht funktioniert!");
                            } else {
                                gm.mysql.handle.query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [player.data.charId], function (err5, res5) {
                                    if (err5) console.log("Error in Select Vehicle Keys on Login");
                                    let vehKeysList = [];
                                    res5.forEach(function(vehKeys) {
                                        let obj = {"vehid": parseInt(vehKeys.vehID), "active":String(vehKeys.isActive)};
                                        vehKeysList.push(obj);
                                    });
                                    vehKeysList = JSON.stringify(vehKeysList);
                                    player.setVariable("currentKeys",vehKeysList);
                                    player.call(`notification`, ["2", "Du hast einen Schlüssel weggeworfen"]);     
                                });                                                           
                            }
                        });
                    }
                });
            }
        });
    }
});

mp.events.add("server:vehKeys:copyKey", (player, selectedDescription) => {
    if (mp.players.exists(player)) {
        var amount = 50;
        gm.mysql.handle.query("SELECT money FROM characters WHERE id = ?", [player.data.charId], function(err, res) {
            if (err) console.log("ERROR in SELECT money: "+err);
            if (res.length > 0) {                
                money = player.data.money;
                amount = parseFloat(amount).toFixed(2);
                if ( (amount*1) > (money*1)) {
                    player.call(`notification`, ["3", "Du hast nicht genügend Geld dabei"]);
                    console.log("VehKeyss - nicht genug Geld");
                } else {
                    var newMoney = parseFloat( player.data.money - parseFloat(amount*1).toFixed(2) ).toFixed(2);;
                    if (mp.players.exists(player)) player.call("updateHudMoney", [newMoney]);
                    gm.mysql.handle.query("UPDATE characters SET money = ? WHERE id = ?", [newMoney, player.data.charId], function (err3, res3){
                        if (err3) console.log("ERROR in Update Money: "+err3);
                        gm.mysql.handle.query("SELECT vehiclekeys.*, vehicles.numberplate, vehicles.modelId from vehiclekeys LEFT JOIN vehicles ON vehiclekeys.vehID = vehicles.id WHERE vehiclekeys.keyOwner = ? AND vehiclekeys.isActive='Y'", [player.data.charId], function(err1, res1){
                            if (err1) console.log("Error in Select Vehicle Keys: "+err1);
                            if (res1.length > 0) {                
                                res1.forEach(function(keys) {
                                    let newAm = parseInt(parseInt(keys.amount) + 1);
                                    gm.mysql.handle.query("UPDATE vehiclekeys SET amount = ? WHERE id = ? AND keyOwner = ?", [newAm, selectedDescription, player.data.charId], function (err2, res2) {
                                        if (err2) console.log("Error in Update Vehicle Keys: "+err2);                                        
                                        player.data.money = newMoney;
                                    });                                    
                                });
                                player.call(`notification`, ["2", "Du hast einen Schlüssel nachgemacht"]);
                            } else {
                                player.call(`notification`, ["4", "Diesen Schlüssel besitzt du nicht"]);
                            }
                        });
                    });
                }
            }
        });
    }
});

mp.events.add("server:vehKeys:schloss", (player, vehicle) => {
    if(mp.players.exists(player)) {
        let numberplate = vehicle.getVariable("numberPlate");
        console.log(numberplate);
        gm.mysql.handle.query("SELECT * FROM vehicles WHERE numberplate = ?", [numberplate], function(err1, res1) {
        if (err1) console.log("Error in Select vehicles: "+err1);
            res1.forEach(function(veh){
                if (res1.length > 0) {
                    gm.mysql.handle.query("UPDATE vehiclekeys SET isActive = 'N' WHERE vehID = ?", [veh.id], function (err2, res2) {
                    if (err2) console.log("Error in Update vehiclekeys: "+err2);
                        gm.mysql.handle.query("INSERT INTO vehiclekeys(vehID,keyOwner,amount,isActive) VALUES(?,?,'2','Y')", [veh.id, player.data.charId], function(err3, res3) {
                            if(err3) console.log("Error in Insert new vehiclekeys: "+err3);
                            else {
                                player.call(`notification`, ["2", "Dass Schloss wurde ausgetauscht"]);

                                var currentKeys = player.getVariable("currentKeys");
                                currentKeys = JSON.parse(currentKeys);
                                var NewList = [];
                                currentKeys.forEach(function(key) {
                                    if (parseInt(key.vehid) !== parseInt(veh.id)) NewList.push(key);
                                });
                                var obj = {"vehid": parseInt(veh.id), "active": "Y"};
                                NewList.push(obj);
                                NewList = JSON.stringify(NewList);
                                player.setVariable("currentKeys",NewList);

                                gm.mysql.handle.query("SELECT c.isOnline, c.currentOnlineId FROM vehiclekeys v LEFT JOIN characters c ON c.id = v.keyOwner WHERE v.vehID = ?", [veh.id], function(err4, res4) {
                                    if (err4) console.log("Error in Select all keyOwners on keyChange: "+err4);
                                    else {
                                        if (res4.length > 0) {
                                            res4.forEach(function(users) {
                                                if (users.isOnline == "Y") {
                                                    var targetUser = mp.players.at(users.currentOnlineId);
                                                    if (mp.players.exists(targetUser)) {
                                                        if (parseInt(targetUser.data.internalId) !== parseInt(player.data.charId)) {
                                                            gm.mysql.handle.query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [targetUser.data.internalId], function (err5, res5) {
                                                                if (err5) console.log("Error in Select Vehicle Keys on Login");
                                                                let vehKeysList = [];
                                                                res5.forEach(function(vehKeys) {
                                                                    let obj = {"vehid": parseInt(vehKeys.vehID), "active":String(vehKeys.isActive)};
                                                                    vehKeysList.push(obj);
                                                                });
                                                                vehKeysList = JSON.stringify(vehKeysList);
                                                                targetUser.setVariable("currentKeys",vehKeysList);
                                                            }); 
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    });
                } else {
                    player.call(`notification`, ["4", "Fahrzeug nicht gefunden"]);
                }
            });
        });
    }
});

//DEN NÄCHSTEN SPIELER ERMITTELN
var currentTarget = null;
function getNearestPlayer(player, range)
{
    let dist = range;
    mp.players.forEachInRange(player.position, range,
        (_player) => {
            if(player != _player)
            {
                let _dist = _player.dist(player.position);
                if(_dist < dist)
                {
                    currentTarget = _player;
                    dist = _dist;
                }
            }
        }
    );
};

function getVehicleFromPosition(position, range) {
    const returnVehicles = [];
    mp.vehicles.forEachInRange(position, range,
        (vehicle) => {
            returnVehicles.push(vehicle);
        }
    );
    return returnVehicles;
}
mp.events.add("server:vehicles:givenewKey", (player,vID) => {
	gm.mysql.handle.query("INSERT INTO vehiclekeys SET vehID = ?, keyOwner = ?, amount = ?, isActive = 'Y'", [vID,player.data.charId,2], function(err, ress){
		if(err) console.log("Error in GiveVehicleNewKey"+err);
		gm.mysql.handle.query("SELECT * FROM vehiclekeys WHERE keyOwner = ?", [player.data.charId], function (err5, res5) {
			if (err5) console.log("Error in Select Vehicle Keys on Login"+err);
			let vehKeysList = [];
			res5.forEach(function(vehKeys) {
				let obj = {"vehid": parseInt(vehKeys.vehID), "active":String(vehKeys.isActive)};
				vehKeysList.push(obj);
			});
			vehKeysList = JSON.stringify(vehKeysList);
			player.setVariable("currentKeys",vehKeysList);  
		});
	});
});