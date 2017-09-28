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
	"galewings": {
		inherit: true,
		onModifyPriority: function (priority, move, attacker) {
			if (move && move.type === 'Flying' && attacker.hp <= attacker.maxhp / 2) return priority + 1;
		},
		shortDesc: "If this Pokemon is above 1/2 of its max HP, its Flying-type moves have their priority increased by 1.",
	},
	"forecast": {
		inherit: true,
		onUpdate: function (pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Castform' || pokemon.transformed) return;
			let forme = null;
			switch (this.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.template.speciesid !== 'castformsunny') forme = 'Castform-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.template.speciesid !== 'castformrainy') forme = 'Castform-Rainy';
				break;
			case 'hail':
				if (pokemon.template.speciesid !== 'castformsnowy') forme = 'Castform-Snowy';
				break;
			case 'sandstorm':
				if (pokemon.template.speciesid !== 'castformsandy') forme = 'Castform-Sandy';
				break;
			case 'deltastream':
				if (pokemon.template.speciesid !== 'castformcloudy') forme = 'Castform-Cloudy';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme);
				this.add('-formechange', pokemon, forme, '[msg]', '[from] ability: Forecast');
			}
		},
	},
	"toxictriumph": {
		desc: "If this Pokemon knocks out an opposing Pokemon, this Pokemon uses Toxic Spikes twice.",
		shortDesc: "If KO's opponent, uses Toxic Spikes twice.",
		onSourceFaint: function (source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.useMove("toxicspikes", source);
				this.useMove("toxicspikes", source);
			}
		},
		id: "toxictriumph",
		name: "Toxic Triumph",
		rating: 3,
		num: -201,
	},
	"midlifecrisis": {
		id: "midlifecrisis",
		name: "Midlife Crisis",
		desc: "Boosts power of moves that faint the target by 1.3x (i.e. Self-Destruct, Explosion, etc.), and activates Midlife Crisis.",
		shortDesc: "Boosts the power of moves that faint the target by 1.3x.",
		rating: 4.5,
		num: 9001,
		onStart: function (source, effect) {
			this.addPseudoWeather('midlifecrisis', source, effect, '[of] ' + source);
		},
		onBasePowerPriority: 8,
		onBasePower: function (move) {
			if (move.selfdestruct) {
				this.debug('Midlife Crisis boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	"rust": {
		id: "rust",
		name: "Rust",
		desc: "Powers up Steel type moves by 1.2, and lowers Electric moves that attack user by 0.75x.",
		shortDesc: "Powers up Steel moves by 1.2; Electric moves do 0.75x less.",
		rating: 3.5,
		num: 9002,
		onBasePowerPriority: 8,
		onBasePower: function (move) {
			if (move.type === 'Steel') {
				this.debug('Rust boost');
				return this.chainModify(1.2);
			}
		},
		onFoeBasePower: function (defender, move) {
			if (this.effectData.target !== defender) return;
			if (move.type === 'Electric') {
				return this.chainModify(0.75);
			}
		},
	},
	"vengeful": {
		id: "vengeful",
		name: "Vengeful",
		desc: "When the user is KO'ed, the target faints too.",
		rating: 4.5,
		num: 9003,
		onAfterDamageOrder: 1,
		onAfterDamage: function (target, source) {
			if (source && source !== target && !target.hp) {
				this.damage(source.maxhp / 1, source, target);
			}
		},
	},
	"hatred": {
		id: "hatred",
		name: "Hatred",
		desc: "User's stats go up by one stage if it gets hit with a super effective move.",
		shortDesc: "If hit with a supereffective move, +1 all stats (except acc & eva)",
		num: 9004,
		rating: 3,
		onHit: function (target, move) {
			if (target.hp && !move.category !== 'Status' && move.damage && move.damageCallback && move.typeMod > 0) {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1});
			}
		},
	},
	"jewelcrack": {
		id: "jewelcrack",
		name: "Jewel Crack",
		num: 9005,
		onModifyAccuracyPriority: 10,
		onModifyAccuracy: function (pokemon, move, accuracy, source) {
			if (!move.category === 'Status' && pokemon.hasType('Rock') || pokemon.hasType('Steel')) {
				this.debug('Jewel Crack makes this move 3x more accurate');
				this.add('-activate', source, 'ability: Jewel Crack');
				return accuracy * 3;
			}
		},
		rating: 3,
		desc: "If the target is a Rock or Steel type, this Pokemon's moves are 3x more accurate.",
		shortDesc: "If the foe is a Rock/Steel type, moves are 3x accurate.",
	},
};