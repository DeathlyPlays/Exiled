/************************
 * Total Drama Showdown *
 * Created by: Insist   *
 *   Idea by: Mewth		*
 ************************/

"use strict";

class TDI {
	constructor(room, user, prize) {
		this.players = [];
		prize = this.players.length * 100;
		this.prizeMoney = prize;
		this.room = room;
		room.tdiNumber = room.tdiNumber ? room.tdiNumber++ : 1;
		this.tdiNumber = room.tdiNumber;
		this.state = "signups";
		this.room.add(`|uhtml|tdi-${this.tdiNumber}|<div class="broadcast-green"><center><p style="font-size: 14pt">Do you wanna be famous?</p><br /><p style="font-size: 10pt><strong>A new Total Drama Island season is casting!</strong></p><br /><p style="font-size: 9pt"><button name="send" value="/tdi join">Yeah!</button><br /></p><small><p>Every user that joins raises the prize money by 100 ${moneyPlural}.<br />Disclaimer: Seasons of Total Drama Island may take a(n) hour(s) to complete.</div>`, true);
		this.timer = setTimeout(() => {
			if (this.players.length < 2) {
				this.room.add(`|uhtmlchange|tdi-${this.tdiNumber}|<div class="broadcast-red"><p style="text-align: center; font-size: 14pt>This season of Total Drama Island has been cancelled.</p></div>`);
				return this.end();
			}
			this.start();
		}, 1000 * 60 * 30);
	}

	join(user) {
		if (this.state !== "signups") return user.sendTo(this.room, `Sorry, the season of Total Drama Island going on in this room is already airing.`);
		if (this.players.includes(user.userid)) return user.sendTo(this.room, `You have already joined this season of Total Drama Island.`);
		this.players.push(user.userid);
		user.sendTo(this.room, 'You have joined the cast of Total Drama Island.');
	}

	leave(user) {
		if (!this.players.includes(user.userid)) return user.sendTo(this.room, `You have not joined this season of Total Drama Island yet.`);
		if (this.state !== "signups") {
			this.eliminate(user);
			user.sendTo(this.room, 'Thanks for playing Total Drama Island!');
		} else {
			this.players.splice(this.players.indexOf(user.userid), 1);
			user.sendTo(this.room, 'You have left the cast of Total Drama Island.');
		}
	}

	start(user) {
		if (this.players.length < 2) return user.sendTo(`This season of Total Drama Island requires more contestants to begin airing!`);
		this.room.add(`|uhtmlchange|<div><strong><p style= 14pt>A new season of Total Drama Island has begun airing.</p></strong></div>`).update();
		this.state = 'started';
		this.decideTeams();
	}

	decideTeams() {
		//split the teams into 2
		//Team 2 should gain the extra user if there is an odd number of users
		if (this.players.length >= 2) {
			//Generate initial Sets
			const h1 = new Set(), h2 = new Set();
			for (const i of this.players) {
				if (Math.round(Math.random()) == 1) {
					h1.add(i);
				} else {
					h2.add(i);
				}
			}
			//Equalize Sets
			let it, selected;
			while(h1.size >= h2.size + 2 || h2.size >= h1.size + 2) {
				if (h1.size > h2.size) {
					it = h1.values();
					selected = it.next();
					h2.add(selected);
					h1.delete(selected);
				} else {
					it = h2.values();
					selected = it.next();
					h1.add(selected);
					h2.delete(selected);
				}
			}

			this.team1 = [...h1];
			this.team2 = [...h2];
		} else {
			//Catch
			this.room.add(`${this.team1} are our first team of contestants :D`).update();
			this.room.add(`${this.team2} are our second team of contestants :D`).update();
			this.room.add(`|html|<strong>Good luck!</strong>`).update();
		}
	}

	eliminate(user) {
		if (this.players.length === 2) {
			this.players.splice(this.players.indexOf(user.userid), 1);
			this.win();
		}
		this.room.add(`${user.name} has been sent home!`).update();
		this.players.splice(this.players.indexOf(user.userid), 1);
		clearTimeout(this.timer);
	}

	win() {
		let winner = this.players[0];
		if (this.players.length === 1) {
			Economy.writeMoney(winner, this.prizeMoney);
			Economy.logTransaction(`${Users(winner)} has won a season of Total Drama Island worth ${this.prizeMoney}.`);
			this.room.add(`|html|${Server.nameColor(Users(winner))} has won this season of Total Drama Island and got the ${this.prizeMoney} prize! Thanks all for playing!`).update();
		}
		this.end();
	}

	end() {
		clearTimeout(this.timer);
		delete this.room.tdi;
	}
}

exports.commands = {
	totaldramashowdown: "tdi",
	totaldramaisland: "tdi",
	tds: "tdi",
	tdi: {
		create: "new",
		make: "new",
		new: function (target, room, user, prize) {
			if (!this.can("editroom", null, room)) return this.errorReply("Access Denied.");
			if (!this.canTalk()) return this.errorReply("You cannot use this while unable to speak.");
			if (room.id !== "totaldramaisland") return this.errorReply("This command only works in Total Drama Island.");
			if (room.tdi) return this.errorReply("There is an ongoing season of Total Drama Island in here.");
			room.tdi = new TDI(room, user, prize);
		},

		j: "join",
		join: function (target, room, user) {
			if (!this.canTalk()) return this.errorReply("You cannot join a season of Total Drama Island while unable to speak.");
			if (!user.registered) return this.errorReply("You cannot join a season of Total Drama Island on unregistered accounts.");
			if (!room.tdi) return this.errorReply(`There is not a season of Total Drama Island airing right now.`);
			room.tdi.join(user);
		},

		l: "leave",
		leave: function (target, room, user) {
			if (!room.tdi) return this.errorReply(`There is not a season of Total Drama Island airing right now.`);
			room.tdi.leave(user);
		},

		begin: "start",
		proceed: "start",
		start: function (target, room, user) {
			if (!this.can("ban", null, room)) return this.errorReply("Access Denied.");
			if (!room.tdi && this.state !== "signups") return this.errorReply("There is not a Total Drama Island season ready to start.");
			room.tdi.start(user);
			this.privateModCommand(`(${user.name} has started the season of Total Drama Island early.)`);
		},

		remove: "disqualify",
		dq: "disqualify",
		elim: "disqualify",
		eliminate: "disqualify",
		disqualify: function (target, room, user) {
			if (!this.can("ban", null, room)) return this.errorReply("Access Denied.");
			if (!room.tdi && this.state !== "signups") return this.errorReply("A season of Total Drama Island must be airing to use this command.");
			if (!target) return this.errorReply("This command requires a target.");
			let disqualified = room.tdi.eliminate(toId(target));
			if (disqualified === false) return this.errorReply(`Unable to disqualify ${target}.`);
			this.privateModCommand(`(${user.name} has disqualified ${target} from this season of Total Drama Island.)`);
			room.add(`|html|${Server.nameColor(target, true, true)} has been disqualified from this season of Total Drama Island.`).update();
		},

		stop: "end",
		cancel: "end",
		end: function (target, room, user) {
			if (!this.can("ban", null, room)) return this.errorReply("Access Denied.");
			if (!room.tdi) return this.errorReply("There is not an ongoing Total Drama Island session right now.");
			room.tdi.end();
			room.add(`This season of Total Drama Island was cancelled by ${user.name}.`).update();
			this.privateModCommand(`(${user.name} has cancelled the season of Total Drama Island.)`);
		},

		players: function (target, room, user) {
			if (!this.runBroadcast()) return;
			this.sendReplyBox(
				`There is currently ${this.room.tdi.players.length} players in this season of Total Drama Island.<br />` +
				`Players: ${this.room.tdi.players}.`
			);
		},
	},
};
