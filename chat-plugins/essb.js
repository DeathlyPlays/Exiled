'use strict';
let fs = require('fs');
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

exports.commands = {
	essb: 'ssb',
	ssb: function (target, room, user) {
		if (!this.runBroadcast()) return false;
		if (!target || target === 'help') return this.parse('/help sssb');
		if (target === 'credits') return this.parse('/ssbcredits');
		let targetData = getMonData(toId(target));
		if (!targetData) return this.errorReply("The staffmon '" + toId(target) + "' could not be found.");
		return this.sendReplyBox(targetData);
	},

	essbhelp: 'ssbhelp',
	ssbhelp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReplyBox("/ssb [staff member\'s name] - displays data for a staffmon\'s movepool, custom move, and custom ability.");
	},

	essbcredits: 'ssbcredits',
	ssbcredits: function (target, room, user) {
		if (!this.runBroadcast()) return false;
		this.sendReplyBox(
			"<center><b>Exiled Super Staff Bros Credits:</b></center>" +
			"<b>Insist</b> -Programming, Testing, Concepts, Organizing, Balancing.<br />" +
			"<b>Stellation</b> - Bug fixes, programming.<br />",
			"<b>Exiled Server Auth</b> - Participation and support in helping to complete CSSB."
		);
	},
};
