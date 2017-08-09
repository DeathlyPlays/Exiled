'use strict';

exports.BattleAbilities = {
	"slowstart": {
		inherit: true,
		effect: {
			duration: 3,
			onStart: function (target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpe: function (spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd: function (target) {
				this.add('-end', target, 'Slow Start');
			},
		},
		shortDesc: "On switch-in, this Pokemon's Attack and Speed are halved for 3 turns.",
	},
	"intimidate": {
		inherit: true,
		onStart: function (pokemon) {
			let foeactive = pokemon.side.foe.active;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost({def: -1, spd: -1}, foeactive[i], pokemon);
				}
			}
		},
		desc: "On switch-in, this Pokemon lowers the Defense and Special Defense of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Def and SpD of adjacent opponents by 1 stage.",
	},
	"rattled": {
		desc: "This Pokemon's Speed is raised by 1 stage if hit by a supereffective attack.",
		shortDesc: "This Pokemon's Speed is raised 1 stage if hit by a supereffective attack.",
		onAfterDamage: function (move) {
			if (move.typeMod > 0) {
				this.boost({spe:1});
			}
		},
		id: "rattled",
		name: "Rattled",
		rating: 2,
		num: 155,
	},
	"amplifier": {
		shortDesc: "This Pokemon's sound moves have their power multiplied by 1.3.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "amplifier",
		name: "Amplifier",
		rating: 3.5,
		num: -800,
	},
};