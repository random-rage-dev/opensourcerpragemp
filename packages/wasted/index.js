const hospitalCoords = [
    new mp.Vector3(340.6430969238281, -1396.09228515625, 32.50926971435547),
    new mp.Vector3(-450.0058288574219, -340.5953369140625, 34.50172805786133),
    new mp.Vector3(360.2090148925781, -585.2518920898438, 28.821245193481445),
    new mp.Vector3(1839.369140625, 3672.39794921875, 34.27670669555664),
    new mp.Vector3(-242.74436950683594, 6325.830078125, 32.426185607910156)
];

const respawnTime = 300000; // milliseconds

function respawnAtHospital(player) {
    let closestHospital = 0;
    let minDist = 9999.0;

    for (let i = 0, max = hospitalCoords.length; i < max; i++) {
        let dist = player.dist(hospitalCoords[i]);
        if (dist < minDist) {
            minDist = dist;
            closestHospital = i;
            player.call("closeDeathscreen");
            player.setVariable("isDead", false);
        }
    }

    player.spawn(hospitalCoords[closestHospital]);
    player.health = 100;

    clearTimeout(player.respawnTimer);
    player.respawnTimer = null;
}

mp.events.add("playerReady", (player) => {
    player.respawnTimer = null;
});

mp.events.add("playerDeath", (player) => {
    if (player.respawnTimer) clearTimeout(player.respawnTimer);
    player.respawnTimer = setTimeout(respawnAtHospital, respawnTime, player);
    player.call("openDeathscreen");
    player.setVariable("isDead", true);
});

mp.events.add("playerQuit", (player) => {
    if (player.respawnTimer) clearTimeout(player.respawnTimer);
});