/********************************
 * Tasks (To-Do/Jobs) Plug-in	*
 * Created for Pokemon Showdown *
 * Created by Insist			*
 ********************************/


"use strict";

function isDev(user) {
	if (!user) return;
	if (typeof user === "object") user = user.userid;
	let dev = Db.devs.get(toId(user));
	if (dev === 1) return true;
	return false;
}

exports.commands = {
	jobs: "tasks",
	job: "tasks",
	todo: "tasks",
	task: "tasks",
	tasks: {
		new: "add",
		issue: "add",
		add: function (target, room, user) {
			if (!isDev(user.userid) && !this.can("bypassall")) return false;
			let [issue, ...description] = target.split(",").map(p => p.trim());
			let task = Db.tasks.get("development", {issues: {}});
			if (!issue || !description) return this.parse("/taskshelp");
			if (Db.tasks.has(issue)) return this.errorReply(`There is already an issue titled "${issue}".`);
			if (issue.length < 1 || issue.length > 30) return this.errorReply(`The issue title should not exceed 30 characters long. Feel free to continue in the description.`);
			if (description.length < 1 || description.length > 100) return this.errorReply(`The description should not exceed 100 characters long.`);
			task.issues[toId(issue)] = {"id": toId(issue), "issue": issue, "description": description, "employer": user.userid};
			Db.tasks.set("development", task);
			return this.sendReply(`The task "${issue}" has been added to the server task list.`);
		},

		remove: "delete",
		clear: "delete",
		fixed: "delete",
		delete: function (target, room, user) {
			if (!isDev(user.userid) && !this.can("bypassall")) return false;
			target = toId(target);
			let task = Db.tasks.get("development", {issues: {}});
			if (!target) return this.parse(`/taskshelp`);
			if (!task.issues[target]) return this.errorReply(`The issue "${target}" has not been reported.`);
			delete task.issues[target];
			Db.tasks.set(task);
			return this.sendReply(`The task "${target}" has been deleted.`);
		},

		"": "list",
		tasks: "list",
		task: "list",
		list: function (target, room, user) {
			if (!isDev(user.userid) && !this.can("bypassall")) return false;
			if (!this.runBroadcast() && !room.devRoom) return false;
			if (!Db.tasks.keys().length) return this.errorReply(`There are currently no tasks on this server.`);
			target = toId(target);
			let taskList = Db.tasks.get("development", {issues: {}});
			let display = `<table><tr><center><h1>${Config.serverName}'s Tasks List:</h1></center></tr>`;
			for (let i in taskList.issues) {
				display += `<tr><td style="border: 2px solid #000000; width: 20%; text-align: center">Employer: <button class="button" name="parseCommand" value="/user ${taskList.issues[i].employer}">${Server.nameColor(taskList.issues[i].employer, true, true)}</button></td><td style="border: 2px solid #000000; width: 20%; text-align: center">Issue Title: ${taskList.issues[i].issue}</td><td style="border: 2px solid #000000; width: 20%; text-align: center">Description: ${taskList.issues[i].description}</td></tr>`;
			}
			display += `</table>`;
			return this.sendReplyBox(display);
		},

		help: function () {
			this.parse(`/taskshelp`);
		},
	},

	taskhelp: "taskshelp",
	taskshelp: [
		`/tasks add [issue|TODO], [description of what needs to be done] - Adds an item to the server's tasks list. Must be a Registered Developer on the server.
		/tasks delete [issue] - Deletes an item from the server's task list. Must be a Registered Developer.
		/tasks list - Displays the server's task list. Must be a Registered Developer; may only be broadcasted in Development rooms.
		/tasks help - Displays this help command.`,
	],
};
