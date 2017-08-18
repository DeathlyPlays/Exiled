/**
 * Main file
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This is the main Pokemon Showdown app, and the file you should be
 * running to start Pokemon Showdown if you're using it normally.
 *
 * This file sets up our SockJS server, which handles communication
 * between users and your server, and also sets up globals. You can
 * see details in their corresponding files, but here's an overview:
 *
 * Users - from users.js
 *
 *   Most of the communication with users happens in users.js, we just
 *   forward messages between the sockets.js and users.js.
 *
 * Rooms - from rooms.js
 *
 *   Every chat room and battle is a room, and what they do is done in
 *   rooms.js. There's also a global room which every user is in, and
 *   handles miscellaneous things like welcoming the user.
 *
 * Dex - from sim/dex.js
 *
 *   Handles getting data about Pokemon, items, etc.
 *
 * Ladders - from ladders.js and ladders-remote.js
 *
 *   Handles Elo rating tracking for players.
 *
 * Chat - from chat.js
 *
 *   Handles chat and parses chat commands like /me and /ban
 *
 * Sockets - from sockets.js
 *
 *   Used to abstract out network connections. sockets.js handles
 *   the actual server and connection set-up.
 *
 * @license MIT license
 */

'use strict';

const FS = require('./fs');

// Check for version and dependencies
try {
	// I've gotten enough reports by people who don't use the launch
	// script that this is worth repeating here
	eval('{ let a = async () => {}; }');
} catch (e) {
	throw new Error("We require Node.js version 8 or later; you're using " + process.version);
}
try {
	require.resolve('sockjs');
} catch (e) {
	throw new Error("Dependencies are unmet; run node pokemon-showdown before launching Pokemon Showdown again.");
}

/*********************************************************
 * Load configuration
 *********************************************************/

try {
	require.resolve('./config/config');
} catch (err) {
	if (err.code !== 'MODULE_NOT_FOUND') throw err; // should never happen
	throw new Error('config.js does not exist; run node pokemon-showdown to set up the default config file before launching Pokemon Showdown again.');
}

global.Config = require('./config/config');

if (Config.forever) {
	const INIT_WINDOW = process.platform === 'win32' ? 30000 : 20000;

	const HEARTBEAT_SEND_WINDOW = 2500;
	const HEARTBEAT_ACK_WINDOW = 10000;
	const HEARTBEAT_ACK_EXEC_WINDOW = 5000;

	if (!process.env['PSFOREVER']) {
		// Time window counting from the child process fork in which we won't check for heart beats.
		const childEnvironment = Object.assign({}, process.env);
		childEnvironment['PSFOREVER'] = '1';

		let child = null;
		let hbInterval = null;
		let lastMessageTime = 0;
		let lastTimedOut = false;

		const runCheckHeartBeats = () => {
			if (lastMessageTime + HEARTBEAT_ACK_WINDOW < Date.now()) {
				console.log(`(forever) Managed PS process does not respond. SIGTERM sent.`);
				lastTimedOut = true;
				child.kill();
			}
		};

		const initExpectHeartBeats = () => {
			runCheckHeartBeats();
			hbInterval = setInterval(runCheckHeartBeats, HEARTBEAT_ACK_EXEC_WINDOW);
		};

		const stopExpectHeartBeats = () => {
			if (hbInterval) {
				clearInterval(hbInterval);
				hbInterval = null;
			}
		};

		const reFork = () => {
			const isTimeOutReFork = Boolean(lastTimedOut);
			stopExpectHeartBeats();

			lastTimedOut = false;
			child = childProcess.fork('./app', process.argv.slice(2).concat(isTimeOutReFork ? ['--debug'] : []), {env: childEnvironment});
			child.on('exit', reFork).on('error', err => require('./crashlogger')(err));
			child.on('message', message => {
				if (message === 'h') {
					if (isTimeOutReFork) console.log(`(forever) Heartbeat acknowledged`);
					lastMessageTime = Math.max(lastMessageTime, Date.now());
				} else if (/^w\d+$/) {
					console.log(`(forever) Managed PS process requested a wait of ${Number(message.slice(1))}ms`);
					lastMessageTime = Math.max(lastMessageTime, Date.now() + Number(message.slice(1)));
				}
			});
			setTimeout(initExpectHeartBeats, INIT_WINDOW);
		};

		reFork();
		return;
	} else {
		const sendHeartBeat = () => process.send('h');
		sendHeartBeat();
		global.HEARTBEAT_INTERVAL = setInterval(sendHeartBeat, HEARTBEAT_SEND_WINDOW);
	}
}

if (Config.watchconfig) {
	let configPath = require.resolve('./config/config');
	FS(configPath).onModify(() => {
		try {
			delete require.cache[configPath];
			global.Config = require('./config/config');
			if (global.Users) Users.cacheGroupData();
			console.log('Reloaded config/config.js');
		} catch (e) {
			console.error(`Error reloading config/config.js: ${e.stack}`);
		}
	});
}

/*********************************************************
 * Set up most of our globals
 *********************************************************/

global.Exiled = {};

global.Monitor = require('./monitor');

global.Dex = require('./sim/dex');
global.toId = Dex.getId;

global.LoginServer = require('./loginserver');

global.Ladders = require(Config.remoteladder ? './ladders-remote' : './ladders');

global.Users = require('./users');

global.Punishments = require('./punishments');

global.Console = require('./console.js');

global.Chat = require('./chat');

global.Rooms = require('./rooms');

global.Tells = require('./tells');

global.Ontime = {};

global.sqlite3 = require('sqlite3');

global.forever = {};

global.Db = require('origindb')('config/db');

delete process.send; // in case we're a child process
global.Verifier = require('./verifier');
Verifier.PM.spawn();

global.Tournaments = require('./tournaments');

global.Dnsbl = require('./dnsbl');
Dnsbl.loadDatacenters();

if (Config.crashguard) {
	// graceful crash - allow current battles to finish before restarting
	process.on('uncaughtException', err => {
		let crashType = require('./crashlogger')(err, 'The main process');
		if (crashType === 'lockdown') {
			Rooms.global.startLockdown(err);
		} else {
			Rooms.global.reportCrash(err);
		}
	});
	process.on('unhandledRejection', err => {
		throw err;
	});
	process.on('exit', code => {
		let exitCodes = {
			1: 'Uncaught Fatal Exception',
			2: 'Misuse of shell builtins',
			3: 'Internal JavaScript Parse Error',
			4: 'Internal JavaScript Evaluation Failure',
			5: 'Fatal Error',
			6: 'Non-function Internal Exception Handler',
			7: 'Internal Exception Handler Run-Time Failure',
			8: 'Unused Error Code. Formerly used by nodejs. Sometimes indicate a uncaught exception',
			9: 'Invalid Argument',
			10: 'Internal JavaScript Run-Time Failure',
			11: 'A sysadmin forced an emergency exit',
			12: 'Invalid Debug Argument',
			130: 'Control-C via Terminal or Command Prompt',
		};
		if (code !== 0) {
			let exitInfo = 'Unused Error Code';
			if (exitCodes[code]) {
				exitInfo = exitCodes[code];
			} else if (code > 128) {
				exitInfo = 'Signal Exit';
			}
			console.log('');
			console.error('WARNING: Process exiting with code ' + code);
			console.error('Exit code details: ' + exitInfo + '.');
			console.error('Refer to https://github.com/nodejs/node-v0.x-archive/blob/master/doc/api/process.markdown#exit-codes for more details. The process will now exit.');
		}
	});
}

/*********************************************************
 * Start networking processes to be connected to
 *********************************************************/

global.Sockets = require('./sockets');

exports.listen = function (port, bindAddress, workerCount) {
	Sockets.listen(port, bindAddress, workerCount);
};

if (require.main === module) {
	// Launch the server directly when app.js is the main module. Otherwise,
	// in the case of app.js being imported as a module (e.g. unit tests),
	// postpone launching until app.listen() is called.
	let port;
	if (process.argv[2]) port = parseInt(process.argv[2]);
	Sockets.listen(port);
}

/*********************************************************
 * Set up our last global
 *********************************************************/

global.TeamValidator = require('./team-validator');
TeamValidator.PM.spawn();

/*********************************************************
 * Start up the githubhook server
 ********************************************************/
require('./github');

/*********************************************************
 * Start up the REPL server
 *********************************************************/

require('./repl').start('app', cmd => eval(cmd));
