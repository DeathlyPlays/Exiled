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
let greeting = ["hello", "greetings", "salutations", "bonjour", "henlo", "hai", "hey", "wassup", "sup", "what's up"];
let basicAnswer = ["Yes.", "No.", "Yeah.", "Nah.", "I don't think so.", "Probably.", "No thank you.", "I don't know.", "Never.", "Always.", "Yeah... Okay.", "You're funny.", "How cute!", "Hell no.", "Hell yeah!", "Fuck off.", "Who are you again?", "I have no idea.", "Lol, k."];
let persoAnswer = ["Mhm.", "Nope!", "Nah.", "Yeah!", "I can try.", "I don't think so.", "That's a good joke!", "Not really..", "Why are you asking me this?"];
let demandAnswer = ["Okay.", "No thanks.", "K.", "Let's do it.", "Why?", "Nah.", "Yeah, let's go.", "Yes please."];
let answer;
let paige = '<font color="#e033d7">Paige</font>';
let satan = '<font color="red">Satan</font>';
let ivan = '<font color="blue">Ivan</font>';
let roger = '<font color="#af3bcc">Roger</font>';
let narrator = paige;

//support "you" and "u" being interchangable
	//coming soon

function say(message) {
	this.sendReply('|html|' + narrator + ': ' + message);
}

//For answering questions that Paige can't identify
function otherAnswer() {
	say.call(this, "Hello!");
}

exports.commands = {
	narrator: {
		'!paige': true,
		paige: function () {
			if (!this.can('ban')) return false;
			if (!this.runBroadcast()) return;
			this.sendReply('Narrator switched to Paige.');
			narrator = paige;
		},
		'!satan': true,
		satan: function () {
			if (!this.can('ban')) return false;
			if (!this.runBroadcast()) return;
			this.sendReply('Narrator switched to Satan.');
			narrator = satan;
		},
		'!ivan': true,
		ivan: function () {
			if (!this.can('ban')) return false;
			if (!this.runBroadcast()) return;
			this.sendReply('Narrator switched to Ivan.');
			narrator = ivan;
		},
		'!roger': true,
		roger: function () {
			if (!this.can('ban')) return false;
			if (!this.runBroadcast()) return;
			this.sendReply('Narrator switched to Roger.');
			narrator = roger;
		},
	},

	'!paige': true,
	roger: 'p',
	ivan: 'p',
	satan: 'p',
	paige: 'p',
	askpaige: 'p',
	p: function (target, room, user) {
		if (!this.runBroadcast()) return;
		//convert target to lowercase
		target = target.toLowerCase();
		//main code
		if (!target) {
			return say.call(this, "That's not a question.");
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