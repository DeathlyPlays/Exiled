'use strict';

exports.BattlePokedex = {
	jirachi: {
		inherit: true,
		types: ["Psychic", "Cosmic"],
	},
	deoxys: {
		inherit: true,
		types: ["Cosmic"],
	},
	deoxysattack: {
		inherit: true,
		types: ["Cosmic"],
	},
	deoxysdefense: {
		inherit: true,
		types: ["Cosmic"],
	},
	deoxysspeed: {
		inherit: true,
		types: ["Cosmic"],
	},
	metagross: {
		inherit: true,
		types: ["Steel", "Cosmic"],
	},
	lunatone: {
		inherit: true,
		types: ["Psychic", "Cosmic"],
	},
	solrock: {
		inherit: true,
		types: ["Rock", "Cosmic"],
	},
	arceus: {
		inherit: true,
		otherFormes: ["arceusbug", "arceuscosmic", "arceusdark", "arceusdragon", "arceuselectric", "arceusfairy", "arceusfighting", "arceusfire", "arceusflying", "arceusghost", "arceusgrass", "arceusground", "arceusice", "arceuspoison", "arceuspsychic", "arceusrock", "arceussteel", "arceuswater"],
	},
	arceuscosmic: {
		num: 493,
		species: "Arceus-Cosmic",
		baseSpecies: "Arceus",
		forme: "Cosmic",
		formeLetter: "C",
		types: ["Cosmic"],
		gender: "N",
		baseStats: {hp: 120, atk: 120, def: 120, spa: 120, spd: 120, spe: 120},
		abilities: {0: "Multitype"},
		heightm: 3.2,
		weightkg: 320,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	silvally: {
		inherit: true,
		otherFormes: ["silvallybug", "silvallycosmic", "silvallydark", "silvallydragon", "silvallyelectric", "silvallyfairy", "silvallyfighting", "silvallyfire", "silvallyflying", "silvallyghost", "silvallygrass", "silvallyground", "silvallyice", "silvallypoison", "silvallypsychic", "silvallyrock", "silvallysteel", "silvallywater"],
	},
	silvallycosmic: {
		num: 773,
		species: "Silvally-Cosmic",
		baseSpecies: "Silvally",
		forme: "Cosmic",
		formeLetter: "C",
		types: ["Cosmic"],
		gender: "N",
		baseStats: {hp: 95, atk: 95, def: 95, spa: 95, spd: 95, spe: 95},
		abilities: {0: "RKS System"},
		heightm: 2.3,
		weightkg: 100.5,
		color: "Gray",
		prevo: "typenull",
		evoLevel: 2,
		eggGroups: ["Undiscovered"],
	},
	cosmog: {
		inherit: true,
		types: ["Cosmic"],
	},
	cosmoem: {
		inherit: true,
		types: ["Cosmic"],
	},
	solgaleo: {
		inherit: true,
		types: ["Cosmic", "Steel"],
	},
	lunala: {
		inherit: true,
		types: ["Cosmic", "Ghost"],
	},
	cleffa: {
		inherit: true,
		types: ["Fairy", "Cosmic"],
	},
	clefairy: {
		inherit: true,
		types: ["Fairy", "Cosmic"],
	},
	clefable: {
		inherit: true,
		types: ["Fairy", "Cosmic"],
	},
	elgyem: {
		inherit: true,
		types: ["Cosmic", "Psychic"],
	},
	beheeyem: {
		inherit: true,
		types: ["Cosmic", "Psychic"],
	},
	necrozma: {
		inherit: true,
		types: ["Cosmic"],
	},
};