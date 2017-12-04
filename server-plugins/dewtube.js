'use strict';
/*************************
 *   Youtube Simulator   *
 *		  Plugin		 *
 *		   v1.0			 *
 *	  Coded by flufi     *
 ************************/

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

function getChannelRank(user) {
	user = toId(user);
	let channel = toId(getChannel(user));
	if (!channels[channel]) return false;
	if (!channel) return false;
	for (let rank in channels[channel].ranks) {
		if (channels[channel].ranks[rank].users.includes(user)) return channels[channel].ranks[rank].title;
	}
}
Server.getChannel = getChannel;

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

exports.commands = {
	channel: 'channels',
	channels: {
		new: "create",
		make: "create",
		create: function (target, room, user) {
			if (channel[toId(name)]) return this.errorReply('A channel with that name already exists.');
			if (getChannel(user.userid)) return this.errorReply('You already own a Youtube Channel.');

			let priv = false;
			let approve = true;
			if (!user.can('broadcast')) {
				priv = true;
				approve = false;
			}

			channels[toId(name)] = {
				name: name,
				id: toId(name),
				desc: desc,
				tag: tag,
				users: [user.userid],
				userwins: {},
				tourwins: 0,
				bank: [],
				invites: [],
				bans: [],
				private: priv,
				approved: approve,
				ranks: {
					'owner': {
						title: 'Owner',
						users: [user.userid],
					},
					'noble': {
						title: 'Noble',
						users: [],
					},
					'commoner': {
						title: 'Commoner',
						users: [],
					},
				},
			};
			write();
			Monitor.adminlog('Channel ' + name + ' was just created! If you wish to approve this channel please use /channel approve (name)');
			return this.sendReply('Channel ' + name + ' created!');
		},

		//At the moment, only staff are allowed to delete channels
		delete: function (target, room, user) {
			if (!user.can('globalban')) {
				return this.errorReply("You are not permitted to delete channels.");
				return this.errorReply("Contact a moderator to delete your channel for you.");
			}
			if (!target) return this.errorReply('/channel delete (name)');
			if (!channels[toId(target)]) return this.errorReply('That channel doesn\'t exist.');

			delete channels[toId(target)];
			write();
			this.sendReply('Channel ' + toId(target) + ' has been deleted.');
		},
	},
};