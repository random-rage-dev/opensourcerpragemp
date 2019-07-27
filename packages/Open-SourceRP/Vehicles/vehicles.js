var conf = require('./../config.js');
module.exports =
{
	CreateCar: function(player,model,owner,faction,rent,numberPlate,posX,posY,posZ,posR,color1,color2){
        player.outputChatBox("Klappt" +model);
        let idFromCar = null;
        gm.mysql.handle.query("INSERT INTO `vehicles` SET model = ?, owner = ?, faction = ?, rent = ?, numberPlate = ?, pos_x = ?, pos_y = ?, pos_z = ?, pos_r = ?, color1 = ?, color2 = ?",
        [model,owner,faction,rent,numberPlate,posX,posY,posZ,posR,color1,color2]);

        gm.mysql.handle.query("SELECT * FROM vehicles WHERE owner = ? AND model = ?", [player.name, model], function (error, results, fields) {

            for(let i = 0; i < results.length; i++) {
                conf.veh_params[i]['model'] = results[i].model;
                conf.veh_params[i]['id'] = results[i].id;
                conf.veh_params[i]['owner'] = results[i].owner;
				
                conf.veh_params[i]['posX'] = parseFloat(results[i].posX);
                conf.veh_params[i]['posY'] = parseFloat(results[i].posY);
                conf.veh_params[i]['posZ'] = parseFloat(results[i].posZ);
                conf.veh_params[i]['posZ'] = parseFloat(results[i].posZ);
                
                conf.veh_params[i]['rent'] = results[i].rentCar;
                conf.veh_params[i]['numberPlate'] = results[i].numberPlate;
                conf.veh_params[i]['color1'] = results[i].color1;
                conf.veh_params[i]['color2'] = results[i].color2;
                
                conf.veh_params[i]['km'] = results[i].km;
                conf.veh_params[i]['tank'] = results[i].tank;
                conf.veh_params[i]['maxtank'] = results[i].maxtank;
				
				// AUTO SPAWNEN
				
				
            }
				
				
				
				
        });
    




}
}


