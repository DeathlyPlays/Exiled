/*
S.A.T.A.N
Pokemon (Showdown) Chat AI
Developed by flufi
*/

'use strict';

let yes = ["yes", "yeah", "yea", "ye", "yup", "yep", "mhm"];
let no = ["no", "nah", "nope"];
let doingGood = ["good", "great", "amazing", "awesome", "fantastic", "alright", "fine"];
let doingBad = ["bad", "terrible", "awful"];
let greetings = ["hey", "hi", "hello", "yo", "sup", "whats up", "hola", "bonjour", "konichiwa", "greetings", "howdy", "hiya", "heya"];
let nextres = false;
let questionStart = ["can i", "will i", "have i", "are we", "am i", "are you"];
let curses = ["fuck", "shit", "dick", "pussy", "twat", "cunt"];

exports.commands = {
	'!satan': true,
	satan: function (target) {
		if (!this.runBroadcast()) return;
		//convert target to lowercase
		target = target.toLowerCase();
		//TODO: Make a better substitute for this
		if (questionStart.includes("can i") || questionStart.includes("will I") || questionStart.includes("can i") || questionStart.includes("will i") || questionStart.includes("are you") || questionStart.includes("am i") || questionStart.includes("am I") || questionStart.includes("should I") || questionStart.includes("should i")) {
			let results = ["Probably.", "How am I supposed to know that?", "Probably not..", "Nope!", "I think I'll leave that up to you.", "Yes."];
			return this.sendReply(results[Math.floor(Math.random() * results.length)]);
		} else if (greetings.includes(target)) {
			this.sendReply('Hello! How are you?');
			nextres = true;
			return;
		} else if (doingGood.includes(target) && nextres === true) {
			this.sendReply('Glad to hear!');
			nextres = false;
		} else if (doingBad.includes(target) && nextres === true) {
			this.sendReply('Oh. Sorry to hear that. Hope you feel better soon!');
			nextres = false;
		} else {
			let rand = ["Pardon?", "Sorry, I don't understand.", "Come again?", "Sorry, I didn't quite get that.", "What?", "Who?"];
			return this.sendReply(rand[Math.floor(Math.random() * rand.length)]);
		}
	},
};
