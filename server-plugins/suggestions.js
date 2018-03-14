/********************************************
 * Suggestions Index for Pokemon Showdown	*
 * Created by: flufi						*
 ********************************************/

"use strict";

const FS = require("../lib/fs.js");

let suggestions = FS("config/suggestion-index.json").readIfExistsSync();

if (suggestions !== "") {
	suggestions = JSON.parse(suggestions);
} else {
	suggestions = {};
}

function write() {
	FS("config/suggestion-index.json").writeUpdate(() => (
		JSON.stringify(suggestions)
	));
	let data = "{\n";
	for (let u in suggestions) {
		data += '\t"' + u + '": ' + JSON.stringify(suggestions[u]) + ",\n";
	}
	data = data.substr(0, data.length - 2);
	data += "\n}";
	FS("config/suggestion-index.json").writeUpdate(() => (
		data
	));
}

exports.commands = {
	suggestions: "suggestion",
	suggestion: {
		suggest: "submit",
		request: "submit",
		submit: function (target, room, user) {
			let sender = user.userid;
			let targets = target.split(',');
			for (let u = 0; u < targets.length; u++) targets[u] = targets[u].trim();
			if (!targets[1]) return this.errorReply("/suggestion submit [title], [suggestion]");
			let title = targets[0];
			if (title.length > 30) return this.errorReply("Please make sure your suggestion title is 30 characters or less.");
			let suggestion = targets[1];
			if (suggestion.length > 500) return this.errorReply("Please make your suggestion 500 characters or less.");
			Monitor.log(`/raw <div style="border: #000000 solid 2px;"><center><br><font size="1"><strong>${sender}</strong> has submitted a suggestion:</font></center><center>"${suggestion}"</center><br /></div>`);
			suggestions[toId(title)] = {
				user: sender,
				title: title,
				id: toId(title),
				desc: suggestion,
			};
			write();
			return this.sendReply(`Your suggestion has been submitted to the index and will be reviewed soon.`);
		},

		remove: "delete",
		delete: function (target) {
			if (!this.can("ban")) return false;
			if (!target) return this.errorReply("Please enter a valid suggestion ID.");
			let suggestionid = toId(target);
			if (!suggestions[suggestionid]) return this.errorReply(`${target} is not currently registered as a suggestion.`);
			delete suggestions[suggestionid];
			write();
			this.sendReply(`Suggestion "${target}" has been deleted.`);
		},

		view: "list",
		viewindex: "list",
		index: "list",
		list: function (target, room, user) {
			if (!this.can("ban")) return false;
			let output = `<b><u>Suggestions (${Object.keys(suggestions).length})</u></b><br />`;
			for (let suggestion in suggestions) output += `<strong>${suggestion}</strong><br />`;
			this.sendReplyBox(`${output}`);
		},

		"": "help",
		help: function () {
			this.parse("/help suggestion");
		},
	},

	suggestionhelp: [
		"/suggestions submit [title], [suggestion] - Submits a suggestion to the index.",
		"/suggestions remove [suggestion id] - Deletes a suggestion from the index. Requires @ and up.",
		"/suggestions index - Displays all the suggestions in the index. Requires @ and up.",
		"/suggestions help - Shows available suggestion commands.",
	],
};
