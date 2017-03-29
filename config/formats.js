'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// SM Singles
	///////////////////////////////////////////////////////////////////
	{
		section: "SM Singles",
	}, {
		name: "[Gen 7] Random Battle",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable."],

		mod: 'gen7',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 7] Unrated Random Battle",

		mod: 'gen7',
		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 7] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3592140/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587177/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3590726/\">OU Viability Ranking</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause'],
		banlist: ['Uber', 'Power Construct', 'Shadow Tag'],
	}, {
		name: "[Gen 7] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587184/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591388/\">Ubers Viability Ranking</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
	}, {
		name: "[Gen 7] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591786/\">UU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3595093/\">UU Viability Ranking</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Power Construct', 'Mewnium Z', 'Baton Pass'],
	}, {
		name: "[Gen 7] RU (alpha)",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3587352/\">RU Metagame Discussion</a>"],

		mod: 'gen7',
		ruleset: ['[Gen 7] UU'],
		banlist: ['UU', 'BL2'],
	}, {
		name: "[Gen 7] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587196/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/sm/formats/lc/\">LC Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587565/\">LC Viability Ranking</a>",
		],

		mod: 'gen7',
		searchShow: false,
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Little Cup'],
		banlist: ['Cutiefly', 'Drifloon', 'Gligar', 'Gothita', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Yanma', 'Eevium Z', 'Dragon Rage', 'Sonic Boom'],
	}, {
		name: "[Gen 7] LC (suspect test)",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3597499/\">LC Suspect Discussion</a>"],

		mod: 'gen7',
		challengeShow: false,
		maxLevel: 5,
		ruleset: ['[Gen 7] LC'],
		banlist: [],
	}, {
		name: "[Gen 7] Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587441/\">Anything Goes</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591711/\">AG Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/ag/\">AG Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	}, {
		name: "[Gen 7] CAP",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587865/\">CAP Metagame Discussion</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Allow CAP'],
	}, {
		name: "[Gen 7] Battle Spot Singles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587473/\">Battle Spot Singles Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587201/\">Battle Spot Singles Viability Ranking</a>",
		],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	}, {
		name: "[Gen 7] Battle Spot Special 2",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3592974/\">Battle Spot Special</a>"],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased', 'Soul Dew', 'Battle Bond'],
		onValidateTeam: function (team) {
			let special = {
				'Mewtwo': 1,
				'Mew': 1,
				'Lugia': 1,
				'Ho-Oh': 1,
				'Celebi': 1,
				'Kyogre': 1,
				'Groudon': 1,
				'Rayquaza': 1,
				'Jirachi': 1,
				'Deoxys': 1,
				'Dialga': 1,
				'Palkia': 1,
				'Giratina': 1,
				'Phione': 1,
				'Manaphy': 1,
				'Darkrai': 1,
				'Shaymin': 1,
				'Arceus': 1,
				'Victini': 1,
				'Reshiram': 1,
				'Zekrom': 1,
				'Kyurem': 1,
				'Keldeo': 1,
				'Meloetta': 1,
				'Genesect': 1,
				'Xerneas': 1,
				'Yveltal': 1,
				'Zygarde': 1,
				'Diancie': 1,
				'Hoopa': 1,
				'Volcanion': 1,
				'Cosmog': 1,
				'Cosmoem': 1,
				'Solgaleo': 1,
				'Lunala': 1,
				'Necrozma': 1,
				'Magearna': 1
			};
			let hasSpecial = false;
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species);
				if (template.baseSpecies in special) {
					if (hasSpecial) return ["Only one of the following can be used per team: Mewtwo, Mew, Lugia, Ho-Oh, Celebi, Kyogre, Groudon, Rayquaza, Jirachi, Deoxys, Dialga, Palkia, Giratina, Phione, Manaphy, Darkrai, Shaymin, Arceus, Victini, Reshiram, Zekrom, Kyurem, Keldeo, Meloetta, Genesect, Xerneas, Yveltal, Zygarde, Diancie, Hoopa, Volcanion, Cosmog, Cosmoem, Solgaleo, Lunala, Necrozma, Magearna."];
					hasSpecial = true;
				}
			}
		},
	}, {
		name: "[Gen 7] Kanto X Alola Regional Rumble",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3597090/\">Kanto X Alola Regional Rumble</a>"],

		mod: "gen7",
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased', "Mewtwo", "Mew", "Zygarde", "Cosmog", "Cosmoem", "Solgaleo", "Lunala", "Necrozma", "Magearna", "Mega"],
		onValidateSet: function (set) {
			let alolaDex = {
				"Rowlet": 1,
				"Dartrix": 1,
				"Decidueye": 1,
				"Litten": 1,
				"Torracat": 1,
				"Incineroar": 1,
				"Popplio": 1,
				"Brionne": 1,
				"Primarina": 1,
				"Pikipek": 1,
				"Trumbeak": 1,
				"Toucannon": 1,
				"Yungoos": 1,
				"Gumshoos": 1,
				"Rattata-Alola": 1,
				"Raticate-Alola": 1,
				"Caterpie": 1,
				"Metapod": 1,
				"Butterfree": 1,
				"Ledyba": 1,
				"Ledian": 1,
				"Spinarak": 1,
				"Ariados": 1,
				"Pichu": 1,
				"Pikachu": 1,
				"Raichu-Alola": 1,
				"Grubbin": 1,
				"Charjabug": 1,
				"Vikavolt": 1,
				"Bonsly": 1,
				"Sudowoodo": 1,
				"Happiny": 1,
				"Chansey": 1,
				"Blissey": 1,
				"Munchlax": 1,
				"Snorlax": 1,
				"Slowpoke": 1,
				"Slowbro": 1,
				"Slowking": 1,
				"Wingull": 1,
				"Pelipper": 1,
				"Abra": 1,
				"Kadabra": 1,
				"Alakazam": 1,
				"Meowth-Alola": 1,
				"Persian-Alola": 1,
				"Magnemite": 1,
				"Magneton": 1,
				"Magnezone": 1,
				"Grimer-Alola": 1,
				"Muk-Alola": 1,
				"Growlithe": 1,
				"Arcanine": 1,
				"Drowzee": 1,
				"Hypno": 1,
				"Makuhita": 1,
				"Hariyama": 1,
				"Smeargle": 1,
				"Crabrawler": 1,
				"Crabominable": 1,
				"Gastly": 1,
				"Haunter": 1,
				"Gengar": 1,
				"Drifloon": 1,
				"Drifblim": 1,
				"Misdreavus": 1,
				"Mismagius": 1,
				"Zubat": 1,
				"Golbat": 1,
				"Crobat": 1,
				"Diglett-Alola": 1,
				"Dugtrio-Alola": 1,
				"Spearow": 1,
				"Fearow": 1,
				"Rufflet": 1,
				"Braviary": 1,
				"Vullaby": 1,
				"Mandibuzz": 1,
				"Mankey": 1,
				"Primeape": 1,
				"Delibird": 1,
				"Oricorio": 1,
				"Cutiefly": 1,
				"Ribombee": 1,
				"Petilil": 1,
				"Lilligant": 1,
				"Cottonee": 1,
				"Whimsicott": 1,
				"Psyduck": 1,
				"Golduck": 1,
				"Magikarp": 1,
				"Gyarados": 1,
				"Barboach": 1,
				"Whiscash": 1,
				"Machop": 1,
				"Machoke": 1,
				"Machamp": 1,
				"Roggenrola": 1,
				"Boldore": 1,
				"Gigalith": 1,
				"Carbink": 1,
				"Sableye": 1,
				"Rockruff": 1,
				"Lycanroc": 1,
				"Spinda": 1,
				"Tentacool": 1,
				"Tentacruel": 1,
				"Finneon": 1,
				"Lumineon": 1,
				"Wishiwashi": 1,
				"Luvdisc": 1,
				"Corsola": 1,
				"Mareanie": 1,
				"Toxapex": 1,
				"Shellder": 1,
				"Cloyster": 1,
				"Bagon": 1,
				"Shelgon": 1,
				"Salamence": 1,
				"Lillipup": 1,
				"Herdier": 1,
				"Stoutland": 1,
				"Eevee": 1,
				"Vaporeon": 1,
				"Jolteon": 1,
				"Flareon": 1,
				"Espeon": 1,
				"Umbreon": 1,
				"Leafeon": 1,
				"Glaceon": 1,
				"Sylveon": 1,
				"Mudbray": 1,
				"Mudsdale": 1,
				"Igglybuff": 1,
				"Jigglypuff": 1,
				"Wigglytuff": 1,
				"Tauros": 1,
				"Miltank": 1,
				"Surskit": 1,
				"Masquerain": 1,
				"Dewpider": 1,
				"Araquanid": 1,
				"Fomantis": 1,
				"Lurantis": 1,
				"Morelull": 1,
				"Shiinotic": 1,
				"Paras": 1,
				"Parasect": 1,
				"Poliwag": 1,
				"Poliwhirl": 1,
				"Poliwrath": 1,
				"Politoed": 1,
				"Goldeen": 1,
				"Seaking": 1,
				"Feebas": 1,
				"Milotic": 1,
				"Alomomola": 1,
				"Fletchling": 1,
				"Fletchinder": 1,
				"Talonflame": 1,
				"Salandit": 1,
				"Salazzle": 1,
				"Cubone": 1,
				"Marowak-Alola": 1,
				"Kangaskhan": 1,
				"Magby": 1,
				"Magmar": 1,
				"Magmortar": 1,
				"Stufful": 1,
				"Bewear": 1,
				"Bounsweet": 1,
				"Steenee": 1,
				"Tsareena": 1,
				"Comfey": 1,
				"Pinsir": 1,
				"Oranguru": 1,
				"Passimian": 1,
				"Goomy": 1,
				"Sliggoo": 1,
				"Goodra": 1,
				"Castform": 1,
				"Wimpod": 1,
				"Golisopod": 1,
				"Staryu": 1,
				"Starmie": 1,
				"Sandygast": 1,
				"Palossand": 1,
				"Cranidos": 1,
				"Rampardos": 1,
				"Shieldon": 1,
				"Bastiodon": 1,
				"Archen": 1,
				"Archeops": 1,
				"Tirtouga": 1,
				"Carracosta": 1,
				"Phantump": 1,
				"Trevenant": 1,
				"Nosepass": 1,
				"Probopass": 1,
				"Pyukumuku": 1,
				"Chinchou": 1,
				"Lanturn": 1,
				"Type: Null": 1,
				"Silvally": 1,
				"Zygarde": 1,
				"Trubbish": 1,
				"Garbodor": 1,
				"Skarmory": 1,
				"Ditto": 1,
				"Cleffa": 1,
				"Clefairy": 1,
				"Clefable": 1,
				"Minior": 1,
				"Beldum": 1,
				"Metang": 1,
				"Metagross": 1,
				"Porygon": 1,
				"Porygon2": 1,
				"Porygon-Z": 1,
				"Pancham": 1,
				"Pangoro": 1,
				"Komala": 1,
				"Torkoal": 1,
				"Turtonator": 1,
				"Togedemaru": 1,
				"Elekid": 1,
				"Electabuzz": 1,
				"Electivire": 1,
				"Geodude-Alola": 1,
				"Graveler-Alola": 1,
				"Golem-Alola": 1,
				"Sandile": 1,
				"Krokorok": 1,
				"Krookodile": 1,
				"Trapinch": 1,
				"Vibrava": 1,
				"Flygon": 1,
				"Gible": 1,
				"Gabite": 1,
				"Garchomp": 1,
				"Klefki": 1,
				"Mimikyu": 1,
				"Bruxish": 1,
				"Drampa": 1,
				"Absol": 1,
				"Snorunt": 1,
				"Glalie": 1,
				"Froslass": 1,
				"Sneasel": 1,
				"Weavile": 1,
				"Sandshrew-Alola": 1,
				"Sandslash-Alola": 1,
				"Vulpix-Alola": 1,
				"Ninetales-Alola": 1,
				"Vanillite": 1,
				"Vanillish": 1,
				"Vanilluxe": 1,
				"Snubbull": 1,
				"Granbull": 1,
				"Shellos": 1,
				"Gastrodon": 1,
				"Relicanth": 1,
				"Dhelmise": 1,
				"Carvanha": 1,
				"Sharpedo": 1,
				"Wailmer": 1,
				"Wailord": 1,
				"Lapras": 1,
				"Exeggcute": 1,
				"Exeggutor-Alola": 1,
				"Jangmo-o": 1,
				"Hakamo-o": 1,
				"Kommo-o": 1,
				"Emolga": 1,
				"Scyther": 1,
				"Scizor": 1,
				"Murkrow": 1,
				"Honchkrow": 1,
				"Riolu": 1,
				"Lucario": 1,
				"Dratini": 1,
				"Dragonair": 1,
				"Dragonite": 1,
				"Aerodactyl": 1,
				"Tapu Koko": 1,
				"Tapu Lele": 1,
				"Tapu Bulu": 1,
				"Tapu Fini": 1,
				"Cosmog": 1,
				"Cosmoem": 1,
				"Solgaleo": 1,
				"Lunala": 1,
				"Nihilego": 1,
				"Buzzwole": 1,
				"Pheromosa": 1,
				"Xurkitree": 1,
				"Celesteela": 1,
				"Kartana": 1,
				"Guzzlord": 1,
				"Necrozma": 1,
				"Magearna": 1,
				"Marshadow": 1,
			};
			let template = this.getTemplate(set.species || set.name);
			if (!(template.baseSpecies in alolaDex) && !(template.species in alolaDex) && template.num > 151) {
				return [template.baseSpecies + " is not in the Kanto or Alola Pokédex."];
			}
		},
	}, {
		name: "[Gen 7] Custom Game",

		mod: 'gen7',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// SM Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "SM Doubles",
	}, {
		name: "[Gen 7] Random Doubles Battle",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 7] Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3586596/\">Doubles OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3592903/\">Doubles OU Viability Ranking</a>",
		],

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia',
			'Lunala', 'Magearna', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Eevium Z', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
	}, {
		name: "[Gen 7] Doubles Ubers",

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Abilities Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Dark Void'],
	}, {
		name: "[Gen 7] VGC 2017",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3583926/\">VGC 2017 Discussion</a>"],

		mod: 'gen7',
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod', 'Alola Pokedex'],
		banlist: ['Illegal', 'Unreleased', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zygarde', 'Mega'],
		requirePlus: true,
	}, {
		name: "[Gen 7] Battle Spot Doubles",

		mod: 'gen7',
		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	}, {
		name: "[Gen 7] Doubles Custom Game",

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "OM of the Month",
		column: 2,
	}, {
		name: "[Gen 7] Full Potential",
		desc: [
			"A Pok&eacute;mon's highest stat, barring HP, is used when calculating the damage their attacks inflict.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3596777/\">Full Potential</a>",
		],

		mod: 'fullpotential',
		ruleset: ['[Gen 7] OU', 'Item Clause'],
		banlist: ['Dugtrio-Base', 'Pheromosa', 'Shuckle', 'Speed Boost', 'Unburden'],
	}, {
		name: "[Gen 7] Automagic",
		desc: [
			"Whenever an attack's secondary effect is triggered, any setup moves in that Pok&eacute;mon's moveset are run.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3594333/\">Automagic</a>",
		],

		mod: 'automagic',
		searchShow: false,
		ruleset: ['[Gen 7] OU'],
		banlist: ["King's Rock", 'Razor Fang'],
		onAfterSecondaryEffect: function (target, source, move) {
			let moreSetup = ['acupressure', 'bellydrum', 'stockpile'];
			if (!source.types.includes("Ghost")) moreSetup.push("curse");
			source.baseMoveset.forEach(curmove => {
				let move = this.getMove(curmove.id);
				if (moreSetup.includes(move.id) || (move.category === "Status" && move.boosts && move.target === "self")) {
					this.useMove(move, source);
				}
			});
		},
		onAfterMove: function (source, target, move) {
			if (move.id !== "genesissupernova") return;
			source.baseMoveset.forEach(curmove => {
				let move = this.getMove(curmove.id);
				if ((move.id === 'bellydrum' || (move.category === "Status" && move.boosts && move.target === "self")) && this.terrain === "psychicterrain") { // Confirm that it successfully set Psychic Terrain
					this.useMove(move, source);
				}
			});
		},
	}, {
		section: "Other Metagames",
		column: 2,
	}, {
		name: "[Gen 7] Balanced Hackmons",
		desc: [
			"Anything that can be hacked in-game and is usable in local battles is allowed.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587475/\">Balanced Hackmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3588586/\">BH Suspects and Bans Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/bh/\">BH Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Arena Trap', 'Huge Power', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Water Bubble', 'Wonder Guard', 'Chatter', 'Comatose + Sleep Talk'],
	}, {
		name: "[Gen 7] 1v1",
		desc: [
			"Bring three Pok&eacute;mon to Team Preview and choose one to battle.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587523/\">1v1</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3592842/\">1v1 Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/1v1/\">1v1 Analyses</a>",
		],

		mod: 'gen7',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: [
			'Illegal', 'Unreleased', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Perish Song', 'Focus Sash', 'Kangaskhanite', 'Salamencite', 'Chansey + Charm + Seismic Toss',
		],
	}, {
		name: "[Gen 7] Monotype",
		desc: [
			"All the Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587204/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3589809/\">Monotype Viability Ranking</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Groudon', 'Ho-Oh', 'Hoopa-Unbound', 'Kartana', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Tapu Lele', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde',
			'Battle Bond', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Salamencite', 'Smooth Rock', 'Terrain Extender', 'Baton Pass',
		],
	}, {
		name: "[Gen 7] Mix and Mega (suspect test)",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587740/\">Mix and Mega</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591580/\">Mix and Mega Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/mix_and_mega/\">Mix and Mega Analyses</a>",
		],

		mod: 'mixandmega',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Mega Rayquaza Clause', 'Team Preview'],
		banlist: ['Baton Pass'],
		onValidateTeam: function (team) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (!(item in itemTable)) {
					itemTable[item] = 1;
				}
				else if (itemTable[item] < 2) {
					itemTable[item]++;
				}
				else {
					if (item.megaStone) return ["You are limited to two of each Mega Stone.", "(You have more than two " + this.getItem(item).name + ")"];
					if (item.id === 'blueorb' || item.id === 'redorb') return ["You are limited to two of each Primal Orb.", "(You have more than two " + this.getItem(item).name + ")"];
				}
			}
		},
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			let uberStones = ['beedrillite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
			if (template.tier === 'Uber' || set.ability === 'Power Construct' || uberStones.includes(item.id)) return ["" + template.species + " is not allowed to hold " + item.name + "."];
		},
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.getTemplate(pokemon.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	}, {
		name: "[Gen 7] Almost Any Ability",
		desc: [
			"Pok&eacute;mon can use any ability, barring the few that are banned.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587901/\">Almost Any Ability</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3595753/\">AAA Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/aaa/\">AAA Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Ability Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore Illegal Abilities',
			'Aegislash', 'Arceus', 'Archeops', 'Blaziken', 'Darkrai', 'Deoxys', 'Dialga', 'Dragonite', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White',
			'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Pheromosa', 'Rayquaza', 'Regigigas', 'Reshiram', 'Shaymin-Sky', 'Shedinja', 'Slaking', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Shadow Tag', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite',
		],
		onValidateSet: function (set) {
			let bannedAbilities = {
				'Arena Trap': 1,
				'Comatose': 1,
				'Contrary': 1,
				'Fluffy': 1,
				'Fur Coat': 1,
				'Huge Power': 1,
				'Illusion': 1,
				'Imposter': 1,
				'Innards Out': 1,
				'Parental Bond': 1,
				'Protean': 1,
				'Pure Power': 1,
				'Simple': 1,
				'Speed Boost': 1,
				'Stakeout': 1,
				'Water Bubble': 1,
				'Wonder Guard': 1
			};
			if (set.ability in bannedAbilities) {
				let template = this.getTemplate(set.species || set.name);
				let legalAbility = false;
				for (let i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pokémon that do not naturally have it.'];
			}
		},
	}, {
		name: "[Gen 7] Sketchmons",
		desc: [
			"Pok&eacute;mon gain access to one Sketched move.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587743/\">Sketchmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/sketchmons/\">Sketchmons Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause'],
		banlist: ['Allow One Sketch',
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Dialga', 'Genesect', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Landorus-Base', 'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Shadow Tag', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite',
			'Arena Trap + Dark Void', 'Arena Trap + Grass Whistle', 'Arena Trap + Hypnosis', 'Arena Trap + Relic Song', 'Arena Trap + Sing', 'Arena Trap + Sleep Powder',
		],
		noSketch: ['Belly Drum', 'Celebrate', 'Conversion', "Forest's Curse", 'Geomancy', 'Happy Hour', 'Hold Hands', 'Lovely Kiss', 'Purify', 'Shell Smash', 'Shift Gear', 'Sketch', 'Spore', 'Trick-or-Treat'],
		onValidateTeam: function (team) {
			let sketchedMoves = {};
			for (let i = 0; i < team.length; i++) {
				let move = team[i].sketchmonsMove;
				if (!move) continue;
				if (move in sketchedMoves) {
					return ["You are limited to sketching one of each move by Move Clause.", "(You have sketched " + this.getMove(move).name + " more than once)"];
				}
				sketchedMoves[move] = (team[i].name || team[i].species);
			}
		},
	}, {
		name: "[Gen 7] Hidden Type",
		desc: [
			"Pok&eacute;mon have an added type determined by their IVs. Same as the Hidden Power type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591194/\">Hidden Type</a>",
		],

		searchShow: false,
		ruleset: ['[Gen 7] OU'],
		onModifyTemplate: function (template, pokemon) {
			if (template.types.includes(pokemon.hpType)) return;
			return Object.assign({
				addedType: pokemon.hpType
			}, template);
		},
	}, {
		name: "[Gen 7] BH Doubles",
		desc: [
			"Anything that can be hacked in-game and is usable in local battles is allowed.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587475/\">Balanced Hackmons</a>",
		],

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['[Gen 7] Balanced Hackmons'],
		banlist: [],
	}, {
		name: "OU Theorymon",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3559611/\">OU Theorymon</a>"],

		mod: 'theorymon',
		searchShow: false,
		ruleset: ['OU'],
	}, {
		name: "Gen-NEXT OU",

		mod: 'gennext',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber'],
	},

	// Randomized Metas
	///////////////////////////////////////////////////////////////////

	{
		section: "Randomized Metas",
		column: 2,
	}, {
		name: "Battle Factory",

		team: 'randomFactory',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
	}, {
		name: "[Gen 7] Challenge Cup 1v1",

		mod: 'gen7',
		team: 'randomCC',
		teamLength: {
			battle: 1,
		},
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
	}, {
		name: "[Gen 7] Monotype Random Battle",

		mod: 'gen7',
		team: 'random',
		searchShow: false,
		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 7] Hackmons Cup",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item."],

		mod: 'gen7',
		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 7] Doubles Hackmons Cup",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},

	// RoA Spotlight
	///////////////////////////////////////////////////////////////////

	{
		section: "RoA Spotlight",
		column: 3,
	}, {
		name: "[Gen 4] Anything Goes",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},

	// ORAS Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "ORAS Singles",
		column: 3,
	}, {
		name: "OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3573990/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3571990/\">OU Viability Ranking</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew'],
	}, {
		name: "Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3522911/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535106/\">Ubers Viability Ranking</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
	}, {
		name: "UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3582473/\">np: UU Stage 7.3</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/uu/\">UU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3555277/\">UU Viability Ranking</a>",
		],

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Drought', 'Baton Pass'],
	}, {
		name: "RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3583022/\">np: RU Stage 19</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ru/\">RU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558546/\">RU Viability Ranking</a>",
		],

		ruleset: ['UU'],
		banlist: ['UU', 'BL2'],
	}, {
		name: "NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3576747/\">np: NU Stage 15</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/nu/\">NU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3555650/\">NU Viability Ranking</a>",
		],

		ruleset: ['RU'],
		banlist: ['RU', 'BL3'],
	}, {
		name: "PU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3586575/\">np: PU Stage 10</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528743/\">PU Viability Ranking</a>",
		],

		ruleset: ['NU'],
		banlist: ['NU', 'BL4', 'Chatter'],
		unbanlist: ['Baton Pass'],
	}, {
		name: "LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505710/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/formats/lc/\">LC Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547566/\">LC Viability Ranking</a>",
		],

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger'],
	}, {
		name: "Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3548945/\">Anything Goes Resources</a>",
		],

		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	}, {
		name: "CAP",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3537407/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545628/\">CAP Viability Ranking</a>",
		],

		searchShow: false,
		ruleset: ['OU'],
		banlist: ['Allow CAP'],
	}, {
		name: "Battle Spot Singles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3527960/\">Battle Spot Singles Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3554616/\">Battle Spot Singles Viability Ranking</a>",
		],

		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	}, {
		name: "Inverse Battle",

		searchShow: false,
		ruleset: ['Pokemon', 'Inverse Mod', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	}, {
		name: "[Gen 6] Random Battle",

		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "Custom Game",

		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// ORAS Doubles/Triples
	///////////////////////////////////////////////////////////////////

	{
		section: "ORAS Doubles/Triples",
	}, {
		name: "Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3580680/\">np: Doubles OU Stage 5</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3498688/\">Doubles OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535930/\">Doubles OU Viability Ranking</a>",
		],

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Swagger Clause', 'Team Preview'],
		banlist: [
			'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Salamencite', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom', 'Soul Dew',
			'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
	}, {
		name: "Doubles Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542746/\">Doubles Ubers</a>"],

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Abilities Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Dark Void'],
	}, {
		name: "Doubles UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542755/\">Doubles UU</a>"],

		gameType: 'doubles',
		ruleset: ['Doubles OU'],
		banlist: [
			'Aegislash', 'Amoonguss', 'Arcanine', 'Azumarill', 'Bisharp', 'Breloom', 'Charizard-Mega-Y', 'Charizardite Y',
			'Conkeldurr', 'Cresselia', 'Diancie-Mega', 'Diancite', 'Ferrothorn', 'Garchomp', 'Gardevoir-Mega', 'Gardevoirite',
			'Gastrodon', 'Gengar', 'Greninja', 'Heatran', 'Hitmontop', 'Hoopa-Unbound', 'Hydreigon', 'Jirachi',
			'Kangaskhan-Mega', 'Kangaskhanite', 'Keldeo', 'Kyurem-Black', 'Landorus-Therian', 'Latios', 'Ludicolo', 'Milotic',
			'Politoed', 'Raichu', 'Rotom-Wash', 'Scizor', 'Scrafty', 'Shaymin-Sky', 'Suicune', 'Sylveon', 'Talonflame',
			'Terrakion', 'Thundurus', 'Togekiss', 'Tyranitar', 'Venusaur', 'Volcanion', 'Weavile', 'Whimsicott', 'Zapdos',
		],
	}, {
		name: "VGC 2016",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558332/\">VGC 2016 Rules</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3580592/\">VGC 2016 Viability Ranking</a>",
		],

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: [
			'Illegal', 'Unreleased', 'Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Phione', 'Manaphy', 'Darkrai',
			'Shaymin', 'Shaymin-Sky', 'Arceus', 'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Diancie', 'Hoopa', 'Hoopa-Unbound', 'Volcanion', 'Soul Dew',
		],
		requirePentagon: true,
		onValidateTeam: function (team) {
			const legends = {
				'Mewtwo': 1,
				'Lugia': 1,
				'Ho-Oh': 1,
				'Kyogre': 1,
				'Groudon': 1,
				'Rayquaza': 1,
				'Dialga': 1,
				'Palkia': 1,
				'Giratina': 1,
				'Reshiram': 1,
				'Zekrom': 1,
				'Kyurem': 1,
				'Xerneas': 1,
				'Yveltal': 1,
				'Zygarde': 1
			};
			let n = 0;
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species).baseSpecies;
				if (template in legends) n++;
				if (n > 2) return ["You can only use up to two legendary Pokémon."];
			}
		},
	}, {
		name: "Battle Spot Doubles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560820/\">Battle Spot Doubles Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560824/\">Battle Spot Doubles Viability Ranking</a>",
		],

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	}, {
		name: "[Gen 6] Random Doubles Battle",

		gameType: 'doubles',
		team: 'random',
		searchShow: false,
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "Doubles Custom Game",

		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	}, {
		name: "Battle Spot Triples",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533914/\">Battle Spot Triples Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3549201/\">Battle Spot Triples Viability Ranking</a>",
		],

		gameType: 'triples',
		maxForcedLevel: 50,
		teamLength: {
			validate: [6, 6],
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	}, {
		name: "Triples Custom Game",

		gameType: 'triples',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// BW2 Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "BW2 Singles",
		column: 4,
	}, {
		name: "[Gen 5] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
	}, {
		name: "[Gen 5] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550881/\">BW2 Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446463/\">BW2 Ubers Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
	}, {
		name: "[Gen 5] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3474024/\">BW2 UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning'],
	}, {
		name: "[Gen 5] RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3473124/\">BW2 RU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning'],
	}, {
		name: "[Gen 5] NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3484121/\">BW2 NU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist'],
	}, {
		name: "[Gen 5] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3485860/\">BW2 LC Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom', 'LC Uber', 'Gligar', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela'],
	}, {
		name: "[Gen 5] GBU Singles",

		mod: 'gen5',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop'],
	}, {
		name: "[Gen 5] Random Battle",

		mod: 'gen5',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 5] Custom Game",

		mod: 'gen5',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// BW2 Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: 'BW2 Doubles',
		column: 4,
	}, {
		name: "[Gen 5] Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533424/\">BW2 Doubles Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533421/\">BW2 Doubles Viability Ranking</a>",
		],

		mod: 'gen5',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: [
			'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Jirachi',
			'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Zekrom', 'Soul Dew', 'Dark Void', 'Sky Drop',
		],
	}, {
		name: "[Gen 5] GBU Doubles",

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop'],
	}, {
		name: "[Gen 5] Doubles Custom Game",

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Generations",
		column: 4,
	}, {
		name: "[Gen 4] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
		banlist: ['Uber'],
	}, {
		name: "[Gen 4] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505128/\">DPP Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446464/\">DPP Ubers Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus'],
	}, {
		name: "[Gen 4] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503638/\">DPP UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL'],
	}, {
		name: "[Gen 4] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/dp/articles/little_cup_guide\">DPP LC Guide</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup'],
		banlist: ['LC Uber', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma', 'Berry Juice', 'DeepSeaTooth', 'Dragon Rage', 'Sonic Boom'],
	}, {
		name: "[Gen 4] Custom Game",

		mod: 'gen4',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	}, {
		name: "[Gen 4] Doubles Custom Game",

		mod: 'gen4',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	}, {
		name: "[Gen 3] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain'],
	}, {
		name: "[Gen 3] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536426/\">ADV Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446466/\">ADV Ubers Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Wobbuffet + Leftovers'],
	}, {
		name: "[Gen 3] Custom Game",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 2] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	}, {
		name: "[Gen 2] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3507552/\">GSC Ubers Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'gen2',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
	}, {
		name: "[Gen 2] Random Battle",

		mod: 'gen2',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	}, {
		name: "[Gen 2] Custom Game",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 1] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	}, {
		name: "[Gen 1] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3541329/\">RBY Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
	}, {
		name: "[Gen 1] OU (tradeback)",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Allow Tradeback', 'Uber', 'Unreleased', 'Illegal',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	}, {
		name: "[Gen 1] Random Battle",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 1] Challenge Cup",

		mod: 'gen1',
		team: 'randomCC',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 1] Stadium",

		mod: 'stadium',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	}, {
		name: "[Gen 1] Custom Game",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	}, {


		/* * * * * * * * * * * * * * * * * *
		 * EXILED METAS:                   *
		 * CREDIT TO:                      *
		 * Insist (main coder)   *
		 * Volco (bug fixes occassionally) *
		 * * * * * * * * * * * * * * * * * */

		name: "[Gen 7] NFE",
		section: "Exiled's Custom Gamemodes",
		ruleset: ['NFE', 'Team Preview', 'Pokemon', 'Species Clause', 'Swagger Clause', 'Standard', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Baton Pass Clause', 'OHKO Clause'],
		desc: [
			"NFE stands for Not Fully Evolved.",
		],
		column: 5,
	}, {
		name: "[Gen 7] Exiled OU",
		section: "Exiled's Custom Gamemodes",
		ruleset: ['Team Preview', 'Exact HP Mod', 'Cancel Mod', 'Mega Rayquaza Clause', 'Species Clause'],
		banlist: ['Allow CAP', 'Clefable + Unaware + Minimize', 'Rayquaza', 'Sheer Cold', 'Double Team', 'Mega-Mawile + Sucker Punch', 'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fairy', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Steel', 'Arceus-Water', 'Blaziken + Speed Boost', 'Shadow Tag', 'Greninja + Protean', 'Blazikenite', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Genesect-Douse', 'Genesect-Chill', 'Genesect-Shock', 'Genesect-Burn', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Groudon-Primal', 'Ho-Oh', 'Kyogre', 'Kyogre-Primal', 'Kangaskanite', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Mewtwonite X', 'Mewtwonite Y', 'Palkia', 'Salamencite', 'Xerneas', 'Yveltal', 'Zekrom'],
		onBegin: function () {
			this.add('message', "Information about this tier can be found in the Exiled OU room.");
		},
		desc: [
			"Ever asked yourself why are these things Uber, and now that they're Uber, they are completely useless? Well, go ahead welcome then back. They are for sure in this metagame.",
			"Credit to: Gyaratoast/Kairak (inspired by), Insist (coded it), and Vivid is a God (extra ideas)",
		],
	}, {
		name: "[Gen 7] Exiled UU",
		section: "Exiled's Custom Gamemodes",
		ruleset: ['OU', 'Sleep Clause Mod', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview', 'Pokemon', 'Standard', 'Cancel Mod', 'Species Clause', 'OHKO Clause'],
		banlist: ['Clefable', 'Hippowdon', 'Scizor', 'Scizorite', 'Chansey', 'Gliscor', 'Tornadus-Therian', 'Landorus-Therian', 'Breloom', 'Diancite',
			'Loppunite', 'Charizardite-X', 'Charizardite-Y', 'Bisharp', 'Azumarill', 'Dragonite', 'Excadrill', 'Ferrothorn', 'Garchomp', 'Gardevoirite',
			'Heatran', 'Heracronite', 'Jirachi', 'Keldeo', 'Keldeo-Resolute', 'Klefki', 'Kyurem-Black', 'Latias', 'Latiasite', 'Latios', 'Latiosite', 'Magnezone', 'Manaphy',
			'Manectricite', 'Medichamite', 'Metagrossite', 'Pinsirite', 'Raikou', 'Rotom-Wash', 'Sablenite', 'Serperior', 'Skarmory', 'Slowbro', 'Starmie',
			'Talonflame', 'Tangrowth', 'Thundurus', 'Venusaurite', 'Volcanion', 'Weavile', 'Alakazite', 'Diggersby', 'Galladite', 'Gyaradosite', 'Pidgeotite',
			'Thundurus-Therian', 'Togekiss', 'Garchompite', 'Volcarona', 'Slowbronite'
		],
		desc: [
			"Credit to: Kairak (originally planned by), Insist (took over the project & coded it).",
			"To be honest, just a few things got unbanned.",
			"&bullet; <a href=\"http://www.pastebin.com/8zG58J1z\">Exiled UU Information</a>",
		],
	}, {
		name: "[Gen 7] Exiled RU",
		section: "Exiled's Custom Gamemodes",
		ruleset: ['UU', 'Sleep Clause Mod', 'Swagger Clause', 'Team Preview', 'Pokemon', 'Standard', 'Species Clause'],
		banlist: ['Aggronite', 'Absolite', 'Aerodactylite', 'Ampharosite', 'Arcanine', 'Azelf', 'Beedrillite', 'Blastoisinite', 'Blissey', 'Celebi',
			'Chandelure', 'Chesnaught', 'Cloyster', 'Conkeldurr', 'Cresselia', 'Crobat', 'Darmanitan', 'Donphan', 'Doublade', 'Empoleon', 'Entei', 'Espeon',
			'Feraligatr', 'Florges', 'Forretress', 'Galvantula', 'Gardevoir', 'Gligar', 'Goodra', 'Gyarados', 'Haxorus', 'Heracross', 'Hydreigon', 'Infernape',
			'Krookodile', 'Lucario', 'Machamp', 'Mamoswine', 'Mandibuzz', 'Metagross', 'Mienshao', 'Milotic', 'Nidoking', 'Nidoqueen', 'Porygon2', 'Porygon-Z',
			'Reunicles', 'Roserade', 'Rotom-Heat', 'Sableye', 'Sceptilite', 'Sharpedonite', 'Snorlax', 'Suicune', 'Swampert', 'Swampertite', 'Sylveon',
			'Tornadus', 'Toxicroak', 'Umbreon', 'Vaporeon', 'Dragalge', 'Durant', 'Froslass', 'Houndoominite', 'Kyurem', 'Shaymin', 'Shuckle',
			'Slurpuff', 'Tyrantrum'
		],
	}, {
		name: "[Gen 7] Exiled Monotype",
		section: "Exiled's Custom Gamemodes",
		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview', 'Species Clause'],
		banlist: ['Arceus', 'Blazikenite', 'Dark Void', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Geomancy', 'Yveltal', 'Zekrom',
			'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Smooth Rock', 'Soul Dew', 'Allow CAP'
		],
		desc: [
			"Wish we could turn back time.... time... to the good ole days..... When Mega-Sableye wasn't banned in Monotype..... Oh wait, we did?!? Yes, we did :P",
			"Credit to: marine bu/Life Orb Raichu (inspired by), and Insist (coded it)."
		],
	}, {
		name: "[Gen 7] Clash of the Regions",
		section: "Exiled's Custom Gamemodes",
		mod: 'clashoftheregions',
		ruleset: ['Sleep Clause Mod', 'Cancel Mod', 'Exact HP Mod', 'Baton Pass Clause', 'Pokemon', 'Standard'],
		desc: [
			"Credit to: Insist (main coder and inspired by), EmilyTheCutie (side coder and set adviser), Alpha Hawk (extra ideas)",
			"&bullet; <a href=\"http://squadps.boards.net/post/51/thread\">Clash of the Regions Information</a>",
		],
		team: 'randomSeasonalMelee',
	}, {
		name: "[Gen 7] SMASHING METAGAME",
		section: "Exiled's Custom Gamemodes",
		mod: 'smashingmetagame',
		ruleset: ['Cancel Mod', 'Exact HP Mod', 'Team Preview'],
		desc: [
			"Credit to: Insist (coded and inspired by), and Kairak (gave ideas for custom moves names).",
			"Made for Gyaratoast, my (Insist) best friend.",
			"&bullet; <a href=\"http://pastebin.com/cYa8KBss\">How to Submit a Pokemon</a>",
		],
		team: 'randomSeasonalMelee',
	}, {
		name: "[Gen 7] Ash's Pokemon",
		section: "Exiled's Custom Gamemodes",
		mod: 'ashspokemon',
		ruleset: ['Exact HP Mod', 'Team Preview', 'Cancel Mod', 'Sleep Clause Mod'],
		team: 'randomSeasonalMelee',
	}, {
		name: "[Gen 7] OP Metagame",
		section: "Exiled's Custom Gamemodes",
		mod: "opmetagame",
		ruleset: ['Exact HP Mod', 'Cancel Mod'],
		team: 'randomSeasonalMelee',
		desc: [
			"Inspired by BAMD, coded and extra ideas from Insist.",
			"&bullet; <a href=\"http://pastebin.com/cYa8KBss\">How to Submit a Pokemon</a>",
		],
		onSwitchIn: function (pokemon) {
			var name = toId(pokemon.name);
			var sentences = [];
			var sentence = '';

			if (name === 'reddragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Dragon');
				pokemon.types = ["Fire", "Dragon"];
			}
			if (name === 'rotomfan' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Psychic');
				pokemon.types = ["Electric", "Psychic"];
			}
			if (name === 'sans' && !pokemon.illusion) {
				this.boost({
					spe: 6,
					evasion: 6,
					spa: -6,
					atk: -6,
					def: -6,
					spd: -6
				});
			}
			if (name === 'illuminati' && !pokemon.illusion) {
				this.boost({
					spe: 6
				});
			}
			if (name === 'michael' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Dark');
				pokemon.types = ["Poison", "Dark"];
			}
			if (name === 'castform' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Rock/Steel');
				pokemon.types = ["Ground", "Rock", "Steel"];
			}
			if (name === 'haxrus' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Steel');
				pokemon.types = ["Dragon", "Steel"];
			}
			if (name === 'solgaleo' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Steel/Psychic/Fire');
				pokemon.types = ["Steel", "Psychic", "Fire"];
			}
		},
	}, {
		name: "[Gen 7] Exiled Super Staff Bros.",
		section: "Exiled's Custom Gamemodes",
		mod: 'essb',
		team: 'randomSeasonalMelee',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		desc: [
			"Credit to: Insist (head coder).",
			"Thanks to all the auth whom cooperated in this process of making this.",
			"&bullet; <a href=\"http://pastebin.com/cYa8KBss\">How to Submit a Pokemon</a>",
		],
		onBegin: function () {
			// This seasonal gets a bit from Super Smash Bros., that's where the initial message comes from.
			this.add('message', "GET READY FOR THE NEXT BATTLE!");
			this.add('message', "For more information on a user's staffmon, use /ssb (authed user's name)!");
			// This variable saves the status of a spammy conversation to be played, so it's only played once.
			this.convoPlayed = false;
		},
		// Edgy switch-in sentences go here.
		// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
		onSwitchIn: function (pokemon) {
			var name = toId(pokemon.name);
			var sentences = [];
			var sentence = '';

			//Switch-in Quotes
			if (name === 'insist') {
				this.add('c|~Insist|__**^^Let\'s get roooooiiiiiiight into le noose!^^**__');
			}
			if (name === 'speckeldorft') {
				this.add('c|%Speckeldorft|**YYYEEAAHHHHHHHH BBBBBBBBBBBBBBBBOOOOOOOOOOOOOOOOOOOOIIIIIIIIIIIIIIIIIIIIIIIIII**');
			}
			if (name === 'abstarfox') {
				this.add('c|+AB Starfox|Hello, just here to clean up');
			}
			if (name === 'hoeenhero') {
				this.add('c| HoeenHero|Do I have to? I\'m in the middle of programming.');
			}

			// Add here special typings, done for flavor mainly. (and stat boosts)
			if (name === 'crystalludicolo' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Fire');
				pokemon.types = ["Grass", "Fire"];
			}
			if (name === 'vividisagod' && !pokemon.illusion) {
				this.boost({
					spe: 1
				});
			}
			if (name === 'volco' && !pokemon.illusion) {
				this.boost({
					spe: 1
				});
			}
			if (name === 'wobbleleez' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Fairy');
				pokemon.types = ["Psychic", "Fairy"];
				this.boost({
					def: 1,
					spd: 1
				});
			}
		},
		//Switch-out Phrase
		onSwitchOut: function (pokemon) {
			var name = toId(pokemon.name);
			var sentences = [];
			var sentence = '';
			//switchout
			if (name === 'insist') {
				this.add('c|~Insist|Errrr I\'ll see you later, just sayin\' this is me just uhhh running away from my problems.... I errr just need a walk! Geez, why are you on to me on everything I do ughhhhhhhhhhh you\'re not my mom!');
			}
			if (name === 'speckeldorft') {
				this.add('c|+Speckeldorft|fuck you');
			}
			if (name === 'abstarfox') {
				this.add('c|+AB Starfox|Time for me to get a life');
			}
			if (name === 'hoeenhero') {
				this.add('c| HoeenHero|I can\'t battle now, I\'m too busy.');
			}
		},
		// Add here salty tears, that is, custom faint phrases.
		onFaint: function (pokemon) {
			var name = toId(pokemon.name);
			var sentences = [];
			var sentence = '';
			//le faint
			if (name === 'insist') {
				this.add('c|~Insist|Death.... what a cool concept.');
				this.add('c|~Insist|Wait wot!');
				this.add('c|~Insist|>~Insist fainted.');
				this.add('c|~Insist|That\'s obviously hax m8!');
				this.add('c|~Insist|T-T-That\'s IMPOSSIBRU!');
				this.add('c|~Insist|~~__**^^walks off......^^**__~~')
			}
			if (name === 'speckeldorft') {
				this.add('c| Speckeldorft|__I was a ded meme.......__');
			}
			if (name === 'abstarfox') {
				this.add('c| AB Starfox|Once again I get lucked out smh');
			}
			if (name === 'hoeenhero') {
				this.add('c| HoeenHero|Hey! Thats more hax than I get to use >:(');
			}
		},
	}, {
		name: "[Gen 7] Metronome Battles",
		section: "Exiled's Custom Gamemodes",
		mod: "metronome",
		ruleset: ["HP Percentage Mod", "Cancel Mod"],
		team: "randomSeasonalMelee",
		desc: [
			"This tier was highly asked for, so we made it.",
			"Mainly credit goes to: Kairak & Insist",
			"We removed the possibility of Volt Switch/U-Turn/any thing that causes switches, from occuring",
			"Also we made things like V-Create, Dragon Ascent, Diamond Storm possible to be used via Metronome.",
			"&bullet; <a href=\"http://pastebin.com/cYa8KBss\">How to Submit a Pokemon</a>",
		],
	}, {
		name: "[Gen 7] Holiday Metagame",
		section: "Exiled's Custom Gamemodes",
		mod: "holiday",
		ruleset: ["HP Percentage Mod", "Cancel Mod", "Sleep Clause Mod"],
		team: "randomSeasonalMelee",
		desc: [
			"Idea, concept, coded, and created by Insist",
			"Also, Astral Wobz helped with the ideas for more holidays :D",
			"&bullet; <a href=\"http://pastebin.com/cYa8KBss\">How to Submit a Pokemon</a>",
		],
	}, {
		name: "[Gen 7] Exiled Perfected Pokemon",
		section: "Exiled's Custom Gamemodes",
		mod: "exiledmeta",
		ruleset: ["HP Percentage Mod", "Cancel Mod", "Sleep Clause Mod", "Team Preview"],
		banlist: ['Allow CAP'],
		desc: [
			"Exiled Perfected Pokemon is a metagame created by Insist and Back At My Day.",
			"Basically, we nerf, and buff Pokemon's BSTs, moves, abilities, and items.",
			"For more information on this tier, read the below document.",
			"&bullet; <a href=\"https://docs.google.com/document/d/1Ac9nz-1JWXAF52Ekv2BICPe5s3qLXK2HK5yxnsqc4Ho/\">Information on Exiled Perfected Pokemon</a>",
		],
	}, {
		name: "[Gen 7] CAP Super Staff Bros.",
		section: "Exiled's Custom Gamemodes",
		mod: 'cssb',
		team: 'randomSeasonalMelee',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		desc: [
			"Credit to: Insist (head coder).",
			"Thanks to all the auth whom cooperated in this process of making this.",
		],
		onBegin: function () {
			// This seasonal gets a bit from Super Smash Bros., that's where the initial message comes from.
			this.add('message', "GET READY FOR THE NEXT BATTLE!");
			this.add('message', "For more information on a user's staffmon, use /essb (authed user's name)!");
			// This variable saves the status of a spammy conversation to be played, so it's only played once.
			this.convoPlayed = false;
		},
		// Edgy switch-in sentences go here.
		// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
		onSwitchIn: function (pokemon) {
			var name = toId(pokemon.name);
			var sentences = [];
			var sentence = '';

			//Switch-in Quotes
			if (name === 'exclaimer') {
				this.add('c|%Exclaimer|I sexually identify as an Exclaimer.');
			}
			if (name === 'deckknight') {
				this.add('c|@Deck Knight|Nice Project you got there, mind if I look around?');
			}
			if (name === 'animusmajulous') {
				this.add('c|@Animus Majulous|Alo!');
			}
			if (name === 'cbrevan') {
				this.add('c|@cbrevan|Hello children.');
			}
			if (name === 'healndeal') {
				this.add('c|#HealNDeal|I\'m all alone.');
			}
			if (name === 'epicumbreon29') {
				this.add('c|%EpicUmbreon29|I really like your team!');
			}
			if (name === 'quanyalis') {
				this.add('c|+Quanyalis|Hi all! I hope you\'re having fun this match! :)');
			}
			if (name === 'snobalt') {
				this.add('c|+Snobalt|By the power vested in me from the great Lord Tomohawk...');
			}
			if (name === 'giantwhirlpool') {
				this.add('c|+GiantWhirlpool|Hi.');
			}
			if (name === 'bionicpuppy') {
				this.add('c|+Bionic Puppy|Who did you call guy? I\'ll have you know I am a young strong individual who is a flexible and malleable and I don\'t care about you I am a fluid gender-equal person with extra cream frappuccino');
			}
			if (name === 'insist') {
				this.add('c|Insist|MLG Snail is here m8!');
				this.add('c|Insist|btw who tf says snails are slow :^)');
			}

			// Add here special typings, done for flavor mainly.
			if (name === 'vulpixmayhem' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Fairy');
				pokemon.types = ["Fire", "Fairy"];
			}
		},
		//Switch-out Phrase
		onSwitchOut: function (pokemon) {
			var name = toId(pokemon.name);
			var sentences = [];
			var sentence = '';

			if (name === 'exclaimer') {
				this.add('c|%Exclaimer|/me has been kicked from CAP Project.');
			}
			if (name === 'deckknight') {
				this.add('c|@Deck Knight|I\'m done with this section... for now.');
			}
			if (name === 'animusmajulous') {
				this.add('c|@Animus Majulous|I\'ll be back for more.');
			}
			if (name === 'cbrevan') {
				this.add('c|@cbrevan|be back in a few.');
			}
			if (name === 'healndeal') {
				this.add('c|#HealNDeal|I need to go buy some milk, will be back in three hours.');
			}
			if (name === 'giantwhirlpool') {
				this.add('c|+GiantWhirlpool|I\'ll be back eventually');
			}
			if (name === 'epicumbreon29') {
				this.add('c|%EpicUmbreon29|Sorry about that...');
			}
			if (name === 'insist') {
				this.add('c|Insist|brb I\'m gonna get some help.');
			}
		},
		// Add here salty tears, that is, custom faint phrases.
		onFaint: function (pokemon) {
			var name = toId(pokemon.name);
			var sentences = [];
			var sentence = '';

			if (name === 'exclaimer') {
				this.add('c|%Exclaimer|If you can\'t accept me, you\'re a TRphobe and need to check your privileges.');
			}
			if (name === 'deckknight') {
				this.add('c|@Deck Knight|I\'ll be back next CAP! Just you wait and see! Someday I\'ll make Administrator!');
			}
			if (name === 'animusmajulous') {
				this.add('c|@Animus Majulous|My Stat spread is Godlike!');
			}
			if (name === 'cbrevan') {
				this.add('c|@cbrevan|cya folks.');
			}
			if (name === 'healndeal') {
				this.add('c|#HealNDeal|I was just a duck and now I\'m outta luck.');
			}
			if (name === 'quanyalis') {
				this.add('c|+Quanyalis|Sorry. D:');
			}
			if (name === 'bionicpuppy') {
				this.add('c|+Bionic Puppy|GGGGGGGGGGGGGgggggggggggggGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG**GGGGGGgggggggggggggggggggggggggggggggGGGGGGGG**GGGGGG');
			}
			if (name === 'snobalt') {
				this.add('c|+Snobalt|Blasphemy!');
			}
			if (name === 'giantwhirlpool') {
				this.add('c|+GiantWhirlpool|T_T dammit hEAl, why am i still here?');
			}
			if (name === 'epicumbreon29') {
				this.add('c|%EpicUmbreon29|See! I knew you could do it! You just have to believe!');
			}
			if (name === 'insist') {
				this.add('c|Insist|Death.... what a cool concept.');
			}
		},
	}, {
		name: "[Gen 7] Pokemon Mystery Dungeon",

		mod: 'pmd',
		team: 'randomPmd',
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				allPokemon[i].maxhp *= 3;
				allPokemon[i].hp = allPokemon[i].maxhp;
			}
		},
	}, {
		name: "Supercell Games",
		section: "Exiled's Custom Gamemodes",
		mod: "supercell",
		team: "randomSeasonalMelee",
		ruleset: ['Cancel Mod', 'HP Percentage Mod'],
	}, {
		name: "Digimon Showdown",
		section: "Exiled's Custom Gamemodes",
		mod: "digimon",
		team: "randomDigimon",
		gameType: "doubles",
		ruleset: ['Cancel Mod', 'HP Percentage Mod'],
		onBegin: function () {
			this.add('c|~Insist|Hey players, I\'m the Head Developer of this gamemode, and for some reason I\'m here to give you a **DISCLAIMER**, so be ready....');
			this.add('c|~Insist|This gamemode was made solely for the enjoyment of the players of the Pokemon Showdown community, and we do not claim to own or be responsible to any rights/copyrights related to Digimon.');
			this.add('c|~Insist|Now that that\'s out of the way, go ahead and meet our developers! Oh, wow! Here they are, let them introduce themselves.');
			this.add('c|%Ashley the Pikachu|Haha, hey! I am the Head Researcher that made this gamemode possible!');
			this.add('c|+Stellation|Hey, I was in charge of assisting the other developers. I did my own fair share of coding when needed and made this thing open source so you all can download, edit, and play this meta! :3');
			this.add('c| AlfaStorm|Hey, you see all those items, and move animations, haha that was my job ^~^');
			this.add('c|~HoeenHero|Hey, I helped creating mechanics for this gamemode to work as it does :D');
			this.add('raw', '<center><a title="Digimon Tamers: Zone Digital" href="https://www.youtube.com/watch?v=HSm6CHgujSE" target="_blank"><img src="https://x5zb5g.bn1303.livefilestore.com/y3m7hz_BBUaKCiMAo-__U76Xif0Wl70a-muQxVLAUWjhKrErxeDIfH6HBN0_M4Rac9yLWH7VRKR4FaMgx6LLZjUwkKzxp1FKocL16LjZOXJogV8ltDPockgXW8As2JSvW5h9UC-YT6xlUWIN0nE8N2WRcP0f1HxkxQFv16nCBk1cyU?width=124&amp;height=28&amp;cropmode=none" alt="Digimon Tamers: Zone Digital" width="124" height="28" /></a><a title="Digimon Froniter: With the Will BGM Verison" href="https://www.youtube.com/watch?v=aiEQNKFiVRY" target="_blank"><img src="https://x5ysra.bn1303.livefilestore.com/y3mejTyK4Owu1CRO-2dEV6f5sXEzfxKIBJ8zDCKtGOvH2m6TNHfGwEVBnSFYmJnQ5irfZG5PTm2Q_cvEZSVJOjco65nxgpmgxkh9u6-Z2-67FqIWD4oMfceTWGOqlL0n9zDM8OrjYKBhRI3FqA8vZq_eAc1QSWIRCdWDa21vklS4XA?width=124&amp;height=28&amp;cropmode=none" alt="Digimon Frontier: With the WIll BGM" width="124" height="28" /></a><a title="Digimon Adventure: Shuugeki Soshite..." href="https://www.youtube.com/watch?v=66iMd-lpC9E" target="_blank"><img src="https://x5zilq.bn1303.livefilestore.com/y3mIjynkF0J_iQQ0IeK0jCR1BLEIpgDkRRGUdYSyOOeNyFcaWCkI5W6LrQamjbqgibv203Ss824bh24kF_gBWNhxOBkjg_rdimfGBsN_6a1k64KydPJRTTrZdA6naRzTBOoxg59qQVtt6I0vQ3d5iAfLRoM_JirnCb7jLX-Ok93YL8?width=124&amp;height=28&amp;cropmode=none" alt="Digimon Adventure: Shuugeki! Soshite..." width="124" height="28" /></a><a title="Digimon Xros Wars: Battle In The Digital World" href="https://www.youtube.com/watch?v=xngD8cDZLRQ" target="_blank"><img src="https://x5x9og.bn1303.livefilestore.com/y3mQAOGzN350mT9JOODjaIzJQ4zcLmZ1l4T_5PeAeN-m4zSj4e2tODh563uxlJh8ZflX4HJOOCtXAi5Bchow8eSOIwPcYEWToRrlD-DKcJIB7HxFdKP6zOZceolZjxKSbzk8R9rfKaSqG7y2vn7MfWJ8AQHHipXVt_cEf0vULk-d98?width=124&amp;height=28&amp;cropmode=none" alt="Digimon Xros Wars: Battle In the Digital World" width="124" height="28" /></a></center>');
		},
		desc: [
			"You may have thought this was Pokemon Showdown, but I must reassure you that you were mistaken, welcome to DIGIMON SHOWDOWN",
			"Ahem, but in all seriousness, the following developers listed below created Digimon in Pokemon Showdown, so why not just try it out :D",
			"Ashley the Pikachu (Head Researcher, Began the project, Attack Manual, Type Chart Manual, Music Selection and Music HTML, Sprite Selection), Insist (Head Developer), AlphaStorm (Animations), Stellation (Assisted other developers), HoeenHero (Assisted with Mechanics)"
		],
	}, {
		/*	name: "[Gen 7] Wrath of the Legends (BETA)",
			section: "Exiled's Custom Gamemodes",
			mod: "legends",
			team: "randomLegendary",
			ruleset: ['Cancel Mod', 'Sleep Clause Mod', 'HP Percentage Mod'],
		}, {
		*/
		name: "Fakemons Random Battle",
		section: "Exiled Fakemons",
		column: 5,
		mod: 'fakemons',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "Fakemons",
		mod: "fakemons",
		section: "Exiled Fakemons",
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
	}, {
		name: "[Gen 7] The Mewth Challenge",
		section: "The Mewth Challenge",
		mod: 'mewth',
		column: 6,
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		defaultLevel: 100,
		maxLevel: 100,
		ruleset: ['Team Preview', 'Cancel Mod'],
		banlist: ['Deoxys', 'Deoxys-Speed', 'Deoxys-Defense', 'Deoxys-Attack', 'Air Balloon'],
	}, {
		name: "[Gen 7] The Mewth Spire",
		section: "The Mewth Challenge",
		mod: 'mewth',
		searchShow: false,
		column: 6,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 200,
		defaultLevel: 100,
		ruleset: ['Team Preview', 'Cancel Mod'],
		banlist: ['Deoxys', 'Deoxys-Speed', 'Deoxys-Defense', 'Deoxys-Attack', 'Air Balloon'],
	}, {
		name: "[Gen 7] LC Mix and Mega",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any little cup Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587740/\">Mix and Mega</a>",
		],
		mod: 'mixandmega',
		defaultLevel: 5,
		ruleset: ['Team Preview', 'Cancel Mod', 'Little Cup', 'Pokemon', 'Illegal', 'Sleep Clause Mod'],
		banlist: ['Baton Pass', 'NFE', 'Cranidos'],
		column: 6,
		section: "The Mewth Challenge",
		onValidateTeam: function (team) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (item in itemTable && itemTable[item] >= 2) {
					if (item.megaStone) return ["You are limited to two of each Mega Stone.", "(You have more than two " + this.getItem(item).name + ")"];
					if (item.id === 'blueorb' || item.id === 'redorb') return ["You are limited to two of each Primal Orb.", "(You have more than two " + this.getItem(item).name + ")"];
					itemTable[item]++;
				}
				else {
					itemTable[item] = 1;
				}
			}
		},
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb')) return;

			let uberStones = ['kangaskhanite'];
			if (template.tier === 'Uber' || template.tier === 'Bank-Uber' || set.ability === 'Power Construct' || uberStones.includes(item.id)) return
		},
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.getTemplate(pokemon.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	}, {
		name: "[Gen 7] Draconic Super Staff Bros.",
		section: "Draconic's Custom Gamemodes",
		mod: 'dssb',
		column: 6,
		team: 'randomSeasonalMelee',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		desc: [
			"Credit to: Insist (head coder).",
			"Thanks to all the auth whom cooperated in this process of making this.",
			"&bullet; <a href=\"http://pastebin.com/cYa8KBss\">How to Submit a Pokemon</a>",
		],
		onBegin: function () {
			// This seasonal gets a bit from Super Smash Bros., that's where the initial message comes from.
			this.add('message', "GET READY FOR THE NEXT BATTLE!");
			// This variable saves the status of a spammy conversation to be played, so it's only played once.
			this.convoPlayed = false;
		},
		// Edgy switch-in sentences go here.
		// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
		onSwitchIn: function (pokemon) {
			var name = toId(pokemon.name);
			var sentences = [];
			var sentence = '';

			//Switch-in Quotes
			if (name === 'insist') {
				this.add('c|~Insist|__**^^Let\'s get roooooiiiiiiight into le noose!^^**__');
			}
			if (name === 'fiftynine') {
				this.add('c|%FiftyNine|Let me see what you can do.');
			}
			if (name === 'earlofkarp') {
				this.add('c|%earl of karp|Und der Cherub steht vor Gott.');
			}
			if (name === 'stormminority') {
				this.add('c|+Storm Minority|Okay, now we are talking! I always do enjoy a good conversation.');
			}
			if (name === 'dragobot') {
				this.add('c|*Drago Bot|Boop Glhf beep');
			}
			if (name === '59bot') {
				this.add('c|%FiftyNine|Alrighty then, lets test this out.');
			}
			if (name === 'nitro62') {
				this.add('c|%nitro62|Greetings and Salutations. You shall soon meet with defeat.');
			}
			// Add here special typings, done for flavor mainly. (and stat boosts)
		},
		//Switch-out Phrase
		onSwitchOut: function (pokemon) {
			var name = toId(pokemon.name);
			var sentences = [];
			var sentence = '';
			//switchout
			if (name === 'insist') {
				this.add('c|~Insist|Errrr I\'ll see you later, just sayin\' this is me just uhhh running away from my problems.... I errr just need a walk! Geez, why are you on to me on everything I do ughhhhhhhhhhh you\'re not my mom!');
			}
			if (name === 'fiftynine') {
				this.add('c|%FiftyNine|OK! So Trial 1 is complete. Please wait until I return for Trial 2.');
			}
			if (name === 'earlofkarp') {
				this.add('c|%earl of karp|Der Cherub wird zurückkehren.');
			}
			if (name === 'dragobot') {
				this.add('c|*Drago Bot|/me disconnected. Will retry in 10 seconds');
			}
			if (name === '59bot') {
				this.add('c|%FiftyNine|Hmmm... Well, I\'m gonna take it out for a bit and investigate what\'s going on.');
			}
		},
		// Add here salty tears, that is, custom faint phrases.
		onFaint: function (pokemon) {
			var name = toId(pokemon.name);
			var sentences = [];
			var sentence = '';
			//le faint
			if (name === 'insist') {
				this.add('c|~Insist|Death.... what a cool concept.');
				this.add('c|~Insist|Wait wot!');
				this.add('c|~Insist|>~Insist fainted.');
				this.add('c|~Insist|That\'s obviously hax m8!');
				this.add('c|~Insist|T-T-That\'s IMPOSSIBRU!');
				this.add('c|~Insist|~~__**^^walks off......^^**__~~')
			}
			if (name === 'fiftynine') {
				this.add('c|%FiftyNine|I\'ve gathered enough information, time to make a conclusion');
			}
			if (name === 'earlofkarp') {
				this.add('c|%earl of karp|What\'s this?! How did you beat me?!');
			}
			if (name === 'stormminority') {
				this.add('c|+Storm Minority|Always leave on a good note');
			}
			if (name == -'dragobot') {
				this.add('c|*Drago Bot|beep. Fuck you. Boop!');
			}
			if (name === '59bot') {
				this.add('c|%FiftyNine|/me sighs');
				this.add('c|%FiftyNine|I\'m taking the bot down until I know what\'s wrong with it.');
			}
			if (name === 'nitro62') {
				this.add('c|%nitro62|Welp. That could\'ve ended better.');
				this.add('c|%nitro62|/me cries');
			}
		},
	},
];
