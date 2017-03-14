/*
Ratings and how they work:
-2: Extremely detrimental
	  The sort of ability that relegates Pokemon with Uber-level BSTs into NU.
	ex. Slow Start, Truant
-1: Detrimental
	  An ability that does more harm than good.
	ex. Defeatist, Normalize
 0: Useless
	  An ability with no net effect during a singles battle.
	ex. Healer, Illuminate
 1: Ineffective
	  An ability that has a minimal effect. Should not be chosen over any other ability.
	ex. Damp, Shell Armor
 2: Situationally useful
	  An ability that can be useful in certain situations.
	ex. Blaze, Insomnia
 3: Useful
	  An ability that is generally useful.
	ex. Infiltrator, Sturdy
 4: Very useful
	  One of the most popular abilities. The difference between 3 and 4 can be ambiguous.
	ex. Protean, Regenerator
 5: Essential
	  The sort of ability that defines metagames.
	ex. Desolate Land, Shadow Tag
*/

'use strict';

exports.BattleAbilities = {
	"midlifecrisis": {
		id: "midlifecrisis",
		name: "Midlife Crisis",
		desc: "Boosts power of moves that faLint the target by 1.3x (i.e. Self-Destruct, Explosion, Memento, etc.), and activates Midlife Crisis.",
		shortDesc: "Boosts the power of moves that faint the target by 1.3x.",
		rating: 4.5,
		num: 9001,
		onStart: function (source, effect) {
			this.addPseudoWeather('midlifecrisis', source, effect, '[of] ' + source);
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.selfdestruct) {
				this.debug('Midlife Crisis boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	"rust": {
		id: "rust",
		name: "Rust",
		desc: "Powers up steel moves by 1.2, and lowers Electric moves that attack user by 0.75x",
		shortDesc: "Powers up steel moves by 1.2 but takes 2x damage from Water type attacks.",
		rating: 3.5,
		num: 9002,
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Rust boost');
				return this.chainModify(1.2);
			}
		},
		onBasePowerPriority: 7,
		onFoeBasePower: function (basePower, attacker, defender, move) {
			if (this.effectData.target !== defender) return;
			if (move.type === 'Electric') {
				return this.chainModify(0.75);
			}
		},
	},
};
