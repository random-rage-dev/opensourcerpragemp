
mp.events.add("server:inventory:prepareMenu", (player) => {
    if (mp.players.exists(player)) {
        gm.mysql.handle.query("SELECT u.*, i.itemName, i.usable, i.itemcount FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [player.data.charId], function(err, res) {
            if (err) console.log("Error in get Inventory Query: " + err);
            else {
                if (res.length > 0) {
                    var i = 1;
                    var weight = 0.00;
                    var inv = {};
                    res.forEach(function(item) {
                        if (i == res.length) {
                            inv["" + item.id] = item;
                            weight = parseFloat(parseFloat(weight) + (parseInt(item.amount) * parseFloat(item.itemcount))).toFixed(2);
                            if (mp.players.exists(player)) {
                                player.call("client:inventory:showInventory", [JSON.stringify(inv), weight]);
                            }
                        } else {
                            inv["" + item.id] = item;
                            weight = parseFloat(parseFloat(weight) + (parseInt(item.amount) * parseFloat(item.itemcount))).toFixed(2);
                        }
                        i = parseInt(parseInt(i) + 1);
                    });
                } else {
                    player.notify("Du hast keine Gegenstände dabei.");
                }
            }
        });
    }
});

mp.events.add("server:inventory:openItemSubmenu", (player, itemId) => {
    if (mp.players.exists(player)) {
        gm.mysql.handle.query("SELECT u.*, i.itemName, i.usable, i.itemcount FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ? AND u.id = ?", [player.data.charId, itemId], function(err, res) {
            if (err) console.log("Error in openItemSubmenu Query: " + err);
            else {
                if (res.length > 0) {
                    res.forEach(function(item) {
                        if (mp.players.exists(player)) {
                            player.call("client:inventory:openItemSubmenu", [JSON.stringify(item)]);
                        }
                    });
                }
            }
        })
    }
});

mp.events.add("server:inventory:setDestroyItem", (player, itemId) => {
    if (mp.players.exists(player)) player.setVariable("destroyItemId", itemId);
});
mp.events.add("server:inventory:setGiveItem", (player, itemId) => {
    if (mp.players.exists(player)) player.setVariable("giveItemId", itemId);
});

mp.events.add("inputValueShop", (player, trigger, output) => {
    if (mp.players.exists(player)) {
        if (trigger === "DestroyItem") {
            var itemId = player.getVariable("destroyItemId");

            gm.mysql.handle.query("SELECT id, amount FROM user_items WHERE id = ? AND charId = ?", [itemId, player.data.charId], function(err, res) {
                if (err) console.log("Error in Get Destroy Item Query: " + err);
                else {
                    if (res.length > 0) {
                        res.forEach(function(item) {
                            if (parseInt(item.amount) >= parseInt(output)) {
                                if (output > 0) {
                                    if (parseInt(item.amount) == parseInt(output)) {
                                        gm.mysql.handle.query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemId, player.data.charId], function(err2, res2) {
                                            if (err2) console.log("Error in Destroy Item Query: " + err2);
                                            else {
                                                player.notify("Du hast den Gegenstand weggeworfen.");
                                                mp.events.call("server:inventory:prepareMenu", player);
                                            }
                                        });
                                    } else {
                                        var newAmount = parseInt(parseInt(item.amount) - parseInt(output));
                                        gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE id = ?", [newAmount, itemId], function(err3, res3) {
                                            if (err3) console.log("Error in Destroy Item Query 3: " + err3);
                                            else {
                                                player.notify("Du hast den Gegenstand weggeworfen.");
                                                mp.events.call("server:inventory:prepareMenu", player);
                                            }
                                        });
                                    }
                                } else {
                                    player.notify("Du kannst nicht weniger als 1 Wegwerfen.");
                                }
                            } else {
                                player.notify("So viel hast du nicht von diesem Gegenstand!");
                            }
                        });
                    } else {
                        player.notify("Du besitzt diesen Gegenstand nicht.");
                    }
                }
            });
        }
        if (trigger === "GiveItem") {
            var itemId = player.getVariable("giveItemId");
            gm.mysql.handle.query("SELECT u.id, u.amount, u.itemId, i.itemcount FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.id = ? AND u.charId = ?", [itemId, player.data.charId], function(err, res) {
                if (err) console.log("Error in Get Give Item Query: " + err);
                else {
                    console.log("test: "+res);
                    if (res.length > 0) {
                        res.forEach(function(item) {
                            getNearestPlayer(player, 2);
                            if (currentTarget !== null) {
                                if (parseInt(output) > 0 && parseInt(item.amount) == parseInt(output)) {
                                    // ITEMCOUNT == GIVEAMOUNT
                                    itemweight = parseFloat(parseInt(output) * parseFloat(item.itemcount)).toFixed(2);
                                    gm.mysql.handle.query("SELECT SUM(u.amount * i.itemcount) AS weight FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [currentTarget.data.charId], function(err2, res2) {
                                        if (err2) console.log("Error in Get Give Item target weight Query: " + err2);
                                        else {
                                            if (res2.length > 0) {
                                                res2.forEach(function(targetWeight) {
                                                    if (targetWeight.weight !== null) {
                                                        if (parseFloat(parseFloat(targetWeight.weight).toFixed(2) + parseFloat(itemweight).toFixed(2)) <= parseFloat(currentTarget.data.inventory)) {
                                                            gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = ?", [currentTarget.data.charId, item.itemId], function(err4, res4) {
                                                                if (err4) console.log("Error in select existing item on give item query: " + err4);
                                                                else {
                                                                    if (res4.length > 0) {
                                                                        res4.forEach(function(existingItem) {
                                                                            var existingItemCount = existingItem.amount;
                                                                            var newItemCount = parseInt(parseInt(existingItemCount) + parseInt(output));

                                                                            gm.mysql.handle.query("DELETE FROM user_items WHERE charId = ? AND id = ?", [player.data.charId, itemId], function(err5, res5) {
                                                                                if (err5) console.log("Error in give item query 5: " + err5);
                                                                            });

                                                                            gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE charId = ? AND id = ?", [newItemCount, currentTarget.data.charId, existingItem.id], function(err6, res6) {
                                                                                if (err6) console.log("Error in give item Query 6: " + err6);
                                                                            });

                                                                            player.notify("Du hast den Gegenstand übergeben.");
                                                                            currentTarget.notify("Dir wurde etwas übergeben.");
                                                                            mp.events.call("server:inventory:prepareMenu", player);
                                                                        });
                                                                    } else {
                                                                        gm.mysql.handle.query("UPDATE user_items SET charId = ? WHERE id = ? AND charId = ?", [currentTarget.data.charId, itemId, player.data.charId], function(err3, res3) {
                                                                            if (err3) console.log("Error in Give Item update Query: " + err3);
                                                                            else {
                                                                                player.notify("Du hast den Gegenstand übergeben.");
                                                                                currentTarget.notify("Dir wurde etwas übergeben.");
                                                                                mp.events.call("server:inventory:prepareMenu", player);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            player.notify("Dein Gegenüber kann nicht so viel tragen.");
                                                        }
                                                    } else {
                                                        gm.mysql.handle.query("UPDATE user_items SET charId = ? WHERE id = ? AND charId = ?", [currentTarget.data.charId, itemId, player.data.charId], function(err3, res3) {
                                                            if (err3) console.log("Error in Give Item update Query: " + err3);
                                                            else {
                                                                player.notify("Du hast den Gegenstand übergeben.");
                                                                currentTarget.notify("Dir wurde etwas übergeben.");
                                                                mp.events.call("server:inventory:prepareMenu", player);
                                                            }
                                                        });
                                                    }
                                                });
                                            } else {
                                                gm.mysql.handle.query("UPDATE user_items SET charId = ? WHERE id = ? AND charId = ?", [currentTarget.data.charId, itemId, player.data.charId], function(err3, res3) {
                                                    if (err3) console.log("Error in Give Item update Query: " + err3);
                                                    else {
                                                        player.notify("Du hast den Gegenstand übergeben.");
                                                        currentTarget.notify("Dir wurde etwas übergeben.");
                                                        mp.events.call("server:inventory:prepareMenu", player);
                                                    }
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    if (parseInt(output) < parseInt(item.amount) && parseInt(output) > 0) {
                                        // USER GIVES LESS THAN HE HAS
                                        var newGiveUserAmount = parseInt(parseInt(item.amount) - parseInt(output));
                                        itemweight = parseFloat(parseInt(output) * parseFloat(item.itemcount)).toFixed(2);

                                        gm.mysql.handle.query("SELECT SUM(u.amount * i.itemcount) AS weight FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [currentTarget.data.charId], function(err2, res2) {
                                            if (err2) console.log("Error in Get Give Item target weight Query: " + err2);
                                            else {
                                                if (res2.length > 0) {
                                                    res2.forEach(function(targetWeight) {
                                                        if (targetWeight.weight !== null) {
                                                            if (parseFloat(parseFloat(targetWeight.weight).toFixed(2) + parseFloat(itemweight).toFixed(2)) <= parseFloat(currentTarget.data.inventory)) {
                                                                gm.mysql.handle.query("SELECT * FROM user_items WHERE charId = ? AND itemId = ?", [currentTarget.data.charId, item.itemId], function(err4, res4) {
                                                                    if (err4) console.log("Error in select existing item on give item query: " + err4);
                                                                    else {
                                                                        if (res4.length > 0) {
                                                                            res4.forEach(function(existingItem) {
                                                                                var existingItemCount = existingItem.amount;
                                                                                var newItemCount = parseInt(parseInt(existingItemCount) + parseInt(output));

                                                                                gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE charId = ? AND id = ?", [newGiveUserAmount, player.data.charId, itemId], function(err5, res5) {
                                                                                    if (err5) console.log("Error in give Item Query 5: " + err5);
                                                                                });

                                                                                gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE charId = ? AND id = ?", [newItemCount, currentTarget.data.charId, existingItem.id], function(err6, res6) {
                                                                                    if (err6) console.log("Error in give item Query 6: " + err6);
                                                                                });

                                                                                player.notify("Du hast den Gegenstand übergeben.");
                                                                                currentTarget.notify("Dir wurde etwas übergeben.");
                                                                                mp.events.call("server:inventory:prepareMenu", player);
                                                                            });
                                                                        } else {
                                                                            var newGivenUserAmount = output;
                                                                            gm.mysql.handle.query("INSERT INTO user_items (id,charId,itemId,amount) VALUES('',?,?,?)", [currentTarget.data.charId, item.itemId, newGivenUserAmount], function(err3, res3) {
                                                                                if (err3) console.log("Error in Give Item q3: " + err3);
                                                                                else {
                                                                                    var newGiveUserAmount = parseInt(parseInt(item.amount) - parseInt(output));
                                                                                    gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE charId = ? AND itemId = ?", [newGiveUserAmount, player.data.charId, item.itemId], function(err4, res4) {
                                                                                        if (err4) console.log("Error in Give Item q4: " + err4);
                                                                                        else {
                                                                                            player.notify("Du hast den Gegenstand übergeben.");
                                                                                            currentTarget.notify("Dir wurde etwas übergeben.");
                                                                                            mp.events.call("server:inventory:prepareMenu", player);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            } else {
                                                                player.notify("Dein Gegenüber kann nicht so viel tragen.");
                                                            }
                                                        } else {
                                                            var newGivenUserAmount = output;
                                                            gm.mysql.handle.query("INSERT INTO user_items (id,charId,itemId,amount) VALUES('',?,?,?)", [currentTarget.data.charId, item.itemId, newGivenUserAmount], function(err3, res3) {
                                                                if (err3) console.log("Error in Give Item q3: " + err3);
                                                                else {
                                                                    var newGiveUserAmount = parseInt(parseInt(item.amount) - parseInt(output));
                                                                    gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE charId = ? AND itemId = ?", [newGiveUserAmount, player.data.charId, item.itemId], function(err4, res4) {
                                                                        if (err4) console.log("Error in Give Item q4: " + err4);
                                                                        else {
                                                                            player.notify("Du hast den Gegenstand übergeben.");
                                                                            currentTarget.notify("Dir wurde etwas übergeben.");
                                                                            mp.events.call("server:inventory:prepareMenu", player);
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                } else {
                                                    gm.mysql.handle.query("UPDATE user_items SET charId = ? WHERE id = ? AND charId = ?", [currentTarget.data.charId, itemId, player.data.charId], function(err3, res3) {
                                                        if (err3) console.log("Error in Give Item update Query: " + err3);
                                                        else {
                                                            player.notify("Du hast den Gegenstand übergeben.");
                                                            currentTarget.notify("Dir wurde etwas übergeben.");
                                                            mp.events.call("server:inventory:prepareMenu", player);
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    } else {
                                        player.notify("So viele davon hast du nicht!");
                                    }
                                }
                            } else {
                                player.notify("Es ist keiner in deiner Nähe!");
                            }
                        });
                    } else {
                        player.notify("Du besitzt diesen Gegenstand nicht.");
                    }
                }
            });
        }
    }
});


mp.events.add("server:inventory:useItem", (player, itemId) => {
    if (mp.players.exists(player)) {
        gm.mysql.handle.query("SELECT u.id, u.amount, u.itemId, i.type, i.itemcount, i.fillvalue FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.id = ? AND u.charId = ?", [itemId,player.data.charId], function(err, res) {
            if (err) console.log("Error in useItem Query 1: " + err);
            else {
                if (res.length > 0) {
                    res.forEach(function(itemData) {
                        var countDownItem = false;
                        if (itemData.type == "weapon") {
                             if (parseInt(itemData.itemId) == 192) {
                                // Taschenlampe wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x8BB05FD7, 0);
                                gm.mysql.handle.query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [193, itemId, player.data.charId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Taschenlampe ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 193) {
                                if (mp.players.exists(player)) player.removeWeapon(0x8BB05FD7, 0);
                                gm.mysql.handle.query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [192, itemId, player.data.charId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Taschenlampe ~g~eingepackt");
                                    }
                                });
                            } 
                            if (parseInt(itemData.itemId) == 194) {
                                // Schlagstock wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x678B81B1, 0);
                                gm.mysql.handle.query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [195, itemId, player.data.charId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Schlagstock ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 195) {
                                if (mp.players.exists(player)) player.removeWeapon(0x678B81B1, 0);
                                gm.mysql.handle.query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [194, itemId, player.data.charId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Schlagstock ~g~eingepackt");
                                    }
                                });
                            }
                            if (parseInt(itemData.itemId) == 196) {
                                // Tazer wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x3656C8C1, 0);
                                gm.mysql.handle.query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [197, itemId, player.data.charId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Tazer ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 197) {
                                if (mp.players.exists(player)) player.removeWeapon(0x3656C8C1, 0);
                                gm.mysql.handle.query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [196, itemId, player.data.charId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Tazer ~g~eingepackt");
                                    }
                                });
                            }
                            if (parseInt(itemData.itemId) == 198) {
                                // Pistole.50 wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x99AEEB3B, 80);
                                gm.mysql.handle.query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [199, itemId, player.data.charId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Pistole .50 ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 199) {
                                if (mp.players.exists(player)) player.removeWeapon(0x99AEEB3B, 80);
                                gm.mysql.handle.query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [198, itemId, player.data.charId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~Pitole .50 ~g~eingepackt");
                                    }
                                });
                            }
                            if (parseInt(itemData.itemId) == 200) {
                                // AP Pistole wird ausgepackt
                                if (mp.players.exists(player)) player.giveWeapon(0x22D8FE39, 80);
                                gm.mysql.handle.query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [201, itemId, player.data.charId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 100: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~AP Pistole ~g~ausgepackt");
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 201) {
                                if (mp.players.exists(player)) player.removeWeapon(0x22D8FE39, 80);
                                gm.mysql.handle.query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [200, itemId, player.data.charId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Waffe on use item 101: " + err2);
                                    else {
                                        if (mp.players.exists(player)) player.notify("~w~AP Pistole ~g~eingepackt");
                                    }
                                });
                            }
                        } else if (itemData.type == "armor") {
                            if (parseInt(itemData.itemId) == 192) {
                                // Weste wird ausgepackt
                                if (itemData.amount > 1) {
                                    var newCount = parseInt(parseInt(itemData.amount) - 1);
                                    gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.charId], function(err3, res3) {
                                        if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                        if (mp.players.exists(player)) {
                                            player.notify("~w~Weste ~g~angezogen");
                                            player.armour = 100;
                                            player.setClothes(9, 12, 1, 2);
                                        }
                                    });
                                } else {
                                    gm.mysql.handle.query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.charId], function(err2, res2) {
                                        if (err2) console.log("Error in Remove Item after use query: " + err2);
                                        if (mp.players.exists(player)) {
                                            player.notify("~w~Weste ~g~angezogen");
                                            player.armour = 100;
                                            player.setClothes(9, 12, 1, 2);
                                        }
                                    });
                                }
                            }
                        } else if (itemData.type == "bag") {
                            // USE ITEM IST TASCHE
                            if (parseInt(itemData.itemId) == 3) {
                                // Tasche wird ausgepackt
                                player.data.inventory = 30;
                                gm.mysql.handle.query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [4, itemId, player.data.charId], function(err2, res2) {
                                    if (err2) console.log("Error in Update Tasche on use item 34: " + err2);
                                    else {
                                        if (mp.players.exists(player)) {
                                            player.notify("~w~Tasche ~g~ausgepackt");
                                            player.setClothes(5, 45, 0, 0);
                                            player.data.inventory = 30;
                                        }
                                    }
                                });
                            } else if (parseInt(itemData.itemId) == 4) {
                                // Tasche wird eingepackt
                                gm.mysql.handle.query("SELECT SUM(u.amount * i.itemcount) AS weight FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?", [player.data.charId], function(err2, res2) {
                                    if (err2) console.log("Error in Select Weight on use item 63: " + err2);
                                    else {
                                        if (res2.length > 0) {
                                            res2.forEach(function(weight) {
                                                if (parseFloat(weight.weight) <= parseFloat(9)) {
                                                    gm.mysql.handle.query("UPDATE user_items SET itemId = ? WHERE id = ? AND charId = ?", [3, itemId, player.data.charId], function(err2, res2) {
                                                        if (err2) console.log("Error in Update Tasche on use item 63: " + err2);
                                                        else {
                                                            if (mp.players.exists(player)) {
                                                                player.notify("~w~Tasche ~g~eingepackt");
                                                                player.setClothes(5, 0, 0, 0);
                                                                player.data.inventory = 10;
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    player.notify("Du hast noch zu viel bei dir!");
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        } else if (itemData.type == "drink") {
                                console.log("Fill: "+itemData.fillvalue)
                                console.log("Voher: "+player.data.drink+parseInt(itemData.fillvalue));
                                player.data.drink = parseInt(parseInt(player.data.drink) + parseInt(itemData.fillvalue));
                                console.log("Nacher: "+player.data.drink);
                                player.playAnimation("amb@world_human_drinking@beer@male@idle_a","idle_c",1,49);
                                var countDownItem = true;
                            setTimeout(_ => {
                                try {
                                    if (mp.players.exists(player) && !player.vehicle) {
                                        player.stopAnimation();
                                    }
                                } catch (e) {
                                    console.log("ERROR - Inventory/index.js - useItem Timeout: " + e);
                                }
                            }, 5000);
                        } else if (itemData.type == "food") { 
                                player.data.food = parseInt(parseInt(player.data.food) + parseInt(itemData.fillvalue));
                                player.playAnimation("amb@code_human_wander_eating_donut@male@idle_a","idle_c",1,49);
                                var countDownItem = true;
                                setTimeout(_ => {
                                    try {
                                        if (mp.players.exists(player) && !player.vehicle) {
                                            player.stopAnimation();
                                        }
                                    } catch (e) {
                                        console.log("ERROR - Inventory/index.js - useFood: " + e);
                                    }
                                }, 5000);
                        }
                        if (mp.players.exists(player)) {
                            var health = parseInt(player.health);
                            if (player.data.food == 100 || player.data.food > 100) {
                               player.data.food = 100;
                            }
                            if (player.data.drink == 100 || player.data.drink > 100) {
                                player.data.drink = 100;
                             }
                            var food = parseInt(player.data.food);
                            var drink = parseInt(player.data.drink);
                            var inventory = parseInt(player.data.inventory);
                            player.call("changeValue", ['food', player.data.food]);
                            player.call("changeValue", ['drink', player.data.drink]);  
                            gm.mysql.handle.query("UPDATE `characters` SET health = ?, food = ?, drink = ? WHERE id = ?", [health, food, drink, player.data.charId], function(errUp, resUp) {
                                if (errUp) console.log("Error in Update User after use item: " + errUp);
                            });

                            if (countDownItem == true) {
                                if (itemData.amount > 1) {
                                    var newCount = parseInt(parseInt(itemData.amount) - 1);
                                    gm.mysql.handle.query("UPDATE user_items SET amount = ? WHERE id = ? AND charId = ?", [newCount, itemData.id, player.data.charId], function(err3, res3) {
                                        if (err3) console.log("Error in Countdown Item after use query: " + err3);
                                    });
                                } else {
                                    gm.mysql.handle.query("DELETE FROM user_items WHERE id = ? AND charId = ?", [itemData.id, player.data.charId], function(err2, res2) {
                                        if (err2) console.log("Error in Remove Item after use query: " + err2);
                                    });
                                }
                            }
                        }
                    });
                }
            }
        });
    }
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