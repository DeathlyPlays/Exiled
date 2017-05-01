'use strict';

const fs = require('fs');
const nani = require('nani').init("niisama1-uvake", "llbgsBx3inTdyGizCPMgExBVmQ5fU");
let request = require('request');

let amCache = {
	anime: {},
	manga: {},
};

let Reports = {};

Exiled.customColors = {};

Exiled.img = function (link, height, width) {
	if (!link) return '<font color="maroon">ERROR : You must supply a link.</font>';
	return '<img src="' + link + '"' + (height ? ' height="' + height + '"' : '') + (width ? ' width="' + width + '"' : '') + '/>';
};

Exiled.font = function (text, color, bold) {
	if (!text) return '<font color="maroon">ERROR : Please provide some text.</font>';
	return '<font color="' + (color ? color : 'black') + '">' + (bold ? '<b>' : '') + text + (bold ? '</b>' : '') + '</font>';
};

Exiled.log = function (file, text) {
	if (!file) return '<font color="maroon">ERROR : No file specified!</font>';
	if (!text) return '<font color="maroon">ERROR : No text specified!</font>';
	fs.appendFile(file, text);
};

//Daily Rewards System for SpacialGaze by Lord Haji
Exiled.giveDailyReward = function (userid, user) {
	if (!user || !userid) return false;
	userid = toId(userid);
	if (!Db('DailyBonus').has(userid)) {
		Db('DailyBonus').set(userid, [1, Date.now()]);
		return false;
	}
	let lastTime = Db('DailyBonus').get(userid)[1];
	// Alt check
	let alts = Object.keys(user.prevNames).map(a => {return toId(a);});
	let longestWait = 0;
	for (let i = 0; i < alts.length; i++) {
		let cur = Db('DailyBonus').get(alts[i]);
		if (!cur) {
			alts.splice(i, 1);
			i--;
			continue;
		}
		if ((Date.now() - cur[1]) < 86400000 && cur[1] > longestWait) longestWait = cur[1];
	}
	if (longestWait > lastTime) lastTime = longestWait;
	alts.push(userid);
	if ((Date.now() - lastTime) < 86400000) {
		for (let i = 0; i < alts.length; i++) {
			Db('DailyBonus').set(alts[i], [Db('DailyBonus').get(alts[i])[0], lastTime]);
		}
		return false;
	}
	for (let i = 0; i < alts.length; i++) {
		if ((Date.now() - lastTime) >= 127800000) Db('DailyBonus').set(alts[i], [1, Date.now()]);
		if (Db('DailyBonus').get(alts[i])[0] <= 8) Db('DailyBonus').set(alts[i], [7, Date.now()]);
	}
	let reward = Db('DailyBonus').get(userid)[0];
	Economy.writeMoney(userid, reward);
	for (let i = 0; i < alts.length; i++) Db('DailyBonus').set(alts[i], [(Db('DailyBonus').get(alts[i])[0] + 1), Date.now()]);
	user.send('|popup||wide||html| <center><u><b><font size="3">Exiled Daily Bonus</font></b></u><br>You have been awarded ' + reward + ' Bucks.<br>' + showDailyRewardAni(reward) + '<br>Because you have connected to the server for the past ' + reward + ' Days.</center>');
};

function showDailyRewardAni(streak) {
	let output = '';
	for (let i = 1; i <= streak; i++) {
		output += "<img src='https://www.mukuru.com/media/img/icons/new_order.png' width='16' height='16'> ";
	}
	return output;
}

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

function isDev(user) {
	if (!user) return;
	if (typeof user === 'object') user = user.userid;
	let dev = Db('devs').get(toId(user));
	if (dev === 1) return true;
	return false;
}

exports.commands = {
	useroftheweek: 'uotw',
	uotw: function (target, room, user) {
		if (toId(target.length) >= 19) return this.errorReply("Usernames have to be 18 characters or less");
		if (!this.can('lock')) return false;
		if (!room.chatRoomData) return;
		if (!target) {
			if (!this.runBroadcast()) return;
			if (!room.chatRoomData.user) return this.sendReplyBox("The User of the Week has not been set.");
			return this.sendReplyBox(
				"The current <strong>User of the Week</strong>  is: " + room.chatRoomData.user
			);
		}
		if (!this.can('lock', null, room)) return false;
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
		"/uotw [user] - Set the User of the Week. Requires: % or higher.",
	],

	/* * * * * * * * * * * * *
	 *  Allow letious games  *
	 *  to be played in      *
	 *  unspecified rooms    *
	 *  by Insist		     *
	 * * * * * * * * * * * * */

	registerquestionws: 'registertrivia',
	registerqws: 'registertrivia',
	registerquestionworkshop: 'registertrivia',
	registertrivia: function (target, room, user) {
		if (!user.can('lock')) return this.errorReply("/registertrivia - Access denied");
		if (!target) return this.parse("/help registertrivia");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
		let targetRoom = Rooms(toId(target));
		targetRoom.add('|raw|<div class="broadcast-green"><b>' + user.name + ' has just added Trivia to this room.</b></div>');
		targetRoom.update();
		if (!targetRoom.isQuestionWorkshop) {
			targetRoom.isQuestionWorkshop = true;
			targetRoom.chatRoomData.isQuestionWorkshop = true;
			Rooms.global.writeChatRoomData();
		} else {
			this.errorReply("This room already is registered as a Trivia room.");
		}
	},
	registertriviahelp: ["/registertrivia [room] - Adds Trivia to a room. Requires % or higher."],

	deregistertrivia: function (target, room, user) {
		if (!user.can('lock')) return this.errorReply("/deregistertrivia - Access denied");
		if (!target) return this.parse("/help deregistertrivia");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
		let targetRoom = Rooms(toId(target));
		targetRoom.update();
		if (targetRoom.isQuestionWorkshop) {
			delete targetRoom.isQuestionWorkshop;
			delete targetRoom.chatRoomData.isQuestionWorkshop;
			Rooms.global.writeChatRoomData();
			this.sendReply("Trivia has been removed from this room.");
		} else {
			this.errorReply("This room is not registered as a Trivia room.");
		}
	},
	deregistertriviahelp: ["/deregistertrivia [room] - Removes Trivia from a room. Requires % or higher."],

	registerscavenger: function (target, room, user) {
		if (!user.can('lock')) return this.errorReply("/registerscavenger - Access denied");
		if (!target) return this.parse("/help registerscavenger");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
		let targetRoom = Rooms(toId(target));
		targetRoom.add('|raw|<div class="broadcast-green"><b>' + user.name + ' has just added Scavenger to this room.</b></div>');
		targetRoom.update();
		if (!targetRoom.isScavenger) {
			targetRoom.isScavenger = true;
			targetRoom.chatRoomData.isScavenger = true;
			Rooms.global.writeChatRoomData();
		} else {
			this.errorReply("This room already is registered as a Scavenger room.");
		}
	},
	registerscavengerhelp: ["/registerscavenger [room] - Adds Scavenger to a room. Requires % or higher."],

	deregisterscavenger: function (target, room, user) {
		if (!user.can('lock')) return this.errorReply("/deregisterscavenger - Access denied");
		if (!target) return this.parse("/help deregisterscavenger");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
		let targetRoom = Rooms(toId(target));
		targetRoom.update();
		if (targetRoom.isScavenger) {
			delete targetRoom.isScavenger;
			delete targetRoom.chatRoomData.isScavenger;
			Rooms.global.writeChatRoomData();
			this.sendReply("Scavenger has been removed from this room.");
		} else {
			this.errorReply("This room is not registered as a Scavenger room.");
		}
	},
	deregisterscavengerhelp: ["/deregisterscavenger [room] - Removes Scavenger from a room. Requires % or higher."],

	etour: function (target, room, user) {
		if (!target) return this.parse("/help etour");
		this.parse("/tour create " + target + ", elimination");
	},
	etourhelp: ["/etour [format] - Creates an elimination tournament."],

	rtour: function (target, room, user) {
		if (!target) return this.parse("/help rtour");
		this.parse("/tour create " + target + ", roundrobin");
	},
	rtourhelp: ["/rtour [format] - Creates a round robin tournament."],

	autovoice: 'autorank',
	autodriver: 'autorank',
	automod: 'autorank',
	autoowner: 'autorank',
	autopromote: 'autorank',
	autorank: function (target, room, user, connection, cmd) {
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
	dailybonus: function (target, room, user) {
		let nextBonus = Date.now() - Db('DailyBonus').get(user.userid, [1, Date.now()])[1];
		if ((86400000 - nextBonus) <= 0) return Exiled.giveDailyReward(user.userid, user);
		return this.sendReply('Your next bonus is ' + (Db('DailyBonus').get(user.userid, [1, Date.now()])[0] === 8 ? 7 : Db('DailyBonus').get(user.userid, [1, Date.now()])[0]) + ' ' + (Db('DailyBonus').get(user.userid, [1, Date.now()])[0] === 1 ? moneyName : moneyPlural) + ' in ' + Chat.toDurationString(Math.abs(86400000 - nextBonus)));
	},
	sota: function (room, user) {
		return this.parse('feelssota feelstini tinitini sotalove');
	},

	devs: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<div style="background-color: red ; border: pink solid 2px ; height: 100px"><center><img style="transform: scaleX(-1);" src="http://pldh.net/media/pokemon/gen5/blackwhite_animated_front/491.gif" height="84" width="95" align="left"><img src="http://i.imgur.com/PgQAAI1.png" height="74" width="250"><img src="http://pldh.net/media/pokemon/gen5/blackwhite_animated_front/491.gif" height="84" width="95" align="right"></center></div><table style="text-align: center ; background-color: Black ; border: Red solid 2px ; width: 100% ; border-collapse: collapse"><tbody><tr><td style="border: Red solid 2px ; color: White ; width: 22%"><img style="transform: scaleX(-1);" src="https://avatars2.githubusercontent.com/u/20971990?v=3&s=460" height="80" width="80"><br>Insist</td><td style="border: Red solid 2px ; color: White ; width: 22%"><img src="http://i.imgur.com/C3bFaZT.png" height="80" width="80"><br>Ninetales >n<</td><td style="border: Red solid 2px ; color: White ; width: 22%"><img style="transform: scaleX(-1);" src="https://files.graphiq.com/620/media/images/Volcanion_5208962.png" height="80" width="80"><br>Volco</td><td style="border: Red solid 2px ; color: White ; width: 22%"><img src="http://i.imgur.com/IXS2qYX.png" height="80" width="80"><br>HoeenHero</td></tr></tbody></table>');
	},
	devshelp: ["/devs - Shows the coders of the server."],

	def: 'define',
	define: function (target, room, user) {
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
				let output = "<font color=#24678d><b>Definitions for " + target + ":</b></font><br />";
				if (!page[0]) {
					self.sendReplyBox("No results for <b>\"" + target + "\"</b>.");
					return room.update();
				} else {
					let count = 1;
					for (let u in page) {
						if (count > 3) break;
						output += "(<b>" + count + "</b>) " + Chat.escapeHTML(page[u]['text']) + "<br />";
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

	u: 'ud',
	urbandefine: 'ud',
	ud: function (target, room, user, connection, cmd) {
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
			return this.sendReplyBox("<b>" + Chat.escapeHTML(target) + ":</b> " + urbanCache[target.toLowerCase().replace(/ /g, '')].definition.substr(0, 400));
		}

		let self = this;

		function callback(error, response, body) {
			if (!error && response.statusCode === 200) {
				let page = JSON.parse(body);
				let definitions = page['list'];
				if (page['result_type'] === 'no_results') {
					self.sendReplyBox("No results for <b>\"" + Chat.escapeHTML(target) + "\"</b>.");
					return room.update();
				} else {
					if (!definitions[0]['word'] || !definitions[0]['definition']) {
						self.sendReplyBox("No results for <b>\"" + Chat.escapeHTML(target) + "\"</b>.");
						return room.update();
					}
					let output = "<b>" + Chat.escapeHTML(definitions[0]['word']) + ":</b> " + Chat.escapeHTML(definitions[0]['definition']).replace(/\r\n/g, '<br />').replace(/\n/g, ' ');
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
			targetUser.popup(`|html|You were appointed Room Founder by ${Exiled.nameColor(user.name, true)} in ${room.title}.`);
			room.onUpdateIdentity(targetUser);
		}
		Rooms.global.writeChatRoomData();
	},
	roomfounderhelp: ["/roomfounder [username] - Appoints [username] as a room founder. Requires: & ~"],

	deroomfounder: 'roomdefounder',
	roomdefounder: function (target, room, user) {
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
			targetUser.popup(`|html|You were appointed Room Owner by ${Exiled.nameColor(user.name, true)} in ${room.title}.`);
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

	anime: function (target, room, user) {
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
						output += '<td style="' + css + ' background: rgba(170, 165, 215, 0.5); box-shadow: 2px 2px 5px rgba(170, 165, 215, 0.8); border: 1px solid rgba(170, 165, 215, 1); border-radius: 5px; color: #2D2B40; text-align: center; font-size: 15pt;"><b>' + data.title_romaji + '</b></td>';
						output += '<td rowspan="6"><img src="' + data.image_url_lge + '" height="320" width="225" alt="' + data.title_romaji + '" title="' + data.title_romaji + '" style="float: right; border-radius: 10px; box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.5), 1px 1px 2px rgba(255, 255, 255, 0.5) inset;" /></td></tr>';
						output += '<tr><td style="' + css + '"><b>Genre(s): </b>' + data.genres + '</td></tr>';
						output += '<tr><td style="' + css + '"><b>Air Date: </b>' + data.start_date.substr(0, 10) + '</td></tr><tr>';
						output += '<tr><td style="' + css + '"><b>Status: </b>' + data.airing_status + '</td></tr>';
						output += '<tr><td style="' + css + '"><b>Episode Count: </b>' + data.total_episodes + '</td></tr>';
						output += '<tr><td style="' + css + '"><b>Rating: </b> ' + data.average_score + '/100</td></tr>';
						output += '<tr><td colspan="2" style="' + css + '"><b>Description: </b>' + description + '</td></tr>';
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
	manga: function (target, room, user) {
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
						output += '<td style="' + css + ' background: rgba(170, 165, 215, 0.5); box-shadow: 2px 2px 5px rgba(170, 165, 215, 0.8); border: 1px solid rgba(170, 165, 215, 1); border-radius: 5px; color: #2D2B40; text-align: center; font-size: 15pt;"><b>' + data.title_romaji + '</b></td>';
						output += '<td rowspan="6"><img src="' + data.image_url_lge + '" height="320" width="225" alt="' + data.title_romaji + '" title="' + data.title_romaji + '" style="float: right; border-radius: 10px; box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.5), 1px 1px 2px rgba(255, 255, 255, 0.5) inset;" /></td></tr>';
						output += '<tr><td style="' + css + '"><b>Genre(s): </b>' + data.genres + '</td></tr>';
						output += '<tr><td style="' + css + '"><b>Release Date: </b>' + data.start_date.substr(0, 10) + '</td></tr><tr>';
						output += '<tr><td style="' + css + '"><b>Status: </b>' + data.publishing_status + '</td></tr>';
						output += '<tr><td style="' + css + '"><b>Chapter Count: </b>' + data.total_chapters + '</td></tr>';
						output += '<tr><td style="' + css + '"><b>Rating: </b> ' + data.average_score + '/100</td></tr>';
						output += '<tr><td colspan="2" style="' + css + '"><b>Description: </b>' + description + '</td></tr>';
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

	hc: function (room, user, cmd) {
		return this.parse('/hotpatch chat');
	},

	hf: function (room, user, cmd) {
		return this.parse('/hotpatch formats');
	},

	hb: function (room, user, cmd) {
		return this.parse('/hotpatch battles');
	},

	hv: function (room, user, cmd) {
		return this.parse('/hotpatch validator');
	},
	complain: 'requesthelp',
	report: 'requesthelp',
	requesthelp: function (target, room, user) {
		if (user.can('lock')) return this.parse('/reports ' + (target || ''));
		if (!this.canTalk()) return this.errorReply("You can't use this command while unable to speak.");
		if (!target) return this.sendReply("/requesthelp [message] - Requests help from Exiled global authorities. Please be specific in your situation.");
		if (target.length < 1) return this.sendReply("/requesthelp [message] - Requests help from Exiled global authorities. Please be specific in your situation.");

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
		Rooms('staff').add('A new report has been submitted by ' + user.name + '. ID: ' + reportId + ' Message: ' + target.trim());
		Rooms('staff').update();
		return this.sendReply("Your report has been sent to Exiled global authorities..");
	},

	reports: function (target, room, user, connection, cmd) {
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
			Rooms('staff').add(user.name + " accepted the report by " + Reports[id].reporter + ". (ID: " + id + ")");
			Rooms('staff').update();
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
			Rooms('staff').add(user.name + " denied the report by " + Reports[id].reporter + ". (ID: " + id + ")");
			Rooms('staff').update();
			delete Reports[id];
			saveReports();
			break;
		case 'del':
		case 'delete':
			if (params.length < 1) return this.errorReply("Usage: /reports delete [id]");
			id = params.shift();
			if (!Reports[id]) return this.errorReply("There's no report with that id.");
			Rooms('staff').add(user.name + " deleted the report by " + Reports[id].reporter + ". (ID: " + id + ")");
			Rooms('staff').update();
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
		give: function (target, room, user) {
			if (!this.can('declare')) return false;
			if (!target) return this.parse('/help', true);
			let devUsername = toId(target);
			if (devUsername.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
			if (isDev(devUsername)) return this.errorReply(devUsername + " is already a DEV user.");
			Db('devs').set(devUsername, 1);
			this.sendReply('|html|' + Exiled.nameColor(devUsername, true) + " has been given DEV status.");
			if (Users.get(devUsername)) Users(devUsername).popup("|html|You have been given DEV status by " + Exiled.nameColor(user.name, true) + ".");
		},
		take: function (target, room, user) {
			if (!this.can('declare')) return false;
			if (!target) return this.parse('/help', true);
			let devUsername = toId(target);
			if (devUsername.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
			if (!isDev(devUsername)) return this.errorReply(devUsername + " isn't a DEV user.");
			Db('devs').delete(devUsername);
			this.sendReply("|html|" + Exiled.nameColor(devUsername, true) + " has been demoted from DEV status.");
			if (Users.get(devUsername)) Users(devUsername).popup("|html|You have been demoted from DEV status by " + Exiled.nameColor(user.name, true) + ".");
		},
		users: 'list',
		list: function (target, room, user) {
			if (!Db('devs').keys().length) return this.errorReply('There seems to be no user with DEV status.');
			let display = [];
			Db('devs').keys().forEach(devUser => {
				display.push(Exiled.nameColor(devUser, (Users(devUser) && Users(devUser).connected)));
			});
			this.popupReply('|html|<b><u><font size="3"><center>DEV Users:</center></font></u></b>' + display.join(','));
		},
		'': 'help',
		help: function (target, room, user) {
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
};
