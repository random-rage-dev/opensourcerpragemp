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
let clothesLSPD = null;





clothesLSPD = new Menu("Medic", "Umkleide", MenuPoint);
clothesLSPD.AddItem(new UIMenuItem("Standard","Die Standard Uniform"));
clothesLSPD.AddItem(new UIMenuItem("Parade-Uniform","Die Paradauniform"));
clothesLSPD.AddItem(new UIMenuItem("Zivil","Deine Zivilkleidung"));
clothesLSPD.Visible = false;

mp.events.add("", () => {
  clothesLSPD.Visible = true;
});

clothesLSPD.ItemSelect.on((item, index) => {      
    mp.events.callRemote("server:medic:clothes",item.name);
});

