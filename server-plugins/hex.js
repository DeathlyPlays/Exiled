'use strict';

let http = require('http');
const Autolinker = require('autolinker');

Server.nameColor = function (name, bold, userGroup) {
	let userGroupSymbol = Users.usergroups[toId(name)] ? '<strong><font color=#948A88>' + Users.usergroups[toId(name)].substr(0, 1) + '</font></strong>' : "";
	return (userGroup ? userGroupSymbol : "") + (bold ? "<strong>" : "") + "<font color=" + Server.hashColor(name) + ">" + (Users(name) && Users(name).connected && Users.getExact(name) ? Chat.escapeHTML(Users.getExact(name).name) : Chat.escapeHTML(name)) + "</font>" + (bold ? "</strong>" : "");
};
// usage: Server.nameColor(user.name, true) for bold OR Server.nameColor(user.name, false) for non-bolded.

Server.pmAll = function (message, pmName) {
	pmName = (pmName ? pmName : '~' + Config.serverName + ' Server');
	Users.users.forEach(curUser => {
		curUser.send('|pm|' + pmName + '|' + curUser.getIdentity() + '|' + message);
	});
};

// format: Server.pmAll('message', 'person')
//
// usage: Server.pmAll('Event in Lobby in 5 minutes!', '~Server')
//
// this makes a PM from ~Server stating the message.

Server.pmStaff = function (message, pmName, from) {
	pmName = (pmName ? pmName : '~' + Config.serverName + ' Server');
	from = (from ? ' (PM from ' + from + ')' : '');
	Users.users.forEach(curUser => {
		if (!curUser.isStaff) return;
		curUser.send('|pm|' + pmName + '|' + curUser.getIdentity() + '|' + message);
	});
}

// format: Server.pmStaff('message', 'person')
//
// usage: Server.pmStaff('Hey, Staff Meeting time', '~Server')
//
// this makes a PM from ~Server stating the message.

Server.messageSeniorStaff = function (message, pmName, from) {
	pmName = (pmName ? pmName : '~' + Config.serverName + ' Server');
	from = (from ? ' (PM from ' + from + ')' : '');
	Users.users.forEach(curUser => {
		if (curUser.group === '~' || curUser.group === '☥' || curUser.group === '&') {
			curUser.send('|pm|' + pmName + '|' + curUser.getIdentity() + '|' + message + from);
		}
	});
};
// format: Server.messageSeniorStaff('message', 'person')
//
// usage: Server.messageSeniorStaff('Mystifi is a confirmed user and they were banned from a public room. Assess the situation immediately.', '~Server')
//
// this makes a PM from ~Server stating the message.

Server.parseMessage = function (message) {
	if (message.substr(0, 5) === "/html") {
		message = message.substr(5);
		message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>'); // italics
		message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<strong>$1</strong>'); // bold
		message = message.replace(/\~\~([^< ](?:[^<]*?[^< ])?)\~\~/g, '<strike>$1</strike>'); // strikethrough
		message = message.replace(/&lt;&lt;([a-z0-9-]+)&gt;&gt;/g, '&laquo;<a href="/$1" target="_blank">$1</a>&raquo;'); // <<roomid>>
		message = Autolinker.link(message.replace(/&#x2f;/g, '/'), {stripPrefix: false, phone: false, twitter: false});
		return message;
	}
	message = Chat.escapeHTML(message).replace(/&#x2f;/g, '/');
	message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>'); // italics
	message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<strong>$1</strong>'); // bold
	message = message.replace(/\~\~([^< ](?:[^<]*?[^< ])?)\~\~/g, '<strike>$1</strike>'); // strikethrough
	message = message.replace(/&lt;&lt;([a-z0-9-]+)&gt;&gt;/g, '&laquo;<a href="/$1" target="_blank">$1</a>&raquo;'); // <<roomid>>
	message = Autolinker.link(message, {stripPrefix: false, phone: false, twitter: false});
	return message;
};

Server.randomString = function (length) {
	return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
};

Server.reloadCSS = function () {
	const cssPath = ' '; // This should be the server id if Config.serverid doesn't exist. Ex: 'serverid'
	let options = {
		host: 'play.pokemonshowdown.com',
		port: 80,
		path: '/customcss.php?server=' + (Config.serverid || cssPath),
		method: 'GET',
	};
	http.get(options, () => Monitor.adminlog("Successfully reloaded the server CSS."));
};

//Daily Rewards System for SpacialGaze by Lord Haji
Server.giveDailyReward = function (userid, user) {
	if (!user || !userid) return false;
	userid = toId(userid);
	if (!Db('DailyBonus').has(userid)) {
		Db('DailyBonus').set(userid, [1, Date.now()]);
		return false;
	}
	let lastTime = Db('DailyBonus').get(userid)[1];
	if ((Date.now() - lastTime) < 86400000) return false;
	if ((Date.now() - lastTime) >= 127800000) Db('DailyBonus').set(userid, [1, Date.now()]);
	if (Db('DailyBonus').get(userid)[0] === 8) Db('DailyBonus').set(userid, [7, Date.now()]);
	Economy.writeMoney(userid, Db('DailyBonus').get(userid)[0]);
	user.send('|popup||wide||html| <center><u><strong><font size="3">Daily Bonus</font></strong></u><br>You have been awarded ' + Db('DailyBonus').get(userid)[0] + ' Buck.<br>' + showDailyRewardAni(userid) + '<br>Because you have connected to the server for the past ' + Db('DailyBonus').get(userid)[0] + ' Days.</center>');
	Db('DailyBonus').set(userid, [(Db('DailyBonus').get(userid)[0] + 1), Date.now()]);
};

function showDailyRewardAni(userid) {
	userid = toId(userid);
	let streak = Db('DailyBonus').get(userid)[0];
	let output = '';
	for (let i = 1; i <= streak; i++) {
		output += "<img src='https://www.mukuru.com/media/img/icons/new_order.png' width='16' height='16'> ";
	}
	return output;
}
