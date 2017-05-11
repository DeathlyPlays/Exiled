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
	essb: function (target, room, user) {
		if (!this.runBroadcast()) return false;
		if (!target || target === 'help') return this.parse('/help essb');
		if (target === 'credits') return this.parse('/essbcredits');
		let targetData = getMonData(toId(target));
		if (!targetData) return this.errorReply("The staffmon '" + toId(target) + "' could not be found.");
		return this.sendReplyBox(targetData);
	},

	essbhelp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReplyBox("/essb [staff member\'s name] - displays data for a staffmon\'s movepool, custom move, and custom ability.");
	},

	essbcredits: function (target, room, user) {
		let popup = "|html|" + "<font size=5 color=#000080><u><b>ESSB Credits</b></u></font><br />" +
			"<br />" +
			"<u><b>Programmers:</u></b><br />" +
			"- " + Exiled.nameColor('Insist', true) + " (Head Developer, Idea, Balancer, Concepts, Entries.)<br />" +
			"- " + Exiled.nameColor('VXN', true) + " (Assistant Developer)<br />" +
			"- " + Exiled.nameColor('Back At My Day', true) + " (Entries, Developments.)<br />" +
			"<u><b>Special Thanks:</b></u><br />" +
			"- Our Staff Members for their cooperation in making this.<br />";
		user.popup(popup);
	},
};
