function syncPosition() {
    mp.players.forEach(
    (player, id) => {
        if (player.getVariable("state") == "INGAME") {
        if(player.vehicle) {            
            var posXsave = parseFloat(player.vehicle.position.x);
            var posYsave = parseFloat(player.vehicle.position.y);
            var posZsave = parseFloat(player.vehicle.position.z);
        } else {
        var posXsave = parseFloat(player.position.x);
            var posYsave = parseFloat(player.position.y);
            var posZsave = parseFloat(player.position.z);
            var rotation = parseFloat(player.heading);
        }
        var dimSave = parseInt(player.dimension);
        var healthSave = parseInt(player.health);
        var armor = parseInt(player.armour);
		if(player.data.isSpawned == 1)
		{
            if(player.data.spawnTimer <2)
            {
                player.data.spawnTimer +=1;
            }
            if(player.data.spawnTimer == 2)
            {
                gm.mysql.handle.query("UPDATE characters SET armor = ?, health = ?,dimension = ?, posX = ?, posY = ? , posZ = ?,posR = ? WHERE id = ?", [armor,healthSave,dimSave,posXsave, posYsave, posZsave,rotation, player.data.charId], function (err, res) {
                    if (err) console.log("Error in Update Characters position " + err);
                    });
                }
            }
		}
    }
    );   
}
setInterval(syncPosition, 15000);

function playerQuitHandler(player, exitType, reason) {
    gm.mysql.handle.query("UPDATE characters SET isOnline = '0' WHERE id = ?",[player.data.charId],function(err,res) {
        if (err) console.log("Error in Update Quit "+err);
    });
  }
  mp.events.add("playerQuit", playerQuitHandler);


  mp.events.add('server:syncedPlayer:syncClothes', (player, playerToSync) => {
	if(mp.players.exists(player)) {
		if(mp.players.exists(playerToSync)) {
	    if (playerToSync.getVariable("state") == "INGAME") {
				if (playerToSync.data.prop0 == null) {
					playerToSync.setProp(0, playerToSync.data.hat, playerToSync.data.hattext);
				}
				if (playerToSync.data.prop1 == null) {
					playerToSync.setProp(1, playerToSync.data.eye, playerToSync.data.eyetext);
				}
			}
		}
	}
});

// Wetter
gm.weather = {};
gm.weather.lastrain = 15;
gm.weather.currentWeather = 'EXTRASUNNY';

function changeWeather() {
    let randomWeather = Math.random() * (20 - 1) + 1;
    let newWeather = 'EXTRASUNNY';
    if (randomWeather < 12) {
        newWeather = 'CLEAR';
    } else if (randomWeather > 11 && randomWeather <= 14) {
        newWeather = 'OVERCAST';
    } else if (randomWeather > 14 && randomWeather <= 16) {
        newWeather = 'FOGGY';
    } else if (randomWeather > 16 && randomWeather <= 18) {
        newWeather = 'CLOUDS';
    } else if (randomWeather > 18 && randomWeather <= 19) {
        newWeather = 'THUNDER';
    } else if (randomWeather > 19 && randomWeather <= 20) {
        newWeather = 'RAIN';
    }

    if (newWeather == 'RAIN' || newWeather == 'THUNDER') {
        if (gm.weather.lastrain > 0) {
            newWeather = 'CLEAR';
            gm.weather.lastrain = gm.weather.lastrain - 1;
        } else {
            gm.weather.lastrain = 24;
        }
    } else {
        gm.weather.lastrain = gm.weather.lastrain - 1;
    }

    gm.weather.currentWeather = newWeather;
    mp.world.setWeatherTransition(newWeather);

    mp.players.call("client:world:weatherUpdate", [newWeather]);
}
setInterval(changeWeather, 1200000);
changeWeather();

function weatherSync() {
  var weather = gm.weather.currentWeather;
  mp.players.call("client:world:weatherUpdate", [gm.weather.currentWeather]);
}
setInterval(weatherSync, 60000);

function syncTime() {
    var date = new Date();
    mp.world.time.set(date.getHours(), date.getMinutes(), date.getSeconds());
}
setInterval(syncTime, 60000);
syncTime();



mp.events.add("updatePlayerNeeds", (player) => {
    if(mp.players.exists(player)) {
      if(player.data.food > 100) {
          player.data.food = 100;
          var currentFood = parseInt(player.data.food);
          var newFood = currentFood - 1;
          player.data.food = newFood;
          //player.call("changeValue", ['food', newFood]);
          gm.mysql.handle.query('UPDATE characters SET food = ? WHERE id = ?', [newFood, player.data.charId], function (err, res, row) {
              if (err) console.log("Error in UpdatePlayerNeeds(insert values food): " + err);
          });
          player.call("changeValue", ['food', player.data.food]);
      }
      else if (player.data.food < 100 || player.data.food == 100 || player.data.food > 0) {
          var currentFood = parseInt(player.data.food);
          var newFood = currentFood - 1;
          player.data.food = newFood;
          //player.call("changeValue", ['food', newFood]);
          gm.mysql.handle.query('UPDATE characters SET food = ? WHERE id = ?', [newFood, player.data.charId], function (err, res, row) {
              if (err) console.log("Error in UpdatePlayerNeeds(insert values food): " + err);            
          });
          player.call("changeValue", ['food', player.data.food]);
      }
      if(player.data.drink > 100) {
          player.data.drink = 100;
          var currentDrink = parseInt(player.data.drink);
          var newDrink = currentDrink - 2;
          player.data.drink = newDrink;
          //player.call("changeValue", ['drink', newDrink]);
          gm.mysql.handle.query('UPDATE characters SET drink = ? WHERE id = ?', [newDrink, player.data.charId], function (err2, res2, row2) {
              if (err2) console.log("Error in UpdatePlayerNeeds(insert values drink): " + err2);
          });
          player.call("changeValue", ['drink', player.data.drink]); 
      }
      else if(player.data.drink < 100 || player.data.drink == 100 || player.data.drink > 0){
          var currentDrink = parseInt(player.data.drink);
          var newDrink = currentDrink - 2;
          player.data.drink = newDrink;
          //player.call("changeValue", ['drink', newDrink]);
          gm.mysql.handle.query('UPDATE characters SET drink = ? WHERE id = ?', [newDrink, player.data.charId], function (err2, res2, row2) {
              if (err2) console.log("Error in UpdatePlayerNeeds(insert values drink): " + err2);
          });
          player.call("changeValue", ['drink', player.data.drink]); 
      }
      if(player.data.drink == 0 || player.data.drink < 0){
          var lowDrink = 0;
          player.data.drink = lowDrink;
          //player.call("changeValue", ['drink', lowDrink]);
          gm.mysql.handle.query('UPDATE characters SET drink = ? WHERE id = ?', [lowDrink, player.data.charId], function (err2, res2, row2) {
              if (err2) console.log("Error in UpdatePlayerNeeds(insert values drink): " + err2);
          });
          player.call("changeValue", ['drink', player.data.drink]); 
      }
      if(player.data.food == 0 || player.data.food < 0){
          var lowFood = 0;
          player.data.food = lowFood;
          //player.call("changeValue", ['food', lowFood]);
          gm.mysql.handle.query('UPDATE characters SET food = ? WHERE id = ?', [lowFood, player.data.charId], function (err2, res2, row2) {
              if (err2) console.log("Error in UpdatePlayerNeeds(insert values drink): " + err2);
          });
          player.call("changeValue", ['food', player.data.food]);
             
      }
    }
  });
  
  function updatePlayerNeeds() {
    mp.players.forEach((player, id) => {
      if(player.data.isPed === 0) {
        mp.events.call("updatePlayerNeeds", player);
      }
    });
  }
  
  setInterval(updatePlayerNeeds, 180000);

  function lossHealth() {
    mp.players.forEach(
        (player, id) => {
            if(player.health > 0) {
                if(player.data.food == 0 || player.data.food < 0) {
                    const lossAmount = 2;
                    newHealth = player.health - lossAmount;
                    player.health = newHealth;
                    if(newHealth < 0){
                        newHealth = 0;
                    }
                    gm.mysql.handle.query('UPDATE characters SET health = ? WHERE id = ?', [newHealth, player.data.charId], function (err2, res2, row2) {
                        if (err2) console.log("Error in UpdatePlayerNeeds(insert values drink): " + err2);
                    });
                }
                if(player.data.drink == 0 || player.data.drink < 0) {
                    const lossAmount = 2;
                    newHealth = player.health - lossAmount;
                    player.health = newHealth;
                    if(newHealth < 0){
                        newHealth = 0;
                    }                    
                    gm.mysql.handle.query('UPDATE characters SET health = ? WHERE id = ?', [newHealth, player.data.charId], function (err2, res2, row2) {
                        if (err2) console.log("Error in UpdatePlayerNeeds(insert values drink): " + err2);
                    });

                }
            }
            else if(player.health == 0){
                return;
            }
        }
    );
}
setInterval(lossHealth, 120000);
lossHealth();