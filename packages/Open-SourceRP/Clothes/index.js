module.exports =
{
	SetPlayerClothes: function(player,clothes,drawable, texture){
        if(clothes == "hat") { player.setProp(0,drawable,texture); player.data.hat = drawable; player.data.hattext = texture; }
        else if(clothes == "glasses") { player.setProp(1,drawable,texture); player.data.eye = drawable; player.data.eyetext = texture; }
        else if(clothes == "mask") {player.setClothes(1,drawable,texture,0); player.data.mask = drawable; player.data.masktext = texture; }

        else if(clothes == "torso") {player.setClothes(3,drawable,texture,0); player.data.torso = drawable;}
        else if(clothes == "leg") {player.setClothes(4,drawable,texture,0); player.data.leg = drawable; player.data.legtext = texture; }
        else if(clothes == "shoe") {player.setClothes(6,drawable,texture,0); player.data.shoe = drawable; player.data.shoetext = texture; }
        else if(clothes == "body") {player.setClothes(9,drawable,texture,0); player.data.body = drawable; player.data.bodytext = texture; }
        else if(clothes == "shirt") {player.setClothes(8,drawable,texture,0); player.data.shirt = drawable; player.data.shirttext = texture; }
        else if(clothes == "jacket") {player.setClothes(11,drawable,texture,0); player.data.jacket = drawable; player.data.jackettext = texture; }


        gm.mysql.handle.query("UPDATE characters SET hat = ?, hattext = ?, eye = ?, eyetext = ?, mask = ?, masktext = ?, torso = ?, leg = ?, legtext = ?, shoe = ?, shoetext = ?, jacket = ?, jackettext = ?, shirt = ?, shirttext = ?, body = ?, bodytext = ? WHERE id = ?",
        [player.data.hat, player.data.hattext, player.data.eye,player.data.eyetext, player.data.mask , player.data.masktext, player.data.torso, player.data.leg,player.data.legtext,player.data.shoe,player.data.shoetext,player.data.jacket,player.data.jackettext,player.data.shirt,player.data.shirttext,player.data.body,player.data.bodytext,player.data.charId]);


    }
}