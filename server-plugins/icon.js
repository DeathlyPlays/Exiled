/*
* icons.js
* Credits: Lord Haji, panpawn.
*/
'use strict';

let icons = {};
const fs = require('fs');

function load() {
	fs.readFile('config/icons.json', 'utf8', function (err, file) {
		if (err) return;
		icons = JSON.parse(file);
	});
}
load();

function updateIcons() {
	fs.writeFileSync('config/icons.json', JSON.stringify(icons));

	let newCss = '/* ICONS START */\n';

	for (let name in icons) {
		newCss += generateCSS(name, icons[name]);
	}
	newCss += '/* ICONS END */\n';

	let file = fs.readFileSync('config/custom.css', 'utf8').split('\n');
	if (~file.indexOf('/* ICONS START */')) file.splice(file.indexOf('/* ICONS START */'), (file.indexOf('/* ICONS END */') - file.indexOf('/* ICONS START */')) + 1);
	fs.writeFileSync('config/custom.css', file.join('\n') + newCss);
	Server.reloadCSS();
}

function generateCSS(name, icon) {
	let css = '';
	name = toId(name);
	css = '[id$="-userlist-user-' + name + '"] {\nbackground: url("' + icon + '") no-repeat right !important;\n}\n';
	return css;
}

exports.commands = {
	uli: 'icon',
	userlisticon: 'icon',
	customicon: 'icon',
	icon: {
		set: function (target, room, user) {
			if (!this.can('lock')) return false;
			target = target.split(',');
			for (let u in target) target[u] = target[u].trim();
			if (target.length !== 2) return this.parse('/help icon');
			if (toId(target[0]).length > 19) return this.errorReply("Usernames are not this long...");
			if (icons[toId(target[0])]) return this.errorReply("This user already has a custom userlist icon.  Do /icon delete [user] and then set their new icon.");
			this.sendReply("|raw|You have given " + Server.nameColor(target[0], true) + " an icon.");
			Monitor.log(target[0] + " has received an icon from " + user.name + ".");
			this.privateModAction("|raw|(" + target[0] + " has received icon: <img src='" + target[1] + "' width='32' height='32'> from " + user.name + ".)");
			if (Users(target[0]) && Users(target[0]).connected) Users(target[0]).popup("|html|" + Server.nameColor(user.name, true) + " has set your userlist icon to: <img src='" + target[1] + "' width='32' height='32'><br><center>Refresh, If you don't see it.</center>");
			icons[toId(target[0])] = target[1];
			updateIcons();
		},

		remove: 'delete',
		delete: function (target, room, user) {
			if (!this.can('lock')) return false;
			target = toId(target);
			if (!icons[toId(target)]) return this.errorReply('/icon - ' + target + ' does not have an icon.');
			delete icons[toId(target)];
			updateIcons();
			this.sendReply("You removed " + target + "'s icon.");
			Monitor.log(user.name + " removed " + target + "'s icon.");
			this.privateModAction("(" + target + "'s icon was removed by " + user.name + ".)");
			if (Users(target) && Users(target).connected) Users(target).popup("|html|" + Server.nameColor(user.name, true) + " has removed your userlist icon.");
		},

		"": "help",
		help: function (target, room, user) {
			this.parse("/iconhelp");
		},
	},
	iconhelp: [
		"Commands Include:",
		"/icon set [user], [image url] - Gives [user] an icon of [image url]",
		"/icon delete [user] - Deletes a user's icon",
	],
};
