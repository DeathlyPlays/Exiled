//Fresh, 100% Ready/

'use strict';

exports.BattlePokedex = {
	botamon: {
		num: 1,
		species: "Botamon",
		types: ["Fire"],
		baseStats: {
			hp: 350,
			atk: 100,
			def: 50,
			spa: 100,
			spd: 50,
			spe: 50
		},
		abilities: {
			0: "Data"
		},
		weightkg: 2.3,
		color: "Black",
		evos: ["Koromon", 'Sukamon'],
		battleMovePool: ['Bubble'],
	},
	poyomon: {
		num: 2,
		species: "Poyomon",
		types: ["Air"],
		baseStats: {
			hp: 350,
			atk: 100,
			def: 100,
			spa: 100,
			spd: 100,
			spe: 50
		},
		abilities: {
			0: "Data"
		},
		weightkg: 2.3,
		color: "White",
		evos: ["Tokomon", 'Sukamon'],
		battleMovePool: ['Bubble'],
	},
	punimon: {
		num: 3,
		species: "Punimon",
		types: ["Air"],
		baseStats: {
			hp: 350,
			atk: 50,
			def: 100,
			spa: 50,
			spd: 100,
			spe: 100
		},
		abilities: {
			0: "Data"
		},
		weightkg: 2.3,
		color: "Red",
		evos: ["Tsunomon", 'Sukamon'],
		battleMovePool: ['Bubble'],
	},
	yuramon: {
		num: 4,
		species: "Yuramon",
		types: ["Earth"],
		baseStats: {
			hp: 550,
			atk: 50,
			def: 50,
			spa: 50,
			spd: 50,
			spe: 50
		},
		abilities: {
			0: "Data"
		},
		weightkg: 2.3,
		color: "White",
		evos: ["Tanemon", 'Sukamon'],
		battleMovePool: ['Bubble'],

		//In-Training, 100% Ready/

	},
	koromon: {
		num: 5,
		species: "Koromon",
		types: ["Fire", "Battle"],
		baseStats: {
			hp: 500,
			atk: 100,
			def: 50,
			spa: 100,
			spd: 50,
			spe: 50
		},
		abilities: {
			0: "Data"
		},
		weightkg: 4.5,
		color: "Pink",
		evos: ["Agumon", "Gabumon", "Kunemon", 'Sukamon'],
		prevo: ["Botamon"],
		battleMovePool: ['Bubble'],
	},
	tokomon: {
		num: 6,
		species: "Tokomon",
		types: ["Air", "Battle"],
		baseStats: {
			hp: 500,
			atk: 100,
			def: 100,
			spa: 100,
			spd: 100,
			spe: 50
		},
		abilities: {
			0: "Data"
		},
		weightkg: 4.5,
		color: "White",
		evos: ["Patamon", "Biyomon", "Kunemon", 'Sukamon'],
		prevos: ["Poyomon"],
		battleMovePool: ['Bubble'],
	},
	tsunomon: {
		num: 7,
		species: "Tsunomon",
		types: ["Air", "Ice"],
		baseStats: {
			hp: 500,
			atk: 50,
			def: 100,
			spa: 50,
			spd: 100,
			spe: 100
		},
		abilities: {
			0: "Data"
		},
		weightkg: 4.5,
		color: "Brown",
		evos: ["Elecmon", "Penguinmon", "Kunemon", 'Sukamon'],
		prevos: ["Punimon"],
		battleMovePool: ['Bubble'],
	},
	tanemon: {
		num: 8,
		species: "Tanemon",
		types: ["Earth", "Ice"],
		baseStats: {
			hp: 700,
			atk: 50,
			def: 50,
			spa: 50,
			spd: 50,
			spe: 50
		},
		abilities: {
			0: "Data"
		},
		weightkg: 4.5,
		color: "Green",
		evos: ["Palmon", "Betamon", "Kunemon", 'Sukamon'],
		prevos: ["Yuramon"],
		battleMovePool: ['Bubble'],

		//Rookie, 100% ready/

	},
	agumon: {
		num: 9,
		species: "Agumon",
		types: ["Fire", "Battle"],
		baseStats: {
			hp: 1000,
			atk: 200,
			def: 100,
			spa: 200,
			spd: 100,
			spe: 150
		},
		abilities: {
			0: "Vaccine"
		},
		weightkg: 6.8,
		color: "Yellow",
		evo: ['birdramon', 'centarumon', 'greymon', 'meramon', 'monochromon', 'tyrannomon', 'Nanimon', 'Numemon', 'Sukamon'],
		prevo: ["koromon"],
		battleMovePool: ['Fire Tower', 'Spit Fire', 'Red Inferno', 'Magma Bomb', 'Heat Laser', 'Muscle Charge', 'Sonic Jab'],
		finisher: 'Pepper Breath'
	},
	gabumon: {
		num: 10,
		species: "Gabumon",
		types: ["Battle", "Fire"],
		baseStats: {
			hp: 1000,
			atk: 100,
			def: 200,
			spa: 100,
			spd: 200,
			spe: 200
		},
		abilities: {
			0: "Data"
		},
		weightkg: 6.8,
		color: "White",
		evo: ['centarumon', 'drimogemon', 'garurumon', 'monochromon', 'ogremon', 'tyrannomon', 'Nanimon', 'Numemon', 'Sukamon'],
		prevo: ["koromon"],
		battleMovePool: ['Fire Tower', 'Heat Laser', 'Tremar', 'War Cry', 'Sonic Jab', 'Dynamite Kick', 'Megaton Punch'],
		finisher: 'Blue Blaster'
	},
	patamon: {
		num: 11,
		species: "Patamon",
		types: ["Battle", "Air"],
		baseStats: {
			hp: 1200,
			atk: 200,
			def: 200,
			spa: 200,
			spd: 200,
			spe: 100
		},
		abilities: {
			0: "Data"
		},
		weightkg: 6.8,
		color: "Brown",
		evo: ['angemon', 'leomon', 'ogremon', 'unimon', 'ogremon', 'Nanimon', 'Numemon', 'Sukamon'],
		prevo: ["tokomon"],
		battleMovePool: ['War Cry', 'Sonic Jab', 'Dynamite Kick', 'Buster Drive', 'Spinning Shot', 'Wind Cutter', 'Confused Storm'],
		finisher: 'Boom Bubble'
	},
	elecmon: {
		num: 12,
		species: "Elecmon",
		types: ["Air", "Battle"],
		baseStats: {
			hp: 1000,
			atk: 200,
			def: 100,
			spa: 200,
			spd: 100,
			spe: 200
		},
		abilities: {
			0: "Data"
		},
		weightkg: 6.8,
		color: "Red",
		evo: ['angemon', 'leomon', 'kokatorimon', 'Nanimon', 'Numemon', 'Sukamon'],
		prevo: ["tsunomon"],
		battleMovePool: ['Muscle Charge', 'Dynamite Kick', 'Counter', 'Electric Cloud', 'Megalo Spark', 'Static Elect', 'Wind Cutter'],
		finisher: 'Super Thunder Strike'
	},
	biyomon: {
		num: 13,
		species: "Biyomon",
		types: ["Air", "Fire"],
		baseStats: {
			hp: 1200,
			atk: 150,
			def: 100,
			spa: 100,
			spd: 100,
			spe: 200
		},
		abilities: {
			0: "Vaccine"
		},
		weightkg: 6.8,
		color: "Pink",
		evo: ['airdramon', 'birdramon', 'kabuterimon', 'kokatorimon', 'Unimon', 'Nanimon', 'Numemon', 'Sukamon'],
		prevo: ["tokomon"],
		battleMovePool: ['Spit Fire', 'Heat Laser', 'Spinning Shot', 'Electric Cloud', 'Wind Cutter', 'Confused Storm', 'Hurricane'],
		finisher: 'Spiral Twister'
	},
	kunemon: {
		num: 14,
		species: "Kunemon",
		types: ["Earth", "Air"],
		baseStats: {
			hp: 1000,
			atk: 200,
			def: 100,
			spa: 200,
			spd: 100,
			spe: 130
		},
		abilities: {
			0: "Virus"
		},
		weightkg: 6.8,
		color: "Yellow",
		evo: ['kabuterimon', 'kuwagamon', 'vegiemon'],
		prevo: ["koromon", "tokomon", "tsunomon", "tanemon", 'Sukamon'],
		battleMovePool: ['Electric Cloud', 'Megalo Spark', 'Static Elect', 'Poison Powder', 'Mass Morph', 'Poison Claw', 'Danger Sting'],
		finisher: 'Electric Thread'
	},
	palmon: {
		num: 15,
		species: "Palmon",
		types: ["Earth", "Ice"],
		baseStats: {
			hp: 1200,
			atk: 100,
			def: 100,
			spa: 100,
			spd: 100,
			spe: 120
		},
		abilities: {
			0: "Vaccine"
		},
		weightkg: 6.8,
		color: "Green",
		evo: ['coelamon', 'kuwagamon', 'ninjamon', 'vegiemon', 'whamon', 'Nanimon', 'Numemon', 'Sukamon'],
		prevo: ["tanemon"],
		battleMovePool: ['Poison Powder', 'Mass Morph', 'Charm Perfume', 'Poison Claw', 'Water Blit', 'Aqua Magic', 'Tear Drop'],
		finisher: 'Poison Ivy'
	},
	betamon: {
		num: 16,
		species: "Betamon",
		types: ["Ice", "Air"],
		baseStats: {
			hp: 1000,
			atk: 100,
			def: 200,
			spa: 100,
			spd: 200,
			spe: 130
		},
		abilities: {
			0: "Virus"
		},
		weightkg: 6.8,
		color: "Green",
		evo: ['coelamon', 'drimogemon', 'seadramon', 'shellmon', 'whamon', 'Nanimon', 'Numemon', 'Sukamon'],
		prevo: ["tanemon"],
		battleMovePool: ['Electric Cloud', 'Static Elect', 'Giga Freeze', 'Winter Blast', 'Ice Needle', 'Water Blit', 'Aqua Magic'],
		finisher: 'Electric Shock'
	},
	penguinmon: {
		num: 17,
		species: "Penguinmon",
		types: ["Ice", "Earth"],
		baseStats: {
			hp: 1200,
			atk: 100,
			def: 200,
			spa: 100,
			spd: 200,
			spe: 100
		},
		abilities: {
			0: "Data"
		},
		weightkg: 6.8,
		color: "Blue",
		evo: ['fridgimon', 'garurumon', 'mojaymon', 'shellmon', 'whamon', 'Nanimon', 'Numemon', 'Sukamon'],
		prevo: ["tsunomon"],
		battleMovePool: ['Charm Perfume', 'Poison Claw', 'Giga Freeze', 'Winter Blast', 'Ice Needle', 'Water Blit', 'Aqua Magic'],
		finisher: 'Super Slap',
	},
};
