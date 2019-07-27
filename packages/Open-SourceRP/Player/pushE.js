
var conf = require("./../config.js");
mp.Vector3.Distance = function (v1, v2){
	return Math.abs(Math.sqrt(Math.pow((v2.x - v1.x),2) +
									Math.pow((v2.y - v1.y),2)+
									Math.pow((v2.z - v1.z),2)));
}	
mp.Vector3.Distance2D = function (v1, v2){
	return Math.abs(Math.sqrt(Math.pow((v2.x - v1.x),2) +
									Math.pow((v2.y - v1.y),2)));
}
mp.events.add("PushE", (player) => {
    if(player.data.faction != "Civillian") {
    gm.mysql.handle.query('SELECT * FROM faction WHERE name = ?', [player.data.faction], function (error, results, fields) {
	for(let i = 0; i < results.length; i++) {
		if(player.data.faction == results[i].name)
		{
            let distance = mp.Vector3.Distance2D(player.position,new mp.Vector3(parseFloat(results[i].dutyX), parseFloat(results[i].dutyY), parseFloat(results[i].dutyZ)));
            let distance2 = mp.Vector3.Distance2D(player.position,new mp.Vector3(parseFloat(results[i].clothesX), parseFloat(results[i].clothesY), parseFloat(results[i].clothesZ)));
            let distance3 = mp.Vector3.Distance2D(player.position,new mp.Vector3(parseFloat(results[i].equipX), parseFloat(results[i].equipY), parseFloat(results[i].equipZ)));
			let distance4 = mp.Vector3.Distance2D(player.position,new mp.Vector3(parseFloat(results[i].pcX), parseFloat(results[i].pcY), parseFloat(results[i].pcZ)));
			let distance5 = mp.Vector3.Distance2D(player.position,new mp.Vector3(parseFloat(results[i].chiefX), parseFloat(results[i].chiefY), parseFloat(results[i].chiefZ)));
			let distance6 = mp.Vector3.Distance2D(player.position,new mp.Vector3(parseFloat(results[i].vehicleX), parseFloat(results[i].vehicleY), parseFloat(results[i].vehicleZ)));
			let distance7 = mp.Vector3.Distance2D(player.position,new mp.Vector3(parseFloat(results[i].parkX), parseFloat(results[i].parkY), parseFloat(results[i].parkZ)));
             
            if(distance <= 1)
            {
                mp.events.call("server:faction:duty", player);
            }
            else if(distance2 <=1)
            {
                player.call("client:lspd:clothes");
            }
            else if(distance3 <=1)
            {
                player.call("client:lspd:openWeapon");
			}
			else if(distance4 <=1)
			{
				player.call("client:lspd:createOfficeComputer",[player.data.factionrang]);
				player.call("client:lspd:openofficeComputer");
			}
			else if(distance5 <=1)
			{
				if (player.data.factionrang >= 6) {
					player.call("client:lspd:createChiefMenu");
				}
			}
			else if(distance6 <=1)
			{
				player.call("client:lspd:createVeichleMenu",[player.data.factionrang]);
			}
			else if(distance7 <=1)
			{
				mp.events.call("server:lspd:parkin",(player));
			}
        }
    }
    });
	}  
	for(let i = 0; i < conf.sys_atms.length; i++) {
		let distance = mp.Vector3.Distance2D(player.position,new mp.Vector3(parseFloat(conf.atms_params[i]['posX']), parseFloat(conf.atms_params[i]['posY']), parseFloat(conf.atms_params[i]['posZ'])));
			if(distance <= 5)
			{
				if (conf.atms_params[i]['usable'] == 0) {
					console.log("Test5");
					mp.events.call("server:bank:konten",player,atmid);
				} else {
					player.notify("~r~Der ATM ist kaputt!");
				}
			}
		}  
});
var currentTarget = null;
mp.events.add("server:faction:interaction", (player) => {
    if(player.data.faction == "LSPD" && player.data.factionDuty == 1)
    {
	currentTarget = null;
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
						const pos = currentTarget.position;
						//mp.colshapes.newSphere(post, 1.0, 0);
					}
				}
			}
		);
	}
    getNearestPlayer(player, 2);
    if(currentTarget)
	{
        player.call("client:lspd:openMainMenu",[player.data.factionrang]);
        
        //player.call("client:", (player, currentTarget));
		player.data.target = currentTarget;

    }
}
});


