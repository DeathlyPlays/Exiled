"use strict";

exports.BattleMovedex = {
	//Insist
	"npmtest": {
		id: "npmtest",
		name: "npm test",
		priority: 1,
		desc: "Boosts the user's Special Attack and Speed by one stage.",
		shortDesc: "+1 SpA & Spe.",
		self: {
			boosts: {
				spa: 1,
				spe: 1,
			},
		},
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: false,
		category: "Special",
		onHit: function () {
			this.add("c|~Insist|Don't fucking ``npm test`` me.....");
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Hydro Pump", target);
		},
		basePower: 90,
		pp: 15,
		accuracy: 100,
		target: "normal",
		type: "Water",
		zMovePower: 140,
		contestType: "Cool",
	},

	//Insist
	"extremesupermegaultimatealphagigasupremefantasticextraprefixcombobreaker": {
		id: "extremesupermegaultimatealphagigasupremefantasticextraprefixcombobreaker",
		name: "EXTREME SUPER MEGA ULTIMATE ALPHA GIGA SUPREME FANTASTIC EXTRA PREFIX COMBO BREAKER",
		basePower: 150,
		accuracy: 100,
		pp: 1,
		noPPBoosts: true,
		desc: "No additional information.",
		secondary: false,
		category: "Special",
		isViable: true,
		isZ: "playniumz",
		priority: 0,
		flags: {
			protect: 1,
		},
		onHit: function () {
			this.add("c|~Insist|**EXTREME SUPER MEGA ULTIMATE ALPHA GIGA SUPREME FANTASTIC EXTRA PREFIX COMBO BREAKER**");
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Hydro Pump", target);
		},
		target: "normal",
		type: "Water",
	},

	//flufi
	"knockoutpunch": {
		num: 1000,
		accuracy: 75,
		basePower: 150,
		category: "Physical",
		desc: "Has a 30% chance to confuse the target.",
		shortDesc: "30% chance to confuse the target.",
		id: "knockoutpunch",
		name: "Knockout Punch",
		pp: 5,
		priority: 0,
		flags: {punch: 1, contact: 1, protect: 1},
		secondary: false,
		target: "normal",
		onPrepareHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Close Combat", target);
			this.add("-anim", source, "Dizzy Punch", target);
		},
		type: "Fighting",
		contestType: "Tough",
	},

	//C733937 123
	"voodoomagic": {
		id: "voodoomagic",
		name: "Voodoo Magic",
		//added the description mainly so I can see what all he wanted since this is quite a lot
		desc: "Voodoo Magic: ??? type, Priority 0(1), Status, 90% Acc, Goes through Substitutes, Ignores Abilities, Doesn't Bounce. Puts a curse on the opponent that does a hideous amount of bad effects. (User takes 1/4 HP damage then Taunts, Torments, Mean Looks, Embargos, Clears Stats, Heal Blocks, Removes ability, Spites, Flinches, and removes all shields. Taunt, Embargo, and Heal Block last for 10 turns, Stat Clear, Flinch, and Spite happen on turn move used, rest last till switch (haha lol no switching for you) Does not fail if user is less than 1/4 hp)",
		basePower: 0,
		category: "Status",
		priority: 0,
		accuracy: 90,
		pp: 10,
		flags: {
			authentic: 1,
			reflectable: 1,
		},
		ignoresAbility: true,
		self: {
			onHit: function (target, source) {
				this.directDamage(source.maxhp / 4, source, source);
			},
			effect: {
				duration: 10,
				onStart: function (pokemon, source) {
					this.add('-start', pokemon, 'Voodoo Magic', '[of] ' + source);
				},
				onResidualOrder: 10,
				onResidual: function (pokemon) {
					this.damage(pokemon.maxhp / 4);
				},
			},
		},
		onStart: function (pokemon, source) {
			this.add('-start', pokemon, 'Voodoo Magic');
		},
		// Item suppression implemented in BattlePokemon.ignoringItem() within battle-engine.js
		onResidualOrder: 18,
		onEnd: function (pokemon) {
			this.add('-end', pokemon, 'Voodoo Magic');
		},
		onHit: function (target, source, move) {
			if (!target.addVolatile('trapped', source, move, 'trapper')) {
				this.add('-fail', target);
			}
		},
		onHitField: function () {
			this.add('-clearallboost');
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					if (this.sides[i].active[j] && this.sides[i].active[j].isActive) this.sides[i].active[j].clearBoosts();
				}
			}
		},
		effect: {
			duration: 10,
			durationCallback: function (target, source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 15;
				}
				return 10;
			},
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'move: Voodoo Magic');
				this.add('-endability', pokemon);
				this.singleEvent('End', this.getAbility(pokemon.ability), pokemon.abilityData, pokemon, pokemon, 'gastroacid');
			},
			onDisableMove: function (pokemon) {
				for (let i = 0; i < pokemon.moveset.length; i++) {
					if (this.getMove(pokemon.moveset[i].id).flags['heal']) {
						pokemon.disableMove(pokemon.moveset[i].id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				if (move.flags['heal']) {
					this.add('cant', pokemon, 'move: Voodoo Magic', move);
					return false;
				}
			},
			onResidualOrder: 17,
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'move: Voodoo Magic');
			},
			onTryHeal: false,
			onAccuracyPriority: 6,
			onAccuracy: function (accuracy, target, source, move, pokemon) {
				if (move && !pokemon.maxhp / 4) return true;
			},
		},
		onTryHit: function (pokemon) {
			let bannedAbilities = {comatose: 1, multitype: 1, schooling: 1, stancechange: 1};
			if (bannedAbilities[pokemon.ability]) {
				return false;
			}
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Normal')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondaries: [
			{
				chance: 100,
				volatileStatus: "taunt",
			}, {
				chance: 100,
				volatileStatus: "torment",
			}, {
				chance: 100,
				volatileStatus: "embargo",
			}, {
				chance: 100,
				volatileStatus: "flinch",
			}, {
				chance: 100,
				volatileStatus: "healblock",
			}, {
				chance: 100,
				volatileStatus: "gastroacid",
			},
		],
		onModifyMove: function (move, pokemon, target) {
			move.type = '???';
			this.add('-activate', pokemon, 'move: Voodoo Magic');
		},
		type: "Normal",
		target: "normal",
	},

	// AlfaStorm
	"darkstorm": {
		id: "darkstorm",
		name: "Dark Storm",
		basePower: 60,
		accuracy: 100,
		pp: 15,
		secondary: false,
		category: "Special",
		self: {
			boosts: {
				spa: 1,
				spe: 1,
				spd: 1,
			},
		},
		desc: "Boosts the user's SpA, SpD, and Spe by one stage.",
		shortDesc: "+1 SpA, SpD & Spe.",
		priority: 1,
		onHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dark Pulse', target);
		},
		flags: {
			protect: 1,
			contact: 1,
		},
		target: "normal",
		type: "Dark",
	},

	// Chandie
	"solareruption": {
		id: "solareruption",
		name: "Solar Eruption",
		basePower: 130,
		accuracy: 100,
		desc: "100% burn chance, very high critical hit ratio. Raises the Speed by 2 stage, and Special Attack by 1 stage.",
		category: "Special",
		flags: {
			protect: 1,
			mirror: 1,
			defrost: 1,
		},
		critRatio: 3,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
					spe: 2,
				},
			},
		},
		onTryHitPriority: 8,
		onTryHit: function (target, source) {
			target.trySetStatus('brn', source);
		},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno Overdrive", source);
		},
		pp: 10,
		target: "normal",
		type: "Fire",
		zMovePower: 190,
		contestType: "Cool",
	},

	// Chandie
	"conflagration": {
		id: "conflagration",
		name: "Conflagration",
		basePower: 85,
		accuracy: 100,
		pp: 15,
		secondary: false,
		category: "Special",
		desc: "Nearly always goes first.",
		priority: 2,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Searing Shot', target);
		},
		flags: {
			protect: 1,
			contact: 1,
		},
		target: "normal",
		type: "Fire",
	},
	// Renfur
	"itsmytimenow": {
		id: "itsmytimenow",
		name: "It's My Time Now",
		accuracy: 100,
		desc: "No additional effects.",
		basePower: 150,
		category: "Special",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: false,
		target: "allAdjacent",
		type: "Bug",
		zMovePower: 200,
		contestType: "Tough",
	},

	// Almighty Judgment
	"holydance": {
		id: "holydance",
		name: "Holy Dance",
		desc: "Typeless damage.",
		basePower: 80,
		category: "Special",
		accuracy: 100,
		priority: 0,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Power", target);
		},
		onHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('c|+Almighty Judgment|/me /me\'s /me /me\'s /me /me\'s, let that sink in.');
		},
		flags: {protect: 1, mirror: 1},
		secondary: false,
		pp: 15,
		target: "normal",
		type: "???",
	},

	"judgment": {
		inherit: true,
		onModifyMove: function (move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
	},

	// Shivay
	"dragonify": {
		id: "dragonify",
		name: "Dragonify",
		basePower: 100,
		pp: 5,
		accuracy: 100,
		category: "Physical",
		flags: {protect: 1},
		self: {
			boosts: {
				atk: 1,
				spe: 1,
			},
		},
		desc: "Raises user's Attack and Speed by 1 stage, and makes foe Dragon type.",
		shortDesc: "+1 Atk & Spe + Foe becomes Dragon type.",
		priority: 1,
		onHit: function (target) {
			if (!target.setType('Dragon')) return false;
			this.add('-start', target, 'typechange', 'Dragon');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Roar of Time", target);
		},
		secondary: false,
		target: "normal",
		type: "Dragon",
	},
};
