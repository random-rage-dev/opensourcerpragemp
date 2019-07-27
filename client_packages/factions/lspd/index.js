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
player = mp.players.local;
const ScreenRes = mp.game.graphics.getScreenResolution(0,0);
const MenuPoint = new Point(ScreenRes.x +150, 50);
let clothesLSPD = null;
let mainMenuLSPD = null;
let memberMenuLSPD = null;

// Main Menu
mp.events.add("client:lspd:openMainMenu", (factionrang) => {
  mainMenuLSPD = new Menu("LSPD","",MenuPoint);
  mainMenuLSPD.AddItem(new UIMenuItem("Dienstausweis zeigen","Du zeigst deinen Dienstausweis"));
  mainMenuLSPD.AddItem(new UIMenuItem("Festnehmen","Du nimmst die Person fest"));
  mainMenuLSPD.AddItem(new UIMenuItem("Freilassen","Du lässt die Person frei"));
  mainMenuLSPD.AddItem(new UIMenuItem("Durchsuchen","Du durchsuchst die Person"));
  mainMenuLSPD.AddItem(new UIMenuItem("Bußgeld ausstellen","Du stellst ein Bußgeld aus"));
  if(factionrang == 6){
    mainMenuLSPD.AddItem(new UIMenuItem("Mitarbeiterverwaltung",""));
  }
  if(mainMenuLSPD.Visible == false && memberMenuLSPD.Visible == false)
  {
  mainMenuLSPD.Open();
  }
  mainMenuLSPD.ItemSelect.on((item, index) => {
    const nextMenu = index;    
    mp.events.callRemote("server:lspd:mainMenu",nextMenu);
  });
});
mp.events.add("client:lspd:closeMainMenu", () => {
  mainMenuLSPD.Close();
});
// Main Menu Ende
let docu = null;
mp.events.add("client:lspd:documents:Einstellung", () => {
if(docu == null)
{
docu = mp.browsers.new("package://factions/lspd/index.html");
mp.gui.cursor.show(false, false);	
}

});

//MemberMenu
mp.events.add("client:lspd:openMemberMenu", () => {
  memberMenuLSPD = new Menu("LSPD","Mitarbeiterverwaltung",MenuPoint);
  memberMenuLSPD.AddItem(new UIMenuItem("Einstellen","Person einstellen"));
  memberMenuLSPD.AddItem(new UIMenuItem("Befördern","Person befördern"));
  memberMenuLSPD.AddItem(new UIMenuItem("Dienstnummer zuweisen","Du weist die Dienstnummer zu"));
  memberMenuLSPD.AddItem(new UIMenuItem("Entlassen","Person entlassen"));
  memberMenuLSPD.Open();
  memberMenuLSPD.ItemSelect.on((item, index) => {  
    const nextMenu = index;    
    mp.events.callRemote("server:lspd:memberMenu",nextMenu);
  });
});
mp.events.add("client:lspd:closeMemberMenu", () => {
memberMenuLSPD.Close();
});

//MemberMenü Ende
//Cothes Menu
clothesLSPD = new Menu("LSPD", "Umkleide", MenuPoint);
clothesLSPD.AddItem(new UIMenuItem("Standard-Uniform","Die Standard Officer Uniform"));
clothesLSPD.AddItem(new UIMenuItem("Parade-Uniform","Die Paradauniform"));
clothesLSPD.AddItem(new UIMenuItem("Zivil","Deine Zivilkleidung"));
clothesLSPD.Visible = false;

mp.events.add("client:lspd:clothes", () => {
  clothesLSPD.Visible = true;
});

clothesLSPD.ItemSelect.on((item, index) => {      
    mp.events.callRemote("server:lspd:clothes",item.Text);
});
//Cothes Menu


//Waffenkammer
let weaponLSPD = null;
weaponLSPD = new Menu("LSPD","Waffenkammer",MenuPoint);
weaponLSPD.AddItem(new UIMenuItem("Taschenlampe",""));
weaponLSPD.AddItem(new UIMenuItem("Schlagstock",""));
weaponLSPD.AddItem(new UIMenuItem("Tazer",""));
weaponLSPD.AddItem(new UIMenuItem("Pistole Kaliber .50",""));
weaponLSPD.AddItem(new UIMenuItem("AP-Pistole",""));
weaponLSPD.Visible = false;

mp.events.add("client:lspd:openWeapon", () => {
  weaponLSPD.Visible = true;
});
mp.events.add("client:lspd:closeWeapon", () => {
  weaponLSPD.Visible = false;
});

weaponLSPD.ItemSelect.on((item, index) => {      
    mp.events.callRemote("server:lspd:weapons",item.Text);
});

let dismissLSPD = null;
mp.events.add("client:lspd:askedForDismiss", () => {
  dismissLSPD = new Menu("LSPD","Willst du den Mitarbeiter wirklich entlassen?",MenuPoint);
  dismissLSPD.AddItem(new UIMenuItem("Ja","Der Mitarbeiter wird entlassen."));
  dismissLSPD.AddItem(new UIMenuItem("Nein","Aktion abbrechen"));
  dismissLSPD.Open();

  dismissLSPD.ItemSelect.on((item, index) => {      
    mp.events.callRemote("server:lspd:dismissMember",item.Text);
  });
});
mp.events.add("client:lspd:closeDismissMenu", () => {
  dismissLSPD.Close();
});

let officeComputer = null;
let activeMemberMenu = null;
mp.events.add("client:lspd:createOfficeComputer", (factionrang) => {
  if(activeMemberMenu == null && officeComputer == null) {
  officeComputer = new Menu("LSPD","Computer",MenuPoint);
  officeComputer.AddItem(new UIMenuItem("Aktive Mitarbeiter","Du siehst alle Officer die im Dienst sind!"));
  officeComputer.AddItem(new UIMenuItem("Dispatches","Du siehst alle Dispatches!"));
  if (factionrang > 3) {
    officeComputer.AddItem(new UIMenuItem("Ausnahmezustand","Ausnahmezustand aktivieren/deaktivieren"));
  }  
  officeComputer.Visible = false;
  

  officeComputer.ItemSelect.on((item, index) => {
    mp.events.callRemote("server:lspd:officeComputer",item.Text);
  });
}
});
mp.events.add("client:lspd:openofficeComputer", () => {
  if(activeMemberMenu == null && officeComputer.Visible == false)
  officeComputer.Open();
});
function activeLSPDMemberList(playerJSON,id){
  officeComputer.Close();
  officeComputer = null;
  activeMemberMenu = new Menu("Aktive Mitarbeiter", "Liste aller Mitarbeiter im Dienst", MenuPoint);
  activeMemberMenu.Visible = true;
  if (playerJSON != "none") {
    playerJSON = JSON.parse(playerJSON);
    playerJSON.forEach(players => {
        let newItem = new UIMenuItem("" + players.firstname+" "+players.lastname, ""+players.onlineid);
        activeMemberMenu.AddItem(newItem);
        newItem.SetRightLabel("Rang: "+players.factionrang);
    });
  } else {
    activeMemberMenu.AddItem( new UIMenuItem("Keine Mitarbeiter sind im Dienst!", ""));
  }

  activeMemberMenu.ItemSelect.on((item, index) => {
    activeMemberMenu.Close();
    
    
  });
  activeMemberMenu.MenuClose.on(() => {
    activeMemberMenu = null;
    mp.events.call("client:lspd:createOfficeComputer");
    mp.events.call("client:lspd:openofficeComputer");
    
  });
}
mp.events.add("client:lspd:activeMemberList", activeLSPDMemberList);


mp.events.add("client:lspd:createChiefMenu",() => {
  let main = new Menu("Chief PC", "Chief Computer", MenuPoint);
    main.AddItem(new UIMenuItem("Mitarbeiter",""));   
    main.AddItem( new UIMenuItem("Schließen", ""));
    main.Visible = true;

    main.ItemSelect.on((item, index, value) => {
    if (item.Text == "Mitarbeiter") {
      mp.events.callRemote("server:lspd:mitarbeiter");
      main.Close();
    } else if (item.Text == "Schließen") {
      main.Close();
    }
  });
});

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
        newItem.SetRightLabel("Rang: "+char.factionrang);
    });
  } else{
    ui_List.AddItem(new UIMenuItem("Du besitzt keine Charaktere!", ""));
  }


  ui_List.ItemSelect.on((item, index) => {      
      mp.events.call("client:lspd:memberSub",item.Description);
      ui_List.Close();
  });
}
mp.events.add("client:lspd:Memberlist", drawMenu);

mp.events.add("client:lspd:memberSub",(id) => {
  let memberSub = new Menu("Chief PC", "Chief Computer", MenuPoint);
  memberSub.AddItem(new UIMenuItem("Kündigen",""));   
  memberSub.AddItem( new UIMenuItem("Schließen", ""));
  memberSub.Visible = true;

    memberSub.ItemSelect.on((item, index, value) => {
    if (item.Text == "Kündigen") {
      mp.events.callRemote("server:lspd:mitarbeiter",id);
      memberSub.Close();
    } else if (item.Text == "Schließen") {
      memberSub.Close();
    }
  });
});


mp.events.add("client:lspd:createVeichleMenu",(rang) => {
  let vehicles = new Menu("Dienstfahrzeuge", "Die Dienstfahrzeuge", MenuPoint);
  vehicles.AddItem(new UIMenuItem("Stanier",""));  
  vehicles.AddItem(new UIMenuItem("Interceptor","")); 
  vehicles.AddItem(new UIMenuItem("Police Buffalo",""));
  vehicles.AddItem( new UIMenuItem("Schließen", ""));
  vehicles.Visible = true;

  vehicles.ItemSelect.on((item, index, value) => {
    if (item.Text !== "Schließen") {
      mp.events.callRemote("server:lspd:spawnVehicle",item.Text);
      vehicles.Close();
    } else if (item.Text == "Schließen") {
      vehicles.Close();
    }
  });
});




