/**************************
* SymbolColor By PrinceSky *
***************************/
'use strict';

const fs = require('fs');

const selectors

function writeIconCSS() {
        fs.appendFile('config/custom.css', selectors);
}

exports.commands = {
        symbolcolor: function (target, room, user) {
                if (!this.can('forcewin')) return false;
                let args = target.split(',');
                if (args.length < 3) return this.parse('/help symbolcolor');
                let username = toId(args.shift());
                let image = 'color:' + args.shift().trim() + ';';
                selectors = '\n\n' + '  #' + toId(args.shift()) + '-userlist-user-' + username +   ' em.group';
                args.forEach(function (room) {
                        selectors += ', #' + toId(room) + '-userlist-user-'+ username + ' em.group';
                });
                selectors += ' {\n' + '' + image +  '\n}';
                this.privateModCommand("(" + user.name + " has set an symbol color to " + username + ")");
                writeIconCSS();
                // Users.get(args[0]).send('|refresh|');
        },
        symbolcolorhelp: ["/symbolcolor [username], [color], [room 1], [room 2], etc. - Sets an symbol color to a user in chosen rooms."],
};
