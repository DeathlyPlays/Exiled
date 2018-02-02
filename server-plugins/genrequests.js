/********************************
 * Pokemon Gen Requests for PS! *
 * Created by Insist			*
 ********************************/

"use strict";

function alertGenners(message) {
	if (Rooms(`genrequests`)) {
		Rooms(`genrequests`).add(`|c|~Genner Alert|/raw ${message}`).update();
	}
}

exports.commands = {
	genner: "genreq",
	genners: "genreq",
	genreqs: "genreq",
	requestgen: "genreq",
	genrequest: "genreq",
	genreq: {
		addgenner: "add",
		addgen: "add",
		approve: "add",
		give: "add",
		add: function (target, room, user) {
			if (!this.can("lock")) return false;
			if (!target || target.length > 18) return this.errorReply(`This command requires a target with a maximum of 18 characters.`);
			let approvedGenner = toId(target);
			Db("genners").set(approvedGenner, 1);
			this.sendReply(`|html|${Server.nameColor(approvedGenner, true)} has been successfully been approved as a genner.`);
			if (Users.get(approvedGenner)) Users(approvedGenner).popup(`|html|You have been approved as a genner by ${Server.nameColor(user.name, true)}.`);
		},

		req: "request",
		request: function (target, room, user) {
			target = target.split(",");
			if (!user.autoconfirmed) return this.errorReply(`Only autoconfirmed users may use this command to prevent spam.`);
			if (!target[0]) target[0] = 0;
			if (!isNaN(target[1])) return this.errorReply(`The reward must be an integer.`);
			Economy.readMoney(user.userid, money => {
				if (money < target[1]) {
					this.errorReply(`You do not have enough ${moneyPlural} to give ${target[1]} as a reward.`);
				}
			});
			if (!target[1] || target[1].length > 500) return this.errorReply(`This command requires a target with at a maximum of 500 characters. Feel free to send a Pastebin.`);
			alertGenners(`${Server.nameColor(user.name, true)} has requested the following: "${target[1]}", and has offered ${reward} ${moneyPlural} for your services.`);
			this.sendReply(`Your request has been sent, check /genreq list to contact genners and to verify if they are approved.`);
		},

		removegenner: "ban",
		bangenner: "ban",
		remove: "ban",
		unconfirm: "ban",
		kick: "ban",
		take: "ban",
		ban: function (target, room, user) {
			if (!this.can("lock")) return false;
			if (!target || target.length > 18) return this.errorReply("You must specify a username, with at a maximum of 18 characters.");
			if (!Db("genners").has(toId(target))) return this.errorReply(`${target} is not currently an approved genner.`);
			Db("genners").delete(toId(target));
			this.sendReply(`${target} has been officially removed from being a genner.`);
			if (Users.get(toId(target))) Users(toId(target)).popup(`|html|You have been approved as a genner by ${Server.nameColor(user.name, true)}.`);
		},

		users: 'list',
		list: function (target, room, user) {
			if (!Db("genners").keys().length) return this.errorReply('There are currently zero approved genners.');
			let display = [];
			Db("genners").keys().forEach(approvedGenners => {
				display.push(Server.nameColor(approvedGenners, (Users(approvedGenners) && Users(approvedGenners).connected)));
			});
			this.popupReply(`|html|<strong><u><font size="3"><center>Approved Genners:</center></font></u></strong>${display.join(',')}`);
		},

		"": "help",
		help: function () {
			this.parse("/genrequesthelp");
		},
	},

	genrequesthelp: [
		`Gen Req Commands: [Made by Insist]
		/genreq request [reward], [request] - Requests [request] to be genned and alerts all active approved genners, and offers [reward] ${moneyPlural} for the reward.
		/genreq approve [user] - Approves a user as a genner. Requires Lock Access.
		/genreq ban [user] - Bans the user from being a genner. Requires Lock Access.
		/genreq list - Displays all of the server's approved genners.
		/genrequest help - Displays this command.`,
	],
};
