'use strict';

exports.BattleAbilities = {
	//insist
	"cripplingdepression": {
		id: "cripplingdepression",
		name: "Crippling Depression",
		//primordialseas
		onStart: function (source) {
			this.setWeather('primordialsea');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'primordialsea' && !(weather.id in {
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
					if (target && target.hp && target.hasAbility('primordialsea')) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
		//raindish
		onWeather: function (target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.maxhp / 16);
			}
		},
		//swiftswim
		onModifySpe: function (spe, pokemon) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
		},
	},
	"prfmlmao": {
		id: "prfmlmao",
		name: "prfmlmao",
		onStart: function (source) {
			this.setWeather('hail');
		},
		//pixilate
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift') {
				move.type = 'Fairy';
				if (move.category !== 'Status') pokemon.addVolatile('pixilate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//hail solar power
		onModifySpAPriority: 5,
		onModifySpA: function (spa, pokemon) {
			if (this.isWeather(['hail'])) {
				return this.chainModify(1.5);
			}
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'hail') {
				this.damage(target.maxhp / 8, target, target);
			}
		},
	},
	"brilliantscale": {
		id: "brilliantscale",
		name: "Brilliant Scale",
		//multiscale + supereffective moves only do half as much
		onSourceModifyDamage: function (damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('Brilliant Scale weaken');
				return this.chainModify(0.5);
			}
			if (move.typeMod > 0) {
				this.debug('Brilliant Scale neutralize');
				return this.chainModify(0.50);
			}
		},
		//tintedlens
		onModifyDamage: function (damage, source, target, move) {
			if (move.typeMod < 0) {
				this.debug('Brilliant Scale boost');
				return this.chainModify(2);
			}
		},
	},
	"mosmicpower": {
		id: "mosmicpower",
		name: "Mosmic Power",
		onStart: function (pokemon) {
			this.boost({
				atk: 1,
				spa: 1,
				spe: 1
			});
		},
		onAnyTryPrimaryHit: function (target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Dark') {
				source.addVolatile('aura');
			}
		},
	},
	"solarrule": {
		id: "solarrule",
		name: "Solar Rule",
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
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, pokemon) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.maxhp / 8, target, target);
			}
		},
	},
	"feelsflys": {
		id: "feelsflys",
		name: "feelsflys",
		onStart: function (pokemon) {
			this.useMove('magnetrise', pokemon);
			this.boost({
				spa: 2
			});
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
	"hypothesis": {
		id: "hypothesis",
		name: "Hypothesis",
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onStart: function (pokemon) {
			this.add('c|%FiftyNine|/me is thinking.');
		},
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Fairy') return priority + 1;
			if (move && move.type === 'Normal') return priority + 1;
		},
		onPrepareHit: function (source, target, move) {
			if (move.hasBounced) return;
			let type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] Hypothesis');
			}
		},
	},
};
