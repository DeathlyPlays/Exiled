"use strict";

exports.BattleMovedex = {
	"fireblast": {
		inherit: true,
		onModifyMove: function (move) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				move.accuracy = true;
			} else if (this.isWeather(['raindance', 'primordialsea'])) {
				move.accuracy = 60;
			}
		},
		desc: "10% chance to burn, never misses in sun, 60% accuracy in Rain.",
	},
	"hydropump": {
		inherit: true,
		onModifyMove: function (move) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				move.accuracy = true;
			} else if (this.isWeather(['sunnyday', 'desolateland'])) {
				move.accuracy = 60;
			}
		},
		desc: "Never misses in Rain, 60% accuracy in Sun.",
	},
	"mysticalfire": {
		inherit: true,
		desc: "Has a 100% chance to lower target's Special Attack by one stage, gains Psychic effectiveness.",
		shortDesc: "Lowers target's SpA by 1 stage, gains Psychic effectiveness.",
		onEffectiveness: function (typeMod, type) {
			return typeMod + this.getEffectiveness('Psychic', type);
		},
	},
	"dragonascent": {
		inherit: true,
		onEffectiveness: function (typeMod, type) {
			return typeMod + this.getEffectiveness('Dragon', type);
		},
		desc: "Lowers the user's Defense and Special Defense by 1 stage, Gains Dragon Effectiveness.",
		shortDesc: "Lowers the user's Def and SpD by 1, Gains Dragon Effectiveness.",
	},
	"electrohavoc": {
		num: -9014,
		accuracy: 100,
		basePower: 150,
		basePowerCallback: function (pokemon, target, move) {
			return move.basePower * pokemon.hp / pokemon.maxhp;
		},
		category: "Special",
		desc: "Power is equal to (user's current HP * 150 / user's maximum HP), rounded down, but not less than 1.",
		shortDesc: "Less power as user's HP decreases. Hits foe(s).",
		id: "electrohavoc",
		isViable: true,
		name: "Electro Havoc",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "allAdjacentFoes",
		type: "Electric",
		zMovePower: 200,
		contestType: "Beautiful",
	},
	"darkvoid": {
		inherit: true,
		accuracy: 80,
	},
	"powercooldown": {
		num: -9015,
		accuracy: 95,
		basePower: 140,
		category: "Physical",
		desc: "Has a 30% chance to paralyze the target. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Charges turn 1. Hits turn 2. 30% par.",
		id: "powercooldown",
		name: "Power Cooldown",
		pp: 5,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTry: function (attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				this.add('-anim', attacker, move.name, defender);
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 200,
		contestType: "Beautiful",
	},
	"powergem": {
		inherit: true,
		basePower: 90,
	},
	"focusblast": {
		inherit: true,
		accuracy: 85,
	},
	"rapidspin": {
		inherit: true,
		onEffectiveness: function (typeMod, type, move) {
			if (move.type !== 'Normal') return;
			let target = this.activeTarget;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Flying type and immune to Ground
			if (!target.runImmunity('Normal')) {
				if (target.hasType('Ghost')) return 0;
			}
		},
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and partial-trapping moves end for the user, and all hazards are removed from the user's side of the field. Ignores Ghost Immunity.",
		shortDesc: "Frees user from hazards/partial trap/Leech Seed. Ignores Ghost immunity.",
	},
	"ancientpower": {
		inherit: true,
		basePower: 75,
	},
	"knockoff": {
		inherit: true,
		basePower: 60,
	},
	"drainingkiss": {
		inherit: true,
		basePower: 75,
	},
	"razorwind": {
		inherit: true,
		type: "Flying",
	},
	"disarmingvoice": {
		inherit: true,
		basePower: 65,
	},
	"hammerslammer": {
		num: -9016,
		basePower: 100,
		accuracy: 100,
		category: "Physical",
		shortDesc: "No additional effects.",
		id: "hammerslammer",
		name: "Hammer Slammer",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 180,
		contestType: "Cool",
	},
	"pixiepunch": {
		num: -9017,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Has a 20% chance to confuse the target.",
		shortDesc: "20% chance to confuse the target.",
		id: "pixiepunch",
		name: "Pixie Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 170,
		contestType: "Cute",
	},
};
