// Native UI
const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const UIMenuSliderItem = NativeUI.UIMenuSliderItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;
const ListItem = NativeUI.ListItem;
var inputShop = null;

const ScreenRes = mp.game.graphics.getScreenResolution(0,0);
const MenuPoint = new Point(ScreenRes.x +150, 50);

// INVENTORY
mp.events.add("client:inventory:showInventory", (inventory, weight) => {
    const ui_inventory = new Menu("Inventar", "Inventar ("+weight+")kg", MenuPoint);
    var invParsed = JSON.parse(inventory);
    for(var res in invParsed) {
      var newRes = invParsed[""+res];
      ui_inventory.AddItem( new UIMenuItem(""+newRes.itemName+" ("+newRes.amount+"x)", ""+newRes.id));
    }
          ui_inventory.AddItem( new UIMenuItem("Schließen", "Inventar schließen"));
          ui_inventory.Visible = true;
    ui_inventory.ItemSelect.on((item, index, value) => {
      if (item.Text !== "Schließen") {
        mp.events.callRemote("server:inventory:openItemSubmenu",item.Description);
        ui_inventory.Close();
      } else {
        ui_inventory.Close();
      }
    });
    ui_inventory.MenuClose.on(() => {
      ui_inventory.RefreshIndex();
    });
});

// SUBMENU
mp.events.add("client:inventory:openItemSubmenu", (inventory) => {
    res = JSON.parse(inventory);
    const ui_inventorysubmenu = new Menu("Inventar", res.amount+"x "+res.itemName, MenuPoint);
    if (res.usable == "Y") {
      ui_inventorysubmenu.AddItem( new UIMenuItem("Benutzen", ""));
    }
    ui_inventorysubmenu.AddItem( new UIMenuItem("Weitergeben", ""));
    ui_inventorysubmenu.AddItem( new UIMenuItem("Wegwerfen", ""));
    ui_inventorysubmenu.AddItem( new UIMenuItem("Schließen", ""));
    ui_inventorysubmenu.Visible = true;

    ui_inventorysubmenu.ItemSelect.on((item, index, value) => {
      let nearestPlayers = [];
      mp.players.forEachInRange(mp.players.local.position, 2, (nearPlayer) => {
          nearestPlayers.push(nearPlayer);
      });

      if (item.Text == "Benutzen") {
        mp.events.callRemote("server:inventory:useItem", res.id);
        ui_inventorysubmenu.Close();
      } else if (item.Text == "Weitergeben") {
        if(!nearestPlayers[1]){
          mp.game.graphics.notify("Keiner in der nähe");
          return;
        } else {
          mp.events.callRemote("server:inventory:setGiveItem", res.id);
          mp.events.call("createInputShop", "GiveItem");
        }
        //mp.events.callRemote("server:inventory:giveItem", res.id);
        ui_inventorysubmenu.Close();
      } else if (item.Text == "Wegwerfen") {
        mp.events.callRemote("server:inventory:setDestroyItem", res.id);
        mp.events.call("createInputShop", "DestroyItem");
        ui_inventorysubmenu.Close();
      } else if (item.Text == "Schließen") {
        ui_inventorysubmenu.Close();
      }
    });
});

mp.events.add("createInputShop",(trigger) => {
    if (browser != null || inputShop != null) return;
    inputShop = mp.browsers.new("package://inputShop/input.html");
    inputShop.execute('setTrigger("' + trigger + '")');
    mp.gui.chat.show(false);
    mp.gui.cursor.show(true, true);
});

mp.events.add("sendInputShop",(trigger,output) => {
  if (inputShop !== null) {
    inputShop.destroy();
    inputShop = null;
  }
  mp.events.callRemote("inputValueShop", trigger, output);
  mp.gui.chat.show(true);
  mp.gui.cursor.show(false, false);
});

mp.events.add("sendInputShop",(trigger) => {
  if (inputShop !== null) {
    inputShop.destroy();
    inputShop = null;
  }
  mp.gui.chat.show(true);
  mp.gui.cursor.show(false, false);
});


