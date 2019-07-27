// Animation stoppen
mp.events.add('stopAnimation', (player) => {
  mp.events.callRemote('stopAnimation', player);
});
