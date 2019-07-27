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
let selectedNumPlate = null;

const ScreenRes = mp.game.graphics.getScreenResolution(0,0);
const MenuPoint = new Point(ScreenRes.x +150, 50);

// Hauptmenu
const ui_vehKeys_main = new Menu("Schlüsseldienst", "to key or not to key.", MenuPoint);
ui_vehKeys_main.Visible = false;
ui_vehKeys_main.AddItem(new UIMenuItem("Schlüssel nachmachen", ""));

ui_vehKeys_main.ItemSelect.on((item, index, value) => {
    if (item.Text == 'Schlüssel nachmachen') {
        mp.events.callRemote("server:vehKeys:openKeyCopy");
        ui_vehKeys_main.Close();
    }
});

mp.events.add("client:vehKeys:openMainMenu", () => {
    if (!ui_vehKeys_main.Visible) ui_vehKeys_main.Open();
});

function drawMenu(vehJSON){
  // Menu für Fahrzeugliste anlegen
  ui_List = new Menu("Schlüssel", "Liste aller Schlüssel", MenuPoint);
  ui_List.Visible = true;
  if (vehJSON != "none"){
    vehList = JSON.parse(vehJSON);
    vehList.forEach(keys => {
        let newItem = new UIMenuItem("" + keys.kennzeichen, ""+keys.id);
        ui_List.AddItem(newItem);
        newItem.SetRightLabel(""+" x"+keys.amount);
    });
  } else{
    ui_List.AddItem( new UIMenuItem("Du besitzt keine Schlüssel!", ""));
  }

  // Auswertung Menuauswahl ausparken
  ui_List.ItemSelect.on((item, index) => {
      selectedNumPlate = item.Text;
      mp.events.call("client:VehKeys:subMenu", item.Description);
      ui_List.Close();
  });
}
mp.events.add("client:VehKeys:drawMenu", drawMenu);

// SUBMENU
mp.events.add("client:VehKeys:subMenu", (selectedDescription) => {
    const ui_keysubmenu = new Menu("Fahrzeugschlüssel", ""+selectedDescription, MenuPoint);
    ui_keysubmenu.AddItem( new UIMenuItem("Fahrzeugschlüssel geben", ""));
    ui_keysubmenu.AddItem( new UIMenuItem("Fahrzeugschlüssel wegwerfen", ""));
    ui_keysubmenu.AddItem( new UIMenuItem("Schließen", ""));
    ui_keysubmenu.Visible = true;

    ui_keysubmenu.ItemSelect.on((item, index, value) => {
      let nearestPlayers = [];
      mp.players.forEachInRange(mp.players.local.position, 2, (nearPlayer) => {
          nearestPlayers.push(nearPlayer);
      });

     if (item.Text == "Fahrzeugschlüssel geben") {
        if(!nearestPlayers[1]){
          mp.game.graphics.notify("Keiner in der nähe");
          return;
        } else {
          mp.events.callRemote("server:vehKeys:giveKey", selectedDescription);
        }
      } else if (item.Text == "Fahrzeugschlüssel wegwerfen") {
          mp.events.callRemote("server:vehKeys:deleteKey",selectedDescription);
          ui_keysubmenu.Close();
      } else if (item.Text == "Schließen") {
        ui_keysubmenu.Close();
      }
    });
  });

  function drawKeyCopy(vehJSON){
  // Menu für Fahrzeugliste anlegen
  ui_keycopy = new Menu("Schlüsseldienst", "Liste aller Schlüssel", MenuPoint);
  ui_keycopy.Visible = true;
  if (vehJSON != "none"){
    keyCopy = JSON.parse(vehJSON);
    keyCopy.forEach(keys => {
        let newItem = new UIMenuItem("" + keys.kennzeichen, ""+keys.id,"x");
        ui_keycopy.AddItem(newItem);
        newItem.SetRightLabel("" + [String(keys.bezeichnung)]);
    });
  } else{
    ui_keycopy.AddItem( new UIMenuItem("Du besitzt keine Schlüssel!", ""));
  }

  // Auswertung Menuauswahl ausparken
  ui_keycopy.ItemSelect.on((item, index) => {
      selectedNumPlate = item.Text;
      mp.events.call("client:VehKeys:subKeyCopy", item.Description);
      ui_keycopy.Close();
  });
}
mp.events.add("client:VehKeys:openKeyCopy", drawKeyCopy);

// SUBMENU
mp.events.add("client:VehKeys:subKeyCopy", (selectedDescription) => {
    const ui_keycopymenu = new Menu("Fahrzeugschlüssel", ""+selectedDescription, MenuPoint);
    ui_keycopymenu.AddItem( new UIMenuItem("Fahrzeugschlüssel nachmachen", ""));
    ui_keycopymenu.AddItem( new UIMenuItem("Schließen", ""));
    ui_keycopymenu.Visible = true;

    ui_keycopymenu.ItemSelect.on((item, index, value) => {

     if (item.Text == "Fahrzeugschlüssel nachmachen") {
          mp.events.callRemote("server:vehKeys:copyKey",selectedDescription);
          ui_keycopymenu.Close();
      } else if (item.Text == "Schließen") {
        ui_keycopymenu.Close();
      }
    });
  });
