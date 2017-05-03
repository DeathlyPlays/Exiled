/* * * * * * * * * * * * * *
 *	Ping Pong          *
 *  Created by:            *
 * The Ludicolo Bros       *
 * (HoeenHero and Insist)  *
 * * * * * * * * * * * * * */

"use strict";

class PingPong extends Console.Console {
	constructor(user, room, muted, rounds, kickTime) {
		super(user, room, "background:url('https://media.giphy.com/media/l41lO5QYsXKGi911C/giphy.gif'); color: black; font-weight: bold;", null, null, muted, null);
		this.user = user;
		this.game = 'Ping Pong';
		this.hasBall = 'PLAYER';
		this.score = [0, 0];
		this.remainingRounds = rounds || 5;
		this.winScore = (this.remainingRounds % 2 === 0 ? this.remainingRounds / 2 + 1 : Math.ceil(this.remainingRounds / 2));
		this.inProgress = false;
		this.kickTime = (isNaN(Number(kickTime)) ? 1000 * 1.5 : Number(kickTime) * 1000);
		this.timer = null;
		this.ended = false;
	}
	serve() {
		if (this.inProgress) return false;
		this.remainingRounds--;
		this.inProgress = true;
		this.hasBall = 'COM';
		this.update(null, '<center style="background-color: green">The COM is hitting the ball...</center>', null);
		this.comAction();
		return true;
	}
	hit() {
		if (!this.inProgress || this.hasBall !== 'PLAYER') return false;
		clearTimeout(this.timer);
		let minReq = Math.round(Math.random() * 8) * 10;
		// hit the ball or not, return true for hit, false for not
		return Math.round(Math.random() * 100) > minReq;
	}
	comAction() {
		if (!this.inProgress || this.hasBall !== 'COM') return false;
		// hit the ball or not, return true for hit, false for not
		let hit = Math.round(Math.random() * 100) > 30;
		if (hit) {
			this.hasBall = 'PLAYER';
			//send updates
			this.update(null, '<center><button class="button" name="send" value="/pingpong hit">HIT THE BALL</button></center>');
			this.runAutoDQ();
		} else {
			this.endRound(true, false);
		}
	}
	endRound(win, timeOut) {
		if (!this.inProgress) return false;
		this.inProgress = false;
		let htm = (win ? 'The COM missed! You won this round.' : (timeOut ? 'You took too long to hit the ball...' : 'You missed...'));
		if (win) {
			this.score[0]++;
			if (this.score[0] >= this.winScore) return this.endGame(true);
		} else {
			this.score[1]++;
			if (this.score[1] >= this.winScore) return this.endGame(false);
		}
		if (this.remainingRounds <= 0) {
			if (this.score[0] <= this.score[1]) return this.endGame(false);
			return this.endGame(true);
		}
		htm += "SCORE: " + this.user.name + " " + this.score[0] + " - COM: " + this.score[1] + "<br/>";
		htm += '<br/><button class="button" name="send" value="/pingpong serve">Serve</button>';
		this.update(null, '<center style="background-color: green">' + htm + '</center>', null);
		this.hasBall = 'PLAYER';
		return true;
	}
	runAutoDQ() {
		this.timer = setTimeout(function () {
			if (!this || !this.endRound) return;
			return this.endRound(false, true);
		}, this.kickTime);
	}
	
	endGame(win) {
		if (win) {
			this.update(null, '<center style="background-color: green">Congratulations to ' + this.user.name + ' for winning the game of Ping Pong!<br/><button name="send" class="button" value="/pingpong start">Play again?</button> | <button name="send" class="button" value="/pingpong end">No, I wont play your stupid game again.</button></center>');
		} else {
			this.update(null, '<center style="background-color: green">The COM won the game of ping pong...<br/><button name="send" class="button" value="/pingpong start">Play again?</button> | <button name="send" class="button" value="/pingpong end">No, I wont play your stupid game again.</button></center>');
		}
	}
};

exports.box = {
	startCommand: '/pingpong new',
	name: 'Ping Pong',
};

exports.commands = {
	pingpong: {
		make: 'new',
		begin: 'new',
		create: 'new',
		start: 'new',
		new: function (target, room, user) {
			target = target.split(',');
			if (user.console) this.parse('/console kill');
			user.console = new PingPong(user, room, true, target[0], target[1]);
			user.console.init();
			user.console.update(null, '<center style="background-color: green"><h1>Ping Pong</h1><br/><button class="button" name="send" value="/pingpong serve">Start</button></center>');
		},
		serve: function (target, room, user) {
			if (!user.console || user.console.game !== 'Ping Pong') return;
			user.console.serve();
		},
		hit: function (target, room, user) {
			if (!user.console || user.console.game !== 'Ping Pong') return;
			if (user.console.hasBall !== 'PLAYER') return;
			let hit = user.console.hit();
			if (hit) {
				user.console.hasBall = 'COM';
				// send updates
				user.console.update(null, "<center>The COM is hitting the ball...</center>", null);
				user.console.comAction();
			} else {
				user.console.endRound(false, false);
			}
		},
		end: function (target, room, user) {
			if (!user.console || user.console.game !== 'Ping Pong') return;
			this.parse('/console kill');
		},
		'': function (target, room, user) {
			return this.parse('/help pingpong');
		},
	},
	pingponghelp: [
		'/pingpong new - Begins a match of ping pong.',
		'/pingpong serve - Serve the ping pong ball.',
		'/pingpong hit - Hit the ping pong ball back.',
		'/pingpong end - End the match of ping pong.'
	],
};
