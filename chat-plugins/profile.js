/**
 * profile.js
 * Displays to users a profile of a given user.
 * For order's sake:
 * - vip, dev, customtitle, friendcode, and profile were placed in here.
 * Updated and restyled by Mystifi; main profile restyle goes out to panpawn/jd/other contributors.
 **/
'use strict';

let geoip = require('geoip-lite-country');

// fill in '' with the server IP
let serverIp = Config.serverIp;

function isVIP(user) {
	if (!user) return;
	if (typeof user === 'object') user = user.userid;
	let vip = Db("vips").get(toId(user));
	if (vip === 1) return true;
	return false;
}

function showTitle(userid) {
	userid = toId(userid);
	if (Db("titles").has(userid)) {
		return '<font color="' + Db("titles").get(userid)[1] +
			'">(<b>' + Db("titles").get(userid)[0] + '</b>)</font>';
	}
	return '';
}

function devCheck(user) {
	if (isDev(user)) return '<font color="#009320">(<b>Developer</b>)</font>';
	return '';
}

function vipCheck(user) {
	if (isVIP(user)) return '<font color="#6390F0">(<b>VIP User</b>)</font>';
	return '';
}

<<<<<<< HEAD
Profile.prototype.avatar = function () {
	if (this.isOnline) {
		if (typeof this.image === 'string') return img('https://dewdrop-mewthy.c9users.io/avatars/' + this.image);
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
	let second = Db('pets').get([userid, 'two']);
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
	//return '<div style="' + teamcss + '">' + '<br>' + iconize(one) + iconize(two) + iconize(three) + '<br>' + iconize(four) + iconize(five) + iconize(six) + '</div>';
	let teamDisplay = '<center><div style="' + teamcss + '">';
	if (Db('teams').has([person, 'one'])) {
		teamDisplay += iconize(one);
	} else {
		teamDisplay += noSprite;
	}
	if (Db('teams').has([person, 'two'])) {
		teamDisplay += iconize(two);
	} else {
		teamDisplay += noSprite;
	}
	if (Db('teams').has([person, 'three'])) {
		teamDisplay += iconize(three);
	} else {
		teamDisplay += noSprite;
	}
	if (Db('teams').has([person, 'four'])) {
		teamDisplay += iconize(four);
	} else {
		teamDisplay += noSprite;
	}
	if (Db('teams').has([person, 'five'])) {
		teamDisplay += iconize(five);
	} else {
		teamDisplay += noSprite;
	}
	if (Db('teams').has([person, 'six'])) {
		teamDisplay += iconize(six);
	} else {
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
			} else {
				return ' <img src="https://github.com/kevogod/cachechu/blob/master/flags/' + geo.toLowerCase() + '.png?raw=true" height=10 title="' + geo + '">';
=======
function showBadges(user) {
	if (Db("userBadges").has(toId(user))) {
		let badges = Db("userBadges").get(toId(user));
		let css = 'border:none;background:none;padding:0;';
		if (typeof badges !== 'undefined' && badges !== null) {
			let output = '<td><div style="float: right; background: rgba(69, 76, 80, 0.4); text-align: center; border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset; margin: 0px 3px;">';
			output += ' <table style="' + css + '"> <tr>';
			for (let i = 0; i < badges.length; i++) {
				if (i !== 0 && i % 4 === 0) output += '</tr> <tr>';
				output += '<td><button style="' + css + '" name="send" value="/badges info, ' + badges[i] + '">' +
				'<img src="' + Db("badgeData").get(badges[i])[1] + '" height="16" width="16" alt="' + badges[i] + '" title="' + badges[i] + '" >' + '</button></td>';
>>>>>>> 78c9ce374eaca05d6301a941b6b3ac41a6c4ce1d
			}
			output += '</tr> </table></div></td>';
			return output;
		}
	}
	return '';
}

exports.commands = {
	vip: {
		give: function (target, room, user) {
			if (!this.can('declare')) return false;
			if (!target) return this.parse('/help', true);
			let vipUsername = toId(target);
			if (vipUsername.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
			if (isVIP(vipUsername)) return this.errorReply(vipUsername + " is already a VIP user.");
			Db("vips").set(vipUsername, 1);
			this.sendReply("|html|" + Exiled.nameColor(vipUsername, true) + " has been given VIP status.");
			if (Users.get(vipUsername)) Users(vipUsername).popup("|html|You have been given VIP status by " + Exiled.nameColor(user.name, true) + ".");
		},
		take: function (target, room, user) {
			if (!this.can('declare')) return false;
			if (!target) return this.parse('/help', true);
			let vipUsername = toId(target);
			if (vipUsername.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
			if (!isVIP(vipUsername)) return this.errorReply(vipUsername + " isn't a VIP user.");
			Db("vips").delete(vipUsername);
			this.sendReply("|html|" + Exiled.nameColor(vipUsername, true) + " has been demoted from VIP status.");
			if (Users.get(vipUsername)) Users(vipUsername).popup("|html|You have been demoted from VIP status by " + Exiled.nameColor(user.name, true) + ".");
		},
		users: 'list',
		list: function (target, room, user) {
			if (!Db("vips").keys().length) return this.errorReply('There seems to be no user with VIP status.');
			let display = [];
			Db("vips").keys().forEach(vipUser => {
				display.push(Exiled.nameColor(vipUser, (Users(vipUser) && Users(vipUser).connected)));
			});
			this.popupReply('|html|<b><u><font size="3"><center>VIP Users:</center></font></u></b>' + display.join(','));
		},
		'': 'help',
		help: function (target, room, user) {
			this.sendReplyBox(
				'<div style="padding: 3px 5px;"><center>' +
				'<code>/vip</code> commands.<br />These commands are nestled under the namespace <code>vip</code>.</center>' +
				'<hr width="100%">' +
				'<code>give [username]</code>: Gives <code>username</code> VIP status. Requires: & ~' +
				'<br />' +
				'<code>take [username]</code>: Takes <code>username</code>\'s VIP status. Requires: & ~' +
				'<br />' +
				'<code>list</code>: Shows list of users with VIP Status' +
				'</div>'
			);
		},
	},
	title: 'customtitle',
	customtitle: {
		set: 'give',
		give: function (target, room, user) {
			if (!this.can('declare')) return false;
			target = target.split(',');
			if (!target || target.length < 3) return this.parse('/help', true);
			let userid = toId(target[0]);
			let targetUser = Users.getExact(userid);
			let title = target[1].trim();
			if (Db("titles").has(userid) && Db("titlecolors").has(userid)) {
				return this.errorReply(userid + " already has a custom title.");
			}
			let color = target[2].trim();
			if (color.charAt(0) !== '#') return this.errorReply("The color needs to be a hex starting with '#'.");
			Db("titles").set(userid, [title, color]);
			if (Users.get(targetUser)) {
				Users(targetUser).popup(
					'|html|You have recieved a custom title from ' + Exiled.nameColor(user.name, true) + '.' +
					'<br />Title: ' + showTitle(toId(targetUser)) +
					'<br />Title Hex Color: ' + color
				);
			}
			this.logModCommand(user.name + " set a custom title to " + userid + "'s profile.");
			Monitor.adminlog(user.name + " set a custom title to " + userid + "'s profile.");
			return this.sendReply("Title '" + title + "' and color '" + color + "' for " + userid + "'s custom title have been set.");
		},
		delete: 'remove',
		take: 'remove',
		remove: function (target, room, user) {
			if (!this.can('declare')) return false;
			if (!target) return this.parse('/help', true);
			let userid = toId(target);
			if (!Db("titles").has(userid) && !Db("titlecolors").has(userid)) {
				return this.errorReply(userid + " does not have a custom title set.");
			}
			Db("titlecolors").delete(userid);
			Db("titles").delete(userid);
			if (Users.get(userid)) {
				Users(userid).popup(
					'|html|' + Exiled.nameColor(user.name, true) + " has removed your custom title."
				);
			}
			this.logModCommand(user.name + " removed " + userid + "'s custom title.");
			Monitor.adminlog(user.name + " removed " + userid + "'s custom title.");
			return this.sendReply(userid + "'s custom title and title color were removed from the server memory.");
		},
		'': 'help',
		help: function (target, room, user) {
			if (!user.autoconfirmed) return this.errorReply("You need to be autoconfirmed to use this command.");
			if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");
			if (!this.runBroadcast()) return;
			return this.sendReplyBox(
				'<center><code>/customtitle</code> commands<br />' +
				'All commands are nestled under the namespace <code>customtitle</code>.</center>' +
				'<hr width="100%">' +
				'- <code>[set|give] [username], [title], [hex color]</code>: Sets a user\'s custom title. Requires: & ~' +
				'- <code>[take|remove|delete] [username]</code>: Removes a user\'s custom title and erases it from the server. Requires: & ~'
			);
		},
	},
	fc: 'friendcode',
	friendcode: {
		add: 'set',
		set: function (target, room, user) {
			if (room.battle) return this.errorReply("Please use this command outside of battle rooms.");
			if (!user.autoconfirmed) return this.errorReply("You must be autoconfirmed to use this command.");
			if (!target) return this.parse('/help', true);
			let fc = target;
			fc = fc.replace(/-/g, '');
			fc = fc.replace(/ /g, '');
			if (isNaN(fc)) {
				return this.errorReply("Your friend code needs to contain only numerical characters.");
			}
			if (fc.length < 12) return this.errorReply("Your friend code needs to be 12 digits long.");
			fc = fc.slice(0, 4) + '-' + fc.slice(4, 8) + '-' + fc.slice(8, 12);
			Db("friendcode").set(toId(user), fc);
			return this.sendReply("Your friend code: " + fc + " has been saved to the server.");
		},
		remove: 'delete',
		delete: function (target, room, user) {
			if (room.battle) return this.errorReply("Please use this command outside of battle rooms.");
			if (!user.autoconfirmed) return this.errorReply("You must be autoconfirmed to use this command.");
			if (!target) {
				if (!Db("friendcode").has(toId(user))) return this.errorReply("Your friend code isn't set.");
				Db("friendcode").delete(toId(user));
				return this.sendReply("Your friend code has been deleted from the server.");
			} else {
				if (!this.can('lock')) return false;
				let userid = toId(target);
				if (!Db("friendcode").has(userid)) return this.errorReply(userid + " hasn't set a friend code.");
				Db("friendcode").delete(userid);
				return this.sendReply(userid + "'s friend code has been deleted from the server.");
			}
		},
		'': 'help',
		help: function (target, room, user) {
			if (room.battle) return this.errorReply("Please use this command outside of battle rooms.");
			if (!user.autoconfirmed) return this.errorReply("You must be autoconfirmed to use this command.");
			return this.sendReplyBox(
				'<center><code>/friendcode</code> commands<br />' +
				'All commands are nestled under the namespace <code>friendcode</code>.</center>' +
				'<hr width="100%">' +
				'<code>[add|set] [code]</code>: Sets your friend code. Must be in the format 111111111111, 1111 1111 1111, or 1111-1111-1111.' +
				'<br />' +
				'<code>[remove|delete]</code>: Removes your friend code. Global staff can include <code>[username]</code> to delete a user\'s friend code.' +
				'<br />' +
				'<code>help</code>: Displays this help command.'
			);
		},
	},
	'!profile': true,
	profile: function (target, room, user) {
		target = toId(target);
		if (!target) target = user.name;
		if (target.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
		if (!this.runBroadcast()) return;
		let self = this;
		let targetUser = Users.get(target);
		let username = (targetUser ? targetUser.name : target);
		let userid = (targetUser ? targetUser.userid : toId(target));
		let avatar = (targetUser ? (isNaN(targetUser.avatar) ? "http://" + serverIp + ":" + Config.port + "/avatars/" + targetUser.avatar : "http://play.pokemonshowdown.com/sprites/trainers/" + targetUser.avatar + ".png") : (Config.customavatars[userid] ? "http://" + serverIp + ":" + Config.port + "/avatars/" + Config.customavatars[userid] : "http://play.pokemonshowdown.com/sprites/trainers/1.png"));
		if (targetUser && targetUser.avatar[0] === '#') avatar = 'http://play.pokemonshowdown.com/sprites/trainers/' + targetUser.avatar.substr(1) + '.png';
		let userSymbol = (Users.usergroups[userid] ? Users.usergroups[userid].substr(0, 1) : "Regular User");
		let userGroup = (Config.groups[userSymbol] ? 'Global ' + Config.groups[userSymbol].name : "Regular User");
		let regdate = '(Unregistered)';
		Exiled.regdate(userid, date => {
			if (date) {
				let d = new Date(date);
				let MonthNames = ["January", "February", "March", "April", "May", "June",
					"July", "August", "September", "October", "November", "December",
				];
				regdate = MonthNames[d.getUTCMonth()] + ' ' + d.getUTCDate() + ", " + d.getUTCFullYear();
			}
			showProfile();
		});

		function getLastSeen(userid) {
			if (Users(userid) && Users(userid).connected) return '<font color = "limegreen"><strong>Currently Online</strong></font>';
			let seen = Db("seen").get(userid);
			if (!seen) return '<font color = "red"><strong>Never</strong></font>';
			return Chat.toDurationString(Date.now() - seen, {precision: true}) + " ago.";
		}

		function getFlag(userid) {
			let ip = (Users(userid) ? geoip.lookup(Users(userid).latestIp) : false);
			if (!ip || ip === null) return '';
			return '<img src="http://flags.fmcdn.net/data/flags/normal/' + ip.country.toLowerCase() + '.png" alt="' + ip.country + '" title="' + ip.country + '" width="20" height="10">';
		}

		function showProfile() {
			Economy.readMoney(toId(username), money => {
				let profile = '';
				profile += showBadges(toId(username));
				profile += '<img src="' + avatar + '" height="80" width="80" align="left">';
				profile += '&nbsp;<font color="#24678d"><b>Name:</b></font> ' + Exiled.nameColor(username, true) + '&nbsp;' + getFlag(toId(username)) + ' ' + showTitle(username) + '<br />';
				profile += '&nbsp;<font color="#24678d"><b>Group:</b></font> ' + userGroup + ' ' + devCheck(username) + vipCheck(username) + '<br />';
				profile += '&nbsp;<font color="#24678d"><b>Registered:</b></font> ' + regdate + '<br />';
				profile += '&nbsp;<font color="#24678d"><b>' + global.moneyPlural + ':</b></font> ' + money + '<br />';
				profile += '&nbsp;<font color="#24678d"><b>Last Seen:</b></font> ' + getLastSeen(toId(username)) + '</font><br />';
				if (Db("friendcode").has(toId(username))) {
					profile += '&nbsp;<font color="#24678d"><b>Friend Code:</b></font> ' + Db("friendcode").get(toId(username));
				}
				profile += '<br clear="all">';
				self.sendReplyBox(profile);
			});
		}
	},
};