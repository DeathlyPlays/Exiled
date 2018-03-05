'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// US/UM Singles
	///////////////////////////////////////////////////////////////////
	{
		section: "US/UM Singles",
	},
	{
		name: "[Gen 7] Random Battle",
		desc: [
			`Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable.`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3591157/">Sets and Suggestions</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3616946/">Role Compendium</a>`,
		],

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
			`&bullet; <a href="http://www.smogon.com/forums/threads/3621042/">OU Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3587177/">OU Banlist</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3621329/">OU Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3626219/">OU Sample Teams</a>`,
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 7] Ubers",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3587184/">Ubers Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3623296/">Ubers Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3599816/">Ubers Sample Teams</a>`,
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: ['Baton Pass'],
	},
	{
		name: "[Gen 7] UU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3627043/">UU Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3620980/">UU Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3621217/">UU Sample Teams</a>`,
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Drought', 'Kommonium Z', 'Mewnium Z'],
	},
	{
		name: "[Gen 7] RU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3625382/">RU Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3622740/">RU Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3622057/">RU Sample Teams</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['[Gen 7] UU'],
		banlist: ['UU', 'BL2', 'Aurora Veil'],
		unbanlist: ['Drought'],
	},
	{
		name: "[Gen 7] RU (suspect test)",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3625382/\">RU Suspect Test</a>"],

		mod: 'gen7',
		challengeShow: false,
		ruleset: ['[Gen 7] RU'],
	},
	{
		name: "[Gen 7] NU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3628085/">NU Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3622107/">NU Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3606112/">NU Sample Teams</a>`,
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] RU'],
		banlist: ['RU', 'BL3', 'Drought'],
	},
	{
		name: "[Gen 7] PU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3625646/">PU Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3614892/">PU Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3614470/">PU Sample Teams</a>`,
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] NU'],
		banlist: ['NU', 'BL4'],
	},
	{
		name: "[Gen 7] LC",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3587196/">LC Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/dex/sm/formats/lc/">LC Banlist</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3621440/">LC Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3588679/">LC Sample Teams</a>`,
		],

		mod: 'gen7',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Little Cup'],
		banlist: [
			'Aipom', 'Cutiefly', 'Drifloon', 'Gligar', 'Gothita', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Vulpix-Base', 'Yanma',
			'Eevium Z', 'Dragon Rage', 'Sonic Boom',
		],
	},
	{
		name: "[Gen 7] Monotype",
		desc: [
			`All the Pok&eacute;mon on a team must share a type.`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3621036/">Monotype Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3622349">Monotype Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3599682/">Monotype Sample Teams</a>`,
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon',
			'Ho-Oh', 'Hoopa-Unbound', 'Kangaskhan-Mega', 'Kartana', 'Kyogre', 'Kyurem-White', 'Lucario-Mega', 'Lugia', 'Lunala', 'Magearna',
			'Marshadow', 'Mawile-Mega', 'Medicham-Mega', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
			'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Tapu Lele', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde',
			'Battle Bond', 'Shadow Tag', 'Damp Rock', 'Smooth Rock', 'Terrain Extender', 'Baton Pass',
		],
	},
	{
		name: "[Gen 7] Anything Goes",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3587441/">Anything Goes</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3591711/">AG Resources</a>`,
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7] CAP",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3587865/">CAP Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3597893/">CAP Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/7203358/">CAP Sample Teams</a>`,
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU', 'Allow CAP'],
		banlist: ['Tomohawk + Earth Power', 'Tomohawk + Reflect'],
	},
	{
		name: "[Gen 7] CAP LC",
		desc: [`&bullet; <a href="http://www.smogon.com/forums/threads/3599594/">CAP LC</a>`],

		mod: 'gen7',
		searchShow: false,
		maxLevel: 5,
		ruleset: ['[Gen 7] LC', 'Allow CAP'],
	},
	{
		name: "[Gen 7] Battle Spot Singles",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3601012/">Introduction to Battle Spot Singles</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3605970/">Battle Spot Singles Viability Ranking</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3601658/">Battle Spot Singles Roles Compendium</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3593055/">Battle Spot Singles Sample Teams</a>`,
		],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU'],
		requirePentagon: true,
	},
	{
		name: "[Gen 7] Battle Spot Special 8",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3626059/">Battle Spot Special 8</a>`,
		],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Unreleased', 'Illegal'],
		onValidateTeam: function (team) {
			const legends = ['Mewtwo', 'Mew', 'Lugia', 'Ho-Oh', 'Celebi', 'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys', 'Dialga', 'Palkia', 'Giratina', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus', 'Victini', 'Reshiram', 'Zekrom', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect', 'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion', 'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow'];
			let hasLegend = false;
			for (const set of team) {
				const pokemon = this.getTemplate(set.species).baseSpecies;
				if (legends.includes(pokemon)) {
					if (hasLegend) return ["You can only use one legendary Pok\u00E9mon."];
					hasLegend = true;
				}
			}
		},
	},
	{
		name: "[Gen 7] Ultra Sinnoh Classic",
		desc: [`&bullet; <a href="http://www.smogon.com/forums/threads/3627404/">Ultra Sinnoh Classic Discussion</a>`],

		mod: 'gen7',
		forcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Sinnoh Pokedex'],
		onValidateSet: function (set) {
			const item = this.getItem(set.item);
			if (item.megaStone) {
				return [`(${set.name} is holding ${item.name})`, `Mega Stones are banned in Ultra Sinnoh Classic.`];
			}
			if (item.zMove) {
				return [`(${set.name} is holding ${item.name})`, `Z-Crystals are banned in Ultra Sinnoh Classic.`];
			}
		},
	},
	{
		name: "[Gen 7] Custom Game",

		mod: 'pmd',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		teamLength: {
			validate: [1, 60],
			battle: 60,
		},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// US/UM Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "US/UM Doubles",
	},
	{
		name: "[Gen 7] Random Doubles Battle",
		desc: [`&bullet; <a href="http://www.smogon.com/forums/threads/3601525/">Sets and Suggestions</a>`],

		mod: 'gen7',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Doubles OU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3629155/">Doubles OU Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3623347/">Doubles OU Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3590987/">Doubles OU Sample Teams</a>`,
		],

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard Doubles', 'Swagger Clause', 'Team Preview'],
		banlist: ['DUber', 'Power Construct', 'Eevium Z', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder'],
	},
	{
		name: "[Gen 7] Doubles OU (suspect test)",
		desc: [`&bullet; <a href="http://www.smogon.com/forums/threads/3629155/">Doubles OU Suspect Test</a>`],

		mod: 'gen7',
		gameType: 'doubles',
		challengeShow: false,
		ruleset: ['[Gen 7] Doubles OU'],
	},
	{
		name: "[Gen 7] Doubles Ubers",

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Dark Void'],
	},
	{
		name: "[Gen 7] Doubles UU",
		desc: [`&bullet; <a href="http://www.smogon.com/forums/threads/3598014/">Doubles UU Metagame Discussion</a>`],

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['[Gen 7] Doubles OU'],
		banlist: ['DOU', 'DBL'],
	},
	{
		name: "[Gen 7] VGC 2018",

		mod: 'gen7',
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		timer: {starting: 6 * 60 + 30 - 10, perTurn: 10, maxPerTurn: 55, maxFirstTurn: 90, timeoutAutoChoose: true},
		ruleset: ['Pokemon', 'Standard GBU'],
		banlist: ['Unown'],
		requirePlus: true,
	},
	{
		name: "[Gen 7] VGC 2017",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3583926/">VGC 2017 Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3591794/">VGC 2017 Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3590391/">VGC 2017 Sample Teams</a>`,
		],

		mod: 'vgc17',
		gameType: 'doubles',
		searchShow: false,
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		timer: {starting: 15 * 60 - 10, perTurn: 10, maxPerTurn: 60, maxFirstTurn: 90, timeoutAutoChoose: true},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod', 'Alola Pokedex'],
		banlist: ['Illegal', 'Unreleased', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zygarde', 'Mega'],
		requirePlus: true,
	},
	{
		name: "[Gen 7] Battle Spot Doubles",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3595001/">Battle Spot Doubles Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3593890/">Battle Spot Doubles Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3595859/">Battle Spot Doubles Sample Teams</a>`,
		],

		mod: 'gen7',
		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU'],
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
		teamLength: {
			validate: [2, 24],
			battle: 24,
		},
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
		name: "[Gen 7] 2v2 Doubles",
		desc: [
			`Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3606989/">2v2 Doubles</a>`,
		],

		mod: 'gen7',
		gameType: 'doubles',
		// searchShow: false,
		teamLength: {
			validate: [2, 4],
			battle: 2,
		},
		ruleset: ['Gen 7] Doubles OU'],
		banlist: ['Tapu Lele', 'Focus Sash', 'Perish Song'],
	},
	{
		name: "[Gen 7] Nature Swap",
		desc: [
			`Pok&eacute;mon have their base stats swapped depending on their nature.`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3612727/">Nature Swap</a>`,
		],

		mod: 'natureswap',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Blissey', 'Chansey', 'Cloyster', 'Hoopa-Unbound', 'Kyurem-Black'],
	},
	{
		section: "Other Metagames",
		column: 2,
	},
	{
		name: "[Gen 7] Balanced Hackmons",
		desc: [
			`Anything that can be hacked in-game and is usable in local battles is allowed.`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3587475/">Balanced Hackmons</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3588586/">BH Suspects and Bans Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3593766/">BH Resources</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['Pokemon', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Groudon-Primal', 'Arena Trap', 'Huge Power', 'Innards Out', 'Magnet Pull', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard', 'Gengarite', 'Chatter', 'Comatose + Sleep Talk'],
	},
	{
		name: "[Gen 7] Balanced Hackmons (suspect test)",
		desc: [`&bullet; <a href="http://www.smogon.com/forums/threads/3628905/">Balanced Hackmons Suspect Test</a>`],

		mod: 'gen7',
		ruleset: ['[Gen 7] Balanced Hackmons'],
		banlist: ['Psychic Surge'],
	},
	{
		name: "[Gen 7] 1v1",
		desc: [
			`Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3587523/">1v1</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3592842/">1v1 Resources</a>`,
		],

		mod: 'gen7',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: [
			'Illegal', 'Unreleased', 'Arceus', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Defense', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh',
			'Jirachi', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings',
			'Necrozma-Dusk-Mane', 'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Focus Sash', 'Flash', 'Kinesis', 'Leaf Tornado', 'Mirror Shot', 'Mud Bomb', 'Mud-Slap', 'Muddy Water', 'Night Daze', 'Octazooka', 'Perish Song', 'Sand Attack', 'Smokescreen',
			'Chansey + Charm + Seismic Toss', 'Chansey + Charm + Psywave',
		],
	},
	{
		name: "[Gen 7] Mix and Mega",
		desc: [
			`Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3587740/">Mix and Mega</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3591580/">Mix and Mega Resources</a>`,
		],

		mod: 'mixandmega',
		ruleset: ['Pokemon', 'Standard', 'Mega Rayquaza Clause', 'Team Preview'],
		banlist: ['Shadow Tag', 'Gengarite', 'Baton Pass', 'Electrify'],
		restrictedStones: ['Beedrillite', 'Blazikenite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Pidgeotite', 'Ultranecrozium Z'],
		cannotMega: [
			'Arceus', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Dragonite', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Regigigas', 'Reshiram', 'Slaking', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
		],
		onValidateTeam: function (team) {
			let itemTable = {};
			for (const set of team) {
				let item = this.getItem(set.item);
				if (!item) continue;
				if (itemTable[item] && item.megaStone) return ["You are limited to one of each Mega Stone.", "(You have more than one " + this.getItem(item).name + ")"];
				if (itemTable[item] && (item.id === 'blueorb' || item.id === 'redorb')) return ["You are limited to one of each Primal Orb.", "(You have more than one " + this.getItem(item).name + ")"];
				itemTable[item] = true;
			}
		},
		onValidateSet: function (set, format) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb' && item.id !== 'ultranecroziumz') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb') || (template.species.substr(0, 9) === 'Necrozma-' && item.id === 'ultranecroziumz')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			let uberStones = format.restrictedStones || [];
			let uberPokemon = format.cannotMega || [];
			if (uberPokemon.includes(template.name) || set.ability === 'Power Construct' || uberStones.includes(item.name)) return ["" + template.species + " is not allowed to hold " + item.name + "."];
		},
		onBegin: function () {
			for (const pokemon of this.p1.pokemon.concat(this.p2.pokemon)) {
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
			`Pok&eacute;mon can use any ability, barring the few that are restricted to their natural users.`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3587901/">Almost Any Ability</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3595753/">AAA Resources</a>`,
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU', 'Ability Clause', 'Ignore Illegal Abilities'],
		banlist: ['Archeops', 'Dragonite', 'Hoopa-Unbound', 'Kartana', 'Keldeo', 'Kyurem-Black', 'Regigigas', 'Shedinja', 'Slaking', 'Terrakion'],
		unbanlist: ['Genesect', 'Landorus', 'Metagross-Mega', 'Naganadel'],
		restrictedAbilities: [
			'Comatose', 'Contrary', 'Fluffy', 'Fur Coat', 'Huge Power', 'Illusion', 'Imposter', 'Innards Out',
			'Parental Bond', 'Protean', 'Pure Power', 'Simple', 'Speed Boost', 'Stakeout', 'Water Bubble', 'Wonder Guard',
		],
		onValidateSet: function (set, format) {
			let restrictedAbilities = format.restrictedAbilities || [];
			if (restrictedAbilities.includes(set.ability)) {
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
		name: "[Gen 7] Camomons",
		desc: [
			`Pok&eacute;mon change type to match their first two moves.`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3598418/">Camomons</a>`,
		],
		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Kartana', 'Kyurem-Black', 'Shedinja'],
		onModifyTemplate: function (template, target, source) {
			if (source) return;
			let types = [...new Set(target.baseMoveSlots.slice(0, 2).map(move => this.getMove(move.id).type))];
			return Object.assign({}, template, {types: types});
		},
		onSwitchInPriority: 2,
		onSwitchIn: function (pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onAfterMega: function (pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 7] STABmons",
		desc: [
			`Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3587949/">STABmons</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['[Gen 7] OU', 'STABmons Move Legality'],
		banlist: ['Blacephalon', 'Kartana', 'Komala', 'Kyurem-Black', 'Silvally', 'Tapu Koko', 'Tapu Lele', 'Aerodactylite', 'King\'s Rock', 'Metagrossite', 'Razor Fang'],
		restrictedMoves: ['Acupressure', 'Belly Drum', 'Chatter', 'Geomancy', 'Lovely Kiss', 'Shell Smash', 'Shift Gear', 'Thousand Arrows'],
	},
	{
		name: "[Gen 6] Gen-NEXT OU",

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
		name: "[Gen 7] Battle Factory",
		desc: [`Randomized teams of Pok&eacute;mon for a generated Smogon tier with sets that are competitively viable.`],

		mod: 'gen7',
		team: 'randomFactory',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 7] BSS Factory",
		desc: [
			`Randomized 3v3 Singles featuring Pok&eacute;mon and movesets popular in Battle Spot Singles.`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3604845/">Information and Suggestions Thread</a>`,
		],

		mod: 'gen7',
		team: 'randomBSSFactory',
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU'],
	},
	{
		name: "[Gen 7] Monotype Random Battle",

		mod: 'gen7',
		team: 'random',
		searchShow: false,
		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
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
		name: "[Gen 7] Challenge Cup 2v2",

		mod: 'gen7',
		team: 'randomCC',
		gameType: 'doubles',
		teamLength: {
			battle: 2,
		},
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
	},
	{
		name: "[Gen 7] Hackmons Cup",
		desc: [`Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item.`],

		mod: 'gen7',
		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'PotD'],
		onModifyTemplate: function (template, pokemon) {
			let tsTemplate = Object.assign({}, template);
			const boosts = {'UU': 10, 'BL2': 10, 'RU': 20, 'BL3': 20, 'NU': 30, 'BL4': 30, 'PU': 40, 'NFE': 40, 'LC Uber': 40, 'LC': 40};
			let tier = tsTemplate.tier;
			if (pokemon.set.item) {
				let item = this.getItem(pokemon.set.item);
				if (item.megaEvolves === tsTemplate.species) tier = this.getTemplate(item.megaStone).tier;
			}
			if (tier.charAt(0) === '(') tier = tier.slice(1, -1);
			let boost = (tier in boosts) ? boosts[tier] : 0;
			if (boost > 0 && (pokemon.set.ability === 'Drizzle' || pokemon.set.item === 'Mewnium Z')) boost = 0;
			if (boost > 10 && pokemon.set.moves.includes('auroraveil')) boost = 10;
			if (boost > 20 && pokemon.set.ability === 'Drought') boost = 20;
			tsTemplate.baseStats = Object.assign({}, tsTemplate.baseStats);
			for (let statName in tsTemplate.baseStats) {
				tsTemplate.baseStats[statName] = this.clampIntRange(tsTemplate.baseStats[statName] + boost, 1, 255);
			}
			return tsTemplate;
		},
	},
	{
		name: "[Gen 7] Doubles Hackmons Cup",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'PotD'],
	},
	{
		name: "[Gen 6] Random Battle",

		mod: 'gen6',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 6] Battle Factory",
		desc: [`Randomized teams of Pok&eacute;mon for a generated Smogon tier with sets that are competitively viable.`],

		mod: 'gen6',
		team: 'randomGen6Factory',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 5] Random Battle",

		mod: 'gen5',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 4] Random Battle",

		mod: 'gen4',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 3] Random Battle",

		mod: 'gen3',
		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] Random Battle",

		mod: 'gen2',
		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 1] Random Battle",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 1] Challenge Cup",

		mod: 'gen1',
		team: 'randomCC',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},

	// RoA Spotlight
	///////////////////////////////////////////////////////////////////

	{
		section: "RoA Spotlight",
		column: 3,
	},
	{
		name: "[Gen 1] 1v1",
		desc: [`&bullet; <a href="http://www.smogon.com/forums/posts/7523781/">RBY 1v1</a>`],

		mod: 'gen1',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['[Gen 1] OU'],
		banlist: [
			'Flash', 'Kinesis', 'Sand Attack', 'Smokescreen',
			'Bind', 'Clamp', 'Fire Spin', 'Wrap',
			'Explosion', 'Self-Destruct',
			'Hypnosis', 'Lovely Kiss', 'Sing', 'Sleep Powder', 'Spore',
		],
	},
	{
		name: "[Gen 4] UU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3532624/">DPP UU Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3503638/">DPP UU Viability Ranking</a>`,
		],

		mod: 'gen4',
		// searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL'],
	},
	{
		name: "[Gen 3] OU (no Tyranitar)",

		mod: 'gen3',
		ruleset: ['[Gen 3] OU'],
		banlist: ['Tyranitar'],
	},

	// Past Gens OU
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Gens OU",
		column: 3,
	},
	{
		name: "[Gen 6] OU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/dex/xy/tags/ou/">ORAS OU Banlist</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3623399/">ORAS OU Viability Rankings</a>`,
		],

		mod: 'gen6',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Arena Trap', 'Shadow Tag', 'Soul Dew'],
	},
	{
		name: "[Gen 5] OU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3599678/">BW2 OU Viability Ranking</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
		],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
	},
	{
		name: "[Gen 4] OU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3506147/">DPP OU Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3551992/">DPP OU Viability Ranking</a>`,
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 3] OU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3503019/">ADV OU Viability Ranking</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/6431087/">ADV Sample Teams</a>`,
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain'],
	},
	{
		name: "[Gen 2] OU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3556533/">GSC OU Viability Ranking</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/6431086/">GSC Sample Teams</a>`,
		],

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] OU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3572352/">RBY OU Viability Ranking</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/6431045/">RBY Sample Teams</a>`,
		],

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},

	// OR/AS Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "OR/AS Singles",
		column: 3,
	},
	{
		name: "[Gen 6] Ubers",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3522911/">ORAS Ubers</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3535106/">ORAS Ubers Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 6] UU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/dex/xy/tags/uu/">ORAS UU Banlist</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3598164/">ORAS UU Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['[Gen 6] OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Drought', 'Baton Pass'],
	},
	{
		name: "[Gen 6] RU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/dex/xy/tags/ru/">ORAS RU Banlist</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3574583/">ORAS RU Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['[Gen 6] UU'],
		banlist: ['UU', 'BL2'],
	},
	{
		name: "[Gen 6] NU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/dex/xy/tags/nu/">ORAS NU Banlist</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3555650/">ORAS NU Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['[Gen 6] RU'],
		banlist: ['RU', 'BL3'],
	},
	{
		name: "[Gen 6] PU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/dex/xy/tags/pu/">ORAS PU Banlist</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3528743/">ORAS PU Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['[Gen 6] NU'],
		banlist: ['NU', 'BL4', 'Chatter'],
		unbanlist: ['Baton Pass'],
	},
	{
		name: "[Gen 6] LC",
		desc: [
			`&bullet; <a href="http://www.smogon.com/dex/xy/formats/lc/">ORAS LC Banlist</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3547566/">ORAS LC Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger'],
	},
	{
		name: "[Gen 6] Monotype",
		desc: [`&bullet; <a href="http://www.smogon.com/forums/posts/7421332/">ORAS Monotype</a>`],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Aegislash', 'Altaria-Mega', 'Arceus', 'Blaziken', 'Charizard-Mega-X', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Gengar-Mega',
			'Giratina', 'Greninja', 'Groudon', 'Ho-Oh', 'Hoopa-Unbound', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-White', 'Lucario-Mega', 'Lugia', 'Mawile-Mega', 'Metagross-Mega',
			'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Sableye-Mega', 'Salamence-Mega', 'Shaymin-Sky', 'Slowbro-Mega', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Damp Rock', 'Smooth Rock', 'Soul Dew',
		],
	},
	{
		name: "[Gen 6] Anything Goes",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3523229/">ORAS Anything Goes</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3548945/">ORAS AG Resources</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 6] CAP",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3537407/">ORAS CAP Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3545628/">ORAS CAP Viability Rankings</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/5594694/">ORAS CAP Sample Teams</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		ruleset: ['[Gen 6] OU', 'Allow CAP'],
	},
	{
		name: "[Gen 6] Battle Spot Singles",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3527960/">ORAS Battle Spot Singles</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3554616/">ORAS BSS Viability Rankings</a>`,
		],

		mod: 'gen6',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU'],
		requirePentagon: true,
	},
	{
		name: "[Gen 6] Custom Game",

		mod: 'gen6',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// OR/AS Doubles/Triples
	///////////////////////////////////////////////////////////////////

	{
		section: "OR/AS Doubles/Triples",
	},
	{
		name: "[Gen 6] Doubles OU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3498688/">ORAS Doubles OU Banlist</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3535930/">ORAS Doubles OU Viability Rankings</a>`,
		],

		mod: 'gen6',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard Doubles', 'Swagger Clause', 'Team Preview'],
		banlist: ['DUber', 'Soul Dew', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder'],
	},
	{
		name: "[Gen 6] VGC 2016",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3558332/">VGC 2016 Rules</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3580592/">VGC 2016 Viability Rankings</a>`,
		],

		mod: 'gen6',
		gameType: 'doubles',
		searchShow: false,
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
			const legends = ['Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Palkia', 'Giratina', 'Reshiram', 'Zekrom', 'Kyurem', 'Xerneas', 'Yveltal', 'Zygarde'];
			let n = 0;
			for (const set of team) {
				let baseSpecies = this.getTemplate(set.species).baseSpecies;
				if (legends.includes(baseSpecies)) n++;
				if (n > 2) return ["You can only use up to two legendary Pok\u00E9mon."];
			}
		},
	},
	{
		name: "[Gen 6] Battle Spot Doubles",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3560820/">ORAS Battle Spot Doubles Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3560824/">ORAS BSD Viability Rankings</a>`,
		],

		mod: 'gen6',
		gameType: 'doubles',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU'],
		requirePentagon: true,
	},
	{
		name: "[Gen 6] Doubles Custom Game",

		mod: 'gen6',
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
		name: "[Gen 6] Battle Spot Triples",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3533914/">ORAS Battle Spot Triples Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3549201/">ORAS BST Viability Rankings</a>`,
		],

		mod: 'gen6',
		gameType: 'triples',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [6, 6],
		},
		ruleset: ['Pokemon', 'Standard GBU'],
		requirePentagon: true,
	},
	{
		name: "[Gen 6] Triples Custom Game",

		mod: 'gen6',
		gameType: 'triples',
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		teamLength: {
			validate: [1, 24],
			battle: 24,
		},
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// B2/W2 Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "B2/W2 Singles",
		column: 4,
	},
	{
		name: "[Gen 5] Ubers",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3550881/">BW2 Ubers Viability Ranking</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/6446463/">BW2 Ubers Sample Teams</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
	},
	{
		name: "[Gen 5] UU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3474024/">BW2 UU Viability Ranking</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning'],
	},
	{
		name: "[Gen 5] RU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3473124/">BW2 RU Viability Ranking</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning'],
	},
	{
		name: "[Gen 5] NU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3484121/">BW2 NU Viability Ranking</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist'],
	},
	{
		name: "[Gen 5] LC",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3485860/">BW2 LC Viability Ranking</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
		],

		mod: 'gen5',
		searchShow: false,
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
		ruleset: ['Pokemon', 'Standard GBU'],
		banlist: ['Dark Void', 'Sky Drop'],
	},
	{
		name: "[Gen 5] Custom Game",

		mod: 'pmd',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// B2/W2 Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: 'B2/W2 Doubles',
		column: 4,
	},
	{
		name: "[Gen 5] Doubles OU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3533424/">BW2 Doubles Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3533421/">BW2 Doubles Viability Ranking</a>`,
		],

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Swagger Clause', 'Team Preview'],
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
		ruleset: ['Pokemon', 'Standard GBU'],
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

	// DPP Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "DPP Singles",
		column: 4,
	},
	{
		name: "[Gen 4] Ubers",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/posts/7433831/">DPP Ubers Information &amp; Resources</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3505128/">DPP Ubers Viability Ranking</a>`,
		],

		mod: 'gen4',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus'],
	},
	{
		name: "[Gen 4] NU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3583742/">DPP NU Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/3512254/">DPP NU Viability Ranking</a>`,
		],

		mod: 'gen4',
		searchShow: false,
		ruleset: ['[Gen 4] UU'],
		banlist: ['UU', 'BL2'],
	},
	{
		name: "[Gen 4] LC",
		desc: [
			`&bullet; <a href="http://www.smogon.com/dp/articles/little_cup_guide">DPP LC Guide</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/7336500/">DPP LC Viability Ranking</a>`,
		],

		mod: 'gen4',
		searchShow: false,
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

	// DPP Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "DPP Doubles",
		column: 4,
	},
	{
		name: "[Gen 4] Doubles OU",
		desc: [`&bullet; <a href="http://www.smogon.com/forums/threads/3618411/">DPP Doubles</a>`],

		mod: 'gen4',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['[Gen 4] OU'],
		banlist: ['Explosion', 'Soul Dew'],
		unbanlist: ['Garchomp', 'Latias', 'Latios', 'Manaphy', 'Mew', 'Salamence', 'Wobbuffet', 'Wynaut'],
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

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Generations",
		column: 4,
	},
	{
		name: "[Gen 3] Ubers",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/posts/7433832/">ADV Ubers Information &amp; Resources</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3536426/">ADV Ubers Viability Ranking</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Wobbuffet + Leftovers'],
	},
	{
		name: "[Gen 3] UU",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3585923/">ADV UU Metagame Discussion</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3548578/">ADV UU Viability Rankings</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		ruleset: ['[Gen 3] OU'],
		banlist: ['OU', 'BL'],
	},
	{
		name: "[Gen 3] Custom Game",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 3] Doubles Custom Game",

		mod: 'gen3',
		gameType: 'doubles',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 2] Ubers",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/posts/7433879/">GSC Ubers Information &amp; Resources</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/6431086/">GSC Sample Teams</a>`,
		],

		mod: 'gen2',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] UU",
		desc: [`&bullet; <a href="http://www.smogon.com/forums/threads/3576710/">GSC UU</a>`],

		mod: 'gen2',
		searchShow: false,
		ruleset: ['[Gen 2] OU'],
		banlist: ['OU', 'BL'],
	},
	{
		name: "[Gen 2] Custom Game",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Ubers",
		desc: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3541329/">RBY Ubers Viability Ranking</a>`,
			`&bullet; <a href="http://www.smogon.com/forums/posts/6431045/">RBY Sample Teams</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 1] OU (tradeback)",
		desc: [
			`RBY OU with movepool additions from the Time Capsule.`,
			`&bullet; <a href="http://www.smogon.com/articles/rby-tradebacks-ou/">Information</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Allow Tradeback', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber', 'Unreleased', 'Illegal',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
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
	{
		section: "" + Config.serverName + "'s Custom Gamemodes",
		column: 5,
	},
	{
		name: "[Gen 7] Scalemons",
		desc: [
			"All Pok&eacute;mon have their stats, barring HP, scaled to give them a BST of around 600.",
			"&bullet; <a href=\"https://docs.google.com/spreadsheets/d/1Qg9Q2KC2U7aSfOb25rBxGZ7A-uvYM6xNwjdQsclp56E/edit#gid=1841107233\">Spreadsheet of all stats</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview'],
		banlist: ['Deep Sea Scale', 'Deep Sea Tooth', 'Light Ball', 'Thick Club', 'Baton Pass'],
		onModifyTemplate: function (template) {
			let bst = 0;
			let hp = template.baseStats['hp'];
			Object.values(template.baseStats).forEach(stat => { bst += stat; });
			for (let i in template.baseStats) {
				template.baseStats['hp'] = hp;
				template.baseStats[i] = Math.floor((template.baseStats[i] * (600 - template.baseStats['hp'])) / (bst - template.baseStats['hp']));
				if (template.baseStats[i] > 255) template.baseStats[i] = 255;
			}
			return template;
		},
	},
	{
		name: "[Gen 7] Dewdrop Super Staff Bros.",
		mod: 'dssb',
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
			this.add('message', "For more information on a user's staffmon, use /dssb (authed user's name)!");
		},
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.name);
			if (!pokemon.template.isMega) pokemon.canMegaEvo = this.canMegaEvo(pokemon);
			//Type changes
			if (name === 'wobbleleez' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Fairy');
				pokemon.types = ["Psychic", "Fairy"];
			}
			if (name === 'douglasgamer' && !pokemon.illusion) {
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
		},
	},
	{
		name: "[Gen 7] Rise of PU",
		desc: ["&bullet; Give PU Pokemon time to shine! Many PU Pokemon will be buffed to fit the OU metagame.",
			"&bullet; <a href=\"http://flufi.boards.net/thread/3/usm-rise-pu-viability-rankings\">Rise of PU Viability Rankings</a>",
		],
		mod: "riseofpu",
		ruleset: ['[Gen 7] OU'],
		banlist: [],
		unbanlist: [],
	},
	{
		name: "[Gen 7] Five Move Frenzy",
		desc: [
			"Pokemon can use five moves instead of four! Coded by Lycanium Z",
		],
		mod: 'fivemovefrenzy',
		ruleset: ['[Gen 7] OU'],
	},
	{
		name: "[Gen 7] Plates and Dinner",
		mod: "gen7",
		ruleset: ['[Gen 7] OU'],
		desc: [
			"Created by Mewth",
			"In this OM we will serve you up a nice tray of elemental plates. In this, if you give your pokemon a plate to hold they will gain the type to replace their secondary type and gain all the moves of the plate.",
		],
		unbanlist: [],
		banlist: [""],
	},
	{ //Thanks urkerab for the Cross Evolution code :)
		name: "[Gen 7] Frantic Fusions",
		desc: [
			"No current description.",
		],
		mod: 'franticfusions',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Uber', 'Unreleased', 'Shadow Tag', "Assist", "Shedinja", "Huge Power", "Pure Power", 'Medichamite', 'Swoobat', 'CAP', 'Kyurem-Black'],
		suspect: "Nothing Yet (Test)",
		onModifyTemplate: function (template, pokemon) {
			let fusionTemplate = this.getTemplate(pokemon.name), mixedTemplate = Object.assign({}, template);
			if (!fusionTemplate.exists) return template;
			try {
				mixedTemplate.baseSpecies = mixedTemplate.species = template.species;
				mixedTemplate.weightkg = Math.max(0.1, (template.weightkg + fusionTemplate.weightkg) / 2);

				mixedTemplate.baseStats = {};
				for (let statid in template.baseStats) {
					mixedTemplate.baseStats[statid] = (template.baseStats[statid] + fusionTemplate.baseStats[statid]) / 2;
				}
				pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * mixedTemplate.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] >> 2) + 100) * pokemon.level / 100 + 10);

				mixedTemplate.types = template.types.slice();
				let shiny = (pokemon.set.shiny && fusionTemplate.types[1]) ? 1 : 0;
				if (mixedTemplate.types[0] !== fusionTemplate.types[shiny]) mixedTemplate.types[1] = fusionTemplate.types[shiny];
				else mixedTemplate.types.length = 1;
				pokemon.fusion = fusionTemplate.baseSpecies;
				pokemon.abilitwo = toId(fusionTemplate.abilities[0]);
			} catch (e) {
				this.add('-hint', 'Failed to fuse ' + template.species + ' and ' + fusionTemplate.species + '. Please report this error so that it can be fixed.');
			}
			return mixedTemplate;
		},
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			let types = pokemon.types;
			if (!pokemon.fusetype) {
				pokemon.fusetype = types;
			} else {
				pokemon.types = pokemon.fusetype;
			}
			let statusability = {
				"aerilate": true,
				"aurabreak": true,
				"flashfire": true,
				"parentalbond": true,
				"pixilate": true,
				"refrigerate": true,
				"sheerforce": true,
				"slowstart": true,
				"truant": true,
				"unburden": true,
				"zenmode": true,
			};
			let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
			if (pokemon.abilitwo !== pokemon.ability) pokemon.addVolatile(sec); //Second Ability! YAYAYAY
			if (pokemon.fusion && !pokemon.hasAbility("illusion")) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[silent]');
			}
		},
		onAfterMega: function (pokemon) {
			if (pokemon.abilitwo !== pokemon.ability) {
				let statusability = {
					"aerilate": true,
					"aurabreak": true,
					"flashfire": true,
					"parentalbond": true,
					"pixilate": true,
					"refrigerate": true,
					"sheerforce": true,
					"slowstart": true,
					"truant": true,
					"unburden": true,
					"zenmode": true,
				};
				let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
				pokemon.removeVolatile(sec);
			}
			pokemon.types = pokemon.fusetype;
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateSet: function (set, teamHas) {
			let problems = [];
			if (!set.name || set.name === set.species) return;
			let template = this.getTemplate(set.species);
			let fusionTemplate = this.getTemplate(set.name);
			let banlist = {
				"shedinja": true,
				"hugepower": true,
				"purepower": true,
			};
			if (!fusionTemplate.exists) return;
			let unobtainable = {
				'Darmanitan-Zen': true,
				'Greninja-Ash': true,
				'Zygarde-Complete': true,
				'Meloetta-Pirouette': true,
				'Castform-Snowy': true,
				'Castform-Sunny': true,
				'Castform-Rainy': true,
				'Aegislash-Blade': true,
			};
			let types = Object.keys(this.data.TypeChart);
			for (let i = 0; i < types.length; i++) {
				unobtainable["Silvally-" + types[i]] = true;
			}
			if (unobtainable[fusionTemplate.species]) problems.push("You cannot fuse with " + fusionTemplate.species + " since it needs to have a specific ability or an item, or transforms inbattle.");
			let canHaveAbility = false;
			if (fusionTemplate.isUnreleased) problems.push("You cannot fuse with a Unreleased Pokemon. (" + set.species + " has nickname " + set.name + ", which is unreleased)");
			if (fusionTemplate.isMega) problems.push("You cannot fuse with a Mega Pokemon. (" + set.species + " has nickname " + set.name + ")");
			if (toId(fusionTemplate.tier).includes("uber")) problems.push("You cannot fuse with an Uber. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			if (toId(fusionTemplate.tier) === "cap" || toId(template.tier) === "cap") problems.push("You cannot fuse with an fake Pokemon. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			if (banlist[toId(fusionTemplate.species)]) problems.push("Fusing with " + fusionTemplate.species + " is banned. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			for (let a in template.abilities) {
				if ((template.abilities[a] === set.ability) && !banlist[toId(template.abilities[a])]) {
					canHaveAbility = true;
				}
			}
			if (!canHaveAbility) return ["" + set.species + " cannot have " + set.ability + "."];
			let added = {};
			let movepool = [];
			let prevo = template.isMega ? this.getTemplate(template.species.substring(0, template.species.length - 5)).prevo : template.prevo;

			if (!this.data.Learnsets[toId(fusionTemplate.species)]) {
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species.split("-")[0])].learnset;
			} else {
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species)].learnset;
			}
			if (!template.learnset) {
				template.learnset = this.data.Learnsets[toId(template.species.split("-")[0])].learnset;
			} else {
				template.learnset = this.data.Learnsets[toId(template.species)].learnset;
			}
			do {
				added[template.species] = true;
				movepool = movepool.concat(Object.keys(template.learnset));
				movepool = movepool.concat(Object.keys(fusionTemplate.learnset));
			} while (template && template.species && !added[template.species]);
			while (prevo) {
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
			}
			prevo = fusionTemplate.isMega ? this.getTemplate(fusionTemplate.species.substring(0, fusionTemplate.species.length - 5)).prevo : fusionTemplate.prevo;
			while (prevo) {
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
			}
			let moves = {};
			for (let kek = 0; kek < movepool.length; kek++) moves[movepool[kek]] = true;
			for (let i in set.moves) {
				let move = toId(set.moves[i]);
				if (move.substr(0, 11) === 'hiddenpower') move = 'hiddenpower'; // Really big hack :(
				if (!moves[move]) {
					problems.push(set.species + " cannot learn " + set.moves[i] + ".");
				}
			}
			if (problems) return problems;
		},
		onValidateTeam: function (team) {
			let nameTable = {};
			for (let i = 0; i < team.length; i++) {
				let name = team[i].name;
				if (name) {
					if (name === team[i].species) continue;
					if (nameTable[name]) {
						return ["Your Pok&eacute;mon must have different nicknames.", "(You have more than one " + name + ")"];
					}
					nameTable[name] = true;
				}
			}
		},
	},
	{
		name: "[Gen 7] Legendless",
		desc: [
			"Legendaries have been banished from the tier, what are we gonna do now?",
			"&bullet; <a href=\"http://chandie.boards.net/thread/5/welcome-usm-legendless\">Legendless Bans and Unbans</a>",
			"&bullet; <a href=\"http://chandie.boards.net/thread/6/usm-legendless-viability-rankings\">Legendless Viability Ranking</a>",
		],
		mod: 'gen7',
		ruleset: ['Sleep Clause Mod', 'Pokemon', 'Standard', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ["Articuno", "Moltres", "Zapdos", "Mew", "Raikou", "Entei", "Suicune", "Celebi", "Regirock", "Registeel", "Regice", "Latios", "Latias", "Jirachi", "Uxie", "Mesprit", "Azelf", "Heatran", "Regigigas", "Cresselia", "Shaymin", "Manaphy", "Victini", "Cobalion", "Virizion", "Terrakion", "Keldeo", "Keldeo-Resolute", "Tornadus", "Tornadus-Therian", "Thundurus", "Thundurus-Therian", "Landorus-Therian", "Kyurem", "Kyurem-Black", "Meloetta", "Meloetta-Pirouette", "Zygarde", "Diancie", "Hoopa", "Hoopa-Unbound", "Volcanion", "Type:Null", "Silvally", "Tapu Koko", "Tapu Lele", "Tapu Fini", "Tapu Bulu", "Cosmog", "Cosmoem", "Nihilego", "Buzzwole", "Xurkitree", "Celesteela", "Kartana", "Guzzlord", "Magearna", "Necrozma", "Zeraora", "Poipole", "Stakataka", "Blacephalon", "Uber", "Baton Pass"],
		unbanlist: ["Aegislash", "Lucario-Mega", "Blaziken-Mega", "Metagross-Mega", "Salamence-Mega", "Kangaskhan-Mega", "Gengar-Mega", "Blaziken"],

	},
	{
		name: "[Gen 7] Pokebilities",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3588652/\">Pokebilities</a>: A Pokemon has all of its abilities active at the same time."],
		mod: 'pokebilities',
		ruleset: ['[Gen 7] OU'],
		onSwitchInPriority: 1,
		onBegin: function () {
			let statusability = {
				"aerilate": true,
				"aurabreak": true,
				"flashfire": true,
				"parentalbond": true,
				"pixilate": true,
				"refrigerate": true,
				"sheerforce": true,
				"slowstart": true,
				"truant": true,
				"unburden": true,
				"zenmode": true,
			};
			for (let p = 0; p < this.sides.length; p++) {
				for (let i = 0; i < this.sides[p].pokemon.length; i++) {
					let pokemon = this.sides[p].pokemon[i];
					let template = this.getTemplate(pokemon.species);
					this.sides[p].pokemon[i].innates = [];
					let bans = this.data.Formats.gen7ou.banlist;
					bans.push("Battle Bond");
					for (let a in template.abilities) {
						for (let k = 0; k < bans.length; k++) {
							if (toId(bans[k]) === toId(template.abilities[a])) continue;
						}
						if (toId(a) === 'h' && template.unreleasedHidden) continue;
						if (toId(template.abilities[a]) === pokemon.ability) continue;
						if (statusability[toId(template.abilities[a])]) {
							this.sides[p].pokemon[i].innates.push("other" + toId(template.abilities[a]));
						} else {
							this.sides[p].pokemon[i].innates.push(toId(template.abilities[a]));
						}
					}
				}
			}
		},
		onSwitchIn: function (pokemon) {
			for (let i = 0; i < pokemon.innates.length; i++) {
				if (!pokemon.volatiles[pokemon.innates[i]]) {
					pokemon.addVolatile(pokemon.innates[i]);
				}
			}
		},
		onAfterMega: function (pokemon) {
			for (let i = 0; i < pokemon.innates.length; i++) {
				pokemon.removeVolatile(pokemon.innates[i]);
			}
		},
	},
	{
		name: "[Gen 7] Bad 'n Boosted",
		desc: ["&bullet; All the stats of a pokemon which are 70 or below get doubled.<br>For example, Growlithe's stats are 55/70/45/70/50/60 in BnB they become 110/140/90/140/100/120<br><b>Banlist:</b>Eviolite, Huge Power, Pure Power"],
		mod: 'gen7',
		ruleset: ['[Gen 7] Ubers'],
		banlist: ['Eviolite', 'Huge Power', 'Pure Power', 'Eevium Z'],
		onModifyTemplate: function (template, pokemon) {
			for (let i in template.baseStats) {
				if (template.baseStats[i] <= 70) template.baseStats[i] *= 2;
			}
			return template;
		},
	},
	{
		name: "[Gen 7] Multibility 2.0",
		desc: [
			"&bullet; Put your second ability with your first ability in the ability slot.",
		],
		mod: 'franticfusions',
		ruleset: ['[Gen 7] OU'],
		banlist: ["Illegal", 'Kyurem-Black', 'Manaphy', 'Porygon-Z', 'Shedinja', 'Togekiss', 'Chatter'],
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let ability = pokemon.ability;
				let abilities = this.getFormat(this.format).getAbilities(ability);
				if (this.getAbility(ability).exists || !Array.isArray(abilities)) continue;
				pokemon.ability = pokemon.baseAbility = abilities[0];
				pokemon.abilitwo = abilities[1];
			}
		},
		getAbilities: function (slot) {
			let ab1 = "", ab2 = "";
			for (let i = 0; i < slot.length; i++) {
				ab1 = ab1 + slot.charAt(i);
				if (Dex.getAbility(ab1).exists) {
					ab2 = slot.substring(i + 1);
					if (Dex.getAbility(ab2).exists) return [ab1, ab2];
				}
			}
			return ab1;
		},
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			if (pokemon.abilitwo && this.getAbility(pokemon.abilitwo)) {
				let statusability = {
					"aerilate": true,
					"aurabreak": true,
					"flashfire": true,
					"parentalbond": true,
					"pixilate": true,
					"refrigerate": true,
					"sheerforce": true,
					"slowstart": true,
					"truant": true,
					"unburden": true,
					"zenmode": true,
				};
				let sec = statusability[pokemon.abilitwo] ? "other" + pokemon.abilitwo : pokemon.abilitwo;
				pokemon.addVolatile(sec, pokemon); //Second Ability! YAYAYAY
			}
		},
		validateSet: function (set, teamHas) {
			let abilities = this.format.getAbilities(set.ability), ability = set.ability;
			if (Array.isArray(abilities)) {
				set.ability = abilities[0];
				let problems = this.validateSet(set, teamHas) || [];
				let abilitwo = Dex.getAbility(abilities[1]);
				let bans = {
					'arenatrap': true,
					'contrary': true,
					'furcoat': true,
					'hugepower': true,
					'imposter': true,
					'parentalbond': true,
					'purepower': true,
					'shadowtag': true,
					'trace': true,
					'simple': true,
					'wonderguard': true,
					'moody': true,
				};
				if (bans[toId(abilitwo.id)]) problems.push(set.species + "'s ability " + abilitwo.name + " is banned by Multibility.");
				if (abilitwo.id === toId(set.ability)) problems.push("You cannot have two of " + abilitwo.name + " on the same Pokemon.");
				set.ability = ability;
				return problems;
			}
		},
		onValidateTeam: function (team, format) {
			let abilityTable = {};
			for (let i = 0; i < team.length; i++) {
				let abilities = format.getAbilities(team[i].ability), ability = this.getAbility(Array.isArray(abilities) ? abilities[0] : abilities);
				if (!abilityTable[ability.id]) abilityTable[ability.id] = 0;
				if (++abilityTable[ability.id] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + ability.name + " or " + this.getAbility(toId(team[i].item)).name + " [Item])"];
				}
				if (!Array.isArray(abilities)) continue;
				ability = this.getAbility(abilities[1]);
				if (!ability.exists) continue;
				if (!abilityTable[ability.id]) abilityTable[ability.id] = 0;
				if (++abilityTable[ability.id] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + ability.name + ")"];
				}
			}
		},
	},
	{
		name: "[Gen 7] Move Equality",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3599280/\">Move Equality</a>: Every Move has 100 base power with the exception of moves that have varying base powers."],
		mod: 'gen7',
		ruleset: ['Sleep Clause Mod', 'Exact HP Mod', 'Cancel Mod', 'Freeze Clause Mod', 'Team Preview', 'Endless Battle Clause', 'Pokemon', 'Standard'],
		banlist: ['Fell Stinger', 'Mud Slap', 'Power Up Punch', 'Uber'],
		onModifyMovePriority: 5,
		onModifyMove: function (move, pokemon) {
			if (move.category === 'Status' || move.priority !== 0 || move.onBasePower || move.basePowerCallback) return move;
			if (move.isZ) {
				move.basePower = 180;
				return move;
			}
			if (move.multihit) {
				move.basePower = parseInt(100 / move.multihit[move.multihit.length - 1]);
				return move;
			}
			move.basePower = 100;
			return move;
		},

	},
	{
		name: "[Gen 7] OU Chaos",
		mod: "ouchaos",
		ruleset: ['Sleep Clause Mod', 'Pokemon', 'Standard', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Allow CAP'],
		desc: [
			"Overused beasts are back, and the chaos is everywhere",
			"&bullet; <a href=\"http://chandie.boards.net/thread/2/overused-chaos-viability-rankings\">OU Chaos Viability Ranking</a>",
			"&bullet; <a href=\"http://chandie.boards.net/thread/4/welcome-usm-chaos-bans-rulesets\">OU Chaos Bans and Unbans</a>",
		],
		banlist: ['Uber', 'Power Construct', 'Baton Pass', 'Arena Trap', 'Shadow Tag'],
	},
	{
		name: "[Gen 7] Perfected Pokemon",
		mod: "dewdrop",
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Cancel Mod'],
		desc: [
			"Coded by Insist",
			"Lycanium Z and AlfaStorm contributed ideas towards the project.",
			"Along with buffing Pokemon deemed worthy of needing support.",
			"&bullet; <a href=\"https://docs.google.com/spreadsheets/d/1Jubk6J4d3CFNtO2stytTuRRiSD_XLhqzx40EuDKOjHs/edit?usp=sharing\">Perfection</a>",
		],
		unbanlist: ['Moody', 'Landorus', 'Genesect', 'Aegislash'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 7] Perfected Pokemon Monotype",
		mod: "dewdrop",
		ruleset: ['[Gen 7] Monotype'],
		desc: [
			"Perfected Pokemon Monotype mode",
			"Mewth contributed the idea towards the project.",
			"Along with buffing Pokemon deemed worthy of needing support.",
			"&bullet; <a href=\"https://docs.google.com/spreadsheets/d/1Jubk6J4d3CFNtO2stytTuRRiSD_XLhqzx40EuDKOjHs/edit?usp=sharing\">Perfection</a>",
		],
		unbanlist: ['Moody', 'Landorus', 'Genesect', 'Aegislash'],
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
		name: "[Gen 7] Random Metronome Battle",
		desc: ["&bullet; Metronome battles format: 6v6 singles, Only move allowed is metronome, all healing items/abilities are banned, Ubers (and mega rayquaza) are banned, immunites dont exist in this format (ex normal is not very effective on ghost instead of x0)"],
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		team: 'random',
		mod: 'gen7',
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			allPokemon.forEach(pokemon => {
				pokemon.baseMoveSlots = [{
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
				pokemon.moveSlots = pokemon.baseMoveSlots;
				if (this.getFormat('[Gen 7] Metronome Battle').banlist.includes(this.getItem(pokemon.item).name)) {
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
		name: "[Gen 7] Slowtown",
		desc: [
			"Trick room is constantly active for the duration of the battle and will reapply itself every 5 turns. Concept by Lycanium Z. Coded by Insist.",
			"&bullet; <a href=\"http://exiledps.boards.net/board/22/slowtown\">Slowtown</a>",
		],
		mod: "slowtown",
		ruleset: ['Sleep Clause Mod', 'Pokemon', 'Standard', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Snorlax', 'Uber'],
		unbanlist: ['Pheromosa', 'Deoxys-Speed', 'Deoxys-Attack', 'Deoxys', 'Shaymin-Sky', 'Blaziken', 'Gengarite', 'Metagrossite', 'Blazikenite'],
		onBegin: function () {
			this.trickRoom = ["Trick Room"];
			this.startNewTrickRoom = this.trickRoom[this.random(1)];
			this.add(`-message`, `Starting next turn, the set up another 5 rounds of ${this.startNewTrickRoom}!`);
		},
		onResidualOrder: 999,
		onResidual: function () {
			if (this.turn % 5 === 4) {
				let startNewTrickRoom = this.trickRoom[this.random(1)];
				while (startNewTrickRoom === this.trickRoom) startNewTrickRoom = this.trickRoom[this.random(1)];
				this.startNewTrickRoom = startNewTrickRoom;
				this.add(`-message`, `Starting next turn, the battle will set another 5 rounds of ${this.startNewTrickRoom}!`);
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
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
		onBegin: function () {
			this.add("raw|<h2>Free for All!</h2>");
			this.add("raw|<h3>3</h3>");
			this.add("raw|<h3>2</h3>");
			this.add("raw|<h3>1</h3>");
			this.add("raw|<h1>BATTLE!</h1>");
		},
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			if (!pokemon.template.isMega) pokemon.canMegaEvo = this.canMegaEvo(pokemon);
		},
	},
	{
		name: "[Gen 7] Swapping Powers",
		desc: [
			"Power trick that's constantly there, not only swapping Attack and Defense, but Special Attack and Special Defense also.",
			"&bullet; <a href=\"http://exiledps.boards.net/thread/24/welcome-swapping-powers\">Swapping Powers Thread</a>",
			"Concept by Mewth. Coded by Insist/HoeenHero.",
		],
		ruleset: ['Sleep Clause Mod', 'Pokemon', 'Standard', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		unbanlist: ['Deoxys-Attack', 'Deoxys', 'Deoxys-Defense', 'Deoxys-Speed', 'Aegislash', 'Aegislash-Blade', 'Darmanitan-Zen', 'Marshadow', 'Genesect', 'Shaymin-Sky', 'Landorus', 'Blaziken', 'Pheromosa'],
		onSwitchInPriority: 8,
		onSwitchIn: function (pokemon) {
			this.useMove("Power Trick", pokemon, pokemon, pokemon);
		},
	},
	{
		name: "[Gen 7] Tier Shift",
		desc: [
			"Pok&eacute;mon get +10 to each stat per tier below OU they are in. UU gets +10, RU +20, NU +30, and PU +40.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3610073/\">Tier Shift</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Tangela', 'Damp Rock', 'Deep Sea Tooth'],
		onModifyTemplate: function (template, pokemon) {
			let tsTemplate = Object.assign({}, template);
			const boosts = {'UU': 10, 'BL2': 10, 'RU': 20, 'BL3': 20, 'NU': 30, 'BL4': 30, 'PU': 40, 'NFE': 40, 'LC Uber': 40, 'LC': 40};
			let tier = tsTemplate.tier;
			if (pokemon.set.item) {
				let item = this.getItem(pokemon.set.item);
				if (item.megaEvolves === tsTemplate.species) tier = this.getTemplate(item.megaStone).tier;
			}
			if (tier.charAt(0) === '(') tier = tier.slice(1, -1);
			let boost = (tier in boosts) ? boosts[tier] : 0;
			if (boost > 0 && (pokemon.set.ability === 'Drizzle' || pokemon.set.item === 'Mewnium Z')) boost = 0;
			if (boost > 10 && pokemon.set.moves.includes('auroraveil')) boost = 10;
			if (boost > 20 && pokemon.set.ability === 'Drought') boost = 20;
			tsTemplate.baseStats = Object.assign({}, tsTemplate.baseStats);
			for (let statName in tsTemplate.baseStats) {
				tsTemplate.baseStats[statName] = this.clampIntRange(tsTemplate.baseStats[statName] + boost, 1, 255);
			}
			return tsTemplate;
		},
	},
	{
		name: "[Gen 7] TMS Boss Rush",
		desc: ["All the bosses from TMS have all came to duke it out in a giant randbats OM to see who can top who and be the best!"],

		mod: 'bossrush',
		team: 'randomTMS',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Type Illusion",
		ruleset: ['Sleep Clause Mod', 'Pokemon', 'Standard', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ["Shedinja"],
		desc: [
			"&bullet; Coded by flufi. Completed by Mewth",
			"Nickname a Pokemon a single typing and the Pokemon will change to that typing in battle.",
			"Dual Typings will be settable when the OM is out of beta.",
			"To keep a Pokemon's default typing, don't give it a nickname.",
			"&bullet; <a href=\"http://exiledps.boards.net/board/20/type-illusions\">Type Illusion Thread</a>",
			"&bullet; <a href=\"https://pastebin.com/raw/i9NBafUy\">Nickname Typings</a>",
		],
		onSwitchInPriority: 8,
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
			if (name === 'basicfire' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Fire');
				pokemon.types = ["Normal", "Fire"];
			}
			if (name === 'basicwater' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Water');
				pokemon.types = ["Normal", "Water"];
			}
			if (name === 'basicgrass' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Grass');
				pokemon.types = ["Normal", "Grass"];
			}
			if (name === 'basicghost' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ghost');
				pokemon.types = ["Normal", "Ghost"];
			}
			if (name === 'dewdrop' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Bug');
				pokemon.types = ["Water", "Bug"];
			}
			if (name === 'basicelectric' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Electric');
				pokemon.types = ["Normal", "Electric"];
			}
			if (name === 'basicice' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ice');
				pokemon.types = ["Normal", "Ice"];
			}
			if (name === 'basicfighting' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Fighting');
				pokemon.types = ["Normal", "Fighting"];
			}
			if (name === 'basicpoison' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Poison');
				pokemon.types = ["Normal", "Poison"];
			}
			if (name === 'basicground' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ground');
				pokemon.types = ["Normal", "Ground"];
			}
			if (name === 'basicflying' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Flying');
				pokemon.types = ["Normal", "Flying"];
			}
			if (name === 'basicpsychic' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Psychic');
				pokemon.types = ["Normal", "psychic"];
			}
			if (name === 'basicbug' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Bug');
				pokemon.types = ["Normal", "Bug"];
			}
			if (name === 'basicrock' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Rock');
				pokemon.types = ["Normal", "Rock"];
			}
			if (name === 'basicdragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Dragon');
				pokemon.types = ["Normal", "Dragon"];
			}
			if (name === 'basicdark' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Dark');
				pokemon.types = ["Normal", "Dark"];
			}
			if (name === 'basicsteel' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Steel');
				pokemon.types = ["Normal", "Steel"];
			}
			if (name === 'basicfairy' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Fairy');
				pokemon.types = ["Normal", "Fairy"];
			}
			if (name === 'liquor' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Water');
				pokemon.types = ["Fire", "Water"];
			}
			if (name === 'plasma' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Electric');
				pokemon.types = ["Fire", "Electric"];
			}
			if (name === 'forestfire' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Grass');
				pokemon.types = ["Fire", "Grass"];
			}
			if (name === 'dryice' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Ice');
				pokemon.types = ["Fire", "Ice"];
			}
			if (name === 'firefighter' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Fighting');
				pokemon.types = ["Fire", "Fighting"];
			}
			if (name === 'smoke' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Poison');
				pokemon.types = ["Fire", "Poison"];
			}
			if (name === 'lavaflow' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Ground');
				pokemon.types = ["Fire", "Ground"];
			}
			if (name === 'firetornado' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Flying');
				pokemon.types = ["Fire", "Flying"];
			}
			if (name === 'firebending' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Psychic');
				pokemon.types = ["Fire", "Psychic"];
			}
			if (name === 'firefly' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Bug');
				pokemon.types = ["Fire", "Bug"];
			}
			if (name === 'volcano' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Rock');
				pokemon.types = ["Fire", "Rock"];
			}
			if (name === 'candle' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Ghost');
				pokemon.types = ["Fire", "Ghost"];
			}
			if (name === 'zodiac' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Dragon');
				pokemon.types = ["Fire", "Dragon"];
			}
			if (name === 'nightfire' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Dark');
				pokemon.types = ["Fire", "Dark"];
			}
			if (name === 'firerod' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Steel');
				pokemon.types = ["Fire", "Steel"];
			}
			if (name === 'pixieflame' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Fairy');
				pokemon.types = ["Fire", "Fairy"];
			}
			if (name === 'hydroelectric' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Electric');
				pokemon.types = ["Water", "Electric"];
			}
			if (name === 'growth' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Grass');
				pokemon.types = ["Water", "Grass"];
			}
			if (name === 'frozenwater' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Ice');
				pokemon.types = ["Water", "Ice"];
			}
			if (name === 'watergun' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Fighting');
				pokemon.types = ["Water", "Fighting"];
			}
			if (name === 'contaminate' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Poison');
				pokemon.types = ["Water", "Poison"];
			}
			if (name === 'inlet' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Ground');
				pokemon.types = ["Water", "Ground"];
			}
			if (name === 'clouds' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Flying');
				pokemon.types = ["Water", "Flying"];
			}
			if (name === 'waterbending' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Psychic');
				pokemon.types = ["Water", "Psychic"];
			}
			if (name === 'beachcave' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Rock');
				pokemon.types = ["Water", "Rock"];
			}
			if (name === 'bermuda' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Ghost');
				pokemon.types = ["Water", "Ghost"];
			}
			if (name === 'reptile' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/dragon');
				pokemon.types = ["Water", "Dragon"];
			}
			if (name === 'tides' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Dark');
				pokemon.types = ["Water", "Dark"];
			}
			if (name === 'watertank' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Steel');
				pokemon.types = ["Water", "Steel"];
			}
			if (name === 'elucia' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Fairy');
				pokemon.types = ["Water", "Fairy"];
			}
			if (name === 'lawnmower' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Electric');
				pokemon.types = ["Grass", "Electric"];
			}
			if (name === 'fridge' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Ice');
				pokemon.types = ["Electric", "Ice"];
			}
			if (name === 'winter' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Ice');
				pokemon.types = ["Grass", "Ice"];
			}
			if (name === 'grassrazor' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Fighting');
				pokemon.types = ["Grass", "Fighting"];
			}
			if (name === 'toxicplants' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Poison');
				pokemon.types = ["Grass", "Poison"];
			}
			if (name === 'roots' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Ground');
				pokemon.types = ["Grass", "Ground"];
			}
			if (name === 'chloropidae' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Flying');
				pokemon.types = ["Grass", "Flying"];
			}
			if (name === 'icebreaker' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Psychic');
				pokemon.types = ["Grass", "Psychic"];
			}
			if (name === 'arthropoda' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Bug');
				pokemon.types = ["Grass", "Bug"];
			}
			if (name === 'weathering' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Rock');
				pokemon.types = ["Grass", "Rock"];
			}
			if (name === 'spiritgrass' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Ghost');
				pokemon.types = ["Grass", "Ghost"];
			}
			if (name === 'plantdragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Dragon');
				pokemon.types = ["Grass", "Dragon"];
			}
			if (name === 'lunartwig' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Dark');
				pokemon.types = ["Grass", "Dark"];
			}
			if (name === 'grassblade' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Steel');
				pokemon.types = ["Grass", "Steel"];
			}
			if (name === 'flowerpower' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Fairy');
				pokemon.types = ["Grass", "Fairy"];
			}
			if (name === 'fastfist' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Fighting');
				pokemon.types = ["Electric", "Fighting"];
			}
			if (name === 'batteries' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Poison');
				pokemon.types = ["Electric", "Poison"];
			}
			if (name === 'circuit' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Ground');
				pokemon.types = ["Electric", "Ground"];
			}
			if (name === 'planes' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Flying');
				pokemon.types = ["Electric", "Flying"];
			}
			if (name === 'lightbulb' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Psychic');
				pokemon.types = ["Electric", "Psychic"];
			}
			if (name === 'glowworm' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Bug');
				pokemon.types = ["Electric", "Bug"];
			}
			if (name === 'fulgurite' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Rock');
				pokemon.types = ["Electric", "Rock"];
			}
			if (name === 'vampire' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Ghost');
				pokemon.types = ["Electric", "Ghost"];
			}
			if (name === 'fabio' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Dragon');
				pokemon.types = ["Electric", "Dragon"];
			}
			if (name === 'blacklightning' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Dark');
				pokemon.types = ["Electric", "Dark"];
			}
			if (name === 'magnet' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Steel');
				pokemon.types = ["Electric", "Steel"];
			}
			if (name === 'sparx' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Fairy');
				pokemon.types = ["Electric", "Fairy"];
			}
			if (name === 'vampillia' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fighting/Ice');
				pokemon.types = ["Fighting", "Ice"];
			}
			if (name === 'icecream' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Ice');
				pokemon.types = ["Poison", "Ice"];
			}
			if (name === 'permafrost' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Ice');
				pokemon.types = ["Ground", "Ice"];
			}
			if (name === 'hail' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Ice');
				pokemon.types = ["Flying", "Ice"];
			}
			if (name === 'cryokinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Ice');
				pokemon.types = ["Psychic", "Ice"];
			}
			if (name === 'gryllobattidae' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Ice');
				pokemon.types = ["Bug", "Ice"];
			}
			if (name === 'pluto' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Ice');
				pokemon.types = ["Rock", "Ice"];
			}
			if (name === 'yukionna' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost/Ice');
				pokemon.types = ["Ghost", "Ice"];
			}
			if (name === 'wuji' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Ice');
				pokemon.types = ["Dragon", "Ice"];
			}
			if (name === 'iceblade' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Steel/Ice');
				pokemon.types = ["Steel", "Ice"];
			}
			if (name === 'lovix' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fairy/Ice');
				pokemon.types = ["Fairy", "Ice"];
			}
			if (name === 'sick' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Fighting');
				pokemon.types = ["Poison", "Fighting"];
			}
			if (name === 'war' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Fighting');
				pokemon.types = ["Ground", "Fighting"];
			}
			if (name === 'aztec' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Fighting');
				pokemon.types = ["Flying", "Fighting"];
			}
			if (name === 'rhinobeetle' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Fighting');
				pokemon.types = ["Bug", "Fighting"];
			}
			if (name === 'manipulation' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Fighting');
				pokemon.types = ["Psychic", "Fighting"];
			}
			if (name === 'porthos' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Fighting');
				pokemon.types = ["Rock", "Fighting"];
			}
			if (name === 'demon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost/Fighting');
				pokemon.types = ["Ghost", "Fighting"];
			}
			if (name === 'cryptid' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Fighting');
				pokemon.types = ["Dragon", "Fighting"];
			}
			if (name === 'hoodlum' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dark/Fighting');
				pokemon.types = ["Dark", "Fighting"];
			}
			if (name === 'anubis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Steel/Fighting');
				pokemon.types = ["Steel", "Fighting"];
			}
			if (name === 'roughhouse' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fairy/Fighting');
				pokemon.types = ["Fairy", "Fighting"];
			}
			if (name === 'toxicwaste' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Ground');
				pokemon.types = ["Poison", "Ground"];
			}
			if (name === 'bugspray' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Flying');
				pokemon.types = ["Poison", "Flying"];
			}
			if (name === 'esoteric' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Psychic');
				pokemon.types = ["Poison", "Psychic"];
			}
			if (name === 'stinkbug' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Bug');
				pokemon.types = ["Poison", "Bug"];
			}
			if (name === 'cinnabar' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Rock');
				pokemon.types = ["Poison", "Rock"];
			}
			if (name === 'witch' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Ghost');
				pokemon.types = ["Poison", "Ghost"];
			}
			if (name === 'tsardragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Dragon');
				pokemon.types = ["Poison", "Dragon"];
			}
			if (name === 'skunk' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Dark');
				pokemon.types = ["Poison", "Dark"];
			}
			if (name === 'lead' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Steel');
				pokemon.types = ["Poison", "Steel"];
			}
			if (name === 'toxicpixie' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Fairy');
				pokemon.types = ["Poison", "Fairy"];
			}
			if (name === 'sandstorm' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Flying');
				pokemon.types = ["Ground", "Flying"];
			}
			if (name === 'terrakinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Psychic');
				pokemon.types = ["Ground", "Psychic"];
			}
			if (name === 'cicada' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Bug');
				pokemon.types = ["Ground", "Bug"];
			}
			if (name === 'geoterra' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Rock');
				pokemon.types = ["Ground", "Rock"];
			}
			if (name === 'sandghostle' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Ghost');
				pokemon.types = ["Ground", "Ghost"];
			}
			if (name === 'terradragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Dragon');
				pokemon.types = ["Ground", "Dragon"];
			}
			if (name === 'krokadile' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Dark');
				pokemon.types = ["Ground", "Dark"];
			}
			if (name === 'terrasteel' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Steel');
				pokemon.types = ["Ground", "Steel"];
			}
			if (name === 'terrapixie' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Fairy');
				pokemon.types = ["Ground", "Fairy"];
			}
			if (name === 'aerokinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Psychic');
				pokemon.types = ["Flying", "Psychic"];
			}
			if (name === 'butterfly' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Bug');
				pokemon.types = ["Flying", "Bug"];
			}
			if (name === 'pterodactyl' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Rock');
				pokemon.types = ["Flying", "Rock"];
			}
			if (name === 'spirit' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Ghost');
				pokemon.types = ["Flying", "Ghost"];
			}
			if (name === 'draco' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Dragon');
				pokemon.types = ["Flying", "Dragon"];
			}
			if (name === 'dogekiss' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Fairy');
				pokemon.types = ["Flying", "Fairy"];
			}
			if (name === 'entomopathy' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Bug');
				pokemon.types = ["Psychic", "Bug"];
			}
			if (name === 'geokinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Rock');
				pokemon.types = ["Psychic", "Rock"];
			}
			if (name === 'ouijaboard' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Ghost');
				pokemon.types = ["Psychic", "Ghost"];
			}
			if (name === 'dracokinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Dragon');
				pokemon.types = ["Psychic", "Dragon"];
			}
			if (name === 'umbrekinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Dark');
				pokemon.types = ["Psychic", "Dark"];
			}
			if (name === 'ferrukinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Steel');
				pokemon.types = ["Psychic", "Steel"];
			}
			if (name === 'pixkinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Fairy');
				pokemon.types = ["Psychic", "Fairy"];
			}
			if (name === 'anomalocaris' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Rock');
				pokemon.types = ["Bug", "Rock"];
			}
			if (name === 'discarded' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Ghost');
				pokemon.types = ["Bug", "Ghost"];
			}
			if (name === 'antlion' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Dragon');
				pokemon.types = ["Bug", "Dragon"];
			}
			if (name === 'bullet' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Steel');
				pokemon.types = ["Bug", "Steel"];
			}
			if (name === 'lasius' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Dark');
				pokemon.types = ["Bug", "Dark"];
			}
			if (name === 'sweetant' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Fairy');
				pokemon.types = ["Bug", "Fairy"];
			}
			if (name === 'geospirit' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Ghost');
				pokemon.types = ["Rock", "Ghost"];
			}
			if (name === 'trex' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Dragon');
				pokemon.types = ["Rock", "Dragon"];
			}
			if (name === 'tlizard' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Dark');
				pokemon.types = ["Rock", "Dark"];
			}
			if (name === 'shield' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Steel');
				pokemon.types = ["Rock", "Steel"];
			}
			if (name === 'pixelrock' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Fairy');
				pokemon.types = ["Rock", "Fairy"];
			}
			if (name === 'draconic' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost/Dragon');
				pokemon.types = ["Ghost", "Dragon"];
			}
			if (name === 'souls' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost/Dark');
				pokemon.types = ["Ghost", "Dark"];
			}
			if (name === 'mask' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost/Steel');
				pokemon.types = ["Ghost", "Steel"];
			}
			if (name === 'fairydust' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost/Fairy');
				pokemon.types = ["Ghost", "Fairy"];
			}
			if (name === 'yamata' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Dark');
				pokemon.types = ["Dragon", "Dark"];
			}
			if (name === 'temporal' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Steel');
				pokemon.types = ["Dragon", "Steel"];
			}
			if (name === 'nicedragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Fairy');
				pokemon.types = ["Dragon", "Fairy"];
			}
			if (name === 'taintedmetal' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dark/Steel');
				pokemon.types = ["Dragon", "Steel"];
			}
			if (name === 'taintedfairy' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dark/Fairy');
				pokemon.types = ["Dragon", "Fairy"];
			}
			if (name === 'pixieshield' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Steel/Fairy');
				pokemon.types = ["Steel", "Fairy"];
			}
		},
		onAfterMegaPriority: 8,
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
			if (name === 'basicfire' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Fire');
				pokemon.types = ["Normal", "Fire"];
			}
			if (name === 'basicwater' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Water');
				pokemon.types = ["Normal", "Water"];
			}
			if (name === 'basicgrass' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Grass');
				pokemon.types = ["Normal", "Grass"];
			}
			if (name === 'basicghost' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ghost');
				pokemon.types = ["Normal", "Ghost"];
			}
			if (name === 'dewdrop' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Bug');
				pokemon.types = ["Water", "Bug"];
			}
			if (name === 'basicelectric' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Electric');
				pokemon.types = ["Normal", "Electric"];
			}
			if (name === 'basicice' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ice');
				pokemon.types = ["Normal", "Ice"];
			}
			if (name === 'basicfighting' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Fighting');
				pokemon.types = ["Normal", "Fighting"];
			}
			if (name === 'basicpoison' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Poison');
				pokemon.types = ["Normal", "Poison"];
			}
			if (name === 'basicground' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ground');
				pokemon.types = ["Normal", "Ground"];
			}
			if (name === 'basicflying' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Flying');
				pokemon.types = ["Normal", "Flying"];
			}
			if (name === 'basicpsychic' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Psychic');
				pokemon.types = ["Normal", "psychic"];
			}
			if (name === 'basicbug' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Bug');
				pokemon.types = ["Normal", "Bug"];
			}
			if (name === 'basicrock' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Rock');
				pokemon.types = ["Normal", "Rock"];
			}
			if (name === 'basicdragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Dragon');
				pokemon.types = ["Normal", "Dragon"];
			}
			if (name === 'basicdark' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Dark');
				pokemon.types = ["Normal", "Dark"];
			}
			if (name === 'basicsteel' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Steel');
				pokemon.types = ["Normal", "Steel"];
			}
			if (name === 'basicfairy' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Fairy');
				pokemon.types = ["Normal", "Fairy"];
			}
			if (name === 'liquor' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Water');
				pokemon.types = ["Fire", "Water"];
			}
			if (name === 'plasma' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Electric');
				pokemon.types = ["Fire", "Electric"];
			}
			if (name === 'forestfire' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Grass');
				pokemon.types = ["Fire", "Grass"];
			}
			if (name === 'dryice' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Ice');
				pokemon.types = ["Fire", "Ice"];
			}
			if (name === 'firefighter' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Fighting');
				pokemon.types = ["Fire", "Fighting"];
			}
			if (name === 'smoke' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Poison');
				pokemon.types = ["Fire", "Poison"];
			}
			if (name === 'lavaflow' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Ground');
				pokemon.types = ["Fire", "Ground"];
			}
			if (name === 'firetornado' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Flying');
				pokemon.types = ["Fire", "Flying"];
			}
			if (name === 'firebending' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Psychic');
				pokemon.types = ["Fire", "Psychic"];
			}
			if (name === 'firefly' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Bug');
				pokemon.types = ["Fire", "Bug"];
			}
			if (name === 'volcano' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Rock');
				pokemon.types = ["Fire", "Rock"];
			}
			if (name === 'candle' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Ghost');
				pokemon.types = ["Fire", "Ghost"];
			}
			if (name === 'zodiac' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Dragon');
				pokemon.types = ["Fire", "Dragon"];
			}
			if (name === 'nightfire' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Dark');
				pokemon.types = ["Fire", "Dark"];
			}
			if (name === 'firerod' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Steel');
				pokemon.types = ["Fire", "Steel"];
			}
			if (name === 'pixieflame' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Fairy');
				pokemon.types = ["Fire", "Fairy"];
			}
			if (name === 'hydroelectric' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Electric');
				pokemon.types = ["Water", "Electric"];
			}
			if (name === 'growth' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Grass');
				pokemon.types = ["Water", "Grass"];
			}
			if (name === 'frozenwater' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Ice');
				pokemon.types = ["Water", "Ice"];
			}
			if (name === 'watergun' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Fighting');
				pokemon.types = ["Water", "Fighting"];
			}
			if (name === 'contaminate' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Poison');
				pokemon.types = ["Water", "Poison"];
			}
			if (name === 'inlet' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Ground');
				pokemon.types = ["Water", "Ground"];
			}
			if (name === 'clouds' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Flying');
				pokemon.types = ["Water", "Flying"];
			}
			if (name === 'waterbending' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Psychic');
				pokemon.types = ["Water", "Psychic"];
			}
			if (name === 'beachcave' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Rock');
				pokemon.types = ["Water", "Rock"];
			}
			if (name === 'bermuda' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Ghost');
				pokemon.types = ["Water", "Ghost"];
			}
			if (name === 'reptile' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/dragon');
				pokemon.types = ["Water", "Dragon"];
			}
			if (name === 'tides' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Dark');
				pokemon.types = ["Water", "Dark"];
			}
			if (name === 'watertank' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Steel');
				pokemon.types = ["Water", "Steel"];
			}
			if (name === 'elucia' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Fairy');
				pokemon.types = ["Water", "Fairy"];
			}
			if (name === 'lawnmower' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Electric');
				pokemon.types = ["Grass", "Electric"];
			}
			if (name === 'fridge' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Ice');
				pokemon.types = ["Electric", "Ice"];
			}
			if (name === 'winter' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Ice');
				pokemon.types = ["Grass", "Ice"];
			}
			if (name === 'grassrazor' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Fighting');
				pokemon.types = ["Grass", "Fighting"];
			}
			if (name === 'toxicplants' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Poison');
				pokemon.types = ["Grass", "Poison"];
			}
			if (name === 'roots' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Ground');
				pokemon.types = ["Grass", "Ground"];
			}
			if (name === 'chloropidae' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Flying');
				pokemon.types = ["Grass", "Flying"];
			}
			if (name === 'icebreaker' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Psychic');
				pokemon.types = ["Grass", "Psychic"];
			}
			if (name === 'arthropoda' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Bug');
				pokemon.types = ["Grass", "Bug"];
			}
			if (name === 'weathering' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Rock');
				pokemon.types = ["Grass", "Rock"];
			}
			if (name === 'spiritgrass' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Ghost');
				pokemon.types = ["Grass", "Ghost"];
			}
			if (name === 'plantdragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Dragon');
				pokemon.types = ["Grass", "Dragon"];
			}
			if (name === 'lunartwig' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Dark');
				pokemon.types = ["Grass", "Dark"];
			}
			if (name === 'grassblade' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Steel');
				pokemon.types = ["Grass", "Steel"];
			}
			if (name === 'flowerpower' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Grass/Fairy');
				pokemon.types = ["Grass", "Fairy"];
			}
			if (name === 'fastfist' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Fighting');
				pokemon.types = ["Electric", "Fighting"];
			}
			if (name === 'batteries' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Poison');
				pokemon.types = ["Electric", "Poison"];
			}
			if (name === 'circuit' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Ground');
				pokemon.types = ["Electric", "Ground"];
			}
			if (name === 'planes' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Flying');
				pokemon.types = ["Electric", "Flying"];
			}
			if (name === 'lightbulb' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Psychic');
				pokemon.types = ["Electric", "Psychic"];
			}
			if (name === 'glowworm' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Bug');
				pokemon.types = ["Electric", "Bug"];
			}
			if (name === 'fulgurite' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Rock');
				pokemon.types = ["Electric", "Rock"];
			}
			if (name === 'vampire' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Ghost');
				pokemon.types = ["Electric", "Ghost"];
			}
			if (name === 'fabio' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Dragon');
				pokemon.types = ["Electric", "Dragon"];
			}
			if (name === 'blacklightning' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Dark');
				pokemon.types = ["Electric", "Dark"];
			}
			if (name === 'magnet' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Steel');
				pokemon.types = ["Electric", "Steel"];
			}
			if (name === 'sparx' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Electric/Fairy');
				pokemon.types = ["Electric", "Fairy"];
			}
			if (name === 'vampillia' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fighting/Ice');
				pokemon.types = ["Fighting", "Ice"];
			}
			if (name === 'icecream' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Ice');
				pokemon.types = ["Poison", "Ice"];
			}
			if (name === 'permafrost' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Ice');
				pokemon.types = ["Ground", "Ice"];
			}
			if (name === 'hail' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Ice');
				pokemon.types = ["Flying", "Ice"];
			}
			if (name === 'cryokinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Ice');
				pokemon.types = ["Psychic", "Ice"];
			}
			if (name === 'gryllobattidae' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Ice');
				pokemon.types = ["Bug", "Ice"];
			}
			if (name === 'pluto' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Ice');
				pokemon.types = ["Rock", "Ice"];
			}
			if (name === 'yukionna' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost/Ice');
				pokemon.types = ["Ghost", "Ice"];
			}
			if (name === 'wuji' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Ice');
				pokemon.types = ["Dragon", "Ice"];
			}
			if (name === 'iceblade' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Steel/Ice');
				pokemon.types = ["Steel", "Ice"];
			}
			if (name === 'lovix' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fairy/Ice');
				pokemon.types = ["Fairy", "Ice"];
			}
			if (name === 'sick' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Fighting');
				pokemon.types = ["Poison", "Fighting"];
			}
			if (name === 'war' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Fighting');
				pokemon.types = ["Ground", "Fighting"];
			}
			if (name === 'aztec' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Fighting');
				pokemon.types = ["Flying", "Fighting"];
			}
			if (name === 'rhinobeetle' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Fighting');
				pokemon.types = ["Bug", "Fighting"];
			}
			if (name === 'manipulation' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Fighting');
				pokemon.types = ["Psychic", "Fighting"];
			}
			if (name === 'porthos' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Fighting');
				pokemon.types = ["Rock", "Fighting"];
			}
			if (name === 'demon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost/Fighting');
				pokemon.types = ["Ghost", "Fighting"];
			}
			if (name === 'cryptid' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Fighting');
				pokemon.types = ["Dragon", "Fighting"];
			}
			if (name === 'hoodlum' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dark/Fighting');
				pokemon.types = ["Dark", "Fighting"];
			}
			if (name === 'anubis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Steel/Fighting');
				pokemon.types = ["Steel", "Fighting"];
			}
			if (name === 'roughhouse' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fairy/Fighting');
				pokemon.types = ["Fairy", "Fighting"];
			}
			if (name === 'toxicwaste' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Ground');
				pokemon.types = ["Poison", "Ground"];
			}
			if (name === 'bugspray' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Flying');
				pokemon.types = ["Poison", "Flying"];
			}
			if (name === 'esoteric' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Psychic');
				pokemon.types = ["Poison", "Psychic"];
			}
			if (name === 'stinkbug' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Bug');
				pokemon.types = ["Poison", "Bug"];
			}
			if (name === 'cinnabar' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Rock');
				pokemon.types = ["Poison", "Rock"];
			}
			if (name === 'witch' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Ghost');
				pokemon.types = ["Poison", "Ghost"];
			}
			if (name === 'tsardragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Dragon');
				pokemon.types = ["Poison", "Dragon"];
			}
			if (name === 'skunk' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Dark');
				pokemon.types = ["Poison", "Dark"];
			}
			if (name === 'lead' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Steel');
				pokemon.types = ["Poison", "Steel"];
			}
			if (name === 'toxicpixie' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Poison/Fairy');
				pokemon.types = ["Poison", "Fairy"];
			}
			if (name === 'sandstorm' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Flying');
				pokemon.types = ["Ground", "Flying"];
			}
			if (name === 'terrakinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Psychic');
				pokemon.types = ["Ground", "Psychic"];
			}
			if (name === 'cicada' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Bug');
				pokemon.types = ["Ground", "Bug"];
			}
			if (name === 'geoterra' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Rock');
				pokemon.types = ["Ground", "Rock"];
			}
			if (name === 'sandghostle' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Ghost');
				pokemon.types = ["Ground", "Ghost"];
			}
			if (name === 'terradragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Dragon');
				pokemon.types = ["Ground", "Dragon"];
			}
			if (name === 'krookodile' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Dark');
				pokemon.types = ["Ground", "Dark"];
			}
			if (name === 'terrasteel' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Steel');
				pokemon.types = ["Ground", "Steel"];
			}
			if (name === 'terrapixie' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ground/Fairy');
				pokemon.types = ["Ground", "Fairy"];
			}
			if (name === 'aerokinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Psychic');
				pokemon.types = ["Flying", "Psychic"];
			}
			if (name === 'butterfly' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Bug');
				pokemon.types = ["Flying", "Bug"];
			}
			if (name === 'pterodactyl' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Rock');
				pokemon.types = ["Flying", "Rock"];
			}
			if (name === 'spirit' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Ghost');
				pokemon.types = ["Flying", "Ghost"];
			}
			if (name === 'draco' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Dragon');
				pokemon.types = ["Flying", "Dragon"];
			}
			if (name === 'dogekiss' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Flying/Fairy');
				pokemon.types = ["Flying", "Fairy"];
			}
			if (name === 'entomopathy' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Bug');
				pokemon.types = ["Psychic", "Bug"];
			}
			if (name === 'geokinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Rock');
				pokemon.types = ["Psychic", "Rock"];
			}
			if (name === 'ouijaboard' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Ghost');
				pokemon.types = ["Psychic", "Ghost"];
			}
			if (name === 'dracokinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Dragon');
				pokemon.types = ["Psychic", "Dragon"];
			}
			if (name === 'umbrekinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Dark');
				pokemon.types = ["Psychic", "Dark"];
			}
			if (name === 'ferrukinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Steel');
				pokemon.types = ["Psychic", "Steel"];
			}
			if (name === 'pixkinesis' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Psychic/Fairy');
				pokemon.types = ["Psychic", "Fairy"];
			}
			if (name === 'anomalocaris' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Rock');
				pokemon.types = ["Bug", "Rock"];
			}
			if (name === 'discarded' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Ghost');
				pokemon.types = ["Bug", "Ghost"];
			}
			if (name === 'antlion' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Dragon');
				pokemon.types = ["Bug", "Dragon"];
			}
			if (name === 'bullet' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Steel');
				pokemon.types = ["Bug", "Steel"];
			}
			if (name === 'lasius' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Dark');
				pokemon.types = ["Bug", "Dark"];
			}
			if (name === 'sweetant' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Fairy');
				pokemon.types = ["Bug", "Fairy"];
			}
			if (name === 'geospirit' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Ghost');
				pokemon.types = ["Rock", "Ghost"];
			}
			if (name === 'trex' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Dragon');
				pokemon.types = ["Rock", "Dragon"];
			}
			if (name === 'tlizard' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Dark');
				pokemon.types = ["Rock", "Dark"];
			}
			if (name === 'shield' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Steel');
				pokemon.types = ["Rock", "Steel"];
			}
			if (name === 'pixelrock' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Rock/Fairy');
				pokemon.types = ["Rock", "Fairy"];
			}
			if (name === 'draconic' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost/Dragon');
				pokemon.types = ["Ghost", "Dragon"];
			}
			if (name === 'souls' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost/Dark');
				pokemon.types = ["Ghost", "Dark"];
			}
			if (name === 'mask' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost/Steel');
				pokemon.types = ["Ghost", "Steel"];
			}
			if (name === 'fairydust' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Ghost/Fairy');
				pokemon.types = ["Ghost", "Fairy"];
			}
			if (name === 'yamata' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Dark');
				pokemon.types = ["Dragon", "Dark"];
			}
			if (name === 'temporal' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Steel');
				pokemon.types = ["Dragon", "Steel"];
			}
			if (name === 'nicedragon' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dragon/Fairy');
				pokemon.types = ["Dragon", "Fairy"];
			}
			if (name === 'taintedmetal' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dark/Steel');
				pokemon.types = ["Dragon", "Steel"];
			}
			if (name === 'taintedfairy' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Dark/Fairy');
				pokemon.types = ["Dragon", "Fairy"];
			}
			if (name === 'pixieshield' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Steel/Fairy');
				pokemon.types = ["Steel", "Fairy"];
			}
		},
	},
];
