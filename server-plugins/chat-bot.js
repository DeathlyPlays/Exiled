/********************
 * Chat-AI for PS!	*
 * Credit to flufi	*
 * for concept		*
 * Finished by:		*
 * Insist			*
 ********************/

"use strict";

exports.commands = {
	chatai: "ai",
	paige: "ai",
	ai: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!this.canTalk()) return false;
		target = toId(target);
		let greeting = ["hello", "greetings", "salutations", "bonjour", "henlo", "hai", "hey", "wassup", "sup", "whatsup"];
		let future = ["areyougonna", "areyougoing", "willyou", "yougonna", "wanna", "wantto", "areyou", "doyou", "doyou"];
		let personality = ["haveyou", "doyou", "youfeeling", "howare"];
		let basicAnswer = ["Yes.", "No.", "Yeah.", "Nah.", "I don't think so.", "Probably.", "No thank you.", "I don't know.", "Never.", "Always.", "Yeah... Okay.", "You're funny.", "How cute!", "Hell no.", "Hell yeah!", "Fuck off.", "Who are you again?", "I have no idea.", "Lol, k."];
		let persoAnswer = ["Mhm.", "Nope!", "Nah.", "Yeah!", "I can try.", "I don't think so.", "That's a good joke!", "Not really..", "Why are you asking me this?"];
		if (target && greeting.includes(target) || future.includes(target)) {
			let basic = basicAnswer[Math.floor(Math.random() * basicAnswer.length)];
			this.sendReply(`|raw|~${Server.nameColor("Paige", true)}: ${basic}`);
		} else if (personality.includes(target) && target) {
			let perso = persoAnswer[Math.floor(Math.random() * persoAnswer.length)];
			return this.sendReply(`|raw|~${Server.nameColor("Paige", true)}: ${perso}`);
		} else {
			return this.sendReply(`|raw|~${Server.nameColor("Paige", true)}: Sorry, I do not understand.`);
		}
	},
	aihelp: [`/ai [question] - Chats with a Chat AI.`],
};
