/****************************************
 * Lottery Plug-in for Pokémon Showdown
 *            Created by:
 *               Insist
 ****************************************/

"use strict";

class Lottery {
	constructor(room) {
		this.room = room;
		this.costToJoin = 3;
		this.state = "signups";
		this.players = new Map();
		this.room.add('|uhtml|<div style="broadcast-blue"><p style="text-align: center; font-size: 14pt>A Lottery Drawing has started looking for players!<hr /><br />For the price of 3 ' + moneyPlural + ', you can earn 5 ' + moneyPlural + ' plus one ' + moneyName + ' per user who joins.</p><br /><button name="send" value="/lottery join">Click here to join the Lottery</button></div>');
		this.timer = setTimeout(() => {
			if (this.players.size < 2) {
				this.room.add('|uhtmlchange|<div style="broadcast-red"><p style="text-align: center; font-size: 14pt>This Lottery drawing has ended due to lack of users.</p</div>');
				return this.end();
			}
			this.drawWinner();
		}, 1000 * 60 * 60 * 24);
	}

	onConnect(user, connection, room) {
		if (this.state === "signups") {
			this.room.add('|uhtml|<div style="broadcast-blue"><p style="text-align: center; font-size: 14pt>A Lottery Drawing has started looking for players!<hr /><br />For the price of 3 ' + moneyPlural + ', you can earn 5 ' + moneyPlural + ' plus one ' + moneyName + ' per user who joins.</p><br /><button name="send" value="/lottery join">Click here to join the Lottery</button></div>');
		} else {
			this.room.add('|uhtmlchange|<div style="broadcast-green"><p style="text-align: center; font-size: 14pt>This Lottery drawing is about to announce a winner!!!');
		}
	}

	drawWinner(user, room) {
		let determineWinner = Math.floor(Math.random() * this.players.length);
		let basePrize = 5;
		let lottoPrize = basePrize + this.players.size + this.costToJoin;
		let winner = determineWinner(user.name);
		this.room.add(`|uhtmlchange|<div style="infobox"><center><strong>Congratulations</strong> ${Server.nameColor(winner, true)}!!! You have won the reward of ${lottoPrize} ${moneyName}</center></div>`);
		Economy.writeMoney(winner, lottoPrize);
		Economy.logTransaction(`${winner} has won the Lottery prize of ${lottoPrize} ${moneyPlural}`);
		this.state = "drawing";
		this.end();
	}

	joinLottery(user, self) {
		if (!user.named) return self.errorReply("You must choose a name before joining a Lottery drawing.");
		if (this.players.has(user)) return self.sendReply('You have already joined this Lottery drawing.');
		if (this.state !== "signups") return self.sendReply('You cannot join a Lottery drawing after it has started.');
		this.players.set(user);
		this.updateJoins();
		Economy.readMoney(user.userid, money => {
			if (money < this.costToJoin) return self.sendReply(`You do not have enough ${moneyName} to join the Lottery drawing.`);
		});
		Economy.writeMoney(user.userid, this.costToJoin * -1, () => {
			Economy.logTransaction(`${user.name} has spent ${this.costToJoin} ${moneyPlural}, and entered the Lottery drawing.`);
		});
	}

	leaveLottery(user, self) {
		if (!this.players.has(user)) return self.sendReply('You haven\'t joined this Lottery drawing yet.');

		this.players.delete(user);
		if (!this.state === "signups") {
			this.updateJoins();
		} else {
			this.room.add('|html|' + Server.nameColor(user.name, true) + ' has left the game!');
		}
		Economy.writeMoney(user.userid, this.costToJoin, () => {
			Economy.logTransaction(`${user.name} has been refunded their ${this.costToJoin} ${moneyPlural} Lottery join fee, and left the drawing.`);
		});
	}

	updateJoins(user, room) {
		if (this.players.size > 0) {
			msg += '<center><strong>' + this.players.size + '</strong> ' + (this.players.size === 1 ? 'user has' : 'users have') + ' joined: ' + Array.from(this.players).map(player => Server.nameColor(player[0].name)).join(', ') + '</center>';
		}
		this.room.add('|uhtmlchange|' + msg + '</center></div>');
	}

	end(user) {
		clearTimeout(this.timer);
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
			room.lottery = new Lottery(user, room);
		},
		j: "join",
		join: function (user, room) {
			if (!this.canTalk()) return;
			if (user.named && user.registered) return this.sendReply("To join the Lottery, you must be on a registered account");
			if (!room.lottery) return this.sendReply("There is no joinable Lottery drawing going on right now.");
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
