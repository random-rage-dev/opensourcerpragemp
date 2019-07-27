let kickMessageScaleform = null;
let msgInit = 0;
let msgDuration = 5000;
let msgAnimatedOut = false;
let msgBgColor = 0;

mp.events.add("ShowKickMessage", (title, message) => {
    if (kickMessageScaleform == null) kickMessageScaleform = new messageScaleform("kick_message");
    kickMessageScaleform.callFunction("SHOW_kick_MESSAGE", title, message);

    msgInit = Date.now();
    msgAnimatedOut = false;
});

mp.events.add("ShowKickShardMessage", (title, message, bgColor, useDarkerShard, condensed) => {
    if (kickMessageScaleform == null) kickMessageScaleform = new messageScaleform("kick_message");
    kickMessageScaleform.callFunction("SHOW_SHARD_kick_MESSAGE", title, message, bgColor, useDarkerShard, condensed);

    msgInit = Date.now();
    msgAnimatedOut = false;
    msgBgColor = bgColor;
});

mp.events.add("render", () => {
    if (kickMessageScaleform != null) {
        kickMessageScaleform.renderFullscreen();

        if (msgInit > 0 && Date.now() - msgInit > msgDuration) {
            if (!msgAnimatedOut) {
                kickMessageScaleform.callFunction("SHwARD_ANIM_OUT", msgBgColor);
                msgAnimatedOut = true;
                msgDuration += 750;
            } else {
                msgInit = 0;
                kickMessageScaleform.dispose();
                kickMessageScaleform = null;
            }
        }
    }
});