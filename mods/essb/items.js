'use strict';

exports.BattleItems = {
	"playniumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "playniumz",
		name: "Playnium Z",
		zMove: "Exiled From All Others",
		zMoveFrom: "Aqua Subscribe",
		zMoveUser: ["Ludicolo-Mega"],
		num: -1,
		gen: -1,
		desc: "If holder is a Ludicolo with Aqua Subscribe, it can use Exiled From All Others.",
	},
	"flarez": {
		spritenum: 656,
		onTakeItem: false,
		zMove: "Teraflare",
		zMoveFrom: "Megaflare",
		name: "Flare Z",
		id: "flarez",
		zMoveUser: ["Groudon-Primal"],
		num: -2,
		gen: -1,
		desc: "If holder is a Groudon-Primal with Megaflare, it can use Teraflare.",
	},
	"thekidz": {
		spritenum: 656,
		onTakeItem: false,
		zMove: "Accept The Memes",
		zMoveFrom: "Attitude Adjustment",
		name: "thekidz",
		id: "thekidz",
		zMoveUser: ["Mewtwo"],
		num: -3,
		gen: -1,
		desc: "If holder is Mewtwo with Attitude Adjustment, it can use Accept The Memes.",
	},
	"relicofchoiceness": {
		id: "relicofchoiceness",
		name: "Relic of Choiceness",
		spritenum: 69,
		fling: {
			basePower: 10,
		},
		onStart: function (pokemon) {
			if (pokemon.volatiles['choicelock']) {
				this.debug('removing choicelock: ' + pokemon.volatiles.choicelock);
			}
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove: function (move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifySpe: function (spe) {
			return this.chainModify(1.5);
		},
		onModifySpAPriority: 1,
		onModifySpA: function (spa) {
			return this.chainModify(1.5);
		},
		isChoice: true,
		num: -4,
		gen: -1,
		desc: "Holder's Speed & Special Attack is 1.5x, but it can only select the first move it executes.",
	},
	"marveliumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "marveliumz",
		name: "Marvelium Z",
		zMove: "Hyper Viper Beam",
		zMoveFrom: "Hail Storm",
		zMoveUser: ["Rotom-Frost"],
		num: -5,
		gen: -1,
		desc: "If holder is a Rotom-Frost with Hail Storm, it can use Hyper Viper Beam.",
	},
	"haxiumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "haxiumz",
		name: "Haxium Z",
		zMove: "Too Much Hax",
		zMoveFrom: "H-Axe",
		zMoveUser: ["Haxorus"],
		num: -1,
		gen: -6,
		desc: "If holder is a Haxorus with H-Axe, it can use Too Much Hax.",
	},
	"generalannoyance": {
		id: "generalannoyance",
		name: "General Annoyance",
		spritenum: 242,
		fling: {
			basePower: 10,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			this.heal(pokemon.maxhp / 4);
		},
		num: -7,
		gen: -2,
		desc: "At the end of every turn, holder restores 1/4 of its max HP.",
	},
	"bagofls": {
		id: "bagofls",
		name: "Bag of Ls",
		spritenum: 537,
		fling: {
			basePower: 10,
		},
		onSourceModifyAccuracy: function (accuracy) {
			if (typeof accuracy === 'number') {
				return accuracy * 1.1;
			}
		},
		num: -22,
		gen: -4,
		desc: "The accuracy of attacks by the holder is 1.1x.",
	},
	"psychogenerator": {
		id: "psychogenerator",
		name: "Psycho Generator",
		spritenum: 476,
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			this.heal(pokemon.maxhp / 16);
			let stats = [];
			for (let stat in pokemon.boosts) {
				if (stat !== 'accuracy' && stat !== 'evasion' && pokemon.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				let randomStat = stats[this.random(stats.length)];
				let boost = {};
				boost[randomStat] = 1;
				this.boost(boost);
			}
		},
		num: -288,
		gen: -1,
	},
	"armorvest": {
		id: "armorvest",
		name: "Armor Vest",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onModifyDefPriority: 1,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		onDisableMove: function (pokemon) {
			let moves = pokemon.moveset;
			for (let i = 0; i < moves.length; i++) {
				if (this.getMove(moves[i].move).category === 'Status') {
					pokemon.disableMove(moves[i].id);
				}
			}
		},
		num: -640,
		gen: -6,
		desc: "Holder's Sp. Def is 1.5x, but it can only select damaging moves.",
	},
	"douglasiniumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "douglasiniumz",
		name: "Douglasinium Z",
		zMove: "Punchyru Massacre Z",
		zMoveFrom: "Punchy Fury",
		zMoveUser: ["Conkeldurr"],
		num: -99,
		gen: -1,
		desc: "If holder is a Conkeldurr with Punchy Fury, it can use Punchyru Massacre Z.",
	},
	"amazingplate": {
		id: "amazingplate",
		name: "Amazing Plate",
		spritenum: 572,
		onBasePowerPriority: 6,
		onBasePower: function (basePower, user, target, move) {
			if (move && move.stab || move.type === '???') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem: false,
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon, target, source) {
			this.heal(pokemon.maxhp / 8);
		},
		num: -305,
		gen: -4,
		desc: "7.8/10 too much code.",
	},
};
