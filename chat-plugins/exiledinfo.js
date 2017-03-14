/*
The following commands were coded specifically for Exiled
Made by ReturningAvenger
feelscool
Basically just edits to main's info.js, and adds more, removes stuff, etc.
*/
'use strict';

const path = require('path');

exports.commands = {

    /*********************************************************
     * Informational commands
     *********************************************************/

    '!groups': true,
    groups: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox(
            "+ <b>Voice</b> - They can use ! commands like !groups, and talk during moderated chat<br />" +
            "% <b>Driver</b> - The above, and they can mute. Global % can also lock users and check for alts<br />" +
            "@ <b>Moderator</b> - The above, and they can ban users<br />" +
            "* <b>Bot</b> - Like Moderator, but makes it clear that this user is a bot<br />" +
            "&amp; <b>Leader</b> - The above, and they can promote to moderator and force ties<br />" +
            "# <b>Room Owner</b> - They are leaders of the room and can almost totally control it<br />" +
            "☥ <b>Gods</b> - The rank of the dankest users ever! They have infinite power, like Administrators<br />" +
            "~ <b>Administrator</b> - They can do anything, like change what this message says"
        );
    },
    groupshelp: ["/groups - Explains what the + % @ # & next to people's names mean.",
        "!groups - Shows everyone that information. Requires: + % @ * # & ~"
    ],

    opensource: true,
    git: "opensource",
    opensource: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox(
            "Exiled's Github's:<br />" +
            "- Language: JavaScript (Node.js)<br />" +
            "- <a href=\"https://github.com/ExiledPS/Team-Exiled\">Exiled Server Code</a><br />" +
            "- <a href=\"https://github.com/ExiledPS\">Team Exiled Organization</a><br />" +
            "Note: We allow anyone to join the organization, seeing as though the reason Exiled exists is due to people practicing/learning code, and having fun ^~^<br />"
        );
    },
    opensourcehelp: ["/opensource - Links to PS's source code repository.",
        "!opensource - Show everyone that information. Requires: + % @ * # & ~"
    ],

    '!repo': true,
    repo: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox(
            "Exiled Repo:<br />" +
            "- Language: JavaScript (Node.js)<br />" +
            "- <a href=\"https://ide.c9.io/returningavenger/exiled_server\">Exiled Repo</a>"
        );
    },

    '!forums': true,
    forums: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox("<a href=\"http://exiledps.boards.net\">Exiled Forums</a>");
    },

    '!suggestions': true,
    suggestions: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox("<a href=\"http://exiledps.boards.net/board/3/suggestions\">Make a suggestion for Exiled</a>");
    },

    '!dub': true,
    dubtrack: 'dub',
    dub: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox("<a href=\"https://www.dubtrack.fm/join/exiled_147873230374424\">The Official Dubtrack for the Exiled Server</a>");
    },
    '!fakemon': true,
    fakemons: 'fakemon',
    fakemon: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox("<a href=\"https://goo.gl/forms/ho9YhvxrnXMY2QLI3\">Submit a Fakemon :D</a>");
    },

    '!skype': true,
    skype: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox("<a href=\"https://join.skype.com/rscOwBne9j6i\">The Official Skype Group</a>");
    },

    '!discord': true,
    discord: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox("<a href=\"https://discord.gg/3UWpXwa\">The Official Exiled Discord</a>");
    },

    '!reddit': true,
    reddit: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox("<a href=\"https://www.reddit.com/me/m/exiled_ps/\">The Official Exiled Reddit</a>");
    },

    '!facebook': true,
    facebook: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox("<a href=\"https://www.facebook.com/exiledserver/\">The Official Exiled Facebook Page</a>");
    },

    '!credits': true,
    credits: function (target, room, user) {
        if (!this.runBroadcast()) return;
        this.sendReplyBox(
            "<center><b>Exiled Credits:</b></center>" +
            "<b>~DeathlyPlays :3 </b> -Main Developer and Owner of Exiled<br />" +
            "<b>~Ninetales >n< </b> -Co-Owns and helps Exiled stay up and running :D<br />" +
            "<b>&Volco </b> -Developer, fixes errors.<br />" +
            "<b>Other Exiled Auth </b> - Help making Exiled a good enviroment for the users."
        );
    },

    '!bugs': true,
    bugs: function (target, room, user) {
        if (!this.runBroadcast()) return;
        if (room && room.battle) {
            this.sendReplyBox("<center><button name=\"saveReplay\"><i class=\"fa fa-upload\"></i> Save Replay</button> &mdash; <a href=\"https://www.smogon.com/forums/threads/3520646/\">Questions</a> &mdash; <a href=\"https://www.smogon.com/forums/threads/3469932/\">Bug Reports</a></center>");
        }
        else {
            this.sendReplyBox(
                "Have a replay showcasing a bug on Exiled?<br />" +
                "- <a href=\"http://exiledps.boards.net/thread/5/bug-reports/\">Bug Reports</a>"
            );
        }
    },

    '!roomhelp': true,
    roomhelp: function (target, room, user) {
        if (!this.canBroadcast('!htmlbox')) return;
        if (this.broadcastMessage && !this.can('declare', null, room)) return false;

        if (!this.runBroadcast('!htmlbox')) return;
        this.sendReplyBox(
            "<strong>Room drivers (%)</strong> can use:<br />" +
            "- /warn OR /k <em>username</em>: warn a user and show the Pok&eacute;mon Showdown rules<br />" +
            "- /mute OR /m <em>username</em>: 7 minute mute<br />" +
            "- /hourmute OR /hm <em>username</em>: 60 minute mute<br />" +
            "- /unmute <em>username</em>: unmute<br />" +
            "- /announce OR /wall <em>message</em>: make an announcement<br />" +
            "- /modlog <em>username</em>: search the moderator log of the room<br />" +
            "- /modnote <em>note</em>: adds a moderator note that can be read through modlog<br />" +
            "- /kick <em>username</em>: kicks the user out of the chatroom<br />" +
            "<br />" +
            "<strong>Room moderators (@)</strong> can also use:<br />" +
            "- /roomban OR /rb <em>username</em>: bans user from the room<br />" +
            "- /roomunban <em>username</em>: unbans user from the room<br />" +
            "- /roomvoice <em>username</em>: appoint a room voice<br />" +
            "- /roomdevoice <em>username</em>: remove a room voice<br />" +
            "- /staffintro <em>intro</em>: sets the staff introduction that will be displayed for all staff joining the room<br />" +
            "- /roomsettings: change a variety of room settings, namely modchat<br />" +
            "<br />" +
            "<strong>Room leaders (&)</strong> can also use: <br />" +
            "- /roommdriver <em>username</em>: appoints someone to room driver<br />" +
            "- /roommod <em>username</em>: appoints user to room mod<br />" +
            "- /roomdedriver /roomdemod <em>username</em>: removes user room driver/moderator<br />" +
            "<br />" +
            "<strong>Room owners (#)</strong> can also use:<br />" +
            "- /roomintro <em>intro</em>: sets the room introduction that will be displayed for all users joining the room<br />" +
            "- /rules <em>rules link</em>: set the room rules link seen when using /rules<br />" +
            "- /roomdeauth <em>username</em>: remove all room auth from a user<br />" +
            "- /declare <em>message</em>: make a large blue declaration to the room<br />" +
            "- !htmlbox <em>HTML code</em>: broadcasts a box of HTML code to the room<br />" +
            "- !showimage <em>[url], [width], [height]</em>: shows an image to the room<br />" +
            "- /roomsettings: change a variety of room settings, including modchat, capsfilter, etc<br />" +
            "<br />" +
            "More detailed help can be found in the <a href=\"https://www.smogon.com/forums/threads/3570628/#post-6774654\">roomauth guide</a><br />" +
            "<br />" +
            "Tournament Help:<br />" +
            "- /tour create <em>format</em>, elimination: Creates a new single elimination tournament in the current room.<br />" +
            "- /tour create <em>format</em>, roundrobin: Creates a new round robin tournament in the current room.<br />" +
            "- /tour end: Forcibly ends the tournament in the current room<br />" +
            "- /tour start: Starts the tournament in the current room<br />" +
            "<br />" +
            "More detailed help can be found in the <a href=\"https://www.smogon.com/forums/threads/3570628/#post-6777489\">tournaments guide</a><br />" +
            "</div>"
        );
    },

    '!rules': true,
    rule: 'rules',
    rules: function (target, room, user) {
        if (!target) {
            if (!this.runBroadcast()) return;
            this.sendReplyBox("Please follow the rules:<br />" +
                (room && room.rulesLink ? "- <a href=\"http://exiledps.boards.net/thread/4/exiled-rules-regulations\"" + Chat.escapeHTML(room.rulesLink) + "\">" + Chat.escapeHTML(room.title) + " room rules</a><br />" : "") +
                "- <a href=\"\">" + (room && room.rulesLink ? "Global rules" : "Rules") + "</a>");
            return;
        }
        if (!room) {
            this.errorReply("This is not a room you can set the rules of.");
        }
        if (!this.can('editroom', null, room)) return;
        if (target.length > 100) {
            return this.errorReply("Error: Room rules link is too long (must be under 100 characters). You can use a URL shortener to shorten the link.");
        }

        room.rulesLink = target.trim();
        this.privateModCommand(`(${user.name} changed the room rules link to: ${target})`);

        if (room.chatRoomData) {
            room.chatRoomData.rulesLink = room.rulesLink;
            Rooms.global.writeChatRoomData();
        }
    },
    ruleshelp: ["/rules - Show links to room rules and global rules.",
        "!rules - Show everyone links to room rules and global rules. Requires: + % @ * # & ~",
        "/rules [url] - Change the room rules URL. Requires: # & ~"
    ],
};
