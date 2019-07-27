const NativeUI = require("nativeui");
const UIMenu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

// https://wiki.rage.mp/index.php?title=Clothes
const categoryTitles = {
    clothes: {
        1: "Masks",
        2: "Hair Styles",
        3: "Torsos",
        4: "Legs",
        5: "Bags and Parachutes",
        6: "Shoes",
        7: "Accessories",
        8: "Undershirts",
        9: "Body Armors",
        10: "Decals",
        11: "Tops"
    },

    props: {
        0: "Hats",
        1: "Glasses",
        2: "Ears",
        6: "Watches",
        7: "Bracelets"
    }
};

const localPlayer = mp.players.local;

let mainMenu = null;
let categoryMenus = [];
let clothingData = {};
let currentMenuIdx = -1;
let menuTransition = false; // workaround for ItemSelect event being called twice between menu transitions
let lastClothing = null;

function addClothingItems(type, bannerSprite, key, value) {
    mainMenu.AddItem(new UIMenuItem(categoryTitles[type][key], `${type === "props" ? "Prop category." : "Clothing category."}`));

    // Create category menu
    const categoryMenu = new UIMenu("", categoryTitles[type][key].toUpperCase(), new Point(0, 0), bannerSprite.library, bannerSprite.texture);
    categoryMenu.Visible = false;

    // Fill it
    const itemDescription = (type === "props" ? "Prop item." : "Clothing item.");

    for (const item of value) {
        const tempItem = new UIMenuItem(item.name, itemDescription);
        tempItem.SetRightLabel(`${Number.isInteger(item.price) ? `$${item.price}` : "FREE"}`);

        categoryMenu.AddItem(tempItem);
    }

    categoryMenus.push({
        menu: categoryMenu,
        type: type,
        slotIdx: Number(key)
    });
}

function submenuItemChangeHandler(newIndex) {
    const currentMenu = categoryMenus[currentMenuIdx];
    const currentItem = clothingData[currentMenu.type][currentMenu.slotIdx][newIndex];

    switch (currentMenu.type) {
        case "clothes":
            localPlayer.setComponentVariation(currentMenu.slotIdx, currentItem.drawable, currentItem.texture, 2);
        break;

        case "props":
            if (currentItem.drawable === -1) {
                localPlayer.clearProp(currentMenu.slotIdx);
            } else {
                localPlayer.setPropIndex(currentMenu.slotIdx, currentItem.drawable, currentItem.texture, true);
            }
        break;
    }
}

function resetPreview() {
    if (lastClothing) {
        switch (lastClothing.type) {
            case "clothes":
                localPlayer.setComponentVariation(lastClothing.slotIdx, lastClothing.drawable, lastClothing.texture, 2);
            break;

            case "props":
                if (lastClothing.drawable === -1) {
                    localPlayer.clearProp(lastClothing.slotIdx);
                } else {
                    localPlayer.setPropIndex(lastClothing.slotIdx, lastClothing.drawable, lastClothing.texture, true);
                }
            break;
        }

        lastClothing = null;
    }
}

mp.events.add("clothesMenu:updateData", (bannerSprite, data) => {
    // Default menu banner
    if (bannerSprite == null) {
        bannerSprite = {
            library: "commonmenu",
            texture: "interaction_bgd"
        };
    }

    // Hide the chat
    mp.gui.chat.show(false);

    // Reset some variables
    categoryMenus = [];
    currentMenuIdx = -1;
    menuTransition = false;
    lastClothing = null;

    // Create a new main menu
    mainMenu = new UIMenu("", "SELECT A CATEGORY", new Point(0, 0), bannerSprite.library, bannerSprite.texture);
    mainMenu.Visible = true;

    // Update clothingData
    clothingData = data;

    // Add clothes
    for (const [key, value] of Object.entries(clothingData.clothes)) addClothingItems("clothes", bannerSprite, key, value);

    // Add props
    for (const [key, value] of Object.entries(clothingData.props)) addClothingItems("props", bannerSprite, key, value);

    // Submenu events
    for (const item of categoryMenus) {
        // Preview hovering item
        item.menu.IndexChange.on(submenuItemChangeHandler);

        // Buy hovering item
        item.menu.ItemSelect.on((selectedItem, itemIndex) => {
            if (menuTransition) {
                menuTransition = false;
                return;
            }

            const currentMenu = categoryMenus[currentMenuIdx];
            const currentItem = clothingData[currentMenu.type][currentMenu.slotIdx][itemIndex];
            mp.events.callRemote("buyClothingItem", currentMenu.type, currentMenu.slotIdx, currentItem.texture, currentItem.drawable);
        });

        // Reset preview when player backs out of category menu
        item.menu.MenuClose.on(() => {
            resetPreview();

            currentMenuIdx = -1;
            mainMenu.Visible = true;
        });
    }

    // Main menu events
    mainMenu.ItemSelect.on((selectedItem, itemIndex) => {
        const nextMenu = categoryMenus[itemIndex];
        const slot = Number(nextMenu.slotIdx);

        lastClothing = {
            type: nextMenu.type,
            slotIdx: slot,
            drawable: (nextMenu.type === "props" ? localPlayer.getPropIndex(slot) : localPlayer.getDrawableVariation(slot)),
            texture: (nextMenu.type === "props" ? localPlayer.getPropTextureIndex(slot) : localPlayer.getTextureVariation(slot))
        };

        currentMenuIdx = itemIndex;
        mainMenu.Visible = false;
        nextMenu.menu.Visible = true;
        menuTransition = true;

        submenuItemChangeHandler(nextMenu.menu.CurrentSelection);
    });

    mainMenu.MenuClose.on(() => {
        mp.gui.chat.show(true);

        currentMenuIdx = -1;
        lastClothing = null;
    });
});

mp.events.add("clothesMenu:updateLast", (drawable, texture) => {
    if (lastClothing) {
        lastClothing.drawable = drawable;
        lastClothing.texture = texture;
    }
});

mp.events.add("clothesMenu:close", () => {
    if (currentMenuIdx !== -1) categoryMenus[currentMenuIdx].menu.Close();
    if (mainMenu && mainMenu.Visible) mainMenu.Close();
});