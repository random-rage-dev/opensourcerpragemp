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


let spawnMenu = null;


function drawMenu(charJSON){
  mp.gui.cursor.visible = false;
  // Menu für Fahrzeugliste anlegen
  ui_List = new Menu("Charakter", "Liste aller Charakter", MenuPoint);
  ui_List.Visible = true;
  if (charJSON != "none"){
    charList = JSON.parse(charJSON);
    charList.forEach(char => {
        let newItem = new UIMenuItem(""+char.firstname+" "+char.lastname, ""+char.id);
        ui_List.AddItem(newItem);
    });
  } else{
    ui_List.AddItem(new UIMenuItem("Du besitzt keine Charaktere!", ""));
  }


  ui_List.ItemSelect.on((item, index) => {      
      mp.events.callRemote("server:charchooser:menuclick",item.Description);
      ui_List.Close();
  });
}
let charchooserKamera = null;
let localPlayer = mp.players.local;
mp.events.add("client:characters:selection", (firstname, lastname) =>{
  spawnMenu = new Menu(""+firstname + " " + lastname,"Wähle aus",MenuPoint); 
  spawnMenu.AddItem(new UIMenuItem("Welt betreten",""));
  spawnMenu.AddItem(new UIMenuItem("Anderen Charakter auswählen",""));
  spawnMenu.Visible = true;
  charchooserKamera = mp.cameras.new('default', new mp.Vector3(-794.6556396484375, 332.10400390625, 154.8050079345703), new mp.Vector3(0,0,0), 40);
	charchooserKamera.pointAtCoord(-797.3433227539062, 332.110595703125, 153.8050079345703); 
  charchooserKamera.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
  localPlayer.setInvincible(false);
  mp.game.ui.displayRadar(false);
	localPlayer.setVisible(true, false);
  creatorMainMenu.Visible = false;
  mp.gui.cursor.visible = false;
  localPlayer.freezePosition(true);
  mp.players.local.setAlpha(255);
  spawnMenu.ItemSelect.on((item, index) => {  
    const slot = index;
      mp.events.callRemote("server:characters:selected",slot);


  });

});
mp.events.add("client:characters:destroyMenu", () => {
  spawnMenu.Visible = false;
  charchooserKamera.destroy();
  charchooserKamera = null;
  mp.game.ui.displayRadar(true);
  mp.game.cam.renderScriptCams(false, false, 0, true, false);
	localPlayer.freezePosition(false);
  localPlayer.setInvincible(false);
  mp.game.ui.displayRadar(true);
  creatorMainMenu.Visible = false;
	localPlayer.setVisible(true, false);
	localPlayer.setCollision(true, false);
  mp.game.ui.displayRadar(true);
});
mp.events.add("client:characters:destroySpawnMenu", () => {
  spawnMenu.Visible = false;
});
mp.events.add("client:characters:choosechar", drawMenu);

mp.events.add("client:characters:showCamera", () => {
  charchooserKamera = mp.cameras.new('default', new mp.Vector3(-794.6556396484375, 332.10400390625, 154.8050079345703), new mp.Vector3(0,0,0), 40);
	charchooserKamera.pointAtCoord(-797.3433227539062, 332.110595703125, 153.8050079345703); 
  charchooserKamera.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
  localPlayer.setInvincible(false);
  mp.game.ui.displayRadar(false);
	localPlayer.setVisible(true, false);
  mp.gui.cursor.visible = false;
  localPlayer.freezePosition(true);
  mp.players.local.setAlpha(255);
});
