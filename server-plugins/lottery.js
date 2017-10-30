/****************************************
 * Lottery Plug-in for Pokémon Showdown
 *            Created by:
 *         HoeenHero and Insist
 ****************************************/

"use strict";

class Lottery {
	constructor(room, user) {
		this.players = new Map();
		this.room = room;
		room.lottoNumber = room.lottoNumber ? room.lottoNumber++ : 1;
		this.lottoNumber = room.lottoNumber;
		this.costToJoin = 3;
		this.state = "signups";
		this.playerCount = 0;
		this.room.add(`|uhtml|lottery-${this.lottoNumber}|<div class="broadcast-blue"><p style="font-size: 14pt; text-align: center">A new <strong>Lottery drawing</strong> is starting!</p><p style="font-size: 9pt; text-align: center"><button name="send" value="/lotto join">Join</button><br /><strong>DISCLAIMER: JOINING COSTS ${this.costToJoin} ${moneyPlural}!!!!</strong></p></div>`, true);
		this.timer = setTimeout(() => {
			if (this.playerCount < 2) {
				this.room.add('|uhtmlchange|lottery-' + this.lottoNumber + '|<div class="broadcast-red"><p style="text-align: center; font-size: 14pt>This Lottery drawing has ended due to lack of users.</p></div>');
				return this.end();
			}
			this.drawWinner();
		}, 1000 * 60 * 60 * 24);
	}

	onConnect(user, connection, room) {
		if (this.state === "signups") {
			user.sendTo(this.room, '|uhtml|lottery-' + this.lottoNumber + '|<div class="broadcast-blue"><p style="text-align: center; font-size: 14pt>A Lottery Drawing has started looking for players!<hr /><br />For the price of 3 ' + moneyPlural + ', you can earn 5 ' + moneyPlural + ' plus one ' + moneyName + ' per user who joins.</p><br /><button name="send" value="/lottery join">Click here to join the Lottery</button></div>');
		} else {
			user.sendTo(this.room, '|uhtmlchange|lottery-' + this.lottoNumber + '|<div class="broadcast-green"><p style="text-align: center; font-size: 14pt>This Lottery drawing is about to announce a winner!!!');
		}
	}

	drawWinner(user, room) {
		let determineWinner = Math.floor(this.playerCount * Math.random());
		let basePrize = 5;
		let lottoPrize = basePrize + this.playerCount + this.costToJoin;
		let winner = toId(user.name);
		this.room.add(`|uhtmlchange|lottery-${this.lottoNumber}|<div class="infobox"><center><strong>Congratulations</strong> ${Server.nameColor(winner, true)}!!! You have won the reward of ${lottoPrize} ${moneyPlural}</center></div>`);
		Economy.writeMoney(winner, lottoPrize);
		Economy.logTransaction(`${winner} has won the Lottery prize of ${lottoPrize} ${moneyPlural}`);
		this.state = "drawing";
		this.end();
	}

	//TODO: Deny users from joining, if they already have joined
	joinLottery(user) {
		Economy.readMoney(user.userid, money => {
			if (money < this.costToJoin) {
				user.sendTo(this.room, 'You have been removed from this Lottery drawing, as you do not have enough ' + moneyPlural + ' to join.');
				return;
			}
			Economy.writeMoney(user.userid, -this.costToJoin, () => {
				Economy.readMoney(user.userid, money => {
					Economy.logTransaction(user.userid + " entered a Lottery drawing for " + this.costToJoin + " " + moneyPlural + ".");
				});
			});
		});
		this.playerCount++;
	}

	//TODO: Add a check that the user must be already in the Lottery drawing before able to leave
	leaveLottery(user, room) {
		user.sendTo(this.room, '|html|' + Server.nameColor(user.name, true) + ' has left the game!');
		Economy.writeMoney(user.userid, this.costToJoin, () => {
			Economy.logTransaction(`${user.name} has been refunded their ${this.costToJoin} ${moneyPlural} Lottery join fee, and left the drawing.`);
		});
		this.playerCount--;
	}

	end(user) {
		this.room.add(`|uhtmlchange|lottery-${this.lottoNumber}|<div class="infobox">This Lottery Drawing has ended.</div>`, true);
		clearTimeout(this.timer);
		delete this.room.lottery;
	}
}

exports.commands = {
	lotto: "lottery",
	lottery: {
		create: "new",
		make: "new",
		new: function (target, room, user) {
			if (room.lottery) return this.sendReply("A join-able Lottery drawing is already active.");
			if (!this.can('broadcast', null, room)) return false;
			this.privateModCommand(`(A new Lottery drawing has been created.)`);
			room.lottery = new Lottery(room, user);
		},
		j: "join",
		join: function (target, room, user) {
			if (!this.canTalk()) return;
			if (!this.state === "signups") return this.sendReply('You cannot join a Lottery drawing after it has started.');
			if (!user.registered) return this.sendReply("To join the Lottery, you must be on a registered account.");
			if (!room.lottery) return this.sendReply("There is no join-able Lottery drawing going on right now.");
			this.sendReply("You have successfully joined the Lottery drawing. Good luck!");
			room.lottery.joinLottery(user, this);
		},
		part: "leave",
		l: "leave",
		leave: function (target, room, user) {
			this.sendReply("You have successfully left the Lottery drawing. Your " + moneyName + " entry fee has been refunded.");
			room.lottery.leaveLottery(user, this);
		},
		forcestart: "start",
		begin: "start",
		start: function (target, room, user) {
			if (!this.can('broadcast', null, room)) return;
			if (!room.lottery) return this.sendReply("There is not any Lottery drawing available to be started.");
			if (room.lottery.playerCount < 1) return this.sendReply("You can't start a Lottery drawing without at least one user joining.");
			this.privateModCommand(`(A new Lottery drawing has been started early.)`);
			room.lottery.drawWinner(user, this);
		},
		cancel: "end",
		end: function (target, room, user) {
			if (!this.can('broadcast', null, room)) return;
			if (!room.lottery) return this.sendReply("There is no Lottery drawing going on right now.");
			this.privateModCommand(`(The Lottery drawing was forcefully ended.)`);
			room.lottery.end(user, this);
		},
	},
};
