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
	//Champion/
	greymon: {
        num: 18,
        species: "Greymon",
        types: ["Fire", "Battle", "Air"],
        baseStats: {hp: 1700, atk: 300, def: 100, spa: 300, spd: 100, spe: 250},
        abilities: {0: "Vaccine"},
        weightkg: 13.6,
        color: "Brown",
        evo: ['MetalGreymon', 'SkullGreymon', 'Vademon'],
        prevo: ["Agumon"],
        battleMovePool: ['Fire Tower', 'Promience Beam', 'Spit Fire', 'Red Inferno', 'Magma Bomb', 'Heat Laser', 'Meltdown', 'Muscle Charge', 'Dynamite Kick', 'Counter', 'Spinning Shot', 'Megalo Spark'],
        finisher: 'Mega Flame'
	},
	Monochromon: {
        num: 19,
        species: "Monochromon",
        types: ["Fire", "Battle", "Earth"],
        baseStats: {hp: 2200, atk: 300, def: 100, spa: 300, spd: 100, spe: 300},
        abilities: {0: "Data"},
        weightkg: 18.1,
        color: "Gray",
        evo: ['MetalGreymon', 'MetalMamemon', 'Vademon'],
        prevo: ["Agumon", "Gabumon"],
        battleMovePool: ['Promience Beam', 'Spit Fire', 'Red Inferno', 'Heat Laser', 'Meltdown', 'Tremar', 'Counter', 'Megaton Punch', 'Mass Morph', 'Insect Plauge', 'Green Trap'],
        finisher: 'Volcanic Strike'
	},
	ogremon: {
        num: 20,
        species: "Ogremon",
        types: ["Battle", "Fire", "Earth"],
        baseStats: {hp: 2000, atk: 300, def: 300, spa: 300, spd: 300, spe: 100},
        abilities: {0: "Virus"},
        weightkg: 13.6,
        color: "Green",
        evo: ['Andromon', 'Giromon', 'Vademon'],
        prevo: ["Gabumon", "Patamon"],
        battleMovePool: ['Spit Fire', 'Red Inferno', 'Magma Bomb', 'Tremar', 'Meltdown', 'Tremar', 'War Cry', 'Sonic Jab', 'Dynamite Kick', 'Megaton Punch', 'Spinning Shot', 'Buster Drive'],
        finisher: 'Pummel Whack'
	},
	airdramon: {
        num: 20,
        species: "airdramon",
        types: ["Air", "Fire"],
        baseStats: {hp: 1700, atk: 200, def: 100, spa: 200, spd: 100, spe: 400},
        abilities: {0: "Vaccine"},
        weightkg: 13.6,
        color: "Blue",
        evo: ['Megadramon', 'Phoenixmon', 'Vademon'],
        prevo: ["Biyomon"],
        battleMovePool: ['Prominence Beam', 'Spit Fire', 'Heat Laser', 'Spinning Shot', 'Electric Cloud', 'Megalo Spark', 'Static Elect', 'Wind Cutter', 'Confused Storm', 'Hurricane'],
        finisher: 'Spinning Needle'
	},
	kuwagamon: {
        num: 21,
        species: "Kuwagamon",
        types: ["Earth", "Battle", "Air"],
        baseStats: {hp: 2200, atk: 300, def: 100, spa: 300, spd: 100, spe: 100},
        abilities: {0: "Virus"},
        weightkg: 13.6,
        color: "Red",
        evo: ['HerculesKabuterimon', 'Piximon', 'Vademon'],
        prevo: ["Kunemon", "Palmon"],
        battleMovePool: ['Muscle Charge', 'Sonic Jab', 'Spinning Shot', 'Wind Cutter', 'Poison Powder', 'Mass Morph', 'Charm Perfume', 'Poison Claw', 'Danger Sting', 'Green Trap'],
        finisher: 'Scissor Claw'
	},
	whamon: {
        num: 22,
        species: "Whamon",
        types: ["Ice", "Earth"],
        baseStats: {hp: 2200, atk: 100, def: 100, spa: 100, spd: 100, spe: 300},
        abilities: {0: "Vaccine"},
        weightkg: 18.1,
        color: "Blue",
        evo: ['Mamemon', 'MegaSeadramon', 'Vademon'],
        prevo: ["Betamon", "Palmon", "Penguinmon"],
        battleMovePool: ['Poison Powder', 'Charm Perfume', 'Giga Freeze', 'Ice Statue', 'Winter Blast', 'Ice Needle', 'Water Blit', 'Aqua Magic', 'Aurora Freeze', 'Tear Drop'],
        finisher: 'Blasting Spout'
	},
	frigimon: {
        num: 23,
        species: "Frigimon",
        types: ["Ice", "Battle"],
        baseStats: {hp: 2200, atk: 100, def: 300, spa: 100, spd: 300, spe: 100},
        abilities: {0: "Vaccine"},
        weightkg: 18.1,
        color: "Blue",
        evo: ['Mamemon', 'MetalMamemon', 'Vademon'],
        prevo: ["Penguinmon"],
        battleMovePool: ['Muscle Charge', 'Sonic Jab', 'Giga Freeze', 'Ice Statue', 'Winter Blast', 'Ice Needle', 'Water Blit', 'Aqua Magic', 'Aurora Freeze', 'Tear Drop'],
        finisher: 'Sub Zero Ice Punch'
	},
	nanimon: {
        num: 23,
        species: "Nanimon",
        types: ["Filth", "Battle"],
        baseStats: {hp: 1500, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
        abilities: {0: "Virus"},
        weightkg: 2.3,
        color: "Brown",
        evo: ['Digitamamon', 'Vademon'],
        prevo: ["Agumon", "Betamon", "Biyomon", "Elecmon", "Gabumon", "Kunemon", "Palmon", "Patamon", "Penguinmon"],
        battleMovePool: ['Dynamite Kick', 'Counter', 'Megaton Punch', 'Order Spray', 'Poop Spd Toss', 'Big Poop Toss', 'Big Rnd Toss', 'Poop Rnd Toss', 'Rnd Spd Toss', 'Horizontal Kick'],
        finisher: 'Party Time'
	},
	meramon: {
        num: 24,
        species: "Meramon",
        types: ["Fire", "Battle"],
        baseStats: {hp: 1500, atk: 300, def: 100, spa: 300, spd: 100, spe: 160},
        abilities: {0: "Data"},
        weightkg: 9.1,
        color: "Red",
        evo: ['Andromon', 'MetalGreymon', 'Vademon'],
        prevo: ["Agumon"],
        battleMovePool: ['Fire Tower', 'Prominence Beam', 'Spit Fire', 'Red Inferno', 'Magma Bomb', 'Heat Laser', 'Infinity Burn', 'War Cry', 'Dynamite Kick', 'Counter'],
        finisher: 'Fireball'
	},
	drimogemon: {
        num: 25,
        species: "Drimogemon",
        types: ["Battle", "Earth"],
        baseStats: {hp: 1500, atk: 100, def: 300, spa: 100, spd: 300, spe: 300},
        abilities: {0: "Data"},
        weightkg: 18.1,
        color: "Purple",
        evo: ['MetalGreymon', 'Vademon'],
        prevo: ["Betamon", "Gabumon"],
        battleMovePool: ['Tremar', 'Muscle Charge', 'War Cry', 'Sonic Jab', 'Dynamite Kick', 'Counter', 'Megaton Punch', 'Buster Drive', 'Charm Perfume', 'Green Trap'],
        finisher: 'Drill Spin'
	},
	leomon: {
        num: 26,
        species: "Leomon",
        types: ["Battle", "Air"],
        baseStats: {hp: 1700, atk: 300, def: 100, spa: 300, spd: 100, spe: 300},
        abilities: {0: "Vaccine"},
        weightkg: 9.1,
        color: "Yellow",
        evo: ['Andromon', 'Mamemon', 'Vademon'],
        prevo: ["Elecmon", "Patamon"],
        battleMovePool: ['Tremar', 'Muscle Charge', 'War Cry', 'Sonic Jab', 'Dynamite Kick', 'Counter', 'Megaton Punch', 'Buster Drive', 'Megalo Spark', 'Static Elect'],
        finisher: 'Fist of the Beast King'
	},
	kokatorimon: {
        num: 27,
        species: "Kokatorimon",
        types: ["Air", "Battle"],
        baseStats: {hp: 1700, atk: 300, def: 100, spa: 300, spd: 100, spe: 300},
        abilities: {0: "Vaccine"},
        weightkg: 13.6,
        color: "White",
        evo: ['Andromon', 'Mamemon', 'Vademon'],
        prevo: ["Elecmon", "Patamon"],
        battleMovePool: ['Tremar', 'War Cry', 'Dynamite Kick', 'Spinning Shot', 'Electric Cloud', 'Megalo Spark', 'Static Elect', 'Wind Cutter', 'Confused Storm', 'Hurricane'],
        finisher: 'Frozen Fire Shot'
    },
	vegiemon: {
        num: 28,
        species: "Vegiemon",
        types: ["Earth", "Ice"],
        baseStats: {hp: 1500, atk: 300, def: 100, spa: 300, spd: 100, spe: 130},
        abilities: {0: "Virus"},
        weightkg: 4.5,
        color: "Green",
        evo: ['Piximon', 'Vademon'],
        prevo: ["Kunemon", "Palmon"],
        battleMovePool: ['Poison Powder', 'Mass Morph', 'Charm Perfume', 'Poison Claw', 'Danger Sting', 'Green Trap', 'Water Blit', 'Aqua Magic',],
        finisher: 'Sweet Breath'
    },
	shellmon: {
        num: 29,
        species: "Shellmon",
        types: ["Ice", "Earth"],
        baseStats: {hp: 2200, atk: 100, def: 300, spa: 100, spd: 300, spe: 100},
        abilities: {0: "Data"},
        weightkg: 18.1,
        color: "Pink",
        evo: ['MegaSeadramon','HerculesKabuterimon', 'Vademon'],
        prevo: ["Betamon", "Pengiunmon"],
        battleMovePool: ['Poison Powder', 'Charm Perfume', 'Giga Freeze', 'Ice Statue', 'Winter Blast', 'Ice Needle', 'Water Blit', 'Aqua Magic', 'Aurora Freeze', 'Tear Drop'],
        finisher: 'Hydro Pressure'
    },
	mojyamon: {
        num: 30,
        species: "Mojyamon",
        types: ["Ice", "Battle", "Earth"],
        baseStats: {hp: 2000, atk: 100, def: 300, spa: 100, spd: 300, spe: 100},
        abilities: {0: "Vaccine"},
        weightkg: 9.1,
        color: "White",
        evo: ['Mamemon', 'SkullGreymon', 'Vademon'],
        prevo: ["Penguinmon"],
        battleMovePool: ['Dynamite Kick', 'Megaton Punch', 'Mass Morph', 'Green Trap', 'Giga Freeze', 'Winter Blast', 'Ice Needle', 'Water Blit', 'Aqua Magic', 'Aurora Freeze'],
        finisher: 'Bone Boomerang'
	},
	birdramon: {
        num: 31,
        species: "Birdramon",
        types: ["Fire", "Air"],
        baseStats: {hp: 1500, atk: 300, def: 100, spa: 300, spd: 100, spe: 305},
        abilities: {0: "Vaccine"},
        weightkg: 9.1,
        color: "Red",
        evo: ['Phoenixmon', 'Vademon'],
        prevo: ["Agumon", "Biyomon"],
        battleMovePool: ['Fire Tower', 'Promience Beam', 'Spit Fire', 'Red Inferno', 'Magma Bomb', 'Heat Laser', 'Meltdown', 'Spinning Shot', 'Wind Cutter', 'Hurricane'],
        finisher: 'Meteor Wing'
	},    
};
