'use strict';
exports.commands = {
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
