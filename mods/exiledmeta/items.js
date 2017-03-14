'use strict';

exports.BattleItems = {
	"focusband": {
		id: "focusband",
		name: "Focus Band",
		spritenum: 150,
		fling: {
			basePower: 10,
		},
		onDamage: function(damage, target, source, effect) {
			if (this.random(30) === 0 && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add("-activate", target, "item: Focus Band");
				return target.hp - 1;
			}
		},
		num: 230,
		gen: 2,
		desc: "Holder has a 30% chance to survive an attack that would KO it with 1 HP.",
	},
};