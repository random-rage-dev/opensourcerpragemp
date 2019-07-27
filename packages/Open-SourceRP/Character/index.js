const freemodeCharacters = [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")];

mp.events.add("server:charcreator:startcreator", (player) => {
  if(mp.players.exists(player)) {
      
  }
});

mp.events.add("createCharacter", (player, data) => {
  if(mp.players.exists(player)) {
    gm.mysql.handle.query("UPDATE characters SET created = '1' WHERE id = '" + player.data.charId + "'", (err, res) => {
        if (err) throw err;
        //player.position = new mp.Vector3(-1042.6781005859375, -2746.25, 21.35940170288086);
        //player.heading = 323.992858886715;
        //player.notify("~g~Dein Character ist nun eingereist!");

        if (player.model === mp.joaat("mp_m_freemode_01")) {
            player.setClothes(1, 0, 0, 0); //Mask
            player.setClothes(3, 6, 0, 0); //Torso
            player.setClothes(4, 1, 0, 0); //Legs
            player.setClothes(6, 1, 0, 0); //Shoes
            player.setClothes(8, 15, 0, 0); //Undershirt
            player.setClothes(11, 41, 0, 0); //Top
        } else {
            player.setClothes(1, 0, 0, 0); //Mask 
            player.setClothes(3, 15, 0, 0); //Torso
            player.setClothes(4, 73, 0, 0); //Legs
            player.setClothes(6, 3, 0, 0); //Shoes
            player.setClothes(8, 16, 0, 0); //Undershirt
            player.setClothes(11, 16, 0, 0); //Top
        }

        gm.mysql.handle.query("UPDATE characters SET data =? WHERE id='" + player.data.charId + "'", [data], function (err, res) {
            if (err) throw err;
        })
        player.dimension = 0;
        player.alpha = 255;
        player.call("stopCreator");
        //In die "Einreisehalle"

 



        //player.call("sendPlayerToAirport");
    });
  }
});



mp.events.add("creator_GenderChange", (player, gender) => {
  if(mp.players.exists(player)) {
    player.model = freemodeCharacters[gender];
    player.data.model = gender;
    player.alpha = 0;

    player.changedGender = true;
    player.call("genderChange");
  }
});
mp.events.add("server:characters:clothes", (player,slot) => {
  if(slot == 0)
  {
    if (player.model === mp.joaat("mp_m_freemode_01")) 
    {
      player.setProp(0,121,0); //Frau 120
      player.setClothes(11,278,1,0);
      player.setClothes(8,2,0,0);
      player.setClothes(4,1,0,0);
      player.setClothes(6,1,0,0);
      player.setClothes(3,0,0,0);
    }
    else 
    {
      player.setProp(0,120,0); //Frau 120
    }
  }
  else if(slot == 1) {
    if (player.model === mp.joaat("mp_m_freemode_01")) 
    {
      player.setProp(0,121,0);
      player.setClothes(1, 0, 0, 0); //Mask
      player.setClothes(3, 6, 0, 0); //Torso
      player.setClothes(4, 1, 0, 0); //Legs
      player.setClothes(6, 1, 0, 0); //Shoes
      player.setClothes(8, 15, 0, 0); //Undershirt
      player.setClothes(11, 41, 0, 0); //Top
    }
    else
    {
      player.setProp(0,120,0);
    }
  }
  else if(slot == 2) {
    if (player.model === mp.joaat("mp_m_freemode_01")) 
    {
      player.setProp(0,121,0);
      player.setClothes(11,284,0,0);
      player.setClothes(8,2,0,0);
      player.setClothes(4,10,0,0);
      player.setClothes(6,10,0,0);
      player.setClothes(3,1,0,0);
    }
    else {
      player.setProp(0,120,0);
    }
  }
  else if(slot == 3) {
    let hat = player.getProp(0);
    let jackets = player.getClothes(11);
    let torso = player.getClothes(3);
    let leg = player.getClothes(4);
    let shoe = player.getClothes(6);
    let shirt = player.getClothes(8);
    gm.clothes.SetPlayerClothes(player,"hat",hat.drawable, hat.texture);
    gm.clothes.SetPlayerClothes(player,"jacket",jackets.drawable,jackets.texture);
    gm.clothes.SetPlayerClothes(player,"torso",torso.drawable,0);
    gm.clothes.SetPlayerClothes(player,"leg",leg.drawable,leg.texture);
    gm.clothes.SetPlayerClothes(player,"shoe",shoe.drawable,shoe.texture);
    gm.clothes.SetPlayerClothes(player,"shirt",shirt.drawable,shirt.texture);

    player.call("client:characters:closeClothes");
    player.call("client:characters:closeCamera");
    /*player.position = new mp.Vector3(-1042.6781005859375, -2746.25, 21.35940170288086);
    player.heading = 323.992858886715;
    player.data.isSpawned = 1;*/
    gm.mysql.handle.query('SELECT *  FROM characters WHERE accountID = ?', [player.data.accountID], function (err1, res1, row1) {
      if (err1) console.log("Error in Select Characters: "+err1);	
          if(res1.length) {
              var charList = [];
              res1.forEach(function(chars) {
                  let obj = {"firstname": String(chars.firstname), "lastname": String(chars.lastname), "id": String(chars.id)};
                  charList.push(obj);

              });					
              player.call("client:characters:choosechar", [JSON.stringify(charList)]);	
              
          }
          player.position = new mp.Vector3(-797.3433227539062, 332.110595703125, 153.8050079345703);
          player.heading = 268.0709228515625;
          player.call("client:characters:showCamera");
          gm.mysql.handle.query("INSERT INTO shortcuts SET charId = ?",[player.data.charId]);
          gm.mysql.handle.query("INSERT INTO licenses SET charId = ?",[player.data.charId]);
      });
  }

  
    
});
mp.events.add("server:characters:selected", (player, slot) => {
    if(slot == 0)
    {
      player.position = new mp.Vector3(player.data.posX,player.data.posY,player.data.posZ);
      player.heading = player.data.posR;
      player.dimension = player.data.dimension;
      player.data.isSpawned = 1;
      player.call("client:characters:destroyMenu");
    }
    else if(slot == 1)
    {
      gm.mysql.handle.query('SELECT *  FROM characters WHERE accountID = ?', [player.data.accountID], function (err1, res1, row1) {
        if (err1) console.log("Error in Select Characters: "+err1);	
            if(res1.length) {
                var charList = [];
                res1.forEach(function(chars) {
                    let obj = {"firstname": String(chars.firstname), "lastname": String(chars.lastname), "id": String(chars.id)};
                    charList.push(obj);

                });					
                player.call("client:characters:choosechar", [JSON.stringify(charList)]);	

            }
            player.call("client:characters:destroySpawnMenu");
        });
    }
});