'use strict';

const fs = require('fs');
const nani = require('nani').init("niisama1-uvake", "llbgsBx3inTdyGizCPMgExBVmQ5fU");
const https = require('https');
const http = require('http');
const Pokedex = require('../data/pokedex.js').BattlePokedex;
const request = require('request');

const bubbleLetterMap = new Map([
	['a', '\u24D0'], ['b', '\u24D1'], ['c', '\u24D2'], ['d', '\u24D3'], ['e', '\u24D4'], ['f', '\u24D5'], ['g', '\u24D6'], ['h', '\u24D7'], ['i', '\u24D8'], ['j', '\u24D9'], ['k', '\u24DA'], ['l', '\u24DB'], ['m', '\u24DC'],
	['n', '\u24DD'], ['o', '\u24DE'], ['p', '\u24DF'], ['q', '\u24E0'], ['r', '\u24E1'], ['s', '\u24E2'], ['t', '\u24E3'], ['u', '\u24E4'], ['v', '\u24E5'], ['w', '\u24E6'], ['x', '\u24E7'], ['y', '\u24E8'], ['z', '\u24E9'],
	['A', '\u24B6'], ['B', '\u24B7'], ['C', '\u24B8'], ['D', '\u24B9'], ['E', '\u24BA'], ['F', '\u24BB'], ['G', '\u24BC'], ['H', '\u24BD'], ['I', '\u24BE'], ['J', '\u24BF'], ['K', '\u24C0'], ['L', '\u24C1'], ['M', '\u24C2'],
	['N', '\u24C3'], ['O', '\u24C4'], ['P', '\u24C5'], ['Q', '\u24C6'], ['R', '\u24C7'], ['S', '\u24C8'], ['T', '\u24C9'], ['U', '\u24CA'], ['V', '\u24CB'], ['W', '\u24CC'], ['X', '\u24CD'], ['Y', '\u24CE'], ['Z', '\u24CF'],
	['1', '\u2460'], ['2', '\u2461'], ['3', '\u2462'], ['4', '\u2463'], ['5', '\u2464'], ['6', '\u2465'], ['7', '\u2466'], ['8', '\u2467'], ['9', '\u2468'], ['0', '\u24EA'],
]);

const asciiMap = new Map([
	['\u24D0', 'a'], ['\u24D1', 'b'], ['\u24D2', 'c'], ['\u24D3', 'd'], ['\u24D4', 'e'], ['\u24D5', 'f'], ['\u24D6', 'g'], ['\u24D7', 'h'], ['\u24D8', 'i'], ['\u24D9', 'j'], ['\u24DA', 'k'], ['\u24DB', 'l'], ['\u24DC', 'm'],
	['\u24DD', 'n'], ['\u24DE', 'o'], ['\u24DF', 'p'], ['\u24E0', 'q'], ['\u24E1', 'r'], ['\u24E2', 's'], ['\u24E3', 't'], ['\u24E4', 'u'], ['\u24E5', 'v'], ['\u24E6', 'w'], ['\u24E7', 'x'], ['\u24E8', 'y'], ['\u24E9', 'z'],
	['\u24B6', 'A'], ['\u24B7', 'B'], ['\u24B8', 'C'], ['\u24B9', 'D'], ['\u24BA', 'E'], ['\u24BB', 'F'], ['\u24BC', 'G'], ['\u24BD', 'H'], ['\u24BE', 'I'], ['\u24BF', 'J'], ['\u24C0', 'K'], ['\u24C1', 'L'], ['\u24C2', 'M'],
	['\u24C3', 'N'], ['\u24C4', 'O'], ['\u24C5', 'P'], ['\u24C6', 'Q'], ['\u24C7', 'R'], ['\u24C8', 'S'], ['\u24C9', 'T'], ['\u24CA', 'U'], ['\u24CB', 'V'], ['\u24CC', 'W'], ['\u24CD', 'X'], ['\u24CE', 'Y'], ['\u24CF', 'Z'],
	['\u2460', '1'], ['\u2461', '2'], ['\u2462', '3'], ['\u2463', '4'], ['\u2464', '5'], ['\u2465', '6'], ['\u2466', '7'], ['\u2467', '8'], ['\u2468', '9'], ['\u24EA', '0'],
]);

let amCache = {
	anime: {},
	manga: {},
};

let Reports = {};

let regdateCache = {};

Server.img = function (link, height, width) {
	if (!link) return '<font color="maroon">ERROR : You must supply a link.</font>';
	return '<img src="' + link + '"' + (height ? ' height="' + height + '"' : '') + (width ? ' width="' + width + '"' : '') + '/>';
};

Server.font = function (text, color, bold) {
	if (!text) return '<font color="maroon">ERROR : Please provide some text.</font>';
	return '<font color="' + (color ? color : 'black') + '">' + (bold ? '<strong>' : '') + text + (bold ? '</strong>' : '') + '</font>';
};

let urbanCache;
try {
	urbanCache = JSON.parse(fs.readFileSync('../config/udcache.json', 'utf8'));
} catch (e) {
	urbanCache = {};
}

function cacheUrbanWord(word, definition) {
	word = word.toLowerCase().replace(/ /g, '');
	urbanCache[word] = {
		"definition": definition,
		"time": Date.now(),
	};
	fs.writeFile('config/udcache.json', JSON.stringify(urbanCache));
}

function loadReports() {
	try {
		Reports = JSON.parse(fs.readFileSync('config/reports.json'));
	} catch (e) {
		Reports = {};
	}
}
loadReports();

function saveReports() {
	fs.writeFile('config/reports.json', JSON.stringify(Reports));
}

function getLinkId(msg) {
	msg = msg.split(' ');
	for (let i = 0; i < msg.length; i++) {
		if ((/youtu\.be/i).test(msg[i])) {
			let temp = msg[i].split('/');
			return temp[temp.length - 1];
		} else if ((/youtube\.com/i).test(msg[i])) {
			return msg[i].substring(msg[i].indexOf("=") + 1).replace(".", "");
		}
	}
}

function isDev(user) {
	if (!user) return;
	if (typeof user === 'object') user = user.userid;
	let dev = Db('devs').get(toId(user));
	if (dev === 1) return true;
	return false;
}

function parseStatus(text, encoding) {
	if (encoding) {
		text = text
			.split('')
			.map(char => bubbleLetterMap.get(char))
			.join('');
	} else {
		text = text
			.split('')
			.map(char => asciiMap.get(char))
			.join('');
	}
	return text;
}

function postAds() {
	if (Rooms.global.ads.length > 0) {
		let ad = Rooms.global.ads.shift();
		Rooms('lobby').addRaw('<div class="infobox"><a href="/' + ad["room"] + '" class="ilink"><font color="#04B404"> Advertisement <strong>' + ad["room"] + '</strong>:</font> ' + ad["message"] + '</a>  -' + ad["user"] + '</div>');
		Rooms('lobby').update();
	}
}

let monData;
try {
	monData = fs.readFileSync("data/ssb-data.txt").toString().split("\n\n");
} catch (e) {
	console.error(e);
}

function getMonData(target) {
	let returnData = null;
	monData.forEach(function (data) {
		if (toId(data.split("\n")[0].split(" - ")[0] || " ") === target) {
			returnData = data.split("\n").map(function (line) {
				return Chat.escapeHTML(line);
			}).join("<br />");
		}
	});
	return returnData;
}

function clearRoom(room) {
	let len = (room.log && room.log.length) || 0;
	let users = [];
	while (len--) {
		room.log[len] = '';
	}
	for (let u in room.users) {
		users.push(u);
		Users(u).leaveRoom(room, Users(u).connections[0]);
	}
	len = users.length;
	setTimeout(() => {
		while (len--) {
			Users(users[len]).joinRoom(room, Users(users[len]).connections[0]);
		}
	}, 1000);
}

Server.regdate = function (target, callback) {
	target = toId(target);
	if (regdateCache[target]) return callback(regdateCache[target]);
	let options = {
		host: 'pokemonshowdown.com',
		port: 80,
		path: '/users/' + target + '.json',
		method: 'GET',
	};
	http.get(options, function (res) {
		let data = '';
		res.on('data', function (chunk) {
			data += chunk;
		}).on('end', function () {
			data = JSON.parse(data);
			let date = data['registertime'];
			if (date !== 0 && date.toString().length < 13) {
				while (date.toString().length < 13) {
					date = Number(date.toString() + '0');
				}
			}
			if (date !== 0) {
				regdateCache[target] = date;
				saveRegdateCache();
			}
			callback((date === 0 ? false : date));
		});
	});
};

function loadRegdateCache() {
	try {
		regdateCache = JSON.parse(fs.readFileSync('config/regdate.json', 'utf8'));
	} catch (e) {}
}
loadRegdateCache();

function saveRegdateCache() {
	fs.writeFileSync('config/regdate.json', JSON.stringify(regdateCache));
}

exports.commands = {
	useroftheweek: 'uotw',
	uotw: function (target, room, user) {
		if (toId(target.length) >= 19) return this.errorReply("Usernames have to be 18 characters or less");
		if (!this.can('mute', null, room)) return false;
		if (!room.chatRoomData) return;
		if (!target) {
			if (!this.runBroadcast()) return;
			if (!room.chatRoomData.user) return this.sendReplyBox("The User of the Week has not been set.");
			return this.sendReplyBox(
				"The current <strong>User of the Week</strong>  is: " + Server.nameColor(room.chatRoomData.user, true)
			);
		}
		if (!this.can('lock', null, room)) return false;
		if (target === 'off' || target === 'disable' || target === 'reset') {
			if (!room.chatRoomData.user) return this.sendReply("The User of the Week has already been reset.");
			delete room.chatRoomData.user;
			this.sendReply("The User of the Week was reset by " + Server.nameColor(user.name, true) + ".");
			this.logModCommand(user.name + " reset the User of the Week.");
			Rooms.global.writeChatRoomData();
			return;
		}
		room.chatRoomData.user = Chat.escapeHTML(target);
		Rooms.global.writeChatRoomData();
		room.addRaw(
			"<div class=\"broadcast-green\"><strong>The User of the Week is: " + Server.nameColor(room.chatRoomData.user, true) + ".</strong></div>"
		);
		this.logModCommand(Chat.escapeHTML(user.name) + " updated the User of the Week to \"" + room.chatRoomData.user + "\".");
	},
	useroftheweekhelp: 'uotwhelp',
	uotwhelp: [
		"/uotw - View the current User of the Week",
		"/uotw [user] - Set the User of the Week. Requires: % or higher.",
	],

	etour: function (target) {
		if (!target) return this.parse("/help etour");
		this.parse("/tour create " + target + ", elimination");
	},
	etourhelp: ["/etour [format] - Creates an elimination tournament."],

	rtour: function (target) {
		if (!target) return this.parse("/help rtour");
		this.parse("/tour create " + target + ", roundrobin");
	},
	rtourhelp: ["/rtour [format] - Creates a round robin tournament."],

	autovoice: 'autorank',
	autodriver: 'autorank',
	automod: 'autorank',
	autoowner: 'autorank',
	autopromote: 'autorank',
	autorank: function (target, room, user, cmd) {
		switch (cmd) {
		case 'autovoice':
			target = '+';
			break;
		case 'autodriver':
			target = '%';
			break;
		case 'automod':
			target = '@';
			break;
		case 'autoowner':
			target = '#';
			break;
		}

		if (!target) return this.sendReply("Usage: /autorank [rank] - Automatically promotes user to the specified rank when they join the room.");
		if (!this.can('roommod', null, room)) return false;
		if (room.isPersonal) return this.sendReply('Autorank is not currently a feature in groupchats.');
		target = target.trim();

		if (target === 'off' && room.autorank) {
			delete room.autorank;
			delete room.chatRoomData.autorank;
			Rooms.global.writeChatRoomData();
			for (let u in room.users) Users(u).updateIdentity();
			return this.privateModCommand("(" + user.name + " has disabled autorank in this room.)");
		}
		if (room.autorank && room.autorank === target) return this.sendReply("Autorank is already set to \"" + target + "\".");

		if (Config.groups[target] && !Config.groups[target].globalonly) {
			if (target === '#' && user.userid !== room.founder) return this.sendReply("You can't set autorank to # unless you're the room founder.");
			room.autorank = target;
			room.chatRoomData.autorank = target;
			Rooms.global.writeChatRoomData();
			for (let u in room.users) Users(u).updateIdentity();
			return this.privateModCommand("(" + user.name + " has set autorank to \"" + target + "\" in this room.)");
		}
		return this.sendReply("Group \"" + target + "\" not found.");
	},
	bonus: 'dailybonus',
	checkbonus: 'dailybonus',
	dailybonus: function (user) {
		let nextBonus = Date.now() - Db('DailyBonus').get(user.userid, [1, Date.now()])[1];
		if ((86400000 - nextBonus) <= 0) return Server.giveDailyReward(user.userid, user);
		return this.sendReply('Your next bonus is ' + (Db('DailyBonus').get(user.userid, [1, Date.now()])[0] === 8 ? 7 : Db('DailyBonus').get(user.userid, [1, Date.now()])[0]) + ' ' + (Db('DailyBonus').get(user.userid, [1, Date.now()])[0] === 1 ? moneyName : moneyPlural) + ' in ' + Chat.toDurationString(Math.abs(86400000 - nextBonus)));
	},
	sota: function () {
		return this.parse('feelssotafeelstinitinitinisotalove');
	},

	'!define': true,
	def: 'define',
	define: function (target, room) {
		if (!target) return this.parse('/help define');
		target = toId(target);
		if (target > 50) return this.errorReply("Word can not be longer than 50 characters.");
		if (!this.runBroadcast()) return;
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to speak.");

		let options = {
			url: 'http://api.wordnik.com:80/v4/word.json/' + target + '/definitions?limit=3&sourceDictionaries=all' +
				'&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
		};

		let self = this;

		function callback(error, response, body) {
			if (!error && response.statusCode === 200) {
				let page = JSON.parse(body);
				let output = "<font color=#24678d><strong>Definitions for " + target + ":</strong></font><br />";
				if (!page[0]) {
					self.sendReplyBox("No results for <strong>\"" + target + "\"</strong>.");
					return room.update();
				} else {
					let count = 1;
					for (let u in page) {
						if (count > 3) break;
						output += "(<strong>" + count + "</strong>) " + Chat.escapeHTML(page[u]['text']) + "<br />";
						count++;
					}
					self.sendReplyBox(output);
					return room.update();
				}
			}
		}
		request(options, callback);
	},
	definehelp: ["/define [word] - Shows the definition of a word."],

	'!ud': true,
	u: 'ud',
	urbandefine: 'ud',
	ud: function (target, room) {
		if (!target) return this.parse('/help ud');
		if (target.toString().length > 50) return this.errorReply("Phrase cannot be longer than 50 characters.");
		if (!this.runBroadcast()) return;
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to speak.");

		let options = {
			url: 'http://www.urbandictionary.com/iphone/search/define',
			term: target,
			headers: {
				'Referer': 'http://m.urbandictionary.com',
			},
			qs: {
				'term': target,
			},
		};

		if (urbanCache[target.toLowerCase().replace(/ /g, '')] && Math.round(Math.abs((urbanCache[target.toLowerCase().replace(/ /g, '')].time - Date.now()) / (24 * 60 * 60 * 1000))) < 31) {
			return this.sendReplyBox("<strong>" + Chat.escapeHTML(target) + ":</strong> " + urbanCache[target.toLowerCase().replace(/ /g, '')].definition.substr(0, 400));
		}

		let self = this;

		function callback(error, response, body) {
			if (!error && response.statusCode === 200) {
				let page = JSON.parse(body);
				let definitions = page['list'];
				if (page['result_type'] === 'no_results') {
					self.sendReplyBox("No results for <strong>\"" + Chat.escapeHTML(target) + "\"</strong>.");
					return room.update();
				} else {
					if (!definitions[0]['word'] || !definitions[0]['definition']) {
						self.sendReplyBox("No results for <strong>\"" + Chat.escapeHTML(target) + "\"</strong>.");
						return room.update();
					}
					let output = "<strong>" + Chat.escapeHTML(definitions[0]['word']) + ":</strong> " + Chat.escapeHTML(definitions[0]['definition']).replace(/\r\n/g, '<br />').replace(/\n/g, ' ');
					if (output.length > 400) output = output.slice(0, 400) + '...';
					cacheUrbanWord(target, Chat.escapeHTML(definitions[0]['definition']).replace(/\r\n/g, '<br />').replace(/\n/g, ' '));
					self.sendReplyBox(output);
					return room.update();
				}
			}
		}
		request(options, callback);
	},
	udhelp: ["/urbandefine [phrase] - Shows the urban definition of the phrase. If you don't put in a phrase, it will show you a random phrase from urbandefine."],

	rf: 'roomfounder',
	roomfounder: function (target, room, user) {
		if (!room.chatRoomData) {
			return this.sendReply("/roomfounder - This room isn't designed for per-room moderation to be added");
		}
		if (!target) return this.parse('/help roomfounder');
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		let name = this.targetUsername;
		let userid = toId(name);

		if (!Users.isUsernameKnown(userid)) {
			return this.errorReply(`User '${this.targetUsername}' is offline and unrecognized, and so can't be promoted.`);
		}

		if (!this.can('makeroom')) return false;

		if (!room.auth) room.auth = room.chatRoomData.auth = {};

		room.auth[userid] = '#';
		room.chatRoomData.founder = userid;
		room.founder = userid;
		this.addModCommand(`${name} was appointed Room Founder by ${user.name}.`);
		if (targetUser) {
			targetUser.popup(`|html|You were appointed Room Founder by ${Server.nameColor(user.name, true)} in ${room.title}.`);
			room.onUpdateIdentity(targetUser);
		}
		Rooms.global.writeChatRoomData();
	},
	roomfounderhelp: ["/roomfounder [username] - Appoints [username] as a room founder. Requires: & ~"],

	deroomfounder: 'roomdefounder',
	roomdefounder: function (target, room) {
		if (!room.chatRoomData) {
			return this.sendReply("/roomdefounder - This room isn't designed for per-room moderation.");
		}
		if (!target) return this.parse('/help roomdefounder');
		if (!this.can('makeroom')) return false;
		let targetUser = toId(target);
		if (room.founder !== targetUser) return this.errorReply(targetUser + ' is not the room founder of ' + room.title + '.');
		room.founder = false;
		room.chatRoomData.founder = false;
		return this.parse('/roomdeauth ' + target);
	},
	roomdefounderhelp: ["/roomdefounder [username] - Revoke [username]'s room founder position. Requires: &, ~"],

	roomowner: function (target, room, user) {
		if (!room.chatRoomData) {
			return this.sendReply("/roomowner - This room isn't designed for per-room moderation to be added");
		}
		if (!target) return this.parse('/help roomowner');
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		let name = this.targetUsername;
		let userid = toId(name);

		if (!Users.isUsernameKnown(userid)) {
			return this.errorReply(`User '${this.targetUsername}' is offline and unrecognized, and so can't be promoted.`);
		}

		if (!user.can('makeroom')) {
			if (user.userid !== room.founder) return false;
		}

		if (!room.auth) room.auth = room.chatRoomData.auth = {};

		room.auth[userid] = '#';
		this.addModCommand(`${name} was appointed Room Owner by ${user.name}.`);
		if (targetUser) {
			targetUser.popup(`|html|You were appointed Room Owner by ${Server.nameColor(user.name, true)} in ${room.title}.`);
			room.onUpdateIdentity(targetUser);
		}
		Rooms.global.writeChatRoomData();
	},
	roomownerhelp: ["/roomowner [username] - Appoints [username] as a room owner. Requires: & ~"],

	roomdeowner: 'deroomowner',
	deroomowner: function (target, room, user) {
		if (!room.auth) {
			return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
		}
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		let name = this.targetUsername;
		let userid = toId(name);
		if (!userid || userid === '') return this.sendReply("User '" + name + "' does not exist.");

		if (room.auth[userid] !== '#') return this.sendReply("User '" + name + "' is not a room owner.");
		if (!room.founder || user.userid !== room.founder && !this.can('makeroom', null, room)) return false;

		delete room.auth[userid];
		this.sendReply("(" + name + " is no longer Room Owner.)");
		if (targetUser) targetUser.updateIdentity();
		if (room.chatRoomData) {
			Rooms.global.writeChatRoomData();
		}
	},

	roomleader: function (target, room, user) {
		if (!room.chatRoomData) {
			return this.sendReply("/roomowner - This room isn't designed for per-room moderation to be added");
		}
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;

		if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");

		if (!room.founder) return this.sendReply('The room needs a room founder before it can have a room owner.');
		if (room.founder !== user.userid && !this.can('makeroom')) return this.sendReply('/roomowner - Access denied.');

		if (!room.auth) room.auth = room.chatRoomData.auth = {};

		let name = targetUser.name;

		room.auth[targetUser.userid] = '&';
		this.addModCommand("" + name + " was appointed Room Leader by " + user.name + ".");
		room.onUpdateIdentity(targetUser);
		Rooms.global.writeChatRoomData();
	},

	roomdeleader: 'deroomowner',
	deroomleader: function (target, room, user) {
		if (!room.auth) {
			return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
		}
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		let name = this.targetUsername;
		let userid = toId(name);
		if (!userid || userid === '') return this.sendReply("User '" + name + "' does not exist.");

		if (room.auth[userid] !== '&') return this.sendReply("User '" + name + "' is not a room leader.");
		if (!room.founder || user.userid !== room.founder && !this.can('makeroom', null, room)) return false;

		delete room.auth[userid];
		this.sendReply("(" + name + " is no longer Room Leader.)");
		if (targetUser) targetUser.updateIdentity();
		if (room.chatRoomData) {
			Rooms.global.writeChatRoomData();
		}
	},

	anime: function (target, room) {
		if (!this.runBroadcast()) return;
		if (!target) return this.errorReply("No target.");
		let targetAnime = Chat.escapeHTML(target.trim());
		let id = targetAnime.toLowerCase().replace(/ /g, '');
		if (amCache.anime[id]) return this.sendReply('|raw|' + amCache.anime[id]);

		nani.get('anime/search/' + targetAnime)
			.then(data => {
				if (data[0].adult) {
					return this.errorReply('Nsfw content is not allowed.');
				}
				nani.get('anime/' + data[0].id)
					.then(data => {
						let css = 'text-shadow: 1px 1px 1px #CCC; padding: 3px 8px;';
						let output = '<div class="infobox"><table width="100%"><tr>';
						let description = data.description.replace(/(\r\n|\n|\r)/gm, "").split('<br><br>').join('<br>');
						if (description.indexOf('&lt;br&gt;&lt;br&gt;') >= 0) description = description.substr(0, description.indexOf('&lt;br&gt;&lt;br&gt;'));
						if (description.indexOf('<br>') >= 0) description = description.substr(0, description.indexOf('<br>'));
						output += '<td style="' + css + ' background: rgba(170, 165, 215, 0.5); box-shadow: 2px 2px 5px rgba(170, 165, 215, 0.8); border: 1px solid rgba(170, 165, 215, 1); border-radius: 5px; color: #2D2B40; text-align: center; font-size: 15pt;"><strong>' + data.title_romaji + '</strong></td>';
						output += '<td rowspan="6"><img src="' + data.image_url_lge + '" height="320" width="225" alt="' + data.title_romaji + '" title="' + data.title_romaji + '" style="float: right; border-radius: 10px; box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.5), 1px 1px 2px rgba(255, 255, 255, 0.5) inset;" /></td></tr>';
						output += '<tr><td style="' + css + '"><strong>Genre(s): </strong>' + data.genres + '</td></tr>';
						output += '<tr><td style="' + css + '"><strong>Air Date: </strong>' + data.start_date.substr(0, 10) + '</td></tr><tr>';
						output += '<tr><td style="' + css + '"><strong>Status: </strong>' + data.airing_status + '</td></tr>';
						output += '<tr><td style="' + css + '"><strong>Episode Count: </strong>' + data.total_episodes + '</td></tr>';
						output += '<tr><td style="' + css + '"><strong>Rating: </strong> ' + data.average_score + '/100</td></tr>';
						output += '<tr><td colspan="2" style="' + css + '"><strong>Description: </strong>' + description + '</td></tr>';
						output += '</table></div>';
						amCache.anime[id] = output;
						this.sendReply('|raw|' + output);
						room.update();
					});
			})
			.catch(error => {
				return this.errorReply("Anime not found.");
			});
	},
	manga: function (target, room) {
		if (!this.runBroadcast()) return;
		if (!target) return this.errorReply("No target.");
		let targetAnime = Chat.escapeHTML(target.trim());
		let id = targetAnime.toLowerCase().replace(/ /g, '');
		if (amCache.anime[id]) return this.sendReply('|raw|' + amCache.anime[id]);

		nani.get('manga/search/' + targetAnime)
			.then(data => {
				nani.get('manga/' + data[0].id)
					.then(data => {
						let css = 'text-shadow: 1px 1px 1px #CCC; padding: 3px 8px;';
						let output = '<div class="infobox"><table width="100%"><tr>';
						for (let i = 0; i < data.genres.length; i++) {
							if (/(Hentai|Yaoi|Ecchi)/.test(data.genres[i])) return this.errorReply('Nsfw content is not allowed.');
						}
						let description = data.description.replace(/(\r\n|\n|\r)/gm, " ").split('<br><br>').join('<br>');
						if (description.indexOf('&lt;br&gt;&lt;br&gt;') >= 0) description = description.substr(0, description.indexOf('&lt;br&gt;&lt;br&gt;'));
						if (description.indexOf('<br>') >= 0) description = description.substr(0, description.indexOf('<br>'));
						output += '<td style="' + css + ' background: rgba(170, 165, 215, 0.5); box-shadow: 2px 2px 5px rgba(170, 165, 215, 0.8); border: 1px solid rgba(170, 165, 215, 1); border-radius: 5px; color: #2D2B40; text-align: center; font-size: 15pt;"><strong>' + data.title_romaji + '</strong></td>';
						output += '<td rowspan="6"><img src="' + data.image_url_lge + '" height="320" width="225" alt="' + data.title_romaji + '" title="' + data.title_romaji + '" style="float: right; border-radius: 10px; box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.5), 1px 1px 2px rgba(255, 255, 255, 0.5) inset;" /></td></tr>';
						output += '<tr><td style="' + css + '"><strong>Genre(s): </strong>' + data.genres + '</td></tr>';
						output += '<tr><td style="' + css + '"><strong>Release Date: </strong>' + data.start_date.substr(0, 10) + '</td></tr><tr>';
						output += '<tr><td style="' + css + '"><strong>Status: </strong>' + data.publishing_status + '</td></tr>';
						output += '<tr><td style="' + css + '"><strong>Chapter Count: </strong>' + data.total_chapters + '</td></tr>';
						output += '<tr><td style="' + css + '"><strong>Rating: </strong> ' + data.average_score + '/100</td></tr>';
						output += '<tr><td colspan="2" style="' + css + '"><strong>Description: </strong>' + description + '</td></tr>';
						output += '</table></div>';
						amCache.manga[id] = output;
						this.sendReply('|raw|' + output);
						room.update();
					});
			})
			.catch(error => {
				return this.errorReply("Anime not found.");
			});
	},

	hc: function () {
		return this.parse('/hotpatch chat');
	},

	hf: function () {
		return this.parse('/hotpatch formats');
	},

	hb: function () {
		return this.parse('/hotpatch battles');
	},

	hv: function () {
		return this.parse('/hotpatch validator');
	},
	complain: 'requesthelp',
	report: 'requesthelp',
	requesthelp: function (target, user) {
		if (user.can('lock')) return this.parse('/reports ' + (target || ''));
		if (!this.canTalk()) return this.errorReply("You can't use this command while unable to speak.");
		if (!target) return this.sendReply("/requesthelp [message] - Requests help from " + Config.serverName + "global authorities. Please be specific in your situation.");
		if (target.length < 1) return this.sendReply("/requesthelp [message] - Requests help from " + Config.serverName + "global authorities. Please be specific in your situation.");

		let reportId = (Object.keys(Reports).length + 1);
		let d = new Date();
		let MonthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December",
		];
		console.log(reportId);
		while (Reports[reportId]) reportId--;
		Reports[reportId] = {};
		Reports[reportId].reporter = user.name;
		Reports[reportId].message = target.trim();
		Reports[reportId].id = reportId;
		Reports[reportId].status = 'Pending';
		Reports[reportId].reportTime = MonthNames[d.getUTCMonth()] + ' ' + d.getUTCDate() + "th, " + d.getUTCFullYear() + ", " + (d.getUTCHours() < 10 ? "0" + d.getUTCHours() : d.getUTCHours()) + ":" + (d.getUTCMinutes() < 10 ? "0" + d.getUTCMinutes() : d.getUTCMinutes()) + " UTC";
		saveReports();
		Monitor.log('A new report has been submitted by ' + user.name + '. ID: ' + reportId + ' Message: ' + target.trim());
		return this.sendReply("Your report has been sent to Server global authorities..");
	},

	reports: function (target, user, cmd) {
		if (!user.can('lock')) return this.errorReply('/reports - Access denied.');
		if (!target) target = '';
		target = target.trim();

		let id;
		let cmdParts = target.split(' ');
		cmd = cmdParts.shift().trim().toLowerCase();
		let params = cmdParts.join(' ').split(',').map(function (param) {
			return param.trim();
		});
		switch (cmd) {
		case '':
		case 'view':
			if (!this.runBroadcast()) return;
			let output = '|raw|<table border="1" cellspacing ="0" cellpadding="3"><tr><th>ID</th><th>Reporter</th><th>Message</th><th>Report Time</th><th>Status</th></tr>';
			for (let u in Object.keys(Reports)) {
				let currentReport = Reports[Object.keys(Reports)[u]];
				let date = currentReport.reportTime;
				output += '<tr><td>' + currentReport.id + '</td><td>' + Chat.escapeHTML(currentReport.reporter) + '</td><td>' +
					Chat.escapeHTML(currentReport.message) + '</td><td>' + date + ' </td><td>' + (currentReport.status === 'Pending' ? '<font color=#ff9900>Pending</font>' : (~currentReport.status.indexOf('Accepted by') ? '<font color=green>' + Chat.escapeHTML(currentReport.status) + '</font>' : Chat.escapeHTML(currentReport.status))) + '</td></tr>';
			}
			this.sendReply(output);
			break;
		case 'accept':
			if (params.length < 1) return this.errorReply("Usage: /reports accept [id]");
			id = params.shift();
			if (!Reports[id]) return this.errorReply("There's no report with that id.");
			if (Reports[id].status !== 'Pending') return this.errorReply("That report isn't pending staff.");
			Reports[id].status = "Accepted by " + user.name;
			saveReports();
			if (Users(Reports[id].reporter) && Users(Reports[id].reporter).connected) {
				Users(Reports[id].reporter).popup("Your report has been accepted by " + user.name);
			}
			this.sendReply("You've accepted the report by " + Reports[id].reporter);
			Monitor.log(user.name + " accepted the report by " + Reports[id].reporter + ". (ID: " + id + ")");
			break;
		case 'decline':
		case 'deny':
			if (params.length < 1) return this.errorReply("Usage: /reports deny [id]");
			id = params.shift();
			if (!Reports[id]) return this.errorReply("There's no report with that id.");
			if (Reports[id].status !== 'Pending') return this.errorReply("That report isn't pending staff.");
			if (Users(Reports[id].reporter) && Users(Reports[id].reporter).connected) {
				Users(Reports[id].reporter).popup("|modal|" + "Your report has been denied by " + user.name);
			}
			this.sendReply("You've denied the report by " + Reports[id].reporter);
			Monitor.log(user.name + " denied the report by " + Reports[id].reporter + ". (ID: " + id + ")");
			delete Reports[id];
			saveReports();
			break;
		case 'del':
		case 'delete':
			if (params.length < 1) return this.errorReply("Usage: /reports delete [id]");
			id = params.shift();
			if (!Reports[id]) return this.errorReply("There's no report with that id.");
			Monitor.log(user.name + " deleted the report by " + Reports[id].reporter + ". (ID: " + id + ")");
			delete Reports[id];
			saveReports();
			this.sendReply("That report has been deleted.");
			break;
		case 'help':
			if (!this.runBroadcast()) return;
			this.sendReplyBox("Report commands: <br />" +
				"/report [message] - Adds a report to the system<br />" +
				"/reports view - Views all current reports<br />" +
				"/reports accept [id] - Accepts a report<br />" +
				"/reports delete [id] - Deletes a report<br />" +
				"/reports deny [id] - Denies a report"
			);
			break;
		default:
			this.parse('/reports help');
		}
	},
	dev: {
		give: function (target, user) {
			if (!this.can('hotpatch')) return false;
			if (!target) return this.parse('/help', true);
			let devUsername = toId(target);
			if (devUsername.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
			if (isDev(devUsername)) return this.errorReply(devUsername + " is already a DEV user.");
			Db('devs').set(devUsername, 1);
			this.sendReply('|html|' + Server.nameColor(devUsername, true) + " has been given DEV status.");
			if (Users.get(devUsername)) Users(devUsername).popup("|html|You have been given DEV status by " + Server.nameColor(user.name, true) + ".");
		},
		take: function (target, user) {
			if (!this.can('hotpatch')) return false;
			if (!target) return this.parse('/help', true);
			let devUsername = toId(target);
			if (devUsername.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
			if (!isDev(devUsername)) return this.errorReply(devUsername + " isn't a DEV user.");
			Db('devs').delete(devUsername);
			this.sendReply("|html|" + Server.nameColor(devUsername, true) + " has been demoted from DEV status.");
			if (Users.get(devUsername)) Users(devUsername).popup("|html|You have been demoted from DEV status by " + Server.nameColor(user.name, true) + ".");
		},
		users: 'list',
		list: function () {
			if (!Db('devs').keys().length) return this.errorReply('There seems to be no user with DEV status.');
			let display = [];
			Db('devs').keys().forEach(devUser => {
				display.push(Server.nameColor(devUser, (Users(devUser) && Users(devUser).connected)));
			});
			this.popupReply('|html|<strong><u><font size="3"><center>DEV Users:</center></font></u></strong>' + display.join(','));
		},
		'': 'help',
		help: function () {
			this.sendReplyBox(
				'<div style="padding: 3px 5px;"><center>' +
				'<code>/dev</code> commands.<br />These commands are nestled under the namespace <code>dev</code>.</center>' +
				'<hr width="100%">' +
				'<code>give [username]</code>: Gives <code>username</code> DEV status. Requires: & ~' +
				'<br />' +
				'<code>take [username]</code>: Takes <code>username</code>\'s DEV status. Requires: & ~' +
				'<br />' +
				'<code>list</code>: Shows list of users with DEV Status' +
				'</div>'
			);
		},
	},
	afk: 'away',
	busy: 'away',
	work: 'away',
	working: 'away',
	eating: 'away',
	sleep: 'away',
	sleeping: 'away',
	gaming: 'away',
	nerd: 'away',
	nerding: 'away',
	mimis: 'away',
	away: function (target, room, user, connection, cmd) {
		if (!user.isAway && user.name.length > 19 && !user.can('lock')) return this.sendReply("Your username is too long for any kind of use of this command.");
		if (!this.canTalk()) return false;
		target = toId(target);
		if (/^\s*$/.test(target)) target = 'away';
		if (cmd !== 'away') target = cmd;
		let newName = user.name;
		let status = parseStatus(target, true);
		let statusLen = status.length;
		if (statusLen > 14) return this.sendReply("Your away status should be short and to-the-point, not a dissertation on why you are away.");

		if (user.isAway) {
			let statusIdx = newName.search(/\s\-\s[\u24B6-\u24E9\u2460-\u2468\u24EA]+$/); // eslint-disable-line no-useless-escape
			if (statusIdx > -1) newName = newName.substr(0, statusIdx);
			if (user.name.substr(-statusLen) === status) return this.sendReply("Your away status is already set to \"" + target + "\".");
		}

		newName += ' - ' + status;
		if (newName.length > 18 && !user.can('lock')) return this.sendReply("\"" + target + "\" is too long to use as your away status.");

		// forcerename any possible impersonators
		let targetUser = Users.getExact(user.userid + target);
		if (targetUser && targetUser !== user && targetUser.name === user.name + ' - ' + target) {
			targetUser.resetName();
			targetUser.send("|nametaken||Your name conflicts with " + user.name + (user.name.substr(-1) === "s" ? "'" : "'s") + " new away status.");
		}

		if (user.can('mute', null, room)) this.add("|raw|-- " + Server.nameColor(user.name, true) + " is now " + target.toLowerCase() + ".");
		if (user.can('lock')) this.parse('/hide');
		user.forceRename(newName, user.registered);
		user.updateIdentity();
		user.isAway = true;
	},
	awayhelp: ["/away [message] - Sets a user's away status."],

	back: function (target, room, user) {
		if (!user.isAway) return this.sendReply("You are not set as away.");
		user.isAway = false;

		let newName = user.name;
		let statusIdx = newName.search(/\s\-\s[\u24B6-\u24E9\u2460-\u2468\u24EA]+$/); // eslint-disable-line no-useless-escape
		if (statusIdx < 0) {
			user.isAway = false;
			if (user.can('mute', null, room)) this.add("|raw|-- " + Server.nameColor(user.userid, true) + " is no longer away.");
			return false;
		}

		let status = parseStatus(newName.substr(statusIdx + 3), false);
		newName = newName.substr(0, statusIdx);
		user.forceRename(newName, user.registered);
		user.updateIdentity();
		user.isAway = false;
		if (user.can('mute', null, room)) this.add("|raw|-- " + Server.nameColor(user.userid, true) + " is no longer " + status.toLowerCase() + ".");
		if (user.can('lock')) this.parse('/show');
	},
	backhelp: ["/back - Sets a users away status back to normal."],

	'!essb': true,
	essb: function (target) {
		if (!this.runBroadcast()) return false;
		if (!target || target === 'help') return this.parse('/help essb');
		if (target === 'credits') return this.parse('/essbcredits');
		let targetData = getMonData(toId(target));
		if (!targetData) return this.errorReply("The staffmon '" + toId(target) + "' could not be found.");
		return this.sendReplyBox(targetData);
	},

	essbhelp: function () {
		if (!this.runBroadcast()) return;
		return this.sendReplyBox("/essb [staff member's name] - displays data for a staffmon's movepool, custom move, and custom ability.");
	},

	essbcredits: function (user) {
		let popup = "|html|" + "<font size=5 color=#000080><u><strong>ESSB Credits</strong></u></font><br />" +
			"<br />" +
			"<u><strong>Programmers:</u></strong><br />" +
			"- " + Server.nameColor('Insist', true) + " (Head Developer, Idea, Balancer, Concepts, Entries.)<br />" +
			"- " + Server.nameColor('Lycanium Z', true) + " (Assistant Developer)<br />" +
			"- " + Server.nameColor('Back At My Day', true) + " (Entries, Developments.)<br />" +
			"<u><strong>Special Thanks:</strong></u><br />" +
			"- Our Staff Members for their cooperation in making this.<br />";
		user.popup(popup);
	},
	'!dub': true,
	dub: 'dubtrack',
	music: 'dubtrack',
	radio: 'dubtrack',
	dubtrackfm: 'dubtrack',
	dubtrack: function (room) {
		if (!this.runBroadcast()) return;
		let nowPlaying = "";
		let options = {
			host: 'api.dubtrack.fm',
			port: 443,
			path: '/room/exiled_147873230374424',
			method: 'GET',
		};
		https.get(options, res => {
			let data = '';
			res.on('data', chunk => {
				data += chunk;
			}).on('end', () => {
				if (data.charAt(0) === '{') {
					data = JSON.parse(data);
					if (data['data'] && data['data']['currentSong']) nowPlaying = "<br /><strong>Now Playing:</strong> " + Chat.escapeHTML(data['data']['currentSong'].name);
				}
				this.sendReplyBox('Join our dubtrack.fm room <a href="https://www.dubtrack.fm/join/exiled_147873230374424">here!</a>' + nowPlaying);
				room.update();
			});
		});
	},
	'!youtube': true,
	yt: 'youtube',
	youtube: function (target, room) {
		if (!this.runBroadcast()) return false;
		if (!target) return false;
		let params_spl = target.split(' '), g = ' ';
		for (let i = 0; i < params_spl.length; i++) {
			g += '+' + params_spl[i];
		}
		g = g.substr(1);

		let reqOpts = {
			hostname: 'www.googleapis.com',
			method: 'GET',
			path: '/youtube/v3/search?part=snippet&q=' + g + '&type=video&key=AIzaSyA4fgl5OuqrgLE1B7v8IWYr3rdpTGkTmns',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		let self = this;
		let data = '';
		let req = require('https').request(reqOpts, function (res) {
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on('end', function (chunk) {
				let d = JSON.parse(data);
				if (d.pageInfo.totalResults === 0) {
					room.add('No videos found');
					room.update();
					return false;
				}
				let id = getLinkId(target);
				const image = '<button style="background: none; border: none;"><img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg?custom=true&w=168&h=94&stc=true&jpg444=true&jpgq=90&sp=68&sigh=tbq7TDTjFXD_0RtlFUMGz-k3JiQ" height="180" width="180"></button>';
				self.sendReplyBox('<center>' + image + '<br><a href="https://www.youtube.com/watch?v=' + d.items[0].id.videoId + '"><strong> ' + d.items[0].snippet.title + '</strong></center>');
				room.update();
			});
		});
		req.end();
	},

	clearall: function (target, room, user) {
		if (!this.can('declare')) return false;
		if (room.battle) return this.sendReply("You cannot clearall in battle rooms.");

		clearRoom(room);

		this.privateModCommand(`(${user.name} used /clearall.)`);
	},

	gclearall: 'globalclearall',
	globalclearall: function (user) {
		if (!this.can('gdeclare')) return false;

		Rooms.rooms.forEach(room => clearRoom(room));
		Users.users.forEach(user => user.popup('All rooms have been cleared.'));
		this.privateModCommand(`(${user.name} used /globalclearall.)`);
	},

	'!roompromote': true,
	roomdemote: 'roompromote',
	roompromote: function (target, room, user, cmd) {
		if (!room) {
			// this command isn't marked as room-only because it's usable in PMs through /invite
			return this.errorReply("This command is only available in rooms");
		}
		if (!room.auth) {
			this.sendReply("/roompromote - This room isn't designed for per-room moderation");
			return this.sendReply("Before setting room staff, you need to set a room owner with /roomowner");
		}
		if (!this.canTalk()) return;
		if (!target) return this.parse('/help roompromote');

		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		let userid = toId(this.targetUsername);
		let name = targetUser ? targetUser.name : this.targetUsername;

		if (!userid) return this.parse('/help roompromote');
		if (!targetUser && !Users.isUsernameKnown(userid)) {
			return this.errorReply(`User '${name}' is offline and unrecognized, and so can't be promoted.`);
		}
		if (targetUser && !targetUser.registered) {
			return this.errorReply(`User '${name}' is unregistered, and so can't be promoted.`);
		}

		let currentGroup = room.getAuth({userid, group: (Users.usergroups[userid] || ' ').charAt(0)});
		let nextGroup = target;
		if (target === 'deauth') nextGroup = Config.groupsranking[0];
		if (!nextGroup) {
			return this.errorReply("Please specify a group such as /roomvoice or /roomdeauth");
		}
		if (!Config.groups[nextGroup]) {
			return this.errorReply(`Group '${nextGroup}' does not exist.`);
		}

		if (Config.groups[nextGroup].globalonly || (Config.groups[nextGroup].battleonly && !room.battle)) {
			return this.errorReply(`Group 'room${Config.groups[nextGroup].id}' does not exist as a room rank.`);
		}

		let groupName = Config.groups[nextGroup].name || "regular user";
		if ((room.auth[userid] || Config.groupsranking[0]) === nextGroup) {
			return this.errorReply(`User '${name}' is already a ${groupName} in this room.`);
		}
		if (!user.can('makeroom')) {
			if (currentGroup !== ' ' && !user.can('room' + (Config.groups[currentGroup] ? Config.groups[currentGroup].id : 'voice'), null, room)) {
				if (user.userid !== room.founder) return this.errorReply(`/${cmd} - Access denied for promoting/demoting from ${(Config.groups[currentGroup] ? Config.groups[currentGroup].name : "an undefined group")}.`);
			}
			if (nextGroup !== ' ' && !user.can('room' + Config.groups[nextGroup].id, null, room)) {
				return this.errorReply(`/${cmd} - Access denied for promoting/demoting to ${Config.groups[nextGroup].name}.`);
			}
		}
		let nextGroupIndex = Config.groupsranking.indexOf(nextGroup) || 1; // assume voice if not defined (although it should be by now)
		if (targetUser && targetUser.locked && !room.isPrivate && !room.battle && !room.isPersonal && nextGroupIndex >= 2) {
			return this.errorReply("Locked users can't be promoted.");
		}

		if (nextGroup === Config.groupsranking[0]) {
			delete room.auth[userid];
		} else {
			room.auth[userid] = nextGroup;
		}
		if (room.founder === userid && nextGroup !== '#') room.founder = false; //Must be a demotion as

		// Only show popup if: user is online and in the room, the room is public, and not a groupchat or a battle.
		let needsPopup = targetUser && room.users[targetUser.userid] && !room.isPrivate && !room.isPersonal && !room.battle;

		if (this.pmTarget && targetUser) {
			const text = `${targetUser.name} was invited (and promoted to Room ${groupName}) by ${user.name}`;
			room.add(`|c|${user.getIdentity(room)}|/log ${text}`).update();
			room.modlog(text);
		} else if (nextGroup in Config.groups && currentGroup in Config.groups && Config.groups[nextGroup].rank < Config.groups[currentGroup].rank) {
			if (targetUser && room.users[targetUser.userid] && !Config.groups[nextGroup].modlog) {
				// if the user can't see the demotion message (i.e. rank < %), it is shown in the chat
				targetUser.send(">" + room.id + "\n(You were demoted to Room " + groupName + " by " + user.name + ".)");
			}
			this.privateModCommand(`(${name} was demoted to Room ${groupName} by ${user.name}.)`);
			if (needsPopup) targetUser.popup(`|html|You were demoted to Room ${groupName} by ${Server.nameColor(user.name, true)} in ${room.title}.`);
		} else if (nextGroup === '#') {
			this.addModCommand(`${'' + name} was promoted to ${groupName} by ${user.name}.`);
			if (needsPopup) targetUser.popup(`|html|You were promoted to ${groupName} by ${Server.nameColor(user.name, true)} in ${room.title}.`);
		} else {
			this.addModCommand(`${'' + name} was promoted to Room ${groupName} by ${user.name}.`);
			if (needsPopup) targetUser.popup(`|html|You were promoted to Room ${groupName} by ${Server.nameColor(user.name, true)} in ${room.title}.`);
		}

		if (targetUser) targetUser.updateIdentity(room.id);
		if (room.chatRoomData) Rooms.global.writeChatRoomData();
	},
	roompromotehelp: [
		"/roompromote OR /roomdemote [username], [group symbol] - Promotes/demotes the user to the specified room rank. Requires: @ * # & ~",
		"/room[group] [username] - Promotes/demotes the user to the specified room rank. Requires: @ * # & ~",
		"/roomdeauth [username] - Removes all room rank from the user. Requires: @ * # & ~",
	],

	'!regdate': true,
	regdate: function (target, user) {
		if (!target) target = user.name;
		target = toId(target);
		if (target.length < 1 || target.length > 19) {
			return this.sendReply("Usernames can not be less than one character or longer than 19 characters. (Current length: " + target.length + ".)");
		}
		if (!this.runBroadcast()) return;
		Server.regdate(target, date => {
			if (date) {
				this.sendReplyBox(regdateReply(date));
			}
		});

		function regdateReply(date) {
			if (date === 0) {
				return Server.nameColor(target, true) + " <strong><font color='red'>is not registered.</font></strong>";
			} else {
				let d = new Date(date);
				let MonthNames = ["January", "February", "March", "April", "May", "June",
					"July", "August", "September", "October", "November", "December",
				];
				let DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
				return Server.nameColor(target, true) + " was registered on <strong>" + DayNames[d.getUTCDay()] + ", " + MonthNames[d.getUTCMonth()] + ' ' + d.getUTCDate() + ", " + d.getUTCFullYear() + "</strong> at <strong>" + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds() + " UTC.</strong>";
			}
			//room.update();
		}
	},
	regdatehelp: ["/regdate - Gets the regdate (register date) of a username."],

	'!seen': true,
	seen: function (target) {
		if (!this.runBroadcast()) return;
		if (!target) return this.parse('/help seen');
		let targetUser = Users.get(target);
		if (targetUser && targetUser.connected) return this.sendReplyBox(Server.nameColor(targetUser.name, true) + " is <strong><font color='limegreen'>Currently Online</strong></font>.");
		target = Chat.escapeHTML(target);
		let seen = Db('seen').get(toId(target));
		if (!seen) return this.sendReplyBox(Server.nameColor(target, true) + " has <strong><font color='red'>never been online</font></strong> on this server.");
		this.sendReplyBox(Server.nameColor(target, true) + " was last seen <strong>" + Chat.toDurationString(Date.now() - seen, {precision: true}) + "</strong> ago.");
	},
	seenhelp: ["/seen - Shows when the user last connected on the server."],

	'!m8b': true,
	helixfossil: 'm8b',
	helix: 'm8b',
	magic8ball: 'm8b',
	m8b: function () {
		if (!this.runBroadcast()) return;
		let results = ['Signs point to yes.', 'Yes.', 'Reply hazy, try again.', 'Without a doubt.', 'My sources say no.', 'As I see it, yes.', 'You may rely on it.', 'Concentrate and ask again.', 'Outlook not so good.', 'It is decidedly so.', 'Better not tell you now.', 'Very doubtful.', 'Yes - definitely.', 'It is certain.', 'Cannot predict now.', 'Most likely.', 'Ask again later.', 'My reply is no.', 'Outlook good.', 'Don\'t count on it.'];
		return this.sendReplyBox(results[Math.floor(Math.random() * results.length)]);
	},

	randp: function (target) {
		if (!this.runBroadcast()) return;
		let shinyPoke = "";
		let x;
		if (/shiny/i.test(target)) shinyPoke = "-shiny";
		if (/kanto/i.test(target) || /gen 1/i.test(target)) {
			x = Math.floor(Math.random() * (174 - 1));
		} else if (/johto/i.test(target) || /gen 2/i.test(target)) {
			x = Math.floor(Math.random() * (281 - 173)) + 172;
		} else if (/hoenn/i.test(target) || /gen 3/i.test(target)) {
			x = Math.floor(Math.random() * (444 - 280)) + 279;
		} else if (/sinnoh/i.test(target) || /gen 4/i.test(target)) {
			x = Math.floor(Math.random() * (584 - 443)) + 442;
		} else if (/kalos/i.test(target) || /gen 5/i.test(target)) {
			x = Math.floor(Math.random() * (755 - 583)) + 582;
		} else if (/unova/i.test(target) || /gen 6/i.test(target)) {
			x = Math.floor(Math.random() * (834 - 752)) + 751;
		}
		x = x || Math.floor(Math.random() * (856 - 1));
		let tarPoke = Object.keys(Pokedex)[x];
		let pokeData = Pokedex[tarPoke];
		let pokeId = pokeData.species.toLowerCase();
		pokeId = pokeId.replace(/^basculinbluestriped$/i, "basculin-bluestriped").replace(/^pichuspikyeared$/i, "pichu-spikyeared").replace(/^floetteeternalflower$/i, "floette-eternalflower");
		if (pokeId === "pikachu-cosplay") pokeId = ["pikachu-belle", "pikachu-phd", "pikachu-libre", "pikachu-popstar", "pikachu-rockstar"][~~(Math.random() * 6)];
		let spriteLocation = "http://play.pokemonshowdown.com/sprites/bw" + shinyPoke + "/" + pokeId + ".png";
		let missingnoSprites = ["http://cdn.bulbagarden.net/upload/9/98/Missingno_RB.png", "http://cdn.bulbagarden.net/upload/0/03/Missingno_Y.png", "http://cdn.bulbagarden.net/upload/a/aa/Spr_1b_141_f.png", "http://cdn.bulbagarden.net/upload/b/bb/Spr_1b_142_f.png", "http://cdn.bulbagarden.net/upload/9/9e/Ghost_I.png"];
		if (pokeId === "missingno") spriteLocation = missingnoSprites[~~(Math.random() * 5)];

		function getTypeFormatting(types) {
			let text = [];
			for (let i = 0; i < types.length; i++) {
				text.push("<img src=\"http://play.pokemonshowdown.com/sprites/types/" + types[i] + ".png\" width=\"32\" height=\"14\">");
			}
			return text.join(" / ");
		}
		this.sendReplyBox("<table><tr><td><img src=\"" + spriteLocation + "\" height=\"96\" width=\"96\"></td><td><strong>Name: </strong>" + pokeData.species + "<br/><strong>Type(s): </strong>" + getTypeFormatting(pokeData.types) + "<br/><strong>" + (Object.values(pokeData.abilities).length > 1 ? "Abilities" : "Ability") + ": </strong>" + Object.values(pokeData.abilities).join(" / ") + "<br/><strong>Stats: </strong>" + Object.values(pokeData.baseStats).join(" / ") + "<br/><strong>Colour: </strong><font color=\"" + pokeData.color + "\">" + pokeData.color + "</font><br/><strong>Egg Group(s): </strong>" + pokeData.eggGroups.join(", ") + "</td></tr></table>");
	},

	'!digidex': true,
	dd: 'digidex',
	dg: 'digidex',
	digidex: function (target) {
		if (!this.runBroadcast()) return;
		if (!target) return this.parse("/help digidex");
		if (this.broadcasting) {
			this.parse("!dt " + target + ", digimon");
		} else {
			this.parse("/dt " + target + ", digimon");
		}
	},
	digidexhelp: ["/digidex [Digimon] - Checks for a Digimon's data from Digimon Showdown."],

	randomsurvey: 'randsurvey',
	randsurvey: function () {
		let results = [
			"/survey create What do you want to see added or updated in " + Config.serverName + "?",
			"/survey create What's your most memorable experience on " + Config.serverName + "?",
			"/survey create How much time do you spend on " + Config.serverName + " daily?",
			"/survey create What is your favorite custom mechanic on " + Config.serverName + "?",
			"/survey create Was" + Config.serverName + " your first Pokemon Showdown side-server?", //5
			"/survey create Do you like the league system?",
			"/survey create Do you like the idea of us adding custom megas on " + Config.serverName + " that you can use in regular formats? (OU, UU, Ubers, Etc)",
			"/survey create What was your worst experience so far on " + Config.serverName + "?",
			"/survey create What's your favorite food?",
			"/survey create What's your favorite activity on a hot summer day?", //10
			"/survey create What's your favorite drink",
			"/survey create What's your favorite color?",
			"/survey create What's the most embarrassing thing that's ever happened to you in real life?",
			"/survey create Have you ever been banned/locked on main? (play.pokemonshowdown.com)",
			"/survey create Do you want to see more events on " + Config.serverName + "?", //15
		];
		return this.parse(results[Math.floor(Math.random() * results.length)]);
	},

	clearroomauth: function (target, room, user, cmd) {
		if (!this.can('declare') && room.founder !== user.userid) return this.errorReply("/clearroomauth - Access denied.");
		if (!room.auth) return this.errorReply("Room does not have roomauth.");
		let parts = target.split(',');
		let count;
		cmd = parts[0].trim().toLowerCase();
		if (!target) {
			this.errorReply("You must specify a roomauth group you want to clear.");
			return;
		}
		switch (target) {
		case 'voice':
			count = 0;
			for (let userid in room.auth) {
				if (room.auth[userid] === '+') {
					delete room.auth[userid];
					count++;
					if (userid in room.users) room.users[userid].updateIdentity(room.id);
				}
			}
			if (!count) return this.sendReply("(This room has zero roomvoices)");
			if (room.chatRoomData) Rooms.global.writeChatRoomData();
			this.addModCommand("All " + count + " roomvoices have been cleared by " + user.name + ".");
			break;
		case 'roomplayer':
			count = 0;
			for (let userid in room.auth) {
				if (room.auth[userid] === '\u2605') {
					delete room.auth[userid];
					count++;
					if (userid in room.users) room.users[userid].updateIdentity(room.id);
				}
			}
			if (!count) return this.sendReply("(This room has zero roomplayers)");
			if (room.chatRoomData) Rooms.global.writeChatRoomData();
			this.addModCommand("All " + count + " roomplayers have been cleared by " + user.name + ".");
			break;
		case 'driver':
			count = 0;
			for (let userid in room.auth) {
				if (room.auth[userid] === '%') {
					delete room.auth[userid];
					count++;
					if (userid in room.users) room.users[userid].updateIdentity(room.id);
				}
			}
			if (!count) return this.sendReply("(This room has zero drivers)");
			if (room.chatRoomData) Rooms.global.writeChatRoomData();
			this.addModCommand("All " + count + " drivers have been cleared by " + user.name + ".");
			break;
		case 'mod':
			count = 0;
			for (let userid in room.auth) {
				if (room.auth[userid] === '@') {
					delete room.auth[userid];
					count++;
					if (userid in room.users) room.users[userid].updateIdentity(room.id);
				}
			}
			if (!count) return this.sendReply("(This room has zero mods)");
			if (room.chatRoomData) Rooms.global.writeChatRoomData();
			this.addModCommand("All " + count + " mods have been cleared by " + user.name + ".");
			break;
		case 'roomleader':
			count = 0;
			for (let userid in room.auth) {
				if (room.auth[userid] === '&') {
					delete room.auth[userid];
					count++;
					if (userid in room.users) room.users[userid].updateIdentity(room.id);
				}
			}
			if (!count) return this.sendReply("(This room has zero room leaders)");
			if (room.chatRoomData) Rooms.global.writeChatRoomData();
			this.addModCommand("All " + count + " room leaders have been cleared by " + user.name + ".");
			break;
		case 'roomowner':
			count = 0;
			for (let userid in room.auth) {
				if (room.auth[userid] === '#') {
					delete room.auth[userid];
					count++;
					if (userid in room.users) room.users[userid].updateIdentity(room.id);
				}
			}
			if (!count) return this.sendReply("(This room has zero roomowners)");
			if (room.chatRoomData) Rooms.global.writeChatRoomData();
			this.addModCommand("All " + count + " roomowners have been cleared by " + user.name + ".");
			break;
		case 'all':
			if (!room.auth) return this.errorReply("This room has no auth.");
			delete room.auth;
			if (room.chatRoomData) Rooms.global.writeChatRoomData();
			this.addModCommand("All roomauth has been cleared by " + user.name + ".");
			break;
		default:
			return this.sendReply("The group specified does not exist.");
		}
	},

	declaregreen: 'declarered',
	declarered: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help declare');
		if (!this.can('declare', null, room)) return false;
		if (!this.canTalk() && !user.can('bypassall')) return this.errorReply("You cannot do this while unable to talk.");
		room.addRaw('<div class="broadcast-' + cmd.substr(7) + '"><strong>' + target + '</strong></div>');
		room.update();
		this.room.modlog(user.name + ' declared ' + target);
	},

	cgdeclare: 'customgdeclare',
	customgdeclare: function (target, room, user) {
		let parts = target.split(',');
		if (!target) return this.parse('/help customgdeclare');
		if (!parts[4]) return this.parse('/help customgdeclare');
		if (!this.can('gdeclare')) return false;
		for (let id in Rooms.rooms) {
			if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-blue" style="border-radius: 5px;"><strong>We are hosting a <font color="#57194A"><strong>' + parts[0] + '</strong></font> in <button name="send" value="/join ' + parts[1] + '" style="border-radius: 3px; margin: 3px; padding: 2px 5px; font-weight: bold; font-style: italic; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.35); color: #57194A; text-shadow: none;">' + parts[1] + '</button> !<br />The tier is <font style="color: #57194A; font-weight: bold;"><strong>' + parts[2] + '</strong></font>! Join up and have fun!<br /><br />The prize for the winner is <font style="color: #57194A; font-weight: bold;"><strong>' + parts[3] + '</strong></font> bucks, while the runner-up will get <font style="color: #57194A; font-weight: bold;"><strong>' + parts[4] + '</strong></font> bucks!<br /><small><i>~' + user.name + '</i></small></strong></div>');
		}
		this.room.modlog(user.name + " globally custom declared " + target);
	},
	customgdeclarehelp: ["/customgdeclare [event name], [room], [tier], [buck reward], [runner-up buck reward] - Preset gdeclare which anonymously announces a message to every room on the server. Requires: &, ~"],

	fj: 'forcejoin',
	forcejoin: function (target, room, user) {
		if (!user.can('lock')) return false;
		if (!target) return this.parse('/help forcejoin');
		let parts = target.split(',');
		if (!parts[0] || !parts[1]) return this.parse('/help forcejoin');
		let userid = toId(parts[0]);
		let roomid = toId(parts[1]);
		if (!Users.get(userid)) return this.sendReply("User not found.");
		if (!Rooms.get(roomid)) return this.sendReply("Room not found.");
		Users.get(userid).joinRoom(roomid);
	},
	forcejoinhelp: ["/forcejoin [target], [room] - Forces a user to join a room"],

	rk: 'kick',
	roomkick: 'kick',
	kick: function (target, room, user) {
		if (!target) return this.parse('/help kick');
		if (!this.canTalk() && !user.can('bypassall')) {
			return this.sendReply("You cannot do this while unable to talk.");
		}

		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (target.length > 300) return this.errorReply("The reason is too long. It cannot exceed 300 characters.");
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		if (!this.can('mute', targetUser, room)) return false;
		if (!room.users[targetUser.userid]) return this.errorReply("User \"" + this.targetUsername + "\" is not in this room.");

		this.addModCommand(targetUser.name + " was kicked from the room by " + user.name + ". (" + target + ")");
		targetUser.popup("You were kicked from " + room.id + " by " + user.name + ". (" + target + ")");
		targetUser.leaveRoom(room.id);
	},
	kickhelp: ["/kick [reason] - Kick a user out of a room [reasons are optional]. Requires: % @ # & ~"],

	kickall: function (target, room, user) {
		if (!this.can('declare')) return this.errorReply("/kickall - Access denied.");
		if (room.id === 'lobby') return this.errorReply("This command cannot be used in Lobby.");
		for (let i in room.users) {
			if (room.users[i] !== user.userid) {
				room.users[i].leaveRoom(room.id);
			}
		}
		this.privateModCommand('(' + Chat.escapeHTML(user.name) + 'kicked everyone from the room.');
	},

	sd: 'declaremod',
	staffdeclare: 'declaremod',
	modmsg: 'declaremod',
	moddeclare: 'declaremod',
	declaremod: function (target, room, user, connection) {
		if (!target) return this.parse('/help declaremod');
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");
		if (!this.can('receiveauthmessages', null, room)) return false;
		return this.privateModCommand('|raw|<div class="broadcast-red"><strong><font size=1><i>Private Auth (Driver +) declare from ' + Server.nameColor(user.name) + '<br /></i></font size>' + target + '</strong></div>');
	},
	declaremodhelp: ["/declaremod [note] - Adds a staff readable declare. Requires: % @ # & ~"],

	glogs: 'globallogs',
	globallogs: function (target, room, user) {
		return this.parse('/modlog all, ' + target);
	},

	roomlist: function (target, room, user) {
		let header = ['<strong><font color="#1aff1a" size="2">Total users connected: ' + Rooms.global.userCount + '</font></strong><br />'],
			official = ['<strong><font color="#ff9900" size="2"><u>Official Rooms:</u></font></strong><br />'],
			nonOfficial = ['<hr><strong><u><font color="#005ce6" size="2">Public Rooms:</font></u></strong><br />'],
			privateRoom = ['<hr><strong><u><font color="#ff0066" size="2">Private Rooms:</font></u></strong><br />'],
			groupChats = ['<hr><strong><u><font color="#00b386" size="2">Group Chats:</font></u></strong><br />'],
			battleRooms = ['<hr><strong><u><font color="#cc0000" size="2">Battle Rooms:</font></u></strong><br />'];

		let rooms = [];

		Rooms.rooms.forEach(curRoom => {
			if (curRoom.id !== 'global') rooms.push(curRoom.id);
		});

		rooms.sort();

		for (let u in rooms) {
			let curRoom = Rooms(rooms[u]);
			if (curRoom.type === 'battle') {
				battleRooms.push('<a href="/' + curRoom.id + '" class="ilink">' + Chat.escapeHTML(curRoom.title) + '</a> (' + curRoom.userCount + ')');
			}
			if (curRoom.type === 'chat') {
				if (curRoom.isPersonal) {
					groupChats.push('<a href="/' + curRoom.id + '" class="ilink">' + curRoom.id + '</a> (' + curRoom.userCount + ')');
					continue;
				}
				if (curRoom.isOfficial) {
					official.push('<a href="/' + toId(curRoom.title) + '" class="ilink">' + Chat.escapeHTML(curRoom.title) + '</a> (' + curRoom.userCount + ')');
					continue;
				}
				if (curRoom.isPrivate) {
					privateRoom.push('<a href="/' + toId(curRoom.title) + '" class="ilink">' + Chat.escapeHTML(curRoom.title) + '</a> (' + curRoom.userCount + ')');
					continue;
				}
			}
			if (curRoom.type !== 'battle') nonOfficial.push('<a href="/' + toId(curRoom.title) + '" class="ilink">' + curRoom.title + '</a> (' + curRoom.userCount + ')');
		}

		if (!user.can('roomowner')) return this.sendReplyBox(header + official.join(' ') + nonOfficial.join(' '));
		this.sendReplyBox(header + official.join(' ') + nonOfficial.join(' ') + privateRoom.join(' ') + (groupChats.length > 1 ? groupChats.join(' ') : '') + (battleRooms.length > 1 ? battleRooms.join(' ') : ''));
	},

	masspm: 'pmall',
	pmall: function (target, room, user) {
		if (!this.can('pmall')) return false;
		if (!target) return this.parse('/help pmall');

		let pmName = '~' + Config.serverName + ' Server';

		Users.users.forEach(function (user) {
			let message = '|pm|' + pmName + '|' + user.getIdentity() + '|' + target;
			user.send(message);
		});
	},
	pmallhelp: ["/pmall [message] - PM all users in the server."],

	staffpm: 'pmallstaff',
	pmstaff: 'pmallstaff',
	pmallstaff: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.parse('/help pmallstaff');

		let pmName = '~' + Config.serverName + ' Server';

		Users.users.forEach(function (user) {
			if (!user.isStaff) return;
			let message = '|pm|' + pmName + '|' + user.getIdentity() + '|' + target;
			user.send(message);
		});
	},
	pmallstaffhelp: ["/pmallstaff [message] - Sends a PM to every staff member online."],

	pmroom: 'rmall',
	roompm: 'rmall',
	rmall: function (target, room, user) {
		if (!this.can('declare', null, room)) return this.errorReply("/rmall - Access denied.");
		if (room.id === 'lobby') return this.errorReply("This command cannot be used in Lobby.");
		if (!target) return this.sendReply("/rmall [message] - Sends a pm to all users in the room.");
		target = target.replace(/<(?:.|\n)*?>/gm, '');

		let pmName = '~' + Config.serverName + ' Server';

		for (let i in room.users) {
			let message = '|pm|' + pmName + '|' + room.users[i].getIdentity() + '| ' + target;
			room.users[i].send(message);
		}
		this.privateModCommand('(' + Chat.escapeHTML(user.name) + ' mass PMd: ' + target + ')');
	},

	/*************************
	* Permalock / Permaban
	* for side servers
	* coded by HoeenHero
	**************************/

	forceofflinepermalock: 'permalock',
	offlinepermalock: 'permalock',
	forcepermalock: 'permalock',
	permalock: function (target, room, user, connection, cmd) {
		if (!this.can('lockdown')) return;
		if (!toId(target)) return this.parse('/help permalock');
		let tarUser = Users(target);
		if (!tarUser && (cmd !== 'offlinepermalock' && cmd !== 'forceofflinepermalock')) return this.errorReply('User ' + target + ' not found. If your sure you want to permalock them, use /offlinepermalock.');
		if (tarUser && (cmd === 'offlinepermalock' || cmd === 'forceofflinepermalock')) return this.parse('/permalock ' + target);
		if (cmd === 'offlinepermalock' || cmd === 'forceofflinepermalock') {
			target = toId(target);
			if (Db('perma').get(target, 0) === 5) return this.errorReply(target + ' is already permalocked.');
			if (Users.usergroups[target] && cmd !== 'forceofflinepermalock') return this.errorReply(target + ' is a trusted user. If your sure you want to permalock them, please use /forceofflinepermalock');
			Db('perma').set(target, 5);
			if (Users.usergroups[target]) {
				Users.setOfflineGroup(target, ' ');
				Monitor.log('[CrisisMonitor] Trusted user ' + target + ' was permalocked by ' + user.name + ' and was automatically demoted from ' + Users.usergroups[target].substr(0, 1) + '.');
			}
			Monitor.adminlog('[Perma Monitor] ' + user.name + ' has (offline) permalocked ' + target + '.');
			return this.addModCommand(target + ' was permalocked by ' + user.name + '.');
		}
		if (!tarUser.registered) return this.errorReply('Only registered users can be permalocked.');
		if (Db('perma').get(tarUser.userid, 0) >= 5) {
			if (Db('perma').get(tarUser.userid, 0) === 5) return this.errorReply(tarUser.name + ' is already permalocked.');
			if (cmd !== 'forcepermalock') return this.errorReply(tarUser.name + ' is permabanned and cannot be permalocked. If you want to change thier permaban to a permalock, please use /forcepermalock');
		}
		if (tarUser.trusted && cmd !== 'forcepermalock') return this.errorReply(tarUser.name + ' is a trusted user. If your sure you want to permalock them, please use /forcepermalock');
		Db('perma').set(tarUser.userid, 5);
		if (!Punishments.userids.get(tarUser.userid) || Punishments.userids.get(tarUser.userid)[0] !== 'BAN') Punishments.lock(tarUser, Date.now() + (1000 * 60 * 60 * 24 * 30), tarUser.userid, `Permalocked as ${tarUser.userid}`);
		tarUser.popup('You have been permalocked by ' + user.name + '.\nUnlike permalocks issued by the main server, this permalock only effects this server.');
		if (tarUser.trusted) Monitor.log('[CrisisMonitor] Trusted user ' + tarUser.userid + ' was permalocked by ' + user.name + ' and was automatically demoted from ' + tarUser.distrust() + '.');
		Monitor.adminlog('[Perma Monitor] ' + user.name + ' has permalocked ' + tarUser.name + '.');
		return this.addModCommand(tarUser.name + ' was permalocked by ' + user.name + '.');
	},
	permalockhelp: ['/permalock user - Permalock a user. Requires: ~'],

	unpermalock: function (target, room, user, connection, cmd) {
		if (!this.can('lockdown')) return;
		if (!toId(target)) return this.parse('/help unpermalock');
		target = toId(target);
		if (Db('perma').get(target, 0) < 5) return this.errorReply(target + ' is not permalocked.');
		if (Db('perma').get(target, 0) === 6) return this.errorReply(target + ' is permabanned. If you want to unpermaban them, use /unpermaban');
		Db('perma').set(target, 0);
		Punishments.unlock(target);
		if (Users(target)) Users(target).popup('Your permalock was lifted by ' + user.name + '.');
		Monitor.adminlog('[Perma Monitor] ' + user.name + ' has unpermalocked ' + target + '.');
		return this.addModCommand(target + ' was unpermalocked by ' + user.name + '.');
	},
	unpermalockhelp: ['/unpermalock user - Unpermalock a user. Requires: ~'],

	forceofflinepermaban: 'permaban',
	offlinepermaban: 'permaban',
	forcepermaban: 'permaban',
	permaban: function (target, room, user, connection, cmd) {
		if (!this.can('lockdown')) return;
		if (!toId(target)) return this.parse('/help permaban');
		let tarUser = Users(target);
		if (!tarUser && (cmd !== 'offlinepermaban' && cmd !== 'forceofflinepermaban')) return this.errorReply('User ' + target + ' not found. If your sure you want to permaban them, use /offlinepermaban.');
		if (tarUser && (cmd === 'offlinepermaban' || cmd === 'forceofflinepermaban')) return this.parse('/permaban ' + target);
		if (cmd === 'offlinepermaban' || cmd === 'forceofflinepermaban') {
			target = toId(target);
			if (Db('perma').get(target, 0) === 6) return this.errorReply(target + ' is already permabanned.');
			if (Users.usergroups[target] && cmd !== 'forceofflinepermaban') return this.errorReply(target + ' is a trusted user. If your sure you want to permaban them, please use /forceofflinepermaban');
			Db('perma').set(target, 6);
			if (Users.usergroups[target]) {
				Users.setOfflineGroup(target, ' ');
				Monitor.log('[CrisisMonitor] Trusted user ' + target + ' was permabanned by ' + user.name + ' and was automatically demoted from ' + Users.usergroups[target].substr(0, 1) + '.');
			}
			Monitor.adminlog('[Perma Monitor] ' + user.name + ' has (offline) permabanned ' + target + '.');
			return this.addModCommand(target + ' was permabanned by ' + user.name + '.');
		}
		if (!tarUser.registered) return this.errorReply('Only registered users can be permalocked.');
		if (Db('perma').get(tarUser.userid, 0) === 6) return this.errorReply(tarUser.name + ' is already permabanned.');
		if (tarUser.trusted && cmd !== 'forcepermaban') return this.errorReply(tarUser.name + ' is a trusted user. If your sure you want to permaban them, please use /forcepermaban');
		Db('perma').set(tarUser.userid, 6);
		tarUser.popup('You have been permabanned by ' + user.name + '.\nUnlike permabans issued by the main server, this permaban only effects this server.');
		Punishments.ban(tarUser, Date.now() + (1000 * 60 * 60 * 24 * 30), tarUser.userid, `Permabanned as ${tarUser.userid}`);
		if (tarUser.trusted) Monitor.log('[CrisisMonitor] Trusted user ' + tarUser.userid + ' was permabanned by ' + user.name + ' and was automatically demoted from ' + tarUser.distrust() + '.');
		Monitor.adminlog('[Perma Monitor] ' + user.name + ' has permabanned ' + tarUser.name + '.');
		return this.addModCommand(tarUser.name + ' was permabanned by ' + user.name + '.');
	},
	permabanhelp: ['/permaban user - Permaban a user. Requires: ~'],

	unpermaban: function (target, room, user, connection, cmd) {
		if (!this.can('lockdown')) return;
		if (!toId(target)) return this.parse('/help unpermaban');
		target = toId(target);
		if (Db('perma').get(target, 0) !== 6) return this.errorReply(target + ' is not permabanned.');
		Db('perma').set(target, 0);
		Punishments.unban(target);
		Monitor.adminlog('[Perma Monitor] ' + user.name + ' has unpermabanned ' + target + '.');
		return this.addModCommand(target + ' was unpermabanned by ' + user.name + '.');
	},
	unpermabanhelp: ['/unpermaban user - Unpermaban a user. Requires: ~'],

	timedgdeclare: function (target, room, user) {
		if (!target || !this.can('declare')) return this.errorReply("/help timedgdeclare");
		let parts = target.split(',');
		if (parts.length !== 2) return this.errorReply('/help timedgdeclare');
		let delayInMins = Chat.escapeHTML(parts[0].trim());
		if (isNaN(delayInMins)) return this.errorReply('Please give a delay in in minutes, /help timedgdeclare');
		delayInMins = delayInMins * 1000 * 60;
		let declare = this.canHTML(parts.slice(1).join(","));
		if (!declare) return;
		 setTimeout(f => {
			 for (let id in Rooms.rooms) {
				 if (id !== 'global' && Rooms.rooms[id].userCount > 3) Rooms.rooms[id].addRaw('<div class="broadcast-blue" style="border-radius: 5px; max-height: 300px; overflow-y: scroll;"><strong>' + declare + '</strong></div>');
			 }
		 }, delayInMins);
		this.room.modlog(toId(user) + 'scheduled a timed declare: ' + declare);
		return this.sendReply('Your declare has been scheduled.');
	},
	timedgdeclarehelp: ["/timedgdclare [delay in minutes], [declare] - Will declare something after a given delay. Requires: & ~"],

	ad: 'advertise',
	ads: 'advertise',
	advertise: function (target, room, user) {
		let parts = target.split(',');
		let cmd = parts[0].trim().toLowerCase();
		switch (cmd) {
		case 'enable':
			if (!this.can('declare')) return false;
			Rooms.global.adInterval = setInterval(postAds, 300000); //5 minutes
			this.sendReply("Ads have been enabled.");
			break;
		case 'disable':
			if (!this.can('declare')) return false;
			clearInterval(Rooms.global.adInterval);
			this.sendReply("Ads have been disabled.");
			break;
		case 'add':
			if (parts.length < 3) return this.errorReply("Invalid command. `/ads add, room, message`.");
			if (!Rooms.global.ads) Rooms.global.ads = [];
			let adIps = Rooms.global.ads.map(ad => ad.ip);
			for (let ip in user.ips) {
				if (adIps.indexOf(ip) >= 0) return this.errorReply("You already have an advertisement in the queue. Please wait for it to be broadcast before adding another one.");
			}
			let inputRoom = Chat.escapeHTML(parts[1]);
			let targetRoom = Rooms.search(inputRoom);
			if (!targetRoom || targetRoom === Rooms.global) return this.errorReply("The room '" + inputRoom + "' does not exist.");
			if (!this.can('ban', null, targetRoom)) return this.errorReply("You cannot advertise the room '" + targetRoom + "' because you are not staff in there.");
			let message = Chat.escapeHTML(parts.slice(2).join(","));
			Rooms.global.ads.push({ip: user.latestIp, user: toId(user), room: targetRoom, message: message});
			if (!Rooms.global.adInterval) {
				Rooms.global.adInterval = setInterval(postAds, 300000); //5 minutes
			}
			this.sendReply("Your message has been added to the advertisement queue. You're #" + Rooms.global.ads.length + ".");
			break;
		default:
			return this.errorReply("Invalid command. `/ads add, room, message`.");
		}
	},
};
