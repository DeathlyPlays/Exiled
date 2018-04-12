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

// Collaboration Cooldown (6 hours)
const COLLAB_COOLDOWN = 6 * 60 * 60 * 1000;

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
	version: "2.0.2.2",
	changes: ["Math changed for large & small creators", "Nerf Collabs", "Titles now affect your monetization chance", "Likes/Dislikes Ratio Math Re-done", "If dislikes are higher than your likes, DewTube demonetizes your video", "Collab Cooldown is now 6 hours", "Collabs now must be accepted", "Numbers now use commas appropriately", "Fix Collab Issues", "People will unsubscribe if they dislike your videos"],
	// Basic Filter for Instant Demonetization
	filter: ["nsfw", "porn", "sex", "shooting"],
};

function collab(channel1, channel2) {
	channel1 = toId(channel1);
	channel2 = toId(channel2);
	let combinedSubs = channels[channel1].subscribers + channels[channel2].subscribers;
	let traffic = Math.floor(Math.random() * combinedSubs);
	if (traffic > 1000000) {
		// If the views will be over 1 million, half them so collaborations aren't entirely "broken"
		traffic = Math.round(traffic / 2);
	}
	return traffic;
}

exports.commands = {
	dewtube: {
		info: function () {
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
				strikes: 0,
				pendingCollab: null,
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
			if (channels[channelId].views > 0) display += `<strong>View Count:</strong> ${channels[channelId].views.toLocaleString()}<br />`;
			if (channels[channelId].subscribers > 0) display += `<strong>Subscriber Count:</strong> ${channels[channelId].subscribers.toLocaleString()}<br />`;
			if (channels[channelId].likes > 0) display += `<strong>Like Count:</strong> ${channels[channelId].likes.toLocaleString()}<br />`;
			if (channels[channelId].dislikes > 0) display += `<strong>Dislike Count:</strong> ${channels[channelId].dislikes.toLocaleString()}<br />`;
			if (channels[channelId].lastTitle && vidProgress === "notStarted") display += `<strong>Last Video:</strong> ${channels[channelId].lastTitle}<br />`;
			if (channels[channelId].lastThumbnail && vidProgress === "notStarted") display += `<strong>Last Video Thumbnail:</strong><br />  <img src="${channels[channelId].lastThumbnail}" width="250" height="140"><br />`;
			if (channels[channelId].videos > 0) display += `<strong>Total Videos Uploaded:</strong> ${channels[channelId].videos.toLocaleString()}<br />`;
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
		discover: function () {
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
				output += `<td>${curChannel.views.toLocaleString()}</td>`;
				output += `<td>${curChannel.subscribers.toLocaleString()}</td>`;
				output += `<td>${curChannel.likes.toLocaleString()}</td>`;
				output += `<td>${curChannel.dislikes.toLocaleString()}</td>`;
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
			// Filter if the title is deemed "inappropriate"
			for (let badWord of config.filter) {
				// This is basically so we can standardize and check titles more efficiently as IDs would remove spaces etc
				let lowercaseTitle = target.toLowerCase();
				// Go ahead and warn them :^)
				if (lowercaseTitle.includes(badWord)) this.sendReply(`Your title "${target}" doesn't seem very ad-friendly to our sponsors.`);
			}
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
			let title = channels[channelId].lastTitle;
			let generateEditedViews = Math.floor(Math.random() * subCount);
			let generateRawViews = Math.floor(Math.random() * Math.round(subCount / 100));
			// Factor in Sub Count conditions to support starting DewTubers (it's rough starting out)
			if (subCount === 0) {
				generateEditedViews = 10;
				generateRawViews = 5;
			} else if (subCount > 0 && subCount < 1000) {
				// Multiply views by 1.5x if they have less than 1,000 subscribers
				generateEditedViews = Math.round(generateEditedViews * 1.5);
				generateRawViews = Math.round(generateRawViews * 1.5);
			} else if (subCount > 1000 && subCount < 100000) {
				// Factor in inactive subscribers
				let inactivity = Math.floor(Math.random() * 10);
				generateEditedViews = Math.round(generateEditedViews / inactivity);
				generateRawViews = Math.round(generateRawViews / inactivity);
			} else if (subCount > 100000) {
				// Factor in inactive subscribers
				let inactivity = Math.floor(Math.random() * 100);
				generateEditedViews = Math.round(generateEditedViews / inactivity);
				generateRawViews = Math.round(generateRawViews / inactivity);
			} else {
				generateEditedViews = generateEditedViews;
				generateRawViews = generateRawViews;
			}
			if (videoProgress === "edited" && generateEditedViews < 1) {
				generateEditedViews = 1;
			} else if (videoProgress === "recorded" && generateRawViews < 1) {
				generateRawViews = 1;
			} else {
				generateEditedViews = generateEditedViews;
				generateRawViews = generateRawViews;
			}
			let loveHateRatio = Math.floor(Math.random() * 100);
			let generateEditedSubs;
			let generateEditedUnsubs;
			let generateEditedLikes;
			let generateEditedDislikes;
			let generateRawSubs;
			let generateRawUnsubs;
			let generateRawLikes;
			let generateRawDislikes;
			// 70% chance to have positive feedback; 30% chance for negative feedback
			if (loveHateRatio >= 70) {
				// More dislikes than like scenario
				generateEditedUnsubs = Math.floor(Math.random() * generateEditedViews);
				generateEditedSubs = Math.floor(Math.random() * generateEditedUnsubs);
				generateEditedDislikes = Math.floor(Math.random() * generateEditedViews);
				generateEditedLikes = Math.floor(Math.random() * generateEditedDislikes);
				generateRawUnsubs = Math.floor(Math.random() * generateRawViews);
				generateRawSubs = Math.floor(Math.random() * generateRawUnsubs);
				generateRawDislikes = Math.floor(Math.random() * generateRawViews);
				generateRawLikes = Math.floor(Math.random() * generateRawDislikes);
			} else {
				// More likes than dislikes scenario
				generateEditedSubs = Math.floor(Math.random() * generateEditedViews);
				generateEditedUnsubs = Math.floor(Math.random() * generateEditedSubs);
				generateEditedLikes = Math.floor(Math.random() * generateEditedViews);
				generateEditedDislikes = Math.floor(Math.random() * generateEditedLikes);
				generateRawSubs = Math.floor(Math.random() * generateRawViews);
				generateRawUnsubs = Math.floor(Math.random() * generateRawSubs);
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
			if (generateEditedSubs + generateEditedUnsubs > generateEditedViews) {
				generateEditedSubs = Math.round(generateEditedSubs / 2);
				generateEditedUnsubs = Math.round(generateEditedUnsubs / 2);
			}
			if (generateRawSubs + generateRawUnsubs > generateRawViews) {
				generateRawSubs = Math.round(generateRawSubs / 2);
				generateRawUnsubs = Math.round(generateRawUnsubs / 2);
			}
			if (generateEditedSubs < 1) generateEditedSubs = 1;
			if (generateRawSubs < 1) generateRawSubs = 1;
			if (videoProgress === "edited") {
				let positiveSubs = generateEditedSubs + channels[channelId].subscribers;
				let newViewCount = channels[channelId].views + generateEditedViews;
				let newLikeCount = channels[channelId].likes + generateEditedLikes;
				let newDislikeCount = channels[channelId].dislikes + generateEditedDislikes;
				channels[channelId].subscribers = positiveSubs;
				channels[channelId].views = newViewCount;
				channels[channelId].likes = newLikeCount;
				channels[channelId].dislikes = newDislikeCount;
				this.sendReplyBox(`Congratulations, your video titled "${title}" has received ${generateEditedViews.toLocaleString()} view${Chat.plural(generateEditedViews)}. ${generateEditedSubs.toLocaleString()} ${generateEditedSubs === 1 ? "person has" : "people have"} subscribed to your channel after seeing this video. You got ${generateEditedLikes.toLocaleString()} like${Chat.plural(generateEditedLikes)} and ${generateEditedDislikes.toLocaleString()} dislike${Chat.plural(generateEditedDislikes)}.<br /> Total Sub Count: ${positiveSubs.toLocaleString()}. Total View Count: ${newViewCount.toLocaleString()}. Total Likes: ${newLikeCount.toLocaleString()}. Total Dislikes: ${newDislikeCount.toLocaleString()}.`);
			} else {
				let positiveSubs = generateRawSubs + channels[channelId].subscribers;
				let newViewCount = channels[channelId].views + generateRawViews;
				let newLikeCount = channels[channelId].likes + generateRawLikes;
				let newDislikeCount = channels[channelId].dislikes + generateRawDislikes;
				channels[channelId].subscribers = positiveSubs;
				channels[channelId].views = newViewCount;
				channels[channelId].likes = newLikeCount;
				channels[channelId].dislikes = newDislikeCount;
				this.sendReplyBox(`Your un-edited video titled "${title}" has received ${generateRawViews.toLocaleString()} view${Chat.plural(generateRawViews)}. ${generateRawSubs.toLocaleString()} ${generateRawSubs === 1 ? "person has" : "people have"} subscribed to your channel after seeing this video. You got ${generateRawLikes.toLocaleString()} like${Chat.plural(generateRawLikes)} and ${generateRawDislikes.toLocaleString()} dislike${Chat.plural(generateRawDislikes)}.<br /> Total Sub Count: ${positiveSubs.toLocaleString()}. Total View Count: ${newViewCount.toLocaleString()}. Total Likes: ${newLikeCount.toLocaleString()}. Total Dislikes: ${newDislikeCount.toLocaleString()}.`);
			}
			if (channels[channelId].isMonetized) {
				let demonetization = Math.floor(Math.random() * 100);
				// Sorry that video seems un-friendly to the advertisers :^)
				for (let badWords of config.filter) {
					// This is basically so we can standardize and check titles more efficiently as IDs would remove spaces etc
					let lowercaseTitle = title.toLowerCase();
					if (lowercaseTitle.includes(badWords)) demonetization = 90;
				}
				// If the demonetization number or more dislikes were given than likes then DewTube demonetizes the user
				if (demonetization >= 70 || loveHateRatio >= 70) {
					this.sendReplyBox(`<i>Due to your video's failure to meet community guidelines it was not approved for monetization, therefore your video has been D E M O N E T I Z E D.</i>`);
				} else {
					let adRevenue = 0;
					if (videoProgress === "recorded") {
						adRevenue = Math.round(generateRawViews / 20);
					}
					if (videoProgress === "edited") {
						adRevenue = Math.round(generateEditedViews / 100);
					}
					if (adRevenue < 1) adRevenue = 1;
					if (adRevenue > 20) adRevenue = 20;
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
		demonetize: "monetization",
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
				this.sendReply(`You have won the drama against ${target}. This resulted in you gaining ${subChange.toLocaleString()} subscribers. This lead to ${communityFeedback.toLocaleString()} view${Chat.plural(communityFeedback)} being trafficked to your channel.`);
				write();
				if (Users.get(channels[targetId].owner)) {
					Users(channels[targetId].owner).send(`|pm|${user.getIdentity()}|${channels[targetId].owner}|/raw ${Server.nameColor(user.name, true, true)} has been favored by the community in DewTube drama. This resulted in you losing ${subChange.toLocaleString()} subscriber${Chat.plural(subChange)}.`);
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
				this.sendReply(`You have lost the drama against ${target}. This resulted in you losing ${subChange.toLocaleString()} subscriber${Chat.plural(subChange)}.`);
				write();
				if (Users.get(channels[targetId].owner)) {
					Users(channels[targetId].owner).send(`|pm|${user.getIdentity()}|${channels[targetId].owner}|/raw ${Server.nameColor(user.name, true, true)} has lost while trying to start drama with you. This resulted in you gaining ${subChange.toLocaleString()} subscriber${Chat.plural(subChange)}. You also trafficked ${communityFeedback.toLocaleString()} view${Chat.plural(communityFeedback)} from this drama.`);
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
		},

		collab: "collaborate",
		collaborate: function (target, room, user) {
			if (!target) return this.parse(`/dewtubehelp`);
			let channelId = toId(getChannel(user.userid));
			if (!channels[channelId]) return this.errorReply(`You do not currently own a DewTube channel.`);
			let targetId = toId(target);
			if (!channels[targetId]) return this.errorReply(`"${target}" is not a channel.`);
			if (channels[targetId] === channels[channelId]) return this.errorReply(`You cannot collaborate with yourself (what would be the point?).`);
			// Check if the channel's owner is online (so the system can PM the user and avoid the chances the collaboration request will not be seen)
			if (!Users.get(channels[targetId].owner) || !Users.get(channels[targetId].owner).connected) return this.errorReply(`The owner of ${target} is not online.`);
			// Check if both user's are available to record a video and collab
			if (Date.now() - channels[channelId].lastCollabed < COLLAB_COOLDOWN) return this.errorReply(`You are on collaboration cooldown.`);
			if (Date.now() - channels[targetId].lastCollabed < COLLAB_COOLDOWN) return this.errorReply(`${target} is on collaboration cooldown.`);
			if (Date.now() - channels[channelId].lastRecorded < RECORD_COOLDOWN) return this.errorReply(`You are on record cooldown.`);
			if (Date.now() - channels[targetId].lastRecorded < RECORD_COOLDOWN) return this.errorReply(`${target} is on record cooldown.`);
			if (channels[channelId].pendingCollab) return this.errorReply(`You already have a pending collaboration request.`);
			// Add a check to allow the collaboration if the user is the other channel's pending collaboration just have them accept it
			if (channels[targetId].pendingCollab !== "" && channels[targetId].pendingCollab === channels[channelId].id) {
				return this.parse(`/dewtube accept ${channels[targetId].id}`);
			}
			channels[channelId].pendingCollab = targetId;
			write();
			Users.get(channels[targetId].owner).send(`|pm|${user.getIdentity()}|~|/html has sent you a collaboration request.<br /><button name="send" value="/dewtube accept ${channels[channelId].id}">Click to accept</button> | <button name="send" value="/dewtube deny ${channels[channelId].id}">Click to decline</button>`);
			return this.sendReply(`You have sent ${target} a collaboration request.`);
		},

		accept: "acceptcollab",
		collabaccept: "acceptcollab",
		acceptcollab: function (target, room, user) {
			if (!target) return this.parse(`/dewtubehelp`);
			let channelId = toId(getChannel(user.userid));
			if (!channels[channelId]) return this.errorReply(`You do not currently own a DewTube channel.`);
			let targetId = toId(target);
			if (!channels[targetId]) return this.errorReply(`"${target}" is not a channel.`);
			if (channels[targetId].pendingCollab !== channels[channelId].id) return this.errorReply(`${target} has not sent you a collaboration request, or it was cancelled.`);
			// Check if both user's are available to record a video and collab
			if (Date.now() - channels[channelId].lastCollabed < COLLAB_COOLDOWN) return this.errorReply(`You are on collaboration cooldown.`);
			if (Date.now() - channels[targetId].lastCollabed < COLLAB_COOLDOWN) return this.errorReply(`${target} is on collaboration cooldown.`);
			if (Date.now() - channels[channelId].lastRecorded < RECORD_COOLDOWN) return this.errorReply(`You are on record cooldown.`);
			if (Date.now() - channels[targetId].lastRecorded < RECORD_COOLDOWN) return this.errorReply(`${target} is on record cooldown.`);
			let traffic = collab(channelId, targetId);
			if (traffic < 1) traffic = 1;
			let loveHateRatio = Math.floor(Math.random() * 100);
			// Default to 1 like since there is always guaranteed at least 1 view (and we want to be nice for a change)
			let generateLikes = 1;
			let generateDislikes = 0;
			let subscriberTraffic;
			let unsubs;
			// 70% chance to have positive feedback; 30% chance for negative feedback
			if (loveHateRatio >= 70) {
				// More dislikes than like scenario
				generateDislikes = Math.floor(Math.random() * traffic);
				generateLikes = Math.floor(Math.random() * generateDislikes);
				unsubs = Math.floor(Math.random() * traffic);
				subscriberTraffic = Math.floor(Math.random() * generateDislikes);
			} else {
				// More likes than dislikes scenario
				generateLikes = Math.floor(Math.random() * traffic);
				generateDislikes = Math.floor(Math.random() * generateLikes);
				subscriberTraffic = Math.floor(Math.random() * traffic);
				unsubs = Math.floor(Math.random() * subscriberTraffic);
			}
			if (subscriberTraffic < 1) subscriberTraffic = 1;
			// If the subscriber gain is over 5,000 subscribers halve it (so collaborations aren't "broken")
			if (subscriberTraffic > 5000) Math.round(subscriberTraffic / 2);
			let userViewTraffic = channels[channelId].views + traffic;
			let userSubTraffic = channels[channelId].subscribers + subscriberTraffic;
			let userUnsubTraffic = channels[channelId].subscribers - unsubs;
			let userLikeTraffic = channels[channelId].likes + generateLikes;
			let userDislikeTraffic = channels[channelId].dislikes + generateDislikes;
			let collabViewTraffic = channels[targetId].views + traffic;
			let collabSubTraffic = channels[targetId].subscribers + traffic;
			let collabUnsubTraffic = channels[targetId].subscribers - unsubs;
			let collabLikeTraffic = channels[targetId].likes + generateLikes;
			let collabDislikeTraffic = channels[targetId].dislikes + generateDislikes;
			// Be nice and just make the video not have any unsubs :P
			if (userUnsubTraffic > channels[channelId].subscribers || collabUnsubTraffic > channels[targetId].subscribers) unsubs = 0;
			let userSubChange = userSubTraffic - userUnsubTraffic;
			let userSubs = channels[channelId].subscribers + userSubChange;
			let collabSubChange = collabSubTraffic - collabUnsubTraffic;
			let collabSubs = channels[targetId].subscribers + collabSubChange;
			// Now to actually add the calculations
			channels[channelId].views = userViewTraffic;
			channels[channelId].subscribers = userSubs;
			channels[channelId].likes = userLikeTraffic;
			channels[channelId].dislikes = userDislikeTraffic;
			channels[targetId].views = collabViewTraffic;
			channels[targetId].subscribers = collabSubs;
			channels[targetId].likes = collabLikeTraffic;
			channels[targetId].dislikes = collabDislikeTraffic;
			// Update timers and video counters/titles/etc
			channels[channelId].lastCollabed = Date.now();
			channels[channelId].lastRecorded = Date.now();
			channels[channelId].lastTitle = `Collab w/ ${channels[targetId].name}!`;
			channels[channelId].videos++;
			channels[targetId].lastCollabed = Date.now();
			channels[targetId].lastRecorded = Date.now();
			channels[targetId].lastTitle = `Collab w/ ${channels[channelId].name}!`;
			channels[targetId].videos++;
			// Later implement profile pictures and use the other DewTuber's profile picture as the thumbnail
			channels[channelId].lastThumbnail = null;
			channels[targetId].lastThumbnail = null;
			// Since the other channel has proposed the collab reset the request now it is complete
			channels[targetId].pendingCollab = null;
			write();
			// PM the other channel's owner that they accepted and tell them what their channel gained
			if (Users.get(channels[targetId].owner)) {
				Users(channels[targetId].owner).send(`|pm|${user.getIdentity()}|${channels[targetId].owner}|/raw ${Server.nameColor(user.name, true, true)} has accepted your collaboration request. This resulted in both of you gaining the following: ${traffic.toLocaleString()} ${traffic === 1 ? "view" : "views"}, ${subscriberTraffic.toLocaleString()} ${subscriberTraffic === 1 ? "subscriber" : "subscribers"}, you lost ${unsubs.toLocaleString()} ${unsubs === 1 ? "subscriber" : "subscribers"}, ${generateLikes.toLocaleString()} ${generateLikes === 1 ? "like" : "likes"}, and ${generateDislikes.toLocaleString()} ${generateDislikes === 1 ? "dislike" : "dislikes"}.`);
			}
			// If the user's have notifications on send collab cooldown alerts
			if (channels[channelId].notifications) {
				let notification = Date.now() - channels[channelId].lastCollabed + COLLAB_COOLDOWN;
				setTimeout(() => {
					if (Users.get(user.userid)) {
						user.send(`|pm|~DewTube Manager|~|Hey ${user.name}, just wanted to let you know you can collaborate with DewTubers again!`);
					}
				}, notification);
			}
			if (channels[targetId].notifications) {
				let notification = Date.now() - channels[targetId].lastCollabed + COLLAB_COOLDOWN;
				setTimeout(() => {
					if (Users.get(channels[targetId].owner)) {
						Users.get(channels[targetId].owner).send(`|pm|~DewTube Manager|~|Hey ${Users.get(channels[targetId].owner)}, just wanted to let you know you can collaborate with DewTubers again!`);
					}
				}, notification);
			}
			this.sendReply(`You accepted ${channels[targetId].name}'s collaboration request this resulted in both of you gaining the following: ${traffic.toLocaleString()} ${traffic === 1 ? "view" : "views"}, ${subscriberTraffic.toLocaleString()} ${subscriberTraffic === 1 ? "subscriber" : "subscribers"}, you lost ${unsubs.toLocaleString()} ${unsubs === 1 ? "subscriber" : "subscribers"}, ${generateLikes.toLocaleString()} ${generateLikes === 1 ? "like" : "likes"}, and ${generateDislikes.toLocaleString()} ${generateDislikes === 1 ? "dislike" : "dislikes"}.`);
		},

		reject: "denycollab",
		rejectcollab: "denycollab",
		declinecollab: "denycollab",
		decline: "denycollab",
		deny: "denycollab",
		denycollab: function (target, room, user) {
			if (!target) return this.parse(`/dewtubehelp`);
			let channelId = toId(getChannel(user.userid));
			if (!channels[channelId]) return this.errorReply(`You do not currently own a DewTube channel.`);
			let targetId = toId(target);
			if (!channels[targetId]) return this.errorReply(`"${target}" is not a channel.`);
			if (channels[targetId].pendingCollab !== channels[channelId]) return this.errorReply(`${target} has not sent you a collaboration request, or it was cancelled.`);
			// Reset the channel that was declined's pending collab
			channels[targetId].pendingCollab = null;
			write();
			// Let the other channel know their collaboration request was declined
			if (Users.get(channels[targetId].owner)) {
				Users(channels[targetId].owner).send(`|pm|${user.getIdentity()}|${channels[targetId].owner}|/raw ${Server.nameColor(user.name, true, true)}, owner of ${channels[channelId].name}, has declined your collaboration request. Feel free to try collaborating with another DewTuber.`);
			}
			return this.sendReply(`You have rejected the collaboration request from ${channels[targetId].name}.`);
		},

		endcollab: "cancelcollab",
		cancel: "cancelcollab",
		cancelcollab: function (target, room, user) {
			if (!target) return this.parse(`/dewtubehelp`);
			let channelId = toId(getChannel(user.userid));
			if (!channels[channelId]) return this.errorReply(`You do not currently own a DewTube channel.`);
			let targetId = toId(target);
			if (!channels[targetId]) return this.errorReply(`"${target}" is not a channel.`);
			if (channels[channelId].pendingCollab !== targetId) return this.errorReply(`${target} does not have a pending collaboration request from you.`);
			// Reset pending collab request to nothing
			channels[channelId].pendingCollab = null;
			write();
			return this.sendReply(`You have cancelled your collaboration request with ${channels[targetId].name}.`);
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
		/dewtube record [title], [optional thumbnail link] - Films a DewTube video.
		/dewtube edit - Edits a DewTube video.
		/dewtube publish - Publishs a DewTube video.
		/dewtube collab [channel] - Requests to collaborate with the specified channel.
		/dewtube accept [channel] - Accepts a collaboration request from the specified channel.
		/dewtube deny [channel] - Declines a collaboration request from the specified channel.
		/dewtube cancel [channel] - Cancels a collaboration request that you sent the specified channel.
		/dewtube monetization - Toggles monetization on your DewTube videos. Must have 1,000 subscribers.
		/dewtube drama [channel name] - Starts drama against the other channel. Both parties must have drama enabled.
		/dewtube toggledrama - Toggles on/off starting/being a target of drama.
		/dewtube notify - Toggles on/off notifications for when your cooldowns are finished.
		/dewtube dashboard [channel name] - Shows the channel's dashboard; defaults to yourself.
		/dewtube info - Shows the DewTube version and recent changes.
		/dewtube discover - Shows all of the DewTube channels.
		/dewtube help - Displays this help command.`,
	],
};
