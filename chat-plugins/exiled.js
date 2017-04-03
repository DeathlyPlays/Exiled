'use strict';

const MD5 = require('md5');
const http = require('http');
const fs = require('fs');
const moment = require('moment');
const nani = require('nani').init("niisama1-uvake", "llbgsBx3inTdyGizCPMgExBVmQ5fU");
const Autolinker = require('autolinker');
let request = require('request');

let amCache = {
	anime: {},
	manga: {}
};

let colorCache = {};
Exiled.customColors = {};

global.isYouTube = function (user) {
	if (!user) return;
	if (typeof user === 'Object') user = user.userid;
	let youtube = Db('youtube').get(toId(user));
	if (youtube === 1) return true;
	return false;
};

global.isBot = function (user) {
	if (!user) return;
	if (typeof user === 'Object') user = user.userid;
	let bot = Db('bot').get(toId(user));
	if (bot === 1) return true;
	return false;
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
	if ((Date.now() - lastTime) < 86400000) return false;
	if ((Date.now() - lastTime) >= 127800000) Db('DailyBonus').set(userid, [1, Date.now()]);
	if (Db('DailyBonus').get(userid)[0] === 8) Db('DailyBonus').set(userid, [7, Date.now()]);
	Economy.writeMoney(userid, Db('DailyBonus').get(userid)[0]);
	user.send('|popup||wide||html| <center><u><b><font size="3">Exiled Daily Bonus</font></b></u><br>You have been awarded ' + Db('DailyBonus').get(userid)[0] + ' Buck.<br>' + showDailyRewardAni(userid) + '<br>Because you have connected to the server for the past ' + Db('DailyBonus').get(userid)[0] + ' Days.</center>');
	Db('DailyBonus').set(userid, [(Db('DailyBonus').get(userid)[0] + 1), Date.now()]);
};

function showDailyRewardAni(userid) {
	userid = toId(userid);
	let streak = Db('DailyBonus').get(userid)[0];
	let output = '';
	for (let i = 1; i <= streak; i++) {
		output += "<img src='https://www.mukuru.com/media/img/icons/new_order.png' width='16' height='16'> ";
	}
	return output;
};

let urbanCache;
try {
	urbanCache = JSON.parse(fs.readFileSync('../config/udcache.json', 'utf8'));
}
catch (e) {
	urbanCache = {};
}

function cacheUrbanWord(word, definition) {
	word = word.toLowerCase().replace(/ /g, '');
	urbanCache[word] = {
		"definition": definition,
		"time": Date.now()
	};
	fs.writeFile('config/udcache.json', JSON.stringify(urbanCache));
}

global.isDev = function (user) {
	if (!user) return;
	if (typeof user === 'Object') user = user.userid;
	let dev = Db('devs').get(toId(user));
	if (dev === 1) return true;
	return false;
};

exports.commands = {
	youtube: function (target, room, user) {
		let parts = target.split(', ');
		if (!target) return this.parse("/help youtube");
		let username = toId(parts[1]);

		switch (toId(parts[0])) {
		case 'give':
			if (!this.can('hotpatch')) return false;
			if (parts[1] < 1) return false;
			if (!parts[1]) return false;
			if (isYouTube(username)) return this.errorReply(user.name + " is already a YouTuber.");
			Db('youtube').set(username, 1);
			user.send('|popup|' + toId(parts[1]) + " has recieved YouTube status from " + user.name + "");
			this.sendReply(username + ' has been granted with YouTube status.');
			break;

		case 'take':
			if (!this.can('hotpatch')) return false;
			if (!parts[1] < 1) return false;
			if (!parts[1]) return false;
			Db('youtube').delete(username);
			user.send('|popup|' + toId(parts[1]) + " has taken YouTuber status from " + user.name + "");
			this.sendReply(toId(parts[1]) + '\'s YouTuber status has been taken.');
			break;

		case 'list':
			if (!this.can('declare')) return false;
			if (!Object.keys(Db('youtube').object()).length) return this.errorReply('There seems to be no user with YouTuber status.');
			this.sendReplyBox('<center><b><u>YouTubers</u></b></center>' + '<br /><br />' + Object.keys(Db('youtube').object()).join('<br />'));
			break;


		default:
			this.parse("/help youtube");
		}

	},
	youtubehelp: ["Give: /youtube give, user - Gives user YouTuber status.",
		"Take: /youtube take, user - Takes YouTuber status from user.",
		"List: /youtube list - Lists all users with YouTuber status."
	],

	/* * * * * * * * * * * * * * * *
	 * User of the Week            *
	 * Created by Celestial        *
	 * * * * * * * * *  * * * * *  */
	useroftheweek: 'uotw',
	uotw: function (target, room, user) {
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
	/* * * * * * * * * * * *
	 * Bots List           *
	 * by ReturningAvenger *
	 * * * * * * * * * * * */

	bot: function (target, room, user) {
		let parts = target.split(', ');
		if (!target) return this.parse("/help bot");
		let username = toId(parts[1]);

		switch (toId(parts[0])) {
		case 'give':
			if (!this.can('hotpatch')) return false;
			if (parts[1] < 1) return false;
			if (!parts[1]) return false;
			if (isBot(username)) return this.errorReply(user.name + " is already a bot.");
			Db('bot').set(username, 1);
			user.send('|popup|' + toId(parts[1]) + " has recieved Bot status from " + user.name + "");
			this.sendReply(username + ' has been granted with Bot status.');
			break;

		case 'take':
			if (!this.can('hotpatch')) return false;
			if (!parts[1] < 1) return false;
			if (!parts[1]) return false;
			Db('bot').delete(username);
			user.send('|popup|' + toId(parts[1]) + " has taken Bot status from " + user.name + "");
			this.sendReply(toId(parts[1]) + '\'s bot status has been taken.');
			break;

		case 'list':
			if (!this.can('declare')) return false;
			if (!Object.keys(Db('bot').object()).length) return this.errorReply('There seems to be no user with Bot status.');
			this.sendReplyBox('<center><b><u>Bots</u></b></center>' + '<br /><br />' + Object.keys(Db('bot').object()).join('<br />'));
			break;


		default:
			this.parse("/help bot");
		}

	},
	bothelp: [
		"Give: /bot give, user - Gives user Bot status.",
		"Take: /bot take, user - Takes Bot status from user.",
		"List: /bot list - Lists all users with Bot status."
	],

/* * * * * * * *
 * Devs List   *
 * Created By: *
 * CateQuil    *
 * * * * * * * */

	dev: function (target, room, user) {
		let parts = target.split(', ');
		if (!target) return this.parse("/help dev");
		let username = toId(parts[1]);
		
		switch (toId(parts[0])) {
		case 'give':
			if (!this.can('hotpatch')) return false;
			if (parts[1] < 1) return false;
			if (!parts[1]) return false;
			if (isDev(username)) return this.errorReply(user.name + " is already a dev.");
			Db('devs').set(username, 1);
			user.send('|popup|' + toId(parts[1]) + " has recieved Developer status from " + user.name + "");
			this.sendReply(username + ' has been granted with dev status.');
			break;

		case 'take':
			if (!this.can('hotpatch')) return false;
			if (!parts[1] < 1) return false;
			if (!parts[1]) return false;
			Db('devs').delete(username);
			user.send('|popup|' + toId(parts[1]) + " has taken Developer status from " + user.name + "");
			this.sendReply(toId(parts[1]) + '\'s dev status has been taken.');
			break;

		case 'list':
			if (!this.can('declare')) return false;
			if (!Object.keys(Db('devs').object()).length) return this.errorReply('There seems to be no user with dev status.');
			this.sendReplyBox('<center><b><u>DEV Users</u></b></center>' + '<br /><br />' + Object.keys(Db('devs').object()).join('<br />'));
			break;


		default:
			this.parse("/help dev");
		}

	},
	devhelp: ["Give: /dev give, user - Gives user developer status.",
		"Take: /dev take, user - Takes developer status from user.",
		"List: /dev list - Lists all users with developer status."
	],

	/* * * * * * * * * * * * *
	 *  Allow various games  *
	 *  to be played in      *
	 *  unspecified rooms    *
	 *  by ReturningAvenger  *
	 * * * * * * * * * * * * */

	registerquestionws: 'registertrivia',
	registerqws: 'registertrivia',
	registerquestionworkshop: 'registertrivia',
	registertrivia: function (target, room, user) {
		if (!user.can('declare')) return this.errorReply("/registertrivia - Access denied");
		if (!target) return this.parse("/help registertrivia");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
		let targetRoom = Rooms(toId(target));
		targetRoom.add('|raw|<div class="broadcast-green"><b>' + user.name + ' has just added Trivia to this room.</b></div>');
		targetRoom.update();
		if (!targetRoom.isQuestionWorkshop) {
			targetRoom.isQuestionWorkshop = true;
			targetRoom.chatRoomData.isQuestionWorkshop = true;
			Rooms.global.writeChatRoomData();
		}
		else {
			this.errorReply("This room already is registered as a Trivia room.");
		}
	},
	registertriviahelp: ["/registertrivia [room] - Adds Trivia to a room. Requires & ~"],


	deregistertrivia: function (target, room, user) {
		if (!user.can('declare')) return this.errorReply("/deregistertrivia - Access denied");
		if (!target) return this.parse("/help deregistertrivia");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
		let targetRoom = Rooms(toId(target));
		targetRoom.update();
		if (targetRoom.isQuestionWorkshop) {
			delete targetRoom.isQuestionWorkshop;
			delete targetRoom.chatRoomData.isQuestionWorkshop;
			Rooms.global.writeChatRoomData();
			this.sendReply("Trivia has been removed from this room.");
		}
		else {
			this.errorReply("This room is not registered as a Trivia room.");
		}
	},
	deregistertriviahelp: ["/deregistertrivia [room] - Removes Trivia from a room. Requires & ~"],


	registerscavenger: function (target, room, user) {
		if (!user.can('declare')) return this.errorReply("/registerscavenger - Access denied");
		if (!target) return this.parse("/help registerscavenger");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
		let targetRoom = Rooms(toId(target));
		targetRoom.add('|raw|<div class="broadcast-green"><b>' + user.name + ' has just added Scavenger to this room.</b></div>');
		targetRoom.update();
		if (!targetRoom.isScavenger) {
			targetRoom.isScavenger = true;
			targetRoom.chatRoomData.isScavenger = true;
			Rooms.global.writeChatRoomData();
		}
		else {
			this.errorReply("This room already is registered as a Scavenger room.");
		}
	},
	registerscavengerhelp: ["/registerscavenger [room] - Adds Scavenger to a room. Requires & ~"],

	deregisterscavenger: function (target, room, user) {
		if (!user.can('declare')) return this.errorReply("/deregisterscavenger - Access denied");
		if (!target) return this.parse("/help deregisterscavenger");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
		let targetRoom = Rooms(toId(target));
		targetRoom.update();
		if (targetRoom.isScavenger) {
			delete targetRoom.isScavenger;
			delete targetRoom.chatRoomData.isScavenger;
			Rooms.global.writeChatRoomData();
			this.sendReply("Scavenger has been removed from this room.");
		}
		else {
			this.errorReply("This room is not registered as a Scavenger room.");
		}
	},
	deregisterscavengerhelp: ["/deregisterscavenger [room] - Removes Scavenger from a room. Requires & ~"],

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
				}
				else {
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
				}
				else {
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
			return this.sendReply("/roomfounder - This room isn\'t designed for per-room moderation to be added.");
		}
		target = this.splitTarget(target, true);
		var targetUser = this.targetUser;
		if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");
		if (!this.can('makeroom')) return false;
		if (!room.auth) room.auth = room.chatRoomData.auth = {};
		if (!room.leagueauth) room.leagueauth = room.chatRoomData.leagueauth = {};
		var name = targetUser.name;
		room.auth[targetUser.userid] = '#';
		room.founder = targetUser.userid;
		this.addModCommand(name + ' was appointed to Room Founder by ' + user.name + '.');
		room.onUpdateIdentity(targetUser);
		room.chatRoomData.founder = room.founder;
		Rooms.global.writeChatRoomData();
	},

	roomdefounder: 'deroomfounder',
	deroomfounder: function (target, room, user) {
		if (!room.auth) {
			return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
		}
		target = this.splitTarget(target, true);
		var targetUser = this.targetUser;
		var name = this.targetUsername;
		var userid = toId(name);
		if (!userid || userid === '') return this.sendReply("User '" + name + "' does not exist.");

		if (room.auth[userid] !== '#') return this.sendReply("User '" + name + "' is not a room founder.");
		if (!this.can('makeroom', null, room)) return false;

		delete room.auth[userid];
		delete room.founder;
		this.sendReply("(" + name + " is no longer Room Founder.)");
		if (targetUser) targetUser.updateIdentity();
		if (room.chatRoomData) {
			Rooms.global.writeChatRoomData();
		}
	},

	roomowner: function (target, room, user) {
		if (!room.chatRoomData) {
			return this.sendReply("/roomowner - This room isn't designed for per-room moderation to be added");
		}
		target = this.splitTarget(target, true);
		var targetUser = this.targetUser;

		if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");

		if (!room.founder) return this.sendReply('The room needs a room founder before it can have a room owner.');
		if (room.founder !== user.userid && !this.can('makeroom')) return this.sendReply('/roomowner - Access denied.');

		if (!room.auth) room.auth = room.chatRoomData.auth = {};

		var name = targetUser.name;

		room.auth[targetUser.userid] = '#';
		this.addModCommand("" + name + " was appointed Room Owner by " + user.name + ".");
		room.onUpdateIdentity(targetUser);
		Rooms.global.writeChatRoomData();
	},
	roomownerhelp: ["/roomowner [username] - Appoints [username] as a room owner. Removes official status. Requires: ~"],

	roomdeowner: 'deroomowner',
	deroomowner: function (target, room, user) {
		if (!room.auth) {
			return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
		}
		target = this.splitTarget(target, true);
		var targetUser = this.targetUser;
		var name = this.targetUsername;
		var userid = toId(name);
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
		var targetUser = this.targetUser;

		if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");

		if (!room.founder) return this.sendReply('The room needs a room founder before it can have a room owner.');
		if (room.founder !== user.userid && !this.can('makeroom')) return this.sendReply('/roomowner - Access denied.');

		if (!room.auth) room.auth = room.chatRoomData.auth = {};

		var name = targetUser.name;

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
		var targetUser = this.targetUser;
		var name = this.targetUsername;
		var userid = toId(name);
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
};
