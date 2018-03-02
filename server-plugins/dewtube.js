/********************************
 * DewTube (YouTube) Simulation	*
 * Created for Pokemon Showdown	*
 * Creators: flufi and Insist	*
 ********************************/

"use strict";

const FS = require("../lib/fs.js");

// Cooldown per video (30 minutes)
const RECORD_COOLDOWN = 30 * 60 * 1000;

let channels = FS("config/channels.json").readIfExistsSync();

if (channels !== "") {
	channels = JSON.parse(channels);
} else {
	channels = {};
}

function write() {
	FS("config/channels.json").writeUpdate(() => (
		JSON.stringify(channels)
	));
	let data = "{\n";
	for (let u in channels) {
		data += '\t"' + u + '": ' + JSON.stringify(channels[u]) + ",\n";
	}
	data = data.substr(0, data.length - 2);
	data += "\n}";
	FS("config/channels.json").writeUpdate(() => (
		data
	));
}

function getChannel(user) {
	user = toId(user);
	let reply;
	for (let channel in channels) {
		if (channels[channel].owner === user) {
			reply = channels[channel].name;
			break;
		}
	}
	return reply;
}
Server.getChannel = getChannel;

//Plugin Optimization
let config = {
	version: "1.0.1 Early Access Alpha",
	changes: `DewTube Changes Feature, Sub & Views Math changes, Video Cooldown.`,
};

exports.commands = {
	dewtube: {
		info: function (target, room, user) {
			if (!this.runBroadcast()) return;
			let display = `<div style="padding: 20px 20px"><center><font size="5">DewTube</font></center><br /><center><font size="3">v${config.version}</font></center><br />`;
			if (config.changes) display += config.changes;
			display += `</div>`;
			return this.sendReplyBox(display);
		},

		createchannel: "newchannel",
		create: "newchannel",
		makechannel: "newchannel",
		register: "newchannel",
		newchannel: function (target, room, user) {
			target = target.split(",").map(p => p.trim());
			let name = target[0];
			let desc = target[1];
			if (name.length < 1 || name.length > 25) return this.errorReply(`Your channel name must be between 1-25 characters.`);
			if (desc.length < 1 || desc.length > 300) return this.errorReply(`Your channel description must be between 1-300 characters.`);
			if (!name || !desc) return this.parse(`/dewtubehelp`);
			if (channels[toId(name)]) return this.errorReply(`${name} already is a DewTube channel.`);
			if (getChannel(user.userid)) return this.errorReply(`You already have a DewTube channel.`);
			channels[toId(name)] = {
				id: toId(name),
				name: name,
				aboutme: desc,
				views: 0,
				videos: 0,
				subscribers: 0,
				owner: user.userid,
				vidProgress: "notStarted",
				lastRecorded: null,
			};
			write();
			return this.sendReply(`You successfully created your DewTube channel "${name}"! To view your channel's stats, use /dewtube dashboard.`);
		},

		deletechannel: "removechannel",
		delchannel: "removechannel",
		delete: "removechannel",
		terminatechannel: "removechannel",
		terminate: "removechannel",
		removechannel: function (target, room, user) {
			if (!this.can("ban") && channels[toId(target)].owner !== user.userid) return this.errorReply(`You must be the channel owner or a Global Moderator (or higher) to delete a channel.`);
			if (!target || !channels[toId(target)]) return this.errorReply(`The channel "${target}" appears to not exist.`);
			delete channels[toId(target)];
			write();
			return this.sendReply(`Channel "${target}" has been deleted.`);
			this.room.modlog(`${user.name} deleted the channel "${target}".`);
		},

		channelpage: "dashboard",
		channel: "dashboard",
		dashboard: function (target, room, user) {
			if (!this.runBroadcast()) return;
			let channelId = toId(getChannel(user.userid));
			if (!channels[channelId]) return this.errorReply(`You do not currently own a DewTube channel.`);
			let display = `<center><h2>${channels[channelId].name}</h2><strong>Creator:</strong> ${Server.nameColor(channels[channelId].owner, true, true)}<br />`;
			if (channels[channelId].aboutme) display += `<strong>About Me:</strong> ${channels[channelId].aboutme}<br />`;
			if (channels[channelId].views > 0) display += `<strong>View Counts:</strong> ${channels[channelId].views}<br />`;
			if (channels[channelId].subscribers > 0) display += `<strong>Sub Count:</strong> ${channels[channelId].subscribers}<br />`;
			if (channels[channelId].videos > 0) display += `<strong>Total Videos Uploaded:</strong> ${channels[channelId].videos}<br />`;
			display += `</center>`;
			return this.sendReplyBox(display);
		},

		aboutme: "desc",
		description: "desc",
		desc: function (target, room, user) {
			let channelId = toId(getChannel(user.userid));
			if (!channels[channelId]) return this.errorReply(`You do not currently own a DewTube channel.`);
			if (!target || target.length > 300) return this.errorReply("Needs a target; no more than 300 characters.");
			channels[channelId].aboutme = target;
			write();
			return this.sendReplyBox(`Your channel description is now set to: <br /> ${channels[channelId].aboutme}.`);
		},

		channellist: "discover",
		listchannels: "discover",
		channelslist: "discover",
		channels: "discover",
		socialblade: "discover",
		list: "discover",
		discover: function (target, room, user) {
			if (!this.runBroadcast()) return;
			if (Object.keys(channels).length < 1) return this.errorReply(`There are currently no DewTube channels in this server.`);
			let output = `<center><table border="1" cellspacing ="0" cellpadding="3"><tr><td>Channel Name</td><td>Description</td><td>Views</td><td>Subscribers</td></tr>`;
			let sortedChannels = Object.keys(channels).sort(function (a, b) {
				return channels[b].subscribers - channels[a].subscribers;
			});
			for (let channel = 0; channel < sortedChannels.length; channel++) {
				let curChannel = channels[sortedChannels[channel]];
				let aboutme = Chat.escapeHTML(curChannel.aboutme);
				if (aboutme.length > 100) aboutme = `${aboutme.substr(0, 100)}<br />${aboutme.substr(100)}`;
				if (!curChannel.private) {
					output += `<tr>`;
					output += `<td>${Chat.escapeHTML(curChannel.name)}</td>`;
					output += `<td>${aboutme}</td>`;
					output += `<td>${curChannel.views}</td>`;
					output += `<td>${curChannel.subscribers}</td>`;
					output += `</tr>`;
				}
			}
			output += `</table></center>`;
			this.sendReplyBox(output);
		},

		film: "record",
		rec: "record",
		record: function (target, room, user) {
			if (!getChannel(user.userid)) return this.errorReply(`You do not have a DewTube channel yet.`);
			let channelId = toId(getChannel(user.userid));
			if (Date.now() - channels[channelId].lastRecorded < RECORD_COOLDOWN) return this.errorReply(`You are on record cooldown.`);
			let videoProgress = channels[channelId].vidProgress;
			if (videoProgress !== "notStarted") return this.errorReply(`You already have a video recorded.`);
			channels[channelId].vidProgress = "recorded";
			channels[channelId].lastRecorded = Date.now();
			write();
			return this.sendReplyBox(`You have recorded a video! Time to edit it! <button class="button" name="send" value="/dewtube edit">Edit it!</button>`);
		},

		editvideo: "edit",
		edit: function (target, room, user) {
			if (!getChannel(user.userid)) return this.errorReply(`You do not have a DewTube channel yet.`);
			let channelId = toId(getChannel(user.userid));
			let videoProgress = channels[channelId].vidProgress;
			if (videoProgress !== "recorded") return this.errorReply(`You haven't recorded any new footage yet.`);
			channels[channelId].vidProgress = "edited";
			write();
			return this.sendReplyBox(`Almost done! Now its time to upload! <button class="button" name="send" value="/dewtube publish">Publish the Video!</button>`);
		},

		pub: "publish",
		upload: "publish",
		publish: function (target, room, user) {
			if (!getChannel(user.userid)) return this.errorReply(`You do not have a DewTube channel yet.`);
			let channelId = toId(getChannel(user.userid));
			let videoProgress = channels[channelId].vidProgress;
			channels[channelId].videos++;
			let generateEditedViews = Math.floor(Math.random() * 1000);
			let generateRawViews = Math.floor(Math.random() * 100);
			let generateEditedSubs = Math.floor(Math.random() * 100);
			let generateRawSubs = Math.floor(Math.random() * 50);
			if (videoProgress === "edited") {
				let newSubCount = channels[channelId].subscribers + generateEditedSubs;
				let newViewCount = channels[channelId].views + generateEditedViews;
				channels[channelId].subscribers = newSubCount;
				channels[channelId].views = newViewCount;
				this.sendReplyBox(`Congratulations your video has received ${generateEditedViews} view(s). ${generateEditedSubs} have subscribed to your channel after seeing this video. Total Sub Count: ${newSubCount}. Total View Count: ${newViewCount}.`);
			} else if (videoProgress === "recorded") {
				let newSubCount = channels[channelId].subscribers + generateRawSubs;
				let newViewCount = channels[channelId].views + generateRawViews;
				channels[channelId].subscribers = newSubCount;
				channels[channelId].views = newViewCount;
				this.sendReplyBox(`Your un-edited video has received ${generateRawViews} view(s). ${generateRawSubs} have subscribed to your channel after seeing this video. Total Sub Count: ${newSubCount}. Total View Count: ${newViewCount}.`);
			} else {
				this.errorReply(`You must record a video before uploading.`);
			}
			// Restart video progress
			channels[channelId].vidProgress = "notStarted";
			write();
		},

		"": "help",
		help: function () {
			this.parse("/dewtubehelp");
		},
	},

	dewtubehelp: [
		`/dewtube create [name], [description] - Creates a DewTube channel.
		/dewtube delete [name] - Deletes a DewTube channel. If the channel is not yours, you must have Global Moderator or higher.
		/dewtube desc [description] - Edits your DewTube channel's about me.
		/dewtube record - Films a DewTube video.
		/dewtube edit - Edits a DewTube video.
		/dewtube publish - Publishs a DewTube video.
		/dewtube dashboard - Shows the channel's dashboard.
		/dewtube info - Shows the DewTube version and other information.
		/dewtube discover - Shows all of the DewTube channels.
		/dewtube help - Displays this help command.`,
	],
};
