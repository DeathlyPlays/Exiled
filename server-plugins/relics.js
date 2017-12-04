/******************************
*           Relics            *
*  Artifact Collection Plugin *
*       Coded by flufi        *
*******************************/

'use strict';

const relics = require('../config/relics-data');
const uuid = require('uuid');

const fs = require('fs');

function addRelic(name, relic) {
	let newRelic = {};
	newRelic.id = uuid.v1();
	newRelic.title = relics[relic].title;
	newRelic.name = relics[relic].name;

	let userid = toId(name);
	Db('relics').set(userid, Db('relics').get(userid, []).concat([newRelic]));
}

function removeRelic(relicTitle, userid) {
	let userRelics = Db('relics').get(userid, []);
	let idx = -1;
	// search for index of the relic
	for (let i = 0; i < userRelics.length; i++) {
		let relic = userRelics[i];
		if (relic.title === relicTitle) {
			idx = i;
			break;
		}
	}
	if (idx === -1) return false;
	// remove it
	userRelics.splice(idx, 1);
	// set it in db
	Db('relics').set(userid, userRelics);
	return true;
}

exports.commands = {
	'!spawnrelic': true,
	giverelic: 'spawnrelic',
	spawnrelic: function (target, room, user, connection, cmd) {
		if (!this.runBroadcast()) return;
		if (!this.can('ban')) return false;
		if (!target) return this.errorReply("/giverelic [user], [Relic ID]");
		let parts = target.split(",").map(p => toId(p));
		// find targetUser and the relic being given.
		let targetUser = parts.shift();
		let relic = parts[0].trim();
		if (!targetUser || !relic) return this.errorReply("/giverelic [user], [Relic ID]");
		if (!relics[relic]) return this.sendReply(target + ": Relic not found.");
		//Give the relic to the user.
		relic = relics[relic];
		addRelic(targetUser, relic.title);
		user.popup("|raw|You have successfully given " + relic.name + " to " + Server.nameColor(targetUser, true) + ".");
		this.logModCommand(user.name + "gave the relic '" + relic.name + "' to " + targetUser + ".");
	},

	removerelic: 'takerelic',
	takerelic: function (target, room, user, connection, cmd) {
		if (!this.can('ban')) return false;
		if (!target) return this.errorReply("/takerelic [user], [Relic ID]");
		let parts = target.split(",").map(p => toId(p));
		// find targetUser and the relic being taken.
		let targetUser = parts.shift();
		let relic = parts[0].trim();
		if (!targetUser || !relic) return this.errorReply("/takerelic [user], [Relic ID]");
		if (!relics[relic]) return this.sendReply(target + ": Relic not found.");
		//Take the relic from the user.
		relic = relics[relic];
		removeRelic(relic.title, targetUser);
		user.popup("|raw|You have successfully taken " + relic.name + " from " + Server.nameColor(targetUser, true) + ".");
		this.logModCommand(user.name + " took the relic '" + relic.name + "' from " + targetUser + ".");
	},

	showrelics: 'relics',
	displayrelics: 'relics',
	relics: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let userid = user.userid;
		if (target) userid = toId(target);
		const relics = Db('relics').get(userid, []);
		if (!relics.length || userid === "constructor") return this.sendReplyBox(Server.nameColor(userid, true) + " has no relics.");
		const relicsMapping = relics.map(function (relic) {
			return '<font size="3"><strong>' + relic.name + '</font></strong>';
		});
		this.sendReplyBox('<div style="max-height: 300px; overflow-y: scroll;">' + relicsMapping.join('<br />') + '</div><br><center>' + Server.nameColor(userid, true) + '<strong> has ' + relics.length + ' relics.</strong></center>');
	},

	resetrelics: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.sendReply("/resetrelics [user] - Resets the relic collection of the user.");
		Db('relics').set(toId(target), 0);
		this.sendReply("|raw|" + Server.nameColor(target) + " has had their relics reset.");
	},
};