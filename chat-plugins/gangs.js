'use strict';

/* * * * * * * * * * * *
 *       Gangs         *
 *	   By Insist       *
 *     and Volco       *
 * * * * * * * * * * * */

const rankLadder = require('../rank-ladder');
const gangs = {
	rocket: {
		icon: 'http://i.imgur.com/eaTAxKU.gif',
		name: 'Rocket',
		godfather: 'Kairak',
	},
	magma: {
		icon: 'http://i.imgur.com/reKEhUA.png',
		name: 'Magma',
		godfather: 'Volco',
	},
	aqua: {
		icon: 'http://i.imgur.com/n9sKSKj.png',
		name: 'Aqua',
		godfather: ' ',
	},
	galactic: {
		icon: 'http://i.imgur.com/qmsDFHx.png',
		name: 'Galactic',
		godfather: 'Insist',
	},
	plasma: {
		icon: 'http://i.imgur.com/czbcEE4.gif',
		name: 'Plasma',
		godfather: 'Wobbleleez',
	},
	flare: {
		icon: 'http://i.imgur.com/X6g6fbc.png',
		name: 'Flare',
		godfather: ' ',
	},
	skull: {
		icon: 'http://i.imgur.com/Bdrtvh5.png',
		name: 'Skull',
		godfather: 'Mewth',
	},
};

function isCapo(user) {
	if (user.gangrank !== 'capo' || user.gangrank !== 'godfather') return false;
	return true;
}

function isGodfather(user, gang) {
	if (user.gangrank !== 'godfather') return false;
	return true;
}

function gangDisplay(gang) {
	let info = gangs[gang];
	let inlineCss = "width: 100%; background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); background: -o-linear-gradient(left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); background: -moz-linear-gradient(left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); margin: auto;";

	let visuals = '<div class="' + info.name + '" style="width: 40%; margin: auto; text-align: center; box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8) inset; border-radius: 8px;">' +
		'<div style="' + inlineCss + ' padding-top: 5px;"><img src="' + info.icon + '" width="16" height="16" /></div>' +
		'<font style="font-size: 14pt; color: #000;">' + info.name + '</font>' +
		'<div style="' + inlineCss + ' padding: 4px 0px;">Godfather: <span>' + info.godfather + '</span></div>' +
		'</div>';
	return visuals;
}

function isMoney(money) {
	let numMoney = Number(money);
	if (isNaN(money)) return "Must be a number.";
	if (String(money).includes('.')) return "Cannot contain a decimal.";
	if (numMoney < 1) return "Cannot be less than one buck.";
	return numMoney;
}

exports.commands = {
	turf: 'gang',
	gang: {
		info: function (target, room, user) {
			if (!this.runBroadcast()) return;
			if (!target) return this.errorReply("You must specify a gang.");
			let gang = toId(target);
			if (!gangs[gang]) return this.errorReply("This gang does not exist.");
			let display = gangDisplay(gang);
			this.sendReply("|raw|" + display);
		},
		join: function (target, room, user) {
			if (!target) return this.errorReply("You must specify a user.");
			let gang = toId(target);
			if (user.gang !== '') return this.errorReply("You are already in a gang");
			if (!gangs[gang]) return this.errorReply("This gang does not exist.");
			Db('gangs').set(user.userid, gang);
			user.gang = gang;
			this.sendReply("You have joined the gang: " + gang);
		},
		leave: function (target, room, user, connection, cmd) {
			if (!user.gang) return this.errorReply("You are not currently in a gang!");
			if (user.gangrank === 'capo' || user.gangrank === 'godfather') return this.errorReply("You cannot leave a gang if you have a gang rank of godfather or capo");
			if (!target || user.gang !== toId(target)) return this.errorReply("Please specify what gang you are leaving to confirm your choice.");
			Db('gangs').delete(user.userid);
			Db('gangranks').delete(user.userid);
			user.gang = "";
			user.gangrank = "";
			this.sendReply("You have left the gang " + toId(target) + ".");
		},
		add: function (target, room, user) {
			if (!target) return this.errorReply("You must specify a user.");
			let targetUser = target.toLowerCase();
			if (!Users(targetUser)) return this.errorReply("User not found.");
			if (user.gangrank !== 'godfather') return this.errorReply("/gang add - Access denied.");
			if (!(targetUser.gang !== '')) return this.errorReply("User is already a member of a rival gang.");
			Db('gangs').set(targetUser, user.gang);
			targetUser.gang === user.gang;
			this.sendReply(targetUser + " has been added to the gang: " + user.gang);
			Users(target).popup("You have been added to the gang: " + user.gang + " by " + user + ".");
		},
		remove: function (target, room, user) {
			if (!target) return this.errorReply("You must specify a user.");
			let targetUser = target.toLowerCase();
			if (!Users(targetUser)) return this.errorReply("User not found.");
			if (!(user.gangrank === 'capo' || user.gangrank === 'godfather')) return this.errorReply("/gang remove - Access denied.");
			if (targetUser.gang !== user.gang && !this.can('lock')) return this.errorReply("User is not a member of your gang.");
			Db('gangs').set(targetUser, '');
			Users(target).gang = '';
			this.sendReply(targetUser + " has been removed from the gang: " + user.gang);
			Users(targetUser).popup("You have been removed from the gang: " + user.gang + " by " + user + ".");
		},
		promote: function (target, room, user) {
			if (!target) return this.errorReply("You must specify a user.");
			let targetUser = target.toLowerCase();
			if (!Users(targetUser)) return this.errorReply("User not found.");
			if (!(user.gangrank === 'capo' || user.gangrank === 'godfather') || user.gang === '' && !this.can('lock')) return this.errorReply("/gang promote - Access denied.");
			if (targetUser.gang !== user.gang && !this.can('lock')) return this.errorReply("User is not a member of your gang.");
			Db('gangranks').set(targetUser, 'capo');
			Users(target).gangrank = 'capo';
			this.sendReply(targetUser + " has been promoted to capo in the gang: " + user.gang);
			Users(target).popup("You have been promoted to capo in the gang: " + user.gang + " by " + user + ".");
		},
		demote: function (target, room, user) {
			if (!target) return this.errorReply("You must specify a user.");
			let targetUser = target.toLowerCase();
			if (!Users(targetUser)) return this.errorReply("User not found.");
			if (user.gangrank !== 'godfather') return this.errorReply("/gang demote - Access denied.");
			if (targetUser.gang !== user.gang && !this.can('lock')) return this.errorReply("User is not a member of your gang.");
			Db('gangranks').set(targetUser, '');
			Users(target).gangrank = '';
			this.sendReply(targetUser + " has been demoted in the gang: " + user.gang);
			Users(target).popup("You have been demoted in the gang: " + user.gang + " by " + user + ".");
		},
		godfather: function (target, room, user) {
			let parts = target.split(',');
			for (let u = 0; u < parts.length; u++) parts[u] = parts[u].trim();
			if (parts.length < 2) return this.errorReply("You must specify a user and a gang");
			let gang = parts[1].toLowerCase();
			if (!Users(toId(parts[0]))) return this.errorReply("User not found.");
			if (!gangs[gang]) return this.errorReply("This gang does not exist.");
			let targetUser = Users(toId(parts[0]));
			if (!this.can('hotpatch')) return this.errorReply("/gang godfather - Access denied.");
			Db('gangranks').set(targetUser, 'godfather');
			Db('gangs').set(targetUser, gang);
			user.gangrank = 'godfather';
			user.gang = gang;
			this.sendReply(targetUser + " has been promoted to godfather of the gang: " + gang);
			targetUser.popup("You have been promoted to godfather of the gang: " + gang + " by " + user + ".");
		},
		ladder: function (target, room, user) {
			if (!this.runBroadcast()) return;
			let keys = Object.keys(Db('gangladder').object()).map(function (name) {
				return {
					name: name,
					gangladder: Db('gangladder').get(name),
				};
			});
			if (!keys.length) return this.sendReplyBox("Turf ladder is empty.");
			keys.sort(function (a, b) {
				return b.gangladder - a.gangladder;
			});
			this.sendReplyBox(rankLadder('Turf Wars', 'Points', keys.slice(0, 100), 'gangladder', 'Gang'));
		},
		givepoints: function (target, room, user) {
			let parts = target.split(',');
			if (parts.length < 2) return this.errorReply("You must specify a gang and amount");
			if (!this.can('lock')) return this.errorReply("/gang givepoints - Access denied.");
			let gang = toId(parts[0]);
			let amount = isMoney(parts[1]);
			if (!gangs[gang]) return this.errorReply("Gang not found.");
			Db('gangladder').set(gang, Db('gangladder').get(gang, 0) + amount).get(gang);
			this.sendReply(gang + " has been awarded " + amount + " points.");
			room.addRaw("<h4>" + gang + "has been awarded " + amount + " points.</h4>");
		},
		takepoints: function (target, room, user) {
			let parts = target.split(',');
			if (parts.length < 2) return this.errorReply("You must specify a gang and amount");
			if (!this.can('lock')) return this.errorReply("/gang takepoints - Access denied.");
			let gang = toId(parts[0]);
			let amount = isMoney(parts[1]);
			if (!gangs[gang]) return this.errorReply("Gang not found.");
			Db('gangladder').set(gang, Db('gangladder').get(gang, 0) - amount).get(gang);
			this.sendReply(gang + " has been deducted of " + amount + " points.");
			room.addRaw("<h4>" + gang + "has been deducted of " + amount + " points.</h4>");
		},
		resetladder: function (target, room, user) {
			if (!this.can('hotpatch')) return false;
			let allGangs = Db('gangladder').object();
			Object.keys(allGangs)
				.filter(function (gang) {
					return Db('gangladder').get(gang);
				})
				.forEach(function (gang) {
					delete allGangs[gang];
				});
			Db.save();
			this.sendReply("The Turf Wars Ladder has been reset.");
		},
		members: function (target, room, user) {
			if (!this.runBroadcast()) return false;
			if ((target && !gangs.hasOwnProperty(toId(target))) || (!target && !gangs.hasOwnProperty(room.id))) return this.errorReply("You must specify a gang.");
			let targetGang = target ? toId(target) : room.id;
			let gangData = Db('gangs').object();
			let gangRanks = Db('gangranks').object();
			let members = {
				godfather: [],
				capo: [],
				grunt: [],
			};
			// sort the members
			Object.keys(gangData).filter(u => gangData[u] === targetGang).forEach(u => members[gangRanks[u] || "grunt"].push(u));
			// build the list
			let display = Object.keys(members).map(u => "<b>" + u.charAt(0).toUpperCase() + u.slice(1) + ": </b><br />" + members[u].sort().map(i => Users.get(i) && Users.get(i).connected ? "<b>" + i + "</b>" : i).join(", ")).join("<br /><br />");
			this.sendReplyBox("<div style=\"max-height: 250px; overflow-y: scroll\">" + display + "</div>");
		},
	},
};

module.exports.gangs = gangs;
