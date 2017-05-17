'use strict';

class PassTheBomb {
	constructor(room, seconds) {
		this.players = new Map();
		this.round = 0;
		this.room = room;
		if (this.room.bombCount) {
			this.room.bombCount++;
		} else {
			this.room.bombCount = 1;
		}
		this.timeLeft = Date.now() + seconds * 1000;

		this.room.add('|uhtml|bomb' + this.room.bombCount + this.round + '|<div class = "infobox"><center>A game of <b>Pass the Bomb</b> has been started!<br>' +
			'The game will begin in <b>' + seconds + '</b> seconds!<br>' +
			'<button name = "send" value = "/passthebomb join">Join!</button></center></div>'
		);
		this.timer = setTimeout(() => {
			if (this.players.size < 3) {
				this.room.add('|uhtmlchange|bomb' + this.room.bombCount + this.round + '|<div class = "infobox"><center>This game of Pass the Bomb has been ended due to the lack of players.</center></div>').update();
				return this.end();
			}
			this.nextRound();
		}, seconds * 1000);
	}
	updateJoins() {
		let msg = 'bomb' + this.room.bombCount + this.round + '|<div class = "infobox"><center>A game of <b>Pass the Bomb</b> has been started!<br>' +
			'The game will begin in <b>' + Math.round((this.timeLeft - Date.now()) / 1000) + '</b> seconds<br>' +
			'<button name = "send" value = "/passthebomb join">Join!</button></center>';
		if (this.players.size > 0) {
			msg += '<center><b>' + this.players.size + '</b> ' + (this.players.size === 1 ? 'user has' : 'users have') + ' joined: ' + Array.from(this.players).map(player => Chat.escapeHTML(player[1].name)).join(', ') + '</center>';
		}
		this.room.add('|uhtmlchange|' + msg + '</div>');
	}
	join(user, self) {
		if (this.round > 0) return self.sendReply('You cannot join a game of pass the bomb after it has been started.');
		if (!user.named) return self.errorReply("You must choose a name before joining a game of pass the bomb.");
		if (this.players.has(user.userid)) return self.sendReply('You have already joined this game of pass the bomb.');

		let players = Array.from(this.players).map(playerinfo => playerinfo[1]);
		let joined = players.filter(player => player.ip === user.latestIp);
		if (joined.length) return self.errorReply("You have already joined this game of pass the bomb under the name '" + joined[0].name + "'. Use that name/alt instead.");

		this.players.set(user.userid, {'name':user.name, 'ip':user.latestIp, 'status':'alive', 'warnings':0});
		this.updateJoins();
	}
	leave(userid, self) {
		if (!this.players.has(userid)) return self.sendReply('You haven\'t joined this game of pass the bomb yet.');

		if (!this.round) {
			this.players.delete(userid);
			this.updateJoins();
			self.sendReply("You have left this game of pass the bomb.");
		} else {
			this.removeUser(userid, true);
		}
	}
	getSurvivors() {
		return Array.from(this.players).filter(player => player[1].status === 'alive');
	}
	setBomb(userid) {
		if (!userid) {
			let players = this.getSurvivors();
			this.holder = players[Math.floor(Math.random() * players.length)][0];
		} else {
			this.holder = userid;
		}
	}
	getMsg() {
		let msg = 'bomb' + this.room.bombCount + this.round + '|<div class = "infobox"><center><b>Round ' + this.round + '</b><br>' +
			'Players: ' + this.getSurvivors().map(player => Chat.escapeHTML(player[1].name)).join(', ') +
			'<br><small>Use /pb or /passbomb [player] to pass the bomb to another player!</small>';
		return msg;
	}
	nextRound() {
		clearTimeout(this.timer);
		this.canPass = false;
		if (this.checkWinner()) return this.getWinner();
		this.players.forEach((details, user) => {
			if (this.players.get(user).status === 'alive') {
				this.players.get(user).warnings = 0;
			}
		});

		this.round++;
		this.madeMove = false;
		this.room.add('|uhtml|' + this.getMsg() + '<br><i>Wait for it...</i></div>').update();

		this.release = setTimeout(() => {
			this.setBomb();
			let player = this.players.get(this.holder).name;
			this.room.add('|uhtmlchange|' + this.getMsg() + '<br><b style = "font-size: 10pt;">The bomb has been passed to <span style = "color:' + Exiled.hashColor(this.holder) + '">' + Chat.escapeHTML(player) + '</span>!</b></div>').update();
			this.canPass = true;
			this.resetTimer();
		}, (Math.floor(Math.random() * 12) + 3) * 1000);
	}
	pass(user, target, self) {
		let getUser = this.players.get(user.userid);
		if (!getUser) return self.sendReply("You aren't a player in this game of Pass the Bomb.");
		if (!this.round) return self.sendReply("The game hasn't started yet!");

		if (getUser.status === 'dead') return self.sendReply("You've already been killed!");

		if (!target || !target.trim()) return self.sendReply("You need to choose a player to pass the bomb to.");

		let targetId = toId(target);
		let targetUser = Users.getExact(targetId) ? Users(targetId).name : target;
		if (!this.players.has(targetId)) return self.sendReply(targetUser + ' is not a player!');
		if (this.players.get(targetId).status === 'dead') return self.sendReply(this.players.get(targetId).name + ' has already been killed!');
		if (targetId === user.userid) return self.sendReply('You\'re already in possession of the bomb! You can\'t pass it to yourself!');

		if (!this.canPass || this.holder !== user.userid) {
			if (getUser.warnings < 2) {
				this.players.get(user.userid).warnings++;
				return self.sendReply("You're not in posession of the bomb yet!");
			}
			this.removeUser(user.userid);
			self.sendReply("You have been disqualified for spamming /passbomb.");
			self.privateModCommand("(" + user.name + " was disqualified for spamming /passbomb.)");
			return;
		}

		this.madeMove = true;
		this.setBomb(targetId);
		this.room.add('|html|' + user.name + ' passed the bomb to <b style = "' + Exiled.hashColor(targetId) + '">' + this.players.get(targetId).name + '</b>!');

		if (this.checkWinner()) this.getWinner();
	}
	resetTimer() {
		this.timer = setTimeout(() => {
			let player = this.players.get(this.holder).name;
			this.room.add('|html|<b>The bomb exploded and killed <span style = "' + Exiled.hashColor(this.holder) + '">' + player + '</span>').update();
			this.players.get(this.holder).status = 'dead';
			this.canPass = false;
			setTimeout(() => {
				this.nextRound();
				this.room.update();
			}, 1200);
		}, (Math.floor(Math.random() * 26) + 5) * 1000);
	}
	dq(user, target, self) {
		if (!this.round) return self.sendReply('You can only disqualify a player after the first round has begun.');
		let targetId = toId(target);

		let getUser = this.players.get(targetId);
		if (!getUser) return self.sendReply(target + ' is not a player!');
		if (getUser.status === 'dead') return self.sendReply(getUser.name + ' has already been killed!');

		self.privateModCommand("(" + getUser.name + " was disqualified by " + user.name + ".)");
		this.removeUser(targetId);
	}
	removeUser(userid, left) {
		if (!this.players.has(userid)) return;

		this.room.add('|html|<b>' + Chat.escapeHTML(this.players.get(userid).name) + ' has ' + (left ? 'left' : 'been disqualified from') + ' the game.</b>');
		this.players.delete(userid);
		this.madeMove = true;
		if (this.checkWinner()) {
			this.getWinner();
		} else if (!this.canPass) {
			this.room.add('|uhtmlchange|' + this.getMsg() + '<br><i>Wait for it...</i></div>').update();
		} else if (this.holder === userid) {
			this.setBomb();
			let player = this.players.get(this.holder).name;
			this.room.add('|html|The bomb has been passed to <b>' + Chat.escapeHTML(player) + '!</b>').update();
		}
	}
	checkWinner() {
		if (this.getSurvivors().length === 1) return true;
	}
	getWinner() {
		let winner = this.getSurvivors()[0][1].name;
		let msg = '|html|<div class = "infobox"><center>The winner of this game of Pass the Bomb is <b style = "color:' + Exiled.hashColor(winner) + '">' + Chat.escapeHTML(winner) + '!</b> Congratulations!</center>';
		this.room.add(msg).update();
		this.end();
	}
	end(user) {
		if (user) {
			let msg = '<div class = "infobox"><center>This game of Pass the Bomb has been forcibly ended by <b>' + Chat.escapeHTML(user.name) + '</b>.</center></div>';
			if (!this.madeMove) {
				this.room.add('|uhtmlchange|bomb' + this.room.bombCount + this.round + '|' + msg).update();
			} else {
				this.room.add('|html|' + msg).update();
			}
		}
		if (this.release) clearTimeout(this.release);
		clearTimeout(this.timer);
		delete this.room.passthebomb;
	}
}

let commands = {
	'': 'help',
	help: function () {
		this.parse('/help passthebomb');
	},
	'new': 'start',
	begin: 'start',
	start: function (target, room, user) {
		if (room.passthebomb) return this.sendReply("There is already a game of pass the bomb going on in this room.");
		if (room.isMuted(user) || user.locked) return this.errorReply("You cannot use this while unable to speak.");
		if (!user.can('broadcast', null, room)) return this.sendReply("You must be ranked + or higher in this room to start a game of pass the bomb.");

		if (!target || !target.trim()) target = '60';
		if (isNaN(target)) return this.sendReply('\'' + target + '\' is not a valid number.');
		if (target.includes('.') || target > 180 || target < 10) return this.sendReply('The number of seconds needs to be a non-decimal number between 10 and 180.');

		room.passthebomb = new PassTheBomb(room, Number(target));
	},
	join: function (target, room, user) {
		if (!room.passthebomb) return this.sendReply("There is no game of pass the bomb going on in this room.");
		if (room.isMuted(user) || user.locked) return this.errorReply("You cannot use this while unable to speak.");

		room.passthebomb.join(user, this);
	},
	leave: function (target, room, user) {
		if (!room.passthebomb) return this.sendReply("There is no game of pass the bomb going on in this room.");

		room.passthebomb.leave(user.userid, this);
	},
	proceed: function (target, room, user) {
		if (!room.passthebomb) return this.sendReply("There is no game of pass the bomb going on in this room.");
		if (room.isMuted(user) || user.locked) return this.errorReply("You cannot use this while unable to speak.");
		if (!user.can('broadcast', null, room)) return this.sendReply("You must be ranked + or higher in this room to forcibly begin the first round of a game of pass the bomb.");

		if (room.passthebomb.round) return this.sendReply('This game of pass the bomb has already begun!');
		if (room.passthebomb.players.size < 3) return this.sendReply('There aren\'t enough players yet. Wait for more to join!');
		room.add('(' + user.name + ' forcibly started round 1)');
		room.passthebomb.nextRound();
	},
	disqualify: 'dq',
	dq: function (target, room, user) {
		if (!room.passthebomb) return this.sendReply("There is no game of pass the bomb going on in this room.");
		if (room.isMuted(user) || user.locked) return this.errorReply("You cannot use this while unable to speak.");
		if (!user.can('mute', null, room)) return this.sendReply("You must be ranked % or higher in this room to disqualify a user from a game of pass the bomb.");

		room.passthebomb.dq(user, target, this);
	},
	passbomb: 'pass',
	pass: function (target, room, user) {
		if (!room.passthebomb) return this.sendReply("There is no game of pass the bomb going on in this room.");
		if (room.isMuted(user) || user.locked) return this.errorReply("You cannot use this while unable to speak.");

		room.passthebomb.pass(user, target, this);
	},
	cancel: 'end',
	end: function (target, room, user) {
		if (!room.passthebomb) return this.sendReply("There is no game of pass the bomb going on in this room.");
		if (!user.can('mute', null, room)) return this.sendReply("You must be ranked % or higher in this room to end a game of pass the bomb.");

		room.passthebomb.end(user);
	},
};

exports.commands = {
	ptb: 'passthebomb',
	passthebomb: commands,
	pb: 'passbomb',
	passbomb: commands.pass,
	passthebombhelp: [
		'/passthebomb start [seconds] - Starts a game of pass the bomb in the room. The first round will begin after the mentioned number of seconds (1 minute by default). Requires + or higher to use.',
		'/passthebomb join/leave - Joins/Leaves a game of pass the bomb.',
		'/passthebomb proceed - Forcibly starts the first round of a game. Requires + or higher to use.',
		'/passthebomb dq [user] - Disqualifies a player from a game of pass the bomb. Requires % or higher to use.',
		'/passthebomb pass [user] - Passes the bomb to another player. (NOTE: Spamming this can get you disqualified)',
		'/passthebomb end - Forcibly ends a game of pass the bomb. Requires % or higher to use.',
		'(/ptb is a valid alias for /passthebomb)',
	],
};