'use strict';

exports.BattleMovedex = {
	"drinkbleach": {
		num: 9001,
		accuracy: 100,
		basePower: 0,
		selfdestruct: "ifHit",
		category: "Status",
		desc: "Lowers target's stats by -6, and locks target from switching, but faints user.",
		shortDesc: "Target's stats go down by -6, get locked in, faints user.",
		id: "drinkbleach",
		isViable: true,
		name: "drinkbleach",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: {
			volatileStatus: 'trapped',
		},
		boosts: {
			atk: -6,
			def: -6,
			spa: -6,
			spd: -6,
			spe: -6,
			accuracy: -6,
			evasion: -6,
		},
		target: "normal",
		type: "Dark",
		zMoveBoost: {
			atk: 6,
		},
		contestType: "Cool",
	},
};
