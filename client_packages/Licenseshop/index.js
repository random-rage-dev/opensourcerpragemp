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


mp.events.add("client:licenseshop:mainMenu", (waffena, waffenb, pkw, lkw, pilot, job) => {
   let main = new Menu("Licenseshop", "Spielermenü", MenuPoint);
   if (waffena == 0) {
    main.AddItem(new UIMenuItem("Waffenschein A kaufen",""));
   }
   if (waffenb == 0) {
    main.AddItem(new UIMenuItem("Waffenschein B kaufen",""));
   }
   if (pkw == 0) {
    main.AddItem(new UIMenuItem("PKW Führerschein kaufen",""));
   }
   if (lkw == 0) {
    main.AddItem(new UIMenuItem("LKW Führschein kaufen",""));
   }
   if (pilot == 0) {
    main.AddItem(new UIMenuItem("Piloten Lizenz kaufen",""));
   }
   if (job == 0) {
    main.AddItem(new UIMenuItem("Job Lizenz kaufen",""));
   }
    main.AddItem( new UIMenuItem("Schließen", ""));
    main.Visible = true;

    main.ItemSelect.on((item, index, value) => {
    if (item.Text !== "Schließen") {
      mp.events.callRemote("server:licenseshop:buyLicense",item.Text);
      main.Close();
    } else if (item.Text == "Schließen") {
      main.Close();
    }
  });
});