'use strict';

exports.BattlePokedex = {
	//A's

	//B's
	bisharp: {
		num: 625,
		species: "Bisharp",
		types: ["Dark", "Steel"],
		baseStats: {
			hp: 70,
			atk: 130,
			def: 100,
			spa: 60,
			spd: 80,
			spe: 90
		},
		abilities: {
			0: "Defiant",
			1: "Inner Focus",
			H: "Pressure"
		},
		heightm: 1.6,
		weightkg: 70,
		color: "Red",
		prevo: "pawniard",
		evoLevel: 52,
		eggGroups: ["Human-Like"],
	},
	blissey: {
		num: 242,
		species: "Blissey",
		types: ["Normal"],
		gender: "F",
		baseStats: {
			hp: 255,
			atk: 10,
			def: 40,
			spa: 75,
			spd: 135,
			spe: 55
		},
		abilities: {
			0: "Natural Cure",
			1: "Serene Grace",
			H: "Healer"
		},
		heightm: 1.5,
		weightkg: 46.8,
		color: "Pink",
		prevo: "chansey",
		evoLevel: 2,
		eggGroups: ["Fairy"],
	},
	//C's
	chansey: {
		num: 113,
		species: "Chansey",
		types: ["Normal"],
		gender: "F",
		baseStats: {
			hp: 250,
			atk: 5,
			def: 30,
			spa: 35,
			spd: 105,
			spe: 50
		},
		abilities: {
			0: "Natural Cure",
			1: "Serene Grace",
			H: "Healer"
		},
		heightm: 1.1,
		weightkg: 34.6,
		color: "Pink",
		prevo: "happiny",
		evos: ["blissey"],
		evoLevel: 1,
		eggGroups: ["Fairy"],
	},
	clefable: {
		num: 36,
		species: "Clefable",
		types: ["Fairy"],
		genderRatio: {
			M: 0.25,
			F: 0.75
		},
		baseStats: {
			hp: 100,
			atk: 70,
			def: 80,
			spa: 110,
			spd: 100,
			spe: 70
		},
		abilities: {
			0: "Cute Charm",
			1: "Magic Guard",
			H: "Unaware"
		},
		heightm: 1.3,
		weightkg: 40,
		color: "Pink",
		prevo: "clefairy",
		evoLevel: 1,
		eggGroups: ["Fairy"],
	},
	//D's

	//E's

	//F's
	furret: {
		num: 162,
		species: "Furret",
		types: ["Normal", "Ghost"],
		baseStats: {hp: 90, atk: 100, def: 100, spa: 45, spd: 70, spe: 90},
		abilities: {0: "Fluffy", 1: "Keen Eye", H: "Frisk"},
		heightm: 1.8,
		weightkg: 32.5,
		color: "Brown",
		prevo: "sentret",
		evoLevel: 15,
		eggGroups: ["Field"],
	},
	//G's
	gardevoir: {
		num: 282,
		species: "Gardevoir",
		types: ["Psychic", "Fairy"],
		baseStats: {
			hp: 70,
			atk: 65,
			def: 65,
			spa: 125,
			spd: 115,
			spe: 80
		},
		abilities: {
			0: "Synchronize",
			1: "Trace",
			H: "Telepathy"
		},
		heightm: 1.6,
		weightkg: 48.4,
		color: "White",
		prevo: "kirlia",
		evoLevel: 30,
		eggGroups: ["Amorphous"],
		otherFormes: ["gardevoirmega"],
	},
	gardevoirmega: {
		num: 282,
		species: "Gardevoir-Mega",
		baseSpecies: "Gardevoir",
		forme: "Mega",
		formeLetter: "M",
		types: ["Psychic", "Fairy"],
		baseStats: {
			hp: 70,
			atk: 85,
			def: 65,
			spa: 165,
			spd: 135,
			spe: 105
		},
		abilities: {
			0: "Pixilate"
		},
		heightm: 1.6,
		weightkg: 48.4,
		color: "White",
		eggGroups: ["Amorphous"],
	},
	//H's

	//I's
	inkay: {
		num: 686,
		species: "Inkay",
		types: ["Water", "Psychic"],
		baseStats: {
			hp: 53,
			atk: 54,
			def: 53,
			spa: 37,
			spd: 46,
			spe: 45
		},
		abilities: {
			0: "Contrary",
			1: "Suction Cups",
			H: "Infiltrator"
		},
		heightm: 0.4,
		weightkg: 3.5,
		color: "Blue",
		evos: ["malamar"],
		eggGroups: ["Water 1", "Water 2"],
	},
	//J's

	//K's

	//L's
	lugia: {
		num: 249,
		species: "Lugia",
		types: ["Water", "Flying"],
		gender: "N",
		baseStats: {
			hp: 106,
			atk: 90,
			def: 130,
			spa: 90,
			spd: 154,
			spe: 110
		},
		abilities: {
			0: "Pressure",
			H: "Multiscale"
		},
		heightm: 5.2,
		weightkg: 216,
		color: "White",
		eggGroups: ["Undiscovered"],
	},
	//M's
	malamar: {
		num: 687,
		species: "Malamar",
		types: ["Dark", "Psychic"],
		baseStats: {
			hp: 100,
			atk: 100,
			def: 100,
			spa: 70,
			spd: 80,
			spe: 80
		},
		abilities: {
			0: "Contrary",
			1: "Suction Cups",
			H: "Infiltrator"
		},
		heightm: 1.5,
		weightkg: 47,
		color: "Blue",
		prevo: "inkay",
		evoLevel: 30,
		eggGroups: ["Water 1", "Water 2"],
	},
	milotic: {
		num: 350,
		species: "Milotic",
		types: ["Water", "Fairy"],
		baseStats: {
			hp: 95,
			atk: 60,
			def: 79,
			spa: 100,
			spd: 125,
			spe: 81
		},
		abilities: {
			0: "Marvel Scale",
			1: "Competitive",
			H: "Cute Charm"
		},
		heightm: 6.2,
		weightkg: 162,
		color: "Pink",
		prevo: "feebas",
		evoLevel: 1,
		eggGroups: ["Water 1", "Dragon"],
	},
	//N's

	//O's

	//P's
	pangoro: {
		num: 675,
		species: "Pangoro",
		types: ["Fighting", "Dark"],
		baseStats: {
			hp: 95,
			atk: 125,
			def: 78,
			spa: 69,
			spd: 71,
			spe: 90
		},
		abilities: {
			0: "Iron Fist",
			1: "Mold Breaker",
			H: "Scrappy"
		},
		heightm: 2.1,
		weightkg: 136,
		color: "White",
		prevo: "pancham",
		evoLevel: 32,
		eggGroups: ["Field", "Human-Like"],
	},
	persian: {
		num: 53,
		species: "Persian",
		types: ["Normal", "Dark"],
		baseStats: {
			hp: 65,
			atk: 70,
			def: 60,
			spa: 65,
			spd: 65,
			spe: 115
		},
		abilities: {
			0: "Limber",
			1: "Technician",
			H: "Unnerve"
		},
		heightm: 1,
		weightkg: 32,
		color: "Yellow",
		prevo: "meowth",
		evoLevel: 28,
		eggGroups: ["Field"],
	},
	pidgeot: {
		num: 18,
		species: "Pidgeot",
		types: ["Normal", "Flying"],
		baseStats: {
			hp: 90,
			atk: 100,
			def: 85,
			spa: 100,
			spd: 85,
			spe: 110
		},
		abilities: {
			0: "Keen Eye",
			1: "Tangled Feet",
			H: "Big Pecks"
		},
		heightm: 1.5,
		weightkg: 39.5,
		color: "Brown",
		prevo: "pidgeotto",
		evoLevel: 36,
		eggGroups: ["Flying"],
		otherFormes: ["pidgeotmega"],
	},
	pidgeotmega: {
		num: 18,
		species: "Pidgeot-Mega",
		baseSpecies: "Pidgeot",
		forme: "Mega",
		formeLetter: "M",
		types: ["Normal", "Flying"],
		baseStats: {
			hp: 90,
			atk: 135,
			def: 85,
			spa: 135,
			spd: 85,
			spe: 130
		},
		abilities: {
			0: "No Guard"
		},
		heightm: 2.2,
		weightkg: 50.5,
		color: "Brown",
		eggGroups: ["Flying"],
	},
	pikachurockstar: {
		num: 25,
		species: "Pikachu-Rock-Star",
		baseSpecies: "Pikachu",
		forme: "Rock-Star",
		formeLetter: "R",
		types: ["Electric", "Steel"],
		gender: "F",
		baseStats: {hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90},
		abilities: {0: "Lightning Rod"},
		heightm: 0.4,
		weightkg: 6,
		color: "Yellow",
		eggGroups: ["Undiscovered"],
	},
	pikachubelle: {
		num: 25,
		species: "Pikachu-Belle",
		baseSpecies: "Pikachu",
		forme: "Belle",
		formeLetter: "B",
		types: ["Electric", "Ice"],
		gender: "F",
		baseStats: {hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90},
		abilities: {0: "Lightning Rod"},
		heightm: 0.4,
		weightkg: 6,
		color: "Yellow",
		eggGroups: ["Undiscovered"],
	},
	pikachupopstar: {
		num: 25,
		species: "Pikachu-Pop-Star",
		baseSpecies: "Pikachu",
		forme: "Pop-Star",
		formeLetter: "P",
		types: ["Electric", "Fairy"],
		gender: "F",
		baseStats: {hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90},
		abilities: {0: "Lightning Rod"},
		heightm: 0.4,
		weightkg: 6,
		color: "Yellow",
		eggGroups: ["Undiscovered"],
	},
	pikachuphd: {
		num: 25,
		species: "Pikachu-PhD",
		baseSpecies: "Pikachu",
		forme: "PhD",
		formeLetter: "D",
		types: ["Electric", "Psychic"],
		gender: "F",
		baseStats: {hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90},
		abilities: {0: "Lightning Rod"},
		heightm: 0.4,
		weightkg: 6,
		color: "Yellow",
		eggGroups: ["Undiscovered"],
	},
	pikachulibre: {
		num: 25,
		species: "Pikachu-Libre",
		baseSpecies: "Pikachu",
		forme: "Libre",
		formeLetter: "L",
		types: ["Electric", "Fighting"],
		gender: "F",
		baseStats: {hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90},
		abilities: {0: "Lightning Rod"},
		heightm: 0.4,
		weightkg: 6,
		color: "Yellow",
		eggGroups: ["Undiscovered"],
	},
	//Q's

	//R's
	regigigas: {
		num: 486,
		species: "Regigigas",
		types: ["Normal", "Fighting"],
		gender: "N",
		baseStats: {
			hp: 110,
			atk: 160,
			def: 110,
			spa: 80,
			spd: 110,
			spe: 100
		},
		abilities: {
			0: "Slow Start"
		},
		heightm: 3.7,
		weightkg: 420,
		color: "White",
		eggGroups: ["Undiscovered"],
	},
	//S'
	sunflora: {
		num: 192,
		species: "Sunflora",
		types: ["Grass", "Fire"],
		baseStats: {
			hp: 100,
			atk: 100,
			def: 70,
			spa: 110,
			spd: 100,
			spe: 50
		},
		abilities: {
			0: "Chlorophyll",
			1: "Solar Power",
			H: "Early Bird"
		},
		heightm: 0.8,
		weightkg: 8.5,
		color: "Yellow",
		prevo: "sunkern",
		evoLevel: 1,
		eggGroups: ["Grass"],
	},
	//T's
	torkoal: {
		num: 324,
		species: "Torkoal",
		types: ["Fire"],
		baseStats: {
			hp: 90,
			atk: 95,
			def: 150,
			spa: 110,
			spd: 85,
			spe: 20
		},
		abilities: {
			0: "White Smoke",
			H: "Shell Armor"
		},
		heightm: 0.5,
		weightkg: 80.4,
		color: "Brown",
		eggGroups: ["Field"],
	},
	tropius: {
		num: 357,
		species: "Tropius",
		types: ["Grass", "Flying"],
		baseStats: {
			hp: 100,
			atk: 100,
			def: 95,
			spa: 110,
			spd: 95,
			spe: 100
		},
		abilities: {
			0: "Chlorophyll",
			1: "Solar Power",
			H: "Harvest"
		},
		heightm: 2,
		weightkg: 100,
		color: "Green",
		eggGroups: ["Monster", "Grass"],
	},
	//U's

	//V's

	//W's

	//X's

	//Y's

	//Z's
};
