'use strict';

exports.commands = {
	cl: "changelog",
	updatelog: "changelog",
	ul: "changelog",
	changelog: function (target, room, user) {
		this.sendReplyBox('<div style="background-color: #a5fc8f;><font size="4"><center><b>Dewdrop Changelog</b></center></font></div>');
	},
};