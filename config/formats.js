'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// SM Singles
	///////////////////////////////////////////////////////////////////
	{
		section: "SM Singles",
	},
	{
		name: "[Gen 7] Random Battle",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable."],

		mod: 'gen7',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Unrated Random Battle",

		mod: 'gen7',
		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3592140/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587177/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3590726/\">OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3598705/\">OU Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 7] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587184/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591388/\">Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3599816/\">Ubers Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: ['Furretite'],
	},
	{
		name: "[Gen 7] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3595341/\">UU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3595093/\">UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591880/\">UU Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Power Construct', 'Mewnium Z', 'Flygonite'],
	},
	{
		name: "[Gen 7] RU (beta)",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3598017/\">RU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3598090/\">RU Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] UU'],
		banlist: ['UU', 'BL2', 'Carbite', 'Ludicolite', 'Butterfrite', 'Lilligite', 'Solite', 'Lunite'],
	},
	{
		name: "[Gen 7] NU (alpha)",

		mod: 'gen7',
		ruleset: ['[Gen 7] RU (beta)'],
		banlist: [
			'Aerodactyl', 'Araquanid', 'Blastoise', 'Bronzong', 'Bruxish', 'Chesnaught', 'Cloyster', 'Comfey', 'Cresselia', 'Dhelmise', 'Diancie', 'Donphan', 'Doublade', 'Durant', 'Escavalier', 'Espeon', 'Feraligatr',
			'Florges', 'Flygon', 'Froslass', 'Galvantula', 'Gardevoir', 'Gigalith', 'Glalitite', 'Gligar', 'Golisopod', 'Goodra', 'Heliolisk', 'Heracross', 'Honchkrow', 'Hoopa', 'Jellicent', 'Jolteon', 'Kommo-o',
			'Linoone', 'Mantine', 'Milotic', 'Nidoqueen', 'Registeel', 'Reuniclus', 'Rhyperior', 'Roserade', 'Rotom-Heat', 'Salazzle', 'Sharpedo', 'Shaymin', 'Snorlax', 'Swellow', 'Torkoal', 'Umbreon', 'Venusaur', 'Zoroark',
		],
	},
	{
		name: "[Gen 7] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587196/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/sm/formats/lc/\">LC Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587565/\">LC Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3588679/\">LC Sample Teams</a>",
		],

		mod: 'gen7',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Little Cup'],
		banlist: ['Cutiefly', 'Drifloon', 'Gligar', 'Gothita', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Vulpix-Base', 'Yanma', 'Eevium Z', 'Dragon Rage', 'Sonic Boom'],
	},
	{
		name: "[Gen 7] Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587441/\">Anything Goes</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591711/\">AG Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/ag/\">AG Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7] CAP",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587865/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3597893/\">CAP Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/7203358/\">CAP Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU', 'Allow CAP'],
	},
	{
		name: "[Gen 7] CAP LC",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3599594/\">CAP LC</a>"],

		mod: 'gen7',
		searchShow: false,
		maxLevel: 5,
		ruleset: ['[Gen 7] LC', 'Allow CAP'],
	},
	{
		name: "[Gen 7] Battle Spot Singles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3601012/\">Introduction to Battle Spot Singles</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587201/\">Battle Spot Singles Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3601658/\">Battle Spot Singles Roles Compendium</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3593055/\">Battle Spot Singles Sample Teams</a>",
		],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "[Gen 7] Battle Spot Special 4",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3603342/\">Battle Spot Special</a>"],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [1, 6],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Eviolite', 'Focus Sash'],
		onValidateSet(set) {
			let item = this.getItem(set.item);
			if (item.exists && (item.megaStone || item.zMove)) {
				return [`${set.name || set.species} has ${item.name}, which is banned in Battle Spot Special 4.`];
			}
		},
	},
	{
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
	},
	{
		name: "[Gen 7] Random Doubles Battle",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3586596/\">Doubles OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3592903/\">Doubles OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3590987/\">Doubles OU Sample Teams</a>",
		],

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Jirachi', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Lunala', 'Magearna', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Eevium Z', 'Kangaskhanite', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
	},
	{
		name: "[Gen 7] Doubles Ubers",

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Dark Void'],
	},
	{
		name: "[Gen 7] Doubles UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3598014/\">Doubles UU Metagame Discussion</a>"],

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['[Gen 7] Doubles OU'],
		banlist: [
			'Aegislash', 'Amoonguss', 'Araquanid', 'Arcanine', 'Azumarill', 'Bronzong', 'Celesteela', 'Cresselia',
			'Deoxys-Attack', 'Diancie', 'Excadrill', 'Ferrothorn', 'Garchomp', 'Gastrodon', 'Heatran', 'Hoopa-Unbound', 'Jirachi',
			'Kartana', 'Kingdra', 'Landorus-Therian', 'Marowak-Alola', 'Milotic', 'Mimikyu', 'Muk-Alola', 'Ninetales-Alola',
			'Oranguru', 'Pelipper', 'Politoed', 'Porygon2', 'Rotom-Wash', 'Shaymin-Sky', 'Tapu Bulu', 'Tapu Fini',
			'Tapu Koko', 'Tapu Lele', 'Tyranitar', 'Volcanion', 'Volcarona', 'Weavile', 'Whimsicott', 'Zapdos', 'Zygarde-Base',
			'Battle Bond', 'Beedrillite', 'Charizardite Y', 'Gengarite', 'Gyaradosite', 'Kangaskhanite', 'Mawilite', 'Metagrossite', 'Pidgeotite', 'Salamencite', 'Steelixite',
		],
	},
	{
		name: "[Gen 7] VGC 2017",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3583926/\">VGC 2017 Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591794/\">VGC 2017 Viability Rankings</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3590391/\">VGC 2017 Sample Teams</a>",
		],

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
	},
	{
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
	},
	{
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
	},
	{
		name: "[Gen 7] Godly Gift",
		desc: [
			"Each Pok&eacute;mon receives one base stat from your God depending on its position in your team.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3597618/\">Godly Gift</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] Ubers'],
		banlist: ['Blissey', 'Chansey', 'Uber > 1', 'Uber ++ Power Construct', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Gengarite', 'Mawilite', 'Medichamite', 'Baton Pass'],
		onModifyTemplate: function (template, target, source, effect) {
			if (source || !target.side) return;
			let uber = target.side.team.find(set => {
				let item = this.getItem(set.item);
				return toId(set.ability) === 'powerconstruct' || this.getTemplate(item.megaEvolves === set.species ? item.megaStone : set.species).tier === 'Uber';
			}) || target.side.team[0];
			let stat = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'][target.side.team.indexOf(target.set)];
			template = Object.assign({}, template);
			template.baseStats = Object.assign({}, template.baseStats);
			template.baseStats[stat] = this.getTemplate(uber.species).baseStats[stat];
			return template;
		},
	},
	{
		name: "[Gen 7] Dancerability",
		desc: [
			"Whenever a move visibly triggers a Pok&eacute;mon's Ability, it additionally bounces the move.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3600658/\">Dancerability</a>",
		],

		mod: 'dancerability',
		searchShow: false,
		ruleset: ['[Gen 7] OU'],
	},
	{
		section: "Other Metagames",
		column: 2,
	},
	{
		name: "[Gen 7] Balanced Hackmons",
		desc: [
			"Anything that can be hacked in-game and is usable in local battles is allowed.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587475/\">Balanced Hackmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3588586/\">BH Suspects and Bans Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3593766/\">BH Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/bh/\">BH Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Arena Trap', 'Huge Power', 'Innards Out', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Water Bubble', 'Wonder Guard', 'Chatter', 'Comatose + Sleep Talk'],
	},
	{
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
			'Illegal', 'Unreleased', 'Arceus', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Perish Song', 'Kangaskhanite', 'Salamencite', 'Chansey + Charm + Seismic Toss',
		],
	},
	{
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
			'Battle Bond', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Medichamite', 'Metagrossite', 'Salamencite', 'Smooth Rock', 'Terrain Extender', 'Baton Pass',
		],
	},
	{
		name: "[Gen 7] Mix and Mega",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587740/\">Mix and Mega</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591580/\">Mix and Mega Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/mix_and_mega/\">Mix and Mega Analyses</a>",
		],

		mod: 'mixandmega',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Mega Rayquaza Clause', 'Team Preview'],
		banlist: ['Baton Pass', 'Electrify'],
		onValidateTeam: function (team) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (!(item in itemTable)) {
					itemTable[item] = 1;
				} else if (itemTable[item] < 2) {
					itemTable[item]++;
				} else {
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
			let uberStones = ['beedrillite', 'blazikenite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
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
	},
	{
		name: "[Gen 7] Mix and Mega (suspect test)",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3605195/\">M&M Suspect #4</a>"],

		mod: 'mixandmega',
		challengeShow: false,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Mega Rayquaza Clause', 'Team Preview'],
		banlist: ['Baton Pass', 'Electrify'],
		onValidateTeam: function (team) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (!(item in itemTable)) {
					itemTable[item] = 1;
				} else if (itemTable[item] < 2) {
					itemTable[item]++;
				} else {
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
			let uberStones = ['beedrillite', 'blazikenite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
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
	},
	{
		name: "[Gen 7] Almost Any Ability",
		desc: [
			"Pok&eacute;mon can use any ability, barring the few that are banned.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587901/\">Almost Any Ability</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3595753/\">AAA Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/aaa/\">AAA Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Ability Clause', 'Ignore Illegal Abilities', 'Swagger Clause', 'Team Preview'],
		banlist: ['Aegislash', 'Arceus', 'Archeops', 'Blaziken', 'Darkrai', 'Deoxys', 'Dialga', 'Dragonite', 'Dugtrio-Base', 'Giratina', 'Groudon',
			'Ho-Oh', 'Kartana', 'Keldeo', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Pheromosa',
			'Rayquaza', 'Regigigas', 'Reshiram', 'Shaymin-Sky', 'Shedinja', 'Slaking', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Shadow Tag', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite', 'Baton Pass',
		],
		onValidateSet: function (set) {
			let bannedAbilities = {'Arena Trap': 1, 'Comatose': 1, 'Contrary': 1, 'Fluffy': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Illusion': 1, 'Imposter': 1, 'Innards Out': 1, 'Parental Bond': 1, 'Protean': 1, 'Pure Power': 1, 'Simple':1, 'Speed Boost': 1, 'Stakeout': 1, 'Water Bubble': 1, 'Wonder Guard': 1};
			if (set.ability in bannedAbilities) {
				let template = this.getTemplate(set.species || set.name);
				let legalAbility = false;
				for (let i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pok\u00e9mon that do not naturally have it.'];
			}
		},
	},
	{
		name: "[Gen 7] Sketchmons",
		desc: [
			"Pok&eacute;mon gain access to one Sketched move.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587743/\">Sketchmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/sketchmons/\">Sketchmons Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU', 'Allow One Sketch', 'Sketch Clause'],
		banlist: ['Dugtrio-Base'],
		noSketch: ['Belly Drum', 'Celebrate', 'Conversion', "Forest's Curse", 'Geomancy', 'Happy Hour', 'Hold Hands', 'Lovely Kiss', 'Purify', 'Shell Smash', 'Shift Gear', 'Sketch', 'Spore', 'Trick-or-Treat'],
	},
	{
		name: "[Gen 7] Hidden Type",
		desc: [
			"Pok&eacute;mon have an added type determined by their IVs. Same as the Hidden Power type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591194/\">Hidden Type</a>",
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['[Gen 7] OU'],
		onModifyTemplate: function (template, pokemon) {
			if (template.types.includes(pokemon.hpType)) return;
			return Object.assign({addedType: pokemon.hpType}, template);
		},
	},
	{
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
	},
	{
		name: "OU Theorymon",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3559611/\">OU Theorymon</a>"],

		mod: 'theorymon',
		searchShow: false,
		ruleset: ['OU'],
	},
	{
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
	},
	{
		name: "Battle Factory",

		team: 'randomFactory',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 7] BSS Factory",
		desc: [
			"Randomised 3v3 Singles featuring Pok&eacute;mon and movesets popular in Battle Spot Singles.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3604845/\">Information and Suggestions Thread</a>",
		],

		mod: 'gen7',
		team: 'randomBSSFactory',
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
	},
	{
		name: "[Gen 7] Challenge Cup 1v1",

		mod: 'gen7',
		team: 'randomCC',
		teamLength: {
			battle: 1,
		},
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
	},
	{
		name: "[Gen 7] Monotype Random Battle",

		mod: 'gen7',
		team: 'random',
		searchShow: false,
		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Hackmons Cup",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item."],

		mod: 'gen7',
		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'PotD'],
	},
	{
		name: "[Gen 7] Doubles Hackmons Cup",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'PotD'],
	},

	// RoA Spotlight
	///////////////////////////////////////////////////////////////////

	{
		section: "RoA Spotlight",
		column: 3,
	},
	{
		name: "[Gen 5] OU (blind)",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3604732/\">Blind BW</a>"],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
	},

	// ORAS Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "ORAS Singles",
		column: 3,
	},
	{
		name: "OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3573990/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3571990/\">OU Viability Ranking</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew'],
	},
	{
		name: "Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3522911/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535106/\">Ubers Viability Ranking</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
	},
	{
		name: "UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3582473/\">np: UU Stage 7.3</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/uu/\">UU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3555277/\">UU Viability Ranking</a>",
		],

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Drought', 'Baton Pass'],
	},
	{
		name: "RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3583022/\">np: RU Stage 19</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ru/\">RU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558546/\">RU Viability Ranking</a>",
		],

		ruleset: ['UU'],
		banlist: ['UU', 'BL2'],
	},
	{
		name: "NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3576747/\">np: NU Stage 15</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/nu/\">NU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3555650/\">NU Viability Ranking</a>",
		],

		ruleset: ['RU'],
		banlist: ['RU', 'BL3'],
	},
	{
		name: "PU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3586575/\">np: PU Stage 10</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528743/\">PU Viability Ranking</a>",
		],

		ruleset: ['NU'],
		banlist: ['NU', 'BL4', 'Chatter'],
		unbanlist: ['Baton Pass'],
	},
	{
		name: "LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505710/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/formats/lc/\">LC Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547566/\">LC Viability Ranking</a>",
		],

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger'],
	},
	{
		name: "Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3548945/\">Anything Goes Resources</a>",
		],

		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "CAP",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3537407/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545628/\">CAP Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/5594694/\">CAP Sample Teams</a>",
		],

		searchShow: false,
		ruleset: ['OU', 'Allow CAP'],
	},
	{
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
	},
	{
		name: "Inverse Battle",
		desc: ["The effectiveness of attacks is inverted."],

		searchShow: false,
		ruleset: ['Pokemon', 'Inverse Mod', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 6] Random Battle",

		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
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
	},
	{
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
	},
	{
		name: "Doubles Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542746/\">Doubles Ubers</a>"],

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Abilities Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Dark Void'],
	},
	{
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
	},
	{
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
			const legends = {'Mewtwo':1, 'Lugia':1, 'Ho-Oh':1, 'Kyogre':1, 'Groudon':1, 'Rayquaza':1, 'Dialga':1, 'Palkia':1, 'Giratina':1, 'Reshiram':1, 'Zekrom':1, 'Kyurem':1, 'Xerneas':1, 'Yveltal':1, 'Zygarde':1};
			let n = 0;
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species).baseSpecies;
				if (template in legends) n++;
				if (n > 2) return ["You can only use up to two legendary Pok\u00E9mon."];
			}
		},
	},
	{
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
	},
	{
		name: "[Gen 6] Random Doubles Battle",

		gameType: 'doubles',
		team: 'random',
		searchShow: false,
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Doubles Custom Game",

		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},
	{
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
	},
	{
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
	},
	{
		name: "[Gen 5] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3599678/\">BW2 OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
	},
	{
		name: "[Gen 5] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550881/\">BW2 Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446463/\">BW2 Ubers Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
	},
	{
		name: "[Gen 5] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3474024/\">BW2 UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning'],
	},
	{
		name: "[Gen 5] RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3473124/\">BW2 RU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning'],
	},
	{
		name: "[Gen 5] NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3484121/\">BW2 NU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist'],
	},
	{
		name: "[Gen 5] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3485860/\">BW2 LC Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom', 'LC Uber', 'Gligar', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela'],
	},
	{
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
	},
	{
		name: "[Gen 5] Random Battle",

		mod: 'gen5',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
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
	},
	{
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
	},
	{
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
	},
	{
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
	},
	{
		name: "[Gen 4] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 4] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505128/\">DPP Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446464/\">DPP Ubers Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus'],
	},
	{
		name: "[Gen 4] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503638/\">DPP UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL'],
	},
	{
		name: "[Gen 4] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/dp/articles/little_cup_guide\">DPP LC Guide</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup'],
		banlist: ['LC Uber', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma', 'Berry Juice', 'Deep Sea Tooth', 'Dragon Rage', 'Sonic Boom'],
	},
	{
		name: "[Gen 4] Custom Game",

		mod: 'gen4',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	},
	{
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
	},
	{
		name: "[Gen 3] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain'],
	},
	{
		name: "[Gen 3] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536426/\">ADV Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446466/\">ADV Ubers Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Wobbuffet + Leftovers'],
	},
	{
		name: "[Gen 3] Custom Game",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 2] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 2] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3507552/\">GSC Ubers Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'gen2',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] Random Battle",

		mod: 'gen2',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] Custom Game",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3541329/\">RBY Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 1] OU (tradeback)",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Allow Tradeback', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber', 'Unreleased', 'Illegal',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Random Battle",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Challenge Cup",

		mod: 'gen1',
		team: 'randomCC',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Stadium",

		mod: 'stadium',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Custom Game",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
		/* * * * * * * * *
		 * EXILED METAS: *
		 * * * * * * * * */
	{
		name: "[Gen 7] Clash of the Regions",
		section: "Exiled's Custom Gamemodes",
		mod: 'clashoftheregions',
		ruleset: ['Sleep Clause Mod', 'Cancel Mod', 'Exact HP Mod', 'Baton Pass Clause', 'Pokemon', 'Standard'],
		desc: [
			"This metagame is about every rival/gym leader/",
			"Credit to: Insist (main coder and inspired by), Vivid is a God (side coder and set adviser), Alpha Hawk (extra ideas)",
			"&bullet; <a href=\"http://squadps.boards.net/post/51/thread\">Clash of the Regions Information</a>",
		],
		column: 5,
		team: 'randomSeasonalMelee',
	},
	{
		name: "[Gen 7] SMASHING METAGAME",
		section: "Exiled's Custom Gamemodes",
		mod: 'smashingmetagame',
		ruleset: ['Cancel Mod', 'Exact HP Mod', 'Team Preview'],
		desc: [
			"Credit to: Insist (coded and inspired by), and Kairak (gave ideas for custom moves names).",
			"Made for Gyaratoast, my (Insist) best friend.",
		],
		team: 'randomSeasonalMelee',
	},
	{
		name: "[Gen 7] Ash's Pokemon",
		section: "Exiled's Custom Gamemodes",
		mod: 'ashspokemon',
		ruleset: ['Exact HP Mod', 'Team Preview', 'Cancel Mod', 'Sleep Clause Mod'],
		team: 'randomSeasonalMelee',
		desc: [
			"This metagame covers every Pok&eacute that Ash caught in the anime (since XY), some were evolved for viability etc.",
		],
	},
	{
		name: "[Gen 7] OP Metagame",
		section: "Exiled's Custom Gamemodes",
		mod: "opmetagame",
		ruleset: ['Exact HP Mod', 'Cancel Mod'],
		team: 'randomSeasonalMelee',
		desc: [
			"Inspired by BAMD, coded and extra ideas from Insist.",
			"&bullet; <a href=\"http://pastebin.com/cYa8KBss\">How to Submit a Pok&eacutemon</a>",
		],
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.name);

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
					spd: -6,
				});
			}
			if (name === 'illuminati' && !pokemon.illusion) {
				this.boost({
					spe: 6,
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
	},
	{
		name: "[Gen 7] Type Illusion Beta",
		section: "Exiled's Custom Gamemodes",
		mod: "gen7",
		ruleset: ['[Gen 7] OU'],
		banlist: ["Shedinja"],
		desc: [
			"&bullet; Coded by flufi.",
			"Nickname a Pokemon a single typing and the Pokemon will change to that typing in battle.",
			"Dual Typings will be settable when the OM is out of beta.",
			"To keep a Pokemon's default typing, don't give it a nickname.",
			"&bullet; <a href=\"http://exiledps.boards.net/board/20/type-illusions\">Type Illusion Thread</a>",
		],
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.name);
			if (name === 'fire' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire');
				pokemon.types = ["Fire"];
			}
			if (name === 'electric' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric');
				pokemon.types = ["Electric"];
			}
			if (name === 'bug' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug');
				pokemon.types = ["Bug"];
			}
			if (name === 'water' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water');
				pokemon.types = ["Water"];
			}
			if (name === 'grass' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass');
				pokemon.types = ["Grass"];
			}
			if (name === 'fighting' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fighting');
				pokemon.types = ["Fighting"];
			}
			if (name === 'psychic' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic');
				pokemon.types = ["Psychic"];
			}
			if (name === 'fairy' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fairy');
				pokemon.types = ["Fairy"];
			}
			if (name === 'ice' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ice');
				pokemon.types = ["Ice"];
			}
			if (name === 'dark' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dark');
				pokemon.types = ["Dark"];
			}
			if (name === 'ghost' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost');
				pokemon.types = ["Ghost"];
			}
			if (name === 'normal' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal');
				pokemon.types = ["Normal"];
			}
			if (name === 'flying' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying');
				pokemon.types = ["Flying"];
			}
			if (name === 'ground' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground');
				pokemon.types = ["Ground"];
			}
			if (name === 'rock' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock');
				pokemon.types = ["Rock"];
			}
			if (name === 'dragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon');
				pokemon.types = ["Dragon"];
			}
			if (name === 'poison' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison');
				pokemon.types = ["Poison"];
			}
			if (name === 'steel' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Steel');
				pokemon.types = ["Steel"];
			}
			if (name === 'volcano' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Ground/Rock');
				pokemon.types = ["Fire", "Ground", "Rock"];
			}
			if (name === 'shedinja' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Ghost');
				pokemon.types = ["Bug", "Ghost"];
			}
			if (name === 'vxn' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Bug/Electric');
				pokemon.types = ["Fire", "Bug", "Electric"];
			}
			if (name === 'flufi' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ghost');
				pokemon.types = ["Normal", "Ghost"];
			}
			if (name === 'exiled' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dark/Ghost');
				pokemon.types = ["Dark", "Ghost"];
			}
			if (name === 'insist' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Fighting');
				pokemon.types = ["Psychic", "Fighting"];
			}
		},
		onAfterMega: function (pokemon) {
			let name = toId(pokemon.name);
			if (name === 'fire' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire');
				pokemon.types = ["Fire"];
			}
			if (name === 'electric' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric');
				pokemon.types = ["Electric"];
			}
			if (name === 'bug' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug');
				pokemon.types = ["Bug"];
			}
			if (name === 'water' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water');
				pokemon.types = ["Water"];
			}
			if (name === 'grass' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass');
				pokemon.types = ["Grass"];
			}
			if (name === 'fighting' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fighting');
				pokemon.types = ["Fighting"];
			}
			if (name === 'psychic' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic');
				pokemon.types = ["Psychic"];
			}
			if (name === 'fairy' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fairy');
				pokemon.types = ["Fairy"];
			}
			if (name === 'ice' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ice');
				pokemon.types = ["Ice"];
			}
			if (name === 'dark' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dark');
				pokemon.types = ["Dark"];
			}
			if (name === 'ghost' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost');
				pokemon.types = ["Ghost"];
			}
			if (name === 'normal' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal');
				pokemon.types = ["Normal"];
			}
			if (name === 'flying' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying');
				pokemon.types = ["Flying"];
			}
			if (name === 'ground' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground');
				pokemon.types = ["Ground"];
			}
			if (name === 'rock' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock');
				pokemon.types = ["Rock"];
			}
			if (name === 'dragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon');
				pokemon.types = ["Dragon"];
			}
			if (name === 'poison' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison');
				pokemon.types = ["Poison"];
			}
			if (name === 'steel' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Steel');
				pokemon.types = ["Steel"];
			}
			if (name === 'volcano' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Ground/Rock');
				pokemon.types = ["Fire", "Ground", "Rock"];
			}
			if (name === 'shedinja' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Ghost');
				pokemon.types = ["Bug", "Ghost"];
			}
			if (name === 'vxn' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Bug/Electric');
				pokemon.types = ["Fire", "Bug", "Electric"];
			}
			if (name === 'flufi' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ghost');
				pokemon.types = ["Normal", "Ghost"];
			}
			if (name === 'exiled' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dark/Ghost');
				pokemon.types = ["Dark", "Ghost"];
			}
			if (name === 'insist' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Fighting');
				pokemon.types = ["Psychic", "Fighting"];
			}
			if (name === 'fairysteel' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fairy/Steel');
				pokemon.types = ["Fairy", "Steel"];
			}
			if (name === 'fightingflying' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fighting/Flying');
				pokemon.types = ["Fighting", "Flying"];
			}
			if (name === 'mystery' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Water/Grass');
				pokemon.types = ["Fire", "Water", "Grass"];
			}
			if (name === 'metalbug' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Steel/Bug');
				pokemon.types = ["Steel", "Bug"];
			}
			if (name === 'icewall' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Steel/Ice/Water');
				pokemon.types = ["Steel", "Ice", "Water"];
			}
		},
	},
	{
		name: "[Gen 7] Exiled Super Staff Bros.",
		section: "Exiled's Custom Gamemodes",
		mod: 'essb',
		team: 'randomSeasonalMelee',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		desc: [
			"Credit to: Insist (head coder).",
			"Thanks to all the auth whom cooperated in this process of making this.",
			"&bullet; <a href=\"http://pastebin.com/cYa8KBss\">How to Submit a Pokemon</a>",
			"&bullet; <a href=\"http://exiledps.boards.net/board/6/exiled-super-staff-bros\">ESSB Thread</a>",
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
		onSwitchIn: function (pokemon, source) {
			let name = toId(pokemon.name);

			//Switch-in Quotes
			if (name === 'insist') {
				this.add('c|~Insist|__**^^Let\'s get roooooiiiiiiight into le noose!^^**__');
			}
			if (name === 'vxn') {
				this.add('c|+VXN|ok im here, what do you want me to break');
			}
			if (name === 'speckeldorft') {
				this.add('c| Speckeldorft|**YYYEEAAHHHHHHHH BBBBBBBBBBBBBBBBOOOOOOOOOOOOOOOOOOOOIIIIIIIIIIIIIIIIIIIIIIIIII**');
			}
			if (name === 'abstarfox') {
				this.add('c| AB Starfox|Hello, just here to clean up');
			}
			if (name === 'flufi') {
				this.add('c|@flufi|Howdy');
			}
			if (name === 'hoeenhero') {
				this.add('c|+HoeenHero|Do I have to? I\'m in the middle of programming.');
			}
			if (name === 'thegodofpie') {
				this.add('c| TheGodOfPie|my HP literally represents the amount of stupidity you have lol');
			}
			if (name === 'almightyjudgment') {
				this.add('c| Almighty Judgment|M3RP');
			}
			if (name === 'guiltasbr') {
				this.add('c| GuiltasBR|Prepare to get JOOJ!!!');
			}
			if (name === 'echosierra') {
				this.add('c|+EchoSierra|lol fite me irl');
			}
			if (name === 'horrific17') {
				this.add('c| Horrific17|It seems you\'ve made a __horrific__ mistake');
			}

			// Add here special typings, done for flavor mainly. (and stat boosts)
			if (name === 'volco' && !pokemon.illusion) {
				this.boost({
					spe: 1,
				});
			}
			if (name === 'wobbleleez' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Fairy');
				pokemon.types = ["Psychic", "Fairy"];
				this.boost({
					def: 1,
					spd: 1,
				});
			}
			if (name === 'failures' && !pokemon.illusion) {
				this.boost({
					spe: 1,
				});
			}
			if (name === 'cyt0pl4sm' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dark/Fairy');
				pokemon.types = ["Dark", "Fairy"];
			}
			if (name === 'chesnaught90000' && !pokemon.illusion) {
				this.boost({
					spe: 1,
				});
			}
			if (name === 'douglasgamer' && !pokemon.illusion) {
				this.boost({
					spa: 1,
				});
				this.add('-start', pokemon, 'typechange', 'Water/Electric');
				pokemon.types = ["Water", "Electric"];
			}
			if (name === 'backatmyday' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Water');
				pokemon.types = ["Ground", "Water"];
			}
			if (name === 'playershadowbr' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Water');
				pokemon.types = ["Dragon", "Water"];
			}
			if (name === 'vxn' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Flying');
				pokemon.types = ["Electric", "Flying"];
			}
			//custom moves on switch while having a specific ability
			if (name === 'universalcraftr' && !pokemon.illusion) {
				this.useMove('trickroom', pokemon);
			}
		},
		// Code for use specific moves
		onModifyMove: function (move, pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			if (move.id === 'storedpower' && name === 'vxn') {
				move.defensiveCategory = 'Special';
				move.category = 'Physical';
			}
			if (move.id === 'meditate' && name === 'vxn') {
				move.name = 'Ultimate Setup';
			}
			if (move.id === 'ember' && name === 'chandie') {
				move.name = 'Fast Flame';
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Flame Burst", target);
				};
			}
		},
		//Switch-out Phrase
		onSwitchOut: function (pokemon) {
			let name = toId(pokemon.name);
			//switchout
			if (name === 'insist') {
				this.add('c|~Insist|Errrr I\'ll see you later, just sayin\' this is me just uhhh running away from my problems.... I errr just need a walk! Geez, why are you on to me on everything I do ughhhhhhhhhhh you\'re not my mom!');
			}
			if (name === 'speckeldorft') {
				this.add('c| Speckeldorft|fuck you');
			}
			if (name === 'abstarfox') {
				this.add('c| AB Starfox|Time for me to get a life');
			}
			if (name === 'hoeenhero') {
				this.add('c|+HoeenHero|I can\'t battle now, I\'m too busy.');
			}
			if (name === 'thegodofpie') {
				this.add('c| TheGodOfPie|you\'re not using me properly ~~wait what~~');
			}
			if (name === 'echosierra') {
				this.add('c|+EchoSierra|bbl fam');
			}
		},
		// Add here salty tears, that is, custom faint phrases.
		onFaint: function (pokemon) {
			let name = toId(pokemon.name);
			//le faint
			if (name === 'insist') {
				this.add('c|~Insist|Death.... what a cool concept.');
				this.add('c|~Insist|Wait wot!');
				this.add('c|~Insist|>~Insist fainted.');
				this.add('c|~Insist|That\'s obviously hax m8!');
				this.add('c|~Insist|T-T-That\'s IMPOSSIBRU!');
				this.add('c|~Insist|~~__**^^walks off......^^**__~~');
			}
			if (name === 'vxn') {
				this.add('c|+VXN|the bug has been fixed');
			}
			if (name === 'speckeldorft') {
				this.add('c| Speckeldorft|__I was a ded meme.......__');
			}
			if (name === 'abstarfox') {
				this.add('c| AB Starfox|Once again I get lucked out smh');
			}
			if (name === 'hoeenhero') {
				this.add('c|+HoeenHero|Hey! Thats more hax than I get to use >:(');
			}
			if (name === 'thegodofpie') {
				this.add('c| TheGodOfPie|ur mom');
			}
			if (name === 'almightyjudgment') {
				this.add('c| Almighty Judgment|YOU THINK YOU HAVE BESTED ME? HAH, DON\'T MAKE ME LAUGH! I WILL BE BACK AND I WILL BE BACK STRONGER THAN EVER BEFORE!');
			}
			if (name === 'guiltasbr') {
				this.add('c| GuiltasBR|oh wow now i became a Ghost,Fighting type and be biatch');
			}
			if (name === 'echosierra') {
				this.add('c|+EchoSierra|~~IIIINNNNSSSSIIISSSTTT~~ i mean gg wp');
			}
			if (name === 'horrific17') {
				this.add('c| Horrific17|I never expected my death to be this... __horrific__');
			}
			if (name === 'douglasgamer') {
				this.add('c| douglasgamer|I\'ve lost! But I have a message! I AM NOT A NINETALES AMATEUR');
			}
		},
		onHit: function (pokemon, target) {
			if (pokemon.hp <= 0 || pokemon.fainted) {
			//When a staffmon knocks out an enemy
				let name = toId(target.name);
				if (name === 'thegodofpie') {
					this.add('c| TheGodOfPie|lmao dora fights better than you');
				}
				if (name === 'insist') {
					this.add('c|~Insist|**FOH, THIS IS MY HOUSE!!!**');
				}
				if (name === 'almightyjudgment') {
					this.add('c| Almighty Judgment|You Have Been Judged!');
				}
				if (name === 'echosierra') {
					this.add('c|+EchoSierra|dasWRIGHT.jpg');
				}
			}
		},
	},
	{
		name: "[Gen 7] Exiled SSB Doubles",
		section: "Exiled's Custom Gamemodes",
		mod: 'essb',
		team: 'randomSeasonalMelee',
		gameType: 'doubles',
		ruleset: ['Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		desc: [
			"Credit to: Insist (head coder).",
			"Thanks to all the auth whom cooperated in this process of making this.",
			"&bullet; <a href=\"http://pastebin.com/cYa8KBss\">How to Submit a Pokemon</a>",
			"&bullet; <a href=\"http://exiledps.boards.net/board/6/exiled-super-staff-bros\">ESSB Thread</a>",
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
		onSwitchIn: function (pokemon, source) {
			let name = toId(pokemon.name);

			//Switch-in Quotes
			if (name === 'insist') {
				this.add('c|~Insist|__**^^Let\'s get roooooiiiiiiight into le noose!^^**__');
			}
			if (name === 'vxn') {
				this.add('c|+VXN|ok im here, what do you want me to break');
			}
			if (name === 'speckeldorft') {
				this.add('c| Speckeldorft|**YYYEEAAHHHHHHHH BBBBBBBBBBBBBBBBOOOOOOOOOOOOOOOOOOOOIIIIIIIIIIIIIIIIIIIIIIIIII**');
			}
			if (name === 'abstarfox') {
				this.add('c| AB Starfox|Hello, just here to clean up');
			}
			if (name === 'flufi') {
				this.add('c|@flufi|Howdy');
				this.add('-start', pokemon, 'typechange', 'Fairy/Steel/Dragon');
				pokemon.types = ["Fairy", "Steel", "Dragon"];
			}
			if (name === 'hoeenhero') {
				this.add('c|%HoeenHero|Do I have to? I\'m in the middle of programming.');
			}
			if (name === 'thegodofpie') {
				this.add('c| TheGodOfPie|my HP literally represents the amount of stupidity you have lol');
			}
			if (name === 'almightyjudgment') {
				this.add('c| Almighty Judgment|M3RP');
			}
			if (name === 'guiltasbr') {
				this.add('c| GuiltasBR|Prepare to get JOOJ!!!');
			}
			if (name === 'echosierra') {
				this.add('c| EchoSierra|lol fite me irl');
			}
			if (name === 'horrific17') {
				this.add('c| Horrific17|It seems you\'ve made a __horrific__ mistake');
			}

			// Add here special typings, done for flavor mainly. (and stat boosts)
			if (name === 'volco' && !pokemon.illusion) {
				this.boost({
					spe: 1,
				});
			}
			if (name === 'wobbleleez' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Fairy');
				pokemon.types = ["Psychic", "Fairy"];
				this.boost({
					def: 1,
					spd: 1,
				});
			}
			if (name === 'failures' && !pokemon.illusion) {
				this.boost({
					spe: 1,
				});
			}
			if (name === 'cyt0pl4sm' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dark/Fairy');
				pokemon.types = ["Dark", "Fairy"];
			}
			if (name === 'chesnaught90000' && !pokemon.illusion) {
				this.boost({
					spe: 1,
				});
			}
			if (name === 'douglasgamer' && !pokemon.illusion) {
				this.boost({
					spa: 1,
				});
				this.add('-start', pokemon, 'typechange', 'Water/Electric');
				pokemon.types = ["Water", "Electric"];
			}
			if (name === 'backatmyday' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Water');
				pokemon.types = ["Ground", "Water"];
			}
			if (name === 'playershadowbr' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Water');
				pokemon.types = ["Dragon", "Water"];
			}
			if (name === 'vxn' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Flying');
				pokemon.types = ["Electric", "Flying"];
			}
			//custom moves on switch while having a specific ability
			if (name === 'universalcraftr' && !pokemon.illusion) {
				this.useMove('trickroom', pokemon);
			}
		},
		// Code for use specific moves
		onModifyMove: function (move, pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			if (move.id === 'storedpower' && name === 'vxn') {
				move.defensiveCategory = 'Special';
				move.category = 'Physical';
			}
			if (move.id === 'meditate' && name === 'vxn') {
				move.name = 'Ultimate Setup';
			}
			if (move.id === 'ember' && name === 'chandie') {
				move.name = 'Fast Flame';
				move.onTryHit = function (target, source, move) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Flame Burst", target);
				};
			}
		},
		//Switch-out Phrase
		onSwitchOut: function (pokemon) {
			let name = toId(pokemon.name);
			//switchout
			if (name === 'insist') {
				this.add('c|~Insist|Errrr I\'ll see you later, just sayin\' this is me just uhhh running away from my problems.... I errr just need a walk! Geez, why are you on to me on everything I do ughhhhhhhhhhh you\'re not my mom!');
			}
			if (name === 'speckeldorft') {
				this.add('c| Speckeldorft|fuck you');
			}
			if (name === 'abstarfox') {
				this.add('c| AB Starfox|Time for me to get a life');
			}
			if (name === 'hoeenhero') {
				this.add('c|%HoeenHero|I can\'t battle now, I\'m too busy.');
			}
			if (name === 'thegodofpie') {
				this.add('c| TheGodOfPie|you\'re not using me properly ~~wait what~~');
			}
			if (name === 'echosierra') {
				this.add('c| EchoSierra|bbl fam');
			}
		},
		// Add here salty tears, that is, custom faint phrases.
		onFaint: function (pokemon) {
			let name = toId(pokemon.name);
			//le faint
			if (name === 'insist') {
				this.add('c|~Insist|Death.... what a cool concept.');
				this.add('c|~Insist|Wait wot!');
				this.add('c|~Insist|>~Insist fainted.');
				this.add('c|~Insist|That\'s obviously hax m8!');
				this.add('c|~Insist|T-T-That\'s IMPOSSIBRU!');
				this.add('c|~Insist|~~__**^^walks off......^^**__~~');
			}
			if (name === 'vxn') {
				this.add('c|+VXN|the bug has been fixed');
			}
			if (name === 'speckeldorft') {
				this.add('c| Speckeldorft|__I was a ded meme.......__');
			}
			if (name === 'abstarfox') {
				this.add('c| AB Starfox|Once again I get lucked out smh');
			}
			if (name === 'hoeenhero') {
				this.add('c|%HoeenHero|Hey! Thats more hax than I get to use >:(');
			}
			if (name === 'thegodofpie') {
				this.add('c| TheGodOfPie|ur mom');
			}
			if (name === 'almightyjudgment') {
				this.add('c| Almighty Judgment|YOU THINK YOU HAVE BESTED ME? HAH, DON\'T MAKE ME LAUGH! I WILL BE BACK AND I WILL BE BACK STRONGER THAN EVER BEFORE!');
			}
			if (name === 'guiltasbr') {
				this.add('c| GuiltasBR|oh wow now i became a Ghost,Fighting type and be biatch');
			}
			if (name === 'echosierra') {
				this.add('c| EchoSierra|~~IIIINNNNSSSSIIISSSTTT~~ i mean gg wp');
			}
			if (name === 'horrific17') {
				this.add('c| Horrific17|I never expected my death to be this... __horrific__');
			}
			if (name === 'douglasgamer') {
				this.add('c| douglasgamer|I\'ve lost! But I have a message! I AM NOT A NINETALES AMATEUR');
			}
		},
		onHit: function (pokemon, target) {
			if (pokemon.hp <= 0 || pokemon.fainted) {
			//When a staffmon knocks out an enemy
				let name = toId(target.name);
				if (name === 'thegodofpie') {
					this.add('c| TheGodOfPie|lmao dora fights better than you');
				}
				if (name === 'insist') {
					this.add('c|~Insist|**FOH, THIS IS MY HOUSE!!!**');
				}
				if (name === 'almightyjudgment') {
					this.add('c| Almighty Judgment|You Have Been Judged!');
				}
				if (name === 'echosierra') {
					this.add('c| EchoSierra|dasWRIGHT.jpg');
				}
			}
		},
	},
	{
		name: "[Gen 7] Monotype Ubers",
		desc: [
			"All the Pok&eacute;mon on a team must share a type, but it is in Ubers",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587204/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3589809/\">Monotype Viability Ranking</a>",
			"&bullet; <a href=\"http://exiledps.boards.net/board/21/monotype-ubers\">Monotype Ubers Thread</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause', 'Same Type Clause'],
	},
	{
		name: "[Gen 7] Metronome Battle",
		desc: ["&bullet; Metronome battles format: 6v6 singles, Only move allowed is metronome, all healing items/abilities are banned, Ubers (and mega rayquaza) are banned, immunites dont exist in this format (ex normal is not very effective on ghost instead of x0)"],
		ruleset: ['[Gen 7] OU'],
		banlist: ['Aguav Berry', 'Assault Vest', 'Berry Juice', 'Cheek Pouch', 'Dry Skin', 'Ice Body', 'Poison Heal', 'Regenerator', 'Volt Absorb', 'Water Absorb', 'Rain Dish', 'Black Sludge', 'Enigma Berry', 'Figy Berry', 'Iapapa Berry', 'Mago Berry', 'Oran Berry', 'Shell Bell', 'Sitrus Berry', 'Wiki Berry', 'Leftovers'],
		mod: 'metronome',
		onValidateSet: function (set) {
			if (set.moves.length !== 1 || toId(set.moves[0]) !== 'metronome') {
				return [(set.name || set.species) + " can only have Metronome."];
			}
		},
		onEffectiveness: function (typeMod, target, type, move) {
			//change no effect to not very effective
			if (move && !this.getImmunity(move, type)) return 2;
		},
	},
	{
		name: "[Gen 7] Random Metronome Battle",
		desc: ["&bullet; Metronome battles format: 6v6 singles, Only move allowed is metronome, all healing items/abilities are banned, Ubers (and mega rayquaza) are banned, immunites dont exist in this format (ex normal is not very effective on ghost instead of x0)"],
		ruleset: ['[Gen 7] OU'],
		team: 'random',
		mod: 'gen7',
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			allPokemon.forEach(pokemon => {
				pokemon.baseMoveset = [{
					move: 'Metronome',
					id: 'metronome',
					pp: 16,
					maxpp: 16,
					target: 'self',
					disabled: false,
					disabledSource: '',
					used: false,
				}];
				pokemon.moves = ['metronome'];
				pokemon.moveset = pokemon.baseMoveset;
				if (Dex.getFormat('[Gen 7] Metronome Battle').banlist.includes(this.getItem(pokemon.item).name)) {
					pokemon.item = 'leppaberry';
				}
			});
		},
		onEffectiveness: function (typeMod, target, type, move) {
			//change no effect to not very effective
			if (move && !this.getImmunity(move, type)) return 2;
		},
	},
	{
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
	},
	{
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
			// This variable saves the status of a spammy conversation to be played, so it's only played once.
			this.convoPlayed = false;
		},
		// Edgy switch-in sentences go here.
		// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.name);

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
			let name = toId(pokemon.name);

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
			let name = toId(pokemon.name);

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
	},
	{
		name: "[Gen 7] Super Staff Bros Free For All",
		desc: ['Duke it out with other users custom made pokemon.',
			'Make your own as well! Get started with <button class="button" name="send" value="/ssb edit">/ssb edit</button>.',
			'Use <button class="button" name="send" value="/ssb">/ssb</button> for the commands you can use.',
		],

		mod: 'ssbffa',
		team: 'randomCustomSSB',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add("raw|<h2>Free for All!</h2>");
			this.add("raw|<h3>3</h3>");
			this.add("raw|<h3>2</h3>");
			this.add("raw|<h3>1</h3>");
			this.add("raw|<h1>BATTLE!</h1>");
		},
	},
	{
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
		desc: [
			"Pok&eacute Mystery Dungeon meets Pok&eacute Showdown.",
			"Developed by SpacialGaze Developers/Exiled Developers contributed.",
			"(Not originally Exiled's Project, SpacialGaze server (owned by HoeenHero and Mystifi) created it first, Exiled developers (Insist and Mewth) just edited and added stuff.",
		],
	},
	{
		name: "[Gen 7] Supercell Games",
		section: "Exiled's Custom Gamemodes",
		mod: "supercell",
		team: "randomSeasonalMelee",
		ruleset: ['Cancel Mod', 'HP Percentage Mod'],
		desc: [
			"This metagame is about games like Clash of Clans, Clash Royale, and in the future possibly Boom Beach.",
			"Made by Insist, we do not claim any right to the characters listed.",
		],
	},
	{
		name: "[Gen 7] Digimon Showdown",
		section: "Exiled's Custom Gamemodes",
		mod: "digimon",
		team: "randomDigimon",
		ruleset: ['Cancel Mod', 'HP Percentage Mod'],
		onBegin: function () {
			this.add('raw', '<center><a title="Digimon Tamers: Zone Digital" href="https://www.youtube.com/watch?v=HSm6CHgujSE" target="_blank"><img src="https://x5zb5g.bn1303.livefilestore.com/y3m7hz_BBUaKCiMAo-__U76Xif0Wl70a-muQxVLAUWjhKrErxeDIfH6HBN0_M4Rac9yLWH7VRKR4FaMgx6LLZjUwkKzxp1FKocL16LjZOXJogV8ltDPockgXW8As2JSvW5h9UC-YT6xlUWIN0nE8N2WRcP0f1HxkxQFv16nCBk1cyU?width=124&amp;height=28&amp;cropmode=none" alt="Digimon Tamers: Zone Digital" width="124" height="28" /></a><a title="Digimon Froniter: With the Will BGM Verison" href="https://www.youtube.com/watch?v=aiEQNKFiVRY" target="_blank"><img src="https://x5ysra.bn1303.livefilestore.com/y3mejTyK4Owu1CRO-2dEV6f5sXEzfxKIBJ8zDCKtGOvH2m6TNHfGwEVBnSFYmJnQ5irfZG5PTm2Q_cvEZSVJOjco65nxgpmgxkh9u6-Z2-67FqIWD4oMfceTWGOqlL0n9zDM8OrjYKBhRI3FqA8vZq_eAc1QSWIRCdWDa21vklS4XA?width=124&amp;height=28&amp;cropmode=none" alt="Digimon Frontier: With the WIll BGM" width="124" height="28" /></a><a title="Digimon Adventure: Shuugeki Soshite..." href="https://www.youtube.com/watch?v=66iMd-lpC9E" target="_blank"><img src="https://x5zilq.bn1303.livefilestore.com/y3mIjynkF0J_iQQ0IeK0jCR1BLEIpgDkRRGUdYSyOOeNyFcaWCkI5W6LrQamjbqgibv203Ss824bh24kF_gBWNhxOBkjg_rdimfGBsN_6a1k64KydPJRTTrZdA6naRzTBOoxg59qQVtt6I0vQ3d5iAfLRoM_JirnCb7jLX-Ok93YL8?width=124&amp;height=28&amp;cropmode=none" alt="Digimon Adventure: Shuugeki! Soshite..." width="124" height="28" /></a><a title="Digimon Xros Wars: Battle In The Digital World" href="https://www.youtube.com/watch?v=xngD8cDZLRQ" target="_blank"><img src="https://x5x9og.bn1303.livefilestore.com/y3mQAOGzN350mT9JOODjaIzJQ4zcLmZ1l4T_5PeAeN-m4zSj4e2tODh563uxlJh8ZflX4HJOOCtXAi5Bchow8eSOIwPcYEWToRrlD-DKcJIB7HxFdKP6zOZceolZjxKSbzk8R9rfKaSqG7y2vn7MfWJ8AQHHipXVt_cEf0vULk-d98?width=124&amp;height=28&amp;cropmode=none" alt="Digimon Xros Wars: Battle In the Digital World" width="124" height="28" /></a></center>');
			this.add('raw', '<center><p><a title="Digimon Showdown Players Guide" href="https://1drv.ms/b/s!AvoD6RnUzzMvgmLcX1rqT8GTnEVK" target="_blank"><img src="https://yheeqg.bn1303.livefilestore.com/y4mcqvreFTM4wIjnVqqSI98LZXT-lFFCxPBYHyHGZtWJTIGuah-spBzqvXbLiWvyJgDnrjSRFziff59ZLLBEtm_t3ZHHeKv9AY6Ml-gQpdGMhNmzaeSt0TD8wmivpfEW81jh93LSBvdXb7-cZUH2YNJwzwiyOTsy4L2dViyJqkiOCFDZhJRIPwPEWgmD7MDJnfafmoq6SN6gEfsAXMiHh529w?width=124&amp;height=42&amp;cropmode=none" alt="" width="124" height="42" /></a></p></center>');
		},
		desc: [
			"You may have thought this was Pok&eacute;mon Showdown, but I must reassure you that you were mistaken, welcome to <b>DIGIMON SHOWDOWN!!!</b>",
			"Ahem, but in all seriousness, the following developers listed below created Digimon in Pok&eacute;mon Showdown, so why not just try it out :D",
			"Ashley the Pikachu (Head Researcher, Began the project, Attack Manual, Type Chart Manual, Music Selection and Music HTML, Sprite Selection), Insist (Head Developer), AlfaStorm (Animations), VXN (Assisted other developers), HoeenHero (Assisted with Mechanics)",
			"&bullet; <a href=\"https://1drv.ms/b/s!AvoD6RnUzzMvgmLcX1rqT8GTnEVK\">Digimon Manual</a>",
		],
	},
	{
		name: "[Gen 7] Advanced Wars (BETA)",
		section: "Exiled's Custom Gamemodes",
		mod: "advancedwars",
		team: "randomAdvancedWars",
		ruleset: ['Cancel Mod', 'HP Percentage Mod'],
		desc: [
			"This metagame is about the game known as Advanced Wars, suggested by Back At My Day (and all information for this meta was supplied by him).",
			"<b>Developers:</b> Insist and Back At My Day.",
			"&bullet; <a href=\"https://pastebin.com/Nr5wRnD5\">Advanced Wars Manual</a>",
		],
	},
	{
		name: "[Gen 7] Slowtown",
		desc: [
			"Trick room is constantly active for the duration of the battle and will reapply itself every 5 turns. Concept by VXN. Coded by Insist.",
			"&bullet; <a href=\"http://exiledps.boards.net/board/22/slowtown\">Slowtown</a>",
		],
		mod: "slowtown",
		ruleset: ['[Gen 7] OU'],
		banlist: ['Sablenite', 'Snorlax'],
		unbanlist: ['Pheromosa', 'Deoxys-Speed', 'Deoxys-Attack', 'Deoxys', 'Shaymin-Sky', 'Blaziken', 'Gengarite', 'Metagrossite', 'Blazkenite'],
		onBegin: function () {
			this.trickRoom = ["Trick Room"];
			this.startNewTrickRoom = this.trickRoom[this.random(1)];
			this.add("-message", "Starting next turn, the set up another 5 rounds of " + this.startNewTrickRoom + "!");
		},
		onResidualOrder: 999,
		onResidual: function () {
			if (this.turn % 5 === 4) {
				let startNewTrickRoom = this.trickRoom[this.random(1)];
				while (startNewTrickRoom === this.trickRoom) startNewTrickRoom = this.trickRoom[this.random(1)];
				this.startNewTrickRoom = startNewTrickRoom;
				this.add("-message", "Starting next turn, the battle will set another 5 rounds of " + this.startNewTrickRoom + "!");
			}
		},
	},
	{
		name: "[Gen 7] Swapping Powers",
		desc: [
			"Power trick that's constantly there, not only swapping Attack and Defense, but Special Attack and Special Defense also. Concept by Mewth. Coded by Insist/HoeenHero.",
		],
		mod: "gen7",
		ruleset: ['[Gen 7] OU'],
		banlist: ['Furretite'],
		unbanlist: ['Deoxys-Attack', 'Deoxys', 'Deoxys-Defense', 'Deoxys-Speed', 'Aegislash', 'Aegislash-Blade', 'Darmanitan-Zen', 'Marshadow'],
		onSwitchIn: function (pokemon) {
			this.useMove("Power Trick", pokemon, pokemon, pokemon);
		},
	},
	{
		name: "[Gen 7] Action Storm",
		desc: [
			"&bullet; Coded by flufi.",
			"On switch-in, something completely random happens.",
			"(i.e a random move can be used, a random weather",
			"condition can be set, a random stat can be raised,",
			"etc.",
		],
		mod: "gen7",
		team: "random",
		ruleset: ['[Gen 7] Anything Goes', 'Team Preview'],
		banlist: ['Furretite'],
		onSwitchIn: function (pokemon) {
		let side = pokemon.side;
				let n = this.random(45);
				if (n === 1) {
					this.add('-start', pokemon, 'typechange', 'Normal');
					pokemon.types = ["Normal"];
				} else if (n === 2) {
					this.add('-start', pokemon, 'typechange', 'Fighting');
					pokemon.types = ["Fighting"];
				} else if (n === 3) {
					this.add('-start', pokemon, 'typechange', 'Psychic');
					pokemon.types = ["Psychic"];
				} else if (n === 4) {
					this.add('-start', pokemon, 'typechange', 'Ice');
					pokemon.types = ["Ice"];
				} else if (n === 5) {
					this.add('-start', pokemon, 'typechange', 'Grass');
					pokemon.types = ["Grass"];
				} else if (n === 6) {
					this.add('-start', pokemon, 'typechange', 'Fairy');
					pokemon.types = ["Fairy"];
				} else if (n === 7) {
					this.add('-start', pokemon, 'typechange', 'Dark');
					pokemon.types = ["Dark"];
				} else if (n === 8) {
					this.add('-start', pokemon, 'typechange', 'Water');
					pokemon.types = ["Water"];
				} else if (n === 9) {
					this.add('-start', pokemon, 'typechange', 'Steel');
					pokemon.types = ["Steel"];
				} else if (n === 10) {
					this.add('-start', pokemon, 'typechange', 'Fire');
					pokemon.types = ["Fire"];
				} else if (n === 11) {
					this.add('-start', pokemon, 'typechange', 'Bug');
					pokemon.types = ["Bug"];
				} else if (n === 12) {
					this.add('-start', pokemon, 'typechange', 'Electric');
					pokemon.types = ["Electric"];
				} else if (n === 13) {
					this.add('-start', pokemon, 'typechange', 'Poison');
					pokemon.types = ["Poison"];
				} else if (n === 14) {
					this.add('-start', pokemon, 'typechange', 'Ghost');
					pokemon.types = ["Ghost"];
				} else if (n === 15) {
					this.add('-start', pokemon, 'typechange', 'Rock');
					pokemon.types = ["Rock"];
				} else if (n === 16) {
					this.add('-start', pokemon, 'typechange', 'Ground');
					pokemon.types = ["Ground"];
				} else if (n === 17) {
					this.add('-start', pokemon, 'typechange', 'Flying');
					pokemon.types = ["Flying"];
				} else if (n === 18) {
					this.add('-start', pokemon, 'typechange', 'Dragon');
					pokemon.types = ["Dragon"];
				} else if (n === 19) {
					this.setTerrain('psychicterrain');
				} else if (n === 20) {
					this.setTerrain('electricterrain');
				} else if (n === 21) {
					this.setTerrain('grassyterrain');
				} else if (n === 22) {
					this.setWeather('sunnyday');
				} else if (n === 23) {
					this.setWeather('raindance');
				} else if (n === 24) {
					this.setWeather('sandstorm');
				} else if (n === 25) {
					this.setWeather('hail');
				} else if (n === 26) {
					this.useMove("Stealth Rock", pokemon, pokemon, pokemon);
				} else if (n === 27) {
					this.useMove("Spikes", pokemon, pokemon, pokemon);
				} else if (n === 28) {
					this.useMove("Toxic Spikes", pokemon, pokemon, pokemon);
				} else if (n === 29) {
					this.useMove("Power Trick", pokemon, pokemon, pokemon);
				} else if (n === 30) {
					this.useMove("Trick Room", pokemon, pokemon, pokemon);
				} else if (n === 31) {
					this.useMove("Speed Swap", pokemon, pokemon, pokemon);
				} else if (n === 32) {
					this.useMove("Trick", pokemon, pokemon, pokemon);
				} else if (n === 33) {
					this.useMove("Defog", pokemon);
				} else if (n === 34) {
					this.useMove("Self-Destruct", pokemon, pokemon, pokemon);
				} else if (n === 35) {
					this.useMove("Entrainment", pokemon, pokemon, pokemon);
				} else if (n === 36) {
					this.useMove("Role Play", pokemon, pokemon, pokemon);
				} else if (n === 37) {
					this.useMove("Shell Smash", pokemon, pokemon, pokemon);
				} else if (n === 38) {
					this.useMove("Quiver Dance", pokemon, pokemon, pokemon);
				} else if (n === 39) {
					this.useMove("Noble Roar", pokemon);
				} else if (n === 40) {
					this.useMove("Magikarp's Revenge", pokemon);
				} else if (n === 41) {
					this.useMove("Lockdown", pokemon);
				} else if (n === 42) {
					this.useMove("Spider Web", pokemon);
				} else if (n === 43) {
					this.useMove("Toxic", pokemon, pokemon, pokemon);
				} else if (n === 44) {
					this.useMove("Will-O-Wisp", pokemon, pokemon, pokemon);
				} else if (n === 45) {
					this.useMove("Thunder Wave", pokemon, pokemon, pokemon);
				}
		},
	},
	{
		name: "[Gen 7] Ashmons",
		mod: 'gen7',
		maxLevel: 50,
		defaultLevel: 50,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause', 'Ash Dex'],
	},
	{
		name: "[Gen 7] Prehistoric",
		section: "Pet Mods",
		mod: "prehistoric",
		ruleset: ['[Gen 7] Ubers'],
		banlist: ["Blue Orb"],
		desc: [
			"&bullet; Coded by flufi.",
			"A format that takes place in prehistoric times.",
			"Over 100 Pokemon get not only a new primal form, but a new signature move.",
			"",
			"NOTE: This is a long-term project and probably won't be done until June/July.",
		],
	},
	{
		name: "[Gen 7] Fakemons Random Battle",
		section: "Exiled Fakemons",
		column: 5,
		mod: "fakemons",
		team: "random",
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		desc: [
			"This is the Exiled Fakemons metagame, in which you use Exiled community created Pok&eacute.",
			"Users may submit them via the form on <b>/fakemon<b>.",
		],
	},
	{
		name: "[Gen 7] Fakemons",
		mod: "fakemons",
		section: "Exiled Fakemons",
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		desc: [
			"This is the Exiled Fakemons metagame, in which you use Exiled community created Pok&eacute.",
			"Users may submit them via the form on <b>/fakemon<b>.",
		],
	},
	{
		name: "[Gen 7] The Mewth Challenge",
		section: "The Mewth Challenge",
		column: 6,
		mod: "mewth",
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		defaultLevel: 100,
		maxLevel: 100,
		ruleset: ['Team Preview', 'Cancel Mod'],
		banlist: ['Deoxys', 'Deoxys-Speed', 'Deoxys-Defense', 'Deoxys-Attack', 'Air Balloon'],
		desc: [
			"The first part of the series of challenges Mewth has created, can you complete them all and collect all the badges?",
		],
	},
	{
		name: "[Gen 7] The Mewth Spire",
		section: "The Mewth Challenge",
		searchShow: false,
		mod: "mewth",
		column: 6,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 200,
		defaultLevel: 100,
		ruleset: ['Team Preview', 'Cancel Mod'],
		banlist: ['Deoxys', 'Deoxys-Speed', 'Deoxys-Defense', 'Deoxys-Attack', 'Air Balloon'],
		desc: [
			"The second stage of The Mewth Challenge, prepare for the wrath of the first region's Elite Four and the <b>CHAMPION!!!</b>",
		],
	},
	{
		name: "[Gen 7] LC Mix and Mega",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any little cup Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"http://exiledps.boards.net/board/18/lc-mix-mega/\">Mix and Mega</a>",
		],
		mod: 'mixandmega',
		defaultLevel: 5,
		ruleset: ['Team Preview', 'Cancel Mod', 'Little Cup', 'Pokemon', 'Illegal', 'Sleep Clause Mod'],
		banlist: ['Baton Pass', 'NFE', 'Cranidos', 'Eevium Z'],
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
				} else {
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
			if (template.tier === 'Uber' || template.tier === 'Bank-Uber' || set.ability === 'Power Construct' || uberStones.includes(item.id)) return;
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
	},
];
