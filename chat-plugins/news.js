'use strict';

const fs = require('fs');
const moment = require('moment');
const hashColor = require('../config/color.js');

Exiled.userData = Object.create(null);

function loadUserData() {
    fs.readFile('config/exiledusers.json', 'utf8', function (err, file) {
        if (err) return;
        Exiled.userData = JSON.parse(file);
    });
}
loadUserData();

try {
    Object.assign(Exiled, {

        generateNews: function () {
            let lobby = Rooms('lobby');
            if (!lobby) return false;
            if (!lobby.news || Object.keys(lobby.news).length < 0) return false;
            if (!lobby.news) lobby.news = {};
            let news = lobby.news,
                newsDisplay = [];
            Object.keys(news).forEach(announcement => {
                newsDisplay.push(`<h4>${announcement}</h4>${news[announcement].desc}<br /><br /><strong>—<font color="${hashColor(news[announcement].by)}">${news[announcement].by}</font></strong> on ${moment(news[announcement].posted).format("MMM D, YYYY")}`);
            });
            return newsDisplay;
        },
        newsDisplay: function (user) {
            if (!Users(user)) return false;
            let newsDis = this.generateNews();
            if (newsDis.length === 0) return false;

            if (newsDis.length > 0) {
                newsDis = newsDis.join('<hr>');
                return Users(user).send(`|pm|~Exiled News|${Users(user).getIdentity()}|/raw ${newsDis}`);
            }
        },
    });
}
catch (e) {
    let staff = Rooms('staff');
    if (staff) staff.add(`|html|<div class="broadcast-red"><b>CUSTOM NEWS FUNCTIONALITY HAS CRASHED:</b><br />${e.stack}<br /><br /><b>Please report this to a developer.`).update();
}

exports.commands = {

    news: 'serverannouncements',
    announcements: 'serverannouncements',
    serverannouncements: {
        '': 'view',
        display: 'view',
        view: function (target, room, user) {
            if (!Rooms('lobby') || !Rooms('lobby').news) return this.errorReply("Strange, there are no server announcements...");
            if (!Rooms('lobby').news && Rooms('lobby')) Rooms('lobby').news = {};
            let news = Rooms('lobby').news;
            if (Object.keys(news).length === 0) return this.sendReply("There are currently no new server announcements at this time.");
            return user.send('|popup||wide||html|' +
                "<center><strong>Current server announcements:</strong></center>" +
                Exiled.generateNews().join('<hr>')
            );
        },
        delete: function (target, room, user) {
            if (!this.can('root')) return false;
            if (!Rooms('lobby').news) Rooms('lobby').news = {};
            let news = Rooms('lobby').news;
            if (!news[target]) return this.errorReply("This announcement doesn't seem to exist...");
            delete news[target];
            Rooms('lobby').news = news;
            Rooms('lobby').chatRoomData.news = Rooms('lobby').news;
            Rooms.global.writeChatRoomData();
            this.privateModCommand(`(${user.name} deleted server announcement titled: ${target}.)`);
        },
        add: function (target, room, user) {
            if (!this.can('root')) return false;
            if (!target) return this.parse('/help serverannouncements');
            let [title, ...message] = target.split("|");
            title = title.trim();
            if (!Rooms('lobby').news) Rooms('lobby').news = {};
            let news = Rooms('lobby').news;
            news[title] = {
                desc: message,
                posted: Date.now(),
                by: user.name,
            };
            Rooms('lobby').news = news;
            Rooms('lobby').chatRoomData.news = Rooms('lobby').news;
            Rooms.global.writeChatRoomData();
            this.privateModCommand(`(${user.name} added server announcement: ${message})`);
        },
    },
    serverannouncementshelp: ["/announcements view - Views current server announcements.",
        "/announcements delete [announcement title] - Deletes announcement with the [title]. Requires @, &, ~",
        "/announcements add [announcement title]| [announcement desc] - Adds announcement [announcement]. Requires @, &, ~"
    ],
    // "/announcement toggle - Toggles getting news notifications."],
};
