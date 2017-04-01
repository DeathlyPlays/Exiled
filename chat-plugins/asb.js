/* * * * * * * * * * * * * * *
 *	Anime Style Battling	 *
 *	Created by:				 *
 *	Desokoro (Idea)			 *
 *	Insist (Coded)			 *
 * * * * * * * * * * * * * * */

'use strict';

exports.commands = {
	dodge: function (target, room, user) {
		if (!this.runBroadcast()) return false;
		let results = [
			"The Pokemon dodged the move and managed to get multiple hits in.",
			"The Pokemon evaded the move and boosted its evasion.",
			"The Pokemon failed to dodge and got stuck lose this turn.",
			"The Pokemon failed to dodge and took recoil damage as a result.",
		];
		return this.sendReplyBox(results[Math.floor( * Math.random())]);
	},	
};
