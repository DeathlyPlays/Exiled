'use strict';

exports.BattleAbilities = {
	"defeatist": {
		desc: "While this Pokemon has 1/4 or less of its maximum HP, its Attack and Special Attack are halved.",
		shortDesc: "While this Pokemon has 1/4 or less, its Attack and Sp. Atk are halved.",
		onModifyAtkPriority: 5,
		onModifyAtk: function(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4) {
				return this.chainModify(0.5);
			}
		},
		id: "defeatist",
		name: "Defeatist",
		rating: -1,
		num: 129,
	},
	"slowstart": {
		shortDesc: "On switch-in, this Pokemon's Attack and Speed are halved for 3 turns.",
		onStart: function(pokemon) {
			pokemon.addVolatile('slowstart');
		},
		onEnd: function(pokemon) {
			delete pokemon.volatiles['slowstart'];
			this.add('-end', pokemon, 'Slow Start', '[silent]');
		},
		effect: {
			duration: 3,
			onStart: function(target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpe: function(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd: function(target) {
				this.add('-end', target, 'Slow Start');
			},
		},
		id: "slowstart",
		name: "Slow Start",
		rating: -2,
		num: 112,
	},
	"chlorophyll": {
		shortDesc: "If Sunny Day is active, this Pokemon's Speed is tripled.",
		onModifySpe: function(spe) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(3);
			}
		},
		id: "chlorophyll",
		name: "Chlorophyll",
		rating: 2.5,
		num: 34,
	},
	"swiftswim": {
		shortDesc: "If Rain Dance is active, this Pokemon's Speed is tripled.",
		onModifySpe: function(spe, pokemon) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(3);
			}
		},
		id: "swiftswim",
		name: "Swift Swim",
		rating: 2.5,
		num: 33,
	},
	"sandrush": {
		desc: "If Sandstorm is active, this Pokemon's Speed is tripled. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "If Sandstorm is active, this Pokemon's Speed is tripled; immunity to Sandstorm.",
		onModifySpe: function(spe, pokemon) {
			if (this.isWeather('sandstorm')) {
				return this.chainModify(3);
			}
		},
		onImmunity: function(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		id: "sandrush",
		name: "Sand Rush",
		rating: 2.5,
		num: 146,
	},
};
