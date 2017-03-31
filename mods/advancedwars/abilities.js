'use strict';

exports.BattleAbilities = {
	"lucky": {
		id: "lucky",
		name: "Lucky",
		onModifyMove: function (damage, target, source, move) {
			if (this.random(10) < 1) {
				this.debug('Lucky boost!');
				move.stab = 1.5;
			}
		},
		onCriticalHit: false,
	},
};
