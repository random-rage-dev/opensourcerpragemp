const fs = require("fs");
const saveFile = "savedpos.txt";
gm.vehicles = require("./../../vehicles/index.js");
mp.events.addCommand("save", (player, name = "No name") => { //Koordinaten Saven
    let pos = (player.vehicle) ? player.vehicle.position : player.position;
    let rot = (player.vehicle) ? player.vehicle.rotation : player.heading;

    fs.appendFile(saveFile, `Position: ${pos.x}, ${pos.y}, ${pos.z} | ${(player.vehicle) ? `Rotation: ${rot.x}, ${rot.y}, ${rot.z}` : `Heading: ${rot}`} | ${(player.vehicle) ? "InCar" : "OnFoot"} - ${name}\r\n`, (err) => {
        if (err) {
            player.notify(`~r~SavePos Error: ~w~${err.message}`);
        } else {
            player.notify(`~g~Position saved. ~w~(${name})`);
        }
    });
});
mp.events.addCommand("veh", (player, full, hash, r, g, b, r2, g2, b2) => {
		   var veh = mp.vehicles.new(mp.joaat(hash), player.position, {});
		   veh.dimension = player.dimension;
		   veh.numberPlateType = 1;
		   veh.numberPlate = "SUPPORT";
		   veh.engine = true;
		   veh.dead = false;
		   player.putIntoVehicle(veh, -1);	   
});

mp.events.addCommand("tpcor", (player, full, x, y, z) => {
	player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
  
  });
mp.events.addCommand("tpcor", (player, full, x, y, z) => {
	player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
});
mp.events.addCommand("social", (player) => {
 player.outputChatBox("SocialClub:"+player.socialClub);
});
mp.events.addCommand("test", (player) => {
	player.position = new mp.Vector3(402.8664, -996.4108, -99.00027);
});
mp.events.addCommand("docu", (player) => {
	player.call("client:lspd:documents:Einstellung");	
});
mp.events.addCommand("creategarage", (player, name) => {	
	console.log("Test"+name)
	if(name != "")
	{
		gm.mysql.handle.query("INSERT INTO garage SET name = ?, pedx = ?, pedy = ?, pedz = ?, pedr = ?", [name,player.position.x,player.position.y,player.position.z,player.heading], function(err, res){
		if(err) console.log("Error in Create Garage : "+err);
		mp.blips.new(50, new mp.Vector3(player.position.x,player.position.y,player.position.z),
		{
			name: name,
			color: 0,
			shortRange: true,
		});
		});
		player.outputChatBox("Garage erstellt[" +name+ "]");
	}		
});

mp.events.addCommand("gs1", (player, id) => {
	
		if(id != "")
		{
			gm.mysql.handle.query("UPDATE garage SET spawn1x = ?, spawn1y = ?, spawn1z = ?, spawn1r = ? WHERE id = ?", [player.position.x,player.position.y,player.position.z,player.heading,id], function(err, res){
			if(err) console.log("Error in Create Garage : "+err);
			});
			player.outputChatBox("Spawn 1 erstellt[" +id+ "]");
		}	
	
});

mp.events.addCommand("gs2", (player, id) => {
	if(id != "")
	{
		gm.mysql.handle.query("UPDATE garage SET spawn2x = ?, spawn2y = ?, spawn2z = ?, spawn2r = ? WHERE id = ?", [player.position.x,player.position.y,player.position.z,player.heading,id], function(err, res){
		if(err) console.log("Error in Create Garage : "+err);
		});
		player.outputChatBox("Spawn 1 erstellt[" +id+ "]");
	}		
});

mp.events.addCommand("atm",(player) => {
	gm.mysql.handle.query("INSERT INTO atms posX = ?, posY = ?, posZ = ?",[player.position.x,player.position.y,player.position.z], function(err,res) {
		if (err) console.log("Error in Create ATM: "+err);
		mp.blips.new(108, new mp.Vector3(player.position.x,player.position.y,player.position.z),
		{
			name: "ATM",
			color: 25,
			scale: 1,
			shortRange: true,
		});
	});
});