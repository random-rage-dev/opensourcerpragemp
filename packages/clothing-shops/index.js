const fs = require("fs");
const path = require("path");

const markerRange = 1.75;
const markerColor = [174, 219, 242, 150];

// Would be great if you don't touch this
const allowedModels = {};
allowedModels[ mp.joaat("mp_m_freemode_01") ] = "male";
allowedModels[ mp.joaat("mp_f_freemode_01") ] = "female";

const shopData = {};

function giveClothingToPlayer(player, name, type, slot, drawable, texture) {
    slot = Number(slot);
    drawable = Number(drawable);
    texture = Number(texture);

    switch (type) {
        case "clothes":
            player.setClothes(slot, drawable, texture, 2);
        break;

        case "props":
            player.setProp(slot, drawable, texture);
        break;
    }

    player.call("clothesMenu:updateLast", [drawable, texture]);
    player.notify(`Bought ${name}.`);
}

// Load all clothes
const shopsPath = path.join(__dirname, "shops");
fs.readdir(shopsPath, (error, files) => {
    if (error) {
        console.error(`[CLOTHES] Failed reading clothing data: ${error.message}`);
        return;
    }

    for (const file of files) {
        if (path.extname(file) !== ".json") continue;

        const filePath = path.join(shopsPath, file);
        const fileName = path.basename(filePath, ".json");

        try {
            shopData[fileName] = require(filePath);

            // Create shop entities
            for (const shopPosition of shopData[fileName].shops) {
                const tempColShape = mp.colshapes.newSphere(shopPosition.x, shopPosition.y, shopPosition.z, markerRange * 0.9);
                tempColShape.clothingShopType = fileName;

                mp.labels.new("Clothing Shop\n/buyclothes", new mp.Vector3(shopPosition.x, shopPosition.y, shopPosition.z + 1.0), {
                    los: true,
                    font: 0,
                    drawDistance: markerRange * 2.0
                });

                mp.markers.new(1, shopPosition, markerRange, {
                    visible: true,
                    color: markerColor
                });

                mp.blips.new(73, shopPosition, {
                    name: "Clothing Shop",
                    shortRange: true
                });
            }

            console.log(`[CLOTHES] Loaded ${file}.`);
        } catch (loadingError) {
            console.error(`[CLOTHES] Failed to load ${file}: ${loadingError.message}`);
        }
    }
});

// RAGEMP Events
mp.events.add("playerEnterColshape", (player, shape) => {
    if (shape.clothingShopType && typeof player.clothingShopType !== "string") player.clothingShopType = shape.clothingShopType;
});

mp.events.add("playerExitColshape", (player, shape) => {
    if (shape.clothingShopType && player.clothingShopType) {
        player.clothingShopType = null;
        player.call("clothesMenu:close");
    }
});

// Script Events
mp.events.add("buyClothingItem", (player, type, slot, texture, drawable) => {
   if (type == "clothes") {
    if (slot == 1) {
        player.setClothes(1,drawable,texture,0);
        gm.mysql.handle.query("UPDATE characters SET mask = ?, masktext = ? WHERE id = ?",[drawable,texture,player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Mask: "+err);
            player.notify("~g~Maske wurde gekauft");
        });
    }
   } else {

   }
});

// Commands
mp.events.add("PushE", (player) => {
    if (typeof player.clothingShopType !== "string") {
        player.outputChatBox("You're not in a clothing shop marker.");
        return;
    }

    const key = allowedModels[player.model];
    if (typeof key !== "string") {
        player.outputChatBox("Your model is not allowed to use clothing shops.");
        return;
    }

    const shop = shopData[player.clothingShopType];
    if (typeof shop[key] === "undefined") {
        player.outputChatBox("Your model does not have any clothes available.");
        return;
    }

    player.call("clothesMenu:updateData", [ shop.bannerSprite, shop[key] ]);
});