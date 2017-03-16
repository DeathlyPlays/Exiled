//Fresh, 100% Ready/

'use strict';

exports.BattlePokedex = {
	botamon: {
		num: -301,
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
		evos: ["Koromon", "Sukamon"],
	},
	poyomon: {
		num: -302,
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
		evos: ["Tokomon", "Sukamon"],
	},
	punimon: {
		num: -303,
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
		evos: ["Tsunomon", "Sukamon"],
	},
	yuramon: {
		num: -304,
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
		evos: ["Tanemon", "Sukamon"],
	},
	//In-Training, 100% Ready/
	koromon: {
		num: -305,
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
		evos: ["Agumon", "Gabumon", "Kunemon", "Sukamon"],
		prevo: ["Botamon"],
	},
	tokomon: {
		num: -306,
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
		evos: ["Patamon", "Biyomon", "Kunemon", "Sukamon"],
		prevos: ["Poyomon"],
	},
	tsunomon: {
		num: -307,
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
		evos: ["Elecmon", "Penguinmon", "Kunemon", "Sukamon"],
		prevos: ["Punimon"],
	},
	tanemon: {
		num: -308,
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
		evos: ["Palmon", "Betamon", "Kunemon", "Sukamon"],
		prevos: ["Yuramon"],
	},
	//Rookie, 100% ready
	agumon: {
		num: -309,
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
		evo: ["Birdramon", "Centarumon", "Greymon", "Meramon", "Monochromon", "Tyrannomon", "Nanimon", "Numemon", "Sukamon"],
		prevo: ["Koromon"],
	},
	gabumon: {
		num: -310,
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
		evo: ["Centarumon", "Drimogemon", "Garurumon", "Monochromon", "Ogremon", "Tyrannomon", "Nanimon", "Numemon", "Sukamon"],
		prevo: ["Koromon"],
	},
	patamon: {
		num: -311,
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
		evo: ["Angemon", "Leomon", "Ogremon", "Unimon", "Ogremon", "Nanimon", "Numemon", "Sukamon"],
		prevo: ["Tokomon"],
	},
	elecmon: {
		num: -312,
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
		evo: ["Angemon", "Leomon", "Kokatorimon", "Nanimon", "Numemon", "Sukamon"],
		prevo: ["Tsunomon"],
	},
	biyomon: {
		num: -313,
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
		evo: ["Airdramon", "Birdramon", "Kabuterimon", "Kokatorimon", "Unimon", "Nanimon", "Numemon", "Sukamon"],
		prevo: ["Tokomon"],
	},
	kunemon: {
		num: -314,
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
		evo: ["Kabuterimon", "Kuwagamon", "Vegiemon"],
		prevo: ["Koromon", "Tokomon", "Tsunomon", "Tanemon", "Sukamon"],
	},
	palmon: {
		num: -315,
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
		evo: ["Coelamon", "Kuwagamon", "Ninjamon", "Vegiemon", "Whamon", "Nanimon", "Numemon", "Sukamon"],
		prevo: ["Tanemon"],
	},
	betamon: {
		num: -316,
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
		evo: ["Coelamon", "Drimogemon", "Seadramon", "Shellmon", "Whamon", "Nanimon", "Numemon", "Sukamon"],
		prevo: ["Tanemon"],
	},
	penguinmon: {
		num: -317,
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
		evo: ["Fridgimon", "Garurumon", "Mojaymon", "Shellmon", "Whamon", "Nanimon", "Numemon", "Sukamon"],
		prevo: ["Tsunomon"],
	},
	//Champion/
	greymon: {
		num: -318,
		species: "Greymon",
		types: ["Fire", "Battle", "Air"],
		baseStats: {
			hp: 1700,
			atk: 300,
			def: 100,
			spa: 300,
			spd: 100,
			spe: 250
		},
		abilities: {
			0: "Vaccine"
		},
		weightkg: 13.6,
		color: "Brown",
		evo: ["MetalGreymon", "SkullGreymon", "Vademon"],
		prevo: ["Agumon"],
	},
	monochromon: {
		num: -319,
		species: "Monochromon",
		types: ["Fire", "Battle", "Earth"],
		baseStats: {
			hp: 2200,
			atk: 300,
			def: 100,
			spa: 300,
			spd: 100,
			spe: 300
		},
		abilities: {
			0: "Data"
		},
		weightkg: 18.1,
		color: "Gray",
		evo: ["MetalGreymon", "MetalMamemon", "Vademon"],
		prevo: ["Agumon", "Gabumon"],
	},
	ogremon: {
		num: -320,
		species: "Ogremon",
		types: ["Battle", "Fire", "Earth"],
		baseStats: {
			hp: 2000,
			atk: 300,
			def: 300,
			spa: 300,
			spd: 300,
			spe: 100
		},
		abilities: {
			0: "Virus"
		},
		weightkg: 13.6,
		color: "Green",
		evo: ["Andromon", "Giromon", "Vademon"],
		prevo: ["Gabumon", "Patamon"],
	},
	airdramon: {
		num: -320,
		species: "Airdramon",
		types: ["Air", "Fire"],
		baseStats: {
			hp: 1700,
			atk: 200,
			def: 100,
			spa: 200,
			spd: 100,
			spe: 400
		},
		abilities: {
			0: "Vaccine"
		},
		weightkg: 13.6,
		color: "Blue",
		evo: ["Megadramon", "Phoenixmon", "Vademon"],
		prevo: ["Biyomon"],
	},
	kuwagamon: {
		num: -321,
		species: "Kuwagamon",
		types: ["Earth", "Battle", "Air"],
		baseStats: {
			hp: 2200,
			atk: 300,
			def: 100,
			spa: 300,
			spd: 100,
			spe: 100
		},
		abilities: {
			0: "Virus"
		},
		weightkg: 13.6,
		color: "Red",
		evo: ["HerculesKabuterimon", "Piximon", "Vademon"],
		prevo: ["Kunemon", "Palmon"],
	},
	whamon: {
		num: -322,
		species: "Whamon",
		types: ["Ice", "Earth"],
		baseStats: {
			hp: 2200,
			atk: 100,
			def: 100,
			spa: 100,
			spd: 100,
			spe: 300
		},
		abilities: {
			0: "Vaccine"
		},
		weightkg: 18.1,
		color: "Blue",
		evo: ["Mamemon", "MegaSeadramon", "Vademon"],
		prevo: ["Betamon", "Palmon", "Penguinmon"],
	},
	frigimon: {
		num: -323,
		species: "Frigimon",
		types: ["Ice", "Battle"],
		baseStats: {
			hp: 2200,
			atk: 100,
			def: 300,
			spa: 100,
			spd: 300,
			spe: 100
		},
		abilities: {
			0: "Vaccine"
		},
		weightkg: 18.1,
		color: "Blue",
		evo: ["Mamemon", "MetalMamemon", "Vademon"],
		prevo: ["Penguinmon"],
	},
	nanimon: {
		num: -323,
		species: "Nanimon",
		types: ["Filth", "Battle"],
		baseStats: {
			hp: 1500,
			atk: 100,
			def: 100,
			spa: 100,
			spd: 100,
			spe: 100
		},
		abilities: {
			0: "Virus"
		},
		weightkg: 2.3,
		color: "Brown",
		evo: ["Digitamamon", "Vademon"],
		prevo: ["Agumon", "Betamon", "Biyomon", "Elecmon", "Gabumon", "Kunemon", "Palmon", "Patamon", "Penguinmon"],
	},
	meramon: {
		num: -324,
		species: "Meramon",
		types: ["Fire", "Battle"],
		baseStats: {
			hp: 1500,
			atk: 300,
			def: 100,
			spa: 300,
			spd: 100,
			spe: 160
		},
		abilities: {
			0: "Data"
		},
		weightkg: 9.1,
		color: "Red",
		evo: ["Andromon", "MetalGreymon", "Vademon"],
		prevo: ["Agumon"],
	},
	drimogemon: {
		num: -325,
		species: "Drimogemon",
		types: ["Battle", "Earth"],
		baseStats: {
			hp: 1500,
			atk: 100,
			def: 300,
			spa: 100,
			spd: 300,
			spe: 300
		},
		abilities: {
			0: "Data"
		},
		weightkg: 18.1,
		color: "Purple",
		evo: ["MetalGreymon", "Vademon"],
		prevo: ["Betamon", "Gabumon"],
	},
	leomon: {
		num: -326,
		species: "Leomon",
		types: ["Battle", "Air"],
		baseStats: {
			hp: 1700,
			atk: 300,
			def: 100,
			spa: 300,
			spd: 100,
			spe: 300
		},
		abilities: {
			0: "Vaccine"
		},
		weightkg: 9.1,
		color: "Yellow",
		evo: ["Andromon", "Mamemon", "Vademon"],
		prevo: ["Elecmon", "Patamon"],
	},
	kokatorimon: {
		num: -327,
		species: "Kokatorimon",
		types: ["Air", "Battle"],
		baseStats: {
			hp: 1700,
			atk: 300,
			def: 100,
			spa: 300,
			spd: 100,
			spe: 300
		},
		abilities: {
			0: "Vaccine"
		},
		weightkg: 13.6,
		color: "White",
		evo: ["Andromon", "Mamemon", "Vademon"],
		prevo: ["Elecmon", "Patamon"],
	},
	vegiemon: {
		num: -328,
		species: "Vegiemon",
		types: ["Earth", "Ice"],
		baseStats: {
			hp: 1500,
			atk: 300,
			def: 100,
			spa: 300,
			spd: 100,
			spe: 130
		},
		abilities: {
			0: "Virus"
		},
		weightkg: 4.5,
		color: "Green",
		evo: ["Piximon", "Vademon"],
		prevo: ["Kunemon", "Palmon"],
	},
	shellmon: {
		num: -329,
		species: "Shellmon",
		types: ["Ice", "Earth"],
		baseStats: {
			hp: 2200,
			atk: 100,
			def: 300,
			spa: 100,
			spd: 300,
			spe: 100
		},
		abilities: {
			0: "Data"
		},
		weightkg: 18.1,
		color: "Pink",
		evo: ["MegaSeadramon", "HerculesKabuterimon", "Vademon"],
		prevo: ["Betamon", "Pengiunmon"],
	},
	mojyamon: {
		num: -330,
		species: "Mojyamon",
		types: ["Ice", "Battle", "Earth"],
		baseStats: {
			hp: 2000,
			atk: 100,
			def: 300,
			spa: 100,
			spd: 300,
			spe: 100
		},
		abilities: {
			0: "Vaccine"
		},
		weightkg: 9.1,
		color: "White",
		evo: ["Mamemon", "SkullGreymon", "Vademon"],
		prevo: ["Penguinmon"],
	},
	birdramon: {
		num: -331,
		species: "Birdramon",
		types: ["Fire", "Air"],
		baseStats: {
			hp: 1500,
			atk: 300,
			def: 100,
			spa: 300,
			spd: 100,
			spe: 305
		},
		abilities: {
			0: "Vaccine"
		},
		weightkg: 9.1,
		color: "Red",
		evo: ["Phoenixmon", "Vademon"],
		prevo: ["Agumon", "Biyomon"],
	},
	tyrannomon: {
		num: -332,
		species: "Tyrannomon",
		types: ["Fire", "Battle"],
		baseStats: {
			hp: 2000,
			atk: 300,
			def: 300,
			spa: 300,
			spd: 300,
			spe: 300
		},
		abilities: {
			0: "Data"
		},
	},
	angemon: {
		num: -333,
		species: "Angemon",
		types: ["Air", "Battle"],
		baseStats: {
			hp: 1700,
			atk: 300,
			def: 100,
			spa: 300,
			spd: 100,
			spe: 300
		},
		abilities: {
			0: "Vaccine"
		},
	},
	unimon: {
		num: -334,
		species: "Unimon",
		types: ["Air", "Battle"],
		baseStats: {
			hp: 2000,
			atk: 300,
			def: 300,
			spa: 300,
			spd: 300,
			spe: 300
		},
		abilities: {
			0: "Vaccine"
		},
	},
};
