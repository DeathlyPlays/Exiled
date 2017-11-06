/* * * * * * * * * * * * * * * * * * * *
 * Rock/Paper/Scissors/Lizard/Spock    *
 * by Insist (sparky's RPS as a base)  *
 * * * * * * * * * * * * * * * * * * * */

'use strict';

if (!Rooms.global.RPSLS) {
	Rooms.global.RPSLS = {
		searches: {},
		games: {},
		gameId: 0,
	};
}

let choiceNames = {
	"R": "Rock",
	"P": "Paper",
	"S": "Scissors",
	"L": "Lizard",
	"SP": "Spock",
};

class RPSLSGame extends Rooms.RoomGame {
	constructor(player1, player2, gameType, room) {
		super(room);

		this.gameid = "rpsls";
		this.title = "Rock Paper Scissors Lizard Spock";
		this.p1 = player1;
		this.p2 = player2;
		this.p1choice = null;
		this.p2choice = null;
		Rooms.global.RPSLS.gameId++;
		this.gameId = "RPSLS-" + Rooms.global.RPSLS.gameId;
		this.gameType = gameType;

		// set inactivity timer
		this.timer = setTimeout(function () {
			this.onEnd(true);
		}.bind(this), 60000);
		this.onInit();
	}

	onInit() {
		// set game
		Rooms.global.RPSLS.games[this.gameId] = this;

		//delete searches
		delete Rooms.global.RPSLS.searches[this.p1.userid];
		delete Rooms.global.RPSLS.searches[this.p2.userid];

		//change users
		this.p1.RPSLSgame = this.gameId;
		this.p2.RPSLSgame = this.gameId;

		//send popups
		this.sendGameInformation(this.p1, this.p2);
		this.sendGameInformation(this.p2, this.p1);
	}

	sendGameInformation(player, opponent) {
		let pmPost = "/html <div class=\"broadcast-green\"><center> You have been matched up with <span class=\"username\">" + Chat.escapeHTML(opponent.name) + "</span><br>" +
			"<strong>What is your choice?</strong><br>" +
			'<button name="send" value="/rpsls choose R ' + this.gameId + '">Rock</button>' +
			'<button name="send" value="/rpsls choose P ' + this.gameId + '">Paper</button>' +
			'<button name="send" value="/rpsls choose S ' + this.gameId + '">Scissors</button>' +
			'<button name="send" value="/rpsls choose L ' + this.gameId + '">Lizard</button>' +
			'<button name="send" value="/rpsls choose SP ' + this.gameId + '">Spock</button></center><br><br>' +
			"You have 60 seconds to make your choice.</center></div>";
		player.send("|pm|~RPSLS Host|" + player.userid + "|" + pmPost);
	}

	updateUsers() {
		//get the latest user...
		this.p1 = Users.get(this.p1.userid);
		this.p2 = Users.get(this.p2.userid);
	}

	onChoose(user, choice) {
		this.updateUsers();
		if (user.userid !== this.p1.userid && user.userid !== this.p2.userid) return false;
		let playerChoice = user.userid === this.p1.userid ? "p1choice" : "p2choice";
		if (this[playerChoice]) return user.send("|pm|~RPSLS Host|" + user.userid + "|/html You have already chosen your move!");
		this[playerChoice] = choice;
		user.send("|pm|~RPSLS Host|" + user.userid + "|/html You have chosen: " + choiceNames[choice] + ".");
		if (this.p1choice && this.p2choice) this.onEnd();
	}

	onEnd(inactivity) {
		clearTimeout(this.timer);
		// in the case of inactivity
		if (inactivity) {
			//determine winner
			if (this.p1choice && !this.p2choice) {
				this.p2.send("|pm|~RPSLS Host|" + this.p2.userid + "|/html You have lost due to inactivity.");
				this.parseWin(this.p1, this.p2, true);
			} else if (!this.p1choice && this.p2choice) {
				this.p1.send("|pm|~RPSLS Host|" + this.p1.userid + "|/html You have lost due to inactivity.");
				this.parseWin(this.p2, this.p1, true);
			} else {
				this.p1.send("|pm|~RPSLS Host|" + this.p1.userid + "|/html You have lost due to inactivity.");
				this.p2.send("|pm|~RPSLS Host|" + this.p2.userid + "|/html You have lost due to inactivity.");
			}
			this.p1.RPSLSgame = null;
			this.p2.RPSLSgame = null;
			delete Rooms.global.RPSLS.games[this.gameId];
			return;
		}
		let resultTable = {
			"rr": "pp", //Rock VS Rock (Tie)
			"rp": "p2", //Rock VS Paper (Player 2)
			"rs": "p1", //Rock VS Scissors (Player 1)
			"rsp": "p1", //Rock VS Spock (Player 1)
			"rl": "p1", //Rock VS Lizard (Player 1)
			"pp": "pp", //Paper VS Paper (Tie)
			"pr": "p1", //Paper VS Rock (Player 1)
			"ps": "p2", //Paper VS Scissors (Player 2)
			"psp": "p1", //Paper VS Spock (Player 1)
			"pl": "p2", //Paper VS Lizard (Player 2)
			"ss": "pp", //Scissors VS Scissors (Tie)
			"sp": "p1", //Scissors VS Paper (Player 1)
			"sr": "p2", //Scissors VS Rock (Player 2)
			"ssp": "p2", //Scissors VS Spock (Player 2)
			"sl": "p1", //Scissors VS Lizard (Player 1)
			"spsp": "pp", //Spock VS Spock (Tie)
			"spr": "p1", //Spock VS Rock (Player 1)
			"spp": "p2", //Spock VS Paper (Player 2)
			"sps": "p1", //Spock VS Scissors (Player 1)
			"spl": "p2", //Spock VS Lizard (Player 2)
			"ll": "pp", //Lizard VS Lizard (Tie)
			"lr": "p2", //Lizard VS Rock (Player 2)
			"lp": "p1", //Lizard VS Paper (Player 1)
			"ls": "p2", //Lizard VS Scissors (Player 2)
			"lsp": "p1", //Lizard VS Spock (Player 1)
		};
		let winner, loser;
		let gameResult = resultTable[this.p1choice.toLowerCase() + this.p2choice.toLowerCase()];
		if (gameResult === "pp") {
			//tie
			this.p1.send("|pm|~RPSLS Host|" + this.p1.userid + "|/html The game with " + this.p2.name + " was a tie! " + this.p2.name + " has chosen " + choiceNames[this.p2choice] + ".");
			this.p2.send("|pm|~RPSLS Host|" + this.p2.userid + "|/html The game with " + this.p1.name + " was a tie! " + this.p1.name + " has chosen " + choiceNames[this.p1choice] + ".");
			if (this.gameType === "bucks") {
				//return their 3 bucks each
				Db('money').set(this.p1.userid, Db('money').get(this.p1.userid, 0) + 3);
				Db('money').set(this.p2.userid, Db('money').get(this.p2.userid, 0) + 3);
			}
		} else if (gameResult === "p1") {
			winner = this.p1;
			loser = this.p2;
			this.parseWin(winner, loser);
		} else if (gameResult === "p2") {
			winner = this.p2;
			loser = this.p1;
			this.parseWin(winner, loser);
		}
		//destroy this object
		this.p1.RPSLSgame = null;
		this.p2.RPSLSgame = null;
		delete Rooms.global.RPSLS.games[this.gameId];
	}
	parseWin(winner, loser, inactivity) {
		winner.send("|pm|~RPSLS Host|" + winner.userid + "|/html You have won the game against " + loser.name + "! " + (!inactivity ? loser.name + " has chosen " + choiceNames[(winner.userid === this.p1.userid ? this.p2choice : this.p1choice)] + "." : ""));
		loser.send("|pm|~RPSLS Host|" + loser.userid + "|/html You have lost the game against " + winner.name + "! " + (!inactivity ? winner.name + " has chosen " + choiceNames[(loser.userid === this.p1.userid ? this.p2choice : this.p1choice)] + "." : ""));
		if (this.gameType === "bucks") {
			//set but bucks
			Db('money').set(winner.userid, Db('money').get(winner.userid, 0) + 6);
			winner.send("|pm|~RPSLS Host|" + winner.userid + "|/html You have also won 6 " + moneyPlural + ".");
		} else {
			//do rank change
			let winnerPoints = Db('rpslsrank').get(winner.userid, 1000);
			let loserPoints = Db('rpslsrank').get(loser.userid, 1000);
			let difference = Math.abs(winnerPoints - loserPoints);
			let winnerPointGain, loserPointGain;
			let pointGain = ~~(difference / 4) + 8;
			if (winnerPoints > loserPoints) {
				pointGain = 12;
			}
			winnerPointGain = pointGain;
			loserPointGain = -1 * pointGain;

			//give points to the winner;
			if (winnerPoints < 1050) {
				winnerPointGain = winnerPointGain >= 23 ? winnerPointGain : 23;
			}
			if (winnerPoints < 1125) {
				winnerPointGain *= 2;
			}
			//limit gains
			if (winnerPointGain < 12) winnerPointGain = 12;
			if (winnerPointGain > 75) winnerPointGain = 75;
			let winnerFinalPoints = winnerPoints + winnerPointGain;
			Db('rpslsrank').set(winner.userid, winnerFinalPoints);

			//deduct points from loser
			if (winnerPoints > loserPoints) {
				loserPointGain = Math.ceil(loserPointGain / 2);
			}
			//limit losses
			if (loserPointGain > -6) loserPointGain = -6;
			if (loserPointGain < -50) loserPointGain = -50;
			let loserFinalPoints = loserPoints + loserPointGain;
			//unable to go below 1000;
			if (loserFinalPoints < 1000) loserFinalPoints = 1000;
			Db('rpslsrank').set(loser.userid, loserFinalPoints);

			//announce the change in rank
			winner.send("|pm|~RPSLS Host|" + winner.userid + "|/html " + winner.name + ": " + winnerPoints + " --> " + winnerFinalPoints + "<br>" + loser.name + ": " + loserPoints + " --> " + loserFinalPoints);
			loser.send("|pm|~RPSLS Host|" + loser.userid + "|/html " + winner.name + ": " + winnerPoints + " --> " + winnerFinalPoints + "<br>" + loser.name + ": " + loserPoints + " --> " + loserFinalPoints);
		}
	}
}

function newSearch(user, gameTypeId) {
	for (let search in Rooms.global.RPSLS.searches) {
		if (Rooms.global.RPSLS.searches[search] === gameTypeId) {
			//same ip check
			if (Users.get(search).latestIp === user.latestIp && gameTypeId === "ladder") continue;
			delete Rooms.global.RPSLS.searches[search];
			return new RPSLSGame(user, Users.get(search), gameTypeId);
		}
	}
	//no search found
	Rooms.global.RPSLS.searches[user.userid] = gameTypeId;
	return false;
}

function updateSearches() {
	let updatedSearches = {};
	for (let userid in Rooms.global.RPSLS.searches) {
		let user = Users.get(userid);
		if (user && user.connected) {
			//get user's latest userid
			updatedSearches[user.userid] = Rooms.global.RPSLS.searches[userid];
		} else {
			//return bucks if it's a search for bucks
			if (updatedSearches[user.userid] === "bucks") Db('money').set(userid, Db('money').get(userid, 0) + 3);
		}
	}
	Rooms.global.RPSLS.searches = updatedSearches;
}

exports.commands = {
	rpsls: {
		search: function (target, room, user) {
			if (user.RPSLSgame) return this.errorReply("You are already have a game/searching for a game of Rock/Paper/Scissors/Lizard/Spock!");
			updateSearches();
			let gameType = "ladder";
			if (target && target === "bucks") {
				if (Db('money').get(user.userid, 0) >= 3) {
					gameType = "bucks";
					Db('money').set(user.userid, (Db('money').get(user.userid, 0) - 3));
				} else {
					return this.errorReply("You do not have enough " + moneyPlural + " (3) to search for a game of Rock/Paper/Scissors/Lizard/Spock for " + moneyPlural + ".");
				}
			}
			user.RPSLSgame = "searching";
			newSearch(user, gameType);
			this.sendReply("You are now searching for a game of Rock/Paper/Scissors/Lizard/Spock (" + gameType + ").");
		},

		endsearch: function (target, room, user) {
			if (!user.RPSLSgame || user.RPSLSgame !== "searching") return this.errorReply("You are not searching for a game of Rock/Paper/Scissors/Lizard/Spock!");
			updateSearches();
			if (Rooms.global.RPSLS.searches[user.userid] === "bucks") {
				Db('money').set(user.userid, Db('money').get(user.userid, 0) + 3);
			}
			delete Rooms.global.RPSLS.searches[user.userid];
			user.RPSLSgame = null;
			this.sendReply("You have cancelled your search for a game of Rock/Paper/Scissors/Lizard/Spock.");
		},

		choose: function (target, room, user) {
			if (!target || !user.RPSLSgame) return false;
			let parts = target.split(" ");
			if (parts.length !== 2) return false;
			let choice = parts[0].toUpperCase();
			let gameId = parts[1];
			if (gameId !== user.RPSLSgame) return false;
			if (["R", "P", "S", "L", "SP"].indexOf(choice) === -1) return false;
			if (Rooms.global.RPSLS.games[gameId]) {
				Rooms.global.RPSLS.games[gameId].onChoose(user, choice);
			}
		},

		rank: function (target, room, user) {
			if (!this.runBroadcast()) return false;
			target = (toId(target) ? (Users.get(target) ? Users.get(target).name : target) : user.name);
			let userRank = Db('rpslsrank').get(toId(target), 1000);
			this.sendReplyBox("Rank - <strong>" + target + "</strong>: " + userRank);
		},

		ladder: function (target, room, user) {
			if (!this.runBroadcast()) return false;
			let html = '<center><strong><font size="2">Rock/Paper/Scissors/Lizard/Spock Ladder</font><strong></center><br><div style="max-height: 310px; overflow-y: scroll">';
			let index = 1;
			let table = Object.keys(Db("rpsrank").object()).sort(function (a, b) {
				if (Db('rpslsrank').get(a, 1000) > Db('rpslsrank').get(b, 1000)) return -1;
				return 1;
			}).slice(0, 100).map(function (u) {
				return '<tr><td>&nbsp;' + index++ + '&nbsp;</td><td>&nbsp;' + u + '&nbsp;</td><td>&nbsp;' + Db('rpslsrank').get(u, 1000) + "&nbsp;</td></tr>";
			}).join("");
			if (!table.length) return this.sendReplyBox("The ladder is empty!");
			this.sendReplyBox(html + '<table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Rank</th><th>Username</th><th>RPSLS Ladder Points</th></tr>' + table + "</table></div>");
		},

		"": "help",
		"help": function (target, room, user) {
			this.parse("/help rpsls");
		},
	},
	rpslshelp: [
		"/rpsls search (" + moneyPlural + ") - searches for a game of Rock/Paper/Scissors/Lizard/Spock either for ladder points or for " + moneyPlural + ".",
		"/rpsls endsearch - stop searching for a game of Rock/Paper/Scissors/Lizard/Spock.",
		"/rpsls rank [user] - shows rank for Rock/Paper/Scissors/Lizard/Spock for either a user or yourself.",
		"/rpsls ladder - shows top 100 on the RPSLS ladder.",
	],
};
