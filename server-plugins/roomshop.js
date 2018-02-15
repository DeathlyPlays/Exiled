/************************
 * Roomshops for PS!	*
 * Created by: Dragotic	*
 * Updated by: Insist	*
 ************************/

"use strict";

const FS = require("../lib/fs.js");
const MAX_ITEMS = 12;

exports.commands = {
	"!roomshop": true,
	leagueshop: "roomshop",
	rshop: "roomshop",
	roomshop: {
		on: "enable",
		add: "enable",
		set: "enable",
		enable: function (target, room, user) {
			if (!this.can("lock")) return false;
			if (Db("roomshop").has(room.id)) return this.errorReply("Roomshop is already enabled here.");
			Db("roomshop").set(room.id, {});
			this.modlog(`ADDROOMSHOP`, user.name, `for ${room.title}`);
			return this.sendReply("Roomshop has been enabled here.");
		},

		off: "disable",
		delete: "disable",
		remove: "disable",
		disable: function (target, room, user) {
			if (!this.can("lock")) return false;
			if (!Db("roomshop").has(room.id)) return this.errorReply("Roomshop is not enabled here.");
			Db("roomshop").delete(room.id);
			this.modlog(`REMOVEROOMSHOP`, user.name, `from ${room.title}`);
			return this.sendReply("Roomshop has been disabled here.");
		},

		bank: {
			set: function (target, room, user) {
				if (!this.can("declare", null, room)) return false;
				if (!Db("roomshop").has(room.id)) return this.errorReply("Roomshop is not enabled here.");
				if (Db("roomshop").has([room.id, "Bank"])) return this.errorReply(`${room.title} already has a bank.`);
				let bank = toId(target);
				if (!bank) return this.parse("/help roomshop");
				Db("roomshop").set([room.id, "Bank"], bank);
				this.room.modlog(`${user.name} has set this room's bank to ${target}.`);
				return this.sendReply(`${target} is now the bank for ${room.title}'s shop.`);
			},

			change: function (target, room, user) {
				if (!this.can("declare", null, room)) return false;
				if (!Db("roomshop").has(room.id)) return this.errorReply("Roomshop is not enabled here.");
				if (!Db("roomshop").has([room.id, "Bank"])) return this.errorReply(`${room.title} does not have a bank set.`);
				let bank = toId(target);
				if (!bank) return this.parse("/help roomshop");
				Db("roomshop").set([room.id, "Bank"], bank);
				this.room.modlog(`${user.name} has changed the room"s bank to ${target}.`);
				return this.sendReply(`${target} has been set as the bank for ${room.title}'s shop.`);
			},

			view: "",
			show: "",
			display: "",
			"": function (target, room, user) {
				if (!this.can("declare", null, room)) return false;
				if (!Db("roomshop").has(room.id)) return this.errorReply("Roomshop is not enabled here.");
				if (!Db("roomshop").has([room.id, "Bank"])) return this.errorReply(`${room.title} does not have a bank set.`);
				let bank = Db("roomshop").get([room.id, "Bank"]);
				return this.sendReply(`${bank} is currently the bank for the roomshop.`);
			},
		},

		add: function (target, room, user) {
			if (!this.can("declare", null, room)) return false;
			if (!Db("roomshop").has(room.id)) return this.errorReply("Roomshop is not enabled here.");
			let opts = target.split(",");
			let itemID = toId(opts[0]);
			let itemName = opts[0];
			let description = opts[1];
			let price = opts[2];
			if (!itemID || !description || !price || itemID === "bank") return this.parse("/help roomshop");
			if (isNaN(price)) return this.errorReply("Price should be in integers.");
			if (Db("roomshop").has([room.id, itemID])) return this.errorReply(`${itemID} is already present in roomshop.`);
			let keys = Object.keys(Db("roomshop").object()[room.id]);
			if (keys.indexOf("Bank") >= 0) keys.splice(keys.indexOf("Bank"), 1);
			if (keys.length >= MAX_ITEMS) return this.errorReply(`${room.title}'s roomshop has reached max number of items.`);

			Db("roomshop")
				.set([room.id, itemID], {})
				.set([room.id, itemID, "Item Name"], itemName)
				.set([room.id, itemID, "Description"], description)
				.set([room.id, itemID, "Price"], Number(price));

			return this.sendReply(`${itemName} added to the roomshop.`);
		},

		removeitem: "remove",
		deleteitem: "remove",
		remove: function (target, room, user) {
			if (!this.can("declare", null, room)) return false;
			if (!Db("roomshop").has(room.id)) return this.errorReply("Roomshop is not enabled here.");
			let itemID = toId(target);
			if (!itemID) return this.parse("/help roomshop");
			if (!Db("roomshop").has([room.id, itemID]) || itemID === "bank") return this.errorReply(`${target} is not an item in ${room.title}'s roomshop.`);
			Db("roomshop").delete([room.id, itemID]);
			return this.sendReply(`${target} has been removed from the roomshop.`);
		},

		buy: function (target, room, user) {
			if (!Db("roomshop").has(room.id)) return this.errorReply("Roomshop is not enabled here.");
			let itemID = toId(target);
			if (!Db("roomshop").has([room.id, itemID]) || itemID === "bank") return this.errorReply(`${target} is not present in roomshop.`);
			if (!Db("roomshop").has([room.id, "Bank"])) return this.errorReply(`${room.title} does not have a bank set.`);
			if (Db("roomshop").get([room.id, "Bank"]) === user.userid) return this.errorReply("Bank cannot purchase from the roomshop.");
			let usersMoney = Db("money").get(user.userid, 0);
			let bank = Db("roomshop").get([room.id, "Bank"]);
			let banksMoney = Db("money").get(bank, 0);
			let cost = Db("roomshop").get([room.id, itemID, "Price"]);
			if (usersMoney < cost) return this.errorReply(`You do not have enough ${moneyName} to purchase ${itemID}.`);
			Db("money").set(user.userid, usersMoney - cost).get(user.userid);
			Db("money").set(bank, banksMoney + cost).get(bank);
			Db("roomshop").set();
			if (!fs.existsSync("logs/roomshops")) fs.mkdirSync("logs/roomshops");
			fs.appendFile(`logs/roomshops/roomshop_${room.id}.txt`, `[${new Date().toUTCString()}] ${user.name} has bought ${target}  from the roomshop.\n`, () => {});

			let msg = `${user.name} has purchased ${target}.`;

			Users.users.forEach(function (user) {
				if (room.auth[user] === "#" || room.auth[user] === "&") {
					user.send(`|pm|~${room.title}'s Shop Alert|${user.getIdentity()}|${msg}`);
				}
			});

			return this.sendReply(`You have bought ${target} for ${cost} ${moneyName}.`);
		},

		show: "",
		display: "",
		shop: "",
		"": function (target, room, user) {
			if (!this.runBroadcast()) return;
			if (!Db("roomshop").has(room.id)) return this.errorReply("Roomshop is not enabled here.");
			let keys = Object.keys(Db("roomshop").object()[room.id]);
			function display(keys) {
				let display = `<center><u><strong>${room.title}'s Shop</strong></u></center><br><table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Item</th><th>Description</th><th>Price</th></tr>`;
				if (keys.indexOf("Bank") >= 0) keys.splice(keys.indexOf("Bank"), 1);
				if (!keys.length) return `<center><h2><strong><u>This Shop Has No Items!</u></strong></h2></center>`;
				for (let i = 0; i < keys.length; i++) {
					let item = Db("roomshop").object()[room.id][keys[i]];
					display += `<tr><td align="center"><button name="send" value="/roomshop buy ${keys[i]}"><strong>${item["Item Name"]}</strong></button></td>`;
					display += `<td align="center">${item["Description"]}</td>`;
					display += `<td align="center">${item["Price"]}</td></tr>`;
				}
				display += `</tbody></table>`;
				return display;
			}
			this.sendReplyBox(display(keys));
		},

		log: function (target, room, user) {
			if (!this.can("declare", null, room)) return false;
			if (!Db("roomshop").has(room.id)) return this.errorReply("Roomshop is not enabled here.");
			target = toId(target);
			let numLines = 15;
			let matching = true;
			if (target.match(/\d/g) && !isNaN(target)) {
				numLines = Number(target);
				matching = false;
			}
			let topMsg = `Displaying the last ${numLines} lines of transactions:\n`;
			let file = `logs/roomshops/roomshop_${room.id}.txt`;
			fs.exists(file, function (exists) {
				if (!exists) return Users(user.userid).popup("No transactions.");
				fs.readFile(file, "utf8", function (err, data) {
					data = data.split("\n");
					if (target && matching) {
						data = data.filter(function (line) {
							return line.toLowerCase().indexOf(target.toLowerCase()) >= 0;
						});
					}
					Users(user.userid).popup(`|wide|${topMsg} ${data.slice(-(numLines + 1)).join("\n")}`);
				});
			});
		},
	},

	roomshophelp: [
		`Commands for leagueshop/roomshop are:
		/roomshop enable - Enables roomshop for the room. Requires %, @, &, #, ~.
		/roomshop disable - Disables roomshop for the room. Requires %, @, &, #, ~.
		/roomshop add [name],[description],[price] - Adds an item to the roomshop. Requires &, #.
		/roomshop bank - Shows the bank name. Requires &, #.
		/roomshop bank set [username] - Sets the username as bank. Requires &, #.
		/roomshop bank change [username] - Changes bank to username. Requires &, #.
		/roomshop remove [name] - Removes an item from the roomshop. Requires &, #.
		/roomshop - Displays the roomshop for the room.
		/roomshop log [lines/target] - Displays log for the roomshop of the room. Requires &, #.`,
	],
};
