'use strict';

const ROUND_DURATION = 8 * 1000; //8 seconds nice

class Ambush {
	constructor(room, seconds) {
		this.players = new Map();
		this.round = 0;
		this.room = room;
		if (this.room.ambushCount) {
			this.room.ambushCount++;
		} else {
			this.room.ambushCount = 1;
		}
		this.timeLeft = Date.now() + seconds * 1000;

		this.room.add('|uhtml|ambush' + this.room.ambushCount + this.round + '|<div style="background-color: #000000 ; border: 12px double #860000 ; color: #DF0101"><h3><img style="transform: scaleX(-1);" src="http://pldh.net/media/pokemon/gen6/xy-animated/491.gif" height="87" width="121" align="left"><font face="arial" size="4"><u><strong>A game of Ambush has created!</strong></u></font><img src="http://pldh.net/media/pokemon/gen6/xy-animated/488.gif" height="87" width="121" align="right"></h3><br><br><br><br><br><center>' +
			'The game will begin in <strong>' + seconds + '</strong> seconds!' +
			'<br><br><button style="border: 4px solid #000 ; background: White ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #DF0101 ; margin: 1px 6px ; padding: 8px 40px" name = "send" value = "/ambush join"><font size="3">Join!</font></button><br><br></center></div>'
		);

		this.timer = setTimeout(() => {
			if (this.players.size < 3) {
				this.room.add('|uhtmlchange|ambush' + this.room.ambushCount + this.round + '|<div class = "infobox"><center>This game of Ambush has been ended due to the lack of players.</center></div>').update();
				return this.end();
			}
			this.nextRound();
		}, seconds * 1000);
	}
	updateJoins() {
		let msg = 'ambush' + this.room.ambushCount + this.round + '|<div style="background-color: #000000; border: 12px double #860000 ; color: #DF0101"><center><h3><img style="transform: scaleX(-1);" src="https://pldh.net/media/pokemon/gen6/xy-animated/491.gif" height="87" width="121" align="left"><font face="arial" size="4"><u><strong>A game of Ambush has been started!</strong></u></font><img src="https://pldh.net/media/pokemon/gen6/xy-animated/488.gif" height="87" width="121" align="right"></h3><br><br><br><br><br><center>' +
			'The game will begin in <strong>' + Math.round((this.timeLeft - Date.now()) / 1000) + '</strong> seconds' +
			'<br><br><button style="border: 4px solid #000 ; background: White ; box-shadow: 0px 1px 1px rgba(255 , 255 , 255 , 0.3) inset ; color: #DF0101 ; margin: 1px 6px ; padding: 8px 40px" name = "send" value = "/ambush join"><font size="3">Join!</font></button><br><br>';
		if (this.players.size > 0) {
			msg += '<center><strong>' + this.players.size + '</strong> ' + (this.players.size === 1 ? 'user has' : 'users have') + ' joined: ' + Array.from(this.players).map(player => Server.nameColor(player[0].name)).join(', ') + '</center>';
		}
		this.room.add('|uhtmlchange|' + msg + '</center></div>');
	}
	join(user, self) {
		if (!user.named) return self.errorReply("You must choose a name before joining a game of Ambush.");
		if (this.players.has(user)) return self.sendReply('You have already joined this game of Ambush.');
		if (this.round > 0) return self.sendReply('You cannot join a game of Ambush after it has started.');

		this.players.set(user, {status:'alive', rounds:0});
		this.updateJoins();
	}
	leave(user, self) {
		if (!this.players.has(user)) return self.sendReply('You haven\'t joined this game of Ambush yet.');

		this.players.delete(user);
		if (!this.round) {
			this.updateJoins();
		} else {
			this.room.add('|html|' + Server.nameColor(user.name, true) + ' has left the game!');
		}
	}
	getSurvivors() {
		return Array.from(this.players).filter(player => player[1].status === 'alive');
	}
	nextRound() {
		clearTimeout(this.timer);
		this.canShoot = false;
		if (this.checkWinner()) return this.getWinner();
		let survivors = this.getSurvivors();
		if (this.lastRoundSurvivors === survivors.length) {
			this.room.add('|html|<div class = "infobox"><center>This game of Ambush has ended due to inactivity, with <strong>' + survivors.length + '</strong> survivors.</center></div>');
			return this.end();
		}
		this.lastRoundSurvivors = survivors.length;

		this.round++;
		this.loadGuns();
		let msg = 'ambush' + this.room.ambushCount + this.round + '|<div style="background-color: #000 ; border: 12px double #860000 ; color: #DF0101"><center><h3><img style="transform: scaleX(-1);" src="http://pldh.net/media/pokemon/gen6/xy-animated/491.gif" height="87" width="121" align="left"><font face="arial" size="4"><u><strong>Round ' + this.round + '</strong></u></font><img src="http://pldh.net/media/pokemon/gen6/xy-animated/488.gif" height="87" width="121" align="right"></h3><br><br><br><br><br><br>' +
			'Players: ' + this.getSurvivors().map(player => Server.nameColor(player[0].name)).join(', ') +
			'<br><br><small>Use /fire [player] to shoot another player!</small>';
		this.room.add('|uhtml|' + msg + '<br><br><i>Wait for it...</i>').update();

		this.release = setTimeout(() => {
			this.room.add('|uhtmlchange|' + msg + '<br><br><strong style = "color:red; font-size: 12pt;">FIRE!</strong><br><br></div></div>').update();
			this.canShoot = true;
			this.resetTimer();
		}, (Math.floor(Math.random() * 12) + 3) * 1000);
	}
	fire(user, target, self) {
		let getUser = this.players.get(user);
		if (!getUser) return self.sendReply("You aren't a player in this game of Ambush.");
		this.madeMove = false;

		if (!this.canShoot) return self.sendReply("You're not allowed to open fire yet!");

		if (getUser.status === 'dead') return self.sendReply("You can't fire after you've been killed!");
		if (!getUser.rounds) return self.sendReply("You're out of rounds! You can't shoot anyone else!");

		let targetUser = Users(target);
		if (!targetUser) return self.sendReply('User ' + target + ' not found.');
		if (!this.players.has(targetUser)) return self.sendReply(targetUser.name + ' is not a player!');
		if (this.players.get(targetUser).status === 'dead') return self.sendReply(targetUser.name + ' has already been shot!');

		this.players.get(user).rounds--;
		this.madeMove = true;
		if (targetUser === user) {
			this.room.add('|html|' + Server.nameColor(user.name, true) + ' shot themself!');
		} else if (!this.players.get(targetUser).rounds) {
			this.room.add('|html|' + Server.nameColor(user.name, true) + ' fired at ' + Server.nameColor(targetUser.name, true) + ', but ' + Server.nameColor(targetUser.name, true) + ' has an active shield!');
			return;
		} else {
			this.room.add('|html|' + Server.nameColor(user.name, true) + ' fired at ' + Server.nameColor(targetUser.name, true) + '!');
		}
		this.players.get(targetUser).status = 'dead';

		if (this.checkWinner()) this.getWinner();
	}
	loadGuns() {
		this.players.forEach((details, user) => {
			if (this.players.get(user).status === 'alive') this.players.get(user).rounds = 1;
		});
	}
	resetTimer() {
		this.timer = setTimeout(() => {
			this.nextRound();
			this.room.update();
		}, ROUND_DURATION);
	}
	dq(target, self) {
		if (!this.round) return self.sendReply('You can only disqualify a player after the first round has begun.');
		let targetUser = Users(target);
		if (!targetUser) return self.sendReply('User ' + target + ' not found.');

		let getUser = this.players.get(targetUser);
		if (!getUser) return self.sendReply(targetUser.name + ' is not a player!');
		if (getUser.status === 'dead') return self.sendReply(targetUser.name + ' has already been killed!');

		this.players.delete(targetUser);
		this.room.add('|html|' + Server.nameColor(targetUser.name, true) + ' has been disqualified from the game.');
		if (this.checkWinner()) this.getWinner();
	}
	checkWinner() {
		if (this.getSurvivors().length === 1) return true;
	}
	getWinner() {
		let winner = this.getSurvivors()[0][0].name;
		let msg = '|html|<div class = "infobox"><center>The winner of this game of Ambush is ' + Server.nameColor(winner, true) + '! Congratulations!</center>';
		if (this.room.isOfficial) {
			msg += '<center>' + Server.nameColor(winner, true) + ' has also won <strong>5</strong> EXP for winning!</center>'.update();
			Server.addExp(winner, this.room, 5);
		} else {
			this.room.add(msg).update();
		}
		this.end();
	}
	end(user) {
		if (user) {
			let msg = '<div class = "infobox"><center>This game of Ambush has been forcibly ended by ' + Server.nameColor(user.name, true) + '.</center></div>';
			if (!this.madeMove) {
				this.room.add('|uhtmlchange|ambush' + this.room.ambushCount + this.round + '|' + msg).update();
			} else {
				this.room.add('|html|' + msg).update();
			}
		}
		if (this.release) clearTimeout(this.release);
		clearTimeout(this.timer);
		delete this.room.ambush;
	}
}

let commands = {
	'': 'new',
	'start': 'new',
	'begin': 'new',
	'new': function (target, room, user) {
		if (room.ambush) return this.sendReply("There is already a game of Ambush going on in this room.");
		if (!this.canTalk()) return this.errorReply("You cannot use this while unable to speak.");
		if (!user.can('broadcast', null, room)) return this.sendReply("You must be ranked + or higher in this room to start a game of Ambush.");

		if (!target || !target.trim()) target = '60';
		if (isNaN(target)) return this.sendReply('\'' + target + '\' is not a valid number.');
		if (target.includes('.') || target > 180 || target < 10) return this.sendReply('The number of seconds needs to be a non-decimal number between 10 and 180.');

		room.ambush = new Ambush(room, Number(target));
	},
	join: function (target, room, user) {
		if (!room.ambush) return this.sendReply("There is no game of Ambush going on in this room.");
		if (!this.canTalk()) return this.errorReply("You cannot use this while unable to speak.");

		room.ambush.join(user, this);
	},
	leave: function (target, room, user) {
		if (!room.ambush) return this.sendReply("There is no game of Ambush going on in this room.");

		room.ambush.leave(user, this);
	},
	proceed: function (target, room, user) {
		if (!room.ambush) return this.sendReply("There is no game of Ambush going on in this room.");
		if (!this.canTalk()) return this.errorReply("You cannot use this while unable to speak.");
		if (!user.can('broadcast', null, room)) return this.sendReply("You must be ranked + or higher in this room to forcibly begin the first round of a game of Ambush.");

		if (room.ambush.round) return this.sendReply('This game of Ambush has already begun!');
		if (room.ambush.players.size < 3) return this.sendReply('There aren\'t enough players yet. Wait for more to join!');
		room.add('(' + user.name + ' forcibly started round 1)');
		room.ambush.nextRound();
	},
	disqualify: 'dq',
	dq: function (target, room, user) {
		if (!room.ambush) return this.sendReply("There is no game of Ambush going on in this room.");
		if (!this.canTalk()) return this.errorReply("You cannot use this while unable to speak.");
		if (!user.can('mute', null, room)) return this.sendReply("You must be ranked % or higher in this room to disqualify a user from a game of Ambush.");

		room.ambush.dq(target, this);
	},
	shoot: 'fire',
	fire: function (target, room, user) {
		if (!room.ambush) return this.sendReply("There is no game of Ambush going on in this room.");
		if (!this.canTalk()) return this.errorReply("You cannot use this while unable to speak.");

		room.ambush.fire(user, target, this);
	},
	cancel: 'end',
	end: function (target, room, user) {
		if (!room.ambush) return this.sendReply("There is no game of Ambush going on in this room.");
		if (!user.can('mute', null, room)) return this.sendReply("You must be ranked % or higher in this room to end a game of Ambush.");

		room.ambush.end(user);
	},
	help: function () {
		this.parse('/help ambush');
	},
};

exports.commands = {
	ambush: commands,
	fire: 'shoot',
	shoot: commands.fire,
	ambushhelp: [
		'/ambush start [seconds] - Starts a game of Ambush in the room. The first round will begin after the mentioned number of seconds (1 minute by default). Requires + or higher to use.',
		'/ambush join/leave - Joins/Leaves a game of Ambush.',
		'/ambush proceed - Forcibly starts the first round of the game. Requires + or higher to use',
		'/ambush dq [user] - Disqualifies a player from a game of Ambush. Requires % or higher to use',
		'/ambush shoot/fire [user] - Shoots another player (you can shoot yourself too)',
		'/ambush end - Forcibly ends a game of Ambush. Requires % or higher to use.',
		'/ambush rules - Displays the rules of the game.',
	],
};
