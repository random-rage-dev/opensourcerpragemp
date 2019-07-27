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
var checkHut = true;
var checkBrille = true;
var checkMaske = true;
var checkOberkoerper = true;
var checkHose = true;
var checkSchuhe = true;
var checkAtm = true;
var checkGaragen = false;
var checkJobs = false;
var checkOeffentlich = false;
var checkSecret = false;
var checkAccessoires = true;
let walkingStyles = null;
let currentItem = 0;

const ScreenRes = mp.game.graphics.getScreenResolution(0,0);
const MenuPoint = new Point(ScreenRes.x +150, 50);


mp.events.add("client:playermenu:mainMenu", (admin) => {
   let main = new Menu("Player", "Spielermenü", MenuPoint);
    main.AddItem(new UIMenuItem("Animationen","Animationen"));
    main.AddItem(new UIMenuItem("Inventar","Öffnet dein Inventar"));
    main.AddItem(new UIMenuItem("Portmone","Dein Portmone"));
    main.AddItem(new UIMenuItem("Kleidung","Kleidung an/ausziehen"));
    main.AddItem(new UIMenuItem("Interaktionen","Interaktionen mit anderen Spielern"));
    main.AddItem(new UIMenuItem("Laufstile","Laufstile deines Characters"));
    main.AddItem(new UIMenuItem("Schlüsselverwaltung","Alle Schlüssel die du besitzt"));
    main.AddItem(new UIMenuItem("Einstellungen","Hier kannst du einstellungen ändern"));
    if (admin > 0) {
      main.AddItem(new UIMenuItem("Admin","Abuse mich und ich Fick Dich!"));
    }  
    main.AddItem( new UIMenuItem("Schließen", ""));
    main.Visible = true;

    main.ItemSelect.on((item, index, value) => {
    if (item.Text == "Kleidung") {
      mp.events.callRemote("server:clothes:showKleidung");
      main.Close();
    } else if (item.Text == "Admin") {
      mp.events.callRemote("server:admin:openAdmin",admin);
      main.Close();   
    } else if (item.Text == "Inventar") {
      mp.events.callRemote("server:inventory:prepareMenu");
      main.Close();  
    } else if (item.Text == "Laufstile") {
        mp.events.callRemote("requestWalkingStyles");
        main.Close();  
    } else if (item.Text == "Animationen") {
      mp.events.call("client:playermenu:openAnim");
      main.Close();   
    } else if (item.Text == "Schlüsselverwaltung") {
      mp.events.call("client:playermenu:openKeys");
      main.Close(); 
    } else if (item.Text == "Einstellungen") {
      mp.events.call("client:playermenu:settings");
      main.Close(); 
    } else if (item.Text == "Interaktionen") {
      mp.events.callRemote("server:playermenu:interaction");
      main.Close(); 
    } else if (item.Text == "Schließen") {
      main.Close();
    }
  });
});
function setWalkingStyle(player, style) {
  if (!style) {
      player.resetMovementClipset(0.0);
  } else {
      if (!mp.game.streaming.hasClipSetLoaded(style)) {
          mp.game.streaming.requestClipSet(style);
          while(!mp.game.streaming.hasClipSetLoaded(style)) mp.game.wait(0);
      }

      player.setMovementClipset(style, 0.0);
  }
}

// create menu
let stylesMenu = new Menu("Walking Styles", "", MenuPoint);
stylesMenu.Visible = false;

stylesMenu.ItemSelect.on((item, index) => {
  mp.events.callRemote("setWalkingStyle", index);

  stylesMenu.MenuItems[currentItem].SetRightLabel("");
  item.SetRightLabel("Current");

  currentItem = index;
});

// events
mp.events.add("receiveWalkingStyles", (namesJSON) => {
  walkingStyles = JSON.parse(namesJSON);
  for (let i = 0; i < walkingStyles.length; i++) stylesMenu.AddItem(new UIMenuItem(walkingStyles[i], ""));

  stylesMenu.MenuItems[0].SetRightLabel("Current");
  stylesMenu.Visible = true;
});

mp.events.add("entityStreamIn", (entity) => {
  if (entity.type !== "player") return;
  setWalkingStyle(entity, entity.getVariable("walkingStyle"));
});

mp.events.addDataHandler("walkingStyle", (entity, value) => {
  if (entity.type === "player") setWalkingStyle(entity, value);
});

mp.events.add("client:playermenu:openAnim", () => {
  let ui_anim = new Menu("Animationen", "", MenuPoint);
  ui_anim.AddItem(new UIMenuItem("Shortcut Festlegen","Speicher die Shortcuts"));
  ui_anim.AddItem(new UIMenuItem("Sitzen","Sitzanimationen"));
  ui_anim.AddItem(new UIMenuItem("Stehen","Stehanimationen"));
  ui_anim.AddItem(new UIMenuItem("Tänze","Tanz Animationen"));
  ui_anim.AddItem(new UIMenuItem("Sport","Sportanimationen")); 
  ui_anim.AddItem( new UIMenuItem("Schließen", ""));
  ui_anim.Visible = true;

  ui_anim.ItemSelect.on((item, index, value) => {
    if (item.Text == "Shortcut Festlegen") {
      mp.events.callRemote("server:shortcut:openMenu");
      ui_anim.Close();
    } else if (item.Text == "Sitzen") {
      mp.events.call("client:anim:sitzen");
      ui_anim.Close();    
    } else if (item.Text == "Schließen") {
    ui_anim.Close();
    }
  });
});

mp.events.add("client:playermenu:interaction", (waffena, waffenb, pkw, lkw, pilot, job,ergeben,fesseln) => {
  let ui_interaction = new Menu("Interaktionen", "", MenuPoint);
  ui_interaction.AddItem(new UIMenuItem("Ausweis zeigen",""));
  if (waffena == 1) {
    ui_interaction.AddItem(new UIMenuItem("Waffenschein A zeigen",""));
  }
  if (waffenb == 1) {
    ui_interaction.AddItem(new UIMenuItem("Waffenschein B zeigen",""));
  } 
  if (pkw == 1) {
    ui_interaction.AddItem(new UIMenuItem("PKW Führerschein zeigen","")); 
  }
  if (lkw == 1) {
    ui_interaction.AddItem(new UIMenuItem("LKW Führerschein zeigen","")); 
  }
  if (pilot == 1) {
    ui_interaction.AddItem(new UIMenuItem("Piloten Lizenz zeigen","")); 
  }
  if (job == 1) {
    ui_interaction.AddItem(new UIMenuItem("Job Lizenz zeigen","")); 
  }  
  ui_interaction.AddItem(new UIMenuItem("Geld geben",""));
  if (ergeben == 1) {
    ui_interaction.AddItem(new UIMenuItem("Durchsuchen",""));
    if (fesseln == 0) {
      ui_interaction.AddItem(new UIMenuItem("Fesseln",""));
    } else {
      ui_interaction.AddItem(new UIMenuItem("Entfesseln",""));
    }  
    ui_interaction.AddItem(new UIMenuItem("Ausrauben",""));  
  }
  ui_interaction.AddItem( new UIMenuItem("Schließen", ""));
  ui_interaction.Visible = true;

  ui_interaction.ItemSelect.on((item, index, value) => {
    if (item.Text == "Ausweis zeigen") {
      mp.events.callRemote("server:playermenu:giveausweis");
      ui_interaction.Close();
    } else if (item.Text == "Waffenschein A zeigen") {
      mp.events.callRemote("server:playermenu:giveweapona");
      ui_interaction.Close();  
    } else if (item.Text == "Waffenschein B zeigen") {
      mp.events.callRemote("server:playermenu:giveweaponb");
      ui_interaction.Close();    
    } else if (item.Text == "PKW Führerschein zeigen") {
      mp.events.callRemote("server:playermenu:giveweapona");
      ui_interaction.Close();  
    } else if (item.Text == "LKW Führerschein zeigen") {
      mp.events.callRemote("server:playermenu:giveweapona");
      ui_interaction.Close();  
    } else if (item.Text == "Piloten Lizenz zeigen") {
      mp.events.callRemote("server:playermenu:giveweapona");
      ui_interaction.Close(); 
    } else if (item.Text == "Job Lizenz zeigen") {
      mp.events.callRemote("server:playermenu:giveweapona");
      ui_interaction.Close();   
    } else if (item.Text == "Geld geben") {
      mp.events.callRemote("server:playermenu:giveweapona");
      ui_interaction.Close();  
    } else if (item.Text == "Durchsuchen") {
      mp.events.callRemote("server:playermenu:giveweapona");
      ui_interaction.Close();  
    } else if (item.Text == "Fesseln") {
      mp.events.callRemote("server:playermenu:giveweapona");
      ui_interaction.Close(); 
    } else if (item.Text == "Entfesseln") {
      mp.events.callRemote("server:playermenu:giveweapona");
      ui_interaction.Close(); 
    } else if (item.Text == "Ausrauben") {
      mp.events.callRemote("server:playermenu:giveweapona");
      ui_interaction.Close();   
    } else if (item.Text == "Schließen") {
      ui_interaction.Close();
    }
  });
});

mp.events.add("client:playermenu:openKeys", () => {
  let ui_Key = new Menu("Keys", "", MenuPoint);
  ui_Key.AddItem(new UIMenuItem("Fahrzeugschlüssel",""));
  ui_Key.AddItem(new UIMenuItem("Haustürschlüssel",""));
  ui_Key.AddItem( new UIMenuItem("Schließen", ""));
  ui_Key.Visible = true;

  ui_Key.ItemSelect.on((item, index, value) => {
    if (item.Text == "Fahrzeugschlüssel") {
      mp.events.callRemote("server:vehKeys:openKeys");
      ui_Key.Close();
    } else if (item.Text == "Haustürschlüssel") {
      mp.events.callRemote("server:vehKeys:openKeys");
      ui_Key.Close();    
    } else if (item.Text == "Schließen") {
      ui_Key.Close();
    }
  });
});



mp.events.add("client:admin:openAdmin", (admin) => {
  let ui_admin = new Menu("Admin", "Abuse mich und ich Fick Dich!", MenuPoint);
  ui_admin.AddItem(new UIMenuItem("Spielerliste","Wir sind die NSA!"));
  ui_admin.AddItem(new UIMenuItem("Heilen","Heilwasser ist Beste!"));
  ui_admin.AddItem(new UIMenuItem("Weste","Heilwasser ist Beste!"));
  ui_admin.AddItem(new UIMenuItem("Unsichtbar","Der Harry Potter umhang"));
   if (admin > 1) {
    ui_admin.AddItem(new UIMenuItem("Godmode","Bin ich HULK?"));
   }   
   if (admin > 2) {
    ui_admin.AddItem(new UIMenuItem("Banwetter","Ich bin ZEUS!"));
    ui_admin.AddItem(new UIMenuItem("Banwetter aus","Ich bin GOTT!"));
   }  
   ui_admin.AddItem( new UIMenuItem("Schließen", ""));
   ui_admin.Visible = true;

   ui_admin.ItemSelect.on((item, index, value) => {
   if (item.Text == "Spielerliste") {
     mp.events.callRemote("server:admin:playerlist");
     ui_admin.Close();
   } else if (item.Text == "Admin") {
     mp.events.callRemote("server:admin:openAdmin",admin);
     ui_admin.Close();  
   } else if (item.Text == "Banwetter") {
      mp.events.callRemote("server:admin:banwetter");
      ui_admin.Close();   
   } else if (item.Text == "Banwetter aus") {
      mp.events.callRemote("server:admin:banwetteraus");
      ui_admin.Close();   
    } else if (item.Text == "Heilen") {
      mp.events.callRemote("server:admin:heal");
      ui_admin.Close();   
    } else if (item.Text == "Weste") {
      mp.events.callRemote("server:admin:armor");
      ui_admin.Close(); 
   } else if (item.Text == "Schließen") {
    ui_admin.Close();
   }
 });
});

mp.events.add("client:admin:subMenu", (id) => {
  let ui_admin = new Menu("Admin", "Abuse mich und ich Fick Dich!", MenuPoint);
  ui_admin.AddItem(new UIMenuItem("Zum Spieler Teleportieren",""));
  ui_admin.AddItem(new UIMenuItem("Spieler her Teleportieren","Heilwasser ist Beste!"));
  ui_admin.AddItem(new UIMenuItem("Kicken","Der Harry Potter umhang"));
  ui_admin.AddItem(new UIMenuItem("Perma Bannen","Der Harry Potter umhang"));
  ui_admin.AddItem(new UIMenuItem("Heilen","Der Harry Potter umhang"));

   ui_admin.AddItem( new UIMenuItem("Schließen", ""));
   ui_admin.Visible = true;

   ui_admin.ItemSelect.on((item, index, value) => {
   if (item.Text == "Zum Spieler Teleportieren") {
     mp.events.callRemote("server:admin:tpto",id);
     ui_admin.Close();
   } else if (item.Text == "Spieler her Teleportieren") {
     mp.events.callRemote("server:admin:tphere",id);
     ui_admin.Close();    
  } else if (item.Text == "Perma Bannen") {
      mp.events.callRemote("server:admin:permban",id);
      ui_admin.Close(); 
    } else if (item.Text == "Kicken") {
      mp.events.callRemote("server:admin:kick",id);
      ui_admin.Close(); 
   } else if (item.Text == "Schließen") {
    ui_admin.Close();
   }
 });
});

function playerListDraw(playerJSON,id){
  ui_playerlist = new Menu("Spielerliste", "Liste aller Spieler", MenuPoint);
  ui_playerlist.Visible = true;
  if (playerJSON != "none") {
    playerJSON = JSON.parse(playerJSON);
    playerJSON.forEach(players => {
        let newItem = new UIMenuItem("" + players.firstname+" "+players.lastname, ""+players.onlineid);
        ui_playerlist.AddItem(newItem);
        newItem.SetRightLabel("");
    });
  } else {
    ui_playerlist.AddItem( new UIMenuItem("Keine Spieler Online!", ""));
  }


  ui_playerlist.ItemSelect.on((item, index) => {
    mp.events.call("client:admin:subMenu",item.Description);
      ui_playerlist.Close();
  });
}
mp.events.add("client:admin:playerlist", playerListDraw);

// Kleidungssmenu
mp.events.add("client:playermenu:settings", (gender) => {
  ui_Kleidung = new Menu("Einstellungen", "", MenuPoint);
  ui_Kleidung.AddItem(new UIMenuItem("Auswählen", ""));
  ui_Kleidung.AddItem(new UIMenuCheckboxItem("ATM Blips", checked = checkAtm, Description = ""));
  ui_Kleidung.AddItem(new UIMenuCheckboxItem("Garagen Blips", checked = checkGaragen, Description = ""));
  ui_Kleidung.AddItem(new UIMenuCheckboxItem("Job Blips", checked = checkJobs, Description = ""));
  ui_Kleidung.AddItem(new UIMenuCheckboxItem("Öffentliche Blips", checked = checkOeffentlich, Description = ""));
  ui_Kleidung.AddItem(new UIMenuCheckboxItem("Secret Blips", checked = checkSecret, Description = ""));

  ui_Kleidung.Visible = true;

  ui_Kleidung.MenuClose.on(() => {
    ui_Kleidung.RefreshIndex();
  });

  ui_Kleidung.CheckboxChange.on((checkbox, value) => {
    if (checkbox.Text === "ATM Blips"){
      if (value === true){
          checkAtm = true;
      } else {
          checkAtm = false;
      }
    } else if (checkbox.Text === "Garagen Blips"){
      if (value === true){
        checkGaragen = true;
      } else {
        checkGaragen = false;
      }
    } else if (checkbox.Text === "Job Blips"){
      if (value === true){        
        checkJobs = true;
      } else {
        checkJobs = false;
      }
    } else if (checkbox.Text === "Öffentliche Blips"){
      if (value === true){            
        checkOeffentlich = true;
      } else {
        checkOeffentlich = false;
      }
    } else if (checkbox.Text === "Secret Blips") {
      if (value === true){
        checkSecret = true;
      } else {
        checkSecret = false;
      }
    }
  });
});

// Kleidungssmenu
mp.events.add("client:clothes:showKleidung", (gender) => {
    ui_Kleidung = new Menu("Kleidung", "", MenuPoint);
    ui_Kleidung.AddItem(new UIMenuItem("Auswählen", ""));
    ui_Kleidung.AddItem(new UIMenuCheckboxItem("Hut", checked = checkHut, Description = ""));
    ui_Kleidung.AddItem(new UIMenuCheckboxItem("Brille", checked = checkBrille, Description = ""));
    ui_Kleidung.AddItem(new UIMenuCheckboxItem("Maske", checked = checkMaske, Description = ""));
    ui_Kleidung.AddItem(new UIMenuCheckboxItem("Oberkörper", checked = checkOberkoerper, Description = ""));
    ui_Kleidung.AddItem(new UIMenuCheckboxItem("Hose", checked = checkHose, Description = ""));
    ui_Kleidung.AddItem(new UIMenuCheckboxItem("Schuhe", checked = checkSchuhe, Description = ""));  
    ui_Kleidung.Visible = true;
  
    ui_Kleidung.MenuClose.on(() => {
      ui_Kleidung.RefreshIndex();
    });
  
    ui_Kleidung.CheckboxChange.on((checkbox, value) => {
      if (checkbox.Text === "Hut"){
        if (value === true){
            mp.events.callRemote("server:playermenu:setexistHut");
            checkHut = true;
        } else {
          if (gender == 0) {
            mp.events.callRemote("server:playermenu:setHut", 0, 121, 0);
          } else {
            mp.events.callRemote("server:playermenu:setHut", 0, 120, 0);
          }
          checkHut = false;
        }
      } else if (checkbox.Text === "Brille"){
        if (value === true){
          mp.events.callRemote("server:playermenu:setexistEye");
          checkBrille = true;
        } else {
          if (gender == 0) {
            mp.events.callRemote("server:playermenu:setEye", 1, 0, 0);
          } else {
            mp.events.callRemote("server:playermenu:setEye", 1, 5, 0);
          }
          checkBrille = false;
        }
      } else if (checkbox.Text === "Maske"){
        if (value === true){        
          mp.events.callRemote("server:playermenu:setexistMask");
          checkMaske = true;
        } else {
          if (gender == 0) {
            mp.events.callRemote("server:playermenu:setMask", 1, 0, 0);
          } else {
            mp.events.callRemote("server:playermenu:setMask", 1, 0, 0);
          }
          checkMaske = false;
        }
      } else if (checkbox.Text === "Oberkörper"){
        if (value === true){         
            mp.events.callRemote("server:playermenu:setexistTorso");     
          checkOberkoerper = true;
        } else {
          if (gender == 0) {
            mp.events.callRemote("server:playermenu:setOberkörper", 11, 91, 0,8,15,0,3,15,0);
          } else {
            mp.events.callRemote("server:playermenu:setOberkörper", 11, 271, 0,8,14,0,3,15,0);
          }
          checkOberkoerper = false;
        }
      } else if (checkbox.Text === "Hose") {
        if (value === true){
          mp.events.callRemote("server:playermenu:setexistLeg");
          checkHose = true;
        } else {
          if (gender == 0) {
            mp.events.callRemote("server:playermenu:setLeg", 4, 21, 0);
          } else {
            mp.events.callRemote("server:playermenu:setLeg", 4, 15, 0);
          }
          checkHose = false;
        }
      } else if (checkbox.Text === "Schuhe"){
        if (value === true){
            mp.events.callRemote("server:playermenu:setexistShoe");  
          checkSchuhe = true;
        } else {
          if (gender == 0) {
            mp.events.callRemote("server:playermenu:setShoe", 6, 34, 0);
          } else {
            mp.events.callRemote("server:playermenu:setShoe", 6, 35, 0);
          }
          checkSchuhe = false;
        }
    }
    });
  });
  mp.keys.bind(0x5A, true, function() {
     mp.events.callRemote("server:playermenu:mainMenu");
 });

 mp.events.add('entityStreamIn', (entity) => {
  if (entity.getType() == 4 || entity.getType() == 5) {
    mp.events.callRemote("server:syncedPlayer:syncClothes", entity);
  }
});