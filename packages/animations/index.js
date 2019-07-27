mp.events.add("server:animations:numpad0", (player) => {
    player.stopAnimation();
    player.data.ergeben = 0;
});
mp.events.add("server:animations:numpad1", (player) => {
    player.playAnimation(player.data.numpad1A,player.data.numpad1B,player.data.numpad1C,player.data.numpad1D);
    player.notify("Animation: " + player.data.numpad1Name);//es
});
mp.events.add("server:animations:numpad2", (player) => {
    player.playAnimation(player.data.numpad2A,player.data.numpad2B,player.data.numpad2C,player.data.numpad2D);
    player.notify("Animation: " + player.data.numpad2Name);
});
mp.events.add("server:animations:numpad3", (player) => {
    player.playAnimation(player.data.numpad3A,player.data.numpad3B,player.data.numpad3C,player.data.numpad3D);
    player.notify("Animation: " + player.data.numpad3Name);
});
mp.events.add("server:animations:numpad4", (player) => {
    player.playAnimation(player.data.numpad4A,player.data.numpad4B,player.data.numpad4C,player.data.numpad4D);
    player.notify("Animation: " + player.data.numpad4Name);
});
mp.events.add("server:animations:numpad5", (player) => {
    player.playAnimation(player.data.numpad5A,player.data.numpad5B,player.data.numpad5C,player.data.numpad5D);
    player.notify("Animation: " + player.data.numpad5Name);
});
mp.events.add("server:animations:numpad6", (player) => {
    player.playAnimation(player.data.numpad6A,player.data.numpad6B,player.data.numpad6C,player.data.numpad6D);
    player.notify("Animation: " + player.data.numpad6Name);
});
mp.events.add("server:animations:numpad7", (player) => {
    player.playAnimation(player.data.numpad7A,player.data.numpad7B,player.data.numpad7C,player.data.numpad7D);
    player.notify("Animation: " + player.data.numpad7Name);
});
mp.events.add("server:animations:numpad8", (player) => {
    player.playAnimation(player.data.numpad8A,player.data.numpad8B,player.data.numpad8C,player.data.numpad8D);
    player.notify("Animation: " + player.data.numpad8Name);
});
mp.events.add("server:animations:numpad9", (player) => {
    player.playAnimation(player.data.numpad9A,player.data.numpad9B,player.data.numpad9C,player.data.numpad9D);
    player.notify("Animation: " + player.data.numpad9Name);
});