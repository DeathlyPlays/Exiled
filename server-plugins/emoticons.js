/*
Emoticon plugin
This plugin allows you to use emoticons in both chat rooms (as long as they are enabled in the room) and private messages.
*/
'use strict';

const fs = require("fs");

let emoticons = {"feelsbd": "http://i.imgur.com/TZvJ1lI.png"};
let emoteRegex = new RegExp("feelsbd", "g");
Server.ignoreEmotes = {};
try {
	Server.ignoreEmotes = JSON.parse(fs.readFileSync(`config/ignoreemotes.json`, `utf8`));
} catch (e) {}

function loadEmoticons() {
	try {
		emoticons = JSON.parse(fs.readFileSync(`config/emoticons.json`, `utf8`));
		emoteRegex = [];
		for (let emote in emoticons) {
			emoteRegex.push(escapeRegExp(emote));
		}
		emoteRegex = new RegExp(`(${emoteRegex.join(`|`)})`, `g`);
	} catch (e) {}
}
loadEmoticons();

function saveEmoticons() {
	fs.writeFileSync(`config/emoticons.json`, JSON.stringify(emoticons));
	emoteRegex = [];
	for (let emote in emoticons) {
		emoteRegex.push(emote);
	}
	emoteRegex = new RegExp(`(${emoteRegex.join(`|`)})`, `g`);
}

function parseEmoticons(message, room) {
	if (emoteRegex.test(message)) {
		let size = 50;
		let lobby = Rooms(`lobby`);
		if (lobby && lobby.emoteSize) size = lobby.emoteSize;
		message = Server.parseMessage(message).replace(emoteRegex, function (match) {
			return `<img src="${emoticons[match]}" title="${match}" height="${((room && room.emoteSize) ? room.emoteSize : size)}" width="${((room && room.emoteSize) ? room.emoteSize : size)}">`;
		});
		return message;
	}
	return false;
}
Server.parseEmoticons = parseEmoticons;

exports.commands = {
	blockemote: 'ignoreemotes',
	blockemotes: 'ignoreemotes',
	blockemoticon: 'ignoreemotes',
	blockemoticons: 'ignoreemotes',
	ignoreemotes: function (target, room, user) {
		this.parse(`/emoticons ignore`);
	},

	unblockemote: 'unignoreemotes',
	unblockemotes: 'unignoreemotes',
	unblockemoticon: 'unignoreemotes',
	unblockemoticons: 'unignoreemotes',
	unignoreemotes: function (target, room, user) {
		this.parse(`/emoticons unignore`);
	},

	emoticons: 'emoticon',
	emote: 'emoticon',
	emotes: 'emoticon',
	emoticon: {
		add: function (target, room, user) {
			if (!this.can(`ban`)) return false;
			if (!target) return this.sendReply("Usage: /emoticons add [name], [url]");

			let targetSplit = target.split(',');
			for (let u in targetSplit) targetSplit[u] = targetSplit[u].trim();

			if (!targetSplit[1]) return this.sendReply("Usage: /emoticons add [name], [url]");

			if (targetSplit[0].length > 10) return this.errorReply("Emoticons may not be longer than 10 characters.");
			if (emoticons[targetSplit[0]]) return this.errorReply(targetSplit[0] + " is already an emoticon.");

			emoticons[targetSplit[0]] = targetSplit[1];
			saveEmoticons();

			let size = 50;
			let lobby = Rooms(`lobby`);
			if (lobby && lobby.emoteSize) size = lobby.emoteSize;
			if (room.emoteSize) size = room.emoteSize;

			this.sendReply(`|raw|The emoticon ${Chat.escapeHTML(targetSplit[0])} has been added: <img src="${targetSplit[1]}" width="${size}" height="${size}">`);
			Rooms('upperstaff').add(`|raw|${Server.nameColor(user.name, true)} has added the emoticon ${Chat.escapeHTML(targetSplit[0])}: <img src="${targetSplit[1]}" width="${size}" height="${size}">`);
			Server.messageSeniorStaff(`/html ${Server.nameColor(user.name, true)} has added the emoticon ${Chat.escapeHTML(targetSplit[0])}: <img src="${targetSplit[1]}" width="${size}" height="${size}">`);
		},

		delete: "del",
		remove: "del",
		rem: "del",
		del: function (target, room, user) {
			if (!this.can(`ban`)) return false;
			if (!target) return this.sendReply("Usage: /emoticons remove [name]");
			if (!emoticons[target]) return this.errorReply("That emoticon does not exist.");

			delete emoticons[target];
			saveEmoticons();

			this.sendReply("That emoticon has been removed.");
			Rooms("upperstaff").add(`|raw|${Server.nameColor(user.name, true)} has removed the emoticon ${Chat.escapeHTML(target)}.`);
			Server.messageSeniorStaff(`/html ${Server.nameColor(user.name, true)} has removed the emoticon ${Chat.escapeHTML(target)}.`);
		},

		disable: "enable",
		off: "enable",
		on: "enable",
		enable: function (target, room, user, connection, cmd) {
			if (!this.can("roommod", null, room)) return false;
			let status = ((cmd !== "enable" && cmd !== "on"));
			if (room.disableEmoticons === status) return this.sendReply("Emoticons are already " + (status ? "disabled" : "enabled") + " in this room.");
			room.disableEmoticons = status;
			room.chatRoomData.disableEmoticons = status;
			Rooms.global.writeChatRoomData();
			this.privateModAction("(" + user.name + " " + (status ? " disabled " : " enabled ") + "emoticons in this room.)");
		},

		view: "list",
		list: function (target, room, user) {
			if (!this.runBroadcast()) return;

			let size = 50;
			let lobby = Rooms("lobby");
			if (lobby && lobby.emoteSize) size = lobby.emoteSize;
			if (room.emoteSize) size = room.emoteSize;

			let reply = `<strong><u>Emoticons (${Object.keys(emoticons).length})</u></strong><br />`;
			for (let emote in emoticons) reply += `(${emote} <img src="${emoticons[emote]}" height="${size}" width="${size}">)`;
			this.sendReply(`|raw|<div class="infobox infobox-limited">${reply}</div>`);
		},

		ignore: function (target, room, user) {
			if (Server.ignoreEmotes[user.userid]) return this.errorReply(`You are already ignoring emoticons.`);
			Server.ignoreEmotes[user.userid] = true;
			fs.writeFileSync(`config/ignoreemotes.json`, JSON.stringify(Server.ignoreEmotes));
			this.sendReply(`You are now ignoring emoticons.`);
		},

		unignore: function (target, room, user) {
			if (!Server.ignoreEmotes[user.userid]) return this.errorReply(`You aren't ignoring emoticons.`);
			delete Server.ignoreEmotes[user.userid];
			fs.writeFileSync(`config/ignoreemotes.json`, JSON.stringify(Server.ignoreEmotes));
			this.sendReply(`You are no longer ignoring emoticons.`);
		},

		size: function (target, room, user) {
			if (room.id === `lobby` && !this.can(`ban`) || room.id !== `lobby` && !this.can(`roommod`, null, room)) return false;
			if (!target) return this.sendReply(`Usage: /emoticons size [number]`);

			let size = Math.round(Number(target));
			if (isNaN(size)) return this.errorReply(`"${target}" is not a valid number.`);
			if (size < 1) return this.errorReply(`Size may not be less than 1.`);
			if (size > 200) return this.errorReply(`Size may not be more than 200.`);

			room.emoteSize = size;
			room.chatRoomData.emoteSize = size;
			Rooms.global.writeChatRoomData();
			this.addModCommand(`${user.name} has changed emoticon size in this room to ${size}.`);
		},

		"": "help",
		help: function (target, room, user) {
			if (!this.runBroadcast()) return;
			this.sendReplyBox(
				`Emoticon Commands:<br />` +
				`<small>/emoticon may be substituted with /emoticons, /emotes, or /emote</small><br />` +
				`/emoticon add [name], [url] - Adds an emoticon.<br />` +
				`/emoticon del/delete/remove/rem [name] - Removes an emoticon.<br />` +
				`/emoticon enable/on/disable/off - Enables or disables emoticons in the current room.<br />` +
				`/emoticon view/list - Displays the list of emoticons.<br />` +
				`/emoticon ignore - Ignores emoticons in chat messages.<br />` +
				`/emoticon unignore - Unignores emoticons in chat messages.<br />` +
				`/emoticon help - Displays this help command.<br />` +
				`/emoticon size [size] - Changes the size of emoticons in the current room.<br />` +
				`/randemote - Randomly sends an emote from the emoticon list.<br />` +
				`<a href="https://gist.github.com/jd4564/ef66ecc47c58b3bb06ec">Emoticon Plugin by: jd</a>`
			);
		},
	},

	randemote: function (target, room, user, connection) {
		if (!this.canTalk()) return;
		let e = Object.keys(emoticons)[Math.floor(Math.random() * Object.keys(emoticons).length)];
		this.parse(e);
	},
};

function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); // eslint-disable-line no-useless-escape
}
