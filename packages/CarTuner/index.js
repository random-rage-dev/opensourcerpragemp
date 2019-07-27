
// Tuning
mp.events.add("mod", (player, mod, modvalue) => {
    player.vehicle.setMod(parseInt(mod), parseInt(modvalue));
});

mp.events.addCommand('mod', (player, fullText, a , b) => {
    player.vehicle.setMod(parseInt(a), parseInt(b));
  });