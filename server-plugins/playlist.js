/*******************************
*                              *
*        Playlists             *
*        By Execute            *
*   Useful for sharing music.  *
*                              *
********************************/

'use strict';

const fs = require('fs');

let blackcss = 'background:#3C3B42;padding:10px;color:white;border:1px solid black; border-radius:6px;text-align:center;';

let data = {};

try {
	data = JSON.parse(fs.readFileSync('config/playlist.json', 'utf8'));
} catch (e) {
	console.log('Error reading playlist data, resorting to resetting all data entries....');
	fs.writeFile('config/playlist.json', JSON.stringify(data), () => {});
	console.log('Playlist data erased.');
}

function save() {
	fs.writeFile('config/playlist.json', JSON.stringify(data), () => {});
}

function playlistGenerator(user) {
	let playlistData = data[user];
	if (!data[user] || data[user].length < 1) return Server.font('This user does not have any playlist data.', 'maroon', true);
	let display = '<div style="' + blackcss + '">';
	for (let i = 0; i < playlistData.length; i++) {
		display += '<button name="send" value="/playlist play, ' + playlistData[i][0] + ', ' + user + '">' + playlistData[i][1] + '</button>';
	}
	display += '</div>';
	return display;
}

exports.commands = {
	playlist : function (target, room, user) {
		if (!target) return this.sendReply('|uhtml|' + user.name + 'playlist|' + playlistGenerator(user.userid));
		let parts = target.split(',');
		switch (toId(parts[0])) {
		case 'add':
			if (parts.length < 3) return this.parse('/playlist help');
			let link = parts[1].trim();
			let title = parts[2].trim();
			if (!data[user.userid]) data[user.userid] = [];
			if (data[user.userid].length > 9) return this.errorReply('You already have exceeded the maximum amount of songs a user may have in their playlist.');
			for (let i = 0; i < data[user.userid].length; i++) {
				if (data[user.userid][i][0] === link) return this.errorReply('You already have this song in your playlist.');
				continue;
			}
			data[user.userid].push([link, title]);
			save();
			return this.sendReply('This song has been added to your playlist!');
		case 'delete':
			if (parts.length < 2) return this.parse('/playlist help');
			let Title = parts[1].trim();
			if (!data[user.userid]) data[user.userid] = [];
			for (let i = 0; i < data[user.userid].length; i++) {
				if (data[user.userid][i][1] === Title) {
					data[user.userid].splice(data[user.userid].indexOf(data[user.userid][i]), 1);
					save();
					return this.sendReply('This song has been removed from your playlist.');
				} else {
					continue;
				}
			}
			return this.errorReply('This song is not in your playlist');
		case 'reset':
			data[user.userid] = [];
			save();
			this.sendReply('You have reset your playlist.');
			break;
		case 'play':
			if (parts.length < 3) return this.parse('/playlist help');
			let userid = toId(parts[2]);
			if (!data[userid]) data[userid] = [];
			for (let i = 0; i < data[userid].length; i++) {
				if (data[userid][i][0] === parts[1].trim()) return this.sendReply('|uhtmlchange|' + userid + 'playlist|<div style="' + blackcss + '"><audio src="' + data[userid][i][0] + '" controls>' + data[userid][i][1] + '</audio><div style="float:right;"><button name="send" value="/playlist back, ' + userid + '">Playlist</button></div></div>');
			}
			return this.errorReply('Your playlist does not contain this song.');
		case 'back':
			if (!parts[1]) return this.sendReply('|uhtmlchange|' + user.name + 'playlist|' + playlistGenerator(user.name));
			return this.sendReply('|uhtmlchange|' + toId(parts[1]) + 'playlist|' + playlistGenerator(toId(parts[1])));

		default:
			return this.sendReply('|uhtml|' + toId(parts[0]) + 'playlist|' + playlistGenerator(toId(parts[0])));
		}
	},
	playlisthelp: [
		"/playlist add, [song mp3 url], [title of the song] - Adds a song to your playlist [Limit of 9 songs].",
		"/playlist delete, [title of the song] - Deletes a song from your playlist.",
		"/playlist reset - Removes all songs from your playlist.",
		"/playlist - Displays your playlist.",
	],
};
