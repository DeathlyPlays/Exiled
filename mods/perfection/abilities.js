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
				this.boost({spe: 1});
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
	"reckless": {
		inherit: true,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.recoil || move.hasCustomRecoil || attacker.item === 'lifeorb') {
				this.debug('Reckless boost');
				return basePower * 12 / 10;
			}
		},
		desc: "This Pokemon's attacks with recoil or crash damage or if the user is holding a Life Orb have their power multiplied by 1.2. Does not affect Struggle.",
		shortDesc: "This Pokemon's attacks with recoil or crash damage or the user's item is Life Orb have 1.2x power; not Struggle.",
	},
	"galewings": {
		inherit: true,
		shortDesc: "If this Pokemon is above 1/2 of its max HP, its Flying-type moves have their priority increased by 1.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Flying' && pokemon.hp > pokemon.maxhp / 2) return priority + 1;
		},
		rating: 4.5,
	},
	"insectize": {
		desc: "This Pokemon's Normal-type moves become Bug-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Bug Type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Bug';
				if (move.category !== 'Status') pokemon.addVolatile('insectize');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x1333, 0x1000]);
			},
		},
		id: "insectize",
		name: "Insectize",
		rating: 4,
		num: -182,
	},
	"frozenspectral": {
		shortDesc: "This Pokemon's ballistic moves have a 50% chance of freezing.",
		// upokecenter says this is implemented as an added secondary effect
		onModifyMove: function (move) {
			if (!move || !move.flags["bullet"]) return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 50,
				status: 'frz',
				ability: this.getAbility('frozenspectral'),
			});
		},
		id: "frozenspectral",
		name: "Frozen Spectral",
		rating: 4,
		num: -143,
	},
	"pikabond": {
		desc: "If this Pokemon is a Pikachu, it transforms into Ash-Pikachu after knocking out a Pokemon. As Ash-Pikachu Thunderbolt hits twice.",
		shortDesc: "After KOing a Pokemon: becomes Ash-Pikachu. Thunderbolt hits twice.",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move' && source.template.speciesid === 'pikachu' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Pika Bond');
				let template = this.getTemplate('Pikachu-Ash');
				source.formeChange(template);
				source.baseTemplate = template;
				source.details = template.species + (source.level === 100 ? '' : ', L' + source.level) + (source.gender === '' ? '' : ', ' + source.gender) + (source.set.shiny ? ', shiny' : '');
				this.add('detailschange', source, source.details);
			}
		},
		onModifyMove: function (move, attacker) {
			if (move.id === 'thunderbolt' && attacker.template.species === 'Pikachu-Ash') {
				move.multihit = 2;
			}
		},
		id: "pikabond",
		name: "Pika Bond",
		rating: 3,
		num: 0,
	},
	"resolutepower": {
		desc: "If this Pokemon is a Keldeo or Keldeo-Resolute, it transforms into Keldeo-Absolute after knocking out a Pokemon.",
		shortDesc: "After KOing a Pokemon, becomes Keldeo-Absolute.",
		onSourceFaint: function (source, effect) {
			if (effect && effect.effectType === 'Move' && source.template.speciesid === 'keldeo' || source.template.speciesid === 'keldeoresolute' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Resolute Power');
				let template = this.getTemplate('Keldeo-Absolute');
				source.formeChange(template);
				source.baseTemplate = template;
				source.details = template.species + (source.level === 100 ? '' : ', L' + source.level) + (source.gender === '' ? '' : ', ' + source.gender) + (source.set.shiny ? ', shiny' : '');
				this.add('detailschange', source, source.details);
			}
		},
		id: "resolutepower",
		name: "Resolute Power",
		rating: 4,
		num: -956,
	},
	"luster": {
		id: "luster",
		name: "Luster",
		onStart: function (pokemon) {
			this.useMove('Reflect', pokemon);
			this.useMove('Light Screen', pokemon);
		},
		shortDesc: "Sets up dual screens.",
		rating: 5,
		num: -957,
	},
	"deltafur": {
		desc: "70% chance a Pokemon making contact with this Pokemon will be poisoned, paralyzed, fall asleep, freeze, or burned.",
		shortDesc: "70% chance of poison/paralysis/sleep/burn/freeze on making contact with the Pokemon.",
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact'] && !source.status && source.runStatusImmunity('powder')) {
				let r = this.random(100);
				if (r <= 70) {
					source.setStatus('slp', target);
				} else if (r <= 70) {
					source.setStatus('par', target);
				} else if (r <= 70) {
					source.setStatus('psn', target);
				} else if (r <= 70) {
					source.setStatus('frz', target);
				} else if (r <= 70) {
					source.setStatus('brn', target);
				}
			}
		},
		id: "deltafur",
		name: "Delta Fur",
		rating: 5,
		num: -27,
	},
	"macrocosm": {
		shortDesc: "This Pokemon's Fire-type attacks have their power multiplied by 2.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Macrocosm boost');
				return this.chainModify(2);
			}
		},
		id: "macrocosm",
		name: "Macrocosm",
		rating: 3,
		num: -200,
	},
	"microcosm": {
		shortDesc: "This Pokemon's Fairy-type attacks have their power multiplied by 2.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Fairy') {
				this.debug('Microcosm boost');
				return this.chainModify(2);
			}
		},
		id: "microcosm",
		name: "Microcosm",
		rating: 3,
		num: -200,
	},
	"shadowrush": {
		shortDesc: "The user's Dark-type moves have +1 priority.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Dark') return priority + 1;
		},
		id: "shadowrush",
		name: "Shadow Rush",
		rating: 3,
		num: -201,
	},
	"belligerent": {
		shortDesc: "Scrappy + Tough Claws.",
		//scrappy
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		//tough claws
		onBasePowerPriority: 8,
		onBasePower: function (move) {
			if (move.flags['contact']) {
				return this.chainModify([0x15CD, 0x1000]);
			}
		},
		id: "belligerent",
		name: "Belligerent",
		rating: 3,
		num: -202,
	},
	"lightflow": {
		inherit: true,
		shortDesc: "This Pokemon's Normal-type moves have their priority increased by 1.",
		onModifyPriority: function (priority, move) {
			if (move && move.type === 'Normal') return priority + 1;
		},
		id: "lightflow",
		name: "Light Flow",
		rating: 5,
		num: -116,
	},
	"climatechange": {
		desc: "If this Pokemon is a Castform, its type changes to the current weather condition's type, and sets a new weather every turn.",
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
				if (pokemon.template.speciesid !== 'castformrainy') forme = 'Castform-Rainy';
				break;
			case 'deltastream':
				if (pokemon.template.speciesid !== 'castformsnowy') forme = 'Castform-Snowy';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme);
				this.add('-formechange', pokemon, forme, '[msg]', '[from] ability: Climate Change');
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				let r = this.random(7);
				if (r === 1) {
					this.setWeather('sunnyday');
				} else if (r === 2) {
					this.setWeather('raindance');
				} else if (r === 3) {
					this.setWeather('hail');
				} else if (r === 4) {
					this.setWeather('sandstorm');
				} else if (r === 5) {
					this.setWeather('deltastream');
				} else if (r === 6) {
					this.setWeather('desolateland');
				} else if (r === 7) {
					this.setWeather('primordialsea');
				}
			}
		},
		shortDesc: "Every turn, a new weather is set; improved Forecast.",
		id: "climatechange",
		name: "Climate Change",
		rating: 5,
		num: -59,
	},
	"typecamo": {
		desc: "This Pokemon's typing will change to a random type every turn.",
		rating: 5,
		num: -60,
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				let r = this.random(17);
				if (r === 1) {
					this.add('-start', pokemon, 'typechange', 'Normal');
					pokemon.types = ["Normal"];
				} else if (r === 2) {
					this.add('-start', pokemon, 'typechange', 'Fighting');
					pokemon.types = ["Fighting"];
				} else if (r === 3) {
					this.add('-start', pokemon, 'typechange', 'Psychic');
					pokemon.types = ["Psychic"];
				} else if (r === 4) {
					this.add('-start', pokemon, 'typechange', 'Ice');
					pokemon.types = ["Ice"];
				} else if (r === 5) {
					this.add('-start', pokemon, 'typechange', 'Grass');
					pokemon.types = ["Grass"];
				} else if (r === 6) {
					this.add('-start', pokemon, 'typechange', 'Fairy');
					pokemon.types = ["Fairy"];
				} else if (r === 7) {
					this.add('-start', pokemon, 'typechange', 'Dark');
					pokemon.types = ["Dark"];
				} else if (r === 8) {
					this.add('-start', pokemon, 'typechange', 'Water');
					pokemon.types = ["Water"];
				} else if (r === 9) {
					this.add('-start', pokemon, 'typechange', 'Steel');
					pokemon.types = ["Steel"];
				} else if (r === 10) {
					this.add('-start', pokemon, 'typechange', 'Fire');
					pokemon.types = ["Fire"];
				} else if (r === 11) {
					this.add('-start', pokemon, 'typechange', 'Bug');
					pokemon.types = ["Bug"];
				} else if (r === 12) {
					this.add('-start', pokemon, 'typechange', 'Electric');
					pokemon.types = ["Electric"];
				} else if (r === 13) {
					this.add('-start', pokemon, 'typechange', 'Poison');
					pokemon.types = ["Poison"];
				} else if (r === 14) {
					this.add('-start', pokemon, 'typechange', 'Ghost');
					pokemon.types = ["Ghost"];
				} else if (r === 15) {
					this.add('-start', pokemon, 'typechange', 'Rock');
					pokemon.types = ["Rock"];
				} else if (r === 16) {
					this.add('-start', pokemon, 'typechange', 'Ground');
					pokemon.types = ["Ground"];
				} else if (r === 17) {
					this.add('-start', pokemon, 'typechange', 'Flying');
					pokemon.types = ["Flying"];
				} else {
					this.add('-start', pokemon, 'typechange', 'Dragon');
					pokemon.types = ["Dragon"];
				}
			}
		},
		id: "typecamo",
		name: "Type Camo",
	},
};
