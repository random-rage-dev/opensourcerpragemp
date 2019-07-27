module.exports =
{
	CreateVehicle: function(player,model,x,y,z,r,numberPlate){
        let vID = null;
        gm.mysql.handle.query("INSERT INTO vehicles SET model = ?, numberPlate = ?",[model,numberPlate], function(error,ress){
            if(error) console.log("Error in Create Vehicle" +error)
            vID = ress.insertId;
            
            gm.mysql.handle.query("SELECT * FROM vehicles WHERE id=?",[vID],function(error2,ress2) {
            if(error2) console.log("Error in Vehicle Select After Create" +error2)
                let veh = mp.vehicles.new(mp.joaat(ress2[0].model), new mp.Vector3(x,y,z), // set black colour
                {
                numberPlate: ress2[0].numberPlate,
                engine: false,
                color: [[0, 255, 0],[0, 255, 0]],
                heading: r
                });
                veh.setColor(1,1);	
                veh.setVariable("vehId",vID);
                veh.engine = false;
                mp.events.call("server:vehicles:givenewKey", player,vID);
            });


        });


    }
}