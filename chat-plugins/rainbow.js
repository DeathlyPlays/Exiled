/* * * * * * * * * * * * * * * * * *
 * Thunder plugin by iAlain        *
 * Others by ReturningAvenger      *
 * * * * * * * * * * * * * * * * * */

exports.commands = {
        light: 'thunder',
        thunder: function(target, room, user) {
                if (user.can('broadcast', null, room)) {
                        var colors = ['#ffff00'];
                        if (!target) return this.sendReply('/thunder message');
                        var userColor = '',
                                currentDate = new Date(),
                                randomNumber = '';
                        for (var x = 0; x < user.name.length; x++) {
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if (user.name.substring(x, x + 1) !== undefined) {
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                }
                                else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if (target.indexOf('/me') > -1) {
                                room.add('|raw|<small><i>' + user.group + '</small><b>' + userColor + '</b>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                        }
                        else {
                                room.add('|raw|<small>' + user.group + '</small><b>' + userColor + '</b>: ' + target);
                        }
                }
                else return this.errorReply('You must be voiced to use this command.');
        },
        flame: function(target, room, user) {
                if (user.can('broadcast', null, room)) {
                        var colors = ['#ff0000'];
                        if (!target) return this.sendReply('/flame message');
                        var userColor = '',
                                currentDate = new Date(),
                                randomNumber = '';
                        for (var x = 0; x < user.name.length; x++) {
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if (user.name.substring(x, x + 1) !== undefined) {
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                }
                                else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if (target.indexOf('/me') > -1) {
                                room.add('|raw|<small><i>' + user.group + '</small><b>' + userColor + '</b>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                        }
                        else {
                                room.add('|raw|<small>' + user.group + '</small><b>' + userColor + '</b>: ' + target);
                        }
                }
                else return this.errorReply('You must be voiced to use this command.');
        },
        rain: function(target, room, user) {
                if (user.can('broadcast', null, room)) {
                        var colors = ['#33ccff'];
                        if (!target) return this.sendReply('/rain message');
                        var userColor = '',
                                currentDate = new Date(),
                                randomNumber = '';
                        for (var x = 0; x < user.name.length; x++) {
                                randomNumber = Math.floor(Math.random() * colors.length);
                                if (user.name.substring(x, x + 1) !== undefined) {
                                        userColor += '<font color="' + colors[randomNumber] + '">' + user.name.substring(x, x + 1) + '</font>';
                                }
                                else {
                                        userColor += '<font color="' + colors[randomNumber] + '">:</font>';
                                }
                        }
                        if (target.indexOf('/me') > -1) {
                                room.add('|raw|<small><i>' + user.group + '</small><b>' + userColor + '</b>' + Tools.escapeHTML(target.substring(3, target.length)) + '</i>');
                        }
                        else {
                                room.add('|raw|<small>' + user.group + '</small><b>' + userColor + '</b>: ' + target);
                        }
                }
                else return this.errorReply('You must be voiced to use this command.');
        },
};
