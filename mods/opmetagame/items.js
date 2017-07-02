'use strict';

exports.BattleItems = {
	"dice": {
		id: "dice",
		name: "Dice",
		spritenum: 242,
		fling: {
			basePower: 10,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			this.heal(pokemon.maxhp / 2);
		},
		num: -100,
		gen: -1,
		desc: "At the end of every turn, holder restores 1/2 of its max HP.",
	},
	"riskyorb": {
		id: "riskyorb",
		name: "Risky Orb",
		spritenum: 515,
		fling: {
			basePower: 40,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			this.damage(pokemon.maxhp / 10);
		},
		num: -101,
		gen: -1,
		desc: "At the end of every turn, holder loses 10% of its max HP.",
	},
	"ironvest": {
		id: "ironvest",
		name: "Iron Vest",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onModifyDefPriority: 1,
		onModifyDef: function (def) {
			return this.chainModify(1.5);
		},
		onDisableMove: function (pokemon) {
			let moves = pokemon.moveset;
			for (let i = 0; i < moves.length; i++) {
				if (this.getMove(moves[i].move).category === 'Status') {
					pokemon.disableMove(moves[i].id);
				}
			}
		},
		num: -102,
		gen: -1,
		desc: "Holder's Defense is 1.5x, but it can only select damaging moves.",
	},
	"broooo": {
		id: "broooo",
		name: "Broooo",
		spritenum: 242,
		fling: {
			basePower: 10,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			this.heal(pokemon.maxhp / 16);
		},
		onTryHealPriority: 1,
		onTryHeal: function (damage, target, source, effect) {
			let heals = {
				drain: 1,
				leechseed: 1,
				ingrain: 1,
				aquaring: 1,
				strengthsap: 1,
			};
			if (heals[effect.id]) {
				return Math.ceil((damage * 1.3) - 0.5); // Big Root rounds half down
			}
		},
		num: -104,
		gen: -1,
		desc: "At the end of every turn, holder restores 1/16 of its max HP, and Big Root effects",
	},
	"trickyrock": {
		id: "trickyrock",
		name: "Tricky Rock",
		spritenum: 221,
		fling: {
			basePower: 40,
		},
		num: -105,
		gen: -1,
		desc: "Holder's use of Trick Room lasts 8 turns instead of 5.",
	},
};
