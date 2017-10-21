/****************************************
 * Lottery Plug-in for Pokémon Showdown
 *            Created by:
 *               Insist
 ****************************************/

"use strict";

const timeUntilEnd = 1000 * 60 * 60 * 24;

class Lottery {
	constructor(user, room) {
		this.room = room;
		this.title = "Lottery";
		this.gameid = "lottery";
		this.costToJoin = 3;
		this.state = "signups";
		this.players = new Map();
		this.timer = setTimeout(() => {
			if (this.players.size < 2) {
				this.add('|html|<div style="broadcast-red"><p style="text-align: center; font-size: 14pt>This Lottery drawing has ended due to lack of users.</p</div>');
				return this.end();
			}
			this.drawWinner();
		}, timeUntilEnd);
		this.display = `<div style="broadcast-blue"><p style="text-align: center; font-size: 14pt>A Lottery Drawing has started looking for players!<hr /><br />For the price of 3 ${moneyPlural}, you can earn 5 ${moneyPlural} plus one ${moneyName} per user who joins.</p><br /><button name="send" value="/lottery join">Click here to join the Lottery</button></div>`;
	}

	onConnect(user, connection) {
		if (this.state === 'signups') {
			room.add(`|uhtml|${display}`);
		} else {
			room.add(`|uhtml|<div class="infobox"><p>A lottery game is about to announce the winner!</p></div>`);
		}
	}

	drawWinner(user, room) {
		this.state = "drawing";
		let determineWinner = Math.floor(Math.random() * this.players.length);
		let basePrize = 5;
		let lottoPrize = basePrize + this.players.size;
		let winner = determineWinner(user.name);
		room.add(`|uhtmlchange|<div style="infobox"><center><strong>Congratulations</strong> ${Server.nameColor(winner, true)}!!! You have won the reward of ${lottoPrize} ${moneyName}</center></div>`);
		Economy.writeMoney(winner, lottoPrize);
		Economy.logTransaction(`${winner} has won the Lottery prize of ${lottoPrize} ${moneyPlural}`);
		this.end();
	}

	joinLottery(user, room, costToEnter) {
		if (!user.named || !user.registered) return this.sendReply("To join the Lottery, you must be on a registered account");
		if (this.players.length && this.players[0].latestIp === user.latestIp) return this.sendReply(`You have already joined this Lottery giveaway under the name ${this.players.name[0]}.`);
		this.players.set(user);
		Economy.readMoney(user.userid, costToEnter => {
			if (money < this.costToEnter) return this.sendReply(`You do not have enough ${moneyPlural} to join the Lottery drawing.`);
		});
		Economy.writeMoney(user.userid, -costToEnter, () => {
			Economy.logTransaction(`${user.name} has spent ${moneyPlural}, and entered the Lottery drawing.`);
		});
		this.sendReply("You have successfully joined the Lottery drawing.");
		this.updateJoins();
	}

	leaveLottery(user, room, costToEnter) {
		if (!this.players.has(user)) return this.sendReply("You have not joined the Lottery.");
		this.players.delete(user);
		if (this.state === "signups") {
			this.updateJoins();
		} else {
			room.add(`|html|${Server.nameColor(user.name, true)} has left the Lottery.`);
		}
		Economy.writeMoney(user.userid, costToEnter, () => {
			Economy.logTransaction(`${user.name} has been refunded their ${costToEnter} Lottery join fee, and left the drawing.`);
		});
		this.sendReply("You have successfully left the Lottery drawing.");
	}

	updateJoins(user) {
		if (this.players.size > 0) {
			display += `<center><strong>${this.players.size}</strong> ${(this.players.size === 1 ? 'user has' : 'user have')} joined: ${Array.from(this.players).map(player => Server.nameColor(player[0], true)).join(', ')}</center>`;
		}
		room.add(`|uhtmlchange|${display}</center></div>`);
	}

	end(room) {
		room.add(`|uhtmlchange|<div class="infobox">The Lottery drawing has ended.</div>`);
		delete this.room.lottery;
	}
}

exports.commands = {
	lotto: "lottery",
	lottery: {
		create: "new",
		make: "new",
		new: function (user, room) {
			if (room.lottery) return this.sendReply("A join-able Lottery drawing is already active.");
			if (!this.can('broadcast', null, room)) return false;
			this.privateModCommand(`(A new Lottery drawing has been created.)`);
			room.lottery = new Lottery(room, user);
		},
		j: "join",
		join: function (user, room) {
			if (!this.canTalk()) return;
			if (room.lottery && this.state !== "signups") return this.sendReply("There is no joinable Lottery drawing going on right now.");
			if (!room.lottery.joinLottery(user)) return this.sendReply("Unable to join this drawing.");
			room.lottery.joinLottery(user, this);
		},
		part: "leave",
		l: "leave",
		leave: function (user, room) {
			room.lottery.leaveLottery(user, this);
		},
		forcestart: "start",
		begin: "start",
		start: function (user, room) {
			if (!this.can('broadcast', null, room)) return;
			if (!room.lottery || this.state !== "signups") return this.sendReply("There is not any Lottery drawing available to be started.");
			if (room.lottery.players.size < 2) return this.sendReply("You can't start a Lottery drawing without at least two users joining.");
			this.privateModCommand(`(A new Lottery drawing has been started early.)`);
			room.lottery.drawWinner(user, this);
		},
		cancel: "end",
		end: function (user, room) {
			if (!this.can('broadcast', null, room)) return;
			if (!room.lottery) return this.sendReply("There is no Lottery drawing going on right now.");
			this.privateModCommand(`(The Lottery drawing was forcefully ended.)`);
			room.lottery.end(user, this);
		},
	},
};
