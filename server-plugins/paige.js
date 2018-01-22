/*******************************
*                              *
*             Paige            *
*    Javascript Question AI    *
*                              *
*      Developed by flufi      *
*                              *
/******************************/

'use strict';

let personality = ["are you", "have you", "do you", "you feeling"];
let future = ["are you gonna", "are you going to", "will you", "you gonna", "wanna", "want to", "are you"];
let demand = ["fight", "battle", "fuck"];
let greeting = ["hello", "greetings", "salutations", "bonjour", "henlo", "hai", "hey", "wassup", "sup", "what's up", "hi", "yo"];
let basicAnswer = ["Yes.", "No.", "Yeah.", "Nah.", "I don't think so.", "Probably.", "No thank you.", "I don't know.", "Never.", "Always.", "Yeah... Okay.", "You're funny.", "How cute!", "Hell no.", "Hell yeah!", "Fuck off.", "Who are you again?", "I have no idea.", "Lol, k."];
let persoAnswer = ["Mhm.", "Nope!", "Nah.", "Yeah!", "I can try.", "I don't think so.", "That's a good joke!", "Not really..", "Why are you asking me this?"];
let demandAnswer = ["Okay.", "No thanks.", "K.", "Let's do it.", "Why?", "Nah.", "Yeah, let's go.", "Yes please."];
let answer;

//support "you" and "u" being interchangable
//coming soon

function say(message) {
	if (this.broadcasting) {
		this.room.add(`Paige: ${message}`);
	}
	this.add(`|html|<font color="f765da">Paige: </font>${message}`);
}

//For answering questions that Paige can't identify
function otherAnswer() {
	say.call(this, "Sorry, I don't understand.");
}

exports.commands = {
	'!paige': true,
	paige: 'p',
	askpaige: 'p',
	p: function (target, room, user) {
		if (!this.runBroadcast()) return;
		//convert target to lowercase
		target = target.toLowerCase();
		//main code
		if (!target) {
			return otherAnswer();
		} else {
			if (future.includes(target)) {
				answer = basicAnswer[Math.floor(Math.random() * basicAnswer.length)];
				say.call(this, answer);
			} else if (personality.includes(target)) {
				answer = persoAnswer[Math.floor(Math.random() * persoAnswer.length)];
				say.call(this, answer);
			} else if (greeting.includes(target)) {
				answer = greeting[Math.floor(Math.random() * greeting.length)];
			} else {
				answer = basicAnswer[Math.floor(Math.random() * basicAnswer.length)];
				say.call(this, answer);
			}
		}
	},
};
