"use strict";

const fs = require("fs");

// This should be the default amount of money users have..
// Ideally, this should be zero.
const DEFAULT_AMOUNT = 0;

global.moneyName = "Soul Dew";
global.moneyPlural = "Soul Dews";

let shop = [
	["Ability", "Purchases a custom ability for your SSBFFA account.", 50],
	["Avatar", "Buys an custom avatar to be applied to your name [You supply. Images larger than 80x80 may not show correctly].", 5],
	["Custom Color", "Changes the color of your name [Can be denied]", 25],
	["Custom Emoticon", "You provide an image (50x50 Pixels) to be added as an emote on the server. [Can be denied]", 40],
	["Custom PM Box", "A Custom Designed Personal Messaging Box. [Can be denied]", 75],
	["Custom Title", "Buys a title to be added on to your profile. [Can be denied].", 10],
	["FFA Symbol", "Purchases the ability to have a custom symbol for your SSBFFA Pokemon.", 15],
	["Fix", "Buys the ability to alter your current custom avatar or trainer card.", 5],
	["Icon", "Buy a custom icon that can be applied to the rooms you want. You must take into account that the provided image should be 32 x 32", 25],
	["Item", "Purchases a custom item for your SSBFFA account.", 50],
	["Kick", "Kick a user from the chatroom.", 5],
	["League Room", "Purchases a room for league usage.", 5],
	["Move", "Purchases a custom move for your SSBFFA account.", 50],
	["Mystery", "Purchases a Mystery Box [no refunds]", 15],
	["POTD", "Allows you to change the Pokemon of the Day that shows up guaranteed in Random Battles [Can be refused, or held off if one is already active]", 25],
	["Room", "Buys a chatroom for you to own. [Within reason, can be denied].", 30],
	["Roomshop", "Buys a Roomshop for your League or Room. [Will be removed if abused].", 50],
	["Shiny", "Purchases the ability for your SSBFFA Pokemon to become shiny.", 5],
	["Staffmon", "Buys a Pokemon with your name on it to be added in the Super Staff Bros Metagame. [Can be denied/edited]", 100],
	["Symbol", "Buys a custom symbol to go infront of your username and puts you at top of userlist. [Temporary until restart,certain symbols are blocked]", 5],
];

let shopDisplay = getShopDisplay(shop);

/**
 * Displays the shop
 *
 * @param {Array} shop
 * @return {String} display
 */
function getShopDisplay(shop) {
	let display = "<center><img src=https://play.pokemonshowdown.com/sprites/xyani/masquerain.gif><img src=http://i.imgur.com/7jnZePO.png width=300> <img src=https://play.pokemonshowdown.com/sprites/xyani/masquerain.gif></center><br><div' + (!this.isOfficial ? ' class=infobox-limited' : '') + '><table style='background: #2ae10e; border-color: #2e6dd8; border-radius: 8px' border='1' cellspacing='0' cellpadding='5' width='100%'>" +
		"<tbody><tr><th><font color=#2e6dd8 face=courier>Item</font></th><th><font color=#2e6dd8 face=courier>Description</font></th><th><font color=#2e6dd8 face=courier>Price</font></th></tr>";
	let start = 0;
	while (start < shop.length) {
		display += "<tr>" +
			"<td align='center'><button name='send' style='background: #2ae10e; border-radius: 5px; border: solid, 1px, #2e6dd8; font-size: 11px; padding: 5px 10px' value='/buy " + shop[start][0] + "'><font color=#2e6dd8 face=courier><b>" + shop[start][0] + "</b></font></button>" + "</td>" +
			"<td align='center'><font color=#2e6dd8 face=courier>" + shop[start][1] + "</font></td>" +
			"<td align='center'><font color=#2e6dd8 face=courier>" + shop[start][2] + "</font></td>" +
			"</tr>";
		start++;
	}
	display += "</tbody></table></div><br><center><font color=#2ae10e face=courier>To buy an item from the shop, use /buy <em>Item</em>.</font></center>";
	return display;
}

let Economy = global.Economy = {
	/**
 	* Reads the specified user's money.
 	* If they have no money, DEFAULT_AMOUNT is returned.
 	*
 	* @param {String} userid
 	* @param {Function} callback
 	* @return {Function} callback
 	*/
	readMoney: function (userid, callback) {
		if (typeof callback !== "function") {
			throw new Error("Economy.readMoney: Expected callback parameter to be a function, instead received " + typeof callback);
		}

		// In case someone forgot to turn `userid` into an actual ID...
		userid = toId(userid);

		let amount = Db.money.get(userid, DEFAULT_AMOUNT);
		return callback(amount);
	},
	/**
 	* Writes the specified amount of money to the user's "bank."
 	* If a callback is specified, the amount is returned through the callback.
 	*
 	* @param {String} userid
 	* @param {Number} amount
 	* @param {Function} callback (optional)
 	* @return {Function} callback (optional)
 	*/
	writeMoney: function (userid, amount, callback) {
		// In case someone forgot to turn `userid` into an actual ID...
		userid = toId(userid);

		// In case someone forgot to make sure `amount` was a Number...
		amount = Number(amount);
		if (isNaN(amount)) {
			throw new Error("Economy.writeMoney: Expected amount parameter to be a Number, instead received " + typeof amount);
		}

		let curTotal = Db.money.get(userid, DEFAULT_AMOUNT);
		Db.money.set(userid, curTotal + amount);
		let newTotal = Db.money.get(userid);

		if (callback && typeof callback === "function") {
			// If a callback is specified, return `newTotal` through the callback.
			return callback(newTotal);
		}
	},

	writeMoneyArr: function (users, amount) {
		this.writeMoney(users[0], amount, () => {
			users.splice(0, 1);
			if (users.length > 0) this.writeMoneyArr(users, amount);
		});
	},

	logTransaction: function (message) {
		if (!message) return false;
		fs.appendFile("logs/transactions.log", "[" + new Date().toUTCString() + "] " + message + "\n", () => {});
	},

	logDice: function (message) {
		if (!message) return false;
		fs.appendFile("logs/dice.log", "[" + new Date().toUTCString() + "] " + message + "\n", () => {});
	},
};

function findItem(item, money) {
	let len = shop.length;
	let price = 0;
	let amount = 0;
	while (len--) {
		if (item.toLowerCase() !== shop[len][0].toLowerCase()) continue;
		price = shop[len][2];
		if (price > money) {
			amount = price - money;
			this.errorReply(`You don't have you enough money for this. You need ${amount} ${moneyName}${Chat.plural(amount)} more to buy ${item}.`);
			return false;
		}
		return price;
	}
	this.errorReply(`${item} not found in shop.`);
}

function handleBoughtItem(item, user, cost) {
	if (item === "symbol") {
		user.canCustomSymbol = true;
		this.sendReply("You have purchased a custom symbol. You can use /customsymbol to get your custom symbol.");
		this.sendReply("You will have this until you log off for more than an hour.");
		this.sendReply("If you do not want your custom symbol anymore, you may use /resetsymbol to go back to your old symbol.");
	} else if (item === "icon") {
		this.sendReply("You purchased an icon, contact an administrator to obtain the article.");
	} else if (item === "mystery") {
		user.canOpenMysteryBox = true;
		this.sendReply("Good luck! Happy unboxing :)");
	} else if (item === "ability") {
		Server.ssb[user.userid].bought.cAbility = true;
		writeSSB();
	} else if (item === "ffasymbol") {
		Server.ssb[user.userid].bought.cSymbol = true;
		writeSSB();
	} else if (item === "move") {
		Server.ssb[user.userid].bought.cMove = true;
		writeSSB();
	} else if (item === "item") {
		Server.ssb[user.userid].bought.cItem = true;
		writeSSB();
	} else if (item === "shiny") {
		Server.ssb[user.userid].canShiny = true;
		writeSSB();
	} else {
		let msg = `**${user.name} has bought ${item}.**`;
		Monitor.log(`${msg}`);
		Users.users.forEach(function (user) {
			if (user.group === "~" || user.group === "&" || user.group === "@") {
				user.send(`|pm|~${Config.serverName} Server|${user.getIdentity()}|${msg}`);
			}
		});
	}
}

global.rankLadder = function (title, type, array, prop, group) {
	let groupHeader = group || 'Username';
	const ladderTitle = '<center><h4><u>' + title + '</u></h4></center>';
	const thStyle = 'class="rankladder-headers default-td" style="background: -moz-linear-gradient(#576468, #323A3C); background: -webkit-linear-gradient(#576468, #323A3C); background: -o-linear-gradient(#576468, #323A3C); background: linear-gradient(#576468, #323A3C); box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.3) inset, 1px 1px 1px rgba(255, 255, 255, 0.7) inset;"';
	const tableTop = '<div style="max-height: 310px; overflow-y: scroll;">' +
		'<table style="width: 100%; border-collapse: collapse;">' +
		'<tr>' +
			'<th ' + thStyle + '>Rank</th>' +
			'<th ' + thStyle + '>' + groupHeader + '</th>' +
			'<th ' + thStyle + '>' + type + '</th>' +
		'</tr>';
	const tableBottom = '</table></div>';
	const tdStyle = 'class="rankladder-tds default-td" style="box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.3) inset, 1px 1px 1px rgba(255, 255, 255, 0.7) inset;"';
	const first = 'class="first default-td important" style="box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.3) inset, 1px 1px 1px rgba(255, 255, 255, 0.7) inset;"';
	const second = 'class="second default-td important" style="box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.3) inset, 1px 1px 1px rgba(255, 255, 255, 0.7) inset;"';
	const third = 'class="third default-td important" style="box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.3) inset, 1px 1px 1px rgba(255, 255, 255, 0.7) inset;"';
	let midColumn;

	let tableRows = '';

	for (let i = 0; i < array.length; i++) {
		if (i === 0) {
			midColumn = '</td><td ' + first + '>';
			tableRows += '<tr><td ' + first + '>' + (i + 1) + midColumn + Server.nameColor(array[i].name, true) + midColumn + array[i][prop] + '</td></tr>';
		} else if (i === 1) {
			midColumn = '</td><td ' + second + '>';
			tableRows += '<tr><td ' + second + '>' + (i + 1) + midColumn + Server.nameColor(array[i].name, true) + midColumn + array[i][prop] + '</td></tr>';
		} else if (i === 2) {
			midColumn = '</td><td ' + third + '>';
			tableRows += '<tr><td ' + third + '>' + (i + 1) + midColumn + Server.nameColor(array[i].name, true) + midColumn + array[i][prop] + '</td></tr>';
		} else {
			midColumn = '</td><td ' + tdStyle + '>';
			tableRows += '<tr><td ' + tdStyle + '>' + (i + 1) + midColumn + Server.nameColor(array[i].name, true) + midColumn + array[i][prop] + '</td></tr>';
		}
	}
	return ladderTitle + tableTop + tableRows + tableBottom;
};

exports.commands = {
<<<<<<< HEAD
	'!wallet': true,
	atm: 'wallet',
	money: 'wallet',
	balance: 'wallet',
=======
	"!wallet": true,
	atm: "wallet",
>>>>>>> 65d216e280c13efbf786f13c9b852ee38d521979
	wallet: function (target, room, user) {
		if (!target) target = user.name;
		if (!this.runBroadcast()) return;
		let userid = toId(target);
		if (userid.length < 1) return this.sendReply("/wallet - Please specify a user.");
		if (userid.length > 19) return this.sendReply("/wallet - [user] can't be longer than 19 characters.");

		Economy.readMoney(userid, money => {
			this.sendReplyBox(Server.nameColor(target, true) + " has " + money + ((money === 1) ? " " + moneyName + "." : " " + moneyPlural + "."));
			//if (this.broadcasting) room.update();
		});
	},

	givebucks: "givecurrency",
	givemoney: "givecurrency",
	gb: "givecurrency",
	gc: "givecurrency",
	givecurrency: function (target, room, user, connection, cmd) {
		if (!this.can("money")) return false;
		if (!target) return this.sendReply(`Usage: /${cmd} [user], [amount], [reason]`);
		let splitTarget = target.split(",");
		if (!splitTarget[2]) return this.sendReply(`Usage: /${cmd} [user], [amount], [reason]`);
		for (let u in splitTarget) splitTarget[u] = splitTarget[u].trim();

		let targetUser = splitTarget[0];
		if (toId(targetUser).length < 1) return this.sendReply(`/${cmd} - [user] may not be blank.`);
		if (toId(targetUser).length > 19) return this.sendReply(`/${cmd} - [user] can't be longer than 19 characters.`);

		let amount = Math.round(Number(splitTarget[1]));
		if (isNaN(amount)) return this.sendReply(`/${cmd}- [amount] must be a number.`);
		if (amount > 1000) return this.sendReply(`/${cmd} - You can't give more than 1,000 ${moneyName} at a time.`);
		if (amount < 1) return this.sendReply(`/${cmd} - You can't give less than one ${moneyName}.`);

		let reason = splitTarget[2];
		if (reason.length > 100) return this.errorReply("Reason may not be longer than 100 characters.");
		if (toId(reason).length < 1) return this.errorReply(`Please specify a reason to give ${moneyName}.`);

		Economy.writeMoney(targetUser, amount, () => {
			Economy.readMoney(targetUser, newAmount => {
				if (Users(targetUser) && Users(targetUser).connected) {
					Users.get(targetUser).popup(`|html|You have received ${amount} ${(amount === 1 ? moneyName : moneyPlural)} from ${Server.nameColor(user.name, true)}.`);
				}
				this.sendReply(`${targetUser} has received ${amount} ${((amount === 1) ? `${moneyName}` : `${moneyPlural}`)}.`);
				Economy.logTransaction(`${user.name} has given ${amount} ${((amount === 1) ? `${moneyName}` : `${moneyPlural}`)} to ${targetUser}. (Reason: ${reason}) They now have ${newAmount} ${(newAmount === 1 ? `${moneyName}` : `${moneyPlural}`)}.`);
			});
		});
	},

	tb: "takecurrency",
	takebucks: "takecurrency",
	takemoney: "takecurrency",
	tc: "takecurrency",
	takecurrency: function (target, room, user, connection, cmd) {
		if (!this.can("money")) return false;
		if (!target) return this.sendReply(`Usage: /${cmd} [user], [amount], [reason]`);
		let splitTarget = target.split(",");
		if (!splitTarget[2]) return this.sendReply(`Usage: /${cmd} [user], [amount], [reason]`);
		for (let u in splitTarget) splitTarget[u] = splitTarget[u].trim();

		let targetUser = splitTarget[0];
		if (toId(targetUser).length < 1) return this.sendReply(`/${cmd} - [user] may not be blank.`);
		if (toId(targetUser).length > 19) return this.sendReply(`/${cmd} - [user] can't be longer than 19 characters.`);

		let amount = Math.round(Number(splitTarget[1]));
		if (isNaN(amount)) return this.sendReply(`/${cmd}- [amount] must be a number.`);
		if (amount > 1000) return this.sendReply(`/${cmd} - You can't take more than 1,000 ${moneyName} at a time.`);
		if (amount < 1) return this.sendReply(`/${cmd} - You can't take less than one ${moneyName}.`);

		let reason = splitTarget[2];
		if (reason.length > 100) return this.errorReply("Reason may not be longer than 100 characters.");
		if (toId(reason).length < 1) return this.errorReply(`Please specify a reason to give ${moneyName}.`);

		Economy.writeMoney(targetUser, -amount, () => {
			Economy.readMoney(targetUser, newAmount => {
				if (Users(targetUser) && Users(targetUser).connected) {
					Users.get(targetUser).popup(`|html|${Server.nameColor(user.name, true)} has removed ${amount} ${(amount === 1 ? moneyName : moneyPlural)} from you.<br />`);
				}
				this.sendReply(`You removed ${amount} ${((amount === 1) ? `${moneyName}` : `${moneyPlural}`)} from ${Chat.escapeHTML(targetUser)}.`);
				Economy.logTransaction(`${user.name} has taken ${amount} ${((amount === 1) ? `${moneyName}` : `${moneyPlural}`)} from ${targetUser}. (Reason: ${reason}) They now have ${newAmount} ${(newAmount === 1 ? `${moneyName}` : `${moneyPlural}`)}.`);
			});
		});
	},

	confirmtransferbucks: "transfercurrency",
	transferbucks: "transfercurrency",
	transfer: "transfercurrency",
	transfermoney: "transfercurrency",
	confirmtransfercurrency: "transfercurrency",
	transfercurrency: function (target, room, user, connection, cmd) {
		if (!target) return this.sendReply(`Usage: /${cmd} [user], [amount]`);
		let splitTarget = target.split(",");
		for (let u in splitTarget) splitTarget[u] = splitTarget[u].trim();
		if (!splitTarget[1]) return this.sendReply(`Usage: /${cmd} [user], [amount]`);

		let targetUser = (Users.getExact(splitTarget[0]) ? Users.getExact(splitTarget[0]).name : splitTarget[0]);
		if (toId(targetUser).length < 1) return this.sendReply(`/${cmd} - [user] may not be blank.`);
		if (toId(targetUser).length > 18) return this.sendReply(`/${cmd} - [user] can't be longer than 18 characters.`);
		if (targetUser === user.name) return this.sendReply(`You can't transfer ${moneyPlural} to yourself.`);

		let amount = Math.round(Number(splitTarget[1]));
		if (isNaN(amount)) return this.sendReply(`/${cmd} - [amount] must be a number.`);
		if (amount > 1000) return this.sendReply(`/${cmd} - You can't transfer more than 1,000 ${moneyName} at a time.`);
		if (amount < 1) return this.sendReply(`/${cmd} - You can't transfer less than one ${moneyName}.`);
		Economy.readMoney(user.userid, money => {
			if (money < amount) return this.sendReply(`/${cmd} - You can't transfer more ${moneyName} than you have.`);
			if (cmd !== "confirmtransfercurrency" && cmd !== "confirmtransferbucks") {
				return this.popupReply(`|html|<center><button class = "card-td button" name = "send" value = "/confirmtransferbucks ${toId(targetUser)}, ${amount}" style = "outline: none; width: 200px; font-size: 11pt; padding: 10px; border-radius: 14px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4); box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.4) inset; transition: all 0.2s;">Confirm transfer to <br /><b style = "color:${Server.hashColor(targetUser)}; text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8)">${Chat.escapeHTML(targetUser)}</b></button></center>`);
			}
			Economy.writeMoney(user.userid, -amount, () => {
				Economy.writeMoney(targetUser, amount, () => {
					Economy.readMoney(targetUser, firstAmount => {
						Economy.readMoney(user.userid, secondAmount => {
							this.popupReply(`You sent ${amount} ${((amount === 1) ? `${moneyName}` : `${moneyPlural}`)} to ${targetUser}.`);
							Economy.logTransaction(`${user.name} has transfered ${amount} ${((amount === 1) ? `${moneyName}` : `${moneyPlural}`)} to ${targetUser}. ${user.name} now has ${secondAmount} ${(secondAmount === 1 ? `${moneyName}` : `${moneyPlural}`)}. ${targetUser} now has ${firstAmount} ${(firstAmount === 1 ? `${moneyName}` : `${moneyPlural}`)}.`);
							if (Users.getExact(targetUser) && Users.getExact(targetUser).connected) {
								Users.getExact(targetUser).send(`|popup||html|${Server.nameColor(user.name, true)} has sent you ${amount} ${((amount === 1) ? `${moneyName}` : `${moneyPlural}`)}.`);
							}
						});
					});
				});
			});
		});
	},

	moneylog: function (target, room, user) {
		if (!this.can("money")) return false;
		if (!target) return this.sendReply("Usage: /moneylog [number] to view the last x lines OR /moneylog [text] to search for text.");
		let word = false;
		if (isNaN(Number(target))) word = true;
		let lines = fs.readFileSync("logs/transactions.log", "utf8").split("\n").reverse();
		let output = "";
		let count = 0;
		let regex = new RegExp(target.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "gi"); // eslint-disable-line no-useless-escape

		if (word) {
			output += `Displaying last 50 lines containing "${target}":\n`;
			for (let line in lines) {
				if (count >= 50) break;
				if (!~lines[line].search(regex)) continue;
				output += `${lines[line]}\n`;
				count++;
			}
		} else {
			if (target > 100) target = 100;
			output = lines.slice(0, (lines.length > target ? target : lines.length));
			output.unshift(`Displaying the last ${lines.length > target ? target : lines.length} lines:`);
			output = output.join(`\n`);
		}
		user.popup(`|wide|${output}`);
	},

	"!richestuser": true,
	richestusers: "richestuser",
	richestuser: function (target, room, user) {
		if (!target) target = 100;
		target = Number(target);
		if (isNaN(target)) target = 100;
		if (!this.runBroadcast()) return;
		let keys = Db.money.keys().map(name => {
			return {name: name, money: Db.money.get(name)};
		});
		if (!keys.length) return this.sendReplyBox("Money ladder is empty.");
		keys.sort(function (a, b) { return b.money - a.money; });
		this.sendReplyBox(rankLadder("Richest Users", moneyPlural, keys.slice(0, target), "money") + "</div>");
	},

	resetbucks: "resetmoney",
	resetcurrency: "resetmoney",
	resetmoney: function (target, room, user) {
		if (!this.can("money")) return false;
		if (!target) return this.parse("/help resetmoney");
		target = toId(target);
		Db.money.remove(target);
		this.sendReply(`${target} now has 0 ${moneyPlural}.`);
		Economy.logTransaction(`${target} has had their ATM reset by ${user.name}.`);
	},
	resetmoneyhelp: [`/resetmoney [user] - Resets the target user's ATM to 0 ${moneyPlural}. Requires: @, &, or ~.`],

	customsymbol: function (target, room, user) {
		let bannedSymbols = ["!", "|", "‽", "\u2030", "\u534D", "\u5350", "\u223C"];
		for (let u in Config.groups) if (Config.groups[u].symbol) bannedSymbols.push(Config.groups[u].symbol);
		if (!user.canCustomSymbol && !user.can("profile")) return this.sendReply("You need to buy this item from the shop to use.");
		if (!target || target.length > 1) return this.sendReply("/customsymbol [symbol] - changes your symbol (usergroup) to the specified symbol. The symbol can only be one character.");
		if (target.match(/([a-zA-Z 0-9])/g) || bannedSymbols.indexOf(target) >= 0) {
			return this.sendReply("This symbol is banned.");
		}
		user.customSymbol = target;
		user.updateIdentity();
		user.canCustomSymbol = false;
		this.sendReply(`Your symbol is now "${target}". It will be saved until you log off for more than an hour, or the server restarts. You can remove it with /resetsymbol.`);
	},

	removesymbol: "resetsymbol",
	resetsymbol: function (target, room, user) {
		if (!user.customSymbol) return this.sendReply("You don't have a custom symbol!");
		delete user.customSymbol;
		user.updateIdentity();
		this.sendReply("Your symbol has been removed.");
	},

	economy: "economystats",
	currency: "economystats",
	stardust: "economystats",
	economystats: function (target, room, user) {
		if (!this.runBroadcast()) return;
		const users = Db.money.keys().map(curUser => ({amount: Db.money.get(curUser)}));
		const total = users.reduce((acc, cur) => acc + cur.amount, 0);
		let average = Math.floor(total / users.length) || 0;
		let output = `There ${(total > 1 ? "are" : "is")} ${total} ${(total > 1 ? moneyPlural : moneyName)} circulating in the economy.`;
		output += `The average user has ${average} ${(average > 1 ? moneyPlural : moneyName)}.`;
		this.sendReplyBox(output);
	},

	store: "shop",
	shop: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReply(`|raw|${shopDisplay}`);
	},
	shophelp: ["/shop - Display items you can buy with money."],

	buy: function (target, room, user) {
		if (!target) return this.parse("/help buy");
		let amount = Db.money.get(user.userid, 0);
		let cost = findItem.call(this, target, amount);
		if (!cost) return;
		Economy.readMoney(user.userid, money => {
			if (cost > money) return this.errorReply(`You do not have enough ${moneyPlural} to purchase this item.`);
			Economy.writeMoney(user.userid, cost * -1, () => {
				Economy.readMoney(user.userid, amount => {
					Economy.logTransaction(`${user.name} has purchased a ${target} for ${cost} ${(cost === 1 ? global.moneyName : global.moneyPlural)}. They now have ${amount} ${(money === 1 ? global.moneyName : global.moneyPlural)}.`);
					this.sendReply(`You have bought ${target} for ${cost} ${moneyName}${Chat.plural(moneyName)}. You now have ${amount} ${(money === 1 ? global.moneyName : global.moneyPlural)} left.`);
					room.addRaw(`${Server.nameColor(user.name, true)} has bought <strong>"${target}"</strong> from the shop.`);
					handleBoughtItem.call(this, target.toLowerCase(), user, cost);
				});
			});
		});
	},
	buyhelp: ["/buy [item] - Buys an item from the shop."],
};
