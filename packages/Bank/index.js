var currentTarget = null;

mp.events.add("server:bank:konten", (player,bankname,atmid) => {
    gm.mysql.handle.query("SELECT * FROM bank_konten WHERE ownerId = ?", [player.data.charId], function(err, res) {
        if (err) console.log("Error in Select Bank Konten: "+err);
        if (res.length > 0) {
            var i = 1;
            let BankList = [];
            res.forEach(function(bank) {
                let obj = {"nummer": String(bank.kontonummer), "id": String(bank.id), "name": String(bank.beschreibung)};
                BankList.push(obj);

                if (parseInt(i) == parseInt(res.length)) {
                    if(mp.players.exists(player)) player.call("client:bank:openMenu", [JSON.stringify(BankList),bankname,atmid]);
                }
                i++;
            });
        } else {
            if(mp.players.exists(player)) player.call("client:bank:openMenu", ["none"]);
        }        
    });
});

mp.events.add("server:bank:abheben", (player, id,atmid) => {
    if (mp.players.exists(player)) player.setVariable("bankid",id);
    if (mp.players.exists(player)) player.setVariable("atmid",atmid);
  });

mp.events.add("server:bank:kontostand", (player, id) => {
    console.log(id);
    gm.mysql.handle.query("SELECT * FROM bank_konten WHERE id = ? AND ownerId = ?",[id, player.data.charId], function(err, res) {
        if (err) console.log("Error in Select Bank konten: "+err);
        if (res.length > 0) {
            player.notify("Aktueller Kontostand: "+res[0].amount);
        } else {
            player.notify("~r~Dieses Konto gehört dir nicht!");
        }
    });
});

mp.events.add("inputValueShop", (player, trigger, output, text) => {
    if(mp.players.exists(player)) {
      if(trigger === "moneyeinzahlen") {      
          var id = player.getVariable("bankid");  
          var atmid = player.getVariable("atmid");
          console.log("ATM: "+atmid);
        gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?", [player.data.charId], function(err,res) {
            if(err) console.log("Error in Select Characters: "+err);
            gm.mysql.handle.query("SELECT * FROM atms WHERE id = ?",[atmid],function(err4,res4) {
                if (err4) console.log("Error in Select ATM: "+err4);
                res.forEach(function(bar) {
                    if ((output*1) > (bar.money*1)) {
                        player.notify("~r~Du hast nicht genug Bargeld dabei!");
                    } else {                       
                        gm.mysql.handle.query("SELECT * FROM bank_konten WHERE id = ? AND ownerId = ?", [id, player.data.charId], function (err3,res3) {
                            if (err3) console.log("Error in Select bank Konten: "+err3);
                            res3.forEach(function(bank) {
                                var newAm = parseFloat(parseFloat(bank.amount) + parseFloat(output));
                                var newMoney = parseFloat( parseFloat(bar.money*1).toFixed(2) - parseFloat(output*1).toFixed(2) ).toFixed(2);
                                gm.mysql.handle.query("UPDATE bank_konten SET amount = ? WHERE id = ?", [newAm, id], function(err1,res1) {
                                    if(err) console.log("Error in Update Bank Konten: "+err);                            
                                    gm.mysql.handle.query("UPDATE characters SET money = ? WHERE id = ?", [newMoney, player.data.charId], function(err2,res2) {
                                        if(err2) console.log("Error in update Charactersmoney: "+err2);                                        
                                        var newAtmAM = parseFloat(parseFloat(res4[0].money) + parseFloat(output));
                                        gm.mysql.handle.query("UPDATE atms SET money = ? WHERE id = ?",[newAtmAM,atmid],function(err5,res5) {
                                            if (err5) console.log("Error in Select ATM: "+err5);   
                                            player.data.money = newMoney;                                         
                                        });
                                    });
                                });
                            });
                        });                         
                    }
                });
            });
        });
      }
    }
});

mp.events.add("inputValueShop", (player, trigger, output, text) => {
    if(mp.players.exists(player)) {
      if(trigger === "moneyabheben") {      
          var id = player.getVariable("bankid");  
          var atmid = player.getVariable("atmid");
          console.log("ATM: "+atmid);
            gm.mysql.handle.query("SELECT * FROM bank_konten WHERE id = ?", [id], function(err,res) {
                if(err) console.log("Error in Select Characters: "+err);
                gm.mysql.handle.query("SELECT * FROM atms WHERE id = ?",[atmid],function(err4,res4) {
                    if (err4) console.log("Error in Select ATM: "+err4);
                res.forEach(function(bank) {
                    if ((output*1) > (bank.amount*1)) {
                        player.notify("~r~Du hast nicht genügend Geld auf dem Konto!");
                    } else {
                        if (output*1 > (res4[0].money*1)) {
                            player.notify("~r~Der ATM hat nicht genügend Geld");
                        } else {                        
                            gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?", [player.data.charId], function (err3,res3) {
                                if (err3) console.log("Error in Select bank Konten: "+err3);
                                res3.forEach(function(bar) {
                                    var newAm = parseFloat(parseFloat(bar.money) + parseFloat(output));
                                    var newBank = parseFloat( parseFloat(bank.amount*1).toFixed(2) - parseFloat(output*1).toFixed(2) ).toFixed(2);
                                    gm.mysql.handle.query("UPDATE bank_konten SET amount = ? WHERE id = ?", [newBank, id], function(err1,res1) {
                                        if(err) console.log("Error in Update Bank Konten: "+err);                            
                                        gm.mysql.handle.query("UPDATE characters SET money = ? WHERE id = ?", [newAm, player.data.charId], function(err2,res2) {
                                            if(err2) console.log("Error in update Charactersmoney: "+err2);
                                            var newAtmAM = parseFloat( parseFloat(res4[0].money*1).toFixed(2) - parseFloat(output*1).toFixed(2) ).toFixed(2); 
                                            gm.mysql.handle.query("UPDATE atms SET money = ? WHERE id = ?",[newAtmAM,atmid],function(err5,res5) {
                                                if (err5) console.log("Error in Select ATM: "+err5);   
                                                player.data.money = newAm;                                        
                                            });
                                        });
                                    });
                                });
                            }); 
                        }
                    }
                });
            });
          });
      }
    }
});

mp.events.add("server:bank:addKonto", (player) => {
    gm.mysql.handle.query("SELECT id FROM bank_konten WHERE ownerId = ?", [player.data.charId], function (err, res) {
        if (err) console.log(err);
        kontonummer = "" + Math.floor(Math.random() * 9999999999);
        if (!res.length > 0) {
            gm.mysql.handle.query("INSERT INTO bank_konten (id , ownerId , amount, kontonummer, beschreibung) VALUES ('' , ? , '50', ?, ?)", [player.data.charId, kontonummer, player.data.ingameName], function (err2, res2) {                    
                if (err2) console.log(err2);
                player.notify("~g~Du hast dir ein Konto erstellt!");
            });
        } else {
            player.notify("~r~Du besitzt ein Konto!");
        }
    });
});


mp.events.add("inputValueShop", (player, trigger, output) => {
    if(trigger === "giveMoneyToTarget"){
        getNearestPlayer(player, 2);
        if (currentTarget !== null) {
            if (parseFloat(player.data.money) > parseFloat(output)) {
                var playerMoney = parseFloat(player.data.money);
                var targetMoney = parseFloat(currentTarget.data.money);
                player.playAnimation('mp_common', 'givetake2_a', 1, 49);
                setTimeout(_ => {
                  if (mp.players.exists(player)) player.stopAnimation();
                }, 2500);

                var playerMoney = parseFloat(playerMoney - output);
                var targetMoney = parseFloat(parseFloat(targetMoney) + parseFloat(output));

                currentTarget.data.money = targetMoney;
                player.data.money = playerMoney;

                gm.mysql.handle.query("UPDATE `characters` SET money = ? WHERE id = ?",[playerMoney,player.data.charId], function(errPlayer, resPlayer) {
                  if (errPlayer) console.log("Error in Player give Money for Player: "+errPlayer);
                });

                gm.mysql.handle.query("UPDATE `characters` SET money = ? WHERE id = ?",[targetMoney,currentTarget.data.charId], function(errPlayer, resPlayer) {
                  if (errPlayer) console.log("Error in Player give Money for Target: "+errPlayer);
                });
            } else {
                player.notify("Du hast nicht genug Bargeld dabei!");
            }
        }
    }
});

mp.events.add("server:bank:ausrauben",(player,atmid) => {     
    if (mp.players.exists(player)) {
        gm.mysql.handle.query("SELECT COUNT(id) AS counter FROM characters WHERE isOnline = '1' AND faction = 'LSPD' AND duty = '1'", function (err, res) {
            if (err) console.log("Error in Count Duty Officers: "+err);
            if (res[0].counter >= 1) {               
                player.playAnimation('oddjobs@taxi@gyn@', 'idle_b_ped', 1, 33);      
                time = 120000
                setTimeout(_ => {
                    if (mp.players.exists(player)) player.stopAnimation();
                    gm.mysql.handle.query("SELECT * FROM atms WHERE id = ?",[atmid],function(err3,res3) {
                        if (err3) console.log("Error in Select ATM Rob: "+err3);
                        var robMoney = res3[0].money;
                        var newAm = parseFloat(parseFloat(player.data.money) + parseFloat(robMoney));
                        gm.mysql.handle.query("UPDATE characters SET money = ? WHERE id = ?", [newAm,player.data.charId], function(err,res) {
                            if (err) console.log("Error in Update money: "+err);
                            player.notify("~g~Du hast ausgeraubt: "+robMoney);                             
                            gm.mysql.handle.query("UPDATE atms SET money = '0', usable = '1' WHERE id = ?",[atmid],function(err1,res1) {
                                if (err1) console.log("Error in Update Rob ATM: "+err1);
                                player.data.money = newAm;
                            });
                        });
                    });
                        
                }, 120000);
            } else {
                player.notify("~r~Es sind nicht genügend Cops im Dienst");
            }
        });     
    }    
});

function getNearestPlayer(player, range) {
    let dist = range;
    mp.players.forEachInRange(player.position, range, (_player) => {
        if(player != _player) {
            let _dist = _player.dist(player.position);
            if(_dist < dist) {
                currentTarget = _player;
                dist = _dist;
            }
        }
    });
}

