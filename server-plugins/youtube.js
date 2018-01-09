'use strict';

let channels = {};
const fs = require('fs');

try {
	channels = JSON.parse(fs.readFileSync('config/channels.json', 'utf8'));
} catch (e) {
	if (e.code !== 'ENOENT') throw e;
}

function getChannel(user) {
	user = toId(user);
	let reply;
	for (let channel in channels) {
		if (channels[channel].users.includes(user)) {
			reply = channels[channel].name;
			break;
		}
	}
	return reply;
}
Server.getChannel = getChannel;

let statuses = ["bad", "boring", "decent", "pretty good", "fantastic"];
let gennedViews;
let gennedSubs;

function generateViews(min, max) {
	gennedViews = Math.floor(Math.random() * (max - min) + min);
	return gennedViews;
}

function generateSubs(min, max) {
	gennedSubs = Math.floor(Math.random() * (max - min) + min);
	return gennedSubs;
}

function write() {
	if (Object.keys(channels).length < 1) return fs.writeFileSync('config/channels.json', JSON.stringify(channels));
	let data = "{\n";
	for (let u in channels) {
		data += '\t"' + u + '": ' + JSON.stringify(channels[u]) + ",\n";
	}
	data = data.substr(0, data.length - 2);
	data += "\n}";
	fs.writeFileSync('config/channels.json', data);
}
function getChannelRank(user) {
	user = toId(user);
	let channel = toId(getChannel(user));
	if (!channels[channel]) return false;
	if (!channel) return false;
	for (let rank in channels[channel].ranks) {
		if (channels[channel].ranks[rank].users.includes(user)) return channels[channel].ranks[rank].title;
	}
}

//Plugin Optimization
let version = '1.0';
let pluginName = 'DewTube';

exports.commands = {
	'!yt': true,
	dewtube: "yt",
	yt: function () {
		if (!this.runBroadcast()) return;
		return this.sendReplyBox(
			'<div style="padding: 20px 20px"><center><font size="5">' + pluginName + ' Alpha</font><br />' +
			'<font size="3">v' + version + '</font><br /><br />' +
			pluginName + ' is made with a YouTube simulator engine developed by flufi.<br />' +
			'We\'re currently in the Alpha stage in development.<br />' +
			'If you have any suggestions for  the project, feel free to comment!<br /></center><div>'
		);
	},
	createchannel: 'newchannel',
	newchannel: function (target, user) {
		if (getChannel(user.userid)) {
			return this.sendReplyBox(
				'<div style="padding: 20px 20px"><center>You already own a channel.<br />' +
				'If you want to start fresh, ask a moderator to delete your channel so you can restart.<br /><br />' +
				'If you do not own a channel and you\'re still getting this message, contact a staff member for assistance.</center></div>'
			);
		}
		let targets = target.split(',');
		for (let u = 0; u < targets.length; u++) targets[u] = targets[u].trim();
		if (!targets[1]) return this.errorReply('/createchannel (name), (description)');
		let name = targets[0];
		let desc = targets[1];
		if (desc.length > 80) {
			return this.sendReplyBox(
				'<div style="padding: 20px 20px"><center>Channel descriptions must be 80 characters or less.</center></div>'
			);
		};
		if (channels[toId(name)]) {
			return this.sendReplyBox(
				'<div style="padding: 20px 20px"><center>A channel with that name already exists.<br /><br />' +
				'</center>Come up with a different name, or try one of these instead:</div>'
			);
		}
		channels[toId(name)] = {
			name: name,
			id: toId(name),
			desc: desc,
			users: [user.userid],
		};
		write();
		return this.sendReplyBox('<div style="padding: 20px 20px"><center>You successfully created your Youtube channel!<br />To view your channel\'s stats, use /dashboard.</center></div>');
	},
	deletechannel: 'removechannel',
	delchannel: 'removechannel',
	removechannel: function (target, room, user) {
		if (!this.can('ban')) {
			return this.sendReplyBox(
				'<div style="padding: 20px 20px"><center>Due to vulnerability to abuse, only staff members can delete channels.<br />' +
				'If you want yours deleted, PM an online moderator.</center><div>'
			);
		}
		if (!target || !channels[toId(target)]) {
			return this.sendReplyBox(
				'<div style="padding: 10px 10px"><center>Please specify a valid channel.</center><div>'
			);
		}
		delete channels[toId(target)];
		write();
		return this.sendReplyBox(`<div style="padding: 10px 10px"><center>Channel "${target}" has been deleted.</center><div>`);
		this.room.modlog(user.name + ' deleted the channel "' + target + '".');
	},
	'!dashboard': true,
	channelpage: 'dashboard',
	channel: 'dashboard',
	dashboard: function (target, room, user) {
		let channel;
		if (!this.runBroadcast()) return;
		if (!channel) {
			return this.sendReplyBox(
				'<div style="padding: 20px 20px"><center>You do not own a channel.<br />' +
				'Use /createchannel to create a new Youtube channel.<br /><br />' +
				'If you do own a channel and you\'re still getting this message, contact a staff member for assistance.</center><div>'
			);
		}
	},
	channellist: 'discover',
	listchannels: 'discover',
	channelslist: 'discover',
	channels: 'discover',
	discover: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (Object.keys(channels).length < 1) return this.sendReplyBox('<div style="padding: 10px 10px"><center>There are currently no existing channels.</center></div>');
		let output = `<center><table border="1" cellspacing ="0" cellpadding="3"><tr><td>Channel Name</td><td>Description</td><td>Views</td><td>Subscribers</td></tr>`;
		let sortedChannels = Object.keys(channels).sort(function (a, b) {
			return channels[b].points - channels[a].points;
		});
		for (let channel = 0; channel < sortedChannels.length; channel++) {
			let curChannel = channels[sortedChannels[channel]];
			let desc = Chat.escapeHTML(curChannel.desc);
			if (desc.length > 50) desc = `${desc.substr(0, 50)}<br />${desc.substr(50)}`;
			if (!curChannel.private) {
				output += `<tr>`;
				output += `<td>${Chat.escapeHTML(curChannel.name)}</td>`;
				output += `<td>${desc}</td>`;
				output += `<td>${curChannel.viewCount}</td>`;
				output += `<td><button name="send" value="/dashboard ${curChannel.id}">${curChannel.subCount}</button></td>`;
				output += `</tr>`;
			}
		}
		output += `</table></center>`;
		this.sendReplyBox(output);
	},
	//simulation of recording will be condensed into a function in later versions to reduce the amount of code inside the command.
	recordvideo: 'record',
	record: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let videoStatus = statuses[Math.floor(Math.random() * statuses.length)];
		if (videoStatus === "bad") {
			generateViews(0, 100);
		} else if (videoStatus === "boring") {
			generateViews(101, 250);
		} else if (videoStatus === "decent") {
			generateViews(251, 500);
		} else if (videoStatus === "pretty good") {
			generateViews(501, 750);
		} else if (videoStatus === "fantastic") {
			generateViews(751, 1000);
		}
		let views = gennedViews;

		if (videoStatus === "bad") {
			generateSubs(0, 3);
		} else if (videoStatus === "boring") {
			generateSubs(0, 5);
		} else if (videoStatus === "decent") {
			generateSubs(0, 12);
		} else if (videoStatus === "pretty good") {
			generateSubs(0, 15);
		} else if (videoStatus === "fantastic") {
			generateSubs(0, 20);
		}
		let subs = gennedSubs;
		return this.sendReplyBox(
			`<div style="padding: 20px 20px"><center>You record and upload your video.<br /><br />` +
			`Your video came out to be ${videoStatus}. It received ${views} views.<br />` +
			`The video also gained you ${subs} subscriber(s).</center><div>`
		);
	},
	testrecord: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let videoStatus = statuses[Math.floor(Math.random() * statuses.length)];
		if (videoStatus === "bad") {
			generateViews(0, 100);
		} else if (videoStatus === "boring") {
			generateViews(101, 250);
		} else if (videoStatus === "decent") {
			generateViews(251, 500);
		} else if (videoStatus === "pretty good") {
			generateViews(501, 750);
		} else if (videoStatus === "fantastic") {
			generateViews(751, 1000);
		}
		let views = gennedViews;

		if (videoStatus === "bad") {
			generateSubs(0, 3);
		} else if (videoStatus === "boring") {
			generateSubs(0, 5);
		} else if (videoStatus === "decent") {
			generateSubs(0, 12);
		} else if (videoStatus === "pretty good") {
			generateSubs(0, 15);
		} else if (videoStatus === "fantastic") {
			generateSubs(0, 20);
		}
		let subs = gennedSubs;
		return this.sendReplyBox(
			`<div style="padding: 20px 20px"><center>You record and upload your video.<br /><br />` +
			`Your video came out to be ${videoStatus}. It received ${views} views.<br />` +
			`The video also gained you ${subs} subscriber(s).</center><div>`
		);
	},
};
