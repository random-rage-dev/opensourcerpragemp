var browser = null;

mp.events.add("openDeathscreen",() => {
    if (browser !== null) browser.destroy();
    browser = mp.browsers.new('package://deathscreen/index.html');
    mp.game.player.setInvincible(true);
    mp.gui.cursor.visible = false;
    mp.game.controls.disableControlAction(0, 82, false);
});

mp.events.add("closeDeathscreen",() => {
    if (browser !== null) {
        browser.destroy();
        browser = null;
        mp.gui.cursor.visible = false;
        mp.gui.chat.show(true);
        mp.game.player.setInvincible(false);
    }
});