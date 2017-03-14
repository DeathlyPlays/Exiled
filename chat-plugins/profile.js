'use strict';
/*eslint no-restricted-modules: [0]*/

let color = require('../config/color');
let moment = require('moment');

let BR = '<br>';
let SPACE = '&nbsp;';
let profileColor = '#DF0101';
let trainersprites = [1, 2, 101, 102, 169, 170, 265, 266, 168];
let turfwars = require('../chat-plugins/gangs');

let geoip = {};

try {
	geoip = require('geoip-ultralight');
	geoip.startWatchingDataUpdate();
}
catch (e) {
	console.error(e);
}

let serverIp = '158.69.196.64';

/**
 * Profile constructor.
 *
 * @param {Boolean} isOnline
 * @param {Object|String} user - if isOnline then Object else String
 * @param {String} image
 */
function Profile(isOnline, user, image) {
	this.isOnline = isOnline || false;
	this.user = user || null;
	this.image = image;

	this.username = Chat.escapeHTML(this.isOnline ? this.user.name : this.user);
	this.url = Config.avatarurl || '';
}

/**
 * Create an bold html tag element.
 *
 * Example:
 * createFont('Hello World!');
 * => '<b>Hello World!</b>'
 *
 * @param {String} color
 * @param {String} text
 * @return {String}
 */
function bold(text) {
	return '<b>' + text + '</b>';
}

/**
 * Create an font html tag element.
 *
 * Example:
 * createFont('Hello World!', 'blue');
 * => '<font color="blue">Hello World!</font>'
 *
 * @param {String} color
 * @param {String} text
 * @return {String}
 */
function font(color, text) {
	return '<font color="' + color + '">' + text + '</font>';
}

/**
 * Create an img tag element.
 *
 * Example:
 * createImg('phil.png');
 * => '<img src="phil.png" height="80" width="80" align="left">'
 *
 * @param {String} link
 * @return {String}
 */
function img(link) {
	return '<img src="' + link + '" height="85.5" width="80">';
}

/**
 * Create a font html element wrap around by a bold html element.
 * Uses to `profileColor` as a color.
 * Adds a colon at the end of the text and a SPACE at the end of the element.
 *
 * Example:
 * label('Name');
 * => '<b><font color="#24678d">Name:</font></b> '
 *
 * @param {String} text
 * @return {String}
 */
function label(text) {
	return bold(font(profileColor, text + ':')) + SPACE;
}

function caps(text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

function currencyName(amount) {
	let name = " buck";
	return amount === 1 ? name : name + "s";
}

Profile.prototype.avatar = function () {
	if (this.isOnline) {
		if (typeof this.image === 'string') return img('https://exiled-server-returningavenger.c9users.io/avatars/' + this.image);
		return img('http://play.pokemonshowdown.com/sprites/trainers/' + this.image + '.png');
	}
	for (let name in Config.customAvatars) {
		if (this.username === name) {
			console.log(Config.customAvatars[name]);
			return img('http://exiled-server-returning.c9users.io/avatars/' + Config.customAvatars[name]);
		}
	}
	let selectedSprite = trainersprites[Math.floor(Math.random() * trainersprites.length)];
	return img('http://play.pokemonshowdown.com/sprites/trainers/' + selectedSprite + '.png');
};
Profile.prototype.buttonAvatar = function () {
	let css = 'border:none;background:none;padding:0;float:left;';
	return '<button style="' + css + '" name="parseCommand" value="/user ' + this.username + '">' + this.avatar() + "</button>";
};

Profile.prototype.group = function () {
	if (this.isOnline && this.user.group === ' ') return label('Group') + 'Regular User';
	if (this.isOnline) return label('Group') + Config.groups[this.user.group].name;
	for (let name in Users.usergroups) {
		if (toId(this.username) === name) {
			return label('Group') + Config.groups[Users.usergroups[name].charAt(0)].name;
		}
	}
	return label('Group') + 'Regular User';
};

Profile.prototype.money = function (amount) {

	return label('Money') + amount + currencyName(amount);
};

Profile.prototype.pet = function (userid) {
	let petcss = 'float:right;border:none;background:none;';
	let first = Db('pets').get([userid, 'one']);
	let second = Db('pets').get([userid, 'two'])
	if (!Db('pets').has(userid)) return '';

	function petize(link) {
		return '<button id="" name="send" value="" style="background:transparent;border:none;"><img src=http://play.pokemonshowdown.com/sprites/xyani/' + link + '.gif></button>';
	}

	let petBackground = '<center><div style="' + petcss + '">';

	if (Db('pets').has([userid, 'one'])) {
		petBackground += petize(first);
	}
	if (Db('pets').has([userid, 'two'])) {
		petBackground += petize(second);
	}
	petBackground += '</div></center>';
	return petBackground;
};

Profile.prototype.team = function (person) {

	let teamcss = 'float:center;border:none;background:none;';

	let noSprite = '<img src=http://play.pokemonshowdown.com/sprites/bwicons/0.png>';
	let one = Db('teams').get([person, 'one']);
	let two = Db('teams').get([person, 'two']);
	let three = Db('teams').get([person, 'three']);
	let four = Db('teams').get([person, 'four']);
	let five = Db('teams').get([person, 'five']);
	let six = Db('teams').get([person, 'six']);
	if (!Db('teams').has(person)) return '<div style="' + teamcss + '" >' + noSprite + noSprite + noSprite + noSprite + noSprite + noSprite + '</div>';

	function iconize(link) {
		return '<button id="kek" name="send" value="/dt ' + link + '" style="background:transparent;border:none;"><img src="http://www.serebii.net/pokedex-sm/icon/' + link + '.png"></button>';
	}
	//return '<div style="' + teamcss + '">' + '<br>' + iconize(one) + iconize(two) + iconize(three) + '<br>' + iconize(four) + iconize(five) + iconize(six) + '</div>';*/
	let teamDisplay = '<center><div style="' + teamcss + '">';
	if (Db('teams').has([person, 'one'])) {
		teamDisplay += iconize(one);
	}
	else {
		teamDisplay += noSprite;
	}
	if (Db('teams').has([person, 'two'])) {
		teamDisplay += iconize(two);
	}
	else {
		teamDisplay += noSprite;
	}
	if (Db('teams').has([person, 'three'])) {
		teamDisplay += iconize(three);
	}
	else {
		teamDisplay += noSprite;
	}
	if (Db('teams').has([person, 'four'])) {
		teamDisplay += iconize(four);
	}
	else {
		teamDisplay += noSprite;
	}
	if (Db('teams').has([person, 'five'])) {
		teamDisplay += iconize(five);
	}
	else {
		teamDisplay += noSprite;
	}
	if (Db('teams').has([person, 'six'])) {
		teamDisplay += iconize(six);
	}
	else {
		teamDisplay += noSprite;
	}

	teamDisplay += '</div></center>';
	return teamDisplay;
};

Profile.prototype.pgo = function (kiddo) {
	let team = Db('pgo').get(kiddo);
	if (!Db('pgo').has(kiddo)) return label('Pokemon Go Team') + 'Not Set.';
	if (team === 'instinct') {
		team = '<font color="#cccc00"><b><i>Instinct</i></b></font>';
	}
	if (team === 'mystic') {
		team = '<font color="#3366cc"><b><i>Mystic</i></b></font>';
	}
	if (team === 'valor') {
		team = '<font color="#800000"><b><i>Valor</i></b></font>';
	}
	if (team === 'harmony') {
		team = '<font color="#cc00ff"><b><i>Harmony</i></b></font>';
	}
	if (team === 'none') {
		team = '<font color="#000000"><b><i>None</i></b></font>';
	}
	return label('Pokemon Go Team') + team;
};

Profile.prototype.type = function (kiddo) {
	let type = Db('type').get(kiddo);
	if (!Db('type').has(kiddo)) return label('Type') + 'Not Set.';
	if (type === 'Grass') {
		type = '<font color="#008000"><b><i>Grass</i></b></font>';
	}
	if (type === 'Poison') {
		type = '<font color="#800080"><b><i>Poison</i></b></font>';
	}
	if (type === 'Fire') {
		type = '<font color="#ff0000"><b><i>Fire</i></b></font>';
	}
	if (type === 'Water') {
		type = '<font color="#0000cd"><b><i>Water</i></b></font>';
	}
	if (type === 'Electric') {
		type = '<font color="#ffff00"><b><i>Electric</i></b></font>';
	}
	if (type === 'Psychic') {
		type = '<font color="#da70d6"><b><i>Psychic</i></b></font>';
	}
	if (type === 'Normal') {
		type = '<font color="#ffffff"><b><i>Normal</i></b></font>';
	}
	if (type === 'Ground') {
		type = '<font color="#ff8c00"><b><i>Ground</i></b></font>';
	}
	if (type === 'Ice') {
		type = '<font color="#87cefa"><b><i>Ice</i></b></font>';
	}
	if (type === 'Rock') {
		type = '<font color="#ao552d"><b><i>Rock</i></b></font>';
	}
	if (type === 'Dragon') {
		type = '<font color="#4b0082"><b><i>Dragon</i></b></font>';
	}
	if (type === 'Bug') {
		type = '<font color="#adff2f"><b><i>Bug</i></b></font>';
	}
	if (type === 'Dark') {
		type = '<font color="#8b4513"><b><i>Dark</i></b></font>';
	}
	if (type === 'Fighting') {
		type = '<font color="#800000"><b><i>Fighting</i></b></font>';
	}
	if (type === 'Flying') {
		type = '<font color="#87ceeb"><b><i>Flying</i></b></font>';
	}
	if (type === 'Ghost') {
		type = '<font color="#8a2be2"><b><i>Ghost</i></b></font>';
	}
	if (type === 'Steel') {
		type = '<font color="#c0c0c0"><b><i>Steel</i></b></font>';
	}
	if (type === 'Fairy') {
		type = '<font color="#ff69b4"><b><i>Fairy</i></b></font>';
	}
	return label('Type') + type;
};

Profile.prototype.name = function () {
	let colorz = Db('customcolors').get(this.username);

	function getFlag() {
		if (!this.isOnline) return false;
		if (this.isOnline) {
			let geo = geoip.lookupCountry(this.user.latestIp);
			if (!geo) {
				return false;
			}
			else {
				return ' <img src="https://github.com/kevogod/cachechu/blob/master/flags/' + geo.toLowerCase() + '.png?raw=true" height=10 title="' + geo + '">';
			}
		}
	}
	if (Db('customcolors').has(this.username)) {
		if (!getFlag.call(this)) return label('Name') + bold(font(colorz, this.username), this.username);
		if (getFlag.call(this)) return label('Name') + bold(font(color(toId(this.username)), this.username)) + ' ' + getFlag.call(this);
	}
	else {
		if (!getFlag.call(this)) return label('Name') + bold(font(color(toId(this.username)), this.username));
		if (getFlag.call(this)) return label('Name') + bold(font(color(toId(this.username)), this.username)) + ' ' + getFlag.call(this);
	}
};

Profile.prototype.seen = function (timeAgo) {
	if (this.isOnline) return label('Last Seen') + '<font style="color:#2ECC40;"><b>Currently Online</b></font>';
	if (!timeAgo) return label('Last Seen') + 'Never';
	return label('Last Seen') + moment(timeAgo).fromNow();
};

Profile.prototype.dev = function (person) {
	if (!Db('devs').has(person)) return '';
	if (person === 'insist') return '<font color="#ba44cc"><b>(Owner and YouTuber)</b></font> <font color="#ba44cc"><b>(Developer)</b></font>';
	return '<font color="#000000"><b>(Developer)</b></font>';
};

Profile.prototype.title = function (person) {
	let title = Db('titles').get(person);
	if (!Db('titles').has(person)) return '';
	return SPACE + title;
};

Profile.prototype.quote = function (person) {
	let quote = Db('quotes').get(person);
	if (!Db('quotes').has(person)) return label('Quote') + 'This user does not have a quote set.';
	return label('Quote') + '<b><i>"' + quote + '"</i></b>';
};

Profile.prototype.nature = function (kiddo) {
	let nature = Db('nature').get(kiddo);
	if (!Db('nature').has(kiddo)) return label('Nature') + 'Not Set.';
	return label('Nature') + '<font color="#ffffff">' + '<b><i>' + nature + '</i></b></font>';
};

Profile.prototype.pokemon = function (kiddo) {
	let pkmn = Db('pokemon').get(kiddo);
	if (!Db('pokemon').has(kiddo)) return label('Favorite Pokemon') + 'Not Set.';
	return label('Favorite Pokemon') + '<b><i>' + pkmn + '</i></b>';
}

Profile.prototype.aboutme = function (person) {
	let aboutme = Db('aboutme').get(person);
	if (!Db('aboutme').has(person)) return label('About Me') + 'This user does not have a bio set.';
	return label('About Me') + '<b><i>"' + aboutme + '"</i></b>';
};

Profile.prototype.setfriendcode = function (person) {
	let setfriendcode = Db('friendcode').get(person);
	if (!Db('friendcode').has(person)) return label('Friend Code') + 'This user does not have a friend code set.';
	return label('Friend Code') + '<b><i>"' + setfriendcode + '"</i></b>';
};

Profile.prototype.background = function (buddy) {
	let bg = Db('backgrounds').get(buddy);
	if (!Db('backgrounds').has(buddy)) return '<div>';
	return '<div style="background:url(' + bg + ')">';
};

Profile.prototype.song = function (fren) {
	let song = Db('music').get([fren, 'link']);
	let title = Db('music').get([fren, 'title'])
	if (!Db('music').has(fren)) return '';
	return '<acronym title="' + title + '"><br><audio src="' + song + '" controls="" style="width:100%;"></audio></acronym>';
};

Profile.prototype.gang = function () {
	let gang = Db('gangs').get(this.user.userid, '');
	let gangrank = caps(Db('gangranks').get(this.user.userid, ''));
	let gangsymbol = '';
	if (gang !== '') gangsymbol = '<img src= ' + turfwars.gangs[gang].icon + ' width="10" height="10"</img>';
	gang = caps(gang);
	if (gangrank !== '') gangrank = ' (<font color=#00F><b>' + gangrank + '</b></font>)';
	if (gang) return label('Gang') + gang + SPACE + gangsymbol + gangrank + BR + SPACE;
	return '';
};

Profile.prototype.badges = function (pal) {
	let badgecss = ';border:none;background:none;';
	let badges = Db('badges').get(pal);
	if (!Db('badges').has(pal) && Db('music').has(pal)) return '<br>';
	let badgeDisplay = '<br><br><div style="' + badgecss + '"><center>';
	if (!Db('badges').has(pal)) return '';
	for (let i = 0; i < badges.length; i++) {
		let img = Db('badgelist').get([badges[i], 'img']);
		let desc = Db('badgelist').get([badges[i], 'desc']);
		let id = Db('badgelist').get([badges[i], 'name'])
		badgeDisplay += '<button name="send" style="background:transparent;border:none;" value="/badge info, ' + id + '"><img src="' + img + '" title="' + id + ' : ' + desc + '"></button>';
	}
	badgeDisplay += '</center></div>';
	return badgeDisplay;
};

Profile.prototype.show = function (callback) {
	let userid = toId(this.username);

	return this.background(userid) + this.buttonAvatar() +
		SPACE + this.name() + this.title(userid) + BR +
		SPACE + this.group() + SPACE + this.dev(userid) + BR +
		SPACE + this.money(Db('money').get(userid, 0)) + BR +
		SPACE + this.seen(Db('seen').get(userid)) + BR +
		SPACE + this.pgo(userid) + BR +
		SPACE + this.nature(userid) + BR +
		SPACE + this.type(userid) + BR +
		SPACE + this.pokemon(userid) + BR +
		this.pet(userid) +
		this.gang() +
		SPACE + this.badges(userid) + this.team(userid) +
		this.song(userid) +

		'<br clear="all"></div>';
};

function hasUpperCase(msg) {
	return (/[A-Z]/.test(msg));
}

exports.commands = {
	profile: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (target.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");
		let targetUser = this.targetUserOrSelf(target);
		if (targetUser === 'constructor') return this.errorReply('nice meme.');
		let profile;
		if (!targetUser) {
			profile = new Profile(false, target);
		}
		else {
			profile = new Profile(true, targetUser, targetUser.avatar);
		}
		let flag = '';
		if (targetUser) {
			let country = geoip.lookupCountry(targetUser.latestIp);
			if (country) flag = ' <img title = "' + country + '" src = "http://' + serverIp + ':' + Config.port + '/flags/' + country.toLowerCase() + '.gif">';
		}
		this.sendReplyBox(profile.show());
	},

	addmon: 'addteam',
	addteam: function (target, room, user) {
		if (!Db('hasteam').has(user.userid)) return this.errorReply('You dont have access to edit your team.');
		if (!target) return this.parse('/teamhelp');
		let parts = target.split(',');
		let mon = parts[1].trim();
		let slot = parts[0];
		if (!parts[1]) return this.parse('/teamhelp');
		let acceptable = ['one', 'two', 'three', 'four', 'five', 'six'];
		if (!acceptable.includes(slot)) return this.parse('/teamhelp');
		if (slot === 'one' || slot === 'two' || slot === 'three' || slot === 'four' || slot === 'five' || slot === 'six') {
			Db('teams').set([user.userid, slot], mon);
			this.sendReplyBox('You have added this pokemon to your team.');
		}
		else {
			return this.parse('/teamhelp');
		}
	},
	setpet: function (target, room, user) {
		if (!target) return this.errorReply('USAGE: /setpet target, slot (one or two), pokemon name');
		let targets = target.split(',');
		for (let u = 0; u < targets.length; u++) targets[u] = targets[u].trim();
		let targetUser = targets[0].toLowerCase().trim();
		let slot = targets[1];
		let pets = targets[2].toLowerCase();
		let acceptable = ['one', 'two'];
		if (!acceptable.includes(slot)) return this.errorReply('USAGE: /setpet target, slot (one or two), pokemon name');
		if (!targets[2]) return this.errorReply('USAGE: /setpet target, slot (one or two), pokemon name');
		if (slot === 'one' || slot === 'two') {
			Db('pets').set([targetUser, slot], pets);
			this.parse('/profile ' + targetUser);
		}
	},

	giveteam: function (target, room, user) {
		if (!this.can('broadcast')) return false;
		if (!target) return this.errorReply('USAGE: /giveteam USER');
		let person = target.toLowerCase().trim();
		Db('hasteam').set(person, 1);
		this.sendReply(person + ' has been given the ability to set their team.');
		Users(person).popup('You have been given the ability to set your profile team.');
	},

	taketeam: function (target, room, user) {
		if (!this.can('broadcast')) return false;
		if (!target) return this.errorReply('USAGE: /taketeam USER');
		let person = target.toLowerCase().trim();
		if (!Db('hasteam').has(person)) return this.errorReply('This user does not have the ability to set their team.');
		Db('hasteam').delete(person);
		this.sendReply('this user has had their ability to change their team taken from them.');
		Users(person).popup('You have been stripped of your ability to set your team.');
	},

	teamhelp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><b>Teams In Profiles - Coded By Execute, edited by DeathlyPlays :3</b></center><br><br>' +
			'<b>/addmon (slot), (dex number) -</b >usage. The dex number must be the actual dex number of the pokemon you want.<br>' +
			'FYI: Slot - we mean what slot you want the pokemon to be. valid entries for this are: one, two, three, four, five, six.<br>' +
			'Chosing the right slot is crucial because if you chose a slot that already has a pokemon, it will overwrite that data and replace it. This can be used to replace / reorder what pokemon go where.<br>' +
			'If the Pokemon is in the first 99 Pokemon, do 0(number), and for Megas do (dex number)-Mega.<br>' +
			'For example: Mega Venusaur would be 003-Mega');
	},

	jointeam: function (target, room, user) {
		let team = target;
		if (!team) return this.errorReply('INCORRECT USAGE. CORRECT USAGE: /jointeam (team name)');
		let teams = ['valor', 'mystic', 'instinct', 'harmony', 'none'];
		if (!teams.includes(target)) return this.errorReply('This is not a valid team. Choose Either Team Valor, Mystic, Instinct, Harmony, or None');
		Db('pgo').set(user.userid, team);
		this.sendReply('You have successfully joined ' + team);
	},

	nature: function (target) {
		let parts = target.split(', ');
		if (!this.can('broadcast')) return false;
		let user = parts[1];
		if (!user) return this.parse("/help nature");
		if (!parts[0]) return this.parse("/help nature");
		if (hasUpperCase(user) && parts[0] === 'set') { //Ensure the username isn't capitalized
			return this.parse("/nature " + parts[0] + ", " + parts[1].toLowerCase() + ", " + parts[2] + ", " + parts[3]); // Re-Parse the command with the username lowercased
		}

		switch (parts[0]) {
		case 'set':
			let hex = parts[2];
			let text = parts[3];
			let acceptable = ['Hardy', 'Lonely', 'Adamant', 'Naughty', 'Brave', 'Bold', 'Docile', 'Impish', 'Lax', 'Relaxed', 'Modest', 'Mild', 'Bashful', 'Rash', 'Quiet', 'Calm', 'Gentle', 'Careful', 'Quirky', 'Sassy', 'Timid', 'Hasty', 'Jolly', 'Naive', 'Serious'];
			if (!hex || !text) return this.errorReply("Ensure you have set a nature and hex");

			let nature = '<font color = ' + hex + '><b>' + text + '</b></font>';
			if (Db('nature').has(user)) return false;
			Db('nature').set(user, nature);
			Users(user).send('|popup| You have recieved nature.');
			this.sendReply('|html|You have set a nature.');
			break;
		case 'delete':
			if (!Db('nature').has(user)) return false;
			Db('nature').delete(user);
			Users(user).send('|popup| Your nature has been removed.');
			this.sendReply("You have removed " + user + "s' nature.");
			break;
		default:
			this.parse("/help nature");
		}
	},
	naturehelp: ["/nature set, user, hex, nature - Sets a users nature",
		"/nature delete, user - Deletes a users nature."
	],

	pokemon: function (target) {
		let parts = target.split(', ');
		if (!this.can('broadcast')) return false;
		let user = parts[1];
		if (!user) return this.parse("/help pokemon");
		if (!parts[0]) return this.parse("/help pokemon");
		if (hasUpperCase(user) && parts[0] === 'set') { //Ensure the username isn't capitalized
			return this.parse("/pokemon " + parts[0] + ", " + parts[1].toLowerCase() + ", " + parts[2] + ", " + parts[3]); // Re-Parse the command with the username lowercased
		}

		switch (parts[0]) {
		case 'set':
			let hex = parts[2];
			let text = parts[3];
			let pokemons = [
				'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran♀', 'Nidorina', 'Nidoqueen', 'Nidoran♂', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', 'Farfetch\'d', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo', 'Mew', 'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw', 'Feraligatr', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl', 'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Crobat', 'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Togetic', 'Natu', 'Xatu', 'Mareep', 'Flaaffy', 'Ampharos', 'Bellossom', 'Marill', 'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom', 'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Yanma', 'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow', 'Slowking', 'Misdreavus', 'Unown', 'Wobbuffet', 'Girafarig', 'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix', 'Snubbull', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle', 'Heracross', 'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma', 'Magcargo', 'Swinub', 'Piloswine', 'Corsola', 'Remoraid', 'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndour', 'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2', 'Stantler', 'Smeargle', 'Tyrogue', 'Hitmontop', 'Smoochum', 'Elekid', 'Magby', 'Miltank', 'Blissey', 'Raikou', 'Entei', 'Suicune', 'Larvitar', 'Pupitar', 'Tyranitar', 'Lugia', 'Ho-Oh', 'Celebi', 'Treecko', 'Grovyle', 'Sceptile', 'Torchic', 'Combusken', 'Blaziken', 'Mudkip', 'Marshtomp', 'Swampert', 'Poochyena', 'Mightyena', 'Zigzagoon', 'Linoone', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon', 'Dustox', 'Lotad', 'Lombre', 'Ludicolo', 'Seedot', 'Nuzleaf', 'Shiftry', 'Taillow', 'Swellow', 'Wingull', 'Pelipper', 'Ralts', 'Kirlia', 'Gardevoir', 'Surskit', 'Masquerain', 'Shroomish', 'Breloom', 'Slakoth', 'Vigoroth', 'Slaking', 'Nincada', 'Ninjask', 'Shedinja', 'Whismur', 'Loudred', 'Exploud', 'Makuhita', 'Hariyama', 'Azurill', 'Nosepass', 'Skitty', 'Delcatty', 'Sableye', 'Mawile', 'Aron', 'Lairon', 'Aggron', 'Meditite', 'Medicham', 'Electrike', 'Manectric', 'Plusle', 'Minun', 'Volbeat', 'Illumise', 'Roselia', 'Gulpin', 'Swalot', 'Carvanha', 'Sharpedo', 'Wailmer', 'Wailord', 'Numel', 'Camerupt', 'Torkoal', 'Spoink', 'Grumpig', 'Spinda', 'Trapinch', 'Vibrava', 'Flygon', 'Cacnea', 'Cacturne', 'Swablu', 'Altaria', 'Zangoose', 'Seviper', 'Lunatone', 'Solrock', 'Barboach', 'Whiscash', 'Corphish', 'Crawdaunt', 'Baltoy', 'Claydol', 'Lileep', 'Cradily', 'Anorith', 'Armaldo', 'Feebas', 'Milotic', 'Castform', 'Kecleon', 'Shuppet', 'Banette', 'Duskull', 'Dusclops', 'Tropius', 'Chimecho', 'Absol', 'Wynaut', 'Snorunt', 'Glalie', 'Spheal', 'Sealeo', 'Walrein', 'Clamperl', 'Huntail', 'Gorebyss', 'Relicanth', 'Luvdisc', 'Bagon', 'Shelgon', 'Salamence', 'Beldum', 'Metang', 'Metagross', 'Regirock', 'Regice', 'Registeel', 'Latias', 'Latios', 'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys', 'Turtwig', 'Grotle', 'Torterra', 'Chimchar', 'Monferno', 'Infernape', 'Piplup', 'Prinplup', 'Empoleon', 'Starly', 'Staravia', 'Staraptor', 'Bidoof',
				'Bibarel', 'Kricketot', 'Kricketune', 'Shinx', 'Luxio', 'Luxray', 'Budew', 'Roserade', 'Cranidos', 'Rampardos', 'Shieldon', 'Bastiodon', 'Burmy', 'Wormadam', 'Mothim', 'Combee', 'Vespiquen', 'Pachirisu', 'Buizel', 'Floatzel', 'Cherubi', 'Cherrim', 'Shellos', 'Gastrodon', 'Ambipom', 'Drifloon', 'Drifblim', 'Buneary', 'Lopunny', 'Mismagius', 'Honchkrow', 'Glameow', 'Purugly', 'Chingling', 'Stunky', 'Skuntank', 'Bronzor', 'Bronzong', 'Bonsly', 'Mime Jr.', 'Happiny', 'Chatot', 'Spiritomb', 'Gible', 'Gabite', 'Garchomp', 'Munchlax', 'Riolu', 'Lucario', 'Hippopotas', 'Hippowdon', 'Skorupi', 'Drapion', 'Croagunk', 'Toxicroak', 'Carnivine', 'Finneon', 'Lumineon', 'Mantyke', 'Snover', 'Abomasnow', 'Weavile', 'Magnezone', 'Lickilicky', 'Rhyperior', 'Tangrowth', 'Electivire', 'Magmortar', 'Togekiss', 'Yanmega', 'Leafeon', 'Glaceon', 'Gliscor', 'Mamoswine', 'Porygon-Z', 'Gallade', 'Probopass', 'Dusknoir', 'Froslass', 'Rotom', 'Uxie', 'Mesprit', 'Azelf', 'Dialga', 'Palkia', 'Heatran', 'Regigigas', 'Giratina', 'Cresselia', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus', 'Victini', 'Snivy', 'Servine', 'Serperior', 'Tepig', 'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott', 'Patrat', 'Watchog', 'Lillipup', 'Herdier', 'Stoutland', 'Purrloin', 'Liepard', 'Pansage', 'Simisage', 'Pansear', 'Simisear', 'Panpour', 'Simipour', 'Munna', 'Musharna', 'Pidove', 'Tranquill', 'Unfezant', 'Blitzle', 'Zebstrika', 'Roggenrola', 'Boldore', 'Gigalith', 'Woobat', 'Swoobat', 'Drilbur', 'Excadrill', 'Audino', 'Timburr', 'Gurdurr', 'Conkeldurr', 'Tympole', 'Palpitoad', 'Seismitoad', 'Throh', 'Sawk', 'Sewaddle', 'Swadloon', 'Leavanny', 'Venipede', 'Whirlipede', 'Scolipede', 'Cottonee', 'Whimsicott', 'Petilil', 'Lilligant', 'Basculin', 'Sandile', 'Krokorok', 'Krookodile', 'Darumaka', 'Darmanitan', 'Maractus', 'Dwebble', 'Crustle', 'Scraggy', 'Scrafty', 'Sigilyph', 'Yamask', 'Cofagrigus', 'Tirtouga', 'Carracosta', 'Archen', 'Archeops', 'Trubbish', 'Garbodor', 'Zorua', 'Zoroark', 'Minccino', 'Cinccino', 'Gothita', 'Gothorita', 'Gothitelle', 'Solosis', 'Duosion', 'Reuniclus', 'Ducklett', 'Swanna', 'Vanillite', 'Vanillish', 'Vanilluxe', 'Deerling', 'Sawsbuck', 'Emolga', 'Karrablast', 'Escavalier', 'Foongus', 'Amoonguss', 'Frillish', 'Jellicent', 'Alomomola', 'Joltik', 'Galvantula', 'Ferroseed', 'Ferrothorn', 'Klink', 'Klang', 'Klinklang', 'Tynamo', 'Eelektrik', 'Eelektross', 'Elgyem', 'Beheeyem', 'Litwick', 'Lampent', 'Chandelure', 'Axew', 'Fraxure', 'Haxorus', 'Cubchoo', 'Beartic', 'Cryogonal', 'Shelmet', 'Accelgor', 'Stunfisk', 'Mienfoo', 'Mienshao', 'Druddigon', 'Golett', 'Golurk', 'Pawniard', 'Bisharp', 'Bouffalant', 'Rufflet', 'Braviary', 'Vullaby', 'Mandibuzz', 'Heatmor', 'Durant', 'Deino', 'Zweilous', 'Hydreigon', 'Larvesta', 'Volcarona', 'Cobalion', 'Terrakion', 'Virizion', 'Tornadus', 'Thundurus', 'Reshiram', 'Zekrom', 'Landorus', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect', 'Chespin', 'Quilladin', 'Chesnaught', 'Fennekin', 'Braixen', 'Delphox', 'Froakie', 'Frogadier', 'Greninja', 'Bunnelby', 'Diggersby', 'Fletchling', 'Fletchinder', 'Talonflame', 'Scatterbug', 'Spewpa', 'Vivillon', 'Litleo', 'Pyroar', 'Flabébé', 'Floette', 'Florges', 'Skiddo', 'Gogoat', 'Pancham', 'Pangoro', 'Furfrou', 'Espurr', 'Meowstic', 'Honedge', 'Doublade', 'Aegislash', 'Spritzee', 'Aromatisse', 'Swirlix', 'Slurpuff', 'Inkay', 'Malamar', 'Binacle', 'Barbaracle', 'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer', 'Helioptile', 'Heliolisk', 'Tyrunt', 'Tyrantrum', 'Amaura', 'Aurorus', 'Sylveon', 'Hawlucha', 'Dedenne', 'Carbink', 'Goomy', 'Sliggoo', 'Goodra', 'Klefki', 'Phantump', 'Trevenant', 'Pumpkaboo', 'Gourgeist', 'Bergmite', 'Avalugg', 'Noibat', 'Noivern', 'Xerneas', 'Yveltal', 'Zygarde', 'Volcanion', 'Diancie', 'Rowlet', 'Dartrix', 'Decidueye', 'Litten', 'Torracat', 'Incineroar', 'Popplio', 'Brionne', 'Primarina', 'Pikipek', 'Trumbeak', 'Toucannon', 'Yungoos', 'Gumshoos', 'Grubbin', 'Charjabug', 'Vikavolt', 'Crabrawler', 'Crabominable', 'Oricorio', 'Cutiefly', 'Ribombee', 'Rockruff', 'Lyranoc', 'Wishiwashi', 'Mareanie', 'Toxapex', 'Mudbray', 'Mudsdale', 'Dewpider', 'Araquanid', 'Fomantis', 'Lurantis', 'Morelull', 'Shiinotic', 'Salandit', 'Salazzle', 'Stufful', 'Bewear', 'Bounsweet', 'Steenee', 'Tsareena', 'Comfey', 'Oranguru', 'Passimian', 'Wimpod', 'Golisopod', 'Sandygast', 'Palossand', 'Pyukumuku', 'Type: Null', 'Silvally', 'Minior', 'Komala', 'Turtonator', 'Togedemaru', 'Mimikyu', 'Bruxish', 'Drampa', 'Dhelmise', 'Jangmo-o', 'Hakamo-o', 'Kommo-o', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini', 'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Nihilego', 'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana', 'Guzzlord', 'Necrozma', 'Magearna'
			];
			if (!hex || !text) return this.errorReply("Ensure you have set a Pokemon and hex");

			let pokemon = '<font color = ' + hex + '><b>' + text + '</b></font>';
			if (Db('pokemon').has(user)) return false;
			Db('pokemon').set(user, pokemon);
			Users(user).send('|popup| You have recieved a Pokemon.');
			this.sendReply('|html|You have set a Pokemon.');
			break;
		case 'delete':
			if (!Db('pokemon').has(user)) return false;
			Db('pokemon').delete(user);
			Users(user).send('|popup| Your Pokemon has been removed.');
			this.sendReply("You have removed " + user + "s' Pokemon.");
			break;
		default:
			this.parse("/help pokemon");
		}
	},
	pokemonhelp: ["/pokemon set, user, hex, Pokemon - Sets a users Pokemon.",
		"/pokemon delete, user - Deletes a users Pokemon."
	],

	type: function (target) {
		let parts = target.split(', ');
		if (!this.can('broadcast')) return false;
		let user = parts[1];
		if (!user) return this.parse("/help type");
		if (!parts[0]) return this.parse("/help type");
		if (hasUpperCase(user) && parts[0] === 'set') { //Ensure the username isn't capitalized
			return this.parse("/type " + parts[0] + ", " + parts[1].toLowerCase() + ", " + parts[2] + ", " + parts[3]); // Re-Parse the command with the username lowercased
		}

		switch (parts[0]) {
		case 'set':
			let hex = parts[2];
			let text = parts[3];
			let types = ['Normal', 'Grass', 'Poison', 'Fire', 'Water', 'Bug', 'Flying', 'Electric', 'Rock', 'Ground', 'Steel', 'Ice', 'Dragon', 'Fairy', 'Psychic', 'Fighting', 'Dark', 'Ghost'];
			if (!hex || !text) return this.errorReply("Ensure you have set a type and hex");

			let type = '<font color = ' + hex + '><b>' + text + '</b></font>';
			if (Db('type').has(user)) return false;
			Db('type').set(user, type);
			Users(user).send('|popup| You have recieved type.');
			this.sendReply('|html|You have set a type.');
			break;
		case 'delete':
			if (!Db('type').has(user)) return false;
			Db('type').delete(user);
			Users(user).send('|popup| Your type has been removed.');
			this.sendReply("You have removed " + user + "s' type.");
			break;
		default:
			this.parse("/help type");
		}
	},
	typehelp: ["/type set, user, hex, type - Sets a users type",
		"/type delete, user - Deletes a users type."
	],


	title: function (target) {
		let parts = target.split(', ');
		if (!this.can('broadcast')) return false;
		let user = parts[1];
		if (!user) return this.parse("/help title");
		if (!parts[0]) return this.parse("/help title");
		if (hasUpperCase(user) && parts[0] === 'set') { //Ensure the username isn't capitalized
			return this.parse("/title " + parts[0] + ", " + parts[1].toLowerCase() + ", " + parts[2] + ", " + parts[3]); // Re-Parse the command with the username lowercased
		}

		switch (parts[0]) {
		case 'set':
			let hex = parts[2];
			let text = parts[3];
			if (!hex || !text) return this.errorReply("Ensure you have set a title and hex");

			let title = '<font color = ' + hex + '><b>(' + text + ')</b></font>';
			if (Db('titles').has(user)) return false;
			Db('titles').set(user, title);
			Users(user).send('|popup| You have recieved a custom title');
			this.sendReply('|html|You have set the custom title');
			break;
		case 'delete':
			if (!Db('titles').has(user)) return false;
			Db('titles').delete(user);
			Users(user).send('|popup| Your custom title has been removed');
			this.sendReply("You have removed " + user + "s' custom title");
			break;
		default:
			this.parse("/help title");
		}
	},
	titlehelp: ["/title set, user, hex, title - Sets a users title",
		"/title delete, user - Deletes a users title."
	],

	quote: function (target, room, user) {
		if (!target) return this.errorReply('USAGE: /quote (quote)');
		Db('quotes').set(user.userid, target);
		this.sendReply('|html|Your quote has been set to : <b><i>' + target + '</i></b>');
	},

	aboutme: function (target, room, user) {
		if (!target) return this.errorReply('The correct usage of this command is: /aboutme (bio message)');
		Db('aboutme').set(user.userid, target);
		this.sendReply('|html|Your bio has been set to: <b><i>' + target + '</i></b>');
	},

	bg: 'setbg',
	setbackground: 'setbg',
	setbg: function (target, room, user) {
		if (!this.can('broadcast')) return false;
		let parts = target.split(',');
		if (!parts[1]) return this.errorReply('USAGE: /setbackground (user), (link)');
		let targ = parts[0].toLowerCase().trim();
		let link = parts[1].trim();
		Db('backgrounds').set(targ, link);
		this.sendReply('This users background has been set to : ');
		this.parse('/profile ' + targ);
	},

	'deletebackground': 'deletebg',
	deletebg: function (target, room, user) {
		if (!this.can('broadcast')) return false;
		let targ = target.toLowerCase();
		if (!target) return this.errorReply('USAGE: /deletebackground (user)');
		if (!Db('backgrounds').has(targ)) return this.errorReply('This user does not have a custom background.');
		Db('backgrounds').delete(targ);
		this.sendReply('This users background has deleted.');
	},

	setmusic: function (target, room, user) {
		if (!this.can('broadcast')) return false;
		let parts = target.split(',');
		let targ = parts[0].toLowerCase().trim();
		if (!parts[2]) return this.errorReply('USAGE: /setmusic (user), (link), (title)');
		let link = parts[1].trim();
		let title = parts[2].trim();
		Db('music').set([targ, 'link'], link);
		Db('music').set([targ, 'title'], title);
		this.sendReply(targ + '\'s song has been set to: ');
		this.parse('/profile ' + targ);
	},

	badge: function (target, room, user) {
		let parts = target.split(',');
		let acceptable = ['set', 'take', 'delete', 'add', 'list', 'info'];
		if (!acceptable.includes(parts[0])) return this.parse('/badgehelp');
		switch (parts[0]) {
		case 'add':
			let id = parts[1].trim().toLowerCase();
			let name = parts[1].trim();
			let img = parts[2].trim();
			let desc = parts[3].trim();
			if (!parts[3]) return this.errorReply('USAGE: /badge add, (name), (img), Description.');
			if (Db('badgelist').has(id)) return this.errorReply('There is a badge with this name already.');
			Db('badgelist')
				.set([id, 'name'], name)
				.set([id, 'img'], img)
				.set([id, 'desc'], desc);
			let total = Db('badgelist').get('all');
			if (!Db('badgelist').has('all')) total = [];
			total.push(id);
			Db('badgelist').set('all', total);
			this.sendReplyBox('This badge has been successfully added.');
			break;
		case 'delete':
			let targbadge = parts[1].trim().toLowerCase();
			if (parts[2]) return this.errorReply('USAGE: /badge delete, (name)');
			if (!Db('badgelist').has(targbadge)) return this.errorReply('This badge does not exist.');
			Db('badgelist').delete(targbadge);
			let allbadgez = Db('badgelist').get('all');
			allbadgez = allbadgez.filter(b => b !== targbadge);
			Db('badgehlist').set('all', allbadgez);
			this.errorReply('This badge has been deleted.');
			let badgeUserObject = Db('userBadges').object();
			let users = Object.keys(badgeUserObject);
			users.forEach(u => Db('userBadges').set(u, (badgeUserObject[u].filter(b => b !== targbadge))));
			break;
		case 'set':
			let targUser = parts[1].trim().toLowerCase();
			let badge = parts[2].trim();
			if (!Db('badgelist').has(badge)) return this.errorReply('This badge does not exist.');
			if (!parts[2]) return this.errorReply('USAGE: /badge set, (user), (badge name)');
			let userBadges = Db('badges').get(targUser);
			if (!Db('badges').has(targUser)) userBadges = [];
			userBadges.push(badge);
			Db('badges').set(targUser, userBadges);
			let kekbadge = Db('badgelist').get([badge, 'img']);
			this.sendReply('This user has been succesfully given the ' + badge + ' badge.');
			Users(targUser).popup('|html|You have been given the <img src="' + kekbadge + '"> Badge.');
			break;
		case 'take':
			let usertarget = parts[1].trim().toLowerCase();
			let hasbadges = Db('badges').get(usertarget);
			let deletebadge = parts[2].trim().toLowerCase();
			let imgofbadge = Db('badgelist').get([deletebadge, 'img']);
			if (!parts[2]) this.errorReply('USAGE: /badge take, (user), (badge name).');
			hasbadges = hasbadges.filter(b => b !== deletebadge);
			Db('badges').set(usertarget, hasbadges);
			this.sendReply('This user has been stripped of the ' + deletebadge + ' badge.');
			Users(usertarget).popup('|html|You have been stripped of the the ' + imgofbadge + ' Badge.');
			break;
		case 'list':
			if (!this.runBroadcast()) return;
			let BadgeList = '<table border="1" width="100%" cellpadding="5px" cellspacing="0"><th>Badge Img</th><th>Badge Name</th><th>Badge Description</th>';
			let allbadges = Db('badgelist').get('all');
			for (let i = 0; i < allbadges.length; i++) {
				let badgeimg = Db('badgelist').get([allbadges[i], 'img']);
				let badgedesc = Db('badgelist').get([allbadges[i], 'desc']);
				let badgename = Db('badgelist').get([allbadges[i], 'name']);
				BadgeList += '<tr>';
				BadgeList += '<td><center><button style="background:transparent;border:none;" name="send" value="/badge info, ' + badgename + '"><img src="' + badgeimg + '" title="' + badgename + ' : ' + badgedesc + '"></button></center></td>';
				BadgeList += '<td><b>' + badgename + '</b></td>';
				BadgeList += '<td>' + badgedesc + '</td>';
				BadgeList += '</tr>';
			}
			this.sendReply('|html|' + BadgeList);
			break;
		case 'info':
			if (!this.runBroadcast()) return;
			if (!parts[1]) return this.errorReply('USAGE: /badge info, (badge name)');
			let infobadge = parts[1].trim().toLowerCase();
			let all = Db('badgelist').get('all');
			if (!all.includes(infobadge)) return this.errorReply('This badge does not exist.');
			let imginfo = Db('badgelist').get([infobadge, 'img']);
			let infodesc = Db('badgelist').get([infobadge, 'desc']);
			let infoname = Db('badgelist').get([infobadge, 'name']);
			this.sendReplyBox('<img src="' + imginfo + '">' + SPACE + infoname + ' : ' + infodesc);
			break;
		}
	},

	badgehelp: function (target, room, user) {
		let display = '';
		display += '<div class="infobox-limited"><center><b>Exiled Badge Plugin By Sukesha, Insist, and Execute.</b></center>';
		display += '<b>/badgehelp</b> - Shows all the commands that are related to badges.<br>';
		display += '<b>/badge add, (badge name), (badge image), (badge description)</b> - Adds a badge to the servers code.<br>';
		display += '<b>/badge delete, (badge name)</b> - Deletes a badge from the server code.<br>';
		display += '<b>/badge set, (user), (badge name)</b> - Gives a user a certain badge.<br>';
		display += '<b>/badge take, (user), (badgename)</b< - Takes a badge from a user.<br>';
		display += '<b>/badge list</b> - Shows all the servers badges.';
		this.sendReply('|html|' + display);
	},

	setfriendcode: function (target, room, user) {
		if (!target) return this.errorReply('USAGE: /setfriendcode (code)');
		Db('friendcode').set(user.userid, target);
		return this.sendReply('You have succesfully set your friend code to : ' + target);
	},
};
