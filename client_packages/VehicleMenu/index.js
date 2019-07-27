// Native UI
const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;
const UIMenuListItem = NativeUI.UIMenuListItem;

const ScreenRes = mp.game.graphics.getScreenResolution(0,0);
const MenuPoint = new Point(ScreenRes.x +150, 50);

//TÜREN UND CO UNTERMENÜ
mp.events.add("client:vehiclemenu:doormenu", () => {
    const door_ui = new Menu("Türen & Co", "", MenuPoint);
    door_ui.AddItem(new UIMenuItem(
        "Motorhaube Öffnen/Schließen",
	    "",
    ));
	door_ui.AddItem(new UIMenuItem(
        "Kofferraum Öffnen/Schließen",
	    "",
    ));
    door_ui.AddItem(new UIMenuItem(
        "Fahrertür Öffnen/Schließen",
	    "",
    ));
    door_ui.AddItem(new UIMenuItem(
        "Beifahrer Öffnen/Schließen",
	    "",
    ));
    door_ui.AddItem(new UIMenuItem(
        "Hinten Links Öffnen/Schließen",
	    "",
    ));
    door_ui.AddItem(new UIMenuItem(
        "Hinten Rechts Öffnen/Schließen",
	    "",
    ));
    door_ui.AddItem(new UIMenuItem(
	    "Zurück",
	    "",
    ));
        door_ui.ItemSelect.on((item) => {
        if (item.Text == 'Motorhaube Öffnen/Schließen') {
            mp.events.call("client:vehiclemenu:hoodopen");
        } else if (item.Text == "Kofferraum Öffnen/Schließen") {
            mp.events.call("client:vehiclemenu:trunkopen");
        } else if (item.Text == "Fahrertür Öffnen/Schließen") {
            mp.events.call("client:vehiclemenu:frontleftdoor");
        } else if (item.Text == "Beifahrer Öffnen/Schließen") {
            mp.events.call("client:vehiclemenu:frontrightdoor");
        } else if (item.Text == "Hinten Links Öffnen/Schließen") {
            mp.events.call("client:vehiclemenu:backleftdoor");
        } else if (item.Text == "Hinten Rechts Öffnen/Schließen") {
            mp.events.call("client:vehiclemenu:backrightdoor");
        } else if (item.Text == "Zurück") {
            door_ui.Close();
            mp.events.call("client:vehiclemenu:carmenu");
        };
    });
});

//NEON UNTERMENÜ
mp.events.add("client:vehiclemenu:neonmenu", () => {
    const neon_ui = new Menu("Unterboden", "", MenuPoint);
    neon_ui.AddItem(new UIMenuItem(
	    "Neon An",
        ""
    ));
    neon_ui.AddItem(new UIMenuItem(
	    "Neon Aus",
        ""
    ));
    neon_ui.AddItem(new UIMenuItem(
	    "Zurück",
	    "",
    ));
        neon_ui.ItemSelect.on((item) => {
        if (item.Text == 'Neon An') {
            mp.events.call("client:vehiclemenu:neonan");
        } else if (item.Text == "Neon Aus") {
            mp.events.call("client:vehiclemenu:neonaus");
        } else if (item.Text == "Zurück") {
            neon_ui.Close();
            mp.events.call("client:vehiclemenu:carmenu");
        };
    });
});

//MAIN MENÜ
mp.events.add("client:vehiclemenu:carmenu", (locked,seat, Keys, vehicleid,engine,gurt,faction, userfaction) => {
    const main_ui = new Menu("Fahrzeugmenü", "", MenuPoint);
    vehiclekey = JSON.parse(Keys);
        if (mp.players.local.vehicle && seat == -1 && engine == false) {    
            main_ui.AddItem(new UIMenuItem("Motor an", ""));  
            }   
        if (mp.players.local.vehicle && seat == -1 && engine == true) {    
            main_ui.AddItem(new UIMenuItem("Motor aus", ""));  
            } 
        if(mp.players.local.vehicle && gurt == false || mp.players.local.vehicle && gurt == null) {
            main_ui.AddItem(new UIMenuItem("Gurt anlegen", ""));
        }
        if(mp.players.local.vehicle && gurt == true) {
            main_ui.AddItem(new UIMenuItem("Gurt ablegen", ""));
    }
    vehiclekey.forEach(key => {
        main_ui.AddItem(new UIMenuItem("Fahrzeug aufschließen", ""));
        if (locked == false || locked == false && key.vehid == vehicleid && key.active == "Y") {
            main_ui.AddItem(new UIMenuItem("Fahrzeug abschließen", ""));            
        }
        if (locked == true || locked == true && key.vehid == vehicleid && key.active == "Y" || faction == userfaction) {
            main_ui.AddItem(new UIMenuItem("Fahrzeug aufschließen", ""));
        }
    });
        if (locked == false) {
            main_ui.AddItem(new UIMenuItem("Kofferraum", ""));
        }
        if (mp.players.local.vehicle && seat == -1) {    
            main_ui.AddItem(new UIMenuItem("Neon", ""));
            main_ui.AddItem(new UIMenuItem("Türen", ""));    
        }    
    main_ui.AddItem(new UIMenuItem("Schließen", ""));
	    main_ui.ItemSelect.on((item) => {
        if (item.Text == "Türen") {
            mp.events.call("client:vehiclemenu:doormenu");
            main_ui.Close();
        } else if (item.Text == "Gurt anlegen") {
            mp.events.callRemote("server:vehicleMenu:sealtbealton");
            main_ui.Close();
        } else if (item.Text == "Gurt ablegen") {
            mp.events.callRemote("server:vehicleMenu:sealtbealtoff");
            main_ui.Close();                       
        } else if (item.Text == "Neon") {
            mp.events.call("client:vehiclemenu:neonmenu");
            main_ui.Close();
        } else if (item.Text == "Fahrzeug aufschließen") {
            mp.events.callRemote("server:vehiclemenu:togglelock");
            main_ui.Close();
        } else if (item.Text == "Fahrzeug abschließen") {
            mp.events.callRemote("server:vehiclemenu:togglelock");
            main_ui.Close();
        } else if (item.Text == "Motor an") {
            mp.events.callRemote("server:vehiclemenu:motor");
            main_ui.Close();
        } else if (item.Text == "Motor aus") {
            mp.events.callRemote("server:vehiclemenu:motor");
            main_ui.Close();
        } else if (item.Text == "Kofferraum") {
            mp.events.callRemote("server:kofferaum:firststep");
            main_ui.Close();
        } else if (item.Text == "Schließen") {
            main_ui.Close();
        };
    });
});


mp.events.add("PushK", () => {
    mp.events.callRemote("server:vehiclemenu:keypressY");
  });


//MOTORHAUBE AUF
mp.events.add("client:vehiclemenu:hoodopen", function() {
    if(mp.players.local.vehicle){
        if (mp.players.local.vehicle.hood){
            mp.players.local.vehicle.hood = false;
            mp.players.local.vehicle.setDoorShut(4, false);
        } else {
            mp.players.local.vehicle.hood = true;
            mp.players.local.vehicle.setDoorOpen(4, false, false);
        };
    };
});

//KOFFERRAUM AUF
mp.events.add("client:vehiclemenu:trunkopen", function() {
    if(mp.players.local.vehicle){
        if (mp.players.local.vehicle.trunk){
            mp.players.local.vehicle.trunk = false;
            mp.players.local.vehicle.setDoorShut(5, false);
        } else {
            mp.players.local.vehicle.trunk = true;
            mp.players.local.vehicle.setDoorOpen(5, false, false);
        };
    };
});

//Fahrertür AUF
mp.events.add("client:vehiclemenu:frontleftdoor", function() {
    if(mp.players.local.vehicle){
        if (mp.players.local.vehicle.door){
            mp.players.local.vehicle.door = false;
            mp.players.local.vehicle.setDoorShut(0, false);
        } else {
            mp.players.local.vehicle.door = true;
            mp.players.local.vehicle.setDoorOpen(0, false, false);
        };
    };
});

//Beifahrertür AUF
mp.events.add("client:vehiclemenu:frontrightdoor", function() {
    if(mp.players.local.vehicle){
        if (mp.players.local.vehicle.door){
            mp.players.local.vehicle.door = false;
            mp.players.local.vehicle.setDoorShut(1, false);
        } else {
            mp.players.local.vehicle.door = true;
            mp.players.local.vehicle.setDoorOpen(1, false, false);
        };
    };
});

//Hinten links AUF
mp.events.add("client:vehiclemenu:backleftdoor", function() {
    if(mp.players.local.vehicle){
        if (mp.players.local.vehicle.door){
            mp.players.local.vehicle.door = false;
            mp.players.local.vehicle.setDoorShut(2, false);
        } else {
            mp.players.local.vehicle.door = true;
            mp.players.local.vehicle.setDoorOpen(2, false, false);
        };
    };
});

//Hinten rechts AUF
mp.events.add("client:vehiclemenu:backrightdoor", function() {
    if(mp.players.local.vehicle){
        if (mp.players.local.vehicle.door){
            mp.players.local.vehicle.door = false;
            mp.players.local.vehicle.setDoorShut(3, false);
        } else {
            mp.players.local.vehicle.door = true;
            mp.players.local.vehicle.setDoorOpen(3, false, false);
        };
    };
});

//NEON AN
mp.events.add("client:vehiclemenu:neonan", function() {
    if(mp.players.local.vehicle){
        mp.players.local.vehicle.setNeonLightEnabled(0, true);
        mp.players.local.vehicle.setNeonLightEnabled(1, true);
        mp.players.local.vehicle.setNeonLightEnabled(2, true);
        mp.players.local.vehicle.setNeonLightEnabled(3, true);
    };
});

//NEON AUS
mp.events.add("client:vehiclemenu:neonaus", function() {
    if(mp.players.local.vehicle){
        mp.players.local.vehicle.setNeonLightEnabled(0, false);
        mp.players.local.vehicle.setNeonLightEnabled(1, false);
        mp.players.local.vehicle.setNeonLightEnabled(2, false);
        mp.players.local.vehicle.setNeonLightEnabled(3, false);
    };
});


//ANSCHNALLEN
mp.events.add("client:vehiclemenu:seatbelton", function() {
    if(mp.players.local.vehicle){
        let player = mp.players.local;
        player.setConfigFlag(32, false);
        mp.game.graphics.notify("Sie haben sich ~g~angeschnallt");
    };
});

//ABSCHNALLEN
mp.events.add("client:vehiclemenu:seatbeltoff", function() {
    if(mp.players.local.vehicle){
        let player = mp.players.local;
        player.setConfigFlag(32, true);
        mp.game.graphics.notify("Sie haben sich ~r~abgeschnallt");
    };
});

// Notifications löschen, bevor Motor Start Notifys Serverside ausgegeben werden.
mp.events.add("client:vehiclemenu:clearNotify", function() {
    for (i = 0; i <= 5; i++) {
        mp.game.ui.removeNotification(i);
    }
});


mp.events.add("playerEnterVehicle", function(vehicle, seat){
    let minimap = null;
    if( vehicle.getVariable("isPolice") == "true") vehicle.setEnginePowerMultiplier(20); 
    vehicle.defaultEngineBehaviour = false;     
    mp.game.ui.displayRadar(true);
    MinimapShow = true; 
});
mp.events.add("playerLeaveVehicle", () => {
    mp.game.ui.displayRadar(false);
    MinimapShow = false;
});
