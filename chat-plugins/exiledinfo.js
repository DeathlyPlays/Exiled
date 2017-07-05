/*
The following commands were coded specifically for Exiled
Made by Insist
feelscool
Basically just edits to main's info.js, and adds more, removes stuff, etc.
*/
'use strict';

exports.commands = {

	/*********************************************************
	 * Informational commands
	 *********************************************************/

	'!statset': true,
	statset: function () {
		let statHP = Math.floor(Math.random() * 100) + 30;
		let statAtk = Math.floor(Math.random() * 100) + 70;
		let statDef = Math.floor(Math.random() * 100) + 40;
		let statSpa = Math.floor(Math.random() * 100) + 70;
		let statSpd = Math.floor(Math.random() * 100) + 40;
		let statSpe = Math.floor(Math.random() * 100) + 60;
		let statBst = statHP + statAtk + statDef + statSpa + statSpd + statSpe;
		if (!this.runBroadcast()) return;
		this.sendReplyBox('Generated Statset: ' + statHP + ' / ' + statAtk + ' / ' + statDef + ' / ' + statSpa + ' / ' + statSpd + ' / ' + statSpe + ' | BST: ' + statBst);
		if (statBst <= 200) {
			return this.sendReplyBox('Tier: LC');
		} else if (statBst > 200 && statBst < 400) {
			return this.sendReplyBox('Tier: NFE');
		} else if (statBst > 400 && statBst < 500) {
			return this.sendReplyBox('Tier: NU');
		} else if (statBst > 500 && statBst < 600) {
			return this.sendReplyBox('Tier: UU');
		} else if (statBst > 600 && statBst < 680) {
			return this.sendReplyBox('Tier: OU');
		} else if (statBst > 680 && statBst < 800) {
			return this.sendReplyBox('Tier: Ubers');
		} else if (statBst >= 800) {
			return this.sendReplyBox('Tier: AG');
		}
	},
	statsethelp: [
		"/statset - Generates a random spread of stats.",
	],

	'!type': true,
	type: "randtype",
	randtype: function () {
		let gen = Math.floor(Math.random() * 18);
		if (!this.runBroadcast()) return;
		if (gen === 0) {
			return this.sendReplyBox('Generated Type: Fire');
		} else if (gen === 1) {
			return this.sendReplyBox('Generated Type: Water');
		} else if (gen === 2) {
			return this.sendReplyBox('Generated Type: Grass');
		} else if (gen === 3) {
			return this.sendReplyBox('Generated Type: Electric');
		} else if (gen === 4) {
			return this.sendReplyBox('Generated Type: Ground');
		} else if (gen === 5) {
			return this.sendReplyBox('Generated Type: Rock');
		} else if (gen === 6) {
			return this.sendReplyBox('Generated Type: Flying');
		} else if (gen === 7) {
			return this.sendReplyBox('Generated Type: Poison');
		} else if (gen === 8) {
			return this.sendReplyBox('Generated Type: Fighting');
		} else if (gen === 9) {
			return this.sendReplyBox('Generated Type: Ice');
		} else if (gen === 10) {
			return this.sendReplyBox('Generated Type: Bug');
		} else if (gen === 11) {
			return this.sendReplyBox('Generated Type: Dragon');
		} else if (gen === 12) {
			return this.sendReplyBox('Generated Type: Psychic');
		} else if (gen === 13) {
			return this.sendReplyBox('Generated Type: Dark');
		} else if (gen === 14) {
			return this.sendReplyBox('Generated Type: Ghost');
		} else if (gen === 15) {
			return this.sendReplyBox('Generated Type: Steel');
		} else if (gen === 16) {
			return this.sendReplyBox('Generated Type: Fairy');
		} else if (gen === 17) {
			return this.sendReplyBox('Generated Type: Normal');
		}
	},
	typehelp: [
		"/type - Generates a random typing.",
	],

	'!groups': true,
	groups: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(
			"+ <b>Voice</b> - They can use ! commands like !groups, and talk during moderated chat.<br />" +
			"% <b>Driver</b> - The above, and they can mute. Global % can also lock users and check for alts.<br />" +
			"@ <b>Moderator</b> - The above, and they can ban users.<br />" +
			"* <b>Bot</b> - Like Moderator, but makes it clear that this user is a bot.<br />" +
			"&amp; <b>Leader</b> - The above, and they can promote to moderator and force ties.<br />" +
			"# <b>Room Owner</b> - They are leaders of the room and can almost totally control it.<br />" +
			"☥ <b>Gods</b> - The rank of the dankest users ever! They have infinite power, like Administrators.<br />" +
			"~ <b>Administrator</b> - They can do anything, like change what this message says."
		);
	},
	groupshelp: [
		"/groups - Explains what the + % @ # & next to people's names mean.",
		"!groups - Shows everyone that information. Requires: + % @ * # & ~",
	],

	git: "opensource",
	opensource: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox(
			"Exiled's Github's:<br />" +
			"- Language: JavaScript (Node.js)<br />" +
			"- <a href=\"https://github.com/DeathlyPlays/Exiled\">Exiled Server Code</a><br />" +
			"- <a href=\"https://github.com/ExiledPS\">Team Exiled Organization</a><br />"
		);
	},
	opensourcehelp: [
		"/opensource - Links to Exiled's source code repository.",
		"!opensource - Show everyone that information. Requires: + % @ * # & ~",
	],

	'!forums': true,
	forums: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox("<a href=\"http://exiledps.boards.net\">Exiled Forums</a>");
	},

	'!suggestions': true,
	suggestions: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox("<a href=\"http://exiledps.boards.net/board/3/suggestions\">Make a suggestion for Exiled</a>");
	},

	'!fakemon': true,
	fakemons: 'fakemon',
	fakemon: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox("<a href=\"https://goo.gl/forms/ho9YhvxrnXMY2QLI3\">Submit a Fakemon :D</a>");
	},

	'!skype': true,
	skype: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox("<a href=\"https://join.skype.com/Eo5DCq8nCh1j\">The Official Skype Group</a>");
	},

	'!discord': true,
	discord: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox("<a href=\"https://discord.gg/3UWpXwa\">The Official Exiled Discord</a>");
	},

	'!reddit': true,
	reddit: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox("<a href=\"https://www.reddit.com/me/m/exiled_ps/\">The Official Exiled Reddit</a>");
	},

	'!facebook': true,
	facebook: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox("<a href=\"https://www.facebook.com/exiledserver/\">The Official Exiled Facebook Page</a>");
	},

	//Credits to Snaquaza on these feature and other DragonHeaven developers/contributers
	'fakemonlist': 'fakemonslist',
	fakemonslist: function () {
		if (!this.runBroadcast()) return;
		let buf = `<div class=infobox-limited><center><h2>List Of Fakemons</h2></center>`;
		let fakemonsDex = require('../mods/fakemons/pokedex.js').BattlePokedex;
		if (!fakemonsDex) return this.errorReply("Error Fetching Fakemons Data.");
		Object.values(fakemonsDex).forEach(mon => {
			buf += `<button name="send" value="/fakemondata ${mon.species}" style="background:none;border:none;">${mon.species}</button><br>`;
		});
		this.sendReplyBox(`${buf}</div>`);
	},
	fakemonslisthelp: ["/fakemonslist - Shows the list of Fakemons."],

	learnfakemons: function (target) {
		if (!this.runBroadcast()) return;
		let learnfakemons = Dex.mod('fakemons').data.Learnsets, movefakemons = Dex.mod('fakemons').data.Movedex, dexfakemons = Dex.mod('fakemons').data.Pokedex;
		if (!target || toId(target) === '') return this.sendReply("/learnfakemons: Shows the whether a Pokemon can learn a move, including Pokemon and Moves from fakemons.");
		let targets = target.split(','), mon = targets[0], move = targets[1];
		if (!mon || !dexfakemons[toId(mon)]) return this.errorReply("Error: Pokemon not found");
		if (!learnfakemons[toId(mon)]) return this.errorReply("Error: Learnset not found");
		if (!move || !movefakemons[toId(move)]) return this.errorReply("Error: Move not found");
		mon = dexfakemons[toId(mon)];
		move = movefakemons[toId(move)];
		if (learnfakemons[toId(mon.species)].learnset[toId(move.name)]) {
			return this.sendReplyBox("In Fakemons, " + mon.species + ' <font color="green"><u><b>can<b><u></font> learn ' + move.name);
		}
		return this.sendReplyBox("In Fakemons, " + mon.species + ' <font color="red"><u><b>can\'t<b><u></font> learn ' + move.name);
	},

	'!bugs': true,
	bugs: function (room) {
		if (!this.runBroadcast()) return;
		if (room && room.battle) {
			this.sendReplyBox("<center><button name=\"saveReplay\"><i class=\"fa fa-upload\"></i> Save Replay</button> &mdash; <a href=\"https://www.smogon.com/forums/threads/3520646/\">Questions</a> &mdash; <a href=\"https://www.smogon.com/forums/threads/3469932/\">Bug Reports</a></center>");
		} else {
			this.sendReplyBox(
				"Have a replay showcasing a bug on Exiled?<br />" +
				"- <a href=\"http://exiledps.boards.net/thread/5/bug-reports/\">Bug Reports</a>"
			);
		}
	},

	'!roomhelp': true,
	roomhelp: function (room) {
		if (!this.canBroadcast('!htmlbox')) return;
		if (this.broadcastMessage && !this.can('declare', null, room)) return false;

		if (!this.runBroadcast('!htmlbox')) return;
		this.sendReplyBox(
			"<strong>Room drivers (%)</strong> can use:<br />" +
			"- /warn OR /k <em>username</em>: warn a user and show the Pok&eacute;mon Showdown rules<br />" +
			"- /mute OR /m <em>username</em>: 7 minute mute<br />" +
			"- /hourmute OR /hm <em>username</em>: 60 minute mute<br />" +
			"- /unmute <em>username</em>: unmute<br />" +
			"- /announce OR /wall <em>message</em>: make an announcement<br />" +
			"- /modlog <em>username</em>: search the moderator log of the room<br />" +
			"- /modnote <em>note</em>: adds a moderator note that can be read through modlog<br />" +
			"- /kick <em>username</em>: kicks the user out of the chatroom<br />" +
			"<br />" +
			"<strong>Room moderators (@)</strong> can also use:<br />" +
			"- /roomban OR /rb <em>username</em>: bans user from the room<br />" +
			"- /roomunban <em>username</em>: unbans user from the room<br />" +
			"- /roomvoice <em>username</em>: appoint a room voice<br />" +
			"- /roomdevoice <em>username</em>: remove a room voice<br />" +
			"- /staffintro <em>intro</em>: sets the staff introduction that will be displayed for all staff joining the room<br />" +
			"- /roomsettings: change a variety of room settings, namely modchat<br />" +
			"<br />" +
			"<strong>Room leaders (&)</strong> can also use: <br />" +
			"- /roommdriver <em>username</em>: appoints someone to room driver<br />" +
			"- /roommod <em>username</em>: appoints user to room mod<br />" +
			"- /roomdedriver /roomdemod <em>username</em>: removes user room driver/moderator<br />" +
			"<br />" +
			"<strong>Room owners (#)</strong> can also use:<br />" +
			"- /roomintro <em>intro</em>: sets the room introduction that will be displayed for all users joining the room<br />" +
			"- /rules <em>rules link</em>: set the room rules link seen when using /rules<br />" +
			"- /roomdeauth <em>username</em>: remove all room auth from a user<br />" +
			"- /declare <em>message</em>: make a large blue declaration to the room<br />" +
			"- !htmlbox <em>HTML code</em>: broadcasts a box of HTML code to the room<br />" +
			"- !showimage <em>[url], [width], [height]</em>: shows an image to the room<br />" +
			"- /roomsettings: change a variety of room settings, including modchat, capsfilter, etc<br />" +
			"<br />" +
			"More detailed help can be found in the <a href=\"https://www.smogon.com/forums/threads/3570628/#post-6774654\">roomauth guide</a><br />" +
			"<br />" +
			"Tournament Help:<br />" +
			"- /tour create <em>format</em>, elimination: Creates a new single elimination tournament in the current room.<br />" +
			"- /tour create <em>format</em>, roundrobin: Creates a new round robin tournament in the current room.<br />" +
			"- /tour end: Forcibly ends the tournament in the current room<br />" +
			"- /tour start: Starts the tournament in the current room<br />" +
			"<br />" +
			"More detailed help can be found in the <a href=\"https://www.smogon.com/forums/threads/3570628/#post-6777489\">tournaments guide</a><br />" +
			"</div>"
		);
	},

	'!rules': true,
	rule: 'rules',
	rules: function (target, room, user) {
		if (!target) {
			if (!this.runBroadcast()) return;
			this.sendReplyBox("Please follow the rules:<br />" +
				(room && room.rulesLink ? "- <a href=\"" + Chat.escapeHTML(room.rulesLink) + "\">" + Chat.escapeHTML(room.title) + " room rules</a><br />" : "") +
				"- <a href=\"http://exiledps.boards.net/thread/4/exiled-rules\">" + (room && room.rulesLink ? "Global rules" : "Rules") + "</a>");
			return;
		}
		if (!room) {
			this.errorReply("This is not a room you can set the rules of.");
		}
		if (!this.can('editroom', null, room)) return;
		if (target.length > 100) {
			return this.errorReply("Error: Room rules link is too long (must be under 100 characters). You can use a URL shortener to shorten the link.");
		}

		room.rulesLink = target.trim();
		this.privateModCommand(`(${user.name} changed the room rules link to: ${target})`);

		if (room.chatRoomData) {
			room.chatRoomData.rulesLink = room.rulesLink;
			Rooms.global.writeChatRoomData();
		}
	},
	ruleshelp: ["/rules - Show links to room rules and global rules.",
		"!rules - Show everyone links to room rules and global rules. Requires: + % @ * # & ~",
		"/rules [url] - Change the room rules URL. Requires: # & ~"],

	servercredits: 'credits',
	credits: function (target, room, user) {
		let popup = "|html|" + "<font size=5 color=#F7189F><u><b>Exiled Credits:</b></u></font><br />" +
			"<br />" +
			"<u><b>Server Maintainers:</u></b><br />" +
			"- " + Exiled.nameColor('Insist', true) + " (Owner, Sysadmin, Main Developer)<br />" +
			"- " + Exiled.nameColor('Mewth', true) + " (Co-Owner, Sysadmin, Developer)<br />" +
			"<br />" +
			"<u><b>Major Contributors:</b></u><br />" +
			"- " + Exiled.nameColor('AlfaStorm', true) + " (Developer)<br />" +
			"- " + Exiled.nameColor('Back At My Day', true) + " (Developer)<br />" +
			"- " + Exiled.nameColor('flufi', true) + " (Code Breaker, Developer)<br />" +
			"- " + Exiled.nameColor('Gligars', true) + " (Developer)<br />" +
			"<br />" +
			"<u><b>Retired Staff:</b></u><br />" +
			"- " + Exiled.nameColor('Lass Ninetales', true) + " (Former Owner, Developer, CSS Developments)<br />" +
			"- " + Exiled.nameColor('Volco', true) + " (Former Owner, and Developer)<br />" +
			"- " + Exiled.nameColor('Alpha Hawk', true) + " (Former Developer)<br />" +
			"<br />" +
			"<u><b>Special Thanks:</b></u><br />" +
			"- Our Staff Members<br />" +
			"- Our Regular Users<br />";
		user.popup(popup);
	},
};
