'use strict';
exports.commands = {


    hc: function(target, room, user) {
        return this.parse('/hotpatch chat');
    },

    deauthroom: function(target, room, user) {
        if (!this.can('editroom', null, room)) return false;
        if (!room.auth) return this.errorReply("Room does not have roomauth.");
        if (!target) {
            user.lastCommand = '/deauthroom';
            this.errorReply("THIS WILL REMOVE ALL THE AUTH IN A ROOM (Except #).");
            this.errorReply("To confirm, use: /deauthroom confirm");
            return;
        }
        if (user.lastCommand !== '/deauthroom' || target !== 'confirm') {
            return this.parse('/help deauthroom');
        }
        let count = 0;
        for (let userid in room.auth) {
            if (room.auth[userid] === '+' || room.auth[userid] === '%' || room.auth[userid] === '@' || room.auth[userid] === '&') {
                delete room.auth[userid];
                if (userid in room.users) room.users[userid].updateIdentity(room.id);
                count++;
            }
        }
        if (!count) {
            return this.sendReply("(This room has zero auth)");
        }
        if (room.chatRoomData) {
            Rooms.global.writeChatRoomData();
        }
        this.addModCommand("All " + count + " Room Auth have been cleared by " + user.name + ".");
    },
    deauthroomhelp: ["/deauthroom - Remove all auth except # in a room. Requires: # & ~"],


    deauthall: function(target, room, user) {
        if (!this.can('eval', null, room)) return false;
        if (!room.auth) return this.errorReply("No Auth Present on server!");
        if (!target) {
            user.lastCommand = '/deauthall';
            this.errorReply("THIS WILL REMOVE ALL THE GLOBAL AUTH! (Except ~).");
            this.errorReply("To confirm, use: /deauthall confirm");
            return;
        }
        if (user.lastCommand !== '/deauthall' || target !== 'confirm') {
            return this.parse('/help deauthall');
        }
        let ranks = Object.keys(Config.groups);
        let rankLists = {};
        let count = 0;
        for (let u in Users.usergroups) {
            let rank = Users.usergroups[u].charAt(0);
            if (rank === global) continue;
            // In case the usergroups.csv file is not proper, we check for the server ranks.
            if (ranks.indexOf(rank) >= 0) {
                let name = Users.usergroups[u].substr(1);
                delete rank[name];
                count++;
            }
        }
        if (!count) {
            return this.sendReply("(Zero Auth In The Server!)");
        }
        if (room.chatRoomData) {
            Rooms.global.writeChatRoomData();
        }
        this.addModCommand("All " + count + " Auth have been cleared by " + user.name + ".");
    },
    deauthallhelp: ["/deauthall - Remove all auth except ~ on the server. Requires:  ~"],

    useroftheweek: 'uotw',
    uotw: function(target, room, user) {
        if (toId(target.length) >= 19) return this.errorReply("Usernames have to be 18 characters or less");
        if (!this.can('forcewin')) return false;
        if (!room.chatRoomData) return;
        if (!target) {
            if (!this.runBroadcast()) return;
            if (!room.chatRoomData.user) return this.sendReplyBox("The User of the Week has not been set.");
            return this.sendReplyBox(
                "The current <strong>User of the Week</strong>  is: " + room.chatRoomData.user
            );
        }
        if (!this.can('declare', null, room)) return false;
        if (target === 'off' || target === 'disable' || target === 'reset') {
            if (!room.chatRoomData.user) return this.sendReply("The User of the Week has already been reset.");
            delete room.chatRoomData.user;
            this.sendReply("The User of the Week was reset by " + Chat.escapeHTML(user.name) + ".");
            this.logModCommand(user.name + " reset the User of the Week.");
            Rooms.global.writeChatRoomData();
            return;
        }
        room.chatRoomData.user = Chat.escapeHTML(target);
        Rooms.global.writeChatRoomData();
        room.addRaw(
            "<div class=\"broadcast-green\"><strong>The User of the week is: " + room.chatRoomData.user + ".</strong></div>"
        );
        this.logModCommand(Chat.escapeHTML(user.name) + " updated the User of the Week to \"" + room.chatRoomData.user + "\".");
    },
    useroftheweekhelp: 'uotwhelp',
    uotwhelp: [
        "/uotw - View the current User of the Week",
        "/uotw [user] - Set the User of the Week. Requires: & ~"
    ],
};