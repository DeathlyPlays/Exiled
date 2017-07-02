/**
* Managed League System by jd, Redone for Gangs by wgc
* This code is far from perfect and if I was going to
* do it again I'd definitely do a lot differently.
*
* @license MIT license
*/

'use strict';

const fs = require('fs');
const Autolinker = require('autolinker');

let database = new sqlite3.Database('config/gangs.db', function () {
	database.run("CREATE TABLE IF NOT EXISTS points (date INTEGER, userid TEXT, gang TEXT, points INTEGER, reason TEXT)");
});
let gangs = {};
try {
	gangs = JSON.parse(fs.readFileSync('config/gangs.json', 'utf8'));
} catch (e) {
	if (e.code !== 'ENOENT') throw e;
}

function save() {
	if (Object.keys(gangs).length < 1) return fs.writeFileSync('config/gangs.json', JSON.stringify(gangs));
	let data = "{\n";
	for (let u in gangs) {
		data += '\t"' + u + '": ' + JSON.stringify(gangs[u]) + ",\n";
	}
	data = data.substr(0, data.length - 2); // remove the last comma
	data += "\n}";
	fs.writeFileSync('config/gangs.json', data);
}

function logPoints(userid, amount, reason) {
	let gangid = toId(getGang(userid));
	let date = Date.now();
	userid = toId(userid);
	database.run("INSERT INTO points(date, userid, gang, points, reason) VALUES ($date, $userid, $gang, $points, $reason)",
		{$date: date, $userid: userid, $gang: gangid, $points: amount, $reason: reason},
	function (err) {
		if (err) return console.log("Gang logPoints: " + err);
	});
}

function logPointsUser(user, gang, amount, reason) {
	let gangid = toId(gangs);
	let date = Date.now();
	database.run("INSERT INTO points(date, userid, gang, points, reason) VALUES ($date, $userid, $gang, $points, $reason)",
		{$date: date, $userid: "[" + user + "]", $gang: gangid, $points: amount, $reason: reason},
	function (err) {
		if (err) return console.log("Gang logPointsUser: " + err);
	});
}

function log(message) {
	if (!message) return false;
	fs.appendFile('logs/gangs.log', '[' + new Date().toUTCString() + '] ' + message + '\n');
}

function gangPM(message, Gang) {
	let gangid = toId(gangs);
	if (!gangs[gangid]) return;
	for (let u in gangs[gangid].users) {
		if (!Users(gangs[gangid].users[u]) || !Users(gangs[gangid].users[u]).connected) continue;
		Users(gangs[gangid].users[u]).send("|pm|~Exiled Server|~|/raw " + message);
	}
}

function gangLog(message, Gang) {
	let gangid = toId(gangs);
	fs.appendFile('logs/gangs/' + gangid + '.log', '[' + new Date().toUTCString() + '] ' + message + '\n');
}

function getBadges(user) {
	user = toId(user);
	let badges = {};
	for (let gang in gangs) {
		for (let badge in gangs[gang].badges) {
			if (gangs[gang].badges[badge].users.includes(user)) {
				if (!badges[gang]) badges[gang] = [];
				badges[gang].push({
					'name': gangs[gang].badges[badge].title,
					'img': gangs[gang].badges[badge].image,
				});
			}
		}
	}
	return (Object.keys(badges).length > 0 ? badges : false);
}
Exiled.getBadges = getBadges;

function getGang(user) {
	user = toId(user);
	let reply;
	for (let gang in gangs) {
		if (gangs[gang].users.includes(user)) {
			reply = gangs[gang].name;
			break;
		}
	}
	return reply;
}
Exiled.getGang = getGang;

function getGangRank(user) {
	user = toId(user);
	let gang = toId(getGang(user));
	if (!gangs[gang]) return false;
	if (!gang) return false;
	for (let rank in gangs[gang].ranks) {
		if (gangs[gang].ranks[rank].users.includes(user)) return gangs[gang].ranks[rank].title;
	}
}
Exiled.getGangRank = getGangRank;

function hasPermission(user, permission) {
	let gang = gangs[toId(getGang(user))];
	if (!gang) return false;
	let rank = toId(getGangRank(user));
	if (gang.ranks[rank].permissions['all']) return true;
	if (gang.ranks[rank].permissions[permission]) return true;
	return false;
}

const permissionList = {
	all: true,
	invite: true,
	kick: true,
	desc: true,
	masspm: true,
	promote: true,
	manageranks: true,
	editbadges: true,
	givebadge: true,
};

if (!Rooms.global.pendingGvG) Rooms.global.pendingGvG = {};
if (!Rooms.global.GvG) Rooms.global.GvG = {};
if (!Rooms.global.pendingGvGRooms) Rooms.global.pendingGvGRooms = {};

function gangTourPoints(winner, runnerup, tourSize, room) {
	let winnerGang = toId(getGang(winner));
	let secondGang = toId(getGang(runnerup));
	let winnerPoints = Math.round(tourSize / 2);
	let secondPoints = Math.round(winnerPoints / 2);
	if (winnerGang && winnerPoints > 0) {
		gangs[winnerGang].points += winnerPoints;
		save();
		logPoints(winner, winnerPoints, "First place in a tournament in " + room.id);
		room.addRaw("<b>" + Exiled.nameColor(winner, true) + " has won " + winnerPoints + (winnerPoints === 1 ? " point " : " points ") + " for " + Chat.escapeHTML(gangs[winnerGang].name) + "</b>");
	}
	if (secondGang && secondPoints > 0) {
		gangs[secondGang].points += secondPoints;
		save();
		logPoints(runnerup, secondPoints, "Second place in a tournament in " + room.id);
		room.addRaw("<b>" + Exiled.nameColor(runnerup, true) + " has won " + secondPoints + (secondPoints === 1 ? " point " : " points ") + " for " + Chat.escapeHTML(gangs[secondGang].name) + "</b>");
	}
}
Exiled.gangTourPoints = gangTourPoints;

exports.commands = {
	gangs: 'gang',
	gang: {
		create: function (target, room, user) {
			if (!this.can('gangadmin')) return false;
			if (!target) return this.errorReply("Usage: /gang create [gang name], [user]");
			let targets = target.split(',');
			for (let u in targets) targets[u] = targets[u].trim();

			if (!targets[0]) return this.errorReply("Usage: /gang create [gang name], [user]");
			if (!targets[1]) return this.errorReply("Usage: /gang create [gang name], [user]");

			let gangid = toId(targets[0]);
			let gangName = targets[0];
			let targetUser = Users(targets[1]);

			if (gangid.length < 1) return this.errorReply("Gang names must be at least one character long.");
			if (gangid.length > 30 || gangName.length > 30) return this.errorReply("Gang names may not be longer than 30 characters.");
			if (gangs[gangid]) return this.errorReply("That gang already exists.");
			if (!targetUser || !targetUser.connected) return this.errorReply('"' + targets[1] + '" is not currently online.');

			gangs[gangid] = {
				name: gangName,
				id: gangid,
				pendingInvites: [],
				points: 0,
				desc: "",
				badges: {},
				users: [targetUser.userid],
				ranks: {
					'godfather': {
						title: 'Godfather',
						users: [targetUser.userid],
						permissions: {
							all: true,
						},
						sortBy: 10,
					},
					'captain': {
						title: 'Captain',
						users: [],
						permissions: {
							invite: true,
							kick: true,
							desc: true,
							masspm: true,
							promote: true,
							editbadges: true,
							manageranks: true,
							givebadge: true,
						},
						sortBy: 8,
					},
					'member': {
						title: 'Member',
						users: [],
						permissions: {},
						sortBy: 6,
					},
				},
			};
			save();
			log(user.name + " has created the gang '" + gangName + "'.");
			this.sendReply("You've created the gang \"" + gangName + "\".");
		},

		delete: function (target, room, user) {
			if (!this.can('gangadmin')) return false;
			if (!target) return this.errorReply("Usage: /gang delete [gang name].");
			if (!gangs[toId(target)]) return this.errorReply("That gang does not exist.");

			delete gangs[toId(target)];
			save();
			log(user.name + " has deleted the gang '" + target + "'.");
			this.sendReply("You've deleted the gang '" + target + '".');
		},

		invite: function (target, room, user) {
			if (!target) return this.errorReply("Usage: /gang invite [user] - Invites a user to your gang.");

			let gangid = toId(getGang(user.userid));
			let targetUser = Users(target);
			if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
			if (!targetUser || !targetUser.connected) return this.errorReply("That user is not currently online.");
			if (gangs[gangid].users.includes(targetUser.userid)) return this.errorReply("That user is already in your gang.");
			if (gangs[gangid].pendingInvites.includes(targetUser.userid)) return this.errorReply("There's already a pending invitation for that user to join your gang.");

			for (let gang in gangs) {
				if (gangs[gang].id === gangid) continue;
				if (gangs[gang].users.includes(targetUser.userid)) return this.errorReply("That user is a member of " + gangs[gang].name + ".");
			}

			if (!hasPermission(user.userid, 'invite')) return this.errorReply("You don't have permission to invite users to " + target + ".");

			gangs[gangid].pendingInvites.push(targetUser.userid);
			save();
			gangLog(user.name + " has invited " + targetUser.name + " to join the gang.", gangid);
			gangPM(Exiled.nameColor(user.name, true) + " has invited " + Exiled.nameColor(targetUser.name, true) + " to join the gang.", gangid);
			let message = "/html has invited you to join the gang " + Chat.escapeHTML(gangs[gangid].name) + ". <br />" +
				"<button name=\"send\" value=\"/gang accept " + gangid + "\">Click to accept</button> | <button name=\"send\" value=\"/gang decline " + gangid +
				"\">Click to decline</button>";
			targetUser.send("|pm|" + user.getIdentity() + "|" + targetUser.getIdentity() + "|" + message);
			this.sendReply("You've invited " + targetUser.name + " to join " + gangs[gangid].name + ".");
		},

		accept: function (target, room, user) {
			if (!target) return this.errorReply("Usage: /gang accept [gang]");
			let gangid = toId(target);
			if (!gangs[gangid]) return this.errorReply("That gang does not exist.");
			if (!gangs[gangid].pendingInvites.includes(user.userid)) return this.errorReply("You don't have a pending invitation to this gang.");

			if (getGang(user.userid)) return this.errorReply("You've already joined a gang.");

			let sortedRanks = Object.keys(gangs[gangid].ranks).sort(function (a, b) {return gangs[gangid].ranks[b].rank - gangs[gangid].ranks[a].rank;});
			let rank = sortedRanks.pop();
			gangs[gangid].users.push(user.userid);
			gangs[gangid].ranks[rank].users.push(user.userid);
			gangs[gangid].pendingInvites.splice(gangs[gangid].pendingInvites.indexOf(user.userid), 1);
			save();
			gangLog(user.name + " has accepted their invitation to join the gang.", gangid);
			gangPM(Exiled.nameColor(user.name, true) + " has accepted their invitation to join the gang.", gangid);

			user.popup("You've accepted the invitation to join " + gangs[gangid].name + ".");
		},

		decline: function (target, room, user) {
			if (!target) return this.errorReply("Usage: /gang decline [gang]");
			let gangid = toId(target);
			if (!gangs[gangid]) return this.errorReply("That gang does not exist.");
			if (!gangs[gangid].pendingInvites.includes(user.userid)) return this.errorReply("You don't have a pending invitation to this gang.");

			gangs[gangid].pendingInvites.splice(gangs[gangid].pendingInvites.indexOf(user.userid), 1);
			save();
			gangLog(user.name + " has declined their invitation to join the gang.", gangid);
			gangPM(Exiled.nameColor(user.name, true) + " has declined their invitation to join the gang.", gangid);
			user.popup("You've declined the invitation to join " + gangs[gangid].name + ".");
		},

		kick: function (target, room, user) {
			if (!target) return this.errorReply("Usage: /gang kick [user] - Kicks a user to your gang.");

			let gangName = getGang(user.userid);
			let gangid = toId(gangName);
			let targetid = toId(target);
			if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
			if (!gangs[gangid].users.includes(targetid)) return this.errorReply("That user is not in your gang.");

			if (!hasPermission(user.userid, 'kick')) return this.errorReply("You don't have permission to kick users from '" + gangName + "'.");

			for (let rank in gangs[gangid].ranks) {
				if (gangs[gangid].ranks[rank].users.includes(targetid)) {
					gangs[gangid].ranks[rank].users.splice(gangs[gangid].ranks[rank].users.indexOf(targetid), 1);
				}
			}
			gangs[gangid].users.splice(gangs[gangid].users.indexOf(targetid), 1);
			save();
			gangLog(user.name + " has kicked " + target + " from the gang.", gangid);
			gangPM(Exiled.nameColor(user.name, true) + " has kicked " + Exiled.nameColor(target, true) + " from the gang.", gangid);

			if (Users(target) && Users(target).connected) Users(target).send("|popup||html|" + Exiled.nameColor(user.name, true) + " has kicked you from the gang " + Chat.escapeHTML(gangs[gangid].name) + ".");
			this.sendReply("You've kicked " + target + " from " + gangs[gangid].name + ".");
		},

		leave: function (target, room, user) {
			let gangid = toId(getGang(user.userid));
			if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
			if (gangs[gangid].ranks['godfather'].users.includes(user.userid)) return this.errorReply("You can't leave a gang if you're the godfather.");

			for (let rank in gangs[gangid].ranks) {
				if (!gangs[gangid].ranks[rank].users.includes(user.userid)) continue;
				gangs[gangid].ranks[rank].users.splice(gangs[gangid].ranks[rank].users.indexOf(user.userid), 1);
			}
			gangs[gangid].users.splice(gangs[gangid].users.indexOf(user.userid), 1);
			save();
			gangLog(user.name + " has left the gang.", gangid);
			gangPM(Exiled.nameColor(user.name, true) + " has left the gang.", gangid);
			this.sendReply("You have left " + gangs[gangid].name + ".");
		},

		description: 'desc',
		desc: function (target, room, user) {
			if (!target) return this.errorReply("Usage: /gang desc [description] - Sets your gang description.");

			let gangid = toId(getGang(user.userid));
			if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
			if (target.length < 1) return this.errorReply("The gang description must be at least one character long.");
			if (target.length > 100) return this.errorReply("The gang description may not be longer than 100 characters.");

			if (!hasPermission(user.userid, 'desc')) return this.errorReply("You don't have permission to set the gang description of '" + gangs[gangid].name + "'.");

			gangs[gangid].desc = target;
			save();
			gangLog(user.name + " has set the gang description to '" + target + "'.", gangid);
			gangPM(Exiled.nameColor(user.name, true) + " has set the gang description to '" + Chat.escapeHTML(target) + "'.", gangid);
			this.sendReply("You've changed the gang description.");
		},

		announce: 'pm',
		pm: function (target, room, user) {
			if (!target) return this.errorReply("Usage: /gang pm [message] - Sends a message to all gang members currently online.");

			let gangid = toId(getGang(user.userid));
			if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
			if (target.length < 1) return this.errorReply("The nessage must be at least one character long.");
			if (target.length > 500) return this.errorReply("The message may not be longer than 500 characters.");

			if (!hasPermission(user.userid, 'masspm')) return this.errorReply("You don't have permission to send a gang pm.");

			gangLog(user.name + " has sent out a gang pm: " + target, gangid);
			gangPM("gang announcement from " + Exiled.nameColor(user.name, true) + ":<br />" + Chat.escapeHTML(target), gangid);
		},

		members: function (target, room, user) {
			if (!target) return this.errorReply("Please specify a gang to view the members of.");
			target = toId(target);
			if (!gangs[target]) return this.errorReply("That gang does not exist.");
			let output = Chat.escapeHTML(gangs[target].name) + " members:\n\n";
			let sortedRanks = Object.keys(gangs[target].ranks).sort(function (a, b) {return gangs[target].ranks[b].sortBy - gangs[target].ranks[a].sortBy;});

			for (let rank in sortedRanks) {
				let users = [];
				let curRank = sortedRanks[rank];
				output += Chat.escapeHTML(gangs[target].ranks[curRank].title) + " (" + gangs[target].ranks[curRank].users.length + "):\n";
				for (let u in gangs[target].ranks[curRank].users) {
					let curUser = gangs[target].ranks[curRank].users[u];
					users.push(Exiled.nameColor(curUser, (Users(curUser) && Users(curUser).connected)));
				}
				output += users.join(',');
				output += "\n\n";
			}
			user.send("|popup||html|" + output);
		},

		ladder: 'list',
		list: function (target, room, user) {
			if (Object.keys(gangs).length < 1) return this.sendReply("There's no registered gangs on this server.");
			let output = '<center><table border="1" cellspacing ="0" cellpadding="3"><tr><td>Gang</td><td>Description</td><td>Points</td><td>Members</td></tr>';
			let sortedGangs = Object.keys(gangs).sort(function (a, b) {
				return gangs[b].points - gangs[a].points;
			});

			for (let gang in sortedGangs) {
				let curGang = gangs[sortedGangs[gang]];
				let desc = Chat.escapeHTML(curGang.desc);
				if (desc.length > 50) desc = desc.substr(0, 50) + "<br />" + desc.substr(50);
				output += "<tr>";
				output += "<td>" + Chat.escapeHTML(curGang.name) + "</td>";
				output += "<td>" + Autolinker.link(desc.replace(/&#x2f;/g, '/'), {stripPrefix: false, phone: false, twitter: false}) + "</td>";
				output += "<td>" + '<button name="send" value="/gang points log ' + curGang.id + '">' + curGang.points + "</button></td>";
				output += "<td>" + '<button name="send" value="/gang members ' + curGang.id + '">' + curGang.users.length + "</button></td>";
				output += "</tr>";
			}
			output += "</table></center>";
			user.send("|popup||wide||html|" + output);
		},

		ranks: 'rank',
		rank: {
			set: 'give',
			give: function (target, room, user) {
				if (!target) return this.errorReply("Usage: /gang rank give [user], [rank] - Gives a user a rank in your gang.");
				let targets = target.split(',');
				for (let u in targets) targets[u] = targets[u].trim();

				if (!targets[0]) return this.errorReply("Please specify a user to give a rank.");
				if (!targets[1]) return this.errorReply("Please specify a rank to give the user.");

				let gangid = toId(getGang(user.userid));
				let targetUser = Users.getExact(targets[0]);
				let rank = targets[1];

				if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
				if (!targetUser || !targetUser.connected) return this.errorReply("That user is not online.");
				if (!gangs[gangid].users.includes(targetUser.userid)) return this.errorReply("That user is not in your gang.");
				if (!gangs[gangid].ranks[toId(rank)]) return this.errorReply("That rank does not exist.");
				if (gangs[gangid].ranks[toId(rank)].users.includes(targetUser.userid)) return this.errorReply("That user already has that rank.");

				if (!hasPermission(user.userid, 'promote')) return this.errorReply("You don't have permission to change users rank.");

				if (toId(rank) !== 'godfather') {
					for (let rank in gangs[gangid].ranks) {
						if (rank === 'godfather') continue;
						if (gangs[gangid].ranks[rank].users.includes(targetUser.userid)) {
							gangs[gangid].ranks[rank].users.splice(gangs[gangid].ranks[rank].users.indexOf(targetUser.userid), 1);
						}
					}
				}

				gangs[gangid].ranks[toId(rank)].users.push(targetUser.userid);
				save();
				rank = gangs[gangid].ranks[toId(rank)].title;
				gangLog(user.name + " has set " + targetUser.name + "'s rank to " + rank, gangid);
				gangPM(Exiled.nameColor(user.name, true) + " has set " + Exiled.nameColor(targetUser.name, true) + "'s rank to " + Chat.escapeHTML(rank), gangid);
				targetUser.send("|popup||html|" + Exiled.nameColor(user.name, true) + " has set your gang rank in " + Chat.escapeHTML(gangs[gangid].name) + " to " +
				Chat.escapeHTML(rank) + ".");
				this.sendReply("You've set " + targetUser.name + "'s gang rank to " + rank + ".");
			},

			take: function (target, room, user) {
				if (!target) return this.errorReply("Usage: /gang rank take [user], [rank] - Takes a users rank in your gang.");
				let targets = target.split(',');
				for (let u in targets) targets[u] = targets[u].trim();

				if (!targets[0]) return this.errorReply("Please specify a user to remove a rank.");
				if (!targets[1]) return this.errorReply("Please specify a rank to remove from the user.");

				let gangid = toId(getGang(user.userid));
				let targetUser = targets[0];
				let rank = targets[1];

				if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
				if (!toId(targetUser) || toId(targetUser).length > 19) return this.errorReply("That's not a valid username.");
				if (!gangs[gangid].users.includes(toId(targetUser))) return this.errorReply("That user is not in your gang.");
				if (!gangs[gangid].ranks[toId(rank)]) return this.errorReply("That rank does not exist.");
				if (!gangs[gangid].ranks[toId(rank)].users.includes(targetUser)) return this.errorReply("That user does not have that rank.");
				if (toId(rank) === 'godfather' && toId(targetUser) === user.userid) return this.errorReply("You can't remove godfather from yourself. Give another user godfather and have them remove it if you're transfering godfathership of the gang.");

				if (!hasPermission(user.userid, 'promote')) return this.errorReply("You don't have permission to change users rank.");

				let hasOtherRanks;
				for (let r in gangs[gangid].ranks) {
					if (r === toId(rank)) continue;
					if (gangs[gangid].ranks[r].users.includes(targetUser)) {
						hasOtherRanks = true;
					}
				}
				if (!hasOtherRanks) return this.errorReply("That user has no other gang rank. Use '/gang kick " + targetUser + "' if you want to kick them from the gang.");
				gangs[gangid].ranks[toId(rank)].users.splice(gangs[gangid].ranks[toId(rank)].users.indexOf(toId(targetUser)), 1);
				save();
				gangLog(user.name + " has removed the rank " + rank + " from " + targetUser, gangid);
				gangPM(Exiled.nameColor(user.name, true) + " has removed the rank " + Chat.escapeHTML(rank) + " from " + Exiled.nameColor(targetUser, true), gangid);
				if (Users(targetUser) && Users(targetUser).connected) {
					Users(targetUser).send("|popup||html|" + Exiled.nameColor(user.name, true) + " has removed you from the gang rank " + Chat.escapeHTML(rank) + " in " +
					Chat.escapeHTML(gangs[gangid].name) + ".");
				}
				this.sendReply("You've removed " + targetUser + " from the gang rank " + rank + ".");
			},

			create: function (target, room, user) {
				if (!target) return this.errorReply("Usage: /gang rank create [rank title], [sortby (a number)], [permissions seperated by comma] - See '/gang rank permissions' to learn valid permissions.");
				let targets = target.split(',');
				for (let u in targets) targets[u] = targets[u].trim();

				let gangid = toId(getGang(user.userid));
				let rank = targets[0];
				let sortBy = Number(targets[1]);
				let permissions = targets.splice(2);

				if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
				if (toId(rank).length < 1) return this.errorReply("Rank must be at least one character long.");
				if (rank.length > 30) return this.errorReply("Rank may not be longer than 30 characters.");
				if (gangs[gangid].ranks[toId(rank)]) return this.errorReply("That rank already exists.");

				if (!sortBy) return this.errorReply("Please specify a number to determine where the rank appears on member list.");
				if (isNaN(sortBy)) return this.errorReply("sortby must be a number between 0 and 100. (higher sorts higher on the member list.)");

				for (let u in permissions) {
					if (!permissionList[permissions[u]]) {
						this.errorReply("The permission '" + permissions[u] + "' is not valid.");
						return this.parse("/gang rank permissions");
					}
				}

				if (!hasPermission(user.userid, 'manageranks')) return this.errorReply("You don't have permission to create gang ranks.");

				let permissionsObj = {};
				for (let u in permissions) permissionsObj[permissions[u]] = true;

				gangs[gangid].ranks[toId(rank)] = {
					title: rank,
					users: [],
					permissions: permissionsObj,
					sortBy: sortBy,
				};
				save();
				gangLog(user.name + " has added the rank '" + rank + "'.", gangid);
				gangPM(Exiled.nameColor(user.name, true) + " has added the rank '" + Chat.escapeHTML(rank) + "'.", gangid);
				this.sendReply("You've added the rank '" + rank + "'.");
			},

			sortby: function (target, room, user) {
				if (!target) return this.errorReply("Usage: /gang rank sortby [rank], [number] - Edits the order this rank sorts in.");
				let gangId = toId(getGang(user.userid));
				if (!gangId) return this.errorReply("You're not in a gang.");
				if (!hasPermission(user.userid, 'manageranks')) return this.errorReply("You don't have permission to edit gang ranks.");

				let targets = target.split(',');
				for (let u in targets) targets[u] = targets[u].trim();

				let rank = toId(targets[0]);
				let number = Number(targets[1]);

				if (isNaN(number) || number < 0 || number > 100) return this.errorReply("Please specify a valid number between 0 and 100");
				if (!gangs[gangId].ranks[rank]) return this.errorReply("That rank does not exist.");

				gangs[gangId].ranks[rank].sortBy = number;
				save();
				this.sendReply("You've edited the rank '" + rank + "'.");
			},

			delete: function (target, room, user) {
				if (!target) return this.errorReply("Usage: /gang rank delete [rank title]");

				let gangid = toId(getGang(user.userid));
				let rank = target;

				if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
				if (!gangs[gangid].ranks[toId(rank)]) return this.errorReply("That rank does not exist.");
				if (gangs[gangid].ranks[toId(rank)].users.length > 0) return this.errorReply("You can't delete a rank that still has users.");
				if (toId(rank) === 'godfather') return this.errorReply("The gang has to have an godfather.");

				if (!hasPermission(user.userid, 'manageranks')) return this.errorReply("You don't have permission to delete gang ranks.");

				delete gangs[gangid].ranks[toId(rank)];
				save();
				gangLog(user.name + " has deleted the rank '" + rank + "'.", gangid);
				gangLog(Exiled.nameColor(user.name, true) + " has deleted the rank '" + Chat.escapeHTML(rank) + "'.", gangid);
				this.sendReply("You've deleted the rank '" + rank + "'.");
			},

			permissions: function (target, room, user) {
				if (!this.runBroadcast()) return;
				this.sendReply('|raw|<div class="infobox infobox-limited">' +
					'Valid Permissions:<br />' +
					'"all": Gives the rank access to EVERY gang command.<br />' +
					'"invite": Gives the rank access to invite users to join the gang.<br />' +
					'"kick": Gives the rank access to kick members from the gang.<br />' +
					'"desc": Gives the rank access to set the gang description.<br />' +
					'"masspm": Gives the rank access to mass pm all gang members.<br />' +
					'"promote": Gives the rank access to promote gang members.<br />' +
					'"manageranks": Gives the rank access to create and delete ranks. NOTE: This is a dangerous permission.<br />' +
					'"editbadges": Gives the rank access to add, edit, and remove gang badges.<br />' +
					'"givebadge": Gives the rank access to give users gang badges.<br />' +
					'Example Usage: /gang rank create Crony, 3, givebadges - Creates a rank named "Professor", places it above Gym Leader, and gives it access to give badges.' +
					'</div>'
				);
			},

			'': 'help',
			help: function (target, room, user) {
				if (!this.runBroadcast()) return;
				this.sendReply("|raw|<div class=\"infobox infobox-limited\">" +
					"/gang rank create [rank title], [sortby (a number)], [permissions seperated by comma] - See <button style=\"background: none; border: none; color: blue\" name=\"send\" value=\"/gang rank permissions\"><u>/gang rank permissions</u></button> for a list of valid permissions.<br />" +
					"/gang rank delete [rank title] - Deletes a gang rank. You have to remove the rank from members before deleting it.<br />" +
					"/gang rank sortby [rank], [number] - Changes how a rank sorts on the member list. 99 as a number for example would sort one below godfather, 98 sorting below the rank with 99 and so on.<br />" +
					"/gang rank give [user], [rank] - Gives a rank to a user in your gang.<br />" +
					"/gang rank take [user], [rank] - Takes a rank from a user in your gang.<br />"
				);
			},
		},

		badges: 'badge',
		badge: {
			add: function (target, room, user) {
				if (!target) return this.errorReply("Usage: /gang badge add [badge name], [badge image], [badge description]");
				let targets = target.split(',');
				for (let u in targets) targets[u] = targets[u].trim();

				let gangid = toId(getGang(user.userid));
				let badgeName = targets[0];
				let badgeImage = targets[1];
				let badgeDesc = targets.slice(2);

				if (!badgeName) return this.errorReply("Please specify a badge name.");
				if (!badgeImage) return this.errorReply("Please specify a badge image.");
				if (!badgeDesc) return this.errorReply("Please specify a badge description.");

				if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
				if (toId(badgeName).toString().length < 1) return this.errorReply("Badge names must be at least one character long.");
				if (toId(badgeName).toString().length > 30) return this.errorReply("Badge names may not be longer than 30 characters.");
				if (toId(badgeImage).toString().length < 1) return this.errorReply("Invalid badge image.");
				if (badgeImage.toString().length > 200) return this.errorReply("That image url is too long.");
				if (badgeDesc.toString().length < 1) return this.errorReply("Badge descriptions must be at least one character long.");
				if (badgeDesc.toString().length > 100) return this.errorReply("Badge descriptions may not be longer than 100 characters.");
				if (gangs[gangid].badges[toId(badgeName)]) return this.errorReply("That badge already exists.");

				if (!hasPermission(user.userid, 'editbadges')) return this.errorReply("You don't have permission to create gang badges.");

				gangs[gangid].badges[toId(badgeName)] = {
					'title': badgeName,
					'image': badgeImage,
					'desc': badgeDesc,
					'users': [],
				};
				save();
				gangLog(user.name + " has added the badge '" + badgeName + "'.", gangid);
				gangPM(Exiled.nameColor(user.name, true) + " has added the badge '" + Chat.escapeHTML(badgeName) + "'.", gangid);
				this.sendReply("Your badge has been added.");
			},

			edit: function (target, room, user) {
				if (!target) return this.errorReply("Usage: /gang badge edit [badge name], [badge image], [badge description]");
				let targets = target.split(',');
				for (let u in targets) targets[u] = targets[u].trim();

				let gangid = toId(getGang(user.userid));
				let badgeName = targets[0];
				let badgeImage = targets[1];
				let badgeDesc = targets.slice(2);

				if (!badgeName) return this.errorReply("Please specify a badge name.");
				if (!badgeImage) return this.errorReply("Please specify a badge image.");
				if (!badgeDesc) return this.errorReply("Please specify a badge description.");

				if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
				if (toId(badgeName).toString().length < 1) return this.errorReply("Badge names must be at least one character long.");
				if (toId(badgeName).toString().length > 30) return this.errorReply("Badge names may not be longer than 30 characters.");
				if (toId(badgeImage).toString().length < 1) return this.errorReply("Invalid badge image.");
				if (badgeImage.toString().length > 200) return this.errorReply("That image url is too long.");
				if (badgeDesc.toString().length < 1) return this.errorReply("Badge descriptions must be at least one character long.");
				if (badgeDesc.toString().length > 100) return this.errorReply("Badge descriptions may not be longer than 100 characters.");
				if (!gangs[gangid].badges[toId(badgeName)]) return this.errorReply("That badge doesn't exist.");

				if (!hasPermission(user.userid, 'editbadges')) return this.errorReply("You don't have permission to edit gang badges.");

				gangs[gangid].badges[toId(badgeName)].title = badgeName;
				gangs[gangid].badges[toId(badgeName)].image = badgeImage;
				gangs[gangid].badges[toId(badgeName)].desc = badgeDesc;
				save();
				gangLog(user.name + " has edited the badge '" + badgeName + "'.", gangid);
				gangPM(Exiled.nameColor(user.name, true) + " has edited the badge '" + Chat.escapeHTML(badgeName) + "'.", gangid);
				this.sendReply("That badge has been edited.");
			},

			delete: function (target, room, user) {
				if (!target) return this.errorReply("Usage: /gang badge delete [badge name]");

				let gangid = toId(getGang(user.userid));
				let badgeName = target;

				if (!badgeName) return this.errorReply("Please specify a badge to delete.");
				if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
				if (!gangs[gangid].badges[toId(badgeName)]) return this.errorReply("That badge doesn't exist.");

				if (!hasPermission(user.userid, 'editbadges')) return this.errorReply("You don't have permission to delete gang badges.");

				delete gangs[gangid].badges[toId(badgeName)];
				save();
				gangLog(user.name + " has deleted the badge '" + badgeName + "'.", gangid);
				gangPM(Exiled.nameColor(user.name, true) + " has deleted the badge '" + Chat.escapeHTML(badgeName) + "'.", gangid);
				this.sendReply("Your badge has been deleted.");
			},

			give: function (target, room, user) {
				if (!target) return this.errorReply("Usage: /gang badge give [badge name], [user]");
				let targets = target.split(',');
				for (let u in targets) targets[u] = targets[u].trim();

				let gangid = toId(getGang(user.userid));
				let badgeName = targets[0];
				let targetUser = targets[1];

				if (!badgeName) return this.errorReply("Please specify a badge to give.");
				if (!targetUser) return this.errorReply("Please specify a user to give a badge.");
				if (toId(targetUser).length > 19) return this.errorReply("That's not a valid username.");
				if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
				if (!gangs[gangid].badges[toId(badgeName)]) return this.errorReply("That badge doesn't exist.");
				if (gangs[gangid].badges[toId(badgeName)].users.includes(toId(targetUser))) return this.errorReply("That user already has that badge.");

				if (!hasPermission(user.userid, 'givebadge')) return this.errorReply("You don't have permission to give gang badges.");

				gangs[gangid].badges[toId(badgeName)].users.push(toId(targetUser));
				save();
				gangLog(user.name + " has given the badge '" + badgeName + "' to " + targetUser + ".", gangid);
				gangPM(Exiled.nameColor(user.name, true) + " has given the badge '" + Chat.escapeHTML(badgeName) + "' to " + Exiled.nameColor(targetUser, true) + ".", gangid);
				if (Users(targetUser) && Users(targetUser).connected) {
					Users(targetUser).send("|popup||html|" + Exiled.nameColor(user.name, true) + " has given you the gang badge " + Chat.escapeHTML(badgeName) + " in " + Chat.escapeHTML(gangs[gangid].name) + ".");
				}
				this.sendReply("You've given " + targetUser + " the badge " + badgeName + ".");
			},

			take: function (target, room, user) {
				if (!target) return this.errorReply("Usage: /gang badge take [badge name], [user]");
				let targets = target.split(',');
				for (let u in targets) targets[u] = targets[u].trim();

				let gangid = toId(getGang(user.userid));
				let badgeName = targets[0];
				let targetUser = targets[1];

				if (!badgeName) return this.errorReply("Please specify a badge to take.");
				if (!targetUser) return this.errorReply("Please specify a user to take a badge from.");
				if (toId(targetUser).length > 19) return this.errorReply("That's not a valid username.");
				if (!gangs[gangid]) return this.errorReply("You're not in a gang.");
				if (!gangs[gangid].badges[toId(badgeName)]) return this.errorReply("That badge doesn't exist.");
				if (!gangs[gangid].badges[toId(badgeName)].users.includes(toId(targetUser))) return this.errorReply("That user doesn't have that badge.");

				if (!hasPermission(user.userid, 'givebadge')) return this.errorReply("You don't have permission to take gang badges.");

				gangs[gangid].badges[toId(badgeName)].users.splice(gangs[gangid].badges[toId(badgeName)].users.indexOf(toId(targetUser)), 1);
				save();
				gangLog(user.name + " has taken the badge '" + badgeName + "' from " + targetUser + ".", gangid);
				gangPM(Exiled.nameColor(user.name, true) + " has taken the badge '" + Chat.escapeHTML(badgeName) + "' from " + Exiled.nameColor(targetUser, true) + ".", gangid);
				if (Users(targetUser) && Users(targetUser).connected) {
					Users(targetUser).send("|popup||html|" + Exiled.nameColor(user.name, true) + " has taken the gang badge " + Chat.escapeHTML(badgeName) + " from you in " + Chat.escapeHTML(gangs[gangid].name) + ".");
				}
				this.sendReply("You've taken the badge " + badgeName + " from " + targetUser + ".");
			},

			list: function (target, room, user) {
				if (!target) return this.errorReply("Usage: /gangs badges list [gang]");
				let gangid = toId(target);
				if (!gangs[gangid]) return this.errorReply("That gang doesn't exist.");
				if (!this.runBroadcast()) return;
				if (Object.keys(gangs[gangid].badges).length < 1) return this.sendReplyBox("That gang has no badges.");
				let output = '<table border="1" cellspacing ="0" cellpadding="3"><tr><td>Badge</td><td>Description</td><td>Image</td></tr>';
				for (let badge in gangs[gangid].badges) {
					let curBadge = gangs[gangid].badges[badge];
					output += "<tr>";
					output += "<td>" + Chat.escapeHTML(curBadge.title) + "</td>";
					output += "<td>" + Chat.escapeHTML(curBadge.desc) + "</td>";
					output += '<td><img src="' + curBadge.image + '" width="16" height="16"></td>';
					output += "</tr>";
				}
				this.sendReplyBox(output);
			},

			view: function (target, room, user) {
				if (!target) return this.errorReply("Usage: /gangs badge view [user]");
				if (toId(target).length > 19) return this.errorReply("That name is too long.");
				if (!this.runBroadcast()) return;
				let badges = Exiled.getBadges(target);
				if (badges.length < 1) return this.sendReplyBox(Exiled.nameColor(target, true) + " has no gang badges.");
				let output = Exiled.nameColor(target, true) + "'s gang badges:<br /><br />";
				for (let u in badges) {
					output += Chat.escapeHTML(u) + ":<br />";
					for (let i in badges[u]) {
						output += '<img src="' + badges[u][i].img + '" title="' + Chat.escapeHTML(badges[u][i].name) + '" width="16" height="16">';
					}
					output += "<br />";
				}
				return this.sendReplyBox(output);
			},

			'': 'help',
			help: function (target, room, user) {
				if (!this.runBroadcast()) return;
				this.sendReply("|raw|<div class=\"infobox infobox-limited\">" +
					"Gang Badge Commands:<br />" +
					"/gang badge add [badge name], [badge image], [badge description] - Adds a gang badge.<br />" +
					"/gang badge edit [badge name], [badge image], [badge description] - Edits an existing badge without removing it.<br />" +
					"/gang badge delete [badge name] - Deletes a badge.<br />" +
					"/gang badge give [badge name], [user] - Gives a badge to a user.<br />" +
					"/gang badge take [badge name], [user] - Takes a badge from a user.<br />" +
					"/gang badge list [gang] - List the badges of a gang." +
					"</div>"
				);
			},
		},

		'point': 'points',
		points: {
			give: function (target, room, user) {
				if (!this.can('gangadmin')) return false;
				if (!target) return this.errorReply("Usage: /gang points give [gang], [points]");
				let targets = target.split(',');
				for (let u in targets) targets[u] = targets[u].trim();
				if (!targets[1]) return this.errorReply("Usage: /gang points give [gang], [points]");

				let gang = toId(targets[0]);
				let amount = Math.round(Number(targets[1]));

				if (!gangs[gang]) return this.errorReply("That gang does not exist.");
				if (isNaN(amount) || amount < 1 || amount > 500) return this.errorReply("Amount must be a valid number between 1 and 500.");

				gangs[gang].points += amount;
				save();
				logPointsUser("ADMIN", gang, amount, "Points given by " + user.name);
				this.sendReply("You've given " + gangs[gang].name + " " + amount + (amount === 1 ? " point." : " points."));
				gangPM(Exiled.nameColor(user.name, true) + " has given your gang " + amount + (amount === 1 ? " point." : " points."), gang);
			},

			take: function (target, room, user) {
				if (!this.can('gangadmin')) return false;
				if (!target) return this.errorReply("Usage: /gang points take [gang], [points]");
				let targets = target.split(',');
				for (let u in targets) targets[u] = targets[u].trim();
				if (!targets[1]) return this.errorReply("Usage: /gang points take [gang], [points]");

				let gang = toId(targets[0]);
				let amount = Math.round(Number(targets[1]));

				if (!gangs[gang]) return this.errorReply("That gang does not exist.");
				if (isNaN(amount) || amount < 1 || amount > 500) return this.errorReply("Amount must be a valid number between 1 and 500.");

				gangs[gang].points -= amount;
				save();
				logPointsUser("ADMIN", gang, -amount, "Points taken by " + user.name);
				this.sendReply("You've taken " + amount + (amount === 1 ? " point " : " points ") + " from " + gangs[gang].name + ".");
				gangPM(Exiled.nameColor(user.name, true) + " has taken " + amount + (amount === 1 ? " point " : " points ") + " from your gang.", gang);
			},

			reset: function (target, room, user) {
				if (!this.can('gangadmin')) return false;
				if (!user.confirmGangPointsReset) {
					this.errorReply("WARNING: THIS WILL RESET ALL GANG POINTS");
					this.errorReply("Run this command again if you are sure this is what you want to do.");
					user.confirmGangPointsReset = true;
					return;
				}

				this.logModCommand(user.name + " has reset all gang points.");
				Exiled.messageSeniorStaff("/html " + Exiled.nameColor(user.name, true) + " has reset all gang points.");
				Rooms('upperstaff').add("|raw|" + Exiled.nameColor(user.name, true) + " has reset all gang points.").update();
				delete user.confirmGangPointsReset;
				for (let u in gangs) gangs[u].points = 0;
				save();
				database.run("DELETE FROM points;");
			},

			userlog: 'log',
			log: function (target, room, user, connection, cmd) {
				let gangid = '';
				let targetUser = '';
				let searchObj;
				if (cmd === 'log') {
					gangid = (target ? toId(target) : toId(getGang(user.userid)));
					if (!gangid && !target) return this.errorReply("Please specify a gang to view the points log.");
					if (!gangs[gangid]) return this.errorReply("That gang does not exist.");
					searchObj = {$gangid: gangid};
				} else {
					if (!target) return this.errorReply("Please specify a user to view the logs of.");
					targetUser = toId(target);
					if (targetUser.length < 1 || targetUser.length > 19) return this.errorReply("That's not a valid user to search for.");
					gangid = toId(getGang(targetUser));
					if (!gangid) return this.errorReply("That user isn't in a gang.");
					searchObj = {$userid: targetUser};
				}

				database.all("SELECT * FROM points WHERE " + (cmd === 'userlog' ? "userid=$userid " : "gang=$gangid ") + "ORDER BY date DESC LIMIT 500", searchObj, (err, rows) => {
					if (err) return console.log("/gang points log: " + err);
					if (rows.length < 1) return user.popup("No gang point logs found for " + Chat.escapeHTML(gangs[gangid].name));

					let output = '<center>Displaying last 500 entries in gang points log for ' + Chat.escapeHTML(gangs[gangid].name) + '<br /><br />';
					output += '<table border="1" cellspacing="0" cellpadding="5"><tr><th>User</th><th>Date</th><th>Reason</th><th>Points</th></tr>';

					for (let u in rows) {
						output += '<tr>';
						output += '<td>' + Exiled.nameColor(rows[u].userid, (Users(rows[u].userid) && Users(rows[u].userid).connected)) + '</td>';
						output += '<td>' + new Date(rows[u].date).toUTCString() + '</td>';
						output += '<td>' + Chat.escapeHTML(rows[u].reason) + '</td>';
						output += '<td>' + rows[u].points + '</td>';
						output += '</tr>';
					}

					output += '</table></center>';
					user.popup('|wide||html|' + output);
				});
			},

			'': 'help',
			help: function (target, room, user) {
				if (!this.runBroadcast()) return;
				this.sendReply("|raw|<div class=\"infobox infobox-limited\">" +
					"Gang Points Commands:<br />" +
					"/gang points give [gang], [amount] - Gives a gang points.<br />" +
					"/gang points take [gang], [amount] - Takes points from a gang.<br />" +
					"/gang points log [gang] - Displays the last 500 entries in the points log for a gang.<br />" +
					"/gang points userlog [user] - Displays the last 500 points a user has earned.<br />" +
					"/gang points reset - Resets every gangs points back to 0." +
					"</div>"
				);
			},
		},

		'': 'help',
		help: function (target, room, user) {
			if (!this.runBroadcast()) return;
			return this.sendReply(
				"|raw|<div class=\"infobox\">" +
				"Managed Gang System:<br />" +
				"Admin Commands:<br />" +
				"/gang create [gang name], [gang godfather] - Creates a gang.<br />" +
				"/gang delete [gang name] - Deletes a gang.<br /><br />" +
				"Gang Commands:<br />" +
				"/gang invite [user] - Invites a user to join a gang.<br />" +
				"/gang kick [user] - Kicks a user from a gang.<br />" +
				"/gang desc [description] - Sets a description for your gang, visible on /gang list.<br />" +
				"/gang pm [message] - Mass PM's a message to all online gang members<br />" +
				"/gang accept [gang name] - Accepts an invitation to join a gang.<br />" +
				"/gang decline [gang name] - Declines an invitation to join a gang.<br />" +
				"/gang leave - Leaves your current gang.<br />" +
				"/gang list - Displays a list of gangs.<br />" +
				"/gang members [gang name] - Displays the memberlist for a gang.<br /><br />" +
				"Gang Rank Commands:<br />" +
				"/gang rank give [user], [rank] - Gives a user a rank.<br />" +
				"/gang rank take [user], [rank] - Removes a rank from a user.<br />" +
				"/gang rank create [rank name], [sortby (a number for sorting this rank on /gang members)], [permissions seperated by comma] - Creates a new gang rank. See '/gang rank permissions' to learn about valid permissions.<br />" +
				"/gang rank delete [rank name] - Deletes a gang rank. Note: you can't delete a rank if any users currently have the rank.<br /><br />" +
				"Gang Badge Commands: <br />" +
				"/gang badge give [badge name], [user] - Gives a user a gang badge.<br />" +
				"/gang badge take [badge name], [user] - Takes a gang badge from a user.<br />" +
				"/gang badge add [badge name], [badge image], [badge description] - Creates a gang badge.<br />" +
				"/gang badge edit [badge name], [badge image], [badge description] - Edits a gang badge.<br />" +
				"/gang badge delete [badge name] - Deletes a gang badge.<br />" +
				"/gang badge list [gang name] - Lists a gangs badges.<br />" +
				"/gang badge view [user] - Views a users gang badges<br /><br />" +
				"Gang Points:<br />" +
				"/gang points give [gang], [amount] - Gives a gang points.<br />" +
				"/gang points take [gang], [amount] - Takes points from a gang.<br />" +
				"/gang points log [gang] - Displays the last 500 entries in the points log for a gang.<br />" +
				"/gang points userlog [user] - Displays the last 500 points a user has earned." +
				"</div>"
			);
		},
	},
	ganghelp: function (target, room, user) {
		return this.parse('/gang help');
	},
};
