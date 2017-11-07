/*
 *The following were coded by:
 *    Volco,
 *    Gyaratoast,
 *    and
 *    ReturningAvenger (aka DeathlyPlays/Insist)
 */


'use strict';

exports.commands = {
	"!shrug" : true,
	shrug: function () {
		this.parse("¯\\_(ツ)_/¯");
	},
	murder: function (target, room, user) {
		if (!target) return this.sendReply('/murder needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has murdered  ' + Server.nameColor(target, true, true) + '!');
		targetUser.popup("WASTED!");
	},
	'!slap': true,
	slap: function (target) {
		if (!target) return this.sendReply("/slap needs a target.");
		this.parse('/me slaps ' + target + ' in the face with a slipper!');
	},
	'!eat': true,
	eat: function (target) {
		if (!target) return this.sendReply("/eat needs a target.");
		this.parse('/me eats ' + target + '!');
	},
	foh: function (target, room, user) {
		if (!target) return this.sendReply('/foh needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has just told  ' + Server.nameColor(target, true, true) + ' to get the fuck outta here!');
		targetUser.popup("GET THE FUCK OUTTA HERE BOI!");
	},
	hid: function (target, room, user) {
		if (!target) return this.sendReply('/hid needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		room.addRaw(Server.nameColor(user.name, true, true) + ' has hid behind ' + Server.nameColor(target, true, true) + '.');
	},
	idgaf: function (target, room, user) {
		if (!target) return this.sendReply('/idgaf needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' doesn\'t give a fuck about  ' + Server.nameColor(target, true, true) + '!');
		targetUser.popup("Idgaf!");
	},
	smash: function (target, room, user) {
		if (!target) return this.sendReply('/smash needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has head smashed  ' + Server.nameColor(target, true, true) + '!');
		targetUser.popup("FUCKING SMASHING!");
	},
	outrage: function (target, room, user) {
		if (!target) return this.sendReply('/outrage needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' uses Outrage on the opposing  ' + Server.nameColor(target, true, true) + '!');
		targetUser.popup("Watch out for the wrath!");
	},
	catch: function (target, room, user) {
		if (!target) return this.sendReply('/catch needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has caught  ' + Server.nameColor(target, true, true) + ' in their Pokeball.');
		targetUser.popup("FUCKING SMASHING!");
	},
	explode: function (target, room, user) {
		if (!target) return this.sendReply('/explode needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has exploded on  ' + Server.nameColor(target, true, true) + '!');
		targetUser.popup("ALLY AKBAR!!!!!!");
	},
	slam: function (target, room, user) {
		if (!target) return this.sendReply('/slam needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Boi get slammed!');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has Body Slammed  ' + Server.nameColor(target, true, true) + '!');
		targetUser.popup("FUCKING BODIED!");
	},
	chal: function (target, room, user) {
		if (!target) return this.sendReply('/chal needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Pffft your challenge meant nothing!');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has challenged  ' + Server.nameColor(target, true, true) + ' to a battle!');
		targetUser.popup("You were just challenged to a battle!");
	},
	poke: function (target, room, user) {
		if (!target) return this.sendReply('/poke needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('No you get poked! You cannot master the capability of the epicness that is using the POKE.');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has poked  ' + Server.nameColor(target, true, true) + '!');
		targetUser.popup("You were just poked!");
	},
	sweep: function (target, room, user) {
		if (!target) return this.sendReply('/sweep needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Why you always lying!?!?!');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has just swept  ' + Server.nameColor(target, true, true) + '!');
		targetUser.popup("You were ANNIHILATED!");
	},
	rko: function (target, room, user) {
		if (!target) return this.sendReply('/rko needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Hey, you, you aren\'t tough enough to express the usage of this!');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has RKO\'ed  ' + Server.nameColor(target, true, true) + '!');
		targetUser.popup("RKO OUTTA NOWHERE!");
	},
	analyze: function (target, room, user) {
		if (!target) return this.sendReply('/analyze needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('You lack the psychological powers to use this.');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' is analyzing  ' + Server.nameColor(target, true, true) + '\'s intentions.');
		targetUser.popup("You are being analyzed!");
	},
	whip: function (target, room, user) {
		if (!target) return this.sendReply('/whip needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has whipped ' + Server.nameColor(targetUser, true, true) + '.');
		targetUser.popup(user.name + ' has whipped you.');
	},
	smack: function (target, room, user) {
		if (!target) return this.sendReply('/smack needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has smacked ' + Server.nameColor(targetUser, true, true) + '.');
		targetUser.popup(user.name + ' has just smacked you.');
	},
	memed: function (target, room, user) {
		if (!target) return this.sendReply('/memed needs a target.');
		if (!this.can('declare')) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has memed ' + Server.nameColor(targetUser, true, true) + '.');
		this.parse('/declare NIIIIICE MEEEEME');
	},
	banhammer: function (target, room, user) {
		if (!target) return this.sendReply('/banhammer needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		if (targetUser.can('root')) return this.sendReply('You cannot ban an Admin - nice try. Chump.');
		room.addRaw(Server.nameColor(user.name, true, true) + ' has gave the hammer to ' + Server.nameColor(target, true, true) + '.');
		targetUser.popup("The Hammer has been dropped");
	},
	rekt: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><img src="http://i.imgur.com/C26ZRE6.gif" width="600" height="300"</center>');
	},
	bombing: function (target, room, user) {
		if (!target) return this.sendReply('/bombing needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' bombed ' + Server.nameColor(target, true, true) + '.');
		targetUser.popup("The bomb has exploded");
	},
	noscope: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><img src=http://stream1.gifsoup.com/view3/20140324/5006332/360-noscope-chicken-o.gif width="600" height="300"</center>');
	},
	roflstomp: function (target, room, user) {
		if (!target) return this.sendReply('/roflstomp needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has roflstomped ' + Server.nameColor(target, true, true) + '.');
		targetUser.popup("GIT ROFLSTOMPED BOII!");
	},
	tip: function (target, room, user) {
		if (!target) return this.sendReply('/tip needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has tipped their fedora to ' + Server.nameColor(targetUser, true, true) + '.');
		targetUser.popup('Someone has tipped their fedora to you');
	},
	bow: function (target, room, user) {
		if (!target) return this.sendReply('/bow needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has bowed to ' + Server.nameColor(targetUser, true, true) + '.');
		targetUser.popup('Someone has bowed to you');
	},
	rekted: function (target, room, user) {
		if (!target) return this.sendReply('/rekted needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has destroyed ' + Server.nameColor(targetUser, true, true) + '.');
		targetUser.popup('Someone has destroyed you');
	},
	smite: function (target, room, user) {
		if (!target) return this.sendReply('/smite needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has smited ' + Server.nameColor(targetUser, true, true) + ' with their wrath.');
		targetUser.popup('A GOD has made you feel their wrath');
	},
	fired: function (target, room, user) {
		if (!target) return this.sendReply('/fired needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' fired ' + Server.nameColor(targetUser, true, true) + '.');
		targetUser.popup('YOU HAVE BEEN FIRED!');
	},
	broke: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><video src="http://r4---sn-ab5l6nzs.googlevideo.com/videoplayback?source=youtube&pl=24&mime=video/webm&ip=68.132.51.87&expire=1456788631&id=o-AHMd8ZLgKPboESCKb60dXCAAV6rjEC9Kof3-2-QQfdB8&keepalive=yes&upn=1M4ZMLLmG0w&key=cms1&fexp=9406852,9408491,9412845,9416126,9416985,9418223,9420452,9422596,9423661,9423662,9424037,9424135,9424772,9425780,9427245,9429055,9429087,9429505&clen=170856526&itag=242&dur=35995.760&signature=34DC47CC23F06F6F70A02FD47DE6DA98EE94D7C1.7185593359F397AC90C9498AD91CB6A09211E9E2&ipbits=0&sver=3&sparams=clen,dur,expire,gir,id,initcwndbps,ip,ipbits,itag,keepalive,lmt,mime,mm,mn,ms,mv,nh,pl,source,upn&lmt=1449590895266333&gir=yes&title=Windows-Error-Remix-10-Hours%20[BollyCine.Net]&redirect_counter=1&req_id=a7b35ef98b4ba3ee&cms_redirect=yes&mm=30&mn=sn-ab5l6nzs&ms=nxu&mt=1456766974&mv=m" controls"play/stop" width="400" height="300"></video></center>');
	},
	dunked: function (target, room, user) {
		if (!target) return this.sendReply('/dunked needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('GET DUNKED ON!(access denied)');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' just dunked on ' + Server.nameColor(targetUser, true, true) + '.');
		targetUser.popup('GET DUNKED ON FOOL!!!!');
	},
	dank: function (target, room, user) {
		if (!target) return this.sendReply('/dank needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('YOU ARENT DANK ENOUGH! (Access Denied!)');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(targetUser, true, true) + ' has received a dank meme from ' + Server.nameColor(user.name, true, true) + '.');
		targetUser.popup('You have received a dank meme (legend of zelda treasure found music plays)');
	},
	sans: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center>So I got a question for you.... do you think the worst person.. can change?<br><img src="http://i.imgur.com/DPr9ifK.gif" height="50" width="50"><br>heh alright i have a better question... DO YOU WANNA HAVE A BAD TIME?!<br><br><audio src="https://dl.pushbulletusercontent.com/Jyh0owl5BR8rNmcQjFH9VlrQaDPKWCeT/Megalovania.mp3" controls=""></audio></center>');
	},
	trump: function () {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><img src="http://cdn.buzzlie.com/wp-content/uploads/2015/11/54a07996c8f1c37f77be418079ae352a.jpg" height="300" width="300"><br></center>');
	},
	sans2: function (target, room) {
		if (!target) return this.sendReply('/sans2 needs a target.');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(targetUser, true, true) + ' JUST GOT DUNKED ON!!!!!');
		targetUser.popup('|html|<center><img src="http://lpix.org/2269600/4000.gif" height="300" width="300"</center><br>GEEEEEET DUNKED ON!!!');
	},
	break: function (target, room, user) {
		if (!target) return this.sendReply('/break needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has broken ' + Server.nameColor(targetUser, true, true) + '.');
		targetUser.popup(user.name + ' has smashed you 2 bits.');
	},
	swat: function (target, room, user) {
		if (!target) return this.sendReply('/swat needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has swatted ' + Server.nameColor(targetUser, true, true) + ' out of the sky');
	},
	donger: function (target, room, user) {
		if (!target) return this.sendReply('/donger needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has begun a riot against ' + Server.nameColor(targetUser, true, true) + '.');
		this.parse('ᕙ༼ຈل͜ຈ༽ᕗ flex your dongers ᕙ༼ຈل͜ຈ༽ᕗ');
	},
	dongers: function (room, user) {
		if (!this.can('declare')) return this.errorReply('Access Denied');
		room.addRaw(Server.nameColor(user.name, true, true) + ' has begun a donger ambush.');
		this.parse('/declare ᕙ༼ຈل͜ຈ༽ᕗ flex your dongers ᕙ༼ຈل͜ຈ༽ᕗ');
		this.parse('/declare ╚═། ◑ ▃ ◑ །═╝ do you like my dongers? ╚═། ◑ ▃ ◑ །═╝');
		this.parse('/declare ᕙ༼ຈل͜ຈ༽ᕗ I made my dongers just for you ᕙ༼ຈل͜ຈ༽ᕗ');
		this.parse('/declare (ノ͡° ͜ʖ ͡°)ノ︵┻┻ flip your dongers all around');
		this.parse('/declare ᕙ༼ຈل͜ຈ༽ᕗ flex your dongers ᕙ༼ຈل͜ຈ༽ᕗ');
		this.parse('/declare ᕙ༼ຈل͜ຈ༽ᕗ flex your dongers ᕙ༼ຈل͜ຈ༽ᕗ');
		this.parse('/declare ╚═། ◑ ▃ ◑ །═╝ do you like my dongers? ╚═། ◑ ▃ ◑ །═╝');
		this.parse('/declare ᕙ༼ຈل͜ຈ༽ᕗ I made my dongers just for you ᕙ༼ຈل͜ຈ༽ᕗ');
		this.parse('/declare (ノ͡° ͜ʖ ͡°)ノ︵┻┻ flip your dongers all around');
		this.parse('/declare ᕙ༼ຈل͜ຈ༽ᕗ flex your dongers ᕙ༼ຈل͜ຈ༽ᕗ');
		this.parse('/declare ᕙ༼ຈل͜ຈ༽ᕗ flex your dongers ᕙ༼ຈل͜ຈ༽ᕗ');
		this.parse('/declare ╚═། ◑ ▃ ◑ །═╝ do you like my dongers? ╚═། ◑ ▃ ◑ །═╝');
		this.parse('/declare ᕙ༼ຈل͜ຈ༽ᕗ I made my dongers just for you ᕙ༼ຈل͜ຈ༽ᕗ');
		this.parse('/declare (ノ͡° ͜ʖ ͡°)ノ︵┻┻ flip your dongers all around');
		this.parse('/declare ᕙ༼ຈل͜ຈ༽ᕗ flex your dongers ᕙ༼ຈل͜ຈ༽ᕗ');
		this.parse('/declare ᕙ༼ຈل͜ຈ༽ᕗ flex your dongers ᕙ༼ຈل͜ຈ༽ᕗ');
		this.parse('/declare ╚═། ◑ ▃ ◑ །═╝ do you like my dongers? ╚═། ◑ ▃ ◑ །═╝');
		this.parse('/declare ᕙ༼ຈل͜ຈ༽ᕗ I made my dongers just for you ᕙ༼ຈل͜ຈ༽ᕗ');
		this.parse('/declare (ノ͡° ͜ʖ ͡°)ノ︵┻┻ flip your dongers all around');
		this.parse('/declare ᕙ༼ຈل͜ຈ༽ᕗ flex your dongers ᕙ༼ຈل͜ຈ༽ᕗ');
	},
	splat: function (target, room, user) {
		if (!target) return this.sendReply('/splat needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has splatted ' + Server.nameColor(targetUser, true, true) + '.');
		targetUser.popup('You were splatted by the Aerospray PG');
	},
	roasted: function (target, room, user) {
		if (!target) return this.sendReply('/roasted needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has burned  ' + Server.nameColor(target, true, true) + ' (Better put some ice on that)');
		targetUser.popup("My nigga you just got roasted");
	},
	behave: function (target, room, user) {
		if (!target) return this.sendReply('/behave needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has told ' + Server.nameColor(target, true, true) + ' to get their shit together');
		targetUser.popup("Nigga Behave!");
	},
	bhunt: function (target, room, user) {
		if (!target) return this.sendReply('/their needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has hunted ' + Server.nameColor(target, true, true) + ' for the booty');
		targetUser.popup("( ͡° ͜ʖ ͡°)Gimme That Booty( ͡° ͜ʖ ͡°)");
	},
	senpai: function (target, room, user) {
		if (!target) return this.sendReply('/senpai needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has once again failed to notice ' + Server.nameColor(targetUser, true, true) + '.');
		targetUser.popup('Senpai gives no shits about you');
	},
	badtime: function (target, room) {
		if (!target) return this.sendReply('/badtime needs a target');
		if (!this.can('mute', null, room)) return this.errorReply('kids like you should be burning in hell');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(targetUser, true, true) + ' felt their sins crawling on their back ');
		targetUser.popup('Do you want to have a bad time?');
	},
	bop: function (target, room, user) {
		if (!target) return this.sendReply('/bop needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(user.name, true, true) + ' has bopped ' + Server.nameColor(target, true, true) + ' in the face!');
		targetUser.popup("Get bopped boi");
	},
	burn: 'disintegrate',
	disintegrate: function (target, room, user) {
		if (!target) return this.sendReply('/burn needs a target.');
		if (!this.can('mute', null, room)) return this.errorReply('Access Denied');
		let targetUser = Users.get(target);
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		room.addRaw(Server.nameColor(target, true, true) + ' was disintegrated by ' + Server.nameColor(user.name, true, true) + '!');
		targetUser.popup("Get burned!");
		if (user.can('hotpatch')) this.parse('/forcelogout ' + targetUser);
	},
	/*
	MEME RANDOMIZER
	Coded by:
	ReturningAvenger
	and
	Volco

	Requested for by Speckeldorft
	*/
	meme: 'memes',
	memes: function () {
		if (!this.runBroadcast()) return false;
		let results = [
			"<img src='http://m.memegen.com/xaln2h.jpg' height='500' width='500'", //1
			"<img src='http://i0.kym-cdn.com/entries/icons/original/000/007/666/_57c8a1a431a592af806925e57258202f.png' height='500' width='500'",
			"<img src='http://i.imgur.com/JlwSoqb.jpg' height='500' width='500'",
			"<img src='http://i.imgur.com/XfEdVyg.jpg' height='500' width='500'",
			"<img src='http://i.imgur.com/MvwSM5d.jpg' height='500' width='500'", //5
			"<img src='http://i.imgur.com/nWMKbzZ.jpg' height='500' width='366'",
			"<img src='https://img.ifcdn.com/images/9c068e5f8f66418cf28a33cff04d3882e903a91b181624f66866f26aa2a93679_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/bdff319558072dce9c49f03033f125bac9022988fe4bc00cfe1afabbcafb1abb_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/d6e3dad02df078b3e9f1f5beb243845af491dcfad7748bbd7cf15360fa31e757_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/d830ae4219e97fec36d31bf23306a983407df1365ef1c535e33fa58acc2d3312_1.jpg' height='500' width='500'", //10
			"<img src='https://img.ifcdn.com/images/c8271b1c85bb446ef861e44a0b4521825f43e318ad56d3ec64e4325d64d58526_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/82c4a1c9a22937cb5aa975f5821ca2692c0152c54c346c3e56220c03751bd2df_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/1acf6ec29057b69649125dd53ed46c31ae2970dc9f00c5152f9b71c10c7efcde_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/61766dbba8d1afe44f8cd184605a887aeb6465dc05da45a09088271fc797150e_1.jpg' height='500' width='500'",
			"<img src='http://i.imgur.com/nWMKbzZ.jpg' height='366' width='500'", //15
			"<img src='https://img.ifcdn.com/images/797451497d1abcebc4e80c4d25fd4c60cb817161bb2983e8fde097ee7196f82c_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/a4d3cf3f8f571cb2556c09c2910cfa19480208f90095ec95b051b7f73286f611_1.jpg' height='500' width= '500'",
			"<img src='https://img.ifcdn.com/images/82b12f823c649de6e08d55a7e17103730f33b0b1c65d1d7d65faa8aca04a028d_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/6bd6af57bb351a6f4c456c1b3dbc7c4957662f2a8854d0287dab3857e9fe639e_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/b552c784e15409668f499a9d7b2e59e1f214b558c096dcaead01d4d5f6abdb07_1.jpg' height='500' width='500'", //20
			"<img src='https://img.ifcdn.com/images/1f056ba4c29688209928a53c545ebe0c8f843131018242f76337d7a7daa2ee97_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/936309affcffdc49f520ac08df80bcd16d76eae5a0b857101ec53f5bc2753c96_1.jpg' height-'500' width='500'",
			"<img src='https://img.ifcdn.com/images/60ebd66192e48ec08f9329ae1f24789538f89f85ddb3f42a0fe847c2fea10ad4_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/51dd4afbb169fd416c3e0f10a6f3b5471337431465900a0dd2f3cd899073459f_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/7da5ba88113dba4eb495cda70e40919d5c7ed5e240a12eb8f433236544a5e711_1.jpg' height='500' width='500'", //25
			"<img src='https://img.ifcdn.com/images/dbb0fb6a986b9d50f7f6c35a55a4bf89c7ed3051a0af9dd54a783714858dea35_1.jpg' height='500' width='500",
			"<img src='https://img.ifcdn.com/images/57a6166b4062eb1b09f7ead8b5e8bd04fb2bb16242bce6b204d17c1bf982c62b_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/83ec82332a92f3b9973dbbe9b94a7832dc6926db68add7ede50f22977d57b0ff_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/1db327ff894679a626b371c39db46a807ceddaa5582ca8658dad05021a0e01e4_1.jpg' height='500' width='500'",
			"<img src='http://i.imgur.com/nWMKbzZ.jpg' height='366' width='500'", //30
			"<img src='https://img.ifcdn.com/images/32e4f12882e8d67e54626815370b63497dfae78cbf20c315ef5cd6033456ad8a_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/dd2002123230744285eff720435b8c97c29553787562460042b17fc62e67e9ff_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/30c96e0c23f83b25b28f4325adbddba6c638ecbeefcd1d34f32aa0fd853fed2b_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/75ac868abe9adc5045a5266f53076d3bd3dddffaf8ba655712128c47684c8c10_1.jpg' height='500' width='500'",
			"<img src='https://img.ifcdn.com/images/ef0167618655b348fae18fa9a83a7af638afb4e5f530c3920003197fc020fa42_1.jpg' height='500' width='500'", //35
			"<img src='https://pics.onsizzle.com/Instagram-dankmemesmeltsteelbeams-dankmemes-dank-memes-lmao-jetfuel-c32ff7.png' height='500' width='500'",
			"<img src='http://i.imgur.com/NpYqr6Z.jpg' height='500' width='500'",
			"<img src='http://i.imgur.com/JIVEfPy.jpg' height='500' width='500'",
			"<img src='http://i.imgur.com/SxwnMnp.jpg' height='500' width='500'",
			"<img src='http://i.imgur.com/3O6RKJ5.jpg' height='500' width='500'", //40
			"<img src='https://eus1-api.asm.skype.com/v1/objects/0-eus-d2-8e96e141d7ba2ee7c1577a673d36086b/views/imgpsh_fullsize' height='500' width='500'",
			"<img src='http://i.imgur.com/nWMKbzZ.jpg' height='366' width='500'",
		];
		return this.sendReplyBox(results[Math.floor(Math.random() * results.length)]);
	},
};
