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
			"The Pokemon dodged the attack at rapid speeds, and rose its speed by two stages.",
			"The Pokemon failed to dodge, and its speed was lowered by one stage.",
			"The Pokemon was exhausted and failed to dodge the attack, and uses Rest to recover from exhaustion.",
			"The Pokemon dodged the attack swiftly, and confuses its target.",
			"The Pokemon used Double Team (gain two stages of evasion) and tricked its opponent.",
			"The Pokemon employs a substitute, and is able to take any hit this turn at the cost of 25% of its health.",
		];
		return this.sendReplyBox(results[Math.floor(10 * Math.random())]);
	},	
};
