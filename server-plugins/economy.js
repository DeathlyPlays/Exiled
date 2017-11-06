'use strict';

const fs = require('fs');

// This should be the default amount of money users have..
// Ideally, this should be zero.
const DEFAULT_AMOUNT = 0;

global.moneyName = 'Eon Ticket';
global.moneyPlural = 'Eon Tickets';

/**
 * Gets an amount and returns the amount with the name of the money.
 *
 * @examples
 * currencyName(0); // 0 Eon Tickets
 * currencyName(1); // 1 Eon Ticket
 * currencyName(5); // 5 Eon Tickets
 *
 * @param {Number} amount
 * @returns {String}
 */
function currencyName(amount) {
	let name = " Eon Ticket";
	return amount === 1 ? name : name + "s";
}

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
	if (numMoney < 1) return "Cannot be less than one Eon Ticket.";
	return numMoney;
}

let shop = [
	['Avatar', 'Buys an custom avatar to be applied to your name [You supply. Images larger than 80x80 may not show correctly].', 5],
	['Custom Color', 'Changes the color of your name [Can be denied]', 25],
	['Custom Emoticon', 'You provide an image (50x50 Pixels) to be added as an emote on the server. [Can be denied]', 40],
	['Custom PM Box', 'A Custom Designed Personal Messaging Box. [Can be denied]', 75],
	['Custom Title', 'Buys a title to be added on to your profile. [Can be denied].', 10],
	['Fix', 'Buys the ability to alter your current custom avatar or trainer card.', 5],
	['Icon', 'Buy a custom icon that can be applied to the rooms you want. You must take into account that the provided image should be 32 x 32', 25],
	['Kick', 'Kick a user from the chatroom.', 5],
	['League Room', 'Purchases a room for league usage.', 5],
	['Mystery', 'Purchases a Mystery Box [no refunds]', 15],
	['POTD', 'Allows you to change the Pokemon of the Day that shows up guaranteed in Random Battles [Can be refused, or held off if one is already active]', 25],
	['Room', 'Buys a chatroom for you to own. [Within reason, can be denied].', 30],
	['Roomshop', 'Buys a Roomshop for your League or Room. [Will be removed if abused.]', 50],
	['Staffmon', 'Buys a Pokemon with your name on it to be added in the Super Staff Bros Metagame. [Can be denied/edited]', 100],
	['Symbol', 'Buys a custom symbol to go infront of your username and puts you at top of userlist. [Temporary until restart,certain symbols are blocked]', 5],
];

let shopDisplay = getShopDisplay(shop);

/**
 * Displays the shop
 *
 * @param {Array} shop
 * @return {String} display
 */
function getShopDisplay(shop) {
	let display = "<center><img src=https://image.prntscr.com/image/wO_tNEvmQTqr0gNVkEJtSQ.gif><img src=http://i.imgur.com/WOewQZw.gif width=300> <img src=https://play.pokemonshowdown.com/sprites/xyani/latias.gif></center><br><div' + (!this.isOfficial ? ' class=infobox-limited' : '') + '><table style='background: #e8e8e8; border-color: #0f27ff; border-radius: 8px' border='1' cellspacing='0' cellpadding='5' width='100%'>" +
		"<tbody><tr><th><font color=#ff0f0f face=courier>Item</font></th><th><font color=#ff0f0f face=courier>Description</font></th><th><font color=#ff0f0f face=courier>Price</font></th></tr>";
	let start = 0;
	while (start < shop.length) {
		display += "<tr>" +
			"<td align='center'><button name='send' style='background: #e8e8e8; border-radius: 5px; border: solid, 1px, #0f27ff; font-size: 11px; padding: 5px 10px' value='/buy " + shop[start][0] + "'><font color=#ff0f0f face=courier><strong>" + shop[start][0] + "</strong></font></button>" + "</td>" +
			"<td align='center'><font color=#ff0f0f face=courier>" + shop[start][1] + "</font></td>" +
			"<td align='center'><font color=#ff0f0f face=courier>" + shop[start][2] + "</font></td>" +
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
		fs.appendFile('logs/transactions.log', '[' + new Date().toUTCString() + '] ' + message + '\n', () => {});
	},

	logDice: function (message) {
		if (!message) return false;
		fs.appendFile('logs/dice.log', '[' + new Date().toUTCString() + '] ' + message + '\n', () => {});
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
			this.errorReply("You don't have you enough money for this. You need " + amount + currencyName(amount) + " more to buy " + item + ".");
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
	} else if (item === 'mystery') {
		user.canOpenMysteryBox = true;
		this.sendReply("Good luck! Happy unboxing :)");
	} else {
		let msg = '**' + user.name + " has bought " + item + ".**";
		Monitor.log('~' + Config.serverName + ' Server' + msg);
		Users.users.forEach(function (user) {
			if (user.group === '~' || user.group === '&' || user.group === '@') {
				user.send('|pm|~' + Config.serverName + ' Server|' + user.getIdentity() + '|' + msg);
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
	'!wallet': true,
	atm: 'wallet',
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

	giveeonticket: 'givemoney',
	giveeontickets: 'givemoney',
	givemoney: function (target, room, user) {
		if (!this.can('hotpatch')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help givemoney');

		let parts = target.split(',');
		let username = parts[0];
		let amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.errorReply(amount);

		let total = Db('money').set(toId(username), Db('money').get(toId(username), 0) + amount).get(toId(username));
		amount = amount + currencyName(amount);
		total = total + currencyName(total);
		this.sendReply(username + " was given " + amount + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users(username).popup("|html|" + Server.nameColor(user.name) + " has given you " + amount + ". You now have " + total + ".");
		Economy.logTransaction(username + " was given " + amount + " by " + user.name + ". " + username + " now has " + total);
	},
	givemoneyhelp: ["/givemoney [user], [amount] - Give a user a certain amount of money."],

	takeeonticket: 'takemoney',
	takeeontickets: 'takemoney',
	takebucks: 'takemoney',
	takemoney: function (target, room, user) {
		if (!this.can('hotpatch')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help takemoney');

		let parts = target.split(',');
		let username = parts[0];
		let amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.errorReply(amount);

		let total = Db('money').set(toId(username), Db('money').get(toId(username), 0) - amount).get(toId(username));
		amount = amount + currencyName(amount);
		total = total + currencyName(total);
		this.sendReply(username + " lost " + amount + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users(username).popup(user.name + " has taken " + amount + " from you. You now have " + total + ".");
		Economy.logTransaction(username + " had " + amount + " taken away by " + user.name + ". " + username + " now has " + total);
	},
	takemoneyhelp: ["/takemoney [user], [amount] - Take a certain amount of money from a user."],

	transfer: 'transfermoney',
	transfereonticket: 'transfermoney',
	transfereontickets: 'transfermoney',
	transferbucks: 'transfermoney',
	transfermoney: function (target, room, user) {
		if (!target || target.indexOf(',') < 0) return this.parse('/help transfermoney');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isMoney(parts[1]);

		if (toId(username) === user.userid) return this.errorReply("You cannot transfer to yourself.");
		if (username.length > 19) return this.errorReply("Username cannot be longer than 19 characters.");
		if (typeof amount === 'string') return this.errorReply(amount);
		if (amount > Db('money').get(user.userid, 0)) return this.errorReply("You cannot transfer more money than what you have.");

		Db('money')
			.set(user.userid, Db('money').get(user.userid) - amount)
			.set(uid, Db('money').get(uid, 0) + amount);

		let userTotal = Db('money').get(user.userid) + currencyName(Db('money').get(user.userid));
		let targetTotal = Db('money').get(uid) + currencyName(Db('money').get(uid));
		amount = amount + currencyName(amount);

		this.sendReply("You have successfully transferred " + amount + ". You now have " + userTotal + ".");
		if (Users.get(username)) Users(username).popup('|raw|' + Server.nameColor(user.name) + " has transferred " + amount + ". You now have " + targetTotal + ".");
		Economy.logTransaction(user.name + " transferred " + amount + " to " + username + ". " + user.name + " now has " + userTotal + " and " + username + " now has " + targetTotal + ".");
	},
	transfermoneyhelp: ["/transfer [user], [amount] - Transfer a certain amount of money to a user."],

	moneylog: function (target, room, user) {
		if (!this.can('hotpatch')) return false;
		if (!target) return this.sendReply("Usage: /moneylog [number] to view the last x lines OR /moneylog [text] to search for text.");
		let word = false;
		if (isNaN(Number(target))) word = true;
		let lines = fs.readFileSync('logs/transactions.log', 'utf8').split('\n').reverse();
		let output = '';
		let count = 0;
		let regex = new RegExp(target.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'), "gi");

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

	store: 'shop',
	shop: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReply("|raw|" + shopDisplay);
	},
	shophelp: ["/shop - Display items you can buy with money."],

	buy: function (target, room, user) {
		if (!target) return this.parse('/help buy');
		let amount = Db('money').get(user.userid, 0);
		let cost = findItem.call(this, target, amount);
		if (!cost) return;
		let total = Db('money').set(user.userid, amount - cost).get(user.userid);
		this.sendReply("You have bought " + target + " for " + cost + currencyName(cost) + ". You now have " + total + currencyName(total) + " left.");
		room.addRaw(user.name + " has bought <strong>" + target + "</strong> from the shop.");
		Economy.logTransaction(user.name + " has bought " + target + " from the shop. This user now has " + total + currencyName(total) + ".");
		handleBoughtItem.call(this, target.toLowerCase(), user, cost);
	},
	buyhelp: ["/buy [command] - Buys an item from the shop."],

	'!richestuser': true,
	richestusers: 'richestuser',
	richestuser: function (target, room, user) {
		if (!target) target = 100;
		target = Number(target);
		if (isNaN(target)) target = 100;
		if (!this.runBroadcast()) return;
		let keys = Object.keys(Db("money").object()).map(function (name) {
			return {name: name, money: Db("money").get(name)};
		});
		if (!keys.length) return this.sendReplyBox("Money ladder is empty.");
		keys.sort(function (a, b) { return b.money - a.money; });
		this.sendReplyBox(rankLadder('Richest Users', moneyPlural, keys.slice(0, target), 'money') + '</div>');
	},

	reseteonticket: 'resetmoney',
	reseteontickets: 'resetmoney',
	resetmoney: function (target, room, user) {
		if (!this.can('hotpatch')) return false;
		Db('money').set(toId(target), 0);
		this.sendReply(target + " has had their " + moneyPlural + " reset.");
		Economy.logTransaction(user.name + " reset " + target + "'s " + moneyPlural + ".");
	},
	resetmoneyhelp: ["/resetmoney [user] - Reset user's money to zero."],

	customsymbol: function (target, room, user) {
		let bannedSymbols = ['!', '|', '‽', '\u2030', '\u534D', '\u5350', '\u223C'];
		for (let u in Config.groups) if (Config.groups[u].symbol) bannedSymbols.push(Config.groups[u].symbol);
		if (!user.canCustomSymbol && !user.can('vip')) return this.sendReply('You need to buy this item from the shop to use.');
		if (!target || target.length > 1) return this.parse('/customsymbolhelp');
		if (target.match(/([a-zA-Z ^0-9])/g) || bannedSymbols.indexOf(target) >= 0) {
			return this.sendReply('This symbol is banned.');
		}
		user.customSymbol = target;
		user.updateIdentity();
		user.canCustomSymbol = false;
		this.sendReply('Your symbol is now ' + target + '. It will be saved until you log off for more than an hour, or the server restarts. You can remove it with /resetsymbol');
	},
	customsymbolhelp: ["/customsymbol [symbol] - changes your symbol (usergroup) to the specified symbol. The symbol can only be one character"],

	removesymbol: 'resetsymbol',
	resetsymbol: function (target, room, user) {
		if (!user.customSymbol) return this.sendReply("You don't have a custom symbol!");
		delete user.customSymbol;
		user.updateIdentity();
		this.sendReply('Your symbol has been removed.');
	},

	eontickets: 'economystats',
	economystats: function (target, room, user) {
		if (!this.runBroadcast()) return;
		const users = Object.keys(Db('money').object());
		const total = users.reduce(function (acc, cur) {
			return acc + Db('money').get(cur);
		}, 0);
		let average = Math.floor(total / users.length) || '0';
		let output = "There " + (total > 1 ? "are " : "is ") + total + currencyName(total) + " circulating in the economy. ";
		output += "The average user has " + average + currencyName(average) + ".";
		this.sendReplyBox(output);
	},

	//Inspired from Gold
	mysterybox: function (target, room, user) {
		if (room.id !== 'lobby') return this.errorReply("You must buy this item in the Lobby!");
		if (!user.canOpenMysteryBox) return this.sendReply('You need to buy this item from the shop to use.');
		let randomNumber = Math.floor((Math.random() * 100) + 1);
		let prize = '';
		let goodBad = '';
		let opts;
		if (randomNumber < 70) {
			goodBad = 'bad';
			opts = ['nothing', 'rick rolled', 'kick from Lobby', 'lol 45 sec mute'];
			prize = opts[Math.floor(Math.random() * opts.length)];
		} else if (randomNumber > 70) {
			goodBad = 'good';
			opts = ['small money prize', 'medium money prize', 'large money prize', 'jackpot', 'custom symbol', 'ability to set the PotD', 'custom color', 'a new mystery box', 'custom icon'];
			prize = opts[Math.floor(Math.random() * opts.length)];
		}
		switch (prize) {
		//Good Prizes
		case 'small money prize':
			Economy.writeMoney(user.userid, 5);
			this.sendReply('Well, it\'s not the worst thing.... You received 5 ' + moneyPlural + '.');
			break;
		case 'medium money prize':
			Economy.writeMoney(user.userid, 15);
			this.sendReply('Not bad, you received 15 ' + moneyPlural + '.');
			break;
		case 'large money prize':
			Economy.writeMoney(user.userid, 30);
			this.sendReply('Nice! You received 30 ' + moneyPlural + '!');
			break;
		case 'jackpot':
			Economy.writeMoney(user.userid, 50);
			this.sendReply("CONGRATULATIONS!!!! YOU JUST HIT THE JACKPOT!!!! HERE'S 50 " + moneyPlural + "!!!!!");
			break;
		case 'custom symbol':
			user.canCustomSymbol = true;
			this.sendReply("Do /customsymbol [symbol] to set a FREE custom symbol! (Do /rs to reset your custom symbol when you want to remove it later.)");
			break;
		case 'ability to set the PotD':
			Server.pmStaff(user.name + " has won the " + prize + ". Please PM them to proceed with giving them this.", "~" + Config.serverName + " Server");
			break;
		case 'custom color':
			Server.pmStaff(user.name + " has won a " + prize + ". Please PM them to proceed with giving them this.", "~" + Config.serverName + " Server");
			break;
		case 'a new mystery box':
			user.canOpenMysteryBox = true;
			this.sendReply("Yay, fun! You received another Mystery Box.");
			break;
		case 'custom icon':
			this.sendReply("PM a Global Driver or higher to claim this prize!");
			Server.pmStaff(user.name + " has received a " + prize + " from the Mystery Box. Please assist them as soon as possible", "~" + Config.serverName + "Server");
			break;
		//Meme Rewards/Bad Rewards
		case 'nothing':
			this.sendReplyBox('<strong>RIP</strong><br /><div style="background: url(http://moziru.com/images/tombstone-clipart-20.png); background-size: 100% 100%; height: 200px"></div>');
			break;
		case 'rick rolled':
			this.sendReplyBox("<blink>" +
				"Never gonna give you up<br />" +
				"Never gonna let you down<br />" +
				"Never gonna run around and desert you<br />" +
				"Never gonna make you cry<br />" +
				"Never gonna say goodbye<br />" +
				"Never gonna tell a lie and hurt you</blink>"
			);
			break;
		case 'kick from Lobby':
			try {
				user.leaveRoom('lobby');
				user.popup("You have been kicked from the Lobby by the Mystery Box!");
			} catch (e) {}
			break;
		case 'lol 45 sec mute':
			try {
				Rooms('lobby').mute(user, 0.45 * 60 * 1000, false);
			} catch (e) {}
			break;
		default:
			break;
		}
		user.canOpenMysteryBox = false;
		Rooms('lobby').add("|raw|" + Server.nameColor(user.name, true) + " has bought a Mystery Box from the shop! " + (goodBad === 'good' ? "They have won a <strong>" + prize + "</strong>!" : "Oh no!  They got a " + prize + " from their pack :(")).update();
	},
};
