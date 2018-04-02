/********************************
 * DewTube (YouTube) Simulation	*
 * Created for Pokemon Showdown	*
 * Creators: flufi and Insist	*
 ********************************/

"use strict";

const FS = require("../lib/fs.js");

// Cooldown per video (30 minutes)
const RECORD_COOLDOWN = 30 * 60 * 1000;

// Drama Cooldown (1 hour)
const DRAMA_COOLDOWN = 60 * 60 * 1000;

// Collaboration Cooldown (2 hours)
const COLLAB_COOLDOWN = 120 * 60 * 1000;

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
	version: "1.3.5",
	changes: ["Views are now dependent on subscriber count", "Various Performance Updates", "Dashboards use channel names", "Drama Notifications", "Allow Dislikes to be higher than likes", "Collaborations between two channels"],
};

// Prevent corruptions with new data
for (let u in channels) {
	if (!channels[u].creationDate) channels[u].creationDate = Date.now() - 7100314200;
	if (channels[u].creationDate) continue;
	if (!channels[u].isMonetized) channels[u].isMonetized = false;
	if (channels[u].isMonetized) continue;
	if (!channels[u].lastTitle && channels[u].videos > 0) channels[u].lastTitle = "Untitled Video";
	if (channels[u].lastTitle) continue;
	if (!channels[u].lastThumbnail && channels[u].videos > 0) channels[u].lastThumbnail = null;
	if (channels[u].lastThumbnail) continue;
	if (!channels[u].allowingDrama) channels[u].allowingDrama = false;
	if (channels[u].allowingDrama) continue;
	if (!channels[u].lastDrama) channels[u].lastDrama = channels[u].creationDate;
	if (channels[u].lastDrama) continue;
	if (!channels[u].notifications) channels[u].notifications = true;
	if (channels[u].notifications) continue;
	if (channels[u].lastCollabed) channels[u].lastCollabed = null;
	if (channels[u].lastCollabed) continue;
}

exports.commands = {
	dewtube: {
		info: function (target, room, user) {
			if (!this.runBroadcast()) return;
			let display = `<div style="padding: 20px 20px"><center><font size="5">DewTube</font></center><br /><center><font size="3">v${config.version}</font></center><br />`;
			if (config.changes) display += Chat.toListString(config.changes);
			display += `</div>`;
			return this.sendReplyBox(display);
		},

		createchannel: "newchannel",
		create: "newchannel",
		makechannel: "newchannel",
		register: "newchannel",
		newchannel: function (target, room, user) {
			let [name, ...desc] = target.split(",").map(p => p.trim());
			if (!name || !desc) return this.parse(`/dewtubehelp`);
			if (name.length < 1 || name.length > 25) return this.errorReply(`Your channel name must be between 1-25 characters.`);
			if (desc.length < 1 || desc.length > 300) return this.errorReply(`Your channel description must be between 1-300 characters.`);
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
				lastCollabed: null,
				creationDate: Date.now(),
				likes: 0,
				dislikes: 0,
				notifications: true,
				isMonetized: false,
				lastTitle: null,
				lastThumbnail: null,
				allowingDrama: false,
				lastDrama: null,
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
			target = toId(target);
			if (!this.can("ban") && channels[target].owner !== user.userid) return this.errorReply(`You must be the channel owner or a Global Moderator (or higher) to delete a channel.`);
			if (!target || !channels[target]) return this.errorReply(`The channel "${target}" appears to not exist.`);
			delete channels[target];
			write();
			this.room.modlog(`${user.name} terminated the channel "${target}".`);
			return this.sendReply(`Channel "${target}" has been deleted.`);
		},

		channelpage: "dashboard",
		channel: "dashboard",
		dashboard: function (target, room, user) {
			if (!this.runBroadcast()) return;
			if (!target) target = toId(getChannel(user.userid));
			let channelId = toId(target);
			if (!channels[channelId]) return this.errorReply(`This is not a DewTube channel.`);
			let vidProgress = channels[channelId].vidProgress;
			let display = `<center><h2>${channels[channelId].name}</h2><strong>Creator:</strong> ${Server.nameColor(channels[channelId].owner, true, true)}`;
			if (channels[channelId].isMonetized) display += ` <strong>(Approved Partner [&#9745;])</strong>`;
			display += `<br />`;
			if (channels[channelId].aboutme) display += `<strong>About Me:</strong> ${channels[channelId].aboutme}<br />`;
			if (channels[channelId].creationDate) display += `<strong>Created:</strong> ${new Date(channels[channelId].creationDate)}<br />`;
			if (channels[channelId].views > 0) display += `<strong>View Count:</strong> ${channels[channelId].views}<br />`;
			if (channels[channelId].subscribers > 0) display += `<strong>Subscriber Count:</strong> ${channels[channelId].subscribers}<br />`;
			if (channels[channelId].likes > 0) display += `<strong>Like Count:</strong> ${channels[channelId].likes}<br />`;
			if (channels[channelId].dislikes > 0) display += `<strong>Dislike Count:</strong> ${channels[channelId].dislikes}<br />`;
			if (channels[channelId].lastTitle && vidProgress === "notStarted") display += `<strong>Last Video:</strong> ${channels[channelId].lastTitle}<br />`;
			if (channels[channelId].lastThumbnail && vidProgress === "notStarted") display += `<strong>Last Video Thumbnail:</strong><br />  <img src="${channels[channelId].lastThumbnail}" width="250" height="140"><br />`;
			if (channels[channelId].videos > 0) display += `<strong>Total Videos Uploaded:</strong> ${channels[channelId].videos}<br />`;
			if (channels[channelId].allowingDrama) display += `<small><strong>(Allowing Drama: [&#9745;])</strong></small>`;
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
			let output = `<div style="max-height: 200px; width: 100%; overflow: scroll;"><center><table border="1" cellspacing ="0" cellpadding="3"><tr><td>Channel Name</td><td>Description</td><td>Views</td><td>Subscribers</td><td>Likes</td><td>Dislikes</td><td>Dashboard</td><td>Owner</td></tr>`;
			let sortedChannels = Object.keys(channels).sort(function (a, b) {
				return channels[b].subscribers - channels[a].subscribers;
			});
			for (let channel = 0; channel < sortedChannels.length; channel++) {
				let curChannel = channels[sortedChannels[channel]];
				let aboutme = Chat.escapeHTML(curChannel.aboutme);
				if (aboutme.length > 100) aboutme = `${aboutme.substr(0, 100)}<br />${aboutme.substr(100)}`;
				output += `<tr>`;
				output += `<td>${Chat.escapeHTML(curChannel.name)}</td>`;
				output += `<td>${aboutme}</td>`;
				output += `<td>${curChannel.views}</td>`;
				output += `<td>${curChannel.subscribers}</td>`;
				output += `<td>${curChannel.likes}</td>`;
				output += `<td>${curChannel.dislikes}</td>`;
				output += `<td><button name="send" value="/dewtube dashboard ${curChannel.name}">${curChannel.name}</button></td>`;
				output += `<td>${Server.nameColor(curChannel.owner, true, true)}</td>`;
				output += `</tr>`;
			}
			output += `</table></center></div>`;
			this.sendReplyBox(output);
		},

		film: "record",
		rec: "record",
		record: function (target, room, user) {
			if (!getChannel(user.userid)) return this.errorReply(`You do not have a DewTube channel yet.`);
			let [title, ...thumbnail] = target.split(",").map(p => p.trim());
			if (!title) return this.errorReply(`Please title the video you are filming.`);
			let channelId = toId(getChannel(user.userid));
			if (Date.now() - channels[channelId].lastRecorded < RECORD_COOLDOWN) return this.errorReply(`You are on record cooldown.`);
			let videoProgress = channels[channelId].vidProgress;
			if (videoProgress !== "notStarted") return this.errorReply(`You already have a video recorded.`);
			channels[channelId].vidProgress = "recorded";
			channels[channelId].lastTitle = title;
			channels[channelId].lastThumbnail = thumbnail;
			write();
			this.sendReplyBox(`You have recorded a video titled "${title}"! Time to edit it! <button class="button" name="send" value="/dewtube edit">Edit it!</button><button class="button" name="send" value="/dewtube publish">Upload as-is!</button>`);
		},

		editvideo: "edit",
		edit: function (target, room, user) {
			if (!getChannel(user.userid)) return this.errorReply(`You do not have a DewTube channel yet.`);
			let channelId = toId(getChannel(user.userid));
			let videoProgress = channels[channelId].vidProgress;
			if (videoProgress !== "recorded") return this.errorReply(`You haven't recorded any new footage yet.`);
			channels[channelId].vidProgress = "edited";
			write();
			return this.sendReplyBox(`Almost done! Now its time to upload ${channels[channelId].lastTitle}! <button class="button" name="send" value="/dewtube publish">Publish the Video!</button>`);
		},

		pub: "publish",
		upload: "publish",
		publish: function (target, room, user) {
			if (!getChannel(user.userid)) return this.errorReply(`You do not have a DewTube channel yet.`);
			let channelId = toId(getChannel(user.userid));
			let videoProgress = channels[channelId].vidProgress;
			if (videoProgress === "notStarted") return this.errorReply(`Please record a video before uploading.`);
			let subCount = channels[channelId].subscribers;
			channels[channelId].lastRecorded = Date.now();
			channels[channelId].videos++;
			let generateEditedViews = Math.floor(Math.random() * subCount);
			if (generateEditedViews < 1) generateEditedViews = 1;
			if (subCount === 0) {
				generateEditedViews = 10;
			} else if (generateEditedViews < 1) {
				generateEditedViews = 1;
			} else {
				generateEditedViews = generateEditedViews;
			}
			let generateRawViews = Math.floor(Math.random() * Math.round(subCount / 100));
			if (subCount === 0) {
				generateRawViews = 5;
			} else if (generateRawViews < 1) {
				generateRawViews = 1;
			} else {
				generateRawViews = generateRawViews;
			}
			let generateEditedSubs = Math.floor(Math.random() * generateEditedViews);
			let generateRawSubs = Math.floor(Math.random() * generateRawViews);
			let likeDislikeRatio = Math.floor(Math.random() * 2);
			let generateEditedLikes;
			let generateEditedDislikes;
			let generateRawLikes;
			let generateRawDislikes;
			if (likeDislikeRatio === 1) {
				// More dislikes than like scenario
				generateEditedDislikes = Math.floor(Math.random() * generateEditedViews);
				generateEditedLikes = Math.floor(Math.random() * generateEditedDislikes);
				generateRawDislikes = Math.floor(Math.random() * generateRawViews);
				generateRawLikes = Math.floor(Math.random() * generateRawDislikes);
			} else {
				// More likes than dislikes scenario
				generateEditedLikes = Math.floor(Math.random() * generateEditedViews);
				generateEditedDislikes = Math.floor(Math.random() * generateEditedLikes);
				generateRawLikes = Math.floor(Math.random() * generateRawViews);
				generateRawDislikes = Math.floor(Math.random() * generateRawLikes);
			}
			if (generateEditedLikes + generateEditedDislikes > generateEditedViews) {
				generateEditedLikes = Math.round(generateEditedLikes / 2);
				generateEditedDislikes = Math.round(generateEditedDislikes / 2);
			}
			if (generateRawLikes + generateRawDislikes > generateRawViews) {
				generateRawLikes = Math.round(generateRawLikes / 2);
				generateRawDislikes = Math.round(generateRawDislikes / 2);
			}
			if (videoProgress === "edited") {
				let newSubCount = channels[channelId].subscribers + generateEditedSubs;
				let newViewCount = channels[channelId].views + generateEditedViews;
				let newLikeCount = channels[channelId].likes + generateEditedLikes;
				let newDislikeCount = channels[channelId].dislikes + generateEditedDislikes;
				channels[channelId].subscribers = newSubCount;
				channels[channelId].views = newViewCount;
				channels[channelId].likes = newLikeCount;
				channels[channelId].dislikes = newDislikeCount;
				this.sendReplyBox(`Congratulations, your video has received ${generateEditedViews} view(s). ${generateEditedSubs} people have subscribed to your channel after seeing this video. You got ${generateEditedLikes} like(s) and ${generateEditedDislikes} dislike(s).<br /> Total Sub Count: ${newSubCount}. Total View Count: ${newViewCount}. Total Likes: ${newLikeCount}. Total Dislikes: ${newDislikeCount}.`);
			} else {
				let newSubCount = channels[channelId].subscribers + generateRawSubs;
				let newViewCount = channels[channelId].views + generateRawViews;
				let newLikeCount = channels[channelId].likes + generateRawLikes;
				let newDislikeCount = channels[channelId].dislikes + generateRawDislikes;
				channels[channelId].subscribers = newSubCount;
				channels[channelId].views = newViewCount;
				channels[channelId].likes = newLikeCount;
				channels[channelId].dislikes = newDislikeCount;
				this.sendReplyBox(`Your un-edited video has received ${generateRawViews} view(s). ${generateRawSubs} people have subscribed to your channel after seeing this video. You got ${generateRawLikes} like(s) and ${generateRawDislikes} dislike(s).<br /> Total Sub Count: ${newSubCount}. Total View Count: ${newViewCount}. Total Likes: ${newLikeCount}. Total Dislikes: ${newDislikeCount}.`);
			}
			if (channels[channelId].isMonetized) {
				let demonetization = Math.floor(Math.random() * 2);
				if (demonetization === 1) {
					this.sendReplyBox(`<i>Due to your video's failure to meet community guidelines it was not approved for monetization, therefore your video has been D E M O N E T I Z E D.</i>`);
				} else {
					let adRevenue = 0;
					if (videoProgress === "recorded") {
						adRevenue = Math.round(generateRawViews / 20);
						if (adRevenue < 1) adRevenue = 1;
						if (adRevenue > 20) adRevenue = 20;
					}
					if (videoProgress === "edited") {
						adRevenue = Math.round(generateEditedViews / 100);
						if (adRevenue < 1) adRevenue = 1;
						if (adRevenue > 20) adRevenue = 20;
					}
					Economy.writeMoney(user.userid, adRevenue);
					Economy.logTransaction(`${user.name} has got ${adRevenue} ${moneyName}${Chat.plural(adRevenue)} from posting a video.`);
					this.sendReplyBox(`<i>Your video meets community guidelines and was approved for monetization. You have profited ${adRevenue} ${moneyName}${Chat.plural(adRevenue)}!</i>`);
				}
			}
			// Restart video progress
			channels[channelId].vidProgress = "notStarted";
			write();
			if (channels[channelId].notifications) {
				let notification = Date.now() - channels[channelId].lastRecorded + RECORD_COOLDOWN;
				setTimeout(() => {
					if (Users.get(user.userid)) {
						user.send(`|pm|~DewTube Manager|~|Hey ${user.name}, just wanted to let you know you can upload again!`);
					}
				}, notification);
			}
		},

		togglemonetization: "monetization",
		unmonetize: "monetization",
		monetize: "monetization",
		monetization: function (target, room, user) {
			let channelId = toId(getChannel(user.userid));
			if (!getChannel(user.userid)) return this.errorReply(`You do not have a DewTube channel yet.`);
			if (channels[channelId].subscribers < 1000) return this.errorReply(`Due to recent DewTube partnership guidelines you must have 1,000 subscribers to apply for monetization.`);
			if (channels[channelId].isMonetized) {
				channels[channelId].isMonetized = false;
				this.sendReply(`You have successfully deactivated monetization.`);
			} else {
				channels[channelId].isMonetized = true;
				this.sendReply(`You have successfully enabled monetization.`);
			}
		},

		notifications: "notify",
		videonotifications: "notify",
		toggle: "notify",
		togglenotifications: "notify",
		notify: function (target, room, user) {
			if (!getChannel(user.userid)) return this.errorReply(`You do not have a DewTube channel yet.`);
			let channelId = toId(getChannel(user.userid));
			if (channels[channelId].notifications) {
				channels[channelId].notifications = false;
				this.sendReply(`You have successfully deactivated video notifications.`);
			} else {
				channels[channelId].notifications = true;
				this.sendReply(`You have successfully enabled video notifications.`);
			}
		},

		dramaalert: "drama",
		expose: "drama",
		drama: function (target, room, user) {
			if (!getChannel(user.userid)) return this.errorReply(`You do not have a DewTube channel yet.`);
			if (!target) return this.errorReply(`Pick who you want to start drama with.`);
			let targetId = toId(target);
			let usersChannel = toId(getChannel(user.userid));
			if (!channels[targetId]) return this.errorReply(`"${target}" is not a channel.`);
			if (channels[targetId] === channels[usersChannel]) return this.errorReply(`You cannot have drama with yourself.`);
			if (!channels[targetId].allowingDrama) return this.errorReply(`${target} has disabled drama.`);
			if (channels[usersChannel].subscribers === 0 || channels[targetId].subscribers === 0) return this.errorReply(`Either yourself or the other DewTuber currently has zero subscribers.`);
			if (!channels[usersChannel].allowingDrama) return this.errorReply(`You must enable drama before starting drama.`);
			if (Date.now() - channels[usersChannel].lastDrama < DRAMA_COOLDOWN) return this.errorReply(`You are on drama cooldown.`);
			if (Date.now() - channels[targetId].lastDrama < DRAMA_COOLDOWN) return this.errorReply(`${target} is on drama cooldown.`);
			let badOutcomes = [`was exposed by ${target}.`, `was the victim of a Content Cop by ${target}.`, `was humiliated by ${target}.`, `was proven to have lied by ${target}.`, `was proven guilty by ${target}.`, `was caught faking content by ${target}.`];
			let goodOutcomes = [`won the debate against ${target}.`, `was favored by the community in an argument against ${target}.`, `proved they were innocent of ${target}'s accusations.`, `exposed ${target}.`];
			let determineOutcome = Math.floor(Math.random() * 2);
			let audience = channels[usersChannel].subscribers + channels[targetId].subscribers;
			let feedback = Math.floor(Math.random() * audience);
			let communityFeedback = Math.round(feedback / 2);
			if (communityFeedback < 1) communityFeedback = 1;
			let subChange = Math.round(communityFeedback / 10);
			if (subChange < 1) subChange = 1;
			channels[usersChannel].lastDrama = Date.now();

			if (determineOutcome === 1) {
				let outcome = goodOutcomes[Math.floor(Math.random() * goodOutcomes.length)];
				let traffic = channels[usersChannel].views + communityFeedback;
				channels[usersChannel].views = traffic;
				let subscriberTraffic = channels[usersChannel].subscribers + subChange;
				channels[usersChannel].subscribers = subscriberTraffic;
				if (channels[targetId].subscribers < subChange) {
					channels[targetId].subscribers = 0;
				} else {
					let subscribers = channels[targetId].subscribers - subChange;
					channels[targetId].subscribers = subscribers;
				}
				if (Rooms("dewtube")) Rooms("dewtube").add(`|c|$DramaAlert|/raw ${Server.nameColor(user.name, true, true)}, also known as ${getChannel(user.userid)}, ${outcome}`).update();
				this.sendReply(`You have won the drama against ${target}. This resulted in you gaining ${subChange} subscribers. This lead to ${communityFeedback} view(s) being trafficked to your channel.`);
				write();
				if (Users.get(channels[targetId].owner)) {
					Users(channels[targetId].owner).send(`|pm|${user.getIdentity()}|${channels[targetId].owner}|/raw ${Server.nameColor(user.name, true, true)} has been favored by the community in DewTube drama. This resulted in you losing ${subChange} subscriber(s).`);
				}
			} else {
				let outcome = badOutcomes[Math.floor(Math.random() * badOutcomes.length)];
				if (channels[usersChannel].subscribers < subChange) {
					channels[usersChannel].subscribers = 0;
				} else {
					let subscribers = channels[usersChannel].subscribers - subChange;
					channels[usersChannel].subscribers = subscribers;
				}
				let traffic = channels[targetId].views + communityFeedback;
				channels[targetId].views = traffic;
				let subscriberTraffic = channels[targetId].subscribers + subChange;
				channels[targetId].subscribers = subscriberTraffic;
				if (Rooms("dewtube")) Rooms("dewtube").add(`|c|$DramaAlert|/raw ${Server.nameColor(user.name, true, true)}, also known as ${getChannel(user.userid)}, ${outcome}`).update();
				this.sendReply(`You have lost the drama against ${target}. This resulted in you losing ${subChange} subscribers.`);
				write();
				if (Users.get(channels[targetId].owner)) {
					Users(channels[targetId].owner).send(`|pm|${user.getIdentity()}|${channels[targetId].owner}|/raw ${Server.nameColor(user.name, true, true)} has lost while trying to start drama with you. This resulted in you gaining ${subChange} subscriber(s). You also trafficked ${communityFeedback} view(s) from this drama.`);
				}
			}
			if (channels[usersChannel].notifications) {
				let notification = Date.now() - channels[usersChannel].lastDrama + DRAMA_COOLDOWN;
				setTimeout(() => {
					if (Users.get(user.userid)) {
						user.send(`|pm|~DewTube Manager|~|Hey ${user.name}, just wanted to let you know you can start drama again now!`);
					}
				}, notification);
			}
		},

		disabledrama: "toggledrama",
		enabledrama: "toggledrama",
		toggledrama: function (target, room, user) {
			let channelId = toId(getChannel(user.userid));
			if (!channels[channelId]) return this.errorReply(`You do not currently own a DewTube channel.`);
			if (!channels[channelId].allowingDrama) {
				channels[channelId].allowingDrama = true;
				this.sendReply(`You have enabled having drama. This means you can start or be a target of drama. If you want to disable drama again /toggledrama again.`);
			} else {
				channels[channelId].allowingDrama = false;
				this.sendReply(`You have disabled having drama. This means you cannot start or be a target of drama. If you want to enable drama again /toggledrama again.`);
			}
			write();
		},
		/*
		collaborate: "collab",
		collab: function (target, room, user) {
			let usersChannel = toId(getChannel(user.userid));
			if (!channels[usersChannel]) return this.errorReply(`You do not currently own a DewTube channel.`);
			if (!target) return this.errorReply("Please specify a channel you would like to collaborate with.");
			let targetId = toId(target);
			if (!channels[targetId]) return this.errorReply(`"${target}" is not a channel.`);
			let combinedSubCount = channels[usersChannel].subscribers + channels[targetId].subscribers;
			if (Date.now() - channels[usersChannel].lastCollabed < COLLAB_COOLDOWN) return this.errorReply(`You are on collaboration cooldown.`);
			if (Date.now() - channels[targetId].lastCollabed < COLLAB_COOLDOWN) return this.errorReply(`${target} is on collaboration cooldown.`);
			if (Date.now() - channels[usersChannel].lastRecorded < RECORD_COOLDOWN) return this.errorReply(`You are on record cooldown.`);
			if (Date.now() - channels[targetId].lastRecorded < RECORD_COOLDOWN) return this.errorReply(`${target} is on record cooldown.`);
			channels[usersChannel].lastCollabed = Date.now();
			channels[targetId].lastCollabed = Date.now();
			channels[usersChannel].lastRecorded = Date.now();
			channels[targetId].lastRecorded = Date.now();
			channels[usersChannel].lastTitle = `Collab with ${channels[targetId].name}!`;
			channels[targetId].lastTitle = `Collab with ${channels[usersChannel].name}!`;
			let generatedViewCount = Math.floor(Math.random() * combinedSubCount);
			let generatedSubCount = Math.floor(Math.random() * generatedViewCount);
			let userSubGain = channels[usersChannel].subscribers + generatedSubCount;
			let userViewGain = channels[usersChannel].views + generatedViewCount;
			let collabSubGain = channels[targetId].subscribers + generatedSubCount;
			let collabViewGain = channels[targetId].views + generatedViewCount;
			channels[usersChannel].subscribers = userSubGain;
			channels[usersChannel].views = userViewGain;
			channels[targetId].subscribers = collabSubGain;
			channels[targetId].views = collabViewGain;
			this.sendReply(`You have collaborated in a video with ${target}. You both gained ${generatedViewCount} view(s) and ${generatedSubCount} subscriber(s) as a result.`);
			write();
			if (Users.get(channels[targetId].owner)) {
				Users(channels[targetId].owner).send(`|pm|~DewTube Manager|~|${user.name} has collaborated with you! As a result, you both gained ${generatedViewCount} view(s) and ${generatedSubCount} subscriber(s).`);
			}
			if (channels[usersChannel].notifications) {
				let notification = Date.now() - channels[usersChannel].lastCollabed + COLLAB_COOLDOWN;
				setTimeout(() => {
					if (Users.get(user.userid)) {
						user.send(`|pm|~DewTube Manager|~|Hey ${user.name}, just wanted to let you know you can collab again now!`);
					}
				}, notification);
			}
			if (channels[targetId].notifications) {
				let notification = Date.now() - channels[targetId].lastCollabed + COLLAB_COOLDOWN;
				setTimeout(() => {
					if (Users.get(channels[targetId].owner)) {
						Users(channels[targetId].owner).send(`|pm|~DewTube Manager|~|Hey ${channels[targetId].owner}, just wanted to let you know you can collab again now!`);
					}
				}, notification);
			}
		},
		*/

		"": "help",
		help: function () {
			this.parse("/dewtubehelp");
		},
	},

	dewtubehelp: [
		`/dewtube create [name], [description] - Creates a DewTube channel.
		/dewtube delete [name] - Deletes a DewTube channel. If the channel is not yours, you must have Global Moderator or higher.
		/dewtube desc [description] - Edits your DewTube channel's about me.
		/dewtube record [title], [optional thumbnail link] - Films a DewTube video.
		/dewtube edit - Edits a DewTube video.
		/dewtube publish - Publishs a DewTube video.
		/dewtube monetization - Toggles monetization on your DewTube videos. Must have 1,000 subscribers.
		/dewtube drama [channel name] - Starts drama against the other channel. Both parties must have drama enabled.
		/dewtube toggledrama - Toggles on/off starting/being a target of drama.
		/dewtube collab [channel name] - Record a collaboration video with another channel. Both channels must be off of record cooldown and collab cooldown.
		/dewtube notify - Toggles on/off video notifications alerting you when you can upload next and notifications for when your drama cooldown is finished.
		/dewtube dashboard [channel name] - Shows the channel's dashboard; defaults to yourself.
		/dewtube info - Shows the DewTube version and recent changes.
		/dewtube discover - Shows all of the DewTube channels.
		/dewtube help - Displays this help command.`,
	],
};
