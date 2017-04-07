/* * * * * * * * *
 *   Fakemons    *
 * * * * * * * * */


'use strict';

exports.BattlePokedex = {
	smk: {
		num: 9001,
		species: "SMK",
		types: ["Dark", "Ghost"],
		baseStats: {
			hp: 65,
			atk: 120,
			def: 40,
			spa: 20,
			spd: 40,
			spe: 140,
		},
		abilities: {
			0: "Midlife Crisis",
			H: "Prankster",
		},
		heightm: 1.3,
		weightkg: 92,
		color: "Brown",
		eggGroups: ["Undiscovered"],
	},
	musteltank: {
		num: 9002,
		species: "Musteltank",
		types: ["Steel", "Poison"],
		baseStats: {
			hp: 100,
			atk: 115,
			def: 110,
			spa: 40,
			spd: 100,
			spe: 5,
		},
		abilities: {
			0: "Battle Armor",
			1: "Tough Claws",
			H: "Rust",
		},
		heightm: 1.8,
		weightkg: 90.7,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	pence: {
		num: 9003,
		species: "Pence",
		types: ["Fairy", "Fighting"],
		baseStats: {
			hp: 70,
			atk: 150,
			def: 70,
			spa: 150,
			spd: 70,
			spe: 45,
		},
		abilities: {
			0: "Contrary",
		},
		heightm: 1.8034,
		weightkg: 72,
		color: "White",
		eggGroups: ["Human-like"],
	},
	frioth: {
		num: 9004,
		species: "Frioth",
		types: ["Ice", "Bug"],
		baseStats: {
			hp: 80,
			atk: 110,
			def: 100,
			spa: 90,
			spd: 75,
			spe: 95,
		},
		abilities: {
			0: "Ice Body",
			1: "Snow Cloak",
			H: "Aerilate",
		},
		heightm: "0.6096",
		weightkg: "20.63845",
		color: "Blue",
		eggGroups: ["Bug", "Water 3"],
	},
	octanko: {
		num: 9005,
		species: "Octanko",
		types: ["Water", "Steel"],
		baseStats: {
			hp: 90,
			atk: 105,
			def: 125,
			spa: 110,
			spd: 85,
			spe: 40,
		},
		abilities: {
			0: "Shell Armor",
			1: "Sniper",
			H: "Regenerator",
		},
		heightm: "103",
		prevo: "Octillery",
		weightkg: "532",
		color: "Blue",
		eggGroups: ["Water 3"],
	},
	spectreon: {
		num: 9006,
		species: "Spectreon",
		types: ["Ghost"],
		baseStats: {
			hp: 80,
			atk: 110,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 120,
		},
		abilities: {
			0: "Vengeful",
			H: "Hatred",
		},
		heightm: 2,
		weightkg: 0.5,
	},
};
