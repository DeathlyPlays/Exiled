'use strict';

exports.BattleItems = {
	"staticorb": {
		id: "staticorb",
		name: "Static Orb",
		spritenum: 251,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			pokemon.trySetStatus('par');
		},
		num: 273,
		gen: 0,
		desc: "At the end of every turn, this item attempts to paralyze the holder.",
	},
	"furrniumz": {
		id: "furrniumz",
		name: "Furrnium Z",
		spritenum: -656,
		onTakeItem: false,
		zMove: "Oblivion Banisher",
		zMoveFrom: "Shadow Claw",
		zMoveUser: ["Furret"],
		num: -124,
		gen: 0,
		desc: "If holder is a Furret with Shadow Claw, it can use Oblivion Banisher.",
	},
	"furretite": {
		id: "furretite",
		name: "Furretite",
		spritenum: -224,
		megaStone: "Furret-Mega",
		megaEvolves: "Furret",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -99,
		gen: 0,
		desc: "If holder is a Furret, this item allows it to Mega Evolve in battle.",
	},
	"flygonite": {
		id: "flygonite",
		name: "Flygonite",
		spritenum: -225,
		megaStone: "Flygon-Mega",
		megaEvolves: "Flygon",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -100,
		gen: 0,
		desc: "If holder is a Flygon, this item allows it to Mega Evolve in battle.",
	},
	"luxrite": {
		id: "luxrite",
		name: "Luxrite",
		spritenum: -226,
		megaStone: "Luxray-Mega",
		megaEvolves: "Luxray",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -101,
		gen: 0,
		desc: "If holder is a Luxray, this item allows it to Mega Evolve in battle.",
	},
	"walrite": {
		id: "walrite",
		name: "Walrite",
		spritenum: -225,
		megaStone: "Walrein-Mega",
		megaEvolves: "Walrein",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -102,
		gen: 0,
		desc: "If holder is a Walrein, this item allows it to Mega Evolve in battle.",
	},
	"butterfrite": {
		id: "butterfrite",
		name: "Butterfrite",
		spritenum: -226,
		megaStone: "Butterfree-Mega",
		megaEvolves: "Butterfree",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -103,
		gen: 0,
		desc: "If holder is a Butterfree, this item allows it to Mega Evolve in battle.",
	},
	"carbite": {
		id: "carbite",
		name: "Carbite",
		spritenum: -227,
		megaStone: "Carbink-Mega",
		megaEvolves: "Carbink",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -104,
		gen: 0,
		desc: "If holder is a Carbink, this item allows it to Mega Evolve in battle.",
	},
	"reunicite": {
		id: "reunicite",
		name: "Reunicite",
		spritenum: -228,
		megaStone: "Reuniclus-Mega",
		megaEvolves: "Reuniclus",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -105,
		gen: 0,
		desc: "If holder is a Reuniclus, this item allows it to Mega Evolve in battle.",
	},
	"milotite": {
		id: "milotite",
		name: "Milotite",
		spritenum: -229,
		megaStone: "Milotic-Mega",
		megaEvolves: "Milotic",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -106,
		gen: 0,
		desc: "If holder is a Milotic, this item allows it to Mega Evolve in battle.",
	},
	"greninjite": {
		id: "greninjite",
		name: "Greninjite",
		spritenum: -230,
		megaStone: "Greninja-Mega",
		megaEvolves: "Greninja",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -107,
		gen: 0,
		desc: "If holder is a Greninja, this item allows it to Mega Evolve in battle.",
	},
	"whiscashite": {
		id: "whiscashite",
		name: "Whiscashite",
		spritenum: -231,
		megaStone: "Whiscash-Mega",
		megaEvolves: "Whiscash",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -108,
		gen: 0,
		desc: "If holder is a Whiscash, this item allows it to Mega Evolve in battle.",
	},
	"cradilite": {
		id: "cradilite",
		name: "Cradilite",
		spritenum: -232,
		megaStone: "Cradily-Mega",
		megaEvolves: "Cradily",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -109,
		gen: 0,
		desc: "If holder is a Cradily, this item allows it to Mega Evolve in battle.",
	},
	"whimsicottite": {
		id: "whimsicottite",
		name: "Whimsicottite",
		spritenum: -233,
		megaStone: "Whimsicott-Mega",
		megaEvolves: "Whimsicott",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -110,
		gen: 0,
		desc: "If holder is a Whimsicott, this item allows it to Mega Evolve in battle.",
	},
	"lilligite": {
		id: "lilligite",
		name: "Lilligite",
		spritenum: -234,
		megaStone: "Lilligant-Mega",
		megaEvolves: "Lilligant",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -111,
		gen: 0,
		desc: "If holder is a Lilligant, this item allows it to Mega Evolve in battle.",
	},
	"shiftrite": {
		id: "shiftrite",
		name: "Shiftrite",
		spritenum: -235,
		megaStone: "Shiftry-Mega",
		megaEvolves: "Shiftry",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -111,
		gen: 0,
		desc: "If holder is a Shiftry, this item allows it to Mega Evolve in battle.",
	},
	"ludicolite": {
		id: "ludicolite",
		name: "Ludicolite",
		spritenum: -236,
		megaStone: "Ludicolo-Mega",
		megaEvolves: "Ludicolo",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -112,
		gen: 0,
		desc: "If holder is a Ludicolo, this item allows it to Mega Evolve in battle.",
	},
	"talonflite": {
		id: "talonflite",
		name: "Talonflite",
		spritenum: -237,
		megaStone: "Talonflame-Mega",
		megaEvolves: "Talonflame",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -113,
		gen: 0,
		desc: "If holder is a Talonflame, this item allows it to Mega Evolve in battle.",
	},
	"donphite": {
		id: "donphite",
		name: "Donphite",
		spritenum: -238,
		megaStone: "Donphan-Mega",
		megaEvolves: "Donphan",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -114,
		gen: 0,
		desc: "If holder is a Donphan, this item allows it to Mega Evolve in battle.",
	},
	"frosslite": {
		id: "frosslite",
		name: "Frosslite",
		spritenum: -239,
		megaStone: "Froslass-Mega",
		megaEvolves: "Froslass",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -115,
		gen: 0,
		desc: "If holder is a Froslass, this item allows it to Mega Evolve in battle.",
	},
	"laprite": {
		id: "laprite",
		name: "Laprite",
		spritenum: -240,
		megaStone: "Lapras-Mega",
		megaEvolves: "Lapras",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -116,
		gen: 0,
		desc: "If holder is a Lapras, this item allows it to Mega Evolve in battle.",
	},
	"weavite": {
		id: "weavite",
		name: "Weavite",
		spritenum: -241,
		megaStone: "Weavile-Mega",
		megaEvolves: "Weavile",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -117,
		gen: 0,
		desc: "If holder is a Weavile, this item allows it to Mega Evolve in battle.",
	},
	"miniorite": {
		id: "miniorite",
		name: "Miniorite",
		spritenum: -242,
		megaStone: "Minior-Mega",
		megaEvolves: "Minior",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Minior, this item allows it to Mega Evolve in battle.",
	},
	"blissite": {
		id: "blissite",
		name: "Blissite",
		spritenum: -243,
		megaStone: "Blissey-Mega",
		megaEvolves: "Blissey",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Blissey, this item allows it to Mega Evolve in battle.",
	},
	"mismagite": {
		id: "mismagite",
		name: "Mismagite",
		spritenum: -243,
		megaStone: "Mismagius-Mega",
		megaEvolves: "Mismagius",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Mismagius, this item allows it to Mega Evolve in battle.",
	},
	"honchkrite": {
		id: "honchkrite",
		name: "Honchkrite",
		spritenum: -243,
		megaStone: "Honchkrow-Mega",
		megaEvolves: "Honchkrow",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Honchkrow, this item allows it to Mega Evolve in battle.",
	},
	"lunite": {
		id: "lunite",
		name: "Lunite",
		spritenum: -243,
		megaStone: "Lunatone-Mega",
		megaEvolves: "Lunatone",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Lunatone, this item allows it to Mega Evolve in battle.",
	},
	"solite": {
		id: "solite",
		name: "Solite",
		spritenum: -243,
		megaStone: "Solrock-Mega",
		megaEvolves: "Solrock",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Solrock, this item allows it to Mega Evolve in battle.",
	},
	"weezite": {
		id: "weezite",
		name: "Weezite",
		spritenum: -243,
		megaStone: "Weezing-Mega",
		megaEvolves: "Weezing",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Weezing, this item allows it to Mega Evolve in battle.",
	},
	"forretrite": {
		id: "forretrite",
		name: "Forretrite",
		spritenum: -243,
		megaStone: "Forretress-Mega",
		megaEvolves: "Forretress",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Forretress, this item allows it to Mega Evolve in battle.",
	},
	"heatrite": {
		id: "heatrite",
		name: "Heatrite",
		spritenum: -243,
		megaStone: "Heatran-Mega",
		megaEvolves: "Heatran",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Heatran, this item allows it to Mega Evolve in battle.",
	},
	"bishite": {
		id: "bishite",
		name: "Bishite",
		spritenum: -243,
		megaStone: "Bisharp-Mega",
		megaEvolves: "Bisharp",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Bisharp, this item allows it to Mega Evolve in battle.",
	},
	"scraftite": {
		id: "scraftite",
		name: "Scraftite",
		spritenum: -243,
		megaStone: "Scrafty-Mega",
		megaEvolves: "Scrafty",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Scrafty, this item allows it to Mega Evolve in battle.",
	},
	"mienshite": {
		id: "mienshite",
		name: "Mienshite",
		spritenum: -243,
		megaStone: "Mienshao-Mega",
		megaEvolves: "Mienshao",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Mienshao, this item allows it to Mega Evolve in battle.",
	},
	"florgite": {
		id: "florgite",
		name: "Florgite",
		spritenum: -243,
		megaStone: "Florges-Mega",
		megaEvolves: "Florges",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Florges, this item allows it to Mega Evolve in battle.",
	},
	"slowkingite": {
		id: "slowkingite",
		name: "Slowkingite",
		spritenum: -243,
		megaStone: "Slowking-Mega",
		megaEvolves: "Slowking",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Slowking, this item allows it to Mega Evolve in battle.",
	},
	"slakingite": {
		id: "slakingite",
		name: "Slakingite",
		spritenum: -243,
		megaStone: "Slaking-Mega",
		megaEvolves: "Slaking",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Slaking, this item allows it to Mega Evolve in battle.",
	},
	"eelektrite": {
		id: "eelektrite",
		name: "Eelektrite",
		spritenum: -243,
		megaStone: "Eelektross-Mega",
		megaEvolves: "Eelektross",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Eelektross, this item allows it to Mega Evolve in battle.",
	},
	"regigigite": {
		id: "regigigite",
		name: "Regigigite",
		spritenum: -243,
		megaStone: "Regigigas-Mega",
		megaEvolves: "Regigigas",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Regigigas, this item allows it to Mega Evolve in battle.",
	},
	"timegear": {
		id: "timegear",
		name: "Time Gear",
		spritenum: -390,
		onSwitchIn: function (pokemon) {
			if (pokemon.isActive && pokemon.baseTemplate.species === 'Dialga') {
				this.insertQueue({pokemon: pokemon, choice: 'runPrimal'});
			}
		},
		onPrimal: function (pokemon) {
			let template = this.getTemplate('Dialga-Primal');
			pokemon.formeChange(template);
			pokemon.baseTemplate = template;
			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			if (pokemon.illusion) {
				pokemon.ability = ''; // Don't allow Illusion to wear off
				this.add('-primal', pokemon.illusion);
			} else {
				this.add('detailschange', pokemon, pokemon.details);
				this.add('-primal', pokemon);
			}
			pokemon.setAbility(template.abilities['0']);
			pokemon.baseAbility = pokemon.ability;
		},
		onTakeItem: function (item, source) {
			if (source.baseTemplate.baseSpecies === 'Groudon') return false;
			return true;
		},
		num: -534,
		gen: 0,
		desc: "If holder is a Dialga, this item triggers its Primal Reversion in battle.",
	},
	"gliscorite": {
		id: "gliscorite",
		name: "Gliscorite",
		spritenum: -243,
		megaStone: "Gliscor-Mega",
		megaEvolves: "Gliscor",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Gliscor, this item allows it to Mega Evolve in battle.",
	},
	"torterrite": {
		id: "torterrite",
		name: "Torterrite",
		spritenum: -243,
		megaStone: "Torterra-Mega",
		megaEvolves: "Torterra",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Torterra, this item allows it to Mega Evolve in battle.",
	},
	"kabutite": {
		id: "kabutite",
		name: "Kabutite",
		spritenum: -243,
		megaStone: "Kabutops-Mega",
		megaEvolves: "Kabutops",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Kabutops, this item allows it to Mega Evolve in battle.",
	},
	"omastite": {
		id: "omastite",
		name: "Omastite",
		spritenum: -243,
		megaStone: "Omastar-Mega",
		megaEvolves: "Omastar",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Omastar, this item allows it to Mega Evolve in battle.",
	},
	"luminite": {
		id: "luminite",
		name: "Luminite",
		spritenum: -243,
		megaStone: "Lumineon-Mega",
		megaEvolves: "Lumineon",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Lumineon, this item allows it to Mega Evolve in battle.",
	},
	"volcanionite": {
		id: "volcanionite",
		name: "Volcanionite",
		spritenum: -243,
		megaStone: "Volcanion-Mega",
		megaEvolves: "Volcanion",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: -118,
		gen: 0,
		desc: "If holder is a Volcanion, this item allows it to Mega Evolve in battle.",
	},
};