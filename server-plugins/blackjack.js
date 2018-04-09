"use strict";

const suits = ["Diamonds", "Spades", "Clubs", "Hearts", "Jokers", "Queens", "Kings", "Aces"];
const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function createDeck() {
	let basic = [];

	for (const suit of suits) {
		basic.push(...values.map(v => {
			return {value: v, suits: suit, name: suits + " " + v};
		}));
	}
}

function cardValue(value) {
	if (values.includes["1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
		value = values;
	} else if (values.includes["10", "J", "Q", "K"]) {
		value = 10;
	} else if (values === "A") {
		value = 1 || 11;
	}
	return value;
}

class Blackjack {
	constructor(room, pot) {
		this.room = room;
		this.pot = pot;
		this.state = "signups";
		room.bjNumber = room.bjNumber ? room.bjNumber++ : 1;
		this.bjNumber = room.bjNumber;
		this.gamblers = [];
		this.deck = Dex.shuffle(createDeck());
		this.turn = null;
		this.room.add(`|uhtml|blackjack-${this.bjNumber}|<div class="broadcast-blue"><p style="font-size: 14pt; text-align: center">A new match of Blackjack is starting!</p><p style="font-size: 9pt; text-align: center"><button name="send" value="/bj join">Join</button></p></div>`, true);
		this.timer = 60 * 1000;
	}

	join(user) {
		if (this.gamblers.includes(user.userid)) return user.sendTo(this.room, "You have already joined the match of Blackjack in this room.");
		Economy.readMoney(user.userid, money => {
			if (money < this.pot) {
				user.sendTo(this.room, `You do not have enough ${((this.pot === 1) ? `${moneyName}` : `${moneyPlural}`)} to join.`);
				return;
			}
			Economy.writeMoney(user.userid, -this.pot, () => {
				Economy.readMoney(user.userid, money => {
					Economy.logTransaction(`${user.name} joined a match of Blackjack for ${this.pot} ${((this.pot === 1) ? `${moneyName}` : `${moneyPlural}`)}.`);
				});
			});
			let hand = [];
			this.gamblers.push([user.userid, hand]);
			user.sendTo(this.room, "You have joined the ongoing match of Blackjack in this room.");
		});
	}

	leave(user) {
		if (!this.gamblers.includes(user.userid)) return user.sendTo(this.room, "You are not in the current match of Blackjack in this room.");
		this.gamblers.splice(this.gamblers.indexOf(user.userid), 1);
		if (this.turn === user.userid) this.nextGambler();
		clearTimeout(this.timer);
		user.sendTo(this.room, `You have successfully left the ongoing match of Blackjack in this room.`);
	}

	drawCard(user, amount) {
		amount = parseInt(amount);
		if (!amount || amount < 1) amount = 1;
		let drawnCards = [];
		drawnCards.push(this.deck.pop());
		let player = this.players[user.userid];
		player.hand.push(...drawnCards);
		player.sendTo(this.room, `You drew ${Chat.toListString(drawnCards)}.`);
		return drawnCards;
	}

	hit(user) {
		if (!this.gamblers.includes(user.userid)) return user.sendTo(this.room, "You are not in the current match of Blackjack in this room.");
		if (this.turn !== user.userid) return user.sendTo(this.room, "It is not your turn to hit.");
		clearTimeout(this.timer);
		this.drawCard(user.userid, 1);
		this.room.add(`|html|${Server.nameColor(user.name, true)} has hit!`).update();
	}

	pass(user) {
		if (!this.gamblers.includes(user.userid)) return user.sendTo(this.room, "You are not in the current match of Blackjack in this room.");
		if (this.turn !== user.userid) return user.sendTo(this.room, "It is not your turn yet.");
		clearTimeout(this.timer);
		this.room.add(`|html|${Server.nameColor(user.name, true)} has passed!`).update();
		this.nextGambler();
	}

	nextGambler() {
		clearTimeout(this.timer);
		let next = this.gamblers.indexOf(this.turn);
		this.turn = next;
		this.room.add(`|html|${Server.nameColor(next, true)} is the next one up to hit or pass!`);
	}

	start() {
		this.state = "started";
		let shuffledGamblers = Dex.shuffle(this.gamblers);
		this.gamblers = shuffledGamblers;
		let first = this.gamblers[Math.floor(Math.random() * this.gamblers.length)];
		this.turn = first;
		// give cards to the players
		for (let i in this.gamblers) {
			this.gamblers[i].hand.push(...this.drawCard(this.gamblers[i], 2));
		}
		this.timer = setTimeout(() => {
			this.room.add(`|html|${Server.nameColor(first, true)} has been eliminated due to inactivity.`);
			this.leave(first);
		}, this.timer * 1000);
		this.room.add(`|html|${Server.nameColor(first, true)} is the first to either hit or pass. Good luck all!`).update();
	}

	end(user) {
		this.room.add(`<strong>The match of Blackjack has been ended.</strong>`).update();
		if (user) {
			for (let u in this.room.blackjack.gamblers) {
				Economy.writeMoney(this.room.blackjack.gamblers[u], this.costToJoin, () => {
					Economy.logTransaction(`${this.room.blackjack.gamblers[u]}'s ${this.pot} join fee was refunded due to an early ended game.`);
				});
			}
		}
		clearTimeout(this.timer);
		delete this.room.blackjack;
	}
}

exports.commands = {
	bj: "blackjack",
	blackjack: {
		create: "new",
		make: "new",
		host: "new",
		new: function (target, room, user) {
			if (room.id !== "casino") return this.errorReply(`This command only works in the Casino.`);
			if (!this.can("minigame", null, room)) return false;
			if (!this.canTalk()) return this.errorReply(`You must be able to talk to use this command.`);
			if (room.blackjack) return this.errorReply(`There is already an ongoing game of Blackjack in this room.`);
			if (!target) return this.errorReply(`You must specify the pot's worth.`);
			if (isNaN(target)) return this.errorReply(`The pot amount must be an integer.`);
			if (target < 1 || target > 500) return this.errorReply(`The pot must be at the most 500 ${moneyPlural}.`);
			Economy.readMoney(user.userid, money => {
				if (money < target) return this.sendReply(`You don't have ${target} ${((money === 1) ? moneyName : moneyPlural)}.`);
				room.blackjack = new Blackjack(room, target);
				this.parse("/blackjack join");
			});
		},

		j: "join",
		join: function (target, room, user) {
			if (!room.blackjack) return this.errorReply(`There is not currently a match of Blackjack in this room.`);
			if (!this.canTalk()) return this.errorReply(`You must be able to talk to join a match of Blackjack.`);
			if (!user.registered) return this.errorReply(`You must be a registered account to join a match of Blackjack.`);
			room.blackjack.join(user);
		},

		l: "l",
		quit: "l",
		leave: function (target, room, user) {
			if (!room.blackjack) return this.errorReply(`There is not currently a match of Blackjack in this room.`);
			room.blackjack.leave(user);
		},

		hit: function (target, room, user) {
			if (!room.blackjack || room.blackjack.state !== "started") return this.errorReply(`You cannot pass right now.`);
			room.blackjack.hit(user);
		},

		pass: function (target, room, user) {
			if (!room.blackjack || room.blackjack.state !== "started") return this.errorReply(`You cannot pass right now.`);
			room.blackjack.pass(user);
		},

		begin: "start",
		proceed: "start",
		start: function (target, room, user) {
			if (!room.blackjack || room.blackjack.state !== "signups") return this.errorReply(`There is not currently a match of Blackjack in this room that can be started.`);
			if (!this.can("minigame", null, room)) return false;
			if (!this.canTalk()) return this.errorReply(`You must be able to talk to use this command.`);
			if (room.blackjack.gamblers.length < 2) return this.errorReply(`This match needs a minimum of 2 gamblers to begin.`);
			room.blackjack.start();
		},

		cancel: "end",
		end: function (target, room, user) {
			if (!room.blackjack) return this.errorReply(`There is not currently a match of Blackjack in this room.`);
			if (!this.can("minigame", null, room)) return false;
			if (!this.canTalk()) return this.errorReply(`You must be able to talk to use this command.`);
			room.blackjack.end(user);
		},

		"": "help",
		help: function () {
			this.parse(`/help blackjack`);
		},
	},

	blackjackhelp: [
	],
};
