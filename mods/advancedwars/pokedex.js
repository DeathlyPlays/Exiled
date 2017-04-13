'use strict';

exports.BattlePokedex = {
	infantry:{
		num: -300,
		species: "Infantry",
		types: ["INF"],
		baseStats: {
			hp: 100,
			atk: 25,
			def: 25,
			spa: 25,
			spd: 25,
			spe: 50,
		},
		abilities: {
			0: "Lucky",
		},
	},
	mech:{
		num: -301,
		species: "Mech",
		types: ["MECH"],
		baseStats: {
			hp: 100,
			atk: 50,
			def: 50,
			spa: 50,
			spd: 50,
			spe: 25,
		},
		abilities: {
			0: "Lucky",
		},
	},
	lighttank: {
		num: -302,
		species: "Light Tank",
		types: ["LTank"],
		baseStats: {
			hp: 100,
			atk: 100,
			def: 100,
			spa: 100,
			spd: 100,
			spe: 100,
		},
		abilities: {
			0: "Lucky",
		},
	},
	mdtank: {
		num: -303,
		species: "MD Tank",
		types: ["MDTank"],
		baseStats: {
			hp: 100,
			atk: 150,
			def: 150,
			spa: 150,
			spd: 150,
			spe: 75,
		},
		abilities: {
			0: "Lucky",
		},
	},
	neotank: {
		num: -304,
		species: "Neotank",
		types: ["Neotank"],
		baseStats: {
			hp: 100,
			atk: 200,
			def: 200,
			spa: 200,
			spd: 200,
			spe: 100,
		},
		abilities: {
			0: "Lucky",
		},
	},
	artillery: {
		num: -305,
		species: "Artillery",
		types: ["Artillery"],
		baseStats: {
			hp: 100,
			atk: 100,
			def: 100,
			spa: 100,
			spd: 75,
		},
		abilities: {
			0: "Lucky",
		},
	},		
	battlecopter: {
		num: -306,
		species: "Battle Copter",
		types: ["BCopter"],
		baseStats: {
			hp: 100,
			atk: 125,
			def: 125,
			spa: 125,
			spd: 125,
			spe: 100,
		},
		abilities: {
			0: "Lucky",
		},
	},
	fighter: {
		num: -307,
		species: "Fighter",
		types: ["Fighter"],
		baseStats: {
			hp: 100,
			atk: 200,
			def: 200,
			spa: 200,
			spd: 200,
			spe: 255,
		},
		abilities: {
			0: "Lucky",
		},
	},
	bomber: {
		num: -308,
		species: "Bomber",
		types: ["Bomber"],
		baseStats: {
			hp: 100,
			atk: 255,
			def: 255,
			spa: 255,
			spd: 255,
			spe: 150,
		},
		abilities: {
			0: "Lucky",
		},
	},
};
