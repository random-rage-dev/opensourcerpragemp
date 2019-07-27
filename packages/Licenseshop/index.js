let licenseshop = mp.colshapes.newSphere(-85.76, 37.53, 71.89, 1, 0);
mp.events.add("PushE", (player) => {
  if (mp.players.exists(player)) {
    if(licenseshop.isPointWithin(player.position)) {
        player.call("client:licenseshop:mainMenu",[player.data.weapona, player.data.weaponb, player.data.pkw, player.data.lkw, player.data.pilot, player.data.job]);    
    }    
  }
});

mp.events.add("server:licenseshop:buyLicense",(player,item) => {
    if (item == "Waffenschein A kaufen") {
        gm.mysql.handle.query("UPDATE licenses SET weapona = '1' WHERE charId = ?", [player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Weapona: "+err);
            player.data.weapona = 1;
            player.notify("~g~Waffenschein A gekauft");
            player.call("client:licenseshop:mainMenu",[player.data.weapona, player.data.weaponb, player.data.pkw, player.data.lkw, player.data.pilot, player.data.job]);
        });
    }
    if (item == "Waffenschein B kaufen") {
        gm.mysql.handle.query("UPDATE licenses SET weaponb = '1' WHERE charId = ?", [player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Weaponb: "+err);
            player.data.weaponb = 1;
            player.notify("~g~Waffenschein B gekauft");
            player.call("client:licenseshop:mainMenu",[player.data.weapona, player.data.weaponb, player.data.pkw, player.data.lkw, player.data.pilot, player.data.job]);
        });
    }
    if (item == "PKW Führerschein kaufen") {
        gm.mysql.handle.query("UPDATE licenses SET pkw = '1' WHERE charId = ?", [player.data.charId], function(err,res) {
            if (err) console.log("Error in Update pkw: "+err);
            player.data.pkw = 1;
            player.notify("~g~PKW Führerschein gekauft");
            player.call("client:licenseshop:mainMenu",[player.data.weapona, player.data.weaponb, player.data.pkw, player.data.lkw, player.data.pilot, player.data.job]);
        });
    }
    if (item == "LKW Führschein kaufen") {
        gm.mysql.handle.query("UPDATE licenses SET lkw = '1' WHERE charId = ?", [player.data.charId], function(err,res) {
            if (err) console.log("Error in Update lkw: "+err);
            player.data.lkw = 1;
            player.notify("~g~LKW Führerschein gekauft");
            player.call("client:licenseshop:mainMenu",[player.data.weapona, player.data.weaponb, player.data.pkw, player.data.lkw, player.data.pilot, player.data.job]);
        });
    }
    if (item == "Piloten Lizenz kaufen") {
        gm.mysql.handle.query("UPDATE licenses SET pilot = '1' WHERE charId = ?", [player.data.charId], function(err,res) {
            if (err) console.log("Error in Update pilot: "+err);
            player.data.pilot = 1;
            player.notify("~g~Pilotenlizenz gekauft");
            player.call("client:licenseshop:mainMenu",[player.data.weapona, player.data.weaponb, player.data.pkw, player.data.lkw, player.data.pilot, player.data.job]);
        });
    }
    if (item == "Job Lizenz kaufen") {
        gm.mysql.handle.query("UPDATE licenses SET job = '1' WHERE charId = ?", [player.data.charId], function(err,res) {
            if (err) console.log("Error in Update job: "+err);
            player.data.job = 1;
            player.notify("~g~Joblizenz gekauft");
            player.call("client:licenseshop:mainMenu",[player.data.weapona, player.data.weaponb, player.data.pkw, player.data.lkw, player.data.pilot, player.data.job]);
        });
    }
});