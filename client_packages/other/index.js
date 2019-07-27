mp.events.add("client:world:weatherUpdate",(newWeather) => {
    if (mp.players.local.dimension !== 7) {
      mp.game.gameplay.setOverrideWeather(newWeather);
      mp.game.gameplay.setWeatherTypePersist(newWeather);
      if (newWeather == "RAIN" || newWeather == "THUNDER") {
        mp.game.gameplay.setRainFxIntensity(0.75);
      } else {
        mp.game.gameplay.setRainFxIntensity(0.0);
      }
    } else {
      mp.game.gameplay.setOverrideWeather("CLEAR");
      mp.game.gameplay.setWeatherTypeNow("CLEAR");
      mp.game.gameplay.setWeatherTypePersist("CLEAR");
      mp.game.gameplay.setRainFxIntensity(0.0);
    }
  });
  var hud = null;
  mp.events.add("openHud",() => {
    if (hud !== null) hud.destroy();
    hud = mp.browsers.new('package://Hud/index.html');
    mp.game.player.setInvincible(true);
    mp.gui.cursor.visible = false;
    mp.game.controls.disableControlAction(0, 82, false);
  });

  
mp.events.add('changeValue',(type,value) => {
  if (type === "money") {
      hud.execute("setMoneyAmount('" + value + "')");
  } else if (type === "drink") {
      hud.execute("setWaterLevel('" + value + "')");
  } else if (type === "food") {
      hud.execute("setFoodLevel('" + value + "')");
  } else if (type === "micro") {
      hud.execute("setMicroValue('" + value + "')");
  }    
});

mp.events.add("createPed",(x, y, z, rotation) => {
    let Ped = mp.peds.new(mp.game.joaat('MP_F_Freemode_01'), new mp.Vector3(x, y, z),rotation, 0);
});

mp.events.add('render', () => {
  // remove health regeneration
  mp.game.player.setHealthRechargeMultiplier(0.0);
});

