'use strict';
/********************
 * User Commands
 * This is where miscellaneous commands that any user can use go
 ********************/
const color = require('../config/color');
const Pokedex = require('../data/pokedex.js').BattlePokedex;
let messages = [
	"has vanished into nothingness!",
	"used Explosion!",
	"fell into the void.",
	"went into a cave without a repel!",
	"has left the building.",
	"was forced to give StevoDuhHero's mom an oil massage!",
	"was hit by Magikarp's Revenge!",
	"ate a bomb!",
	"is blasting off again!",
	"(Quit: oh god how did this get here i am not good with computer)",
	"was unfortunate and didn't get a cool message.",
	"{{user}}'s mama accidently kicked {{user}} from the server!",
];

function font(color, text) {
	return '<font color="' + color + '">' + text + '</font>';
}

function bold(text) {
	return '<b>' + text + '</b>';
}

exports.commands = {
	chatcolour: 'chatcolor',
	chatcolor: function (target, room, user) {
		let group = user.getIdentity().charAt(0);
		if (room.auth) group = room.auth[user.userid] || group;
		if (user.hiding) group = ' ';
		let targets = target.split(',');
		if (targets.length < 2) return this.parse('/help chatcolor');
		if (!this.can('vip') || !this.canBroadcast()) return;
		if (!this.canTalk()) return this.errorReply("You may not use this command while unable to speak.");
		this.add('|raw|' + "<small>" + group + "</small>" + "<button name='parseCommand' value='/user " + user.name + "' style='background: none ; border: 0 ; padding: 0 5px 0 0 ; font-family: &quot;verdana&quot; , &quot;helvetica&quot; , &quot;arial&quot; , sans-serif ; font-size: 9pt ; cursor: pointer'><font color='" + user.name + "'>" + bold(font(color(user), user.name + ":</font></button>" + '<b><font color="' + targets[0].toLowerCase().replace(/[^#a-z0-9]+/g, '') + '">' + Chat.escapeHTML(targets.slice(1).join(",")) + '</font></b>')));
	},
	chatcolorhelp: ["/chatcolor OR /chatcolour [colour], [message] - Outputs a message in a custom colour. Requires VIP."],

	/* eslint-enable */
	helixfossil: 'm8b',
	helix: 'm8b',
	magic8ball: 'm8b',
	m8b: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let results = ['Signs point to yes.', 'Yes.', 'Reply hazy, try again.', 'Without a doubt.', 'My sources say no.', 'As I see it, yes.', 'You may rely on it.', 'Concentrate and ask again.', 'Outlook not so good.', 'It is decidedly so.', 'Better not tell you now.', 'Very doubtful.', 'Yes - definitely.', 'It is certain.', 'Cannot predict now.', 'Most likely.', 'Ask again later.', 'My reply is no.', 'Outlook good.', 'Don\'t count on it.'];
		return this.sendReplyBox(results[Math.floor(20 * Math.random())]);
	},
	/* eslint-enable */
	thefourthreplica: 'tfr',
	tfr: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let results = ['Here\'s some bright powder!', 'I sense a shiny in the near future, just keep trying!', 'If you\'re hungry, just eat some of your breedjects :D', 'BRIGHT POWDER!', 'Good luck!', '#ItsBreedingTime', '/pick is rigged!'];
		return this.sendReplyBox(results[Math.floor(7 * Math.random())]);
	},
	d: 'poof',
	cpoof: 'poof',
	poof: function (target, room, user) {
		if (Config.poofOff) return this.sendReply("Poof is currently disabled.");
		if (target && !this.can('broadcast')) return false;
		if (room.id !== 'lobby') return false;
		let message = target || messages[Math.floor(Math.random() * messages.length)];
		if (message.indexOf('{{user}}') < 0) message = '{{user}} ' + message;
		message = message.replace(/{{user}}/g, user.name);
		if (!this.canTalk(message)) return false;

		let colour = '#' + [1, 1, 1].map(function () {
			let part = Math.floor(Math.random() * 0xaa);
			return (part < 0x10 ? '0' : '') + part.toString(16);
		}).join('');

		room.addRaw("<strong><font color=\"" + colour + "\">~~ " + Chat.escapeHTML(message) + " ~~</font></strong>");
		user.disconnectAll();
	},
	poofhelp: ["/poof - Disconnects the user and leaves a message in the room."],

	randp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let shinyPoke = "";
		let x;
		if (/shiny/i.test(target)) shinyPoke = "-shiny";
		if (/kanto/i.test(target) || /gen 1/i.test(target)) {
			x = Math.floor(Math.random() * (174 - 1));
		} else if (/johto/i.test(target) || /gen 2/i.test(target)) {
			x = Math.floor(Math.random() * (281 - 173)) + 172;
		} else if (/hoenn/i.test(target) || /gen 3/i.test(target)) {
			x = Math.floor(Math.random() * (444 - 280)) + 279;
		} else if (/sinnoh/i.test(target) || /gen 4/i.test(target)) {
			x = Math.floor(Math.random() * (584 - 443)) + 442;
		} else if (/kalos/i.test(target) || /gen 5/i.test(target)) {
			x = Math.floor(Math.random() * (755 - 583)) + 582;
		} else if (/unova/i.test(target) || /gen 6/i.test(target)) {
			x = Math.floor(Math.random() * (834 - 752)) + 751;
		}
		x = x || Math.floor(Math.random() * (856 - 1));
		let tarPoke = Object.keys(Pokedex)[x];
		let pokeData = Pokedex[tarPoke];
		let pokeId = pokeData.species.toLowerCase();
		pokeId = pokeId.replace(/^basculinbluestriped$/i, "basculin-bluestriped").replace(/^pichuspikyeared$/i, "pichu-spikyeared").replace(/^floetteeternalflower$/i, "floette-eternalflower");
		if (pokeId === "pikachu-cosplay") pokeId = ["pikachu-belle", "pikachu-phd", "pikachu-libre", "pikachu-popstar", "pikachu-rockstar"][~~(Math.random() * 6)];
		let spriteLocation = "http://play.pokemonshowdown.com/sprites/bw" + shinyPoke + "/" + pokeId + ".png";
		let missingnoSprites = ["http://cdn.bulbagarden.net/upload/9/98/Missingno_RB.png", "http://cdn.bulbagarden.net/upload/0/03/Missingno_Y.png", "http://cdn.bulbagarden.net/upload/a/aa/Spr_1b_141_f.png", "http://cdn.bulbagarden.net/upload/b/bb/Spr_1b_142_f.png", "http://cdn.bulbagarden.net/upload/9/9e/Ghost_I.png"];
		if (pokeId === "missingno") spriteLocation = missingnoSprites[~~(Math.random() * 5)];

		function getTypeFormatting(types) {
			let text = [];
			for (let i = 0; i < types.length; i++) {
				text.push("<img src=\"http://play.pokemonshowdown.com/sprites/types/" + types[i] + ".png\" width=\"32\" height=\"14\">");
			}
			return text.join(" / ");
		}
		this.sendReplyBox("<table><tr><td><img src=\"" + spriteLocation + "\" height=\"96\" width=\"96\"></td><td><b>Name: </b>" + pokeData.species + "<br/><b>Type(s): </b>" + getTypeFormatting(pokeData.types) + "<br/><b>" + (Object.values(pokeData.abilities).length > 1 ? "Abilities" : "Ability") + ": </b>" + Object.values(pokeData.abilities).join(" / ") + "<br/><b>Stats: </b>" + Object.values(pokeData.baseStats).join(" / ") + "<br/><b>Colour: </b><font color=\"" + pokeData.color + "\">" + pokeData.color + "</font><br/><b>Egg Group(s): </b>" + pokeData.eggGroups.join(", ") + "</td></tr></table>");
	},
	serverhelp: function (target, room, user, connection) {
		if (!this.runBroadcast()) return;
		if (user.isStaff) {
			connection.sendTo(room.id, '|raw|<div class="infobox"><center><b><u>List of <i>staff</i> commands:</u></b></center><br /><b>/clearall</b> - Clear all messages in the room.<br /><b>/endpoll</b> - End the poll in the room.<br /><b>/givemoney</b> <i>name</i>, <i>amount</i> - Give a user a certain amount of money.<br /><b>/hide</b> - Hide your staff symbol.<br /><b>/pmall</b> <i>message</i> - Private message all users in the server.<br /><b>/pmstaff</b> <i>message</i> - Private message all staff.<br /><b>/poll</b> <i>question</i>, <i>option 1</i>, <i>option 2</i>... - Create a poll where users can vote on an option.<br /><b>/reload</b> - Reload commands.<br /><b>/reloadfile</b> <i>file directory</i> - Reload a certain file.<br /><b>/resetmoney</b> <i>name</i> - Reset the user\'s money to 0.<br /><b>/rmall</b> <i>message</i> - Private message all users in the room.<br /><b>/show</b> - Show your staff symbol.<br /><b>/strawpoll</b> <i>question</i>, <i>option 1</i>, <i>option 2</i>... - Create a strawpoll, declares the link to all rooms and pm all users in the server.<br /><b>/toggleemoticons</b> - Toggle emoticons on or off.<br /><b>/takemoney</b> <i>user</i>, <i>amount</i> - Take a certain amount of money from a user.<br /><b>/trainercard</b> <i>help</i> - Makes adding trainer cards EZ.<br /></div>');
		}
		if (!target || target === '1') {
			return this.sendReplyBox(
				"<center><b><u>List of commands (1/3):</u></b></center><br />" +
				"<b>/away</b> - Set yourself away.<br />" +
				"<b>/back</b> - Set yourself back from away.<br />" +
				"<b>/buy</b> <i>command</i> - Buys an item from the shop.<br />" +
				"<b>/customsymbol</b> <i>symbol</i> - Get a custom symbol.<br />" +
				"<b>/define</b> <i>word</i> - Shows the definition of a word.<br />" +
				"<b>/emotes</b> - Get a list of emoticons.<br />" +
				"<br />Use /cmds <i>number (1-3)</i> to see more commands."
			);
		}
		if (target === '2') {
			return this.sendReplyBox(
				"<center><b><u>List of commands (2/3):</u></b></center><br />" +
				"<b>/hangman</b> help - Help on hangman specific commands.<br />" +
				"<b>/poof</b> - Disconnects the user and leaves a message in the room.<br />" +
				"<b>/profile</b> - Shows information regarding user\'s name, group, money, and when they were last seen.<br />" +
				"<b>/regdate</b> <i>user</i> - Gets registration date of the user.<br />" +
				"<br />Use /cmds <i>number (1-3)</i> to see more commands."
			);
		}
		if (target === '3') {
			return this.sendReplyBox(
				"<center><b><u>List of commands (3/3):</u></b></center><br />" +
				"<b>/resetsymbol</b> - Reset custom symbol if you have one.<br />" +
				"<b>/richestusers</b> - Show the richest users.<br />" +
				"<b>/seen</b> <i>username</i> - Shows when the user last connected on the server.<br />" +
				"<b>/sell</b> <i>id</i> - Sells a card in the marketplace. Hover over your card to get the id.<br />" +
				"<b>/shop</b> - Displays the server\'s main shop.<br />" +
				"<b>/stafflist</b> - Shows the staff.<br />" +
				"<b>/tell</b> <i>username</i>, <i>message</i> - Send a message to an offline user that will be received when they log in.<br />" +
				"<b>/transfer</b> <i>user</i>, <i>amount</i> - Transfer a certain amount of money to a user.<br />" +
				"<b>/urbandefine</b> <i>word</i> - Shows the urban definition of the word.<br />" +
				"<b>/wallet</b> <i>user</i> - Displays how much money a user has. Parameter is optional.<br />" +
				"<br />Use /cmds <i>number (1-3)</i> to see more commands."
			);
		}
	},

	clobbyannounce: 'changeannounce',
	cannounce: 'changeannounce',
	changeannounce: function (target, room, user) {
		if (room.id !== "lobby") return false;
		if (!target) return false;
		if (!this.can('declare', null, room)) return false;
		this.parse('/roomintro ' + room.introMessage.split('<u>Announcements</u>: ')[0] + '<u>Announcements</u>: ' + target + ('</marquee></div>'));
	},

	fcadd: 'friendcodeadd',
	friendcodeadd: function (target, room, user) {
		if (!target) return this.errorReply("Invalid command. Valid commands are `/friendcodeadd code` and `/friendcoderemove`.");
		let fc = Chat.escapeHTML(target.trim());
		let reg = /^\d{4}-\d{4}-\d{4}$/;
		if (!reg.test(fc)) return this.errorReply("Invalid friend code, example: 3110-7818-5106");
		Db('FriencodeDB').set(toId(user), fc);
		this.sendReply("Friendcode set.");
	},

	fcrmv: 'friendcoderemove',
	fcdelete: 'friendcoderemove',
	friendcoderemove: function (target, room, user) {
		if (!Db('FriencodeDB').has(toId(user))) return this.errorReply("You do not have a friendcode.");
		Db('FriencodeDB').delete(toId(user));
		this.sendReply("Friendcode removed.");
	},

	dimg: 'displayimage',
	displayimg: 'displayimage',
	displayimage: function (target, room, user) {
		let imgdisplay = '<div style="background: rgba(200, 200, 200, 0.7); padding: 15px 10px; box-shadow: 2px 2px 1px rgba(255, 255, 255, 0.5) inset, -1px -1px 1px rgba(0, 0, 0, 0.3) inset; border: 1px solid #666; border-radius: 6px;"><center><font color="' + color(user.userid) + '"><b>' + user.name + '</b></font> - <a href="' + target + '">' + target + '</a></center><br /><center><img src="' + target + '" /></center></div>';
		if (!room.isPrivate) {
			if (!this.can('declare')) return this.errorReply("/displayimage [link] - Can only be used by roommods or higher, except in private rooms.");
			if (!target) return this.sendReply('Usage: /displayimage [link]');
			this.add('|raw|' + imgdisplay);
		} else {
			if (!this.runBroadcast()) return;
			if (!target) return this.sendReply('Usage: /displayimage [link]');
			this.add('|raw|' + imgdisplay);
		}
	},
};
