'use strict';

exports.BattleAbilities = {
	"mlgsunglasses": {
		id: "mlgsunglasses",
		name: "MLG Sunglasses",
		//prankster
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
		},
		//unaware
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
		//filter
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Filter neutralize');
				return this.chainModify(0.75);
			}
		},
		//ironbarbs and aftermath effects
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 8, source, target, null, true);
			}
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
		},
	},
	//gday
	"gdaygday": {
		onBoost: function (boost) {
			for (let i in boost) {
				boost[i] *= 2;
			}
		},
		id: "gdaygday",
		name: "gday gday",
	},
	//deathlyplays
	"turbo": {
		id: "turbo",
		name: "Turbo",
		//speed boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spe: 1,
				});
			}
		},
		//no guard
		onAnyAccuracy: function (accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
		//sheer force
		onModifyMove: function (move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
	},
	//snobalt
	"amityabsorb": {
		id: "amityabsorb",
		name: "Amity Absorb",
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fairy') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Amity Absorb');
				}
				return null;
			}
		},
	},
	//tamas
	"danksunlord": {
		id: "danksunlord",
		name: "Dank Sunlord",
		//desolate land
		onStart: function (source) {
			this.setWeather('desolateland');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'desolateland' && !(weather.id in {
				desolateland: 1,
				primordialsea: 1,
				deltastream: 1,
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
		//special attack huge power
		onModifySpAPriority: 6,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
	},
	//healndeal
	"fluffy": {
		id: "fluffy",
		name: "Fluffy",
		//furcoat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//stickyhold
		onTakeItem: function (item, pokemon, source) {
			if (this.suppressingAttackEvents() && pokemon !== this.activePokemon || !pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Sticky Hold');
				return false;
			}
		},
	},
	//vulpixmayhem
	"prepareformayhem": {
		id: "prepareformayhem",
		name: "Prepare for Mayhem",
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
		//speed boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spe: 1,
				});
			}
		},
	},
};
