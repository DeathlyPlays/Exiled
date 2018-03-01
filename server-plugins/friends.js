/****************************
 * Friends Plug-in for PS	*
 * Created by: Insist		*
 ****************************/

"use strict";

const FS = require("../lib/fs.js");

let friends = FS("config/friends.json").readIfExistsSync();

if (friends !== "") {
	friends = JSON.parse(friends);
} else {
	friends = {};
}

function write() {
	FS("config/friends.json").writeUpdate(() => (
		JSON.stringify(friends)
	));
	let data = "{\n";
	for (let u in friends) {
		data += '\t"' + u + '": ' + JSON.stringify(friends[u]) + ",\n";
	}
	data = data.substr(0, data.length - 2);
	data += "\n}";
	FS("config/friends.json").writeUpdate(() => (
		data
	));
}

function checkFriends(user, userid) {
	if (!friends[userid] || !Db.friendnotifications.has(userid)) return false;
	let onlineUsers = [];
	friends[userid].friendsList.forEach(online => {
		if (Users.get(online)) {
			onlineUsers.push(online);
		}
	});
	if (onlineUsers.length > 0) return user.send(`|pm|~${Config.serverName} Server|${user.getIdentity()}|Your friends: ${onlineUsers.join(", ")} are online.`);
}
Server.checkFriends = checkFriends;

exports.commands = {
	fren: "friends",
	frens: "friends",
	friend: "friends",
	friends: {
		init: function (target, room, user) {
			if (user.locked || !user.autoconfirmed) return this.errorReply(`To prevent spamming you must be on an autoconfirmed account and unlocked to send friend requests.`);
			if (friends[user.userid]) return this.errorReply(`You have already initalized your friends list.`);
			friends[user.userid] = {
				friendsList: [],
				pendingRequests: [],
			};
			write();
			return this.sendReply(`You have successfully initialized your friends list.`);
		},

		send: "add",
		sendrequest: "add",
		request: "add",
		add: function (target, room, user) {
			if (!target || target.length < 1 || target.length > 18) return this.parse(`/help friends`);
			let targetUser = Users(target);
			if (!targetUser || !targetUser.connected) return this.errorReply(`${target} is not online.`);
			// If the user has not initalized their friends list, parse /friends init
			if (!friends[user.userid]) this.parse(`/friends init`);
			if (user.userid === toId(target)) return this.errorReply(`Like I can relate and all... but apparently being your own friend is invalid.`);
			if (user.locked || !user.autoconfirmed) return this.errorReply(`To prevent spamming you must be on an autoconfirmed account and unlocked to send friend requests.`);
			if (Db.disabledfriends.has(toId(target))) return this.errorReply(`${targetUser} has disabled adding friends.`);
			if (Db.disabledfriends.has(user.userid)) return this.errorReply(`You must enable friend requests before attempting to add others.`);
			if (friends[user.userid].pendingRequests.includes(targetUser.userid)) return this.errorReply(`${targetUser} already has a pending request from you.`);
			if (friends[user.userid].friendsList.includes(targetUser.userid)) return this.errorReply(`${targetUser} is already registered on your friends list.`);
			friends[user.userid].pendingRequests.push(targetUser.userid);
			write();
			let message = `/html has sent you a friend request. <br /><button name="send" value="/friends accept ${user.userid}">Click to accept</button> | <button name="send" value="/friends decline ${user.userid}">Click to decline</button>`;
			targetUser.send(`|pm|${user.getIdentity()}|${targetUser.getIdentity()}|${message}`);
			return this.sendReply(`You have sent ${target} a friend request.`);
		},

		removefriend: "remove",
		unfriend: "remove",
		remove: function (target, room, user) {
			if (!target) return this.parse(`/help friends`);
			let targetId = toId(target);
			if (!friends[user.userid].friendsList.includes(targetId)) return this.errorReply(`${target} is not registered as your friend.`);
			friends[user.userid].friendsList.splice(friends[user.userid].friendsList.indexOf(targetId), 1);
			friends[targetId].friendsList.splice(friends[targetId].friendsList.indexOf(user.userid), 1);
			write();
			return this.sendReply(`You have successfully removed ${target} as a friend.`);
		},

		approve: "accept",
		accept: function (target, room, user) {
			if (user.locked || !user.autoconfirmed) return this.errorReply(`To prevent spamming you must be on an autoconfirmed account and unlocked to send friend requests.`);
			if (!target) return this.parse(`/help friends`);
			let targetId = toId(target);
			// If the user has not initalized their friends list, parse /friends init
			if (!friends[user.userid]) this.parse(`/friends init`);
			if (!friends[targetId].pendingRequests.includes(user.userid)) return this.errorReply(`${target} has not sent you a friend request.`);
			friends[targetId].friendsList.push(user.userid);
			friends[user.userid].friendsList.push(targetId);
			friends[targetId].pendingRequests.splice(friends[targetId].pendingRequests.indexOf(user.userid), 1);
			write();
			return this.sendReply(`You have successfully accepted ${target}'s friend request.`);
		},

		decline: "deny",
		deny: function (target, room, user) {
			if (user.locked || !user.autoconfirmed) return this.errorReply(`To prevent spamming you must be on an autoconfirmed account and unlocked to send friend requests.`);
			if (!target) return this.parse(`/help friends`);
			let targetId = toId(target);
			// If the user has not initalized their friends list, parse /friends init
			if (!friends[user.userid]) this.parse(`/friends init`);
			if (!friends[targetId].pendingRequests.includes(user.userid)) return this.errorReply(`${target} has not sent you a friend request.`);
			friends[targetId].pendingRequests.splice(friends[targetId].pendingRequests.indexOf(user.userid), 1);
			write();
			return this.sendReply(`You have successfully denied ${target}'s friend request.`);
		},

		blockfriends: "disable",
		disable: function (target, room, user) {
			if (Db.disabledfriends.has(user.userid)) return this.errorReply(`You have already disabled friend requests.`);
			Db.disabledfriends.set(user.userid);
			return this.sendReply(`You have successfully disabled friend requests.`);
		},

		enablefriends: "enable",
		enable: function (target, room, user) {
			if (!Db.disabledfriends.has(user.userid)) return this.errorReply(`You haven't disabled friend requests.`);
			Db.disabledfriends.remove(user.userid);
			return this.sendReply(`You have successfully enabled friend requests.`);
		},

		notifications: "notify",
		notify: function (target, room, user) {
			if (!friends[user.userid]) this.parse(`/friends init`);
			if (!Db.friendnotifications.has(user.userid)) {
				Db.friendnotifications.set(user.userid, 1);
				this.sendReply(`You have successfully set your friend notifications on.`);
			} else {
				Db.friendnotifications.remove(user.userid);
				this.sendReply(`You have successfully disabled friend notifications.`);
			}
		},

		"!list": true,
		"": "list",
		list: function (target, room, user) {
			if (!this.runBroadcast()) return;
			if (!target || target.length > 18) target = user.userid;
			let friendsId = toId(target);
			if (!friends[friendsId]) return this.errorReply(`${target} has not initialized their friends list yet.`);
			if (friends[friendsId].friendsList.length < 1) return this.sendReplyBox(`<center>${Server.nameColor(target, true, true)} currently doesn't have any friends.</center>`);
			let display = `<center><h2>${Server.nameColor(target, true, true)}'s Friends List (${friends[friendsId].friendsList.length} Friend${friends[friendsId].friendsList.length > 1 ? "s" : ""}):</h2><p style="font-size: 12pt">`;
			friends[friendsId].friendsList.forEach(friend => {
				display += `${Server.nameColor(friend, true, true)}<br />`;
			});
			display += `</p></center>`;
			return this.sendReplyBox(`<div style="infobox-limited">${display}</div>`);
		},

		help: function () {
			this.parse(`/help friends`);
		},
	},

	friendshelp: [
		`/friends init - Initializes your friends list.
		/friends add [user] - Sends a user a friend request. Must be auto-confirmed and unlocked.
		/friends remove [user] - Unfriends a user.
		/friends accept [user] - Accepts a user's friend request.
		/friends decline [user] - Declines a user's friend request.
		/friends disable - Disables the ability for others to send you friend requests.
		/friends enable - Enables the ability for others to send you friend requests (if you had it disables).
		/friends notify - If disabled, enables friend notifications. If enabled, disables friend notifications.
		/friends list [optional target] - Shows the user's friends list if they have initialized their list; defaults to yourself.
		/friends help - Shows this help command.`,
	],
};
