'use strict';

const FS = require('./../lib/fs');
const LOGS_FILE = 'config/chat-plugins/mafia-logs.json';
const MafiaData = require('./mafia-data.js');
let logs = {};

try {
	logs = FS(LOGS_FILE).readIfExistsSync();
	if (!logs) {
		// Create file
		FS(LOGS_FILE).writeSync("{}");
		logs = {};
	} else {
		logs = JSON.parse(logs);
	}
	for (let section of ['leaderboard', 'mvps', 'hosts', 'plays']) {
		// Check to see if we need to eliminate an old month's data.
		const month = new Date().toLocaleString("en-us", {month: "numeric", year: "numeric"});
		if (!logs[section]) logs[section] = {};
		if (!logs[section][month]) logs[section][month] = {};
		if (Object.keys(logs[section]).length >= 3) {
			// eliminate the oldest month(s)
			let keys = Object.keys(logs[section]).sort((a, b) => {
				a = a.split('/');
				b = b.split('/');
				if (a[1] !== b[1]) {
					// year
					if (parseInt(a[1]) < parseInt(b[1])) return -1;
					return 1;
				}
				// month
				if (parseInt(a[1]) < parseInt(b[0])) return -1;
				return 1;
			});
			while (keys.length > 1) {
				delete logs[section][keys.shift()];
			}
		}
	}
	writeLogs();
} catch (e) {
	if (e.code !== 'ENOENT') throw e;
}

function writeLogs() {
	FS(LOGS_FILE).writeUpdate(() => (
		JSON.stringify(logs)
	));
}

class MafiaPlayer extends Rooms.RoomGamePlayer {
	constructor(user, game) {
		super(user, game);
		this.name = Chat.escapeHTML(this.name);
		// Used for when a player changes their name
		/*this.originalName = this.name;
		this.originalId = this.userid;*/
		this.role = null;
		this.lynching = '';
	}

	getRole() {
		if (!this.role) return;
		return `<span style="font-weight:bold;color:${MafiaData.alignments[this.role.alignment].color}">${this.role.name}</span>`;
	}

	updateHtmlRoom() {
		const user = Users(this.userid);
		if (!user || !user.connected) return;
		if (this.game.ended) return user.send(`>view-mafia-${this.game.room.id}\n|deinit`);
		const buf = Chat.pages.mafia([this.game.room.id], user);
		this.send(`>view-mafia-${this.game.room.id}\n|init|html\n${buf}`);
	}
}

class MafiaTracker extends Rooms.RoomGame {
	constructor(room, host) {
		super(room);

		this.gameid = 'mafia';
		this.title = 'Mafia';
		this.playerCap = 20;
		this.allowRenames = false;
		this.started = false;
		this.ended = false;

		this.hostid = host.userid;
		this.host = Chat.escapeHTML(host.name);

		this.players = {};
		this.dead = {};
		this.subs = [];
		this.requestedSub = [];
		this.played = [];

		this.lynches = {};
		this.hasPlurality = null;

		this.originalRoles = [];
		this.originalRoleString = '';
		this.roles = [];
		this.roleString = '';

		this.phase = "signups";
		this.dayNum = 0;
		this.closedSetup = false;
		this.noReveal = false;
		this.selfEnabled = false;
		this.timer = null;

		this.sendRoom(this.roomWindow(), {uhtml: true});
	}

	join(user) {
		if (this.phase !== 'signups') return user.sendTo(this.room, `|error|The game of ${this.title} has already started.`);
		if (user.userid === this.hostid) return user.sendTo(this.room, `|error|You cannot host and play!`);
		let alts = user.getAltUsers(true);
		for (let alt of alts) {
			if (Object.keys(this.players).includes(alt)) return user.sendTo(this.room, `|error|You already have an alt in the game.`);
		}
		if (this.addPlayer(user)) {
			this.updatePlayers();
		} else {
			return user.sendTo(this.room, `|error|You have already joined the game of ${this.title}.`);
		}
	}

	leave(user) {
		if (!(user.userid in this.players)) return user.sendTo(this.room, `|error|You have not joined the game of ${this.title}.`);
		if (this.phase !== 'signups') return user.sendTo(this.room, `|error|The game of ${this.title} has already started.`);
		this.players[user.userid].destroy();
		delete this.players[user.userid];
		this.updatePlayers();
		user.send(`>view-mafia-${this.room.id}\n|init|html\n${Chat.pages.mafia([this.room.id], user)}`);
	}

	makePlayer(user) {
		return new MafiaPlayer(user, this);
	}

	setRoles(roleString, force) {
		let roles = roleString.split(',').map(x => { return x.trim().split(' '); });
		if (roles.length !== this.playerCount) return ['You have not provided enough roles for the players.'];
		if (this.originalRoles.length) {
			// Reset roles
			this.originalRoles = [];
			this.originalRoleString = '';
			this.roles = [];
			this.roleString = '';
		}
		if (force) {
			this.originalRoles = roles.map(r => {
				return {
					name: r,
					id: toId(r),
					alignment: 'solo',
					memo: [`To learn more about your role, PM the host (${this.host}).`],
				};
			});
			this.roles = this.originalRoles;
			this.originalRoleString = this.originalRoles.slice().map(r => { return `<span style="font-weight:bold;color:${MafiaData.alignments[r.alignment].color || '#FFF'}">${r.name}</span>`; }).join(', ');
			this.roleString = this.originalRoleString;
			return [];
		}
		let problems = [];
		let hasProblem = true;
		let alignments = [];
		for (let r of roles) {
			hasProblem = false;
			let role = {};
			let target = r.slice();
			for (let j = 0; j < target.length; j++) {
				let id = toId(target[j]);
				if (MafiaData.roles[id]) {
					if (typeof MafiaData.roles[id] === 'string') {
						target[j] = MafiaData.roles[MafiaData.roles[id]].name;
						id = toId(target[j]);
					}
					if (role.id) {
						hasProblem = true;
						problems.push(`The role "${role.name}" has multiple possible base roles (${MafiaData.roles[id].id} or ${role.baseRole})`);
						break;
					}
					role = Object.assign({}, MafiaData.roles[id]);
					role.baseRole = toId(role.name);
					role.name = target.slice().map(p => { return toId(p) === 'solo' ? '' : p; }).join(' ');
					role.id = toId(role.name);
					if (!role.memo) role.memo = [];
					role.memo.unshift('During the Day, you may vote for whomever you want lynched.');
					target.splice(j, 1);
					j++;
				}
			}
			if (hasProblem) continue;
			if (!role.name) role = {name: target.join(' '), id: toId(target.join('')), memo: []};
			// Add modifiers
			for (let j = 0; j < target.length; j++) {
				let id = toId(target[j]);
				if (id.endsWith('shot') && parseInt(target[j].substring(0, 1))) {
					// Special case for X-Shot modifiers
					let number = target[j].substring(0, 1);
					let memo = MafiaData.modifiers.xshot.memo.slice();
					memo = memo.map(m => { return m.replace(/X/g, number); });
					role.memo = role.memo.concat(memo);
					target.splice(j, 1);
					j--;
				} else if (MafiaData.modifiers[id]) {
					if (typeof MafiaData.modifiers[id] === 'string') target[j] = MafiaData.modifiers[id];
					if (MafiaData.modifiers[id].memo) role.memo = role.memo.concat(MafiaData.modifiers[id].memo);
					target.splice(j, 1);
					j--;
				}
			}
			if (hasProblem) continue;
			// Determine the role's alignment
			for (let j = 0; j < target.length; j++) {
				let id = toId(target[j]);
				if (MafiaData.alignments[id]) {
					if (typeof MafiaData.alignments[id] === 'string') target[j] = MafiaData.alignments[id];
					if (role.alignment) {
						// A role cant have multiple alignments
						hasProblem = true;
						problems.push(`The role "${role.name}" has multiple possible alignments (${MafiaData.alignments[id].id} or ${role.alignment})`);
						break;
					}
					role.alignment = MafiaData.alignments[id].id;
					role.memo = role.memo.concat(MafiaData.alignments[id].memo);
					if (!role.image && MafiaData.alignments[id].image) role.image = MafiaData.alignments[id].image;
					target.splice(j, 1);
					j--;
				}
			}
			if (!role.alignment) role.alignment = 'town'; // Default to town
			if (alignments.indexOf(role.alignment) === -1) alignments.push(role.alignment);
			// Handle anything that is unknown
			if (target.length) {
				role.memo.push(`To learn more about your role, PM the host (${this.host}).`);
			}
			this.originalRoles.push(role);
		}
		if (alignments.length < 2) problems.push(`There must be at least 2 different alignments in a game!`);
		if (problems.length) {
			this.originalRoles = [];
			return problems;
		}
		this.roles = this.originalRoles.slice();
		this.originalRoleString = this.originalRoles.slice().map(r => { return `<span style="font-weight:bold;color:${MafiaData.alignments[r.alignment].color || '#FFF'}">${r.name}</span>`; }).join(', ');
		this.roleString = this.originalRoleString;
		this.updatePlayers();
		return [];
	}

	start(user) {
		if (!user) return false;
		if (this.phase !== 'locked') {
			if (this.phase === 'signups') return user.sendTo(this.room, `You need to close the signups first.`);
			return user.sendTo(this.room, `The game is already started!`);
		}
		if (this.playerCount < 2) return user.sendTo(this.room, `You need at least 2 players to start.`);
		if (!Object.keys(this.roles).length) return user.sendTo(this.room, `You need to set the roles before starting.`);
		if (Object.keys(this.roles).length !== this.playerCount) return user.sendTo(this.room, `You have not provided enough roles for the players.`);
		this.started = true;
		this.played = Object.keys(this.players);
		this.sendRoom(`The game of ${this.title} is starting!`, {declare: true});
		this.played.push(this.hostid);
		this.distributeRoles();
		this.day(false, true);
	}

	distributeRoles() {
		if (this.phase !== 'locked' || !Object.keys(this.roles).length) return false;
		this.sendRoom(`The roles are being distributed...`);
		let roles = Dex.shuffle(this.roles.slice());
		let alignments = {};
		for (let p in this.players) {
			let role = roles.shift();
			this.players[p].role = role;
			if (!['town', 'solo'].includes(role.alignment)) {
				if (!alignments[role.alignment]) alignments[role.alignment] = [];
				alignments[role.alignment].push(this.players[p].userid);
			}
		}
		for (let a in alignments) {
			for (let p of alignments[a]) {
				this.players[p].alliedPlayers = alignments[a];
			}
		}
		this.sendRoom(`The roles have been distributed.`, {declare: true});
		this.updatePlayers();
		return true;
	}

	getPartners(alignment, player) {
		if (typeof player === "string") player = this.players[player];
		if (!player || !player.role || ['town', 'solo'].includes(player.role.alignment)) return "";
		let partners = [];
		for (let p in this.players) {
			if (p === player.userid) continue;
			if (this.players[p].role.alignment === player.role.alignment) partners.push(this.players[p].name);
		}
		return partners.join(", ");
	}

	day(extention, initial) {
		if (this.phase !== 'night' && !initial) return false;
		if (this.timer) this.setDeadline('off');
		this.lynches = {};
		this.phase = 'day';
		if (extention && !initial) {
			// Day stays same
			this.setDeadline(extention);
		} else {
			this.dayNum++;
		}
		this.sendRoom(`Day ${this.dayNum}. The hammer count is set at ${this.getHammer()}`, {declare: true});
		this.updatePlayers();
		return true;
	}

	night(early) {
		if (this.phase !== 'day') return false;
		if (this.timer) this.setDeadline('off');
		this.phase = 'night';
		this.sendRoom(`Night ${this.dayNum}. PM the host your action, or idle.`, {declare: true});
		if (!early && this.getPlurality()) this.sendRoom(`Plurality is on ${this.players[this.getPlurality()].name}`);
		this.updatePlayers();
		return true;
	}

	lynch(user, target) {
		if (this.phase !== 'day') return false;
		let player = this.players[user.userid];
		if (!player && this.dead[user.userid] && this.dead[user.userid].restless) player = this.dead[user.userid];
		if (!(target in this.players) && target !== 'nolynch') return false;
		if (player.lynching || (target === player.userid && !this.selfEnabled)) return false;
		let lynch = this.lynches[target];
		if (!lynch) {
			this.lynches[target] = {count: 1, lastLynch: Date.now(), dir: 'up', lynchers: [user.userid]};
			lynch = this.lynches[target];
		} else {
			lynch.count++;
			lynch.lastLynch = Date.now();
			lynch.dir = 'up';
			lynch.lynchers.push(user.userid);
		}
		player.lynching = target;
		if (this.getHammer() <= lynch.count) {
			// HAMMER
			this.sendRoom(`Hammer! ${target === 'nolynch' ? 'Nobody' : this.players[target].name} was lynched!`, {declare: true});
			if (target !== 'nolynch') this.eliminate(target);
			this.night(true);
		}
		if (this.getPlurality() !== this.hasPlurality) this.hasPlurality = this.getPlurality();
		// Ask about bandwidth concerns
		//this.updatePlayers();
		return true;
	}

	unlynch(user) {
		if (this.phase !== 'day') return false;
		let player = this.players[user.userid];
		if (!player && this.dead[user.userid] && this.dead[user.userid].restless) player = this.dead[user.userid];
		if (!player.lynching) return false;
		let lynch = this.lynches[player.lynching];
		lynch.count--;
		if (lynch.count <= 0) {
			delete this.lynches[player.lynching];
		} else {
			lynch.lastLynch = Date.now();
			lynch.dir = 'down';
			lynch.lynchers.splice(lynch.lynchers.indexOf(user.userid), 1);
		}
		player.lynching = '';
		if (this.getPlurality() !== this.hasPlurality) this.hasPlurality = this.getPlurality();
		// Ask about bandwidth concerns
		//this.updatePlayers();
		return true;
	}

	getHammer() {
		return Math.floor(Object.keys(this.players).length / 2) + 1;
	}

	getPlurality() {
		if (!Object.keys(this.lynches).length) return null;
		let max = 0;
		let topLynches = [];
		for (let key in this.lynches) {
			if (this.lynches[key].num > max) {
				max = this.lynches[key].num;
				topLynches = [key];
			} else if (this.lynches[key].num === max) {
				topLynches.push(key);
			}
		}
		if (topLynches.length === 1) return topLynches[0];
		topLynches = topLynches.sort((l1, l2) => {
			l1 = this.lynches[l1];
			l2 = this.lynches[l2];
			if (l1.dir !== l2.dir) {
				return (l1.dir === 'down' ? -1 : 1);
			} else {
				if (l1.dir === 'up') return (l1.lastLynch < l2.lastLynch ? -1 : 1);
				return (l1.lastLynch > l2.lastLynch ? -1 : 1);
			}
		});
		return topLynches[0];
	}

	eliminate(player, ability) {
		player = this.players[toId(player)];
		if (!player) return false;
		if (!this.started) {
			// Game has not started, simply kick the player
			player.destroy();
			delete this.players[toId(player)];
			return this.updatePlayers();
		}
		this.dead[player.userid] = player;
		let msg = `${player.name}`;
		switch (ability) {
		case 'treestump':
			this.dead[player.userid].treestump = true;
			msg += ` has been treestumped`;
			break;
		case 'spirit':
			this.dead[player.userid].restless = true;
			msg += ` became a restless spirit`;
			break;
		default:
			msg += ` was eliminated`;
		}
		this.sendRoom(`${msg}! ${!this.noReveal ? `${player.name}'s role was ${player.getRole()}.` : ''}`, {declare: true});
		for (let role of this.roles) {
			if (role.id === player.role.id) {
				this.roles.splice(this.roles.indexOf(role), 1);
				break;
			}
		}
		delete this.players[player.userid];
		this.playerCount--;
		this.updateRoleString();
		this.updatePlayers();
		return true;
	}

	revive(deadPlayer) {
		if (!this.started) return false;
		if (!(deadPlayer in this.dead)) return false;
		deadPlayer = this.dead[deadPlayer];
		if (deadPlayer.treestump) delete deadPlayer.treestump;
		if (deadPlayer.restless) delete deadPlayer.restless;
		this.sendRoom(`${deadPlayer.name} was revived!`, {declare: true});
		this.players[deadPlayer.userid] = deadPlayer;
		this.roles.push(deadPlayer.role);
		delete this.dead[deadPlayer.userid];
		this.playerCount++;
		this.updateRoleString();
		this.updatePlayers();
		return true;
	}

	setDeadline(minutes) {
		if (minutes === 'off') {
			if (!this.timer) return false;
			clearTimeout(this.timer);
			this.timer = null;
			this.sendRoom(`The deadline has been cleared.`);
			return true;
		}
		minutes = parseInt(minutes);
		if (isNaN(minutes) || minutes < 1 || minutes > 10) return false;
		if (this.timer) clearTimeout(this.timer);
		if (minutes > 3) {
			this.timer = setTimeout(() => {
				this.sendRoom(`3 minutes left!`);
				this.timer = setTimeout(() => {
					this.sendRoom(`1 minute left!`);
					this.timer = setTimeout(() => {
						this.sendRoom(`Time is up!`);
						this.night();
					}, 60000);
				}, 3 * 60000);
			}, (minutes - 3) * 60000);
		} else if (minutes > 1) {
			this.timer = setTimeout(() => {
				this.sendRoom(`1 minute left!`);
				this.timer = setTimeout(() => {
					this.sendRoom(`Time is up!`);
					if (this.phase === 'day') this.night();
				}, 60000);
			}, (minutes - 1) * 60000);
		} else {
			this.timer = setTimeout(() => {
				this.sendRoom(`Time is up!`);
				this.night();
			}, minutes * 60000);
		}
		this.sendRoom(`The deadline has been set for ${minutes} minute${minutes === 1 ? '' : 's'}.`);
	}

	nextSub(userid) {
		if (!this.subs.length || (!this.requestedSub.length && !userid)) return;
		let oldPlayer;
		if (userid) {
			// Force sub this player now
			if (!(userid in this.players)) return;
			oldPlayer = this.players[userid];
		} else {
			userid = this.requestedSub.shift();
			oldPlayer = this.players[userid];
		}
		if (oldPlayer.lynching) this.unlynch(Users(userid));
		let newPlayer = this.makePlayer(Users(this.subs.shift()));
		newPlayer.role = oldPlayer.role;
		this.players[newPlayer.userid] = newPlayer;
		delete this.players[userid];
		// Transfer lynches on the old player to the new one
		if (this.lynches[userid]) {
			this.lynches[newPlayer.userid] = this.lynches[userid];
			delete this.lynches[userid];
			for (let p in this.players) {
				if (this.players[p].lynching === userid) this.players[p].lynching = newPlayer.userid;
			}
		}
		if (this.started) this.played.push(newPlayer.userid);
		this.sendRoom(`${oldPlayer.name} has been subbed out. ${newPlayer.name} has joined the game.`, {declare: true});
		this.updatePlayers();
	}

	updatePlayers() {
		for (let p in this.players) {
			this.players[p].updateHtmlRoom();
		}
		// Now do the host
		this.updateHost();
	}

	updateHost() {
		const host = Users(this.hostid);
		if (!host || !host.connected) return;
		if (this.ended) return host.send(`>view-mafia-${this.room.id}\n|deinit`);
		const buf = Chat.pages.mafia([this.room.id], host);
		host.send(`>view-mafia-${this.room.id}\n|init|html\n${buf}`);
	}

	updateRoleString() {
		this.roleString = this.roles.slice().map(r => { return `<span style="font-weight:bold;color:${MafiaData.alignments[r.alignment].color || '#FFF'}">${r.name}</span>`; }).join(', ');
	}

	sendRoom(message, options = {}) {
		if (options.uhtml) return this.room.add(`|uhtml|mafia|${message}`).update();
		if (options.declare) return this.room.add(`|raw|<div class="broadcast-blue">${message}</div>`).update();
		return this.room.add(message).update();
	}

	roomWindow() {
		if (this.ended) return `<div class="infobox">The game of ${this.title} has ended.</div>`;
		let output = `<div class="broadcast-blue">`;
		if (this.phase === 'signups') {
			output += `<h2 style="text-align: center">A game of ${this.title} was created</h2><p style="text-align: center"><button class="button" name="send" value="/mafia join">Join the game</button> <button class="button" name="send" value="/join view-mafia-${this.room.id}">Spectate the game</button></p>`;
		} else {
			output += `<p style="font-weight: bold">A game of ${this.title} is in progress. <button class="button" name="send" value="/mafia sub ${this.room.id}, in">Become a substitute</button> <button class="button" name="send" value="/join view-mafia-${this.room.id}">Spectate the game</button></p>`;
		}
		output += `</div>`;
		return output;
	}

	onChatMessage(message, user) {
		if (user.isStaff || (this.room.auth && this.room.auth[user.userid] && this.room.auth[user.userid] !== '+') || this.hostid === user.userid || !this.started) return false;
		if (!this.players[user.userid] && (!this.dead[user.userid] || !this.dead[user.userid].treestump)) return `You cannot talk while a game of ${this.title} is going on.`;
		if (this.phase === 'night') return `You cannot talk at night.`;
		return false;
	}

	onConnect(user) {
		user.sendTo(this.room, `|uhtml|mafia|${this.roomWindow()}`);
	}

	onLeave(user) {
		if (this.subs.includes(user.userid)) this.subs.splice(this.subs.indexOf(user.userid), 1);
	}

	renamePlayer(user, oldUserid) {
		if (user.userid === oldUserid) {
			this.players[user.userid].name = user.name;
		} else {
			this.players[user.userid] = this.players[oldUserid];
			this.players[user.userid].userid = user.userid;
			this.players[user.userid].name = user.name;
			delete this.players[oldUserid];
		}
	}

	removeBannedUser(user) {
		// Player was banned, attempt to sub now
		// If we can't sub now, make subbing them out the top priority
		if (this.subs.length) return this.nextSub(user.userid);
		this.reqestedSub.unshift(user.userid);
	}

	forfeit(user) {
		// Treat it as if the user was banned (force sub)
		return this.removeBannedUser(user);
	}

	end() {
		this.ended = true;
		this.sendRoom(this.roomWindow(), {uhtml: true});
		this.updatePlayers();
		if (this.started) {
			// Intead of using this.played, which shows players who have subbed out as well
			// We check who played through to the end when recording playlogs
			const played = Object.keys(this.players).concat(Object.keys(this.dead));
			const month = new Date().toLocaleString("en-us", {month: "numeric", year: "numeric"});
			if (!logs.plays[month]) logs.plays[month] = {};
			for (let player of played) {
				if (!logs.plays[month][player]) logs.plays[month][player] = 0;
				logs.plays[month][player]++;
			}
			if (!logs.hosts[month]) logs.hosts[month] = {};
			if (!logs.hosts[month][this.hostid]) logs.hosts[month][this.hostid] = 0;
			logs.hosts[month][this.hostid]++;
			writeLogs();
		}
		this.destroy();
		return true;
	}
}

exports.pages = {
	mafia: function (query, user) {
		if (!user.named) return Rooms.RETRY_AFTER_LOGIN;
		if (!query.length) return `|deinit`;
		const room = Rooms(query.shift());
		if (!room || !room.users[user.userid] || !room.game || room.game.gameid !== 'mafia' || room.game.ended) return `|deinit`;
		const isPlayer = user.userid in room.game.players;
		const isHost = user.userid === room.game.hostid;
		let buf = `|title|${room.game.title}\n|pagehtml|<div class="pad broadcast-blue">`;
		if (query.length) {
			// When we are not viewing the base window, we need to use a <a> tag so we dont have 2 HTML windows if the user hits refresh.
			buf += `<a class="button" href="/view-mafia-${room.id}" target="replace" style="float:left"><i class="fa fa-refresh"></i> Refresh</a>`;
		} else {
			// When we are on the base window, we need to use a <button> tag so we dont reload the HTML window in a new tab
			buf += `<button class="button" name="send" value="/join view-mafia-${room.id}" style="float:left"><i class="fa fa-refresh"></i> Refresh</button>`;
		}
		buf += `<br/><br/><h1 style="text-align:center;">${room.game.title}</h1><h3>Host: ${room.game.host}</h3>`;
		buf += `<p style="font-weight:bold;">Players (${room.game.playerCount}): ${Object.keys(room.game.players).map(p => { return room.game.players[p].name; }).join(', ')}</p><hr/>`;
		if (!room.game.closedSetup) {
			if (room.game.noReveal) {
				buf += `<p><span style="font-weight:bold;">Original Rolelist</span>: ${room.game.originalRoleString}</p>`;
			} else {
				buf += `<p><span style="font-weight:bold;">Rolelist</span>: ${room.game.roleString}</p>`;
			}
		}
		if (isPlayer) {
			if (room.game.players[user.userid].role) {
				buf += `<h3>${room.game.players[user.userid].name}, you are a ${room.game.players[user.userid].getRole()}</h3>`;
				buf += `<table><tr><td style="text-align:center;">${room.game.players[user.userid].role.image || `<img width="75" height="75" src="//play.pokemonshowdown.com/fx/mafia-villager.png"/>`}</td><td style="text-align:center;width:100%"><ul>${room.game.players[user.userid].role.memo.map(m => { return `<li>${m}</li>`; }).join('')}</ul></td></tr></table>`;
				if (!['town', 'solo'].includes(room.game.players[user.userid].role.alignement)) buf += `<p><span style="font-weight:bold">Partners</span>: ${room.game.getPartners(room.game.players[user.userid].role.alignement, room.game.players[user.userid])}</p>`;
			}
			if (room.game.phase === 'signups') {
				buf += `<p><button class="button" name="send" value="/mafia leave ${room.id}">Leave game</button></p>`;
			} else {
				if (!room.game.requestedSub.includes(user.userid)) {
					buf += `<p><button class="button" name="send" value="/mafia sub ${room.id}, out">Request to be subbed out</button></p>`;
				} else {
					buf += `<p><button class="button" name="send" value="/mafia sub ${room.id}, in">Cancel sub request</button></p>`;
				}
			}
		}
		if (room.game.phase === "day") {
			buf += `<h3>Lynches (Hammer: ${room.game.getHammer()})</h3>`;
			let plur = room.game.hasPlurality;
			let list = Object.keys(room.game.players).concat(['nolynch']);
			for (let key of list) {
				if (room.game.lynches[key]) {
					buf += `<p style="font-weight:bold">${room.game.lynches[key].count}${plur === key ? '*' : ''} ${room.game.players[key] ? room.game.players[key].name : 'No-Lynch'} (${room.game.lynches[key].lynchers.join(', ')}) `;
				} else {
					buf += `<p style="font-weight:bold">0 ${room.game.players[key] ? room.game.players[key].name : 'No-Lynch'} `;
				}
				if (isPlayer) {
					buf += `<button class="button" name="send" value="`;
					if (room.game.players[user.userid].lynching === key) {
						buf += `/mafia unlynch ${room.id}">Unlynch ${room.game.players[key] ? room.game.players[key].name : 'No-Lynch'}</button>`;
					} else {
						buf += `/mafia lynch ${room.id}, ${key}">Lynch ${room.game.players[key] ? room.game.players[key].name : 'No-Lynch'}</button>`;
					}
				}
				buf += `</p>`;
			}
		} else if (room.game.phase === "night" && isPlayer) {
			buf += `<p style="font-weight:bold;">PM the host (${room.game.host}) the action you want to use tonight, and who you want to use it on. Or PM the host "idle".</p>`;
		}
		if (isHost) {
			buf += `<h3>Host options</h3>`;
			if (query[0] === 'general') {
				buf += `<h3>General Options</h3>`;
				if (!room.game.started) {
					buf += `<p><button class="button" name="send" value="/mafia closedsetup ${room.id}, ${room.game.closedSetup ? 'off' : 'on'}">${room.game.closedSetup ? 'Disable' : 'Enable'} Closed Setup</button>`;
					if (room.game.phase === 'locked') {
						buf += ` <button class="button" name="send" value="/mafia start ${room.id}">Start Game</button>`;
					} else {
						buf += ` <button class="button" name="send" value="/mafia close ${room.id}">Close Signups</button>`;
					}
				} else if (room.game.phase === 'day') {
					buf += `<p><button class="button" name="send" value="/mafia night ${room.id}">Go to Night ${room.game.dayNum}</button>`;
				} else if (room.game.phase === 'night') {
					buf += `<p><button class="button" name="send" value="/mafia day ${room.id}">Go to Day ${room.game.dayNum + 1}</button> <button class="button" name="send" value="/mafia extend">Return to Day ${room.game.dayNum}</button>`;
				}
				buf += ` <button class="button" name="send" value="/mafia reveal ${room.id}, ${room.game.noReveal ? 'off' : 'on'}">${room.game.noReveal ? 'Enable' : 'Disable'} revlealing of roles</button> <button class="button" name="send" value="/mafia end ${room.id}">End Game</button></p>`;
			} else {
				buf += `<p><a class="button" href="/view-mafia-${room.id}-general" target="replace">General Options</a></p>`;
			}
			if (query[0] === 'players') {
				buf += `<h3>Player Options</h3>`;
				for (let p in room.game.players) {
					let player = room.game.players[p];
					buf += `<p style="font-weight:bold;">${player.name} (${player.role ? player.getRole() : ''}): <button class="button" name="send" value="/mafia kill ${room.id}, ${player.userid}">Kill</button> <button class="button" name="send" value="/mafia treestump ${room.id}, ${player.userid}">Treestump</button> <button class="button" name="send" value="/mafia spirit ${room.id}, ${player.userid}">Make a Restless Spirit (Kills)</button> <button class="button" name="send" value="/mafia sub ${room.id}, next, ${player.userid}">Force sub</button></p>`;
				}
				for (let d in room.game.dead) {
					let dead = room.game.dead[d];
					buf += `<p style="font-weight:bold;">${dead.name} (${dead.role ? dead.getRole() : ''})`;
					if (dead.treestump) buf += ` (is a Treestump)`;
					if (dead.restless) buf += ` (is a Restless Spirit)`;
					buf += `: <button class="button" name="send" value="/mafia revive ${room.id}, ${dead.userid}">Revive</button></p>`;
				}
			} else {
				buf += `<p><a class="button" href="/view-mafia-${room.id}-players" target="replace">Player Options</a></p>`;
			}
			if (query[0] === 'roles') {
				buf += `<h3>Setting the roles</h3>`;
				buf += `<p>To set the roles, use /mafia setroles [comma seperated list of roles] in ${room.title}.</p>`;
				buf += `<p>The following key words determine a role's alignment (If none are found, the default alignment is town):</p>`;
				buf += `<p style="font-weight:bold">${Object.keys(MafiaData.alignments).map(a => { return `<span style="color:${MafiaData.alignments[a].color || '#FFF'}">${MafiaData.alignments[a].name}</span>`; }).join(', ')}</p>`;
				buf += `<p>If you have roles that have conflicting alignments or base roles, you can use /mafia forcesetroles [comma seperated list of roles] to forcibly set the roles.</p>`;
				buf += `<p>Please note that you will have to PM all the players their alignment, partners (if any), and other infromation about their role because the server will not provide it.</p>`;
			} else {
				buf += `<p><a class="button" href="/view-mafia-${room.id}-roles" target="replace">How to setup roles</a></p>`;
			}
			buf += `<p style="font-weight:bold;">Sub List: ${room.game.subs.join(', ')}</p>`;
			buf += `<p style="font-weight:bold;">Players who are requesting a sub: ${room.game.requestedSub.join(', ')}</p>`;
		}
		if (!isPlayer && !isHost) {
			if (!room.game.started) {
				buf += `<p><button class="button" name="send" value="/mafia join ${room.id}">Join game</button></p>`;
			} else if (room.game.subs.includes(user.userid)) {
				buf += `<p><button class="button" name="send" value="/mafia sub ${room.id}, out">Cancel sub request</button></p>`;
			} else {
				buf += `<p><button class="button" name="send" value="/mafia sub ${room.id}, in">Join the game as a sub</button></p>`;
			}
		}
		buf += `</div>`;
		return buf;
	},
	mafialadder: function (query, user) {
		if (!user.named) return Rooms.RETRY_AFTER_LOGIN;
		if (!query.length || !Rooms('mafia')) return `|deinit`;
		const headers = {
			leaderboard: {title: 'Leaderboard', type: 'Points', section: 'leaderboard'},
			mvpladder: {title: 'MVP Ladder', type: 'MVPs', section: 'mvps'},
			hostlogs: {title: 'Host Logs', type: 'Hosts', section: 'hosts'},
			playlogs: {title: 'Play Logs', type: 'Plays', section: 'plays'},
		};
		let date = new Date();
		if (query[1] === 'prev') date.setMonth(date.getMonth() - 1);
		const month = date.toLocaleString("en-us", {month: "numeric", year: "numeric"});
		const ladder = headers[query[0]];
		if (!ladder) return `|deinit`;
		if (['hosts', 'plays'].includes(ladder.section) && !user.can('mute', null, Rooms('mafia'))) return `|deinit`;
		let buf = `|title|Mafia ${ladder.title} (${date.toLocaleString("en-us", {month: 'long'})} ${date.getFullYear()})\n|pagehtml|<div class="pad ladder">${query[1] === 'prev' ? '' : `<button class="button" name="send" value="/join view-mafialadder-${query[0]}" style="float:left"><i class="fa fa-refresh"></i> Refresh</button> <button class="button" name="send" value="/join view-mafialadder-${query[0]}-prev" style="float:left">View last month's ${ladder.title}</button>`}<br /><br />`;
		buf += `<table style="margin-left: auto; margin-right: auto"><tbody><tr><th colspan="2"><h2 style="margin: 5px auto">Mafia ${ladder.title} for ${date.toLocaleString("en-us", {month: 'long'})} ${date.getFullYear()}</h1></th></tr>`;
		buf += `<tr><th>User</th><th>${ladder.type}</th></tr>`;
		if (!logs[ladder.section][month]) {
			buf += `<tr><td colspan="2">${ladder.title} for ${date.toLocaleString("en-us", {month: 'long'})} ${date.getFullYear()} not found.</td></tr></table></div>`;
			return buf;
		}
		const keys = Object.keys(logs[ladder.section][month]).sort((a, b) => {
			a = logs[ladder.section][a];
			b = logs[ladder.section][b];
			return b - a;
		});
		for (const key of keys) {
			buf += `<tr><td>${key}</td><td>${logs[ladder.section][month][key]}</td></tr>`;
		}
		return buf + `</table></div>`;
	},
};

exports.commands = {
	mafia: {
		host: function (target, room, user) {
			if (!room.mafiaEnabled) return this.errorReply(`Mafia is disabled for this room.`);
			if (!this.canTalk()) return;
			if (room.game) return this.errorReply(`There is already a game of ${room.game.title} in progress in this room.`);
			if (!target) return this.parse('/help mafia host');
			this.splitTarget(target);
			let targetUser = this.targetUser;
			if (!targetUser || !targetUser.connected) return this.errorReply(`The user "${this.targetUsername}" was not found.`);
			if (!room.users[targetUser.userid]) return this.errorReply(`${targetUser.name} is not in this room, and cannot be hosted.`);
			if (!user.can('mute', null, room) && !user.can('broadcast', null, room)) return this.errorReply(`/mafia host - Access denied.`);
			if (!user.can('mute', null, room) && targetUser.userid !== user.userid) return this.errorReply(`/mafia host - Access denied for hosting users other than yourself.`);

			room.game = new MafiaTracker(room, targetUser);
			targetUser.send(`>view-mafia-${room.id}\n|init|html\n${Chat.pages.mafia([room.id], targetUser)}`);
			this.privateModAction(`(${targetUser.name} was appointed the mafia host by ${user.name}.)`);
			this.modlog('MAFIAHOST', targetUser, null, {noalts: true, noip: true});
		},
		hosthelp: ['/mafia host [user] - Create a game of Mafia with [user] as the host. Requires + % @ * # & ~'],

		'!join': true,
		join: function (target, room, user) {
			let targetRoom = room;
			if (Rooms(target) && Rooms(target).users[user.userid]) targetRoom = Rooms(target);
			if (!targetRoom || !targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			if (!this.canTalk(null, targetRoom)) return;
			targetRoom.game.join(user);
		},

		'!leave': true,
		leave: function (target, room, user) {
			let targetRoom = room;
			if (Rooms(target) && Rooms(target).users[user.userid]) targetRoom = Rooms(target);
			if (!targetRoom || !targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			targetRoom.game.leave(user);
		},

		'!close': true,
		close: function (target, room, user) {
			let targetRoom = room;
			if (Rooms(target) && Rooms(target).users[user.userid]) targetRoom = Rooms(target);
			if (!targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			if (!user.can('mute', null, targetRoom) && targetRoom.game.hostid !== user.userid) return user.sendTo(targetRoom, `|error|/mafia close - Access denied.`);
			if (targetRoom.game.phase !== 'signups') return user.sendTo(targetRoom, `|error|Signups are already closed.`);
			if (targetRoom.game.playerCount < 2) return user.sendTo(targetRoom, `|error|You need at least 2 players to start.`);
			targetRoom.game.phase = 'locked';
			targetRoom.game.sendRoom(targetRoom.game.roomWindow(), {uhtml: true});
			targetRoom.game.updatePlayers();
		},

		'!closedsetup': true,
		cs: 'closedsetup',
		closedsetup: function (target, room, user) {
			let targetRoom = room;
			target = target.split(',');
			if (Rooms(target[0]) && Rooms(target[0]).users[user.userid]) targetRoom = Rooms(target[0]);
			if (!targetRoom || !targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			if (!user.can('mute', null, targetRoom) && targetRoom.game.hostid !== user.userid) return user.sendTo(targetRoom, `|error|/mafia closedsetup - Access denied.`);
			let action = targetRoom.id === room.id ? toId(target.join('')) : toId(target[1]);
			if (!['on', 'off'].includes(action)) return this.parse('/help mafia closedsetup');
			if (targetRoom.game.started) return user.sendTo(targetRoom, `|error|You can't ${action === 'on' ? 'enable' : 'disable'} closed setup because the game has already started.`);
			if ((action === 'on' && targetRoom.game.closedSetup) || (action === 'off' && !targetRoom.game.closedSetup)) return user.sendTo(targetRoom, `|error|Closed setup is already ${targetRoom.game.closedSetup ? 'enabled' : 'disabled'}.`);
			targetRoom.game.closedSetup = action === 'on';
			targetRoom.game.updateHost();
		},
		closesetuphelp: ['/mafia closedsetup [on|off] - '],

		'!reveal': true,
		reveal: function (target, room, user) {
			let targetRoom = room;
			target = target.split(',');
			if (Rooms(target[0]) && Rooms(target[0]).users[user.userid]) targetRoom = Rooms(target[0]);
			if (!targetRoom || !targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			if (!user.can('mute', null, targetRoom) && targetRoom.game.hostid !== user.userid) return user.sendTo(targetRoom, `|error|/mafia reveal - Access denied.`);
			let action = targetRoom.id === room.id ? toId(target.join('')) : toId(target[1]);
			if (!['on', 'off'].includes(action)) return this.parse('/help mafia reveal');
			if ((action === 'on' && targetRoom.game.noReveal) || (action === 'off' && !targetRoom.game.noReveal)) return user.sendTo(targetRoom, `|error|Revealing of roles is already ${targetRoom.game.noReveal ? 'disabled' : 'enabled'}.`);
			targetRoom.game.noReveal = action === 'on';
			targetRoom.game.updatePlayers();
		},
		revealhelp: ['/mafia reveal [on|off] - '],

		forcesetroles: 'setroles',
		setroles: function (target, room, user, connection, cmd) {
			if (!room.game || room.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			if (!user.can('mute', null, room) && room.game.hostid !== user.userid) return this.errorReply(`/mafia ${cmd} - Access denied.`);
			if (room.game.phase !== 'locked') return this.errorReply(room.game.phase === 'signups' ? `You need to close signups first.` : `The game has already started.`);
			if (!target) return this.parse('/help mafia setroles');
			// Validate roles
			let problems = room.game.setRoles(target, cmd === 'forcesetroles');
			if (problems.length) return this.errorReply(problems.join('\n'));
			this.sendReply(`The roles have been set.`);
		},
		setroleshelp: ['/mafia setroles [comma seperated roles] - Set the roles for a game of mafia. You need to provide one role per player.'],

		'!start': true,
		start: function (target, room, user) {
			let targetRoom = room;
			target = target.split(',');
			if (Rooms(target[0]) && Rooms(target[0]).users[user.userid]) targetRoom = Rooms(target.shift());
			if (!targetRoom || !targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			if (!user.can('mute', null, room) && targetRoom.game.hostid !== user.userid) return user.sendTo(targetRoom, `|error|/mafia start - Access denied.`);
			targetRoom.game.start(user);
		},

		'!day': true,
		extend: 'day',
		night: 'day',
		day: function (target, room, user, connection, cmd) {
			let targetRoom = room;
			target = target.split(',');
			if (Rooms(target[0]) && Rooms(target[0]).users[user.userid]) targetRoom = Rooms(target.shift());
			if (!targetRoom || !targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			if (!user.can('mute', null, room) && targetRoom.game.hostid !== user.userid) return user.sendTo(targetRoom, `/mafia ${cmd} - Access denied.`);
			if (cmd === 'night') {
				targetRoom.game.night();
			} else {
				target = parseInt(toId(target.join('')));
				if (isNaN(target)) {
					target = 'off';
				} else {
					if (target < 1) target = 1;
					if (target > 10) target = 10;
				}
				targetRoom.game.day((cmd === 'extend' ? target : false));
			}
		},

		'!lynch': true,
		lynch: function (target, room, user) {
			let targetRoom = room;
			target = target.split(',');
			if (Rooms(target[0]) && Rooms(target[0]).users[user.userid]) targetRoom = Rooms(target.shift());
			if (!targetRoom || !targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			if (!(user.userid in targetRoom.game.players) && (!(user.userid in targetRoom.game.dead) || !targetRoom.game.dead[user.userid].restless)) return user.sendTo(targetRoom, `|error|You are not in the game of ${targetRoom.game.title}.`);
			targetRoom.game.lynch(user, toId(target.join('')));
		},

		'!unlynch': true,
		unlynch: function (target, room, user) {
			let targetRoom = room;
			if (Rooms(target) && Rooms(target).users[user.userid]) targetRoom = Rooms(target);
			if (!targetRoom || !targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			if (!(user.userid in targetRoom.game.players)) return user.sendTo(targetRoom, `|error|You are not in the game of ${targetRoom.game.title}.`);
			targetRoom.game.unlynch(user);
		},

		'!kill': true,
		treestump: 'kill',
		spirit: 'kill',
		kill: function (target, room, user, connection, cmd) {
			let targetRoom = room;
			target = target.split(',');
			if (Rooms(target[0]) && Rooms(target[0]).users[user.userid]) targetRoom = Rooms(target.shift());
			if (!targetRoom || !targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			if (!user.can('mute', null, room) && targetRoom.game.hostid !== user.userid) return user.sendTo(targetRoom, `|error|/mafia kill - Access denied.`);
			targetRoom.game.eliminate(toId(target.join('')), cmd);
		},

		'!revive': true,
		add: 'revive',
		revive: function (target, room, user) {
			let targetRoom = room;
			target = target.split(',');
			if (Rooms(target[0]) && Rooms(target[0]).users[user.userid]) targetRoom = Rooms(target.shift());
			if (!targetRoom || !targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			if (!user.can('mute', null, room) && targetRoom.game.hostid !== user.userid) return user.sendTo(targetRoom, `|error|/mafia revive - Access denied.`);
			targetRoom.game.revive(toId(target.join('')));
		},

		'!sub': true,
		sub: function (target, room, user) {
			// roomid, [in|out|next], (player to sub for if next)
			let targetRoom = room;
			target = target.split(',');
			if (Rooms(target[0]) && Rooms(target[0]).users[user.userid]) targetRoom = Rooms(target.shift());
			if (!targetRoom || !targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			let action = toId(target.shift()), game = targetRoom.game;
			switch (action) {
			case 'in':
				if (user.userid in game.players) {
					// Check if they have requested to be subbed out.
					if (!game.requestedSub.includes(user.userid)) return user.sendTo(targetRoom, `|error|You have not requested to be subbed out.`);
					game.requestedSub.splice(game.requestedSub.indexOf(user.userid), 1);
					user.sendTo(room, `|error|You have cancelled your request to sub out.`);
					game.players[user.userid].updateHtmlRoom();
				} else {
					if (game.subs.includes(user.userid)) return user.sendTo(targetRoom, `|error|You are already on the sub list.`);
					if (game.played.includes(user.userid)) return user.sendTo(targetRoom, `|error|You cannot sub back into the game.`);
					if (game.subs.includes(user.userid)) return user.sendTo(targetRoom, `|error|You have already requested to be subbed in.`);
					game.subs.push(user.userid);
					game.nextSub();
					// Update spectator's view
					this.parse(`/join view-mafia-${targetRoom.id}`);
				}
				break;
			case 'out':
				if (user.userid in game.players) {
					if (game.requestedSub.includes(user.userid)) return user.sendTo(targetRoom, `|error|You have already requested to be subbed out.`);
					game.requestedSub.push(user.userid);
					game.players[user.userid].updateHtmlRoom();
					game.nextSub();
				} else {
					if (!game.subs.includes(user.userid)) return user.sendTo(targetRoom, `|error|You are not on the sub list.`);
					game.subs.splice(game.subs.indexOf(user.userid), 1);
					// Update spectator's view
					this.parse(`/join view-mafia-${targetRoom.id}`);
				}
				break;
			case 'next':
				if (!user.can('mute', null, room) && game.hostid !== user.userid) return user.sendTo(targetRoom, `|error|/mafia sub - Access denied for force substituting a player.`);
				let toSub = target.shift();
				if (!(toId(toSub) in game.players)) return user.sendTo(targetRoom, `|error|${toSub} is not in the game.`);
				if (!game.subs.length) return user.sendTo(targetRoom, `|error|There are no subs to replace ${toSub}.`);
				game.nextSub(toId(toSub));
				break;
			}
			game.updateHost();
		},

		'!end': true,
		end: function (target, room, user) {
			let targetRoom = room;
			target = target.split(',');
			if (target && Rooms(target[0]) && Rooms(target[0]).users[user.userid]) targetRoom = Rooms(target[0]);
			if (!targetRoom || !targetRoom.game || targetRoom.game.gameid !== 'mafia') return this.errorReply(`There is no game of mafia running in this room.`);
			if (!user.can('mute', null, targetRoom) && targetRoom.game.hostid !== user.userid) return user.sendTo(targetRoom, `|error|/mafia end - Access denied.`);
			targetRoom.game.end(true);
			this.modlog('MAFIAEND');
		},

		win: function (target, room, user) {
			if (!room.mafiaEnabled) return this.errorReply(`Mafia is disabled for this room.`);
			if (room.id !== 'mafia') return this.errorReply(`This command can only be used in the Mafia room.`);
			if (!this.can('mute', null, room)) return;
			target = target.split(',');
			let points = parseInt(target[0]);
			if (isNaN(points)) {
				points = 10;
			} else {
				if (points > 100 || points < -100) return this.errorReply(`You cannot give or take more than 100 points at a time.`);
				// shift out the point count
				target.shift();
			}
			if (!target.length) return this.parse('/help mafia win');
			const month = new Date().toLocaleString("en-us", {month: "numeric", year: "numeric"});
			if (!logs.leaderboard[month]) logs.leaderboard[month] = {};
			let gavePoints = false;
			for (let u of target) {
				u = toId(u);
				if (!u) continue;
				if (!gavePoints) gavePoints = true;
				if (!logs.leaderboard[month][u]) logs.leaderboard[month][u] = 0;
				logs.leaderboard[month][u] += points;
				if (logs.leaderboard[month][u] === 0) delete logs.leaderboard[month][u];
			}
			if (!gavePoints) return this.parse('/help mafia win');
			writeLogs();
			this.modlog(`MAFIAPOINTS`, null, `${points} points were awarded to ${Chat.toListString(target)}`);
			return this.sendReply(`${points} points were awarded to: ${Chat.toListString(target)}`);
		},
		winhelp: ['/mafia win (points) [user1], [user2], [user3], ... - Award the specified users points to the mafia leaderboard for this month. The amount of points can be negative to take points. Defaults to 10 points.'],

		unmvp: 'mvp',
		mvp: function (target, room, user, connection, cmd) {
			if (!room.mafiaEnabled) return this.errorReply(`Mafia is disabled for this room.`);
			if (room.id !== 'mafia') return this.errorReply(`This command can only be used in the Mafia room.`);
			if (!this.can('mute', null, room)) return;
			target = target.split(',');
			if (!target.length) return this.parse('/help mafia mvp');
			const month = new Date().toLocaleString("en-us", {month: "numeric", year: "numeric"});
			if (!logs.mvps[month]) logs.mvps[month] = {};
			if (!logs.leaderboard[month]) logs.leaderboard[month] = {};
			let gavePoints = false;
			for (let u of target) {
				u = toId(u);
				if (!u) continue;
				if (!gavePoints) gavePoints = true;
				if (!logs.leaderboard[month][u]) logs.leaderboard[month][u] = 0;
				if (!logs.mvps[month][u]) logs.mvps[month][u] = 0;
				if (cmd === 'unmvp') {
					logs.mvps[month][u]--;
					logs.leaderboard[month][u] -= 5;
					if (logs.mvps[month][u] === 0) delete logs.mvps[month][u];
					if (logs.leaderboard[month][u] === 0) delete logs.leaderboard[month][u];
				} else {
					logs.mvps[month][u]++;
					logs.leaderboard[month][u] += 5;
				}
			}
			if (!gavePoints) return this.parse('/help mafia mvp');
			writeLogs();
			this.modlog(`MAFIA${cmd.toUpperCase()}`, null, `MVP and 5 points were ${cmd === 'unmvp' ? 'taken from' : 'awarded to'} ${Chat.toListString(target)}`);
			return this.sendReply(`MVP and 5 points were ${cmd === 'unmvp' ? 'taken from' : 'awarded to'}: ${Chat.toListString(target)}`);
		},
		mvphelp: ['/mafia mvp [user1], [user2], ... OR /mafia unmvp [user1], [user2], ... - Gives or takes away a MVP point from the users specified. MVP also awards 5 points to the leaderboard.'],

		hostlogs: 'leaderboard',
		playlogs: 'leaderboard',
		mvpladder: 'leaderboard',
		leaderboard: function (target, room, user, connection, cmd) {
			if (!room.mafiaEnabled) return this.errorReply(`Mafia is disabled for this room.`);
			if (room.id !== 'mafia') return this.errorReply(`This command can only be used in the Mafia room.`);
			if (['hostlogs', 'playlogs'].includes(cmd)) {
				if (!this.can('mute', null, room)) return;
			} else {
				// Deny broadcasting host/playlogs
				if (!this.runBroadcast()) return;
			}
			if (this.broadcasting) return this.sendReplyBox(`<button name="joinRoom" value="view-mafialadder-${cmd}" class="button"><strong>${cmd}</strong></button>`);
			return this.parse(`/join view-mafialadder-${cmd}`);
		},

		disable: function (target, room, user) {
			if (!this.can('gamemanagement', null, room)) return;
			if (!room.mafiaEnabled) {
				return this.errorReply("Mafia is already disabled.");
			}
			delete room.mafiaEnabled;
			if (room.chatRoomData) {
				delete room.chatRoomData.mafiaEnabled;
				Rooms.global.writeChatRoomData();
			}
			this.modlog('MAFIADISABLE');
			return this.sendReply("Mafia has been disabled for this room.");
		},

		enable: function (target, room, user) {
			if (!this.can('gamemanagement', null, room)) return;
			if (room.mafiaEnabled) {
				return this.errorReply("Mafia is already enabled.");
			}
			room.mafiaEnabled = true;
			if (room.chatRoomData) {
				room.chatRoomData.mafiaEnabled = true;
				Rooms.global.writeChatRoomData();
			}
			this.modlog('MAFIAENABLE');
			return this.sendReply("Mafia has been enabled for this room.");
		},
	},
};
