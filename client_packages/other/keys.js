// F10
mp.keys.bind(0x79, true, function() {
	mp.events.callRemote("Respawn");
	
});
// E
mp.keys.bind(0x45, true, function() {
	mp.events.callRemote("PushE"); 
});
// K
mp.keys.bind(75, true, function() {
	mp.events.call("PushK"); 
});
mp.keys.bind(0x08, true,function () {
	mp.events.call("CloseLicence");
});
mp.keys.bind(0x4C, true, function() { // L Taste
	mp.events.callRemote("server:faction:interaction");
 });

 mp.keys.bind(33, true, function() { 
	mp.events.call("client:Keybind:PageUp");
 });
 mp.keys.bind(34, true, function() { 
	mp.events.call("client:Keybind:PageDown");
 });
 mp.keys.bind(186, true, function() { 
	mp.events.callRemote("server:Keybind:ergeben");
 });




 // Numpad
mp.keys.bind(0x60,true,function () {
	mp.events.callRemote("server:animations:numpad0");
});
 mp.keys.bind(0x61,true,function () {
	mp.events.callRemote("server:animations:numpad1");
});
mp.keys.bind(0x62,true,function () {
	mp.events.callRemote("server:animations:numpad2");
});
mp.keys.bind(0x63,true,function () {
	mp.events.callRemote("server:animations:numpad3");
});
mp.keys.bind(0x64,true,function () {
	mp.events.callRemote("server:animations:numpad4");
});
mp.keys.bind(0x65,true,function () {
	mp.events.callRemote("server:animations:numpad5");
});
mp.keys.bind(0x66,true,function () {
	mp.events.callRemote("server:animations:numpad6");
});
mp.keys.bind(0x67,true,function () {
	mp.events.callRemote("server:animations:numpad7");
});
mp.keys.bind(0x68,true,function () {
	mp.events.callRemote("server:animations:numpad8");
});
mp.keys.bind(0x69,true,function () {
	mp.events.callRemote("server:animations:numpad9");
});

