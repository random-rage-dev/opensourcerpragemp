mp.events.add("server:vehiclemenu:keypressY", (player) => {
  if(mp.players.exists(player)) {
    let pos = new mp.Vector3(player.position.x, player.position.y, player.position.z);

    if (getVehicleFromPosition(pos, 5).length > 0) {
      var vehicle = getVehicleFromPosition(pos, 5)[0];
      if(mp.vehicles.exists(vehicle)) {
        if (vehicle) {
          var currentKeys = player.getVariable("currentKeys");
          var vehicleid = vehicle.getVariable("vehId");
          var gurt = player.getVariable("gurt");
          var faction = vehicle.getVariable("faction");
          console.log("1: "+faction);
          console.log("2: "+player.data.faction);
          player.call("client:vehiclemenu:carmenu",[vehicle.locked, player.seat,currentKeys,vehicleid,vehicle.engine,gurt,faction,player.data.faction]);          
        }
      }
    }
  }
});

mp.events.add("server:vehicleMenu:sealtbealton", (player) => {
  player.call("client:vehiclemenu:seatbelton");
  player.setVariable("gurt", true);
});
mp.events.add("server:vehicleMenu:sealtbealtoff", (player) => {
  player.call("client:vehiclemenu:seatbeltoff");
  player.setVariable("gurt", false);
});

function playerEnterVehicleHandler(player, vehicle, seat) {
  if(mp.players.exists(player) && mp.vehicles.exists(vehicle)) {
    if (seat == -1) {
  	  player.vehicle = vehicle;
      vehicle.setVariable("driver",String(player.id));
      if (vehicle.getVariable("isRunning") === "true") {
        if (parseInt(vehicle.getVariable("fuel")) !== 0) {
          vehicle.engine = true;
        } else {
          vehicle.setVariable("isRunning","false");
          setTimeout(function() {
            try{
            } catch (e){
              console.log("ERROR - VehicleMenu - EnterVehicleHandler: " + e);
            }
          },1100);
        }
      } else {
        vehicle.setVariable("isRunning","false");
        setTimeout(function(){
          try{
           } catch (e){
            console.log("ERROR - VehicleMenu - EnterVehicleHandler: " + e);
           }
        },1100);
      }
    }
    player.vehicle = vehicle;
  }
}
mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);

//Z - Motor An/Aus
mp.events.add("server:vehiclemenu:motor", (player, vehicle) => {
  if(mp.players.exists(player)) {
    var currentKeys = player.getVariable("currentKeys");
    currentKeys = JSON.parse(currentKeys);
    if(player.vehicle) {
      if (mp.vehicles.exists(player.vehicle)) {
        vehicle = player.vehicle;
        var vehicleid = vehicle.getVariable("vehId");
        var faction = vehicle.getVariable("faction");
        player.setVariable("playerVehicle",JSON.stringify(vehicle));
          if (currentKeys.length > 0) {
            var check = false;
            currentKeys.forEach(function(key) {
              if (parseInt(key.vehid) == parseInt(vehicleid) && key.active == "Y" || faction == player.data.faction) check = true;
            });
            if (check == true) {
              if (vehicle.engine === true) {
                vehicle.engine = false;
                vehicle.setVariable("isRunning","false");
                player.call(`notification`, ["2", "Motor ausgeschaltet"]);
              } else {
                  vehicle.engine = true;
                  vehicle.setVariable("isRunning","true");
                  player.call(`notification`, ["2", "Motor angeschaltet"]);
              }
            }          
        }
      }
    } else {
        player.notify("Du musst in einem Fahrzeug sein um den Motor zu starten!");
    }
  }
});

//Öffnet und schliesst das Fahrzeug
mp.events.add("server:vehiclemenu:togglelock", (Player) => {
  if(mp.players.exists(Player)) {
    var currentKeys = Player.getVariable("currentKeys");
    currentKeys = JSON.parse(currentKeys);
    var NearbyVehicles = [];
    mp.vehicles.forEachInRange(Player.position, 2.5, (NearbyVehicle) => {
        NearbyVehicles.push(NearbyVehicle);
    });

	  // Sortiert die Fahrzeuge nach entfernung (0 ist das nähste zum Spieler)
    NearbyVehicles.sort(function(a, b){return b.dist(Player.position)-a.dist(Player.position)});

      if( NearbyVehicles.length > 0 )
      {
        if (mp.vehicles.exists(NearbyVehicles[0])) {
          let vehicle = NearbyVehicles[0];
          var vehicleid = vehicle.getVariable("vehId");
          var faction = vehicle.getVariable("faction");
          
          if (currentKeys.length > 0) {
            var check = false;
            currentKeys.forEach(function(key) {
              if (parseInt(key.vehid) == parseInt(vehicleid) && key.active == "Y" || faction == player.data.faction) check = true;
            });

            if (check == true) {
              if (vehicle.locked) {
                vehicle.locked = false;
                Player.call(`notification`, ["2", "Fahrzeug wurde aufgeschlossen"]);
                Player.call("client:vehiclemenu:playSound");
              } else {
                vehicle.locked = true;
                Player.call(`notification`, ["2", "Fahrzeug wurde abgeschlossen"]);
                Player.call("client:vehiclemenu:playSound");
              }  
            }
          }
        }
      }
    }
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