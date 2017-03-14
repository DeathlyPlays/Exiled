'use strict';

 let color = require('../config/color');

 /********************
  * Who's that Pokemon?
 ********************/
const cards = require('../config/card-data.js');
const maxMistakes = 6;
 
class Wtp {
 constructor(room, user, mon, hint1, hint2, hint3) {
 	this.room = room;
 	this.creator = user.userid;
		this.mon = mon;
 	this.hint1 = Chat.escapeHTML(hint1);
 	this.hint2 = Chat.escapeHTML(hint2);
 	this.hint3 = Chat.escapeHTML(hint3);
 	this.guesses = [];
 	}
 
 initDisplay() {
 		this.room.addRaw('<div class="wtp"><center><b><font size="3">Who\'s That Pokemon!</b><br /><i>The Game has been started by <b>' + this.creator + '</b>!<br /><b>Hints:</b> <i>' + this.hint1 + ' - ' + this.hint2 + ' - ' + this.hint3 + '</i><br /><b>Use <i>/guessmon [ANSWER]</i> to guess the pokemon!</b></center></div>');
 	}
 
guess(guess, user) {
 		let guessed = toId(guess);
 	if (user.userid === this.creator) return user.sendTo(this.room, "You can't guess in your own wtp game.");
		if (guessed.length > 30 || guessed.length < 1) return user.sendTo(this.room, "You\'re guess is invalid.");
 		for (let i = 0; i < this.guesses.length; i++) {
 			if (guessed === toId(this.guesses[i])) return user.sendTo(this.room, "Your guess has already been tried.");
 		}
 		if (guessed === this.mon) {
 			let display = showCard(this.mon, user.userid);
 			this.endDisplay(display);
 			this.endGame();
 		} else {
 			this.room.addRaw('<h5>' + user + ' guessed <font color="red">' + guessed + '</font> incorrectly.</h5>');
 			this.guesses.push(guessed);
 		}
 	}
 
 endDisplay(display) {
 		this.room.addRaw(display);
 	}
 
 endGame() {
 		delete this.room.wtp;
 	}
 }
 
function checkMon(mon) {
 	let cardName = toId(mon);
 	if (!cards.hasOwnProperty(cardName)) return false;
 	return true;
 }
 
function showCard(card, winner) {
 	let image = cards[toId(card)];
 	let display = '<div class="card-div card-td" style="box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);"><img src="' + image.card + '" height="220" title="' + image.name + '" align="right">' +
 		'<span class="card-name" style="border-bottom-right-radius: 2px; border-bottom-left-radius: 2px; background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9);  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset, 0px 0px 2px rgba(0, 0, 0, 0.2);">' + image.title + '</span>' +
 		'<br /><br /><font color="blue">Was the correct answer!</font>' +
 		'<br /><br /><font color="#AAA"><i>Winner:</i></font>' + winner +
 		'<br clear="all">';
 	return display;
 }

 
exports.commands = {
 	wtp: 'whosthatpokemon',
 	whosthatpokemon: function(target, room, user) {
 		if (!this.can('ban', null, room)) return false;
		let params = target.split(',');
 		if (params.length < 3) return this.errorReply("Must have one mon and a 3 hints");
 		let mon;
 		if (room.wtp) return this.errorReply("Already a game of wtp in progess.");
		if (checkMon(params[0])) {
 			mon = toId(params[0]);
 		} else {
			return this.errorReply("Pokemon not found.");
 		}
 		let hint1 = params[1];
 		let hint2 = params[2];
 		let hint3 = params[3];
 		room.wtp = new Wtp(room, user, mon, hint1, hint2, hint3);
 		room.wtp.initDisplay();
 	},
 
 	guessmon: function(target, room, user) {
 		if (!target) return this.parse('/help guess');
 		if (!room.wtp) return this.errorReply("There is no game of wtp in progress.");
 		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");
 		let guessedmon = toId(target);
 		room.wtp.guess(guessedmon, user);
 	},
 
 	wtpend: function(target, room, user) {
 		if (!this.can('ban', null, room)) return false;
		if (!room.wtp) return this.errorReply("There is no game of wtp in progress.");
 		room.addRaw('<h4>The game of Who\'s that Pokemon was ended early. The pokemon was <font color="red">' + room.wtp.mon + '.</font></h4>');
 		room.wtp.endGame();
 	},
 };
