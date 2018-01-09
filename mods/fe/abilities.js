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
	"aquaphobia": {
		shortDesc: "Water types moves lower attack.",
		onAfterDamage: function (damage, source, target, effect) {
			if (effect && effect.type === 'Water') {
				this.boost({atk: -1});
			}
		},
		id: "aquaphobia",
		name: "Aquaphobia",
		rating: 3.5,
		num: -195,
	},
};