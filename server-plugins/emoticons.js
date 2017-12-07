/*
Emoticon plugin
This plugin allows you to use emoticons in both chat rooms (as long as they are enabled in the room) and private messages.
*/
'use strict';

<<<<<<< HEAD
const fs = require('fs');
let emoticons = {'feelsbd': 'http://i.imgur.com/TZvJ1lI.png'};
let emoteRegex = new RegExp('feelsbd', 'g');
=======
const fs = require("fs");

let emoticons = {"feelsbd": "http://i.imgur.com/TZvJ1lI.png"};
let emoteRegex = new RegExp("feelsbd", "g");
>>>>>>> aab900638057794f54a375fcdf97ef474902be8b
Server.ignoreEmotes = {};
try {
	Server.ignoreEmotes = JSON.parse(fs.readFileSync('config/ignoreemotes.json', 'utf8'));
} catch (e) {}

function loadEmoticons() {
	try {
		emoticons = JSON.parse(fs.readFileSync('config/emoticons.json', 'utf8'));
		emoteRegex = [];
		for (let emote in emoticons) {
			emoteRegex.push(escapeRegExp(emote));
		}
		emoteRegex = new RegExp('(' + emoteRegex.join('|') + ')', 'g');
	} catch (e) {}
}
loadEmoticons();

function saveEmoticons() {
	fs.writeFileSync('config/emoticons.json', JSON.stringify(emoticons));
	emoteRegex = [];
	for (let emote in emoticons) {
		emoteRegex.push(emote);
	}
	emoteRegex = new RegExp('(' + emoteRegex.join('|') + ')', 'g');
}

function parseEmoticons(message, room) {
	if (emoteRegex.test(message)) {
		message = Server.parseMessage(message).replace(emoteRegex, function (match) {
			return '<img src="' + emoticons[match] + '" title="' + match + '" height="50" width="50">';
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
		this.parse('/emoticons ignore');
	},

	unblockemote: 'unignoreemotes',
	unblockemotes: 'unignoreemotes',
	unblockemoticon: 'unignoreemotes',
	unblockemoticons: 'unignoreemotes',
	unignoreemotes: function (target, room, user) {
		this.parse('/emoticons unignore');
	},

	emoticons: 'emoticon',
	emote: 'emoticon',
	emotes: 'emoticon',
<<<<<<< HEAD
	emoticon: function (target, room, user) {
		if (!target) target = 'help';
		let parts = target.split(',');
		for (let u in parts) parts[u] = parts[u].trim();

		switch (parts[0]) {
		case 'add':
			if (!this.can('roomowner')) return false;
			if (!parts[2]) return this.sendReply("Usage: /emoticon add, [name], [url] - Remember to resize the image first! (recommended 50x50)");
			if (emoticons[parts[1]]) return this.sendReply("\"" + parts[1] + "\" is already an emoticon.");
			emoticons[parts[1]] = parts[2];
			saveEmoticons();
			this.sendReply('|raw|The emoticon "' + Chat.escapeHTML(parts[1]) + '" has been added: <img src="' + parts[2] + '">');
			if (Rooms('upperstaff')) Rooms('upperstaff').add('|raw|' + Server.nameColor(user.name, true) + ' has added the emote "' + Chat.escapeHTML(parts[1]) +
				'": <img width="50" height="50" src="' + parts[2] + '">').update();
			Server.messageSeniorStaff('/html ' + Server.nameColor(user.name, true) + ' has added the emote "' + Chat.escapeHTML(parts[1]) +
				'": <img width="50" height="50" src="' + parts[2] + '">');
			break;

		case 'delete':
		case 'remove':
		case 'rem':
		case 'del':
			if (!this.can('roomowner')) return false;
			if (!parts[1]) return this.sendReply("Usage: /emoticon del, [name]");
			if (!emoticons[parts[1]]) return this.sendReply("The emoticon \"" + parts[1] + "\" does not exist.");
			delete emoticons[parts[1]];
			saveEmoticons();
			this.sendReply("The emoticon \"" + parts[1] + "\" has been removed.");
			break;
=======
	emoticon: {
		add: function (target, room, user) {
			if (!this.can(`ban`)) return false;
			if (!parts[2]) return this.sendReply(`Usage: /emoticon add, [name], [url] - Remember to resize the image first! (recommended 50x50)`);
			if (emoticons[parts[1]]) return this.sendReply(`"${parts[1]}" is already an emoticon.`);
			emoticons[parts[1]] = parts[2];
			saveEmoticons();

			let size = 50;
			let lobby = Rooms(`lobby`);
			if (lobby && lobby.emoteSize) size = lobby.emoteSize;
			if (room.emoteSize) size = room.emoteSize;

			this.sendReply(`|raw|The emoticon "${Chat.escapeHTML(parts[1])}" has been added: <img src="${parts[2]}">`);
			Rooms(`upperstaff`).add(`|raw|${Server.nameColor(user.name, true)} has added the emote "${Chat.escapeHTML(parts[1])}": <img width="${size}" height="${size}" src="${parts[2]}">`).update();
			Server.messageSeniorStaff(`/html ${Server.nameColor(user.name, true)} has added the emote "${Chat.escapeHTML(parts[1])}": <img width="${size}" height="${size}" src="${parts[2]}">`);
		},

		delete: "del",
		remove: "del",
		rem: "del",
		del: function (target, room, user) {
			if (!this.can(`ban`)) return false;
			if (!parts[1]) return this.sendReply(`Usage: /emoticon del, [name]`);
			if (!emoticons[parts[1]]) return this.sendReply(`The emoticon "${parts[1]}" does not exist.`);
			delete emoticons[parts[1]];
			saveEmoticons();
			this.sendReply(`The emoticon "${parts[1]}" has been removed.`);
		},
>>>>>>> aab900638057794f54a375fcdf97ef474902be8b

		on: "del",
		enable: "off",
		disable: "off",
		off: function (target, room, user) {
			if (!this.can('roommod', null, room)) return this.sendReply('Access denied.');
			let status = ((parts[0] !== 'enable' && parts[0] !== 'on'));
			if (room.disableEmoticons === status) return this.sendReply("Emoticons are already " + (status ? "disabled" : "enabled") + " in this room.");
			room.disableEmoticons = status;
			room.chatRoomData.disableEmoticons = status;
			Rooms.global.writeChatRoomData();
			this.privateModCommand('(' + user.name + ' ' + (status ? ' disabled ' : ' enabled ') + 'emoticons in this room.)');
		},

		view: "list",
		list: function (target, room, user) {
			if (!this.runBroadcast()) return;
<<<<<<< HEAD
			let reply = "<strong><u>Emoticons (" + Object.keys(emoticons).length + ")</u></strong><br />";
			for (let emote in emoticons) reply += "(" + emote + " <img src=\"" + emoticons[emote] + "\" height=\"50\" width=\"50\">) ";
			this.sendReply('|raw|<div class="infobox infobox-limited">' + reply + '</div>');
			break;

		case 'ignore':
			if (Server.ignoreEmotes[user.userid]) return this.errorReply("You are already ignoring emoticons.");
			Server.ignoreEmotes[user.userid] = true;
			fs.writeFileSync('config/ignoreemotes.json', JSON.stringify(Server.ignoreEmotes));
			this.sendReply("You are now ignoring emoticons.");
			break;

		case 'unignore':
			if (!Server.ignoreEmotes[user.userid]) return this.errorReply("You aren't ignoring emoticons.");
			delete Server.ignoreEmotes[user.userid];
			fs.writeFileSync('config/ignoreemotes.json', JSON.stringify(Server.ignoreEmotes));
			this.sendReply("You are no longer ignoring emoticons.");
			break;

		default:
		case 'help':
=======

			let size = 50;
			let lobby = Rooms('lobby');
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
			if (size > 100) return this.errorReply(`Size may not be more than 100.`);

			room.emoteSize = size;
			room.chatRoomData.emoteSize = size;
			Rooms.global.writeChatRoomData();
			this.addModCommand(`${user.name} has changed emoticon size in this room to ${size}`);
		},

		"": "help",
		help: function (target, room, user) {
>>>>>>> aab900638057794f54a375fcdf97ef474902be8b
			if (!this.runBroadcast()) return;
			this.sendReplyBox(
				"Emoticon Commands:<br />" +
				"<small>/emoticon may be substituted with /emoticons, /emotes, or /emote</small><br />" +
				"/emoticon add, [name], [url] - Adds an emoticon.<br />" +
				"/emoticon del/delete/remove/rem, [name] - Removes an emoticon.<br />" +
				"/emoticon enable/on/disable/off - Enables or disables emoticons in the current room.<br />" +
				"/emoticon view/list - Displays the list of emoticons.<br />" +
				"/emoticon ignore - Ignores emoticons in chat messages.<br />" +
				"/emoticon unignore - Unignores emoticons in chat messages.<br />" +
				"/emoticon help - Displays this help command.<br />" +
				"<a href=\"https://gist.github.com/jd4564/ef66ecc47c58b3bb06ec\">Emoticon Plugin by: jd</a>"
			);
		},
	},

	randemote: function (target, room, user, connection) {
		if (!this.canTalk()) return;
		let e = Object.keys(emoticons)[Math.floor(Math.random() * Object.keys(emoticons).length)];
		return this.parse(e);
	},
};

function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); // eslint-disable-line no-useless-escape
}
