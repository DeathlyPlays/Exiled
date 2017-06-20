'use strict';

exports.BattleItems = {
	"playniumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "playniumz",
		name: "Playnium Z",
		zMove: "EXTREME SUPER MEGA ULTIMATE ALPHA GIGA SUPREME FANTASTIC EXTRA PREFIX COMBO BREAKER",
		zMoveFrom: "Aqua Subscribe",
		zMoveUser: ["Ludicolo-Mega"],
		num: -1,
		gen: -1,
		desc: "If holder is a Ludicolo with Aqua Subscribe, it can use EXTREME SUPER MEGA ULTIMATE ALPHA GIGA SUPREME FANTASTIC EXTRA PREFIX COMBO BREAKER.",
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
	"playeriniumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "playeriniumz",
		name: "Playerinium Z",
		zMove: "Rush Of Volcano Thunder",
		zMoveFrom: "Rush of Dragon Bolt",
		zMoveUser: ["Dragonite"],
		num: -429,
		gen: -7,
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
		gen: -1,
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
		num: -8,
		gen: -1,
		desc: "The accuracy of attacks by the holder is 1.1x.",
	},
	"perception": {
		id: "perception",
		name: "Perception",
		spritenum: 285,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			let conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock'];
			for (let i = 0; i < conditions.length; i++) {
				if (pokemon.volatiles[conditions[i]]) {
					for (let j = 0; j < conditions.length; j++) {
						pokemon.removeVolatile(conditions[j]);
						if (conditions[i] === 'attract' && conditions[j] === 'attract') {
							this.add('-end', pokemon, 'move: Attract', '[from] item: Perception');
						}
					}
					return;
				}
			}
			if (pokemon.status || pokemon.volatiles['confusion']) {
				pokemon.cureStatus();
				pokemon.removeVolatile('confusion');
			}
		},
		num: -20,
		gen: -1,
		desc: "Cures holder of Attract, Disable, Encore, Heal Block, Taunt, Torment, Confusion, and major status conditions.",
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
		onModifySpDPriority: 1,
		onModifySpD: function (spd) {
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
		num: -10,
		gen: -1,
		desc: "Holder's Sp. Def and Defense are boosted by 2x, but it can only select damaging moves.",
	},
	"douglasiniumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "douglasiniumz",
		name: "Douglasinium Z",
		zMove: "Punchyru Massacre Z",
		zMoveFrom: "Punchy Fury",
		zMoveUser: ["Conkeldurr"],
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			pokemon.trySetStatus('brn');
		},
		num: -11,
		gen: -1,
		desc: "If holder is a Conkeldurr with Punchy Fury, it can use Punchyru Massacre Z, and burns holder every turn.",
	},
	"superquickclaw": {
		id: "superquickclaw",
		onModifyPriorityPriority: -1,
		onModifyPriority: function (priority, pokemon) {
			if (this.random(1) === 0) {
				this.add('-activate', pokemon, 'item: Quick Claw');
				return Math.round(priority) + 2.9;
			}
		},
		name: "Super Quick Claw",
		spritenum: 373,
		fling: {
			basePower: 120,
		},
		num: -6000,
		gen: 2,
		desc: "Each turn, holder has a 50% chance to move first in its priority bracket.",
	},
	"rainbowplate": {
		id: "rainbowplate",
		name: "Rainbow Plate",
		spritenum: 572,
		onBasePowerPriority: 6,
		onBasePower: function (basePower, user, target, move) {
			if (move && move.stab || move.type === '???') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			this.heal(pokemon.maxhp / 8);
		},
		onTakeItem: false,
		num: -12,
		gen: -1,
		desc: "7.8/10 too much code.",
	},
	"hydriumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "hydriumz",
		name: "Hydrium-Z",
		zMove: "Oceanic Song",
		zMoveFrom: "Hydraulic Blast",
		zMoveUser: ["Milotic"],
		num: -12,
		gen: -1,
		desc: "If holder is a Milotic with Hydraulic Blast, it can use Oceanic Song.",
	},
	"legendiniumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "legendiniumz",
		name: "Legendinium Z",
		zMove: "Legend's Destruction",
		zMoveFrom: "Lord's Wrath",
		zMoveUser: ["Rayquaza-Mega"],
		num: -13,
		gen: -1,
		desc: "If holder is a Rayquaza-Mega with Lord's Wrath, it can use Legend's Destruction.",
	},
	"arcaniumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "arcaniumz",
		name: "Arcanium Z",
		zMove: "Horrific Memes",
		zMoveFrom: "Horrific Roasts",
		zMoveUser: ["Arcanine"],
		num: -14,
		gen: -1,
		desc: "If holder is an Arcanine with Horrific Roasts, it can use Horrific Memes.",
	},
	"kanekiniumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "kanekiniumz",
		name: "Kanekinium Z",
		zMove: "ULTRA MEGA SUPER FANTASTIC FLAMETHROWER OF THE GODS",
		zMoveFrom: "Super Ultra Flamethrower Destroyer of Universes",
		zMoveUser: ["Ninetales"],
		num: -15,
		gen: -1,
		desc: "If holder is an Ninetales with Super Ultra Flamethrower Destroyer of Universes, it can use ULTRA MEGA SUPER FANTASTIC FLAMETHROWER OF THE GODS.",
	},
	"bigflower": {
		id: "bigflower",
		name: "Big Flower",
		spritenum: 130,
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
			return this.chainModify(1.2);
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
			return this.chainModify(1.2);
		},
		onModifySpAPriority: 2,
		onModifySpA: function (spa, pokemon) {
			return this.chainModify(1.2);
		},
		num: 538,
		gen: 5,
		desc: "Raises Defense, SpDefense and SpAttack by 20%.",
	},
	"bulbasauriumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "bulbasauriumz",
		name: "Bulbasaurium Z",
		zMove: "One Bulbasaur Horde",
		zMoveFrom: "Bulba Lord",
		zMoveUser: ["Bulbasaur"],
		num: -15,
		gen: -1,
		desc: "If holder is an Bulbasaur with Bulba Lord, it can use One Bulbasaur Horde.",
	},
	"ultimateberry": {
		id: "ultimateberry",
		name: "Ultimate Berry",
		spritenum: 217,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dark",
		},
		onUpdate: function (pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony'))) {
				pokemon.eatItem();
			}
		},
		onEat: function (pokemon) {
			let stats = [];
			for (let stat in pokemon.boosts) {
				if (stat !== 'accuracy' && stat !== 'evasion' && stat !== 'spa' && stat !== 'spe' && pokemon.boosts[stat] < 6) {
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
		num: -16,
		gen: -1,
		desc: "Randomly boosts a stat at 1/4 health; 1/2 if Gluttony.",
	},
	"healthorb": {
		id: "healthorb",
		name: "Health Orb",
		spritenum: 249,
		fling: {
			basePower: 30,
		},
		onModifyDamage: function (damage, source, target, move) {
			return this.chainModify([0x14CC, 0x1000]);
		},
		onAfterMoveSecondarySelf: function (source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !move.ohko) {
				this.damage(source.maxhp / 32, source, source, this.getItem('healthorb'));
			}
		},
		num: -17,
		gen: -1,
		desc: "Holder's attacks do 1.3x damage, and it loses 1/32 its max HP after the attack.",
	},
};