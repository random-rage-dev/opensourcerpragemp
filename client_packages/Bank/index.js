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
const ScreenRes = mp.game.graphics.getScreenResolution(0,0);
const MenuPoint = new Point(ScreenRes.x +150, 50);


mp.events.add("client:bank:subMenu",(id,nummer,atmid) => {
    const ui_sub = new Menu("Bankkonto", "Bankkonto: "+nummer, MenuPoint);
    ui_sub.AddItem( new UIMenuItem("Kontostand", ""+id));
    ui_sub.AddItem( new UIMenuItem("Geld abheben", ""+id));
    ui_sub.AddItem( new UIMenuItem("Geld Einzahlen", ""+id));
    ui_sub.AddItem( new UIMenuItem("Überweisen", ""+id));

    ui_sub.ItemSelect.on((item, index, value) => {
        if (item.Text == "Kontostand") {
          mp.events.callRemote("server:bank:kontostand",item.Description);   
          ui_sub.Close();          
        } else if (item.Text == "Geld abheben") {
            mp.events.call("createInputShop", "moneyabheben");
            mp.events.callRemote("server:bank:abheben", item.Description,atmid);  
            ui_sub.Close(); 
        } else if (item.Text == "Geld Einzahlen") {
            mp.events.call("createInputShop", "moneyeinzahlen");
            mp.events.callRemote("server:bank:abheben", item.Description,atmid);  
            ui_sub.Close();
        } else if (item.Text == "Überweisen") {
            ui_sub.Close();
        } else {            
            ui_sub.Close();
        }      
    });
});

mp.events.add("client:bank:openMenu",(json,bank,id) => {
  var parsed = JSON.parse(json);
  const ui_main = new Menu("Bankkonten", "Wähle dein Bankkonto", MenuPoint);
    parsed.forEach(function(bank) {
        let newItem = new UIMenuItem(""+bank.nummer, ""+bank.id);
        ui_main.AddItem(newItem);
        newItem.SetRightLabel("" +bank.name);
    });
    ui_main.AddItem( new UIMenuItem("Ausrauben", ""));

    ui_main.ItemSelect.on((item, index, value) => {
      if (item.Text !== 'Schließen' && item.Text !== "Ausrauben") {
         mp.events.call("client:bank:subMenu",item.Description,item.Text,id)
         ui_main.Close();
      } else if(item.Text == "Ausrauben") {
        var playerposx = player.position.x;
        var playerposy = player.position.y;
        var playerposz = player.position.z;
        mp.events.callRemote("server:bank:ausrauben",id);        
      } else {
        ui_main.Close();
      }         
    });
});

mp.events.add("client:bank:sendVertrag", () => {
  mp.events.callRemote("server:bank:addKonto");
  mp.events.call("endBank");
});