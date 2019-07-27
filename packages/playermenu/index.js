mp.events.add("server:playermenu:mainMenu",(player) => {
    player.call("client:playermenu:mainMenu",[player.data.adminLvl]);
})

mp.events.add("server:admin:openAdmin",(player,admin) => {
        player.call("client:admin:openAdmin",[player.data.adminLvl]);
});

mp.events.add("server:admin:tpto",(player,targetid) => {
    mp.players.forEach(
        (playerToSearch, id) => {
            if (playerToSearch.id == targetid) {
                player.spawn(playerToSearch.position);
                player.dimension = playerToSearch.dimension;  
            }                      
        }
    );   
});

mp.events.add("server:admin:tphere",(player,targetid) => {
    mp.players.forEach(
        (playerToSearch, id) => {
            if (playerToSearch.id == targetid) {
                playerToSearch.spawn(player.position);
                playerToSearch.dimension = player.dimension;  
            }                      
        }
    );   
});

mp.events.add("server:Keybind:ergeben",(player) => {
    player.playAnimation("mp_am_hold_up","handsup_base",1,49);
    player.data.ergeben = 1;
}); 

mp.events.add("server:playermenu:interaction",(player) => {
        player.call("client:playermenu:interaction",[player.data.weapona, player.data.weaponb, player.data.pkw, player.data.lkw, player.data.pilot, player.data.job, currentTarget.data.ergeben]);  
});

mp.events.add("server:admin:banwetter",(player,targetid) => {
    mp.players.forEach((player) => {
        var newWeather = "FOGGY";
        gm.weather.currentWeather = newWeather;
        mp.players.call("client:world:weatherUpdate", [newWeather]);
        setTimeout(_ => {
            var newWeather = "RAIN";
          gm.weather.currentWeather = newWeather;
          mp.players.call("client:world:weatherUpdate", [newWeather]);
        }, 30000); 
        setTimeout(_ => {
          var newWeather = "THUNDER";
        gm.weather.currentWeather = newWeather;
        mp.players.call("client:world:weatherUpdate", [newWeather]);
      }, 60000);  
    });
});

mp.events.add("server:admin:banwetteraus",(player,targetid) => {
    mp.players.forEach((player) => {
        var newWeather = "RAIN";
        gm.weather.currentWeather = newWeather;
        mp.players.call("client:world:weatherUpdate", [newWeather]);
        setTimeout(_ => {
            var newWeather = "FOGGY";
          gm.weather.currentWeather = newWeather;
          mp.players.call("client:world:weatherUpdate", [newWeather]);
        }, 30000);     
    });
});

mp.events.add("server:admin:permban",(player,targetid) => {
    mp.players.forEach(
        (playerToSearch, id) => {
            if (playerToSearch.id == targetid) {                
                gm.mysql.handle.query("UPDATE accounts SET banned = '1' WHERE id = ?",[playerToSearch.data.accountID],function(err,res) {
                    playerToSearch.kick();
                });
            }                      
        }
    );   
});

mp.events.add("server:admin:heal",(player) => {
    player.health = 100;
    player.data.health = 100;
});

mp.events.add("server:admin:armor",(player) => {
    player.armour = 100;
    player.data.armor = 100;
});

mp.events.add("server:admin:kick",(player,targetid) => {
    mp.players.forEach(
        (playerToSearch, id) => {
            if (playerToSearch.id == targetid) {                
                playerToSearch.kick();
            }                      
        }
    );   
});

mp.events.add("server:admin:playerlist",(player) => {
    gm.mysql.handle.query("SELECT * FROM characters WHERE isOnline = '1'",[],function(err,res) {
        if(err) console.log("Error in Select Online Users: "+err);
        if (res.length > 0) {
            var PlayerList = [];
            var i = 1;
            res.forEach(function(players) {
                let obj = { "firstname": String(players.firstname), "lastname": String(players.lastname), "onlineid": String(players.onlineId)};
                PlayerList.push(obj);
                if (parseInt(i) == parseInt(res.length)) {
                    if (mp.players.exists(player)) player.call("client:admin:playerlist", [JSON.stringify(PlayerList)]);
                }
                i++;
            });
        } else {
            //Keine Spieler Online
        }
    });
});

mp.events.add("server:shortcut:openMenu",(player) => {
    gm.mysql.handle.query("SELECT * FROM shortcuts WHERE charId = ?",[player.data.charId],function(err,res) {
        if(err) console.log("Error in Select Online Users: "+err);
        if (res.length > 0) {
            var AnimList = [];
            var i = 1;
            res.forEach(function(anim) {
                let obj = { "num1name": String(anim.num1name), "num1anim": String(anim.num1anim), "num2name": String(anim.num2name), "num2anim": String(anim.num2anim), "num3name": String(anim.num3name), "num3anim": String(anim.num3anim), "num4name": String(anim.num4name), "num4anim": String(anim.num4anim), "num5name": String(anim.num5name), "num5anim": String(anim.num5anim), "num6name": String(anim.num6name), "num6anim": String(anim.num6anim), "num6name": String(anim.num6name), "num6anim": String(anim.num6anim), "num7name": String(anim.num7name), "num7anim": String(anim.num7anim), "num8name": String(anim.num8name), "num8anim": String(anim.num8anim), "num9name": String(anim.num9name), "num9anim": String(anim.num9anim)};
                AnimList.push(obj);
                if (parseInt(i) == parseInt(res.length)) {
                    if (mp.players.exists(player)) player.call("client:anim:openShortcut", [JSON.stringify(AnimList)]);
                }
                i++;
            });
        } else {
            //Keine Spieler Online
        }
    });
});

mp.events.add("server:shortcut:save",(player,name,id,p1,p2,p3,p4) => {
    if (id == 1) {
        gm.mysql.handle.query("UPDATE shortcuts SET num1animA = ?,num1animB = ?,num1animC = ?,num1animD = ?, num1name = ? WHERE charId = ?", [p1,p2,p3,p4,name,player.data.charId],function(err,res) {
            if (err) console.log("Error in Update Shorcuts: "+err);
            player.data.numpad1A = p1;
            player.data.numpad1B = p2;
            player.data.numpad1C = p3;
            player.data.numpad1D = p4;
            player.data.numpad1Name = name;
        });
    }
    if (id == 2) {
        gm.mysql.handle.query("UPDATE shortcuts SET num2animA = ?,num2animB = ?,num2animC = ?,num2animD = ?, num2name = ? WHERE charId = ?", [p1,p2,p3,p4,name,player.data.charId],function(err,res) {
            if (err) console.log("Error in Update Shorcuts: "+err);
            player.data.numpad2A = p1;
            player.data.numpad2B = p2;
            player.data.numpad2C = p3;
            player.data.numpad2D = p4;
            player.data.numpad2Name = name;
        });
    }
    if (id == 3) {
        gm.mysql.handle.query("UPDATE shortcuts SET num3animA = ?,num3animB = ?,num3animC = ?,num3animD = ?, num3name = ? WHERE charId = ?", [p1,p2,p3,p4,name,player.data.charId],function(err,res) {
            if (err) console.log("Error in Update Shorcuts: "+err);
            player.data.numpad3A = p1;
            player.data.numpad3B = p2;
            player.data.numpad3C = p3;
            player.data.numpad3D = p4;
            player.data.numpad3Name = name;
        });
    }
    if (id == 4) {
        gm.mysql.handle.query("UPDATE shortcuts SET num4animA = ?,num4animB = ?,num4animC = ?,num4animD = ?, num4name = ? WHERE charId = ?", [p1,p2,p3,p4,name,player.data.charId],function(err,res) {
            if (err) console.log("Error in Update Shorcuts: "+err);
            player.data.numpad4A = p1;
            player.data.numpad4B = p2;
            player.data.numpad4C = p3;
            player.data.numpad4D = p4;
            player.data.numpad4Name = name;
        });
    }
    if (id == 5) {
        gm.mysql.handle.query("UPDATE shortcuts SET num5animA = ?,num5animB = ?,num5animC = ?,num5animD = ?, num5name = ? WHERE charId = ?", [p1,p2,p3,p4,name,player.data.charId],function(err,res) {
            if (err) console.log("Error in Update Shorcuts: "+err);
            player.data.numpad5A = p1;
            player.data.numpad5B = p2;
            player.data.numpad5C = p3;
            player.data.numpad5D = p4;
            player.data.numpad5Name = name;
        });
    }
    if (id == 6) {
        gm.mysql.handle.query("UPDATE shortcuts SET num6animA = ?,num6animB = ?,num6animC = ?,num6animD = ?, num6name = ? WHERE charId = ?", [p1,p2,p3,p4,name,player.data.charId],function(err,res) {
            if (err) console.log("Error in Update Shorcuts: "+err);
            player.data.numpad6A = p1;
            player.data.numpad6B = p2;
            player.data.numpad6C = p3;
            player.data.numpad6D = p4;
            player.data.numpad6Name = name;
        });
    }
    if (id == 7) {
        gm.mysql.handle.query("UPDATE shortcuts SET num7animA = ?,num7animB = ?,num7animC = ?,num7animD = ?, num7name = ? WHERE charId = ?", [p1,p2,p3,p4,name,player.data.charId],function(err,res) {
            if (err) console.log("Error in Update Shorcuts: "+err);
            player.data.numpad7A = p1;
            player.data.numpad7B = p2;
            player.data.numpad7C = p3;
            player.data.numpad7D = p4;
            player.data.numpad7Name = name;
        });
    }
    if (id == 8) {
        gm.mysql.handle.query("UPDATE shortcuts SET num8animA = ?,num8animB = ?,num8animC = ?,num8animD = ?, num8name = ? WHERE charId = ?", [p1,p2,p3,p4,name,player.data.charId],function(err,res) {
            if (err) console.log("Error in Update Shorcuts: "+err);
            player.data.numpad8A = p1;
            player.data.numpad8B = p2;
            player.data.numpad8C = p3;
            player.data.numpad8D = p4;
            player.data.numpad8Name = name;
        });
    }
    if (id == 9) {
        gm.mysql.handle.query("UPDATE shortcuts SET num9animA = ?,num9animB = ?,num9animC = ?,num9animD = ?, num9name = ? WHERE charId = ?", [p1,p2,p3,p4,name,player.data.charId],function(err,res) {
            if (err) console.log("Error in Update Shorcuts: "+err);
            player.data.numpad9A = p1;
            player.data.numpad9B = p2;
            player.data.numpad9C = p3;
            player.data.numpad9D = p4;
            player.data.numpad9Name = name;
        });
    }
});


const walkingStyles = [
    {Name: "Normal", AnimSet: null},
    {Name: "Brave", AnimSet: "move_m@brave"},
    {Name: "Confident", AnimSet: "move_m@confident"},
    {Name: "Drunk", AnimSet: "move_m@drunk@verydrunk"},
    {Name: "Fat", AnimSet: "move_m@fat@a"},
    {Name: "Gangster", AnimSet: "move_m@shadyped@a"},
    {Name: "Hurry", AnimSet: "move_m@hurry@a"},
    {Name: "Injured", AnimSet: "move_m@injured"},
    {Name: "Intimidated", AnimSet: "move_m@intimidation@1h"},
    {Name: "Quick", AnimSet: "move_m@quick"},
    {Name: "Sad", AnimSet: "move_m@sad@a"},
    {Name: "Test 1", AnimSet: "ANIM_GROUP_MOVE_BALLISTIC"},
    {Name: "Test2", AnimSet: "ANIM_GROUP_MOVE_LEMAR_ALLEY"},
    {Name: "Test3", AnimSet: "clipset@move@trash_fast_turn"},
    {Name: "Test4", AnimSet: "FEMALE_FAST_RUNNER"},
    {Name: "Test5", AnimSet: "missfbi4prepp1_garbageman"},
    {Name: "Test6", AnimSet: "move_characters@franklin@fire"},
    {Name: "Test7", AnimSet: "move_characters@Jimmy@slow@"},
    {Name: "Test8", AnimSet: "move_f@sexy@a"},
    {Name: "Test9", AnimSet: "move_f@flee@a"},
    {Name: "Test10", AnimSet: "move_f@scared"},
    {Name: "Tough", AnimSet: "move_m@tool_belt@a"}
    
];

mp.events.add("requestWalkingStyles", (player) => {
    player.call("receiveWalkingStyles", [JSON.stringify(walkingStyles.map(w => w.Name))]);
});

mp.events.add("setWalkingStyle", (player, styleIndex) => {
    if (styleIndex < 0 || styleIndex >= walkingStyles.length) return;
    player.data.walkingStyle = walkingStyles[styleIndex].AnimSet;
    player.outputChatBox(`Walking style set to ${walkingStyles[styleIndex].Name}.`);
});


mp.events.add("server:clothes:showKleidung",(player) => {
    player.call("client:clothes:showKleidung",[player.data.gender]);
});

//Hut
mp.events.add("server:playermenu:setexistHut", (player) => {
    player.setProp(0,player.data.hat,player.data.hattext);
    player.data.prop0 = null;
});
mp.events.add("server:playermenu:setHut",(player,p1,p2,p3) => {
    player.setProp(p1,p2,p3);
    player.data.prop0 = p2;
});

//Brille
mp.events.add("server:playermenu:setexistEye",(player) => {
    player.setProp(1,player.data.eye,player.data.eyetext);
    player.data.prop1 = null;
});

mp.events.add("server:playermenu:setEye",(player,p1,p2,p3) => {
    player.setProp(p1,p2,p3);
    player.data.prop1 = p2;
});

//Maske
mp.events.add("server:playermenu:setexistMask",(player) => {
    player.setClothes(1,player.data.mask,player.data.masktext,0);
});

mp.events.add("server:playermenu:setMask",(player,p1,p2,p3) => {
    player.setClothes(p1,p2,p3,0);
});

//Torso
mp.events.add("server:playermenu:setexistTorso",(player) => {
    player.setClothes(3,player.data.torso,0,0);
    player.setClothes(8,player.data.shirt,player.data.shirttext,0);
    player.setClothes(11,player.data.jacket,player.data.jackettext,0);
});
mp.events.add("server:playermenu:setOberkörper",(player,p1,p2,p3,p4,p5,p6,p7,p8,p9) => {
    player.setClothes(p1,p2,p3,0);
    player.setClothes(p4,p5,p6,0);
    player.setClothes(p7,p8,p9,0);
});

//Hose
mp.events.add("server:playermenu:setexistLeg",(player) => {
    player.setClothes(4,player.data.leg,player.data.legtext,0);
});
mp.events.add("server:playermenu:setLeg",(player,p1,p2,p3) => {
    player.setClothes(p1,p2,p3,0);
});

//Schuhe
mp.events.add("server:playermenu:setexistShoe",(player) => {
    player.setClothes(6,player.data.shoe,player.data.shoetext,0);
});
mp.events.add("server:playermenu:setShoe",(player,p1,p2,p3) => {
    player.setClothes(p1,p2,p3,0);
});


var currentTarget = null;

function getNearestPlayer(player, range) {
    let dist = range;
    mp.players.forEachInRange(player.position, range,
        (_player) => {
            if (player != _player) {
                let _dist = _player.dist(player.position);
                if (_dist < dist) {
                    currentTarget = _player;
                    dist = _dist;
                }
            }
        }
    );
};