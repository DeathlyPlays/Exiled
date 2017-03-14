'use strict';

exports.BattleScripts = {
	randomSeasonalMeleeTeam: function (side) {
		let userid = toId(side.name);
		let team = [];
		var variant = (this.random(2) === 1);
		var sets = {
			'Blissey': {
				species: 'Blissey',
				item: 'Choice Scarf',
				ability: 'Blissful',
				moves: ['psystrike', 'triattack', 'shadowball'],
				baseSignatureMove: 'Final Gambit',
				signatureMove: 'Final Gambit',
				evs: {
					hp: 252,
					spe: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Timid',
			},
			'Blissey 2.0': {
				species: 'Blissey',
				item: 'Choice Scarf',
				ability: 'Imposter',
				moves: ['recover', 'healbell', 'transform'],
				signatureMove: 'Tri Attack',
				evs: {
					hp: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Hasty',
			},
			'Slaking': {
				species: 'Slaking',
				item: 'Choice Band',
				ability: 'Too Stronk',
				moves: ['return', 'knockoff', 'earthquake'],
				signatureMove: 'Explosion',
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: 'Adamant',
			},
			'Sunkern': {
				species: 'Sunkern',
				item: 'Focus Sash',
				ability: 'Sunshine',
				moves: ['solarbeam', 'earthpower', 'blueflare'],
				baseSignatureMove: 'supahawtmixtape',
				signatureMove: 'SUPA HAWT MIXTAPE',
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Timid',
			},
			'Regigigas': {
				species: 'Regigigas',
				item: 'Life Orb',
				ability: 'Too Stronk',
				moves: ['psychocut', 'earthquake', 'knockoff'],
				signatureMove: 'Return',
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: 'Jolly',
			},
			'Wynaut': {
				species: 'Wynaut',
				item: 'Eviolite',
				ability: 'Wynaut',
				moves: ['recover', 'transform', 'finalgambit'],
				signatureMove: 'Destiny Bond',
				evs: {
					hp: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Hasty',
			},
			'Sunflora': {
				species: 'Sunflora',
				item: 'Focus Sash',
				ability: 'Sunshine',
				moves: ['solarbeam', 'sludgewave', 'earthpower'],
				baseSignatureMove: 'flowergarden',
				signatureMove: 'Flower Garden',
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Timid',
			},
			'Clefable': {
				species: 'Clefable',
				item: 'Power Herb',
				ability: 'Bawlky',
				moves: ['recover', 'geomancy', 'recycle'],
				signatureMove: 'Moonblast',
				evs: {
					hp: 248,
					def: 252,
					spd: 8
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Bold',
			},
			'Shedinja': {
				species: 'Shedinja',
				item: 'Lum Berry',
				ability: 'Sturdy',
				moves: ['shadowsneak', 'swordsdance', 'recycle'],
				signatureMove: 'Megahorn',
				evs: {
					atk: 252,
					spe: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: 'Jolly',
			},
			'Sableye': {
				species: 'Sableye-Mega',
				item: 'Leftovers',
				ability: 'Bawlky',
				moves: ['recover', 'knockoff', 'toxic'],
				signatureMove: 'Cosmic Power',
				evs: {
					hp: 248,
					def: 252,
					spd: 8
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Bold',
			},
			'Excadrill': {
				species: 'Excadrill',
				item: 'Choice Scarf',
				ability: 'Too Stronk',
				moves: ['precipiceblades', 'ironhead', 'stoneedge'],
				signatureMove: 'Knock Off',
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: 'Jolly',
			},
			'Arceus': {
				species: 'Arceus',
				item: 'Life Orb',
				ability: 'Too Stronk',
				moves: ['return', 'knockoff', 'precipiceblades'],
				signatureMove: 'Extreme Speed',
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: 'Jolly',
			},
			"Don't Fuckle": {
				species: 'Shuckle',
				item: 'Leftovers',
				ability: 'Bawlky',
				moves: ['cosmicpower', 'toxic', 'recover'],
				signatureMove: "Gyro Ball",
				evs: {
					hp: 252,
					spd: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 0
				},
				nature: 'Sassy',
			},
			'Archeops': {
				species: 'Archeops',
				item: 'Choice Scarf',
				ability: 'Too Stronk',
				moves: ['headsmash', 'bravebird', 'knockoff'],
				signatureMove: 'Precipice Blades',
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: 'Jolly',
			},
			'Gyarados': {
				species: 'Gyarados-Mega',
				item: 'Life Orb',
				ability: 'Too Stronk',
				moves: ['waterfall', 'knockoff', 'dragonascent'],
				signatureMove: 'Sucker Punch',
				evs: {
					atk: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: 'Jolly',
			},
			'Instinct': {
				species: 'Zapdos',
				item: 'Life Orb',
				ability: 'OP BIRBS',
				moves: ['thunderbolt', 'flamethrower', 'voltswitch'],
				signatureMove: 'Hurricane',
				evs: {
					spa: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Timid',
			},
			'Valor': {
				species: 'Moltres',
				item: 'Choice Scarf',
				ability: 'OP BIRBS',
				moves: ['flamethrower', 'hurricane', 'seedflare'],
				baseSignatureMove: 'passengermode',
				signatureMove: 'Passenger Mode',
				evs: {
					spa: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Timid',
			},
			'Mystic': {
				species: 'Articuno',
				item: 'Leftovers',
				ability: 'OP BIRBS',
				moves: ['freezedry', 'hurricane', 'roost'],
				signatureMove: 'Calm Mind',
				evs: {
					hp: 252,
					spd: 252,
					spa: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Calm',
			},
			'Harmony': {
				species: 'Lugia',
				item: 'Leftovers',
				ability: 'OP BIRBS',
				moves: ['aeroblast', 'psystrike', 'roost'],
				signatureMove: 'Toxic',
				evs: {
					hp: 252,
					spd: 252,
					spa: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Calm',
			},
			'Sunlight': {
				species: 'Ho-Oh',
				item: 'Leftovers',
				ability: 'OP BIRBS',
				moves: ['sacredfire', 'bravebird', 'precipiceblades'],
				signatureMove: 'Roost',
				evs: {
					atk: 252,
					hp: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: 'Adamant',
			},
			'Delta': {
				species: 'Rayquaza-Mega',
				item: 'Life Orb',
				ability: 'Contrary',
				moves: ['outrage', 'superpower', 'dragonascent'],
				signatureMove: 'Precipice Blades',
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: 'Jolly',
			},
			'Landorus': {
				species: 'Landorus',
				item: 'Life Orb',
				ability: 'Sheer Force',
				moves: ['earthpower', 'hurricane', 'focusblast'],
				signatureMove: 'Ice Beam',
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Timid',
			},
			'Darkness': {
				species: 'Yveltal',
				item: 'Life Orb',
				ability: 'OP BIRBS',
				moves: ['hurricane', 'darkpulse', 'psychic'],
				signatureMove: 'Sucker Punch',
				evs: {
					spa: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Timid',
			},
			'Giratina': {
				species: 'Giratina-Origin',
				item: 'Leftovers',
				ability: 'OP BIRBS',
				moves: ['shadowball', 'dracometeor', 'sludgebomb'],
				signatureMove: 'Roost',
				evs: {
					hp: 244,
					spa: 252,
					spd: 14
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Modest',
			},
			'Thundurus': {
				species: 'Thundurus',
				item: 'Life Orb',
				ability: 'OP BIRBS',
				moves: ['thunderbolt', 'hurricane', 'voltswitch'],
				signatureMove: 'Seed Flare',
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Timid',
			},
			'Tornadus': {
				species: 'Tornadus-Therian',
				item: 'Life Orb',
				ability: 'OP BIRBS',
				moves: ['hurricane', 'flamethrower', 'roost'],
				signatureMove: 'Knock Off',
				evs: {
					spa: 252,
					spe: 252,
					atk: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Hasty',
			},
			'Gambler': {
				species: 'Blissey',
				item: 'Dice',
				ability: 'Risk',
				moves: ['recover', 'toxic', 'healbell'],
				baseSignatureMove: 'gamble',
				signatureMove: 'Gamble',
				evs: {
					spa: 252,
					hp: 252,
					atk: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Modest',
			},
			'Sans': {
				species: 'Gengar',
				ability: 'Bad Time',
				moves: ['blueattack', 'orangeattack', 'dunkedon'],
				baseSignatureMove: 'badtime',
				signatureMove: 'Bad Time',
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: 'Timid',
			},
			"Kaiser": {
				species: "Rayquaza-Mega",
				ability: "Barrier Change",
				gender: "M",
				shiny: true,
				moves: ['ultima', 'northerncross', 'curaga'],
				baseSignatureMove: "dispel",
				signatureMove: "Dispel",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Timid",
			},
			"Red Dragon": {
				species: "Charizard-Mega-Y",
				ability: "Life Force",
				item: "Risky Orb",
				gender: "M",
				moves: ['meltdown', 'mightyguard', 'death'],
				baseSignatureMove: "eraser",
				signatureMove: "Eraser",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Jolly",
			},
			"Christopher": {
				species: "Deoxys-Speed",
				ability: "Sharp's Prayer",
				item: "Choice Scarf",
				gender: "M",
				moves: ['sheercold', 'horndrill', 'fissure'],
				baseSignatureMove: "murrinslash",
				signatureMove: "Murrin Slash",
				evs: {
					spe: 252,
					hp: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Jolly",
			},
			"Slaking V2": {
				species: "Slaking",
				ability: "Huge Power",
				item: "Leftovers",
				gender: "M",
				moves: ['fakeout'],
				signatureMove: "Last Resort",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Hydreigon": {
				species: "Hydreigon",
				ability: "Contrary",
				item: "Choice Scarf",
				moves: ['overheat', 'psychoboost', 'dracometeor'],
				baseSignatureMove: "shade",
				signatureMove: "Shade",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Timid",
			},
			"Miguel": {
				species: "Pinsir-Mega",
				ability: "Sanik",
				item: "Flying Gem",
				moves: ['acrobatics', 'protect', 'earthquake'],
				signatureMove: "Extreme Speed",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Jolly",
			},
			"Zekrom": {
				species: "Zekrom",
				ability: "Too Stronk",
				item: "Choice Band",
				moves: ['boltstrike', 'sacredfire', 'precipiceblades'],
				signatureMove: "Outrage",
				evs: {
					atk: 252,
					spe: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Absol": {
				species: "Absol-Mega",
				ability: "Too Stronk",
				item: "Life Orb",
				moves: ['psychocut', 'nightslash', 'crosspoison'],
				baseSignatureMove: "luckyprediction",
				signatureMove: "Lucky Prediction",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Jolly",
			},
			"Missingno": {
				species: "Missingno",
				ability: "Memes",
				item: "Life Orb",
				moves: ['extremespeed', 'suckerpunch', 'machpunch'],
				baseSignatureMove: "error404",
				signatureMove: "ERROR 404",
				evs: {
					atk: 252,
					hp: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Mewtwo Xtreme": {
				species: "Mewtwo-Mega-X",
				ability: "Too Stronk",
				item: "Choice Band",
				moves: ['drainpunch', 'icepunch', 'suckerpunch'],
				baseSignatureMove: "zenpunch",
				signatureMove: "Zen Punch",
				evs: {
					atk: 252,
					spe: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Cameron": {
				species: "Arcanine",
				ability: "2Hot4U",
				item: "Leftovers",
				gender: "M",
				moves: ['protect', 'recover', 'healbell'],
				baseSignatureMove: "spitfire",
				signatureMove: "Spitfire",
				evs: {
					hp: 252,
					def: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Impish",
			},
			"Tank": {
				species: "Aggron-Mega",
				ability: "Bawlky",
				item: "Leftovers",
				moves: ['stealthrock', 'toxic', 'recover'],
				baseSignatureMove: "armytank",
				signatureMove: "Army Tank",
				evs: {
					hp: 252,
					def: 252,
					atk: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 0
				},
				nature: "Relaxed",
			},
			"Michael": {
				species: "Seviper",
				ability: "Drenched",
				item: "Life Orb",
				moves: ['poisonfang', 'icefang', 'crunch'],
				baseSignatureMove: "immabitechu",
				signatureMove: "Immabitechu",
				evs: {
					atk: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Jolly",
			},
			"Bibarel": {
				species: "Bibarel",
				ability: "Barrel Roll",
				item: "Leftovers",
				moves: ['waterfall', 'recover', 'earthquake'],
				baseSignatureMove: "bibarelroll",
				signatureMove: "BIBAREL ROLL",
				evs: {
					atk: 252,
					hp: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Castform": {
				species: "Castform",
				ability: "Forecast V2",
				item: "Focus Sash",
				shiny: true,
				moves: ['earthquake', 'ironhead', 'sandstorm'],
				baseSignatureMove: "sandydestruction",
				signatureMove: "Sandy Destruction",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Dunsparce": {
				species: "Dunsparce",
				ability: "DURP",
				item: "Leftovers",
				moves: ['zenheadbutt', 'crunch', 'extremespeed'],
				baseSignatureMove: "derp",
				signatureMove: "DERP",
				evs: {
					atk: 252,
					hp: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"CoCo": {
				species: "Ludicolo",
				ability: "Be Nonchalant",
				item: "Leftovers",
				shiny: true,
				gender: "F",
				moves: ['gigadrain', 'icebeam', 'focusblast'],
				baseSignatureMove: "dancehappily",
				signatureMove: "Dance Happily",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Timid",
			},
			"Twitter": {
				species: "Chatot",
				ability: "Retweet",
				item: "Choice Scarf",
				shiny: true,
				moves: ['chatter', 'bugbuzz', 'boomburst'],
				baseSignatureMove: 'tweet',
				signatureMove: "Tweet",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Timid",
			},
			"Amber": {
				species: "Ninetales-Alola",
				ability: "prfmador",
				item: "Life Orb",
				shiny: true,
				moves: ['gigadrain', 'earthpower', 'moonblast'],
				baseSignatureMove: "prfmayy",
				signatureMove: "prfmayy",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Timid",
			},
			"Illuminati": {
				species: "Unown",
				ability: "Elluminate",
				moves: ['eye', 'tridisaster', 'expose'],
				baseSignatureMove: "illuminaticonfirmed",
				signatureMove: "Illuminati Confirmed",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Modest",
			},
			"Volcanion": {
				species: "Volcanion",
				ability: "Volcanic Embers",
				item: "Assault Vest",
				moves: ['steameruption', 'gigadrain', 'earthpower'],
				baseSignatureMove: "volcaniceruption",
				signatureMove: "Volcanic Eruption",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Modest",
			},
			"STEEL BEAMS": {
				species: "Steelix-Mega",
				ability: "Jet Fumes Can't Melt Steel Beams",
				item: "Iron Vest",
				moves: ['earthquake', 'knockoff', 'stoneedge'],
				baseSignatureMove: "steelbeams",
				signatureMove: "STEEL BEAMS",
				evs: {
					hp: 252,
					def: 252,
					atk: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Impish",
			},
			"Jigglybuff": {
				species: "Jigglypuff",
				ability: "Pls nerf",
				item: "Eviolite",
				moves: ['storedpower', 'recover', 'boomburst'],
				baseSignatureMove: "bestinsupersmashbros",
				signatureMove: "BEST IN SUPER SMASH BROS",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Modest",
			},
			"HaxRUs": {
				species: "Haxorus",
				ability: "HaxRUs",
				item: "Life Orb",
				moves: ['meteormash', 'earthquake', 'drainpunch'],
				baseSignatureMove: "dragonsassault",
				signatureMove: "Dragon's Assault",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Regice": {
				species: "Regice",
				ability: "ICEE",
				item: "Assault Vest",
				moves: ['freezedry', 'gigadrain', 'earthpower'],
				baseSignatureMove: "frosty",
				signatureMove: "Frosty",
				evs: {
					hp: 252,
					spd: 252,
					spa: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Calm",
			},
			"BlueEyesWhiteDragon": {
				species: "Reshiram",
				ability: "Blue Eyes White Dragon",
				item: "Choice Specs",
				moves: ['blueflare', 'earthpower', 'thunderbolt'],
				baseSignatureMove: "dracoblast",
				signatureMove: "Draco Blast",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Modest",
			},
			"RumpADump": {
				species: "Camerupt-Mega",
				ability: "The True God",
				item: "Tricky Rock",
				gender: "M",
				moves: ['paleowave', 'seedflare', 'fireblast'],
				baseSignatureMove: "superearthpower",
				signatureMove: "Super Earth Power",
				evs: {
					spa: 252,
					hp: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 0
				},
				nature: "Quiet",
			},
			"Rotom Fan": {
				species: "Rotom-Fan",
				ability: "TMGI",
				item: "Pidgeotite",
				moves: ['groundbreaker', 'gtfo', 'wdtdttm'],
				baseSignatureMove: "nomansland",
				signatureMove: "No Man's Land",
				evs: {
					spa: 252,
					spe: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Timid",
			},
			"Trump": {
				species: "Gumshoos",
				ability: "WALL",
				item: "Leftovers",
				gender: "M",
				moves: ['earthquake', 'knockoff', 'drainpunch'],
				baseSignatureMove: "makeexiledgreatagain",
				signatureMove: "Make Exiled Great Again",
				evs: {
					atk: 252,
					hp: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Demon Pikachu": {
				species: "Mimikyu",
				ability: "Demonic Mascot",
				item: "Life Orb",
				moves: ['highjumpkick', 'volttackle', 'shadowsneak'],
				baseSignatureMove: "mascotplz",
				signatureMove: "Mascot Plz",
				evs: {
					atk: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Jolly",
			},
			"Le War Horse": {
				species: "Mudsdale",
				ability: "War Horse",
				item: "Leftovers",
				moves: ['thousandarrows', 'drainpunch', 'recover'],
				baseSignatureMove: "trojanhorse",
				signatureMove: "Trojan Horse",
				evs: {
					hp: 252,
					atk: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Tactician": {
				species: "Aegislash-Shield",
				ability: "Gear Up",
				item: "Leftovers",
				shiny: true,
				moves: ['guard', 'stab', 'megalixir'],
				baseSignatureMove: "spook",
				signatureMove: "Spook",
				evs: {
					hp: 252,
					def: 252,
					spd: 252,
					atk: 252
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Amoonguss": {
				species: "Amoonguss",
				ability: "Fungus",
				item: "Black Sludge",
				moves: ['gigadrain', 'venoshock', 'cosmicpower'],
				baseSignatureMove: "virus",
				signatureMove: "Virus",
				evs: {
					hp: 252,
					def: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Bold",
			},
			"Gone2School": {
				species: "Wishiwashi-School",
				ability: "Bookfish",
				item: "Leftovers",
				moves: ['thousandarrows', 'knockoff', 'iciclecrash'],
				baseSignatureMove: "knowledgeispower",
				signatureMove: "Knowledge is Power",
				evs: {
					atk: 252,
					hp: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Team Popplio": {
				species: "Primarina",
				ability: "Clown Sightings",
				item: "Assault Vest",
				moves: ['moonblast', 'earthpower', 'gigadrain'],
				baseSignatureMove: "clownroutine",
				signatureMove: "Clown Routine",
				evs: {
					spa: 252,
					hp: 252,
					spd: 252
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Modest",
			},
			"Time Lord": {
				species: "Dialga",
				ability: "Time Traveler",
				item: "Tricky Rock",
				moves: ['flashcannon', 'psychic', 'earthpower'],
				baseSignatureMove: "timetravel",
				signatureMove: "Time Travel",
				evs: {
					spa: 252,
					hp: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 0
				},
				nature: "Quiet",
			},
			"Exiled Server": {
				species: "Darkrai",
				ability: "Dankrai",
				item: "Life Orb",
				moves: ['psychic', 'focusblast', 'sludgewave'],
				baseSignatureMove: "exile",
				signatureMove: "Exile",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Timid",
			},
			"Anorexic": {
				species: "Mewtwo-Mega-Y",
				ability: "Anorexia",
				item: "Choice Specs",
				moves: ['dracometeor', 'overheat', 'leafstorm'],
				baseSignatureMove: "megastoredpower",
				signatureMove: "Mega Stored Power",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Timid",
			},
			"Greninja": {
				species: "Greninja-Ash",
				ability: "Ninja",
				item: "Life Orb",
				gender: "M",
				moves: ['darkpulse', 'psychic', 'secretsword'],
				baseSignatureMove: "eternalbond",
				signatureMove: "Eternal Bond",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Timid",
			},
			"Decidueye": {
				species: "Decidueye",
				ability: "Flappy Rowlet",
				item: "Leftovers",
				moves: ['knockoff', 'drainpunch', 'shadowsneak'],
				baseSignatureMove: "extremeleech",
				signatureMove: "extremeleech",
				evs: {
					hp: 252,
					atk: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Meloetta": {
				species: "Meloetta",
				ability: "Melodic Harmony",
				item: "Life Orb",
				moves: ['secretsword', 'boomburst', 'moonblast'],
				baseSignatureMove: "melody",
				signatureMove: "Melody",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Timid",
			},
			"Eggman": {
				species: "Exeggutor-Alola",
				ability: "FUCKING SMASHING",
				item: "Leftovers",
				moves: ['dragonpulse', 'earthpower', 'aurasphere'],
				baseSignatureMove: "ultradrain",
				signatureMove: "Ultra Drain",
				evs: {
					spa: 252,
					hp: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Modest",
			},
			"Zygarde": {
				species: "Zygarde-Complete",
				ability: "Cell Manipulation",
				item: "Leftovers",
				moves: ['thousandarrows', 'boltstrike', 'sacredfire'],
				baseSignatureMove: "cellmutation",
				signatureMove: "Cell Mutation",
				evs: {
					atk: 252,
					hp: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Incineroar": {
				species: "Incineroar",
				ability: "xD rawr",
				item: "Leftovers",
				moves: ['knockoff', 'drainpunch', 'thousandarrows'],
				baseSignatureMove: "itslit",
				signatureMove: "It's Lit",
				evs: {
					atk: 252,
					hp: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Eevee": {
				species: "Eevee",
				ability: "Master Evolution Lord",
				item: "Eviolite",
				moves: ['crunch', 'closecombat', 'waterfall'],
				baseSignatureMove: "whenthesquadgotyourback",
				signatureMove: "When The Squad Got Your Back",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Jolly",
			},
			"Mew": {
				species: "Mew",
				ability: "Originality",
				item: "Leftovers",
				moves: ['secretsword', 'moonblast', 'earthpower'],
				baseSignatureMove: "failedexperiment",
				signatureMove: "Failed Experiment",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 252,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31,
				},
				nature: "Timid",
			},
			"Slowbro....": {
				species: "Slowbro",
				item: "Broooo",
				ability: "Slowwww",
				moves: ['unaffected', 'smw', 'wha'],
				baseSignatureMove: "irm",
				signatureMove: "IRM",
				evs: {
					hp: 252,
					spa: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Modest",
			},
			"Tapu Keko": {
				species: "Tapu Koko",
				ability: "Guardian of Melemele",
				item: "Choice Scarf",
				moves: ['wildcharge', 'knockoff', 'thousandarrows'],
				baseSignatureMove: "topkeko",
				signatureMove: "top keko",
				evs: {
					atk: 252,
					spe: 252,
					spd: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Jolly",
			},
			"Fruit Loops": {
				species: "Toucannon",
				ability: "Toucannon Sam",
				item: "Leftovers",
				moves: ['roost', 'knockoff', 'bravebird'],
				baseSignatureMove: "firethecannons",
				signatureMove: "Fire the Cannons",
				evs: {
					atk: 252,
					hp: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
			"Diancie": {
				species: "Diancie-Mega",
				ability: "Fairy Princess",
				item: "Leftovers",
				moves: ['moonblast', 'shellsmash', 'earthpower'],
				baseSignatureMove: "secretservice",
				signatureMove: "Secret Service",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				},
				nature: "Timid",
			},
			"Solgaleo": {
				species: "Solgaleo",
				ability: "Stainless Steel",
				item: "Leftovers",
				moves: ['meteormash', 'zenheadbutt', 'thousandarrows'],
				baseSignatureMove: "nowimfire",
				signatureMove: "Now I'm Fire",
				evs: {
					atk: 252,
					hp: 252,
					def: 4
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 0,
					spd: 31,
					spe: 31
				},
				nature: "Adamant",
			},
		};

		let pool = Object.keys(sets);
		for (let i = 0; i < 6; i++) {
			let name = this.sampleNoReplace(pool);
			let set = sets[name];
			set.name = name;
			set.level = 100;
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			team.push(set);
		}

		return team;
	},
};
