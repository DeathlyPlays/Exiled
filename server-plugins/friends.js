/******************
 * Friends Plug-in
 * By Insist
 ******************/

"use strict";

let friends = {};
const fs = require("fs");

// This iirc will make a file if it does not already exist
try {
	friends = JSON.parse(fs.readFileSync('config/friends.json', 'utf8'));
} catch (e) {
	if (e.code !== 'ENOENT') throw e;
}

function editFriends() {
	if (Object.keys(friends).length < 1) return fs.writeFileSync('config/friends.json', JSON.stringify(friends));
	let data = "{\n";
	for (let u in friends) {
		data += '\t"' + u + '": ' + JSON.stringify(friends[u]) + ",\n";
	}
	data = data.substr(0, data.length - 2);
	data += "\n}";
	fs.writeFileSync('config/friends.json', data);
}

exports.commands = {
	friends: "friend",
	friend: {
		addfriend: "add",
		new: "add",
		add: function (target, room, user) {
			if (!target) return this.errorReply("This command requires a target.");
			if (user.locked) return this.errorReply("You cannot use this command whilst being locked.");
			if (friends[toId].name) return this.errorReply("You have already added this user as a friend.");
			let targetUser = Users.get(target);
			Db('friends')
			editFriends();
			return this.sendReply(`You have successfully added ${target} as your friend.`);
		},
		unfriend: "delete",
		remove: "delete",
		delete: function (target, room, user) {
		},
		list: function (target, room, user) {
			if (!this.runBroadcast()) return;
		},
	},
};