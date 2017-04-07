'use strict';

exports.BattleAbilities = {
	"sharpshooter": {
		id: "sharpshooter",
		name: "Sharpshooter",
		desc: "Sniper + Adaptability + Super Luck + uses Focus Energy, upon entry.",
		onStart: function (pokemon) {
			this.useMove('focusenergy', pokemon);
		},
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onModifyDamage: function (damage, source, target, move) {
			if (move.crit) {
				this.debug('Sharpshooter boost');
				return this.chainModify(1.5);
			}
		},
		onModifyCritRatio: function (critRatio) {
			return critRatio + 1;
		},
	},
	"theft": {
		id: "theft",
		name: "Theft",
		desc: "Adaptability + Speed Boost + Moxie + Unburden + Scrappy",
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spe: 1
				});
			}
		},
		onAfterUseItem: function (item, pokemon) {
			if (pokemon !== this.effectData.target) return;
			pokemon.addVolatile('unburden');
		},
		onTakeItem: function (item, pokemon) {
			pokemon.addVolatile('unburden');
		},
		onEnd: function (pokemon) {
			pokemon.removeVolatile('unburden');
		},
		effect: {
			onModifySpe: function (spe, pokemon) {
				if (!pokemon.item) {
					return this.chainModify(2);
				}
			},
		},
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1
				}, source);
			}
		},
	},
	"meatshield": {
		id: "meatshield",
		name: "Meatshield",
		desc: "Unaware + Stamina + Simple",
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.id !== 'confused') {
				this.boost({
					def: 1
				});
			}
		},
		onBoost: function (boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				boost[i] *= 2;
			}
		},
	},
	"wizardry": {
		id: "wizardry",
		name: "Wizardry",
		desc: "Adaptability + Protean + Beast Boost",
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onPrepareHit: function (source, target, move) {
			if (move.hasBounced) return;
			let type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] Protean');
			}
		},
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let stat = 'atk';
				let bestStat = 0;
				for (let i in source.stats) {
					if (source.stats[i] > bestStat) {
						stat = i;
						bestStat = source.stats[i];
					}
				}
				this.boost({
					[stat]: 1
				}, source);
			}
		},
	},
	"igotzabomb": {
		id: "igotzabomb",
		name: "I Gotz a Bomb",
		desc: "Aftermath w/o contact flag needed + Unaware + Stamina",
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && !target.hp) {
				this.damage(source.maxhp / 2, source, target);
			}
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.id !== 'confused') {
				this.boost({
					def: 1
				});
			}
		},
	},
	"mayhem": {
		id: "mayhem",
		name: "Mayhem",
		desc: "Adaptability + Unburden + Speed Boost + Flying type moves get +1 priority",
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spe: 1
				});
			}
		},
		onAfterUseItem: function (item, pokemon) {
			if (pokemon !== this.effectData.target) return;
			pokemon.addVolatile('unburden');
		},
		onTakeItem: function (item, pokemon) {
			pokemon.addVolatile('unburden');
		},
		onEnd: function (pokemon) {
			pokemon.removeVolatile('unburden');
		},
		effect: {
			onModifySpe: function (spe, pokemon) {
				if (!pokemon.item) {
					return this.chainModify(2);
				}
			},
		},
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
	},
	"hogriddah": {
		id: "hogriddah",
		name: "HOG RIDDAH",
		desc: "Speed Boost + Unaware",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spe: 1
				});
			}
		},
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
	},
	"witchcraft": {
		id: "witchcraft",
		name: "Witchcraft",
		desc: "Unaware + Cursed Body",
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onAfterDamage: function (damage, target, source, move) {
			if (!source || source.volatiles['disable']) return;
			if (source !== target && move && move.effectType === 'Move' && !move.isFutureMove) {
				if (this.random(10) < 3) {
					source.addVolatile('disable', this.effectData.target);
				}
			}
		},
	},
	"burnout": {
		id: "burnout",
		name: "Burnout",
		desc: "Regenerator + Unaware + Gen 6 Gale Wings",
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
	},
	"reborn": {
		id: "reborn",
		name: "Reborn",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spe: 1
				});
			}
		},
		onAfterUseItem: function (item, pokemon) {
			if (pokemon !== this.effectData.target) return;
			pokemon.addVolatile('unburden');
		},
		onTakeItem: function (item, pokemon) {
			pokemon.addVolatile('unburden');
		},
		onEnd: function (pokemon) {
			pokemon.removeVolatile('unburden');
		},
		effect: {
			onModifySpe: function (spe, pokemon) {
				if (!pokemon.item) {
					return this.chainModify(2);
				}
			},
		},
	},
	"maskedwarrior": {
		id: "maskedwarrior",
		name: "Masked Warrior",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let stat = 'atk';
				let bestStat = 0;
				for (let i in source.stats) {
					if (source.stats[i] > bestStat) {
						stat = i;
						bestStat = source.stats[i];
					}
				}
				this.boost({
					[stat]: 1
				}, source);
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1
				});
			}
		},
	},
	"pixiearoma": {
		id: "pixiearoma",
		name: "Pixie Aroma",
		onAnyTryPrimaryHit: function (target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Fairy') {
				source.addVolatile('aura');
			}
		},
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
		},
	},
	"parentalguidance": {
		id: "parentalguidance",
		name: "Parental Guidance",
		onPrepareHit: function (source, target, move) {
			if (move.id in {
					iceball: 1,
					rollout: 1
				}) return;
			if (move.category !== 'Status' && !move.selfdestruct && !move.multihit && !move.flags['charge'] && !move.spreadHit && !move.isZ) {
				move.multihit = 2;
				source.addVolatile('parentalbond');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower) {
				if (this.effectData.hit) {
					this.effectData.hit++;
					return this.chainModify(0.25);
				}
				else {
					this.effectData.hit = 1;
				}
			},

			onSourceModifySecondaries: function (secondaries, target, source, move) {
				if (move.id === 'secretpower' && this.effectData.hit < 2) {
					// hack to prevent accidentally suppressing King's Rock/Razor Fang
					return secondaries.filter(effect => effect.volatileStatus === 'flinch');
				}
			},
		},
		onStart: function (pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Baby Dragon' || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.template.speciesid === 'babydragon') {
					pokemon.formeChange('Dragon');
					this.add('-formechange', pokemon, 'Dragon', '[from] ability: Parental Guidance');
				}
			}
			else {
				if (pokemon.template.speciesid === 'dragon') {
					pokemon.formeChange('Baby Dragon');
					this.add('-formechange', pokemon, 'Baby Dragon', '[from] ability: Parental Guidance');
				}
			}
		},

		onResidualOrder: 27,
		onResidual: function (pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Baby Dragon' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.template.speciesid === 'babydragon') {
					pokemon.formeChange('Dragon');
					this.add('-formechange', pokemon, 'Dragon', '[from] ability: Parental Guidance');
				}
			}
			else {
				if (pokemon.template.speciesid === 'dragon') {
					pokemon.formeChange('Baby Dragon');
					this.add('-formechange', pokemon, 'Baby Dragon', '[from] ability: Parental Guidance');
				}
			}
		},
	},
	"rangedsniper": {
		id: "rangedsniper",
		name: "Ranged Sniper",
		desc: "Sniper + Adaptability + Super Luck + Contact moves have no effect + uses Focus Energy, upon entry.",

		onStart: function (pokemon) {
			this.useMove('focusenergy', pokemon);
		},
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onModifyDamage: function (damage, source, target, move) {
			if (move.crit) {
				this.debug('Ranged Sniper boost');
				return this.chainModify(1.5);
			}
		},
		onModifyCritRatio: function (critRatio) {
			return critRatio + 1;
		},
		//contact moves have no effect
		onTryHit: function (target, source, move) {
			if (target !== source && move.flags['contact']) {
				this.add('-immune', target, '[msg]', '[from] ability: Ranged Sniper');
				return null;
			}
		},
		onAllyTryHitSide: function (target, source, move) {
			if (move.flags['contact']) {
				this.add('-immune', this.effectData.target, '[msg]', '[from] ability: Ranged Sniper');
			}
		},
	},
	"giantbomb": {
		id: "giantbomb",
		name: "Giant Bomb",
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && !target.hp) {
				this.damage(source.maxhp / 2, source, target);
			}
		},
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1
				}, source);
			}
		},
	},
	"spearlink": {
		id: "spearlink",
		name: "Spear Link",
		onModifyMove: function (move) {
			if (move.multihit && move.multihit.length) {
				move.multihit = move.multihit[1];
			}
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
			move.stab = 2;
		},
	},
	"minefield": {
		id: "minefield",
		name: "Minefield",
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		onModifyMove: function (move) {
			move.infiltrates = true;
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		onDamage: function (damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit: function (target, source, move) {
			if (move.type === 'Rock' && !target.activeTurns) {
				this.add('-immune', target, '[msg]', '[from] ability: Power Cooldown');
				return null;
			}
		},
	},
	"powercooldown": {
		id: "powercooldown",
		name: "Power Cooldown",
		onBeforeMovePriority: 9,
		onBeforeMove: function (pokemon, target, move) {
			if (pokemon.removeVolatile('truant')) {
				this.add('cant', pokemon, 'ability: Power Cooldown');
				return false;
			}
			pokemon.addVolatile('truant');
		},
		effect: {
			duration: 2,
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['recharge']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onStart: function (source) {
			this.setTerrain('electricterrain');
		},
	},
	"glacierwizardry": {
		id: "glacierwizardry",
		name: "Glacier Wizardry",
		onStart: function (source) {
			this.setWeather('hail');
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'hail') {
				this.heal(target.maxhp / 16);
			}
		},
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.random(10) < 3) {
					source.trySetStatus('frz', target);
				}
			}
		},
		onModifySpe: function (spe, pokemon) {
			if (this.isWeather('hail')) {
				return this.chainModify(2);
			}
		},
	},
	"knightlyhonor": {
		id: "knightlyhonor",
		name: "Knightly Honor",
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		onModifyMove: function (move) {
			move.infiltrates = true;
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (basePower <= 60) {
				this.debug('Knightly Honor boost');
				return this.chainModify(1.5);
			}
		},
	},
	"timber": {
		id: "timber",
		name: "Timber",
		onDamage: function (damage, target, source, effect) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.recoil || move.hasCustomRecoil) {
				this.debug('Timber boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		onStart: function (source) {
			this.setTerrain('grassyterrain');
		},
		onModifyDefPriority: 6,
		onModifyDef: function (pokemon) {
			if (this.isTerrain('grassyterrain')) return this.chainModify(1.5);
		},
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
	},
	"zapwizardry": {
		id: "zapwizardry",
		name: "Zap Wizardry",
		onStart: function (source) {
			this.setTerrain('electricterrain');
		},
		onAnyFaint: function () {
			this.boost({
				spa: 1
			}, this.effectData.target);
		},
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
	},
	"graveyard": {
		id: "graveyard",
		name: "Graveyard",
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onAfterDamage: function (damage, target, source, move) {
			if (!source || source.volatiles['disable']) return;
			if (source !== target && move && move.effectType === 'Move' && !move.isFutureMove) {
				if (this.random(10) < 3) {
					source.addVolatile('disable', this.effectData.target);
				}
			}
		},
		onModifySpePriority: 5,
		onModifySpe: function (spe) {
			return this.chainModify(2);
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spe: 1
				});
			}
		},
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1
				}, source);
			}
		},
	},
	"fatality": {
		id: "fatality",
		name: "Fatality",
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1
				}, source);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
	},
	"continentalrock": {
		id: "continentalcrush",
		name: "Continental Crush",
		onFoeTrapPokemon: function (pokemon) {
			if (!this.isAdjacent(pokemon, this.effectData.target)) return;
			if (pokemon.isGrounded()) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon: function (pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!this.isAdjacent(pokemon, source)) return;
			if (pokemon.isGrounded(!pokemon.knownType)) { // Negate immunity if the type is unknown
				pokemon.maybeTrapped = true;
			}
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Continental Rock neutralize');
				return this.chainModify(0.75);
			}
		},
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 8, source, target);
			}
			if (effect && effect.effectType === 'Move' && effect.id !== 'confused') {
				this.boost({
					def: 1
				});
			}
		},
		onStart: function (source) {
			this.setWeather('sandstorm');
		},
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			if (this.isWeather(['sandstorm'])) {
				return this.chainModify(2);
			}
			return this.chainModify(2);
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (!this.willMove(defender)) {
				this.debug('Continental Crush boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
	},
	"infernoblaze": {
		id: "infernoblaze",
		name: "Inferno Blaze",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Inferno Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Inferno Blaze boost');
				return this.chainModify(1.5);
			}
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onStart: function (source) {
			this.setWeather('desolateland');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'desolateland' && !(weather.id in {
					desolateland: 1,
					primordialsea: 1,
					deltastream: 1
				})) return false;
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					let target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && target.hasAbility('desolateland')) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.maxhp / 4, target, target);
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spe: 1
				});
			}
		},
		onUpdate: function (pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Inferno Blaze');
				pokemon.cureStatus();
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (status.id !== 'slp') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[msg]', '[from] ability: Inferno Blaze');
			return false;
		},
		onAfterDamage: function (damage, target, source, move) {
			if (move.category === 'Physical') {
				this.boost({
					def: -1,
					spe: 2
				});
			}
		},
	},
	"subzerofrost": {
		id: "subzerofrost",
		name: "Subzero Frost",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Subzero Frost boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Subzero Frost boost');
				return this.chainModify(1.5);
			}
			if (this.isWeather(['hail'])) {
				return this.chainModify(1.5);
			}
		},
		onStart: function (source) {
			this.setWeather('hail');
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'hail') {
				this.damage(target.maxhp / 4, target, target);
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spe: 1
				});
			}
		},
		onUpdate: function (pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Subzero Frost');
				pokemon.cureStatus();
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (status.id !== 'slp') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[msg]', '[from] ability: Subzero Frost');
			return false;
		},
		onAfterDamage: function (damage, target, source, move) {
			if (move.category === 'Physical') {
				this.boost({
					def: -1,
					spe: 2
				});
			}
		},
	},
	"steelenforcedshield": {
		id: "steelenforcedshield",
		name: "Steel Enforced Shield",
		onModifyMove: function (move) {
			move.stab = 2;
			move.ignoreAbility = true;
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Steel Enforced Shield boost');
				return this.chainModify(1.5);
			}
		},
	},
	"cannonball": {
		id: "cannonball",
		name: "Cannonball",
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.id !== 'confused') {
				this.boost({
					def: 1
				});
			}
		},
		onBoost: function (boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				boost[i] *= 2;
			}
		},
		onModifyMove: function (move) {
			move.ignoreAbility = true;
			move.stab = 2;
		},
	},
	"yeroyalejoust": {
		id: "yeroyalejoust",
		name: "Ye Royale Joust",
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1
				}, source);
			}
		},
	},
	"allahuakbar": {
		id: "allahuakbar",
		name: "Allahu Akbar",
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && !target.hp) {
				this.damage(source.maxhp / 2, source, target);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		onModifySpePriority: 5,
		onModifySpe: function (spe) {
			return this.chainModify(2);
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spe: 1
				});
			}
		},
	},
	"bravery": {
		id: "bravery",
		name: "Bravery",
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.id !== 'confused') {
				this.boost({
					def: 1
				});
			}
		},
		onBoost: function (boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				boost[i] *= 2;
			}
		},
		onModifyMove: function (move) {
			delete move.flags['contact'];
			move.stab = 2;
			move.ignoreAbility = true;
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onCriticalHit: false,
	},
	"masterdetonator": {
		id: "masterdetonator",
		name: "Master Detonator",
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spe: 1
				});
			}
		},
	},
	"championbowler": {
		id: "championbowler",
		name: "Champion Bowler",
		onModifyMove: function (move) {
			move.stab = 2;
			move.ignoreAbility = true;
		},
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
		onAnyFaint: function () {
			this.boost({
				spa: 1
			}, this.effectData.target);
		},
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.id !== 'confused') {
				this.boost({
					def: 1
				});
			}
		},
	},
	"toptiermusketeer": {
		id: "toptiermusketeer",
		name: "Top Tier Musketeer",
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
		onAnyFaint: function () {
			this.boost({
				spa: 1
			}, this.effectData.target);
		},
		onStart: function (source) {
			this.setTerrain('psychicterrain');
		},
	},
};
