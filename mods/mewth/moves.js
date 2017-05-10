'use strict';

exports.BattleMovedex = {
	"spiralingtoxins": {
		num: -92,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Badly poisons all Pokemon. Only Steel and Poison types don't get affected by this move.",
		shortDesc: "Badly poisons all Pokemon.",
		id: "spiralingtoxins",
		isViable: true,
		name: "Spiraling Toxins",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		// No Guard-like effect for Poison-type users implemented in BattleScripts#tryMoveHit
		status: 'tox',
		secondary: false,
		target: "all",
		type: "Poison",
		zMoveBoost: {def: 3, spd: 3},
		contestType: "Clever",
	},
	"oblivionbanisher": {
		num: -246,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "Has a 100% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "100% chance to raise all stats by 1 (not acc/eva).",
		id: "oblivionbanisher",
		isViable: true,
		name: "Oblivion Banisher",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, recharge: 5},
		onPrepareHit: function (source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Agility", source);
			this.add('-anim', source, "Dark Void", source);
			this.add('-anim', source, "Spectral Thief");
		},
		secondary: {
			chance: 100,
			self: {
				volatileStatus: 'mustrecharge',
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Ghost",
		zMovePower: 200,
		contestType: "Tough",
	},
};