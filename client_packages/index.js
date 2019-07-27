require("login.js");
require("nativeui");
require("other/keys.js"); // Key Binds
require("other/index.js");
require("other/noclip"); // No Clip
require("other/betternotifs");
require("other/passport/index.js");
require("charchooser")
require("playermenu");
require("CharCreator");
require("ClothesMenu");
require("vehKeys");
require("VehicleMenu");
require("shortcut");
require("deathscreen");
require("Inventory");
require("scaleform_messages");
require("factions/markers");
require("factions/lspd");
require("factions/medic");
require("Bank");
require('AnimPlayer');
require('Handy');
require('Voice');
require('CarTuner');
require('Licenseshop');
require('Passenger');
require('Hud');
require('clothingshops');

mp.gui.chat.show(true);
mp.gui.chat.activate(false);
mp.nametags.enabled = false;

mp.game.streaming.requestIpl("vw_casino_main");