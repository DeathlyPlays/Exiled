'use strict';

const fs = require('fs');

// This should be the default amount of money users have.
// Ideally, this should be zero.
const DEFAULT_AMOUNT = 0;

global.moneyName = 'Buck';
global.moneyPlural = 'Bucks';

/**
 * Checks if the money input is actually money.
 *
 * @param {String} money
 * @return {String|Number}
 */
function isMoney(money) {
	let numMoney = Number(money);
	if (isNaN(money)) return "Must be a number.";
	if (String(money).includes('.')) return "Cannot contain a decimal.";
	if (numMoney < 1) return "Cannot be less than one buck.";
	return numMoney;
}

let shop = [
	['Avatar', 'Buys an custom avatar to be applied to your name (You supply. Images larger than 80x80 may not show correctly).', 5],
	['League Room', 'Purchases a room for league usage.', 5],
	['Symbol', 'Buys a custom symbol to go infront of name and puts you at top of userlist. (Temporary until restart, certain symbols are blocked)', 5],
	['Fix', 'Buys the ability to alter your current custom avatar or trainer card. (don\'t buy if you have neither)', 5],
	['Custom Title', 'Buys a title to be added on your /profile (can be refused).', 10],
	['Profile Team', 'Allows you to choose which Pokemon you want to be displayed on your /profile. PM Insist, after purchasing it to have it set. (can be denied)', 20],
	['Icon', 'Buy a custom icon that can be applied to the rooms you want. You must take into account that the provided image should be 32 x 32', 25],
	//['Custom Color', 'Changes the color of your name (can be denied)', 25], //Comment out for now because custom color screws up CSS
	['Room', 'Buys a chatroom for you to own. (within reason, can be refused).', 30],
	['Trainer Card', 'Buys a trainer card which shows information through a command. (You supply, can be refused)', 40],
	['Staff Help', 'Staff member will help set up roomintros and anything else needed in a room. Response may not be immediate.', 50],
	['Roomshop', 'Buys a Roomshop for your League or Room. Will be removed if abused.', 50],
	['Staffmon', 'Buys a Pokemon with your name on it etc to be added in the Exiled Super Staff Bros metagame. Insist will code it, so PM a pastebin/hastebin of what you want the staffmon to have. (can be refused/edited)', 100],
];

let shopDisplay = getShopDisplay(shop);

/**
 * Displays the shop
 *
 * @param {Array} shop
 * @return {String} display
 */
function getShopDisplay(shop) {
	let display = "<center><img src=http://i.imgur.com/8KX56s2.gif><img src=http://i.imgur.com/BkeDY83.png width=250> <img src=http://i.imgur.com/bKJYns1.gif></center><br><div' + (!this.isOfficial ? ' class=infobox-limited' : '') + '><table style='background: #000; border-color: #DF0101; border-radius: 8px' border='1' cellspacing='0' cellpadding='5' width='100%'>" +
		"<tbody><tr><th><font color=#DF0101 face=courier>Item</font></th><th><font color=#DF0101 face=courier>Description</font></th><th><font color=#DF0101 face=courier>Price</font></th></tr>";
	let start = 0;
	while (start < shop.length) {
		display += "<tr>" +
			"<td align='center'><button name='send' style='background: #000; border-radius: 5px; border: solid, 1px, #DF0101; font-size: 11px; padding: 5px 10px' value='/buy " + shop[start][0] + "'><font color=#DF0101 face=courier><b>" + shop[start][0] + "</b></font></button>" + "</td>" +
			"<td align='center'><font color=#DF0101 face=courier>" + shop[start][1] + "</font></td>" +
			"<td align='center'><font color=#DF0101 face=courier>" + shop[start][2] + "</font></td>" +
			"</tr>";
		start++;
	}
	display += "</tbody></table></div><br><center><font color=#000 face=courier>To buy an item from the shop, use /buy <em>Item</em>.</font></center>";
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
		if (typeof callback !== 'function') {
			throw new Error("Economy.readMoney: Expected callback parameter to be a function, instead received " + typeof callback);
		}

		// In case someone forgot to turn `userid` into an actual ID...
		userid = toId(userid);

		let amount = Db('money').get(userid, DEFAULT_AMOUNT);
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

		let curTotal = Db('money').get(userid, DEFAULT_AMOUNT);
		Db('money').set(userid, curTotal + amount);
		let newTotal = Db('money').get(userid);

		if (callback && typeof callback === 'function') {
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
		fs.appendFile('logs/transactions.log', '[' + new Date().toUTCString() + '] ' + message + '\n');
	},

	logDice: function (message) {
		if (!message) return false;
		fs.appendFile('logs/dice.log', '[' + new Date().toUTCString() + '] ' + message + '\n');
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
			this.errorReply("You don't have you enough money for this. You need " + amount + moneyName(amount) + " more to buy " + item + ".");
			return false;
		}
		return price;
	}
	this.errorReply(item + " not found in shop.");
}

function handleBoughtItem(item, user, cost) {
	if (item === 'symbol') {
		user.canCustomSymbol = true;
		this.sendReply("You have purchased a custom symbol. You can use /customsymbol to get your custom symbol.");
		this.sendReply("You will have this until you log off for more than an hour.");
		this.sendReply("If you do not want your custom symbol anymore, you may use /resetsymbol to go back to your old symbol.");
	} else if (item === 'icon') {
		this.sendReply('You purchased an icon, contact an administrator to obtain the article.');
	} else if (item === 'profileteam') {
		Db('hasteam').set(user);
		this.sendReply('You can now set your team!');
	} else {
		let mExiled = '**' + user.name + " has bought " + item + ".**";
		Rooms.rooms.get("staff").add('|c|~Exiled Server|' + mExiled);
		Rooms.rooms.get("staff").update();
		Users.users.forEach(function (user) {
			if (user.group === '~' || user.group === '&' || user.group === '@') {
				user.send('|pm|~Exiled Server|' + user.getIdentity() + '|' + mExiled);
			}
		});
	}
}

exports.commands = {
	'!wallet': true,
	atm: 'wallet',
	wallet: function (target, room, user) {
		if (!target) target = user.name;
		if (!this.runBroadcast()) return;
		let userid = toId(target);
		if (userid.length < 1) return this.sendReply("/wallet - Please specify a user.");
		if (userid.length > 19) return this.sendReply("/wallet - [user] can't be longer than 19 characters.");

		Economy.readMoney(userid, money => {
			this.sendReplyBox(Exiled.nameColor(target, true) + " has " + money + ((money === 1) ? " " + moneyName + "." : " " + moneyPlural + "."));
			//if (this.broadcasting) room.update();
		});
	},

	gb: 'givemoney', //You can change "gb" and "givebucks" to your money name for an alias that applies to your money Example: AwesomeBucks could be "ga" and "giveawesomebucks"
	givebucks: 'givemoney',
	gm:'givemoney',
	givemoney: function (target, room, user, connection, cmd) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.sendReply("Usage: /" + cmd + " [user], [amount]");
		let splitTarget = target.split(',');
		if (!splitTarget[2]) return this.sendReply("Usage: /" + cmd + " [user], [amount], [reason]");
		for (let u in splitTarget) splitTarget[u] = splitTarget[u].trim();

		let targetUser = splitTarget[0];
		if (toId(targetUser).length < 1) return this.sendReply("/" + cmd + " - [user] may not be blank.");
		if (toId(targetUser).length > 19) return this.sendReply("/" + cmd + " - [user] can't be longer than 19 characters");

		let amount = Math.round(Number(splitTarget[1]));
		if (isNaN(amount)) return this.sendReply("/" + cmd + "- [amount] must be a number.");
		if (amount > 1000) return this.sendReply("/" + cmd + " - You can't give more than 1000 " + moneyName + " at a time.");
		if (amount < 1) return this.sendReply("/" + cmd + " - You can't give less than one " + moneyName + ".");

		let reason = splitTarget[2];
		if (reason.length > 100) return this.errorReply("Reason may not be longer than 100 characters.");
		if (toId(reason).length < 1) return this.errorReply("Please specify a reason to give " + moneyName + ".");

		Economy.writeMoney(targetUser, amount, () => {
			Economy.readMoney(targetUser, newAmount => {
				if (Users(targetUser) && Users(targetUser).connected) {
					Users.get(targetUser).popup('|html|You have received ' + amount + ' ' + (amount === 1 ? moneyName : moneyPlural) +
					' from ' + Exiled.nameColor(user.userid, true) + '.');
				}
				this.sendReply(targetUser + " has received " + amount + ((amount === 1) ? " " + moneyName + "." : " " + moneyPlural + "."));
				Economy.logTransaction(user.name + " has given " + amount + ((amount === 1) ? " " + moneyName + " " : " " + moneyPlural + " ") + " to " + targetUser + ". (Reason: " + reason + ") They now have " + newAmount + (newAmount === 1 ? " " + moneyName + "." : " " + moneyPlural + "."));
			});
		});
	},

	tb: 'takemoney', //You can change "tb" and "takebucks" to your money name for an alias that applies to your money Example: AwesomeBucks could be "ta" and "takeawesomebucks"
	takebucks: 'takemoney',
	tm:'takemoney',
	takemoney: function (target, room, user, connection, cmd) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.sendReply("Usage: /" + cmd + " [user], [amount]");
		let splitTarget = target.split(',');
		if (!splitTarget[2]) return this.sendReply("Usage: /" + cmd + " [user], [amount], [reason]");
		for (let u in splitTarget) splitTarget[u] = splitTarget[u].trim();

		let targetUser = splitTarget[0];
		if (toId(targetUser) === user.userid) return this.errorReply("You cannot transfer bucks to yourself.");
		if (toId(targetUser).length < 1) return this.sendReply("/" + cmd + " - [user] may not be blank.");
		if (toId(targetUser).length > 19) return this.sendReply("/" + cmd + " - [user] can't be longer than 19 characters");

		let amount = Math.round(Number(splitTarget[1]));
		if (isNaN(amount)) return this.sendReply("/" + cmd + "- [amount] must be a number.");
		if (amount > 1000) return this.sendReply("/" + cmd + " - You can't take more than 1000 " + moneyName + " at a time.");
		if (amount < 1) return this.sendReply("/" + cmd + " - You can't take less than one " + moneyName + ".");

		let reason = splitTarget[2];
		if (reason.length > 100) return this.errorReply("Reason may not be longer than 100 characters.");
		if (toId(reason).length < 1) return this.errorReply("Please specify a reason to give " + moneyName + ".");

		Economy.writeMoney(targetUser, -amount, () => {
			Economy.readMoney(targetUser, newAmount => {
				if (Users(targetUser) && Users(targetUser).connected) {
					Users.get(targetUser).popup('|html|' + Exiled.nameColor(user.userid, true) + ' has removed ' + amount + ' ' + (amount === 1 ? moneyName : moneyPlural) +
					' from you.<br />');
				}
				this.sendReply("You removed " + amount + ((amount === 1) ? " " + moneyName + " " : " " + moneyPlural + " ") + " from " + Chat.escapeHTML(targetUser));
				Economy.logTransaction(user.name + " has taken " + amount + ((amount === 1) ? " " + moneyName + " " : " " + moneyPlural + " ") + " from " + targetUser + ". (Reason: " + reason + ") They now have " + newAmount + (newAmount === 1 ? " " + moneyName + "." : " " + moneyPlural + "."));
			});
		});
	},

	confirmtransferbucks: 'transfermoney', //You can change "transferbucks" and "confirmtransferbucks" to your money name for an alias that applies to your money Example: AwesomeBucks could be "transferawesomebucks" and "confirmtransferawesomebucks"
	transferbucks: 'transfermoney',
	confirmtransfermoney: 'transfermoney',
	transfermoney: function (target, room, user, connection, cmd) {
		if (!target) return this.sendReply("Usage: /" + cmd + " [user], [amount]");
		let splitTarget = target.split(',');
		for (let u in splitTarget) splitTarget[u] = splitTarget[u].trim();
		if (!splitTarget[1]) return this.sendReply("Usage: /" + cmd + " [user], [amount]");

		let targetUser = (Users.getExact(splitTarget[0]) ? Users.getExact(splitTarget[0]).name : splitTarget[0]);
		if (toId(targetUser).length < 1) return this.sendReply("/" + cmd + " - [user] may not be blank.");
		if (toId(targetUser).length > 18) return this.sendReply("/" + cmd + " - [user] can't be longer than 18 characters.");

		let amount = Math.round(Number(splitTarget[1]));
		if (isNaN(amount)) return this.sendReply("/" + cmd + " - [amount] must be a number.");
		if (amount > 1000) return this.sendReply("/" + cmd + " - You can't transfer more than 1000 " + moneyName + " at a time.");
		if (amount < 1) return this.sendReply("/" + cmd + " - You can't transfer less than one " + moneyName + ".");
		Economy.readMoney(user.userid, money => {
			if (money < amount) return this.sendReply("/" + cmd + " - You can't transfer more " + moneyName + " than you have.");
			if (cmd !== 'confirmtransfermoney' && cmd !== 'confirmtransferbucks') {
				return this.popupReply('|html|<center>' +
					'<button class = "card-td button" name = "send" value = "/confirmtransfermoney ' + toId(targetUser) + ', ' + amount + '"' +
					'style = "outline: none; width: 200px; font-size: 11pt; padding: 10px; border-radius: 14px ; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4); box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.4) inset; transition: all 0.2s;">' +
					'Confirm transfer to <br><b style = "color:' + Exiled.hashColor(targetUser) + '; text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8)">' + Chat.escapeHTML(targetUser) + '</b></button></center>'
				);
			}
			Economy.writeMoney(user.userid, -amount, () => {
				Economy.writeMoney(targetUser, amount, () => {
					Economy.readMoney(targetUser, firstAmount => {
						Economy.readMoney(user.userid, secondAmount => {
							this.popupReply("You sent " + amount + ((amount === 1) ? " " + moneyPlural : " " + moneyPlural) + " to " + targetUser);
							Economy.logTransaction(
								user.name + " has transfered " + amount + ((amount === 1) ? " " + moneyPlural : " " + moneyPlural) + " to " + targetUser + "\n" +
								user.name + " now has " + secondAmount + " " + (secondAmount === 1 ? " " + moneyPlural : " " + moneyPlural) + " " +
								targetUser + " now has " + firstAmount + " " + (firstAmount === 1 ? " " + moneyPlural : " " + moneyPlural)
							);
							if (Users.getExact(targetUser) && Users.getExact(targetUser).connected) {
								Users.getExact(targetUser).send('|popup||html|' + Exiled.nameColor(user.name, true) + " has sent you " + amount + ((amount === 1) ? " " + moneyPlural : " " + moneyPlural));
							}
						});
					});
				});
			});
		});
	},

	moneylog: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.sendReply("Usage: /moneylog [number] to view the last x lines OR /moneylog [text] to search for text.");
		let word = false;
		if (isNaN(Number(target))) word = true;
		let lines = fs.readFileSync('logs/transactions.log', 'utf8').split('\n').reverse();
		let output = '';
		let count = 0;
		let regex = new RegExp(target.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "gi");

		if (word) {
			output += 'Displaying last 50 lines containing "' + target + '":\n';
			for (let line in lines) {
				if (count >= 50) break;
				if (!~lines[line].search(regex)) continue;
				output += lines[line] + '\n';
				count++;
			}
		} else {
			if (target > 100) target = 100;
			output = lines.slice(0, (lines.length > target ? target : lines.length));
			output.unshift("Displaying the last " + (lines.length > target ? target : lines.length) + " lines:");
			output = output.join('\n');
		}
		user.popup("|wide|" + output);
	},

	'!richestuser': true,
	richestusers: 'richestuser',
	richestuser: function (target, room, user) {
		if (!target) target = 100;
		target = Number(target);
		if (isNaN(target)) target = 100;
		if (!this.runBroadcast()) return;
		let keys = Db('money').keys().map(name => {
			return {name: name, money: Db('money').get(name)};
		});
		if (!keys.length) return this.sendReplyBox("Money ladder is empty.");
		keys.sort(function (a, b) { return b.money - a.money; });
		this.sendReplyBox(rankLadder('Richest Users', moneyPlural, keys.slice(0, target), 'money') + '</div>');
	},

	resetbucks: 'resetmoney',
	resetmoney: function (target, room, user) {
		if (!this.can('roomowner')) return false;
		if (!target) return this.parse('/help resetmoney');
		target = toId(target);
		Economy.writeMoney(target, 0);
		this.sendReply(target + " now has 0 " + moneyName + ".");
	},
	resetmoneyhelp: ['/resetmoney [user] - Resets target user\'s money to 0. Requires: &, ~'],

	customsymbol: function (target, room, user) {
		let bannedSymbols = ['!', '|', '‽', '\u2030', '\u534D', '\u5350', '\u223C'];
		for (let u in Config.groups) if (Config.groups[u].symbol) bannedSymbols.push(Config.groups[u].symbol);
		if (!user.canCustomSymbol && !user.can('vip')) return this.sendReply('You need to buy this item from the shop to use.');
		if (!target || target.length > 1) return this.sendReply('/customsymbol [symbol] - changes your symbol (usergroup) to the specified symbol. The symbol can only be one character');
		if (target.match(/([a-zA-Z ^0-9])/g) || bannedSymbols.indexOf(target) >= 0) {
			return this.sendReply('This symbol is banned.');
		}
		user.customSymbol = target;
		user.updateIdentity();
		user.canCustomSymbol = false;
		this.sendReply('Your symbol is now ' + target + '. It will be saved until you log off for more than an hour, or the server restarts. You can remove it with /resetsymbol');
	},

	removesymbol: 'resetsymbol',
	resetsymbol: function (target, room, user) {
		if (!user.customSymbol) return this.sendReply("You don't have a custom symbol!");
		delete user.customSymbol;
		user.updateIdentity();
		this.sendReply('Your symbol has been removed.');
	},

	money: 'economystats',
	bucks: 'economystats',
	economystats: function (target, room, user) {
		if (!this.runBroadcast()) return;
		const users = Object.keys(Db('money').object());
		const total = users.reduce(function (acc, cur) {
			return acc + Db('money').get(cur);
		}, 0);
		let average = Math.floor(total / users.length) || 0;
		let output = "There " + (total > 1 ? "are " : "is ") + total + (total > 1 ? moneyPlural : moneyName) + " circulating in the economy. ";
		output += "The average user has " + average + (average > 1 ? moneyPlural : moneyName) + ".";
		this.sendReplyBox(output);
	},
};
