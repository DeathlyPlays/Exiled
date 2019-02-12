"use strict";

exports.BattleMovedex = {
	// Insist
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
		onHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Hydro Pump", target);
			this.add("c|@Insist|Don't fucking ``npm test`` me.....");
		},
		basePower: 90,
		pp: 15,
		accuracy: 100,
		target: "normal",
		type: "Water",
		zMovePower: 140,
		contestType: "Cool",
	},

	// Insist
	"extremesupermegaultimatealphagigasupremefantasticextraprefixcombobreaker": {
		id: "extremesupermegaultimatealphagigasupremefantasticextraprefixcombobreaker",
		name: "EXTREME SUPER MEGA ULTIMATE ALPHA GIGA SUPREME FANTASTIC EXTRA PREFIX COMBO BREAKER",
		basePower: 150,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		desc: "No additional information.",
		secondary: false,
		category: "Special",
		isViable: true,
		isZ: "playniumz",
		priority: 0,
		flags: {protect: 1},
		onHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Hydro Pump", target);
			this.add("c|@Insist|**EXTREME SUPER MEGA ULTIMATE ALPHA GIGA SUPREME FANTASTIC EXTRA PREFIX COMBO BREAKER**");
		},
		target: "normal",
		type: "Water",
	},

	// flufi
	"cranberrycutter": {
		num: 1000,
		accuracy: 95,
		basePower: 120,
		category: "Physical",
		desc: "High critical hit ratio.",
		shortDesc: "High crit ratio.",
		id: "cranberrycutter",
		name: "Cranberry Cutter",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1},
		secondary: false,
		critRatio: 2,
		target: "normal",
		onPrepareHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Topsy-Turvy", target);
			this.add("-anim", source, "Sky Drop", target);
		},
		type: "Psychic",
		contestType: "Clever",
	},

	// C733937 123
	"voodoomagic": {
		id: "voodoomagic",
		name: "Voodoo Magic",
		desc: "Typeless, ignores substitutes, ignores abilities, taunts, torments, mean looks, embargo'es, clears the target's stat changes, heal blocks, removes the target's ability, spites, flinches, and removes all screens from the target for the cost of 1/4 of the user's max HP. (Taunt, Embargo, and Heal Block last for 10 turns)",
		shortDesc: "Inflicts the target w/ many conditions.",
		basePower: 0,
		category: "Status",
		priority: 0,
		accuracy: 90,
		pp: 10,
		flags: {authentic: 1},
		ignoresAbility: true,
		self: {
			onHit: function (target, source) {
				this.directDamage(source.maxhp / 4, source, source);
			},
			effect: {
				duration: 10,
				onStart: function (pokemon, source) {
					this.add("-start", pokemon, "Voodoo Magic", "[of] " + source);
				},
				onResidualOrder: 10,
				onResidual: function (pokemon) {
					this.damage(pokemon.maxhp / 4);
				},
			},
		},
		onStart: function (pokemon) {
			this.add("-start", pokemon, "Voodoo Magic");
		},
		// Item suppression implemented in BattlePokemon.ignoringItem() within battle-engine.js
		onResidualOrder: 18,
		onEnd: function (pokemon) {
			this.add("-end", pokemon, "Voodoo Magic");
		},
		onHit: function (target, source, move) {
			if (!target.addVolatile("trapped", source, move, "trapper")) {
				this.add("-fail", target);
			}
		},
		onHitField: function () {
			this.add("-clearallboost");
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					if (this.sides[i].active[j] && this.sides[i].active[j].isActive) this.sides[i].active[j].clearBoosts();
				}
			}
		},
		effect: {
			duration: 10,
			durationCallback: function (target, source) {
				if (source && source.hasAbility("persistent")) {
					return 15;
				}
				return 10;
			},
			onStart: function (pokemon) {
				this.add("-start", pokemon, "move: Voodoo Magic");
				this.add("-endability", pokemon);
				this.singleEvent("End", this.getAbility(pokemon.ability), pokemon.abilityData, pokemon, pokemon, "gastroacid");
			},
			onDisableMove: function (pokemon) {
				for (let i = 0; i < pokemon.moveset.length; i++) {
					if (this.getMove(pokemon.moveset[i].id).flags["heal"]) {
						pokemon.disableMove(pokemon.moveset[i].id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				if (move.flags["heal"]) {
					this.add("cant", pokemon, "move: Voodoo Magic", move);
					return false;
				}
			},
			onResidualOrder: 17,
			onEnd: function (pokemon) {
				this.add("-end", pokemon, "move: Voodoo Magic");
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
			if (pokemon.runImmunity("Normal")) {
				pokemon.side.removeSideCondition("reflect");
				pokemon.side.removeSideCondition("lightscreen");
				pokemon.side.removeSideCondition("auroraveil");
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
		onPrepareHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Taunt", target);
			this.add("-anim", source, "Curse", target);
		},
		type: "Bird",
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
		desc: "Boosts the user's Special Attack, Special Defense, and Speed by one stage.",
		shortDesc: "+1 SpA, SpD & Spe.",
		priority: 1,
		onHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Dark Pulse", target);
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
		basePower: 100,
		accuracy: 100,
		shortDesc: "Burns the target, +2 Spe, +1 SpA.",
		desc: "100% burn chance, raises the user's Speed by 2 stages, and Special Attack by 1 stage.",
		category: "Special",
		flags: {
			protect: 1,
			mirror: 1,
			defrost: 1,
		},
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
			target.trySetStatus("brn", source);
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Inferno Overdrive", source);
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
		basePower: 60,
		accuracy: 100,
		pp: 15,
		secondary: false,
		category: "Special",
		desc: "No additional effects.",
		priority: 1,
		onPrepareHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Searing Shot", target);
		},
		flags: {
			protect: 1,
			contact: 1,
			mirror: 1,
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
		onHit: function (source, target) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Hidden Power", target);
			this.add("c|%Almighty Judgment|/me /me's /me /me's /me /me's, let that sink in.");
		},
		flags: {protect: 1, mirror: 1},
		secondary: false,
		pp: 15,
		target: "normal",
		type: "Bird",
	},

	"judgment": {
		inherit: true,
		desc: "This move's type depends on the user's held Plate. However if this Pokemon is named Almighty Judgment, this move deals typeless damage.",
		shortDesc: "Type varies based on the held Plate. If the Pokemon is AJ, this is typeless.",
		onModifyMove: function (move, pokemon) {
			if (toId(pokemon.name) === "almightyjudgment") {
				let type = pokemon.types[0];
				if (type === "Bird") type = "???";
				move.type = type;
			} else {
				const item = pokemon.getItem();
				if (item.id && item.onPlate && !item.zMove) {
					move.type = item.onPlate;
				}
			}
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
		onHit: function (target, source) {
			this.attrLastMove("[still]");
			if (!target.setType("Dragon")) return false;
			this.add("-start", target, "typechange", "Dragon");
			this.add("-anim", source, "Roar of Time", target);
		},
		secondary: false,
		target: "normal",
		type: "Dragon",
	},

	"exile": {
		isNonstandard: true,
		accuracy: 100,
		category: "Special",
		id: "exile",
		desc: "Changes forme to Cresselia (or back to Darkrai) and substitutes moves.",
		isViable: true,
		name: "Exile",
		pp: 10,
		priority: 0,
		basePower: 80,
		self: {
			onHit: function (pokemon) {
				// substitute moves
				function setMove(oldMove, moveid) {
					let index = pokemon.moves.indexOf(oldMove);
					if (index === -1) return;
					let move = this.getMove(moveid);
					let sketchedMove = {
						move: move.name,
						id: move.id,
						pp: move.pp,
						maxpp: move.pp,
						target: move.target,
						disabled: false,
						used: false,
					};
					pokemon.moveset[index] = sketchedMove;
					pokemon.moves[index] = toId(move.name);
				}
				let subs = [
					["aurasphere", "recover"],
					["sludgewave", "storedpower"],
					["psychic", "cosmicpower"],
				];
				if (pokemon.template.speciesid === "darkrai" && pokemon.formeChange("Cresselia")) {
					subs.forEach(s => setMove(s[0], s[1]));
					this.add("-formechange", pokemon, "Cresselia", "[msg]");
				} else if (pokemon.formeChange("Cresselia")) {
					subs.forEach(s => setMove(s[1], s[0]));
					this.add("-formechange", pokemon, "Darkrai", "[msg]");
				}
				// make changing form available in consecutive turns
				delete pokemon.volatiles.stall;
			},
		},
		flags: {
			protect: 1,
			distance: 1,
		},
		target: "any",
		type: "Dark",
	},

	//SnorlaxTheRain
	"snorlaxslam": {
		accuracy: 95,
		basePower: 120,
		category: "Physical",
		desc: "Can be used while sleeping.",
		id: "snorlaxslam",
		name: "Snorlax Slam",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		sleepUsable: true,
		onHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Body Slam", target);
			this.add("c|+SnorlaxTheRain|Beware of the biggest body slam u will ever seen!");
		},
		target: "normal",
		type: "Normal",
	},

	// CielTSnow
	"pimpslap": {
		id: "pimpslap",
		name: "Pimp Slap",
		basePower: 90,
		accuracy: 100,
		priority: 1,
		self: {
			boosts: {
				spa: 1,
			},
		},
		pp: 10,
		category: "Special",
		defensiveCategory: "Physical",
		desc: "Damage is dealt in respect to the target's Physical Defense, and boosts the user's Special Attack by one stage.",
		shortDesc: "Hits in Physical Defense. +1 user's Sp. Atk.",
		flags: {protect: 1, mirror: 1},
		target: "normal",
		onPrepareHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Mach Punch", target);
		},
		type: "Fighting",
	},

	// Back At My Day
	"cheapattack": {
		id: "cheapattack",
		name: "Cheap Attack",
		basePower: 50,
		desc: "No additional information.",
		accuracy: true,
		pp: 40,
		priority: 0,
		secondary: false,
		category: "Special",
		onHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Dazzling Gleam", target);
			this.add("c|%Back At My Day|back");
		},
		flags: {
			protect: 1,
			mirror: 1,
		},
		type: "Fairy",
		target: "normal",
	},

	// Back At My Day
	"fairybeams": {
		id: "fairybeams",
		name: "Fairy Beams",
		category: "Special",
		pp: 10,
		basePower: 50,
		accuracy: true,
		desc: "User switches out after damaging the target.",
		priority: 3,
		secondary: false,
		onPrepareHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Dazzling Gleam", target);
			this.add("c|%Back At My Day|brb");
		},
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
		},
		type: "Fairy",
		target: "normal",
	},

	// Bouns
	"stormkick": {
		id: "stormkick",
		name: "Storm Kick",
		category: "Physical",
		pp: 10,
		basePower: 50,
		accuracy: 90,
		desc: "Hits three times.",
		priority: 0,
		secondary: false,
		onPrepareHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "Triple Kick", target);
		},
		multihit: 3,
		flags: {
			contact: 1,
			protect: 1,
		},
		type: "Electric",
		target: "normal",
	},
	"aliveandkicking": {
		id: "aliveandkicking",
		name: "ALIVE AND KICKING",
		category: "Physical",
		pp: 1,
		basePower: 150,
		accuracy: true,
		noPPBoosts: true,
		desc: "No additional information.",
		secondary: false,
		isViable: true,
		isZ: "legsiumz",
		priority: 0,
		flags: {
			protect: 1,
			contact: 1,
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove("[still]");
			this.add("-anim", source, "High Jump Kick", target);
		},
		type: "Electric",
		target: "normal",
	},
};
