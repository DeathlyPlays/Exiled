'use strict';

exports.commands = {
    devs: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox('<div style="background-color: red ; border: pink solid 2px ; height: 100px"><center><img style="transform: scaleX(-1);" src="http://pldh.net/media/pokemon/gen5/blackwhite_animated_front/491.gif" height="84" width="95" align="left"><img src="http://i.imgur.com/PgQAAI1.png" height="74" width="250"><img src="http://pldh.net/media/pokemon/gen5/blackwhite_animated_front/491.gif" height="84" width="95" align="right"></center></div><table style="text-align: center ; background-color: Black ; border: Red solid 2px ; width: 100% ; border-collapse: collapse"><tbody><tr><td style="border: Red solid 2px ; color: White ; width: 22%"><img style="transform: scaleX(-1);" src="https://avatars2.githubusercontent.com/u/20971990?v=3&s=460" height="80" width="80"><br>Insist</td><td style="border: Red solid 2px ; color: White ; width: 22%"><img src="http://i.imgur.com/C3bFaZT.png" height="80" width="80"><br>Ninetales >n<</td><td style="border: Red solid 2px ; color: White ; width: 22%"><img style="transform: scaleX(-1);" src="https://files.graphiq.com/620/media/images/Volcanion_5208962.png" height="80" width="80"><br>Volco</td><td style="border: Red solid 2px ; color: White ; width: 22%"><img src="http://i.imgur.com/IXS2qYX.png" height="80" width="80"><br>HoeenHero</td></tr></tbody></table>');
    },
    devshelp: ["/devs - Shows the coders of the server."],
};
