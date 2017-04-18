'use strict';
/********************
 * Mod Commands
 * This file contains all custom commands used to moderate the server.
********************/
const MAX_REASON_LENGTH = 300;
const fs = require('fs');
let permaUsers;

try {
	permaUsers = JSON.parse(fs.readFileSync("config/perma.json"));
} catch (e) {
	permaUsers = {};
	console.log("Unable to load config/perma.txt; creating empty object.");
}
Users.parsePerma = function (userid, targetUser) {
	if (!userid) return;
	if (userid in permaUsers) {
		try {
			Punishments[permaUsers[userid]](Users.get(userid));
		} catch (e) {
			console.log("ERROR: unable to apply perma to " + userid);
		}
	}
};

function clearRoom(room) {
	let len = (room.log && room.log.length) || 0;
	let users = [];
	while (len--) {
		room.log[len] = '';
	}
	for (let u in room.users) {
		users.push(u);
		if (!Users.get(u)) continue;
		Users.get(u).leaveRoom(room, Users.get(u).connections[0]);
	}
	len = users.length;
	setTimeout(function () {
		while (len--) {
			if (Users.get(users[len])) {
				Users.get(users[len]).joinRoom(room, Users.get(users[len]).connections[0]);
			}
		}
	}, 1000);
}

function postAds() {
	if (Rooms.global.ads.length > 0) {
		let ad = Rooms.global.ads.shift();
		Rooms('lobby').addRaw('<div class="infobox"><a href="/' + ad["room"] + '" class="ilink"><font color="#04B404"> Advertisement <strong>' + ad["room"] + '</strong>:</font> ' + ad["message"] + '</a>  -' + ad["user"] + '</div>');
		Rooms('lobby').update();
	}
}

exports.commands = {
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
		room.addRaw('<div class="broadcast-' + cmd.substr(7) + '"><b>' + target + '</b></div>');
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
			if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-blue" style="border-radius: 5px;"><b>We are hosting a <font color="#57194A"><b>' + parts[0] + '</b></font> in <button name="send" value="/join ' + parts[1] + '" style="border-radius: 3px; margin: 3px; padding: 2px 5px; font-weight: bold; font-style: italic; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.35); color: #57194A; text-shadow: none;">' + parts[1] + '</button> !<br />The tier is <font style="color: #57194A; font-weight: bold;"><b>' + parts[2] + '</b></font>! Join up and have fun!<br /><br />The prize for the winner is <font style="color: #57194A; font-weight: bold;"><b>' + parts[3] + '</b></font> bucks, while the runner-up will get <font style="color: #57194A; font-weight: bold;"><b>' + parts[4] + '</b></font> bucks!<br /><small><i>~' + user.name + '</i></small></b></div>');
		}
		this.room.modlog(user.name + " globally custom declared " + target);
	},
	customgdeclarehelp: ["/customgdeclare [event name], [room], [tier], [buck reward], [runner-up buck reward] - Preset gdeclare which anonymously announces a message to every room on the server. Requires: &, ~"],

	gclearall: 'globalclearall',
	globalclearall: function (target, room, user) {
		if (!this.can('gdeclare')) return false;
		for (let u in Users.users) {
			Users.users[u].popup("All rooms are being clear.");
		}
		for (let r in Rooms.rooms) {
			clearRoom(Rooms.rooms[r]);
		}
	},

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

	k: 'kick',
	roomkick: 'kick',
	kick: function (target, room, user) {
		if (!target) return this.parse('/help kick');
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");

		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!targetUser || !targetUser.connected) return this.sendReply("User '" + this.targetUsername + "' not found.");
		if (!(targetUser in room.users)) return this.sendReply("User " + this.targetUsername + " is not in the room " + room.id + ".");
		if (!this.can('mute', targetUser, room) || targetUser.can('rangeban') && !user.can('rangeban')) return false;

		this.addModCommand(targetUser.name + " was kicked from the room by " + user.name + ".");
		targetUser.popup("You were kicked from " + room.id + " by " + user.name + ".");
		targetUser.leaveRoom(room.id);
	},
	kickhelp: ["/kick - Kick a user out of a room. Requires: % @ # & ~"],

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
		return this.privateModCommand('|raw|<div class="broadcast-red"><b><font size=1><i>Private Auth (Driver +) declare from ' + user.name + '<br /></i></font size>' + target + '</b></div>');
	},
	declaremodhelp: ["/declaremod [note] - Adds a staff readable declare. Requires: % @ # & ~"],

	glogs: 'globallogs',
	globallogs: function (target, room, user) {
		return this.parse('/modlog all, ' + target);
	},
	hide: 'hideauth',
	hideauth: function (target, room, user) {
		if (!this.can('lock')) return false;
		let tar = ' ';
		if (target) {
			target = target.trim();
			if (Config.groupsranking.indexOf(target) > -1 && target !== '#') {
				if (Config.groupsranking.indexOf(target) <= Config.groupsranking.indexOf(user.group)) {
					tar = target;
				} else {
					this.sendReply('The group symbol you have tried to use is of a higher authority than you have access to. Defaulting to \'' + tar + 'instead.');
				}
			} else {
				this.sendReply('You are now hiding your auth symbol as \'' + tar + '\'.');
			}
		}
		user.getIdentity = function (roomid) {
			return tar + this.name;
		};
		user.updateIdentity();
		return this.sendReply("You are now hiding your auth as ' " + tar + "'.");
	},

	show: 'showauth',
	showauth: function (target, room, user) {
		if (!this.can('lock')) return false;
		delete user.getIdentity;
		user.updateIdentity();
		return this.sendReply("You are now showing your authority!");
	},

	roomlist: function (target, room, user) {
		let header = ['<b><font color="#1aff1a" size="2">Total users connected: ' + Rooms.global.userCount + '</font></b><br />'],
			official = ['<b><font color="#ff9900" size="2"><u>Official Rooms:</u></font></b><br />'],
			nonOfficial = ['<hr><b><u><font color="#005ce6" size="2">Public Rooms:</font></u></b><br />'],
			privateRoom = ['<hr><b><u><font color="#ff0066" size="2">Private Rooms:</font></u></b><br />'],
			groupChats = ['<hr><b><u><font color="#00b386" size="2">Group Chats:</font></u></b><br />'],
			battleRooms = ['<hr><b><u><font color="#cc0000" size="2">Battle Rooms:</font></u></b><br />'];

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

		let pmName = ' Server PM [Do not reply]';

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

		let pmName = ' Staff PM [Do not reply]';

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

		let pmName = '~Room PM (' + Chat.escapeHTML(room.title) + ') [Do not reply]';

		for (let i in room.users) {
			let message = '|pm|' + pmName + '|' + room.users[i].getIdentity() + '| ' + target;
			room.users[i].send(message);
		}
		this.privateModCommand('(' + Chat.escapeHTML(user.name) + ' mass PMd: ' + target + ')');
	},

/*************************
  Permalock / Permaban
  for side servers
  coded by HoeenHero
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
			if (Rooms('upperstaff')) Rooms('upperstaff').add('[Perma Monitor] ' + user.name + ' has (offline) permalocked ' + target + '.').update();
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
		if (Rooms('upperstaff')) Rooms('upperstaff').add('[Perma Monitor] ' + user.name + ' has permalocked ' + tarUser.name + '.').update();
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
		if (Rooms('upperstaff')) Rooms('upperstaff').add('[Perma Monitor] ' + user.name + ' has unpermalocked ' + target + '.').update();
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
			if (Rooms('upperstaff')) Rooms('upperstaff').add('[Perma Monitor] ' + user.name + ' has (offline) permabanned ' + target + '.').update();
			return this.addModCommand(target + ' was permabanned by ' + user.name + '.');
		}
		if (!tarUser.registered) return this.errorReply('Only registered users can be permalocked.');
		if (Db('perma').get(tarUser.userid, 0) === 6) return this.errorReply(tarUser.name + ' is already permabanned.');
		if (tarUser.trusted && cmd !== 'forcepermaban') return this.errorReply(tarUser.name + ' is a trusted user. If your sure you want to permaban them, please use /forcepermaban');
		Db('perma').set(tarUser.userid, 6);
		tarUser.popup('You have been permabanned by ' + user.name + '.\nUnlike permabans issued by the main server, this permaban only effects this server.');
		Punishments.ban(tarUser, Date.now() + (1000 * 60 * 60 * 24 * 30), tarUser.userid, `Permabanned as ${tarUser.userid}`);
		if (tarUser.trusted) Monitor.log('[CrisisMonitor] Trusted user ' + tarUser.userid + ' was permabanned by ' + user.name + ' and was automatically demoted from ' + tarUser.distrust() + '.');
		if (Rooms('upperstaff')) Rooms('upperstaff').add('[Perma Monitor] ' + user.name + ' has permabanned ' + tarUser.name + '.').update();
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
		if (Rooms('upperstaff')) Rooms('upperstaff').add('[Perma Monitor] ' + user.name + ' has unpermabanned ' + target + '.').update();
		return this.addModCommand(target + ' was unpermabanned by ' + user.name + '.');
	},
	unpermabanhelp: ['/unpermaban user - Unpermaban a user. Requires: ~'],

	reauth: 'repromote',
	repromote: function (target, room, user) {
		if (!this.can('hotpatch')) return false;
		if (!target) return this.errorReply("/repromote targetuser, demote message. Do not use this if you don\'t know what you are doing");
		let parts = target.replace(/\, /g, ",").split(',');
		let targetUser = toId(parts.shift());
		parts.forEach(function (r) {
			let tarRoom = Rooms.get(toId(r));
			if (tarRoom) {
				tarRoom.auth[targetUser] = r.charAt(0);
			}
		});
		Rooms.global.writeChatRoomData();
		Users(targetUser).updateIdentity();
		this.sendReply("Succesfully repromoted " + targetUser + ".");
	},

	rf: 'roomfounder',
	roomfounder: function (target, room, user) {
		if (!room.chatRoomData) return this.sendReply("/roomfounder - This room isn't designed for per-room moderation to be added.");
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");
		if (!this.can('declare')) return false;
		if (room.isPersonal) return this.sendReply("You can't do this in personal rooms.");
		if (!room.auth) room.auth = room.chatRoomData.auth = {};
		if (!room.leagueauth) room.leagueauth = room.chatRoomData.leagueauth = {};
		let name = targetUser.name;
		room.auth[targetUser.userid] = '#';
		room.founder = targetUser.userid;
		this.addModCommand(name + ' was appointed to Room Founder by ' + user.name + '.');
		room.onUpdateIdentity(targetUser);
		room.chatRoomData.founder = room.founder;
		Rooms.global.writeChatRoomData();
	},

	roomdefounder: 'deroomfounder',
	deroomfounder: function (target, room, user) {
		if (!room.auth) return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		let name = this.targetUsername;
		let userid = toId(name);
		if (room.isPersonal) return this.sendReply("You can't do this in personal rooms.");
		if (!userid || userid === '') return this.sendReply("User '" + name + "' does not exist.");
		if (room.auth[userid] !== '#') return this.sendReply("User '" + name + "' is not a room founder.");
		if (!this.can('declare')) return false;
		delete room.auth[userid];
		delete room.founder;
		this.sendReply(name + ' was demoted from Room Founder by ' + user.name + '.');
		if (targetUser) targetUser.updateIdentity();
		if (room.chatRoomData) Rooms.global.writeChatRoomData();
	},

	roomowner: function (target, room, user) {
		if (!room.chatRoomData) return this.sendReply("/roomowner - This room isn't designed for per-room moderation to be added");
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");
		let name = targetUser.name;
		if (!targetUser.registered) return this.sendReply("User '" + name + "' is not registered.");
		if (!room.founder) return this.sendReply("The room needs a room founder before it can have a room owner.");
		if (target === room.founder && !this.can('makeroom')) return this.sendReply("You cannot demote yourself from founder to owner.");
		if (room.founder !== user.userid && !this.can('makeroom')) return this.errorReply("/roomowner - Access denied.");
		if (!room.auth) room.auth = room.chatRoomData.auth = {};
		room.auth[targetUser.userid] = '#';
		this.addModCommand("" + name + " was appointed Room Owner by " + user.name + ".");
		room.onUpdateIdentity(targetUser);
		Rooms.global.writeChatRoomData();
	},

	deroomowner: function (target, room, user) {
		if (!room.auth) return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
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
		if (room.chatRoomData) Rooms.global.writeChatRoomData();
	},

	forceshart: 'shart',
	shart: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help shart');

		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!targetUser) return this.errorReply("User '" + this.targetUsername + "' does not exist.");
		if (target.length > MAX_REASON_LENGTH) {
			return this.errorReply("The reason is too long. It cannot exceed " + MAX_REASON_LENGTH + " characters.");
		}
		if (!this.can('ban', targetUser)) return false;

		if (Users.checkBanned(targetUser.latestIp) && !target && !targetUser.connected) {
			let problem = " but was already banned";
			return this.privateModCommand("(" + targetUser.name + " would be banned by " + user.name + problem + ".)");
		}

		if (targetUser.confirmed) {
			if (cmd === 'forceshart') {
				let from = targetUser.deconfirm();
				Monitor.log("[CrisisMonitor] " + targetUser.name + " was banned by " + user.name + " and demoted from " + from.join(", ") + ".");
			} else {
				return this.sendReply("" + targetUser.name + " is a confirmed user. If you are sure you would like to ban them use /forceban.");
			}
		} else if (cmd === 'forceshart') {
			return this.errorReply("Use /ban; " + targetUser.name + " is not a confirmed user.");
		}

		// Destroy personal rooms of the banned user.
		for (let i in targetUser.roomCount) {
			if (i === 'global') continue;
			let targetRoom = Rooms.get(i);
			if (targetRoom.isPersonal && targetRoom.auth[targetUser.userid] && targetRoom.auth[targetUser.userid] === '#') {
				targetRoom.destroy();
			}
		}

		targetUser.popup("|modal|" + user.name + " has sharted on you.");

		this.addModCommand("" + targetUser.name + " was sharted on by " + user.name + "." + (target ? " (" + target + ")" : ""), " (" + targetUser.latestIp + ")");
		let alts = targetUser.getAlts();
		let acAccount = (targetUser.autoconfirmed !== targetUser.userid && targetUser.autoconfirmed);
		if (alts.length) {
			let guests = 0;
			alts = alts.filter(function (alt) {
				if (alt.substr(0, 6) !== 'Guest ') return true;
				guests++;
				return false;
			});
			this.privateModCommand("(" + targetUser.name + "'s " + (acAccount ? " ac account: " + acAccount + ", " : "") + "banned alts: " + alts.join(", ") + (guests ? " [" + guests + " guests]" : "") + ")");
			for (let i = 0; i < alts.length; ++i) {
				this.add('|unlink|' + toId(alts[i]));
			}
		} else if (acAccount) {
			this.privateModCommand("(" + targetUser.name + "'s ac account: " + acAccount + ")");
		}

		let userid = this.getLastIdOf(targetUser);
		this.add('|unlink|hide|' + userid);
		if (userid !== toId(this.inputUsername)) this.add('|unlink|hide|' + toId(this.inputUsername));
		targetUser.ban(false, userid);
		this.globalModlog("BAN", targetUser, " by " + user.name + (target ? ": " + target : ""));
		return true;
	},
	sharthelp: ["/shart [username], [reason] - Kick user from all rooms and ban user's IP address with reason. Requires: @ & ~"],

	registerdice: function (target, room, user) {
		if (!user.can('declare')) return this.errorReply("/registerdice - Access denied");
		if (!target) return this.parse("/help registercasino");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
		let targetRoom = Rooms(toId(target));
		targetRoom.add('|raw|<div class="broadcast-green"><b>' + user.name + ' has just added Dice Games to this room.</b></div>');
		targetRoom.update();
		if (!targetRoom.isCasino) {
			targetRoom.isCasino = true;
			targetRoom.chatRoomData.isCasino = true;
			Rooms.global.writeChatRoomData();
		} else {
			this.errorReply("This room already is registered as a Dice room.");
		}
	},
	registercasinohelp: ["/registercasino [room] - Adds Casino Games to a room. Requires & ~"],

	deregisterdice: function (target, room, user) {
		if (!user.can('declare')) return this.errorReply("/deregisterdice - Access denied");
		if (!target) return this.parse("/help deregisterdice");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
		let targetRoom = Rooms(toId(target));
		targetRoom.update();
		if (targetRoom.isCasino) {
			delete targetRoom.isCasino;
			delete targetRoom.chatRoomData.isCasino;
			Rooms.global.writeChatRoomData();
			this.sendReply("Dice games have been removed from this room.");
		} else {
			this.errorReply("This room is not registered as a Dice room.");
		}
	},
	deregistercasinohelp: ["/deregisterdice [room] - Removes Dice Games from a room. Requires & ~"],

	unlink: function (target, room, user) {
		if (!target || !this.can('mute')) return this.parse('/help unlink');
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");
		let targetUser = Users.get(target).getLastId();
		this.add('|unlink|' + targetUser);
		this.addModCommand(targetUser.name + "'s links were unlinked by " + user.name);
		targetUser.popup(user.name + " has unlinked all your previous messages.");
	},
	unlinkhelp: ["/unlink [username] - Attempts to unlink every link sent by [username]. Requires: % @ & ~"],

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
				 if (id !== 'global' && Rooms.rooms[id].userCount > 3) Rooms.rooms[id].addRaw('<div class="broadcast-blue" style="border-radius: 5px; max-height: 300px; overflow-y: scroll;"><b>' + declare + '</b></div>');
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
