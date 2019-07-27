require('./lspd/index.js');

mp.events.add("server:faction:loadmarker", (player) => {
	gm.mysql.handle.query('SELECT * FROM faction WHERE name = ?', [player.data.faction], function (error, results, fields) {
		for(let i = 0; i < results.length; i++) {
			console.log("Test: "+results[i].name);
			console.log("Test; "+player.data.faction)
			if(player.data.faction == results[i].name)
			{
			player.call("LoadFactionDutyMarkers",[results[i].dutyX,results[i].dutyY,results[i].dutyZ]);
			player.call("LoadFactionClothesMarkers",[results[i].clothesX,results[i].clothesY,results[i].clothesZ]);
			player.call("LoadFactionEquipMarkers", [results[i].equipX,results[i].equipY,results[i].equipZ]);
			player.call("LoadFactionPCMarkers", [results[i].pcX,results[i].pcY,results[i].pcZ]);
			player.call("LoadFactionChiefMarkers", [results[i].chiefX,results[i].chiefY,results[i].chiefZ]);
			player.call("LoadFactionGaragenMarkers",[results[i].vehicleX,results[i].vehicleY,results[i].vehicleZ]);
			player.call("LoadFactionParkingMarkers",[results[i].parkX,results[i].parkY,results[i].parkZ]);
			}		
		}
	});	
});

mp.events.add("server:faction:duty", (player) => {
	if (player.data.factionDuty == 1) {
		gm.mysql.handle.query("UPDATE characters SET duty = '0', factioncloth = 'Zivil' WHERE id = ? ", [player.data.charId], function (err, res) {
			if (err) console.log("Error in Update Duty :"+err);
			if(player.data.faction == "LSPD") { player.notifyWithPicture("Los Santos Police Departement", "Dienst", "Du bist außer Dienst gegangen!","CHAR_CALL911"); }
			else if(player.data.faction === "Medic") { player.notifyWithPicture("Los Santos Medical Center", "Dienst", "Du bist außer Dienst gegangen!","CHAR_CALL911"); }
			else if(player.data.faction === "Justiz") { player.notifyWithPicture("Department of Justice", "Dienst", "Du bist außer Dienst gegangen!","CHAR_CALL911"); }
			player.data.factionDuty = 0;
		});
	} else {
		gm.mysql.handle.query("UPDATE characters SET duty = '1', factioncloth = 'Zivil' WHERE id = ?", [player.data.charId], function(err1,res1) {
			if (err1) console.log("Error in Update Duty: "+err1);
			if(player.data.faction == "LSPD") { player.notifyWithPicture("Los Santos Police Departement", "Dienst", "Du bist in den Dienst gegangen!","CHAR_CALL911"); }
			else if(player.data.faction === "Medic") { player.notifyWithPicture("Los Santos Medical Center", "Dienst", "Du bist in den Dienst gegangen!","CHAR_CALL911"); }
			else if(player.data.faction === "Justiz") { player.notifyWithPicture("Department of Justice", "Dienst", "Du bist in den Dienst gegangen!","CHAR_CALL911"); }
			player.data.factionDuty = 1;
		});
	}
});
