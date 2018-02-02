/****************************
 * Splatoon Plug-in for PS	*
 * Created by Insist		*
 ****************************/

"use strict";

let SPLATFEST = false;
let splatfestTeams = [];

exports.commands = {
	"spl2n": "splatoon",
	"splatoon2": "splatoon",
	splatoon: {
		ranking: "rank",
		ranks: "rank",
		rank: {
			clamblitz: "cb",
			cb: function (target, room, user) {
				if (!target) return this.parse("/splatoonhelp");
				if (!["c-", "c", "c+", "b-", "b", "b+", "a-", "a", "a+", "s", "s+"].includes(target.toLowerCase())) return this.errorReply(`Invalid Ranking; check your spelling?`);
				Db("splatcb").set(user.userid, target);
				return this.sendReply(`You have successfully set your Clam Blitz ranking to "${target}".`);
			},

			rainmaker: "rm",
			rm: function (target, room, user) {
				if (!target) return this.parse("/splatoonhelp");
				if (!["c-", "c", "c+", "b-", "b", "b+", "a-", "a", "a+", "s", "s+"].includes(target.toLowerCase())) return this.errorReply(`Invalid Ranking; check your spelling?`);
				Db("splatrm").set(user.userid, target);
				return this.sendReply(`You have successfully set your Rainmaker ranking to "${target}".`);
			},

			splatzones: "sz",
			splatzone: "sz",
			sz: function (target, room, user) {
				if (!target) return this.parse("/splatoonhelp");
				if (!["c-", "c", "c+", "b-", "b", "b+", "a-", "a", "a+", "s", "s+"].includes(target.toLowerCase())) return this.errorReply(`Invalid Ranking; check your spelling?`);
				Db("splatsz").set(user.userid, target);
				return this.sendReply(`You have successfully set your Splat Zones ranking to "${target}".`);
			},

			towercontrol: "tc",
			tc: function (target, room, user) {
				if (!target) return this.parse("/splatoonhelp");
				if (!["c-", "c", "c+", "b-", "b", "b+", "a-", "a", "a+", "s", "s+"].includes(target.toLowerCase())) return this.errorReply(`Invalid Ranking; check your spelling?`);
				Db("splattc").set(user.userid, target);
				return this.sendReply(`You have successfully set your Tower Control ranking to "${target}".`);
			},
		},

		weapon: function (target, room, user) {
			if (!target) return this.parse(`/splatoonhelp`);
			if (![".52 Gal", ".52 Gal Deco", ".96 Gal", "Aerospray MG", "Aerospray RG", "Bamboozler 14 Mk I", "Blaster", "Carbon Roller", "Clash Blaster", "Classic Squiffer", "Custom Blaster", "Custom E-Liter 4K", "Custom E-Liter 4K Scope", "Custom Jet Squelcher", "Custom Splattershot Jr.", "Dapple Dualies", "Dapple Dualies", "Dualie Squelchers", "Dynamo Roller", "E-Liter 4K", "E-Liter 4K Scope", "Enperry Splat Dualies", "Firefin Splat Charger", "Firefine Splatterscope", "Flingza Roller", "Foil Flingza Roller", "Forge Splattershot Pro", "Glooga Dualies", "Gold Dynamo Roller", "Goo Tuber", "H-3 Nozzlenose", "Heavy Splatling", "Heavy Splatling Deco", "Hero Blaster Replica", "Hero Brella Replica", "Hero Charger Replica", "Hero Dualie Replica", "Hero Roller Replica", "Hero Shot Replica", "Hero Slosher Replica", "Hero Splatling Replica", "Herobrush Replica", "Hydra Splatling", "Inkbrush", "Inkbrush Nouveau", "Jet Squelcher", "Krak-On Splat Roller", "L-3 Nozzlenose", "L-3 Nozzlenose D", "Luna Blaster", "Mini Splatling", "N-ZAP '85", "N-ZAP '89", "Octobrush", "Octobrush Nouveau", "Range Blaster", "Rapid Blaster", "Rapid Blaster Deco", "Rapid Blaster Pro", "Slosher", "Slosher Deco", "Sloshing Machine", "Splash-o-matic", "Splat Brella", "Splat Charger", "Splat Dualies", "Splat Roller", "Splatterscope", "Splattershot", "Splattershot Jr.", "Splattershot Pro", "Sploosh-o-matic", "Squeezer", "Tenta Brella", "Tentatek Splattershot", "Tri-Slosher", "Undercover Brella"].includes(target)) return this.errorReply(`Invalid weapon; check your spelling? [case sensitive]`);
			Db("splatweapon").set(user.userid, target);
			return this.sendReply(`Your Splatoon 2 weapon has been set to "${target}".`);
		},

		randweapon: "randomweapon",
		randomweapon: function (target, room, user) {
			if (!this.runBroadcast) return;
			let weapons = [".52 Gal", ".52 Gal Deco", ".96 Gal", "Aerospray MG", "Aerospray RG", "Bamboozler 14 Mk I", "Blaster", "Carbon Roller", "Clash Blaster", "Classic Squiffer", "Custom Blaster", "Custom E-Liter 4K", "Custom E-Liter 4K Scope", "Custom Jet Squelcher", "Custom Splattershot Jr.", "Dapple Dualies", "Dapple Dualies", "Dualie Squelchers", "Dynamo Roller", "E-Liter 4K", "E-Liter 4K Scope", "Enperry Splat Dualies", "Firefin Splat Charger", "Firefine Splatterscope", "Flingza Roller", "Foil Flingza Roller", "Forge Splattershot Pro", "Glooga Dualies", "Gold Dynamo Roller", "Goo Tuber", "H-3 Nozzlenose", "Heavy Splatling", "Heavy Splatling Deco", "Hero Blaster Replica", "Hero Brella Replica", "Hero Charger Replica", "Hero Dualie Replica", "Hero Roller Replica", "Hero Shot Replica", "Hero Slosher Replica", "Hero Splatling Replica", "Herobrush Replica", "Hydra Splatling", "Inkbrush", "Inkbrush Nouveau", "Jet Squelcher", "Krak-On Splat Roller", "L-3 Nozzlenose", "L-3 Nozzlenose D", "Luna Blaster", "Mini Splatling", "N-ZAP '85", "N-ZAP '89", "Octobrush", "Octobrush Nouveau", "Range Blaster", "Rapid Blaster", "Rapid Blaster Deco", "Rapid Blaster Pro", "Slosher", "Slosher Deco", "Sloshing Machine", "Splash-o-matic", "Splat Brella", "Splat Charger", "Splat Dualies", "Splat Roller", "Splatterscope", "Splattershot", "Splattershot Jr.", "Splattershot Pro", "Sploosh-o-matic", "Squeezer", "Tenta Brella", "Tentatek Splattershot", "Tri-Slosher", "Undercover Brella"];
			return this.sendReplyBox(weapons[Math.floor(Math.random() * weapons.length)]);
		},

		splatfest: {
			enable: "on",
			start: "on",
			new: "on",
			make: "on",
			on: function (target, room, user) {
				if (!this.can("ban", null, room)) return this.errorReply(`You must be a Room Moderator or higher to use this command.`);
				if (room.id !== "splatoon") return this.errorReply(`This command only works in the Splatoon room.`);
				let targets = target.split(",");
				for (let u in targets) targets[u] = targets[u].trim();
				let team1 = targets[0];
				let team2 = targets[1];
				if (!team1 || !team2) return this.parse("/splatoonhelp");
				if (SPLATFEST) return this.errorReply(`Splatfest is already active.`);
				SPLATFEST = !SPLATFEST;
				if (Rooms("splatoon")) {
					Rooms("splatoon").addRaw(`${Server.nameColor(user.name, true)} has enabled Splatfest. The teams of this Splatfest are: ${team1} and ${team2}.`);
				}
				splatfestTeams.push(toId(team1), toId(team2));
			},

			disable: "off",
			end: "off",
			cancel: "off",
			remove: "off",
			off: function (target, room, user) {
				if (!this.can("ban", null, room)) return this.errorReply(`You must be a Room Moderator or higher to use this command.`);
				if (room.id !== "splatoon") return this.errorReply(`This command only works in the Splatoon room.`);
				if (!SPLATFEST) return this.errorReply(`Splatfest is not currently active.`);
				SPLATFEST = !SPLATFEST;
				if (Rooms("splatoon")) {
					Rooms("splatoon").addRaw(`${Server.nameColor(user.name, true)} has disabled Splatfest.`);
				}
				// Clear splatfest teams
				splatfestTeams = [];
			},

			j: "join",
			setteam: "join",
			jointeam: "join",
			join: function (target, room, user) {
				if (!target) return this.parse(`/splatoonhelp`);
				if (!SPLATFEST) return this.errorReply(`There is currently not a Splatfest. :(`);
				if (!splatfestTeams.includes(target.toLowerCase())) return this.errorReply(`This is not a Splatfest team.`);
				Db("splatfestteam").set(user.userid, target);
				return this.sendReply(`You have successfully joined Splatfest Team "${target}".`);
			},

			teams: "team",
			team: function (target, room, user) {
				if (!this.runBroadcast()) return;
				if (!SPLATFEST) return this.errorReply(`There is currently not a Splatfest. :(`);
				return this.sendReplyBox(`<strong>Splatfest Teams:</strong> ${splatfestTeams.join(", ")}`);
			},
		},

		name: "ign",
		ingamename: "ign",
		ign: function (target, room, user) {
			if (!this.canTalk()) return false;
			if (!target || target.length > 10) return this.errorReply(`Your IGN must be between 1-10 characters long.`);
			Db("splatign").set(user.userid, target);
			return this.sendReply(`Your IGN has been set as: "${target}".`);
		},

		profile: function (target, room, user) {
			if (!this.runBroadcast()) return;
			if (!target) target = user.userid;
			target = toId(target);
			if (target.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
			let self = this;
			let targetUser = Users.get(target);
			let username = (targetUser ? targetUser.name : target);
			showProfile();

			function IGN(user) {
				if (!Db("splatign").has(user)) return ``;
				return ` (<strong>IGN</strong>: ${Db("splatign").get(user)})`;
			}

			function showProfile() {
				let profile = ``;
				profile += `<div><strong>Name:</strong> ${Server.nameColor(toId(username), true, true)}${IGN(toId(username))}<br />`;
				if (Db("switchfc").has(toId(username))) {
					profile += `<strong>Switch Friend Code:</strong> SW-${Db("switchfc").get(toId(username))}<br />`;
				}
				if (Db("splatweapon").has(toId(username))) {
					profile += `<strong>Weapon:</strong> ${Db("splatweapon").get(toId(username))}<br />`;
				}
				if (Db("splatfestteam").has(toId(username)) && SPLATFEST) {
					profile += `<strong>Splatfest Team:</strong> ${Db("splatfestteam").get(toId(username))}<br />`;
				}
				if (Db("splatcb").has(toId(username))) {
					profile += `<strong>Clam Blitz:</strong> ${Db("splatcb").get(toId(username))}<br />`;
				}
				if (Db("splatrm").has(toId(username))) {
					profile += `<strong>Rainmaker:</strong> ${Db("splatrm").get(toId(username))}<br />`;
				}
				if (Db("splatsz").has(toId(username))) {
					profile += `<strong>Splat Zones:</strong> ${Db("splatsz").get(toId(username))}<br />`;
				}
				if (Db("splattc").has(toId(username))) {
					profile += `<strong>Tower Control:</strong> ${Db("splattc").get(toId(username))}<br />`;
				}
				profile += `</div>`;
				self.sendReplyBox(profile);
			}
		},

		"": "help",
		help: function (target, room, user) {
			this.parse("/splatoonhelp");
		},
	},

	splatoonhelp: [
		`/splatoon rank [Clam Blitz | Rainmaker | Splat Zones | Tower Control] [rank] - Sets your Splatoon 2 Ranked Battle rank.
		/splatoon weapon [weapon] - Sets your Splatoon 2 Weapon.
		/splatoon IGN [Splatoon IGN] - Sets your Splatoon 2 IGN.
		/splatoon splatfest start [1st Splatfest team name], [2nd Splatfest team name] - Initiates a Splatfest of the two teams.  Must have Room Moderator or higher in the Splatoon room.
		/splatoon splatfest end - Ends the Splatfest.
		/splatoon splatfest join [Splatfest team name] - Joins the specified Splatfest team.
		/splatoon splatfest teams - Shows the Splatfest teams.
		/splatoon randomweapon - Sends a random weapon from Splatoon 2 into chat.
		/splatoon profile [optional target] - Displays the specified user's Splatoon 2 Profile. Defaults to yourself.`,
	],
};
