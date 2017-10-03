'use strict';
exports.BattleAbilities = {
	"blissful": {
		id: "blissful",
		name: "Blissful",
		//priority to special attacks
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Special') {
				return priority + 6;
			}
		},
	},
	"torch": {
		id: "torch",
		name: "Torch",
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Fire Aura');
			this.boost({atk: 1, spa: 1, spe: 1});
		},
		onAnyTryPrimaryHit: function (target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Fire') {
				source.addVolatile('aura');
			}
		},
	},
	"wynaut": {
		id: "Wynaut",
		name: "Wynaut",
		//shadowtag
		onFoeTrapPokemon: function (pokemon) {
			if (!pokemon.hasAbility('shadowtag') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon: function (pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!pokemon.hasAbility('shadowtag') && this.isAdjacent(pokemon, source)) {
				pokemon.maybeTrapped = true;
			}
		},
		//prankster
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 6;
			}
		},
	},
	"badtime": {
		id: "badtime",
		name: "Bad Time",
		//mold breaker and air lock and sets HP to 1
		onStart: function (pokemon) {
			this.add('-sethp', pokemon, 1);
		},
		onModifyMove: function (move) {
			move.ignoreAbility = true;
		},
		suppressWeather: true,
		//sturdy
		onTryHit: function (pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Bad Time');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function (damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		//iron barbs and rough skin
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
		},
	},
	"risk": {
		id: "risk",
		name: "Risk",
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
		//moody
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			let stats = [];
			let boost = {};
			for (let statPlus in pokemon.boosts) {
				if (pokemon.boosts[statPlus] < 6) {
					stats.push(statPlus);
				}
			}
			let randomStat = stats.length ? stats[this.random(stats.length)] : "";
			if (randomStat) boost[randomStat] = 2;

			stats = [];
			for (let statMinus in pokemon.boosts) {
				if (pokemon.boosts[statMinus] > -6 && statMinus !== randomStat) {
					stats.push(statMinus);
				}
			}
			randomStat = stats.length ? stats[this.random(stats.length)] : "";
			if (randomStat) boost[randomStat] = -1;

			this.boost(boost);
		},
		//simple
		onBoost: function (boost) {
			for (let i in boost) {
				boost[i] *= 2;
			}
		},
		onModifyMove: function (move) {
			move.ignoreAbility = true;
		},
		suppressWeather: true,
	},
	"sanik": {
		id: "sanik",
		name: "Sanik",
		//boosts attack and speed every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spe: 1,
					atk: 1,
				});
			}
		},
		//bug type -ilate
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift') {
				move.type = 'Bug';
				if (move.category !== 'Status') pokemon.addVolatile('sanik');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
			onModifySpe: function (spe, pokemon) {
				if (!pokemon.item) {
					return this.chainModify(2);
				}
			},
		},
		//unburden
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
		//galewings
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
	},
	"bawlky": {
		id: "bawlky",
		name: "BAWLKY",
		//rough skin and iron barbs
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
		},
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
		//filter multiscale
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('BAWLKY neutralize');
				return this.chainModify(0.75);
			}
			if (target.hp >= target.maxhp) {
				this.debug('BAWLKY weaken');
				return this.chainModify(0.5);
			}
		},
		//magic bounce bulletproof
		onTryHitPriority: 1,
		onTryHit: function (target, source, move, pokemon) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			if (move.flags['bullet']) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: BAWLKY');
				return null;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//magic guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//immune to critical hits
		onCriticalHit: false,
	},
	"sunshine": {
		id: "sunshine",
		name: "Sunshine",
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
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
		//chlorrophyll
		onModifySpe: function (spe) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(2);
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
	},
	"memes": {
		id: "memes",
		name: "Memes",
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
			move.ignoreAbility = true;
			move.infiltrates = true;
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
		suppressWeather: true,
	},
	"barrierchange": {
		id: "barrierchange",
		name: "Barrier Change",
		//wonder guard
		onTryHit: function (target, source, move, pokemon) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			this.debug('Barrier Change immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				this.add('-immune', target, '[msg]', '[from] ability: Barrier Change');
				return null;
			}
			if (move.ohko) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Barrier Change');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage: function (damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
	},
	"lifeforce": {
		id: "lifeforce",
		name: "Life Force",
		//desolate land
		onStart: function (pokemon) {
			this.setWeather('desolateland');
			this.add('-start', pokemon, 'typechange', 'Fire/Dragon');
			pokemon.types = ["Fire", "Dragon"];
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
		//fire absorb
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Life Force');
				}
				return null;
			}
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				this.add('-immune', target, '[msg]', '[from] ability: Life Force');
				return null;
			}
		},
	},
	"toostronk": {
		id: "toostronk",
		name: "Too Stronk",
		//iron fist
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Too Stronk boost');
				return this.chainModify([0x1333, 0x1000]);
			}
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
			if (move.recoil || move.hasCustomRecoil) {
				this.debug('Too Stronk boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
			return this.chainModify(2);
		},
		//adaptability
		onModifyMove: function (move, pokemon) {
			move.stab = 2;
			move.infiltrates = true;
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
			move.ignoreAbility = true;
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
		suppressWeather: true,
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function () {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//attack and speed boost every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1,
					spe: 1,
				});
			}
		},
		//boosts attack and speed when it faints its target
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
					spe: 1,
				}, source);
			}
		},
		onDamage: function (effect) {
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
		},
		//super luck
		onModifyCritRatio: function (critRatio) {
			return critRatio + 1;
		},
		//sniper
		onModifyDamage: function (move) {
			if (move.crit) {
				this.debug('Too Stronk boost');
				return this.chainModify(1.5);
			}
		},
		//quick feet
		onModifySpe: function (spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
	},
	"opbirbs": {
		id: "opbirbs",
		name: "OP BIRBS",
		//rough skin and iron barbs
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
		},
		//prankster
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
			if (move && move.type === 'Flying') return priority + 1;
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
				this.debug('OP BIRBS neutralize');
				return this.chainModify(0.75);
			}
			if (target.hp >= target.maxhp) {
				this.debug('OP BIRBS weaken');
				return this.chainModify(0.5);
			}
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//magic guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//serene grace
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 2;
				}
			}
			move.stab = 2;
			move.ignoreAbility = true;
		},
		//regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: OP BIRBS');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) delete pokemon.showCure;
		},
		//deltastream
		onStart: function (source) {
			this.setWeather('deltastream');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'deltastream' && !(weather.id in {
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
					if (target && target.hp && target.hasAbility('deltastream')) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
		//naturalcure
		onCheckShow: function (pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

			let active = pokemon.side.active;
			let cureList = [];
			let noCureCount = 0;
			for (let i = 0; i < active.length; i++) {
				let curPoke = active[i];
				// pokemon not statused
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				let template = Dex.getTemplate(curPoke.species);
				// pokemon can't get Natural Cure
				if (Object.values(template.abilities).indexOf('Natural Cure') < 0) {
					// this.add('-message', "" + curPoke + " skipped: no Natural Cure");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!template.abilities['1'] && !template.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility('naturalcure')) {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (let i = 0; i < cureList.length; i++) {
					cureList[i].showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by OP BIRBS.)");

				for (let i = 0; i < cureList.length; i++) {
					cureList[i].showCure = false;
				}
			}
		},
	},
	"2hotforu": {
		id: "2hotforu",
		name: "2 Hot for U",
		//flamebody
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.random(10) < 3) {
					source.trySetStatus('brn', target);
				}
			}
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
		},
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
				this.debug('2 Hot For U neutralize');
				return this.chainModify(0.75);
			}
			if (target.hp >= target.maxhp) {
				this.debug('2 Hot For U weaken');
				return this.chainModify(0.5);
			}
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//magic guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		//boost defense and special defense every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					def: 1,
					spd: 1,
				});
			}
		},
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
	},
	"drenched": {
		id: "drenched",
		name: "Drenched",
		//strong jaw
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
				}, source);
			}
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
					spe: 1,
				}, source);
			}
		},
		onStart: function (pokemon) {
			this.add('-start', pokemon, 'typechange', 'Poison/Dark');
			pokemon.types = ["Poison", "Dark"];
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
		//attack and speed boost every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1,
					spe: 1,
				});
			}
		},
	},
	"barrelroll": {
		id: "barrelroll",
		name: "Barrel Roll",
		//rough skin and iron barbs
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
		},
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
				this.debug('Barrel Roll neutralize');
				return this.chainModify(0.75);
			}
			if (target.hp >= target.maxhp) {
				this.debug('Barrel Roll weaken');
				return this.chainModify(0.5);
			}
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//magic guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		//boost defense and special defense every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					def: 1,
					spd: 1,
				});
			}
		},
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
	},
	"forecastv2": {
		id: "forecastv2",
		name: "forecastv2",
		desc: "Ultimate Sandstorm Ability",
		//sand stream, rush, veil, and force
		onBasePowerPriority: 8,
		onBasePower: function (move) {
			if (this.isWeather('sandstorm')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Forecast V2 boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		onModifySpe: function () {
			if (this.isWeather('sandstorm')) {
				return this.chainModify(2);
			}
		},
		onStart: function () {
			this.setWeather('sandstorm');
		},
		onModifyAccuracy: function (accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.isWeather('sandstorm')) {
				this.debug('Forecast V2 - decreasing accuracy');
				return accuracy * 0.8;
			}
		},
		onImmunity: function (type) {
			if (type === 'sandstorm') return false;
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function () {
			return this.chainModify(2);
		},
		isUnbreakable: true,
		//adaptability infiltrator ignores abilities
		onModifyMove: function (move) {
			move.stab = 2;
			move.infiltrates = true;
			move.ignoreAbility = true;
		},
	},
	'durp': {
		id: "durp",
		name: "Durp",
		//rough skin and iron barbs
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
		},
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
				this.debug('Durp neutralize');
				return this.chainModify(0.75);
			}
			if (target.hp >= target.maxhp) {
				this.debug('Durp weaken');
				return this.chainModify(0.5);
			}
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//magic guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		//boost attack, defense, and special defense every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1,
					def: 1,
					spd: 1,
				});
			}
		},
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 2;
				}
			}
		},
	},
	"benonchalant": {
		id: "benonchalant",
		name: "Be Nonchalant",
		onModifyMove: function (move) {
			move.infiltrates = true;
		},
		//primordial sea
		onStart: function (source) {
			this.setWeather('primordialsea');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'primordialsea' && !(weather.id in {
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
					if (target && target.hp && target.hasAbility('primordialsea')) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
		//swift swim
		onModifySpe: function (spe, pokemon) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
		},
		//rain dish
		onWeather: function (target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.maxhp / 16);
			}
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.maxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.maxhp / 8, target, target);
			}
		},
		//water absorb
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Be Nonchalant');
				}
				return null;
			}
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Be Nonchalant');
				}
				return null;
			}
			if (target !== source && move.type === 'Water') {
				if (!this.boost({
					spa: 1,
				})) {
					this.add('-immune', target, '[msg]', '[from] ability: Be Nonchalant');
				}
				return null;
			}
		},
		//water veil
		onUpdate: function (pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Be Nonchalant');
				pokemon.cureStatus();
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (status.id !== 'brn') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[msg]', '[from] ability: Be Nonchalant');
			return false;
		},
		//hydration
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.status && this.isWeather(['raindance', 'primordialsea'])) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Be Nonchalant');
				pokemon.cureStatus();
			}
		},
		onBasePowerPriority: 7,
		onFoeBasePower: function (basePower, attacker, defender, move) {
			if (this.effectData.target !== defender) return;
			if (move.type === 'Fire') {
				return this.chainModify(1.25);
			}
		},
		onAnyRedirectTarget: function (target, source, move) {
			if (move.type !== 'Water' || move.id in {
				firepledge: 1,
				grasspledge: 1,
				waterpledge: 1,
			}) return;
			if (this.validTarget(this.effectData.target, source, move.target)) {
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Be Nonchalant');
				}
				return this.effectData.target;
			}
		},
	},
	"retweet": {
		id: "retweet",
		name: "Retweet",
		shortDesc: "SpA Huge Power, 1.3x Sound Moves, Adaptability, Gale Wings.",
		//boosts power of sound moves
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['sound'] || move.flags['authentic']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
		//gale wings
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
	},
	"prfmador": {
		id: "prfmador",
		name: "prfmador",
		//snow warning
		onStart: function (source) {
			this.setWeather('hail');
		},
		//special attack and speed boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spa: 1,
					spe: 1,
				});
			}
		},
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			if (this.isWeather(['hail'])) {
				return this.chainModify(1.5);
			}
			return this.chainModify(2);
		},
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
		//special and speed moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1,
					spe: 1,
				}, source);
			}
		},
		//cute charm
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.random(10) < 3) {
					source.addVolatile('attract', this.effectData.target);
				}
			}
		},
		//snow chlorophyll
		onModifySpe: function (spe) {
			if (this.isWeather(['hail'])) {
				return this.chainModify(2);
			}
		},
	},
	"elluminate": {
		id: "elluminate",
		name: "Elluminate",
		//airlock and moldbreaker and uses substitute
		onStart: function (pokemon) {
			this.useMove('substitute', pokemon);
		},
		onModifyMove: function (move) {
			move.ignoreAbility = true;
		},
		suppressWeather: true,
		//bad dreams
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (!pokemon.hp) return;
			for (let i = 0; i < pokemon.side.foe.active.length; i++) {
				let target = pokemon.side.foe.active[i];
				if (!target || !target.hp) continue;
				if (target.status === 'slp') {
					this.damage(target.maxhp / 8, target, pokemon);
				}
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
	},
	"volcanicembers": {
		id: "volcanicembers",
		name: "Volcanic Embers",
		onModifyMove: function (move) {
			move.infiltrates = true;
			move.stab = 2;
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
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//magic guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//special attack and speed boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spa: 1,
					spe: 1,
				});
			}
		},
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
		//special and speed moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1,
					spe: 1,
				}, source);
			}
		},
	},
	"jetfumescantmeltsteelbeams": {
		id: "jetfumescantmeltsteelbeams",
		name: "Jet Fumes Can't Melt Steel Beams",
		desc: "Ayyyyy lmao",
		shortDesc: "Google it ya nerd kek",
		//rough skin and iron barbs
		onAfterDamageOrder: 1,
		onAfterDamage: function (target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			if (move && move.flags['contact']) {
				if (this.random(10) < 3) {
					source.trySetStatus('brn', target);
				}
			}
		},
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
				this.debug('Jet Fumes Can\'t Melt Steel Beams neutralize');
				return this.chainModify(0.75);
			}
			if (target.hp >= target.maxhp) {
				this.debug('Jet Fumes Can\'t Melt Steel Beams weaken');
				return this.chainModify(0.5);
			}
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			if (target !== source && move.type === 'Fire') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Jet Fumes Can\'t Melt Steel Beams');
				}
				return null;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//magic guard
		onDamage: function (effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//immune to critical hits
		onCriticalHit: false,
		//boost attack, defense, and special defense every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1,
					def: 1,
					spd: 1,
				});
			}
		},
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
	},
	"jigglybuff": {
		id: "jigglybuff",
		name: "JIGGLYBUFF",
		desc: "kek",
		shortDesc: "ReturningAvenger has no life... SPREAD THE WORD",
		//cute charm
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.random(10) < 3) {
					source.addVolatile('attract', this.effectData.target);
				}
			}
		},
		onModifyMove: function (move) {
			move.infiltrates = true;
			move.stab = 2;
			move.ignoreAbility = true;
		},
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
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
		suppressWeather: true,
		//simple
		onBoost: function (boost) {
			for (let i in boost) {
				boost[i] *= 2;
			}
		},
	},
	"haxrus": {
		id: "haxrus",
		name: "HaxRUs",
		desc: "Welcome to HaxRUS! How may I help yew?",
		shortDesc: "Welcome to HaxRUs kek",
		//adaptability
		onModifyMove: function (move) {
			move.infiltrates = true;
			move.stab = 2;
			move.ignoreAbility = true;
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
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
		onStart: function (pokemon) {
			this.add('-start', pokemon, 'typechange', 'Dragon/Steel');
			pokemon.types = ["Dragon", "Steel"];
		},
		//attack and speed boost every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1,
					spe: 1,
				});
			}
		},
		//boosts attack and speed when it faints its target
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
					spe: 1,
				}, source);
			}
		},
		//super luck
		onModifyCritRatio: function (critRatio) {
			return critRatio + 1;
		},
		//sniper
		onModifyDamage: function (damage, source, target, move) {
			if (move.crit) {
				this.debug('HaxRUs boost');
				return this.chainModify(1.5);
			}
		},
		//tough claws
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
	},
	"icee": {
		id: "icee",
		name: "ICEE",
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
		//magic guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//filter
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('ICEE neutralize');
				return this.chainModify(0.75);
			}
			if (target.hp >= target.maxhp) {
				this.debug('ICEE weaken');
				return this.chainModify(0.5);
			}
		},
		//rough skin and iron barbs
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			if (move && move.flags['contact']) {
				if (this.random(10) < 3) {
					source.trySetStatus('frz', target);
				}
			}
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
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
		//battle armor
		onCriticalHit: false,
		//regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		//boost defense and special defense every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					def: 1,
					spd: 1,
				});
			}
		},
		onModifyMove: function (move) {
			move.ignoreAbility = true;
		},
		suppressWeather: true,
	},
	"blueeyeswhitedragon": {
		id: "blueeyeswhitedragon",
		name: "Blue Eyes White Dragon",
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
		//special attack and speed boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spa: 1,
					spe: 1,
				});
			}
		},
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(2);
			}
			return this.chainModify(2);
		},
		//adaptability
		onModifyMove: function (move) {
			move.infiltrates = true;
			move.stab = 2;
		},
		//special and speed moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1,
					spe: 1,
				}, source);
			}
		},
		//chlorophyll
		onModifySpe: function (spe) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(2);
			}
		},
	},
	"thetruegod": {
		id: "thetruegod",
		name: "The True God",
		desc: "RumpADump is the one true God, kiddos.",
		shortDesc: "RumpADump I fna!",
		isNonstandard: true,
		//infiltrator
		onModifyMove: function (move, pokemon) {
			move.infiltrates = true;
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
			move.stab = 2;
			move.ignoreAbility = true;
		},
		//Persistent Mold Breaker and Trick Room used upon entry
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Persistent');
			this.useMove('trickroom', pokemon);
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//special attack and reverse speed boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spa: 1,
					spe: -1,
				});
			}
		},
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(2);
			}
			return this.chainModify(2);
		},
		//special attack moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1,
				}, source);
			}
		},
		//no guard
		onAnyAccuracy: function (accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
	},
	"tmgi": {
		id: "tmgi",
		name: "TMGI",
		//immune to contact
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (move.flags['contact'] && target !== source && this.getImmunity('contact', target)) {
				this.add('-immune', target, '[msg]', '[from] ability: TMGI');
				return null;
			}
		},
		//uses Magnet Rise; type change
		onStart: function (pokemon) {
			this.useMove('magnetrise', pokemon);
			this.add('-start', pokemon, 'typechange', 'Electric/Psychic');
			pokemon.types = ["Electric", "Psychic"];
		},
		onModifyMove: function (move) {
			move.ignoreAbility = true;
		},
		suppressWeather: true,
	},
	"wall": {
		id: "wall",
		name: "WALL",
		desc: "Liek jew build da wall and bam",
		shortDesc: "xD rawr",
		//adaptability
		onModifyMove: function (move, pokemon) {
			move.stab = 2;
			move.infiltrates = true;
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
			move.ignoreAbility = true;
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
			return this.chainModify(2);
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
		//attack and speed boost every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1,
					spe: 1,
				});
			}
		},
		//boosts attack and speed when it faints its target
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
					spe: 1,
				}, source);
			}
		},
		//super luck
		onModifyCritRatio: function (critRatio) {
			return critRatio + 1;
		},
		//sniper
		onModifyDamage: function (damage, source, target, move) {
			if (move.crit) {
				this.debug('WALL boost');
				return this.chainModify(1.5);
			}
		},
		//tough claws
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//quick feet
		onModifySpe: function (spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
	},
	"demonicmascot": {
		id: "demonicmascot",
		name: "Demonic Mascot",
		//adaptability
		onModifyMove: function (move, pokemon) {
			move.stab = 2;
			move.infiltrates = true;
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
			move.infiltrates = true;
			move.ignoreAbility = true;
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
			return this.chainModify(2);
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
		//attack and speed boost every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1,
					spe: 1,
				});
			}
		},
		//boosts attack and speed when it faints its target
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
					spe: 1,
				}, source);
			}
		},
		//super luck
		onModifyCritRatio: function (critRatio) {
			return critRatio + 1;
		},
		//sniper
		onModifyDamage: function (damage, source, target, move) {
			if (move.crit) {
				this.debug('Demonic Mascot boost');
				return this.chainModify(1.5);
			}
		},
		//tough claws
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
			if (move.recoil || move.hasCustomRecoil) {
				this.debug('Demonic Mascot boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//quick feet
		onModifySpe: function (spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		//disguise
		onDamagePriority: 1,
		onDamage: function (damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && target.template.speciesid === 'mimikyu' && !target.transformed) {
				this.add('-activate', target, 'ability: Demonic Mascot');
				this.effectData.busted = true;
				return 0;
			}
			if (effect.id === 'recoil' && this.activeMove.id !== 'struggle') return null;
		},
		onUpdate: function (pokemon) {
			if (pokemon.template.speciesid === 'mimikyu' && this.effectData.busted) {
				let template = this.getTemplate('Mimikyu-Busted');
				pokemon.formeChange(template);
				pokemon.baseTemplate = template;
				pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('detailschange', pokemon, pokemon.details);
			}
		},
	},
	"warhorse": {
		id: "warhorse",
		name: "War Horse",
		//adaptability
		onModifyMove: function (move, pokemon) {
			move.stab = 2;
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
			move.infiltrates = true;
			move.ignoreAbility = true;
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
			return this.chainModify(2);
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
		//attack and speed boost every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1,
					spe: 1,
				});
			}
		},
		//boosts attack and speed when it faints its target
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
					spe: 1,
				}, source);
			}
		},
		//super luck
		onModifyCritRatio: function (critRatio) {
			return critRatio + 1;
		},
		//sniper
		onModifyDamage: function (damage, source, target, move) {
			if (move.crit) {
				this.debug('War Horse boost');
				return this.chainModify(1.5);
			}
			if (!target.activeTurns) {
				this.debug('War Horse boost');
				return this.chainModify(2);
			}
		},
		//tough claws
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//quick feet
		onModifySpe: function (spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		//stamina
		onAfterDamage: function (damage, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
					def: 1,
				});
			}
		},
	},
	"gearup": {
		//stance change (allows guard)
		onBeforeMovePriority: 11,
		onBeforeMove: function (attacker, defender, move) {
			if (attacker.template.baseSpecies !== 'Aegislash' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'guard') return;
			let targetSpecies = (move.id === 'guard' ? 'Aegislash' : 'Aegislash-Blade');
			if (attacker.template.species !== targetSpecies && attacker.formeChange(targetSpecies)) {
				this.add('-formechange', attacker, targetSpecies, '[from] ability: Gear Up');
			}
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move, pokemon) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			if (move.flags['bullet']) {
				this.add('-immune', pokemon, '[msg]', '[from] ability: Gear Up');
				return null;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		suppressWeather: true,
		//infiltrator
		onModifyMove: function (move) {
			move.infiltrates = true;
			move.ignoreAbility = true;
		},
	},
	"fungus": {
		id: "fungus",
		name: "Fungus",
		//Air Lock Corrosion and Mold Breaker and uses Leech Seed upon entry
		onStart: function (pokemon) {
			this.useMove('leechseed', pokemon);
		},
		suppressWeather: true,
		//power-up healing moves
		onTryHealPriority: 1,
		onTryHeal: function (damage, target, source, effect) {
			let heals = {
				drain: 1,
				leechseed: 1,
				ingrain: 1,
				aquaring: 1,
			};
			if (heals[effect.id]) {
				return Math.ceil((damage * 1.3) - 0.5); // Big Root rounds half down
			}
		},
		//prankster
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
		},
		onModifyMove: function (move) {
			if (move && move.category === 'Status') {
				move.pranksterBoosted = true;
			}
			move.ignoreAbility = true;
		},
		//regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
		//rough skin and iron barbs
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
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
				this.debug('Fungus neutralize');
				return this.chainModify(0.75);
			}
			if (target.hp >= target.maxhp) {
				this.debug('Fungus weaken');
			}
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//magic guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//immune to critical hits
		onCriticalHit: false,
		//boost defense and special defense every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					def: 1,
					spd: 1,
				});
			}
		},
	},
	"bookfish": {
		id: "bookfish",
		name: "Bookfish",
		shortDesc: "Not a Bookworm",
		desc: "The bookworm version but for a fishy kek",
		//prankster
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
		},
		onModifyMove: function (move) {
			if (move && move.category === 'Status') {
				move.pranksterBoosted = true;
			}
			move.infiltrates = true;
			move.stab = 2;
			move.ignoreAbility = true;
		},
		//regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
		//rough skin and iron barbs
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move, effect) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
					def: 1,
				});
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
				this.debug('Bookfish neutralize');
				return this.chainModify(0.75);
			}
			if (target.hp >= target.maxhp) {
				this.debug('Bookfish weaken');
				return this.chainModify(0.5);
			}
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//magic guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//immune to critical hits
		onCriticalHit: false,
		//boost defense and special defense every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					def: 1,
					spd: 1,
				});
			}
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		//stakeout
		onModifyDamage: function (damage, source, target) {
			if (!target.activeTurns) {
				this.debug('Bookfish boost');
				return this.chainModify(2);
			}
		},
		//special and speed moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
				}, source);
			}
		},
	},
	"clownsightings": {
		id: "clownsightings",
		name: "Clown Sightings",
		//prankster
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
		},
		onModifyMove: function (move) {
			if (move && move.category === 'Status') {
				move.pranksterBoosted = true;
			}
			move.ignoreAbility = true;
			move.stab = 2;
			move.infiltrates = true;
		},
		//regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
		//rough skin and iron barbs
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move, effect) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1,
					def: 1,
					spd: 1,
				});
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
				this.debug('Clown Sightings neutralize');
				return this.chainModify(0.75);
			}
			if (target.hp >= target.maxhp) {
				this.debug('Clown Sightings weaken');
				return this.chainModify(0.5);
			}
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			if (!this.heal(target.maxhp / 4)) {
				this.add('-immune', target, '[msg]', '[from] ability: Clown Sightings');
			}
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Clown Sightings');
				}
				return null;
			}
			if (target !== source && move.type === 'Water') {
				if (!this.boost({
					spa: 1,
				})) {
					this.add('-immune', target, '[msg]', '[from] ability: Clown Sightings');
				}
				return null;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//magic guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//immune to critical hits
		onCriticalHit: false,
		//boost defense and special defense every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					def: 1,
					spd: 1,
				});
			}
			if (pokemon.status && this.isWeather(['raindance', 'primordialsea'])) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Clown Sightings');
				pokemon.cureStatus();
			}
		},
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
		//stakeout
		onModifyDamage: function (damage, source, target) {
			if (!target.activeTurns) {
				this.debug('Clown Sightings boost');
				return this.chainModify(2);
			}
		},
		//special moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1,
				}, source);
			}
		},
		//primordial sea
		onStart: function (source) {
			this.setWeather('primordialsea');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'primordialsea' && !(weather.id in {
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
					if (target && target.hp && target.hasAbility('primordialsea')) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
		//swift swim
		onModifySpe: function (spe, pokemon) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
		},
		//rain dish
		onWeather: function (target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.maxhp / 16);
			}
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.maxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.maxhp / 8, target, target);
			}
		},
		//water veil
		onUpdate: function (pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Clown Sightings');
				pokemon.cureStatus();
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (status.id !== 'brn') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[msg]', '[from] ability: Clown Sightings');
			return false;
		},
		onBasePowerPriority: 7,
		onFoeBasePower: function (basePower, attacker, defender, move) {
			if (this.effectData.target !== defender) return;
			if (move.type === 'Fire') {
				return this.chainModify(1.25);
			}
		},
		onAnyRedirectTarget: function (target, source, source2, move) {
			if (move.type !== 'Water' || move.id in {
				firepledge: 1,
				grasspledge: 1,
				waterpledge: 1,
			}) return;
			if (this.validTarget(this.effectData.target, source, move.target)) {
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Clown Sightings');
				}
				return this.effectData.target;
			}
		},
	},
	"timetraveler": {
		id: "timetraveler",
		name: "Time Traveler",
		desc: "If you could change the past, wouldya?",
		shortDesc: "Wish we could turn back time... time.... to the good ole' days.....",
		isNonstandard: true,
		//infiltrator adaptability sheerforce
		onModifyMove: function (move, pokemon) {
			move.infiltrates = true;
			move.stab = 2;
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
			move.ignoreAbility = true;
		},
		//Persistent Mold Breaker and Trick Room used upon entry
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Persistent');
			this.useMove('trickroom', pokemon);
		},
		suppressWeather: true,
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function () {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//special attack and reverse speed boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spa: 1,
					spe: -1,
				});
			}
		},
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function () {
			return this.chainModify(2);
		},
		//special attack moxie
		onSourceFaint: function (source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1,
				}, source);
			}
		},
		//no guard
		onAnyAccuracy: function (accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
	},
	"dankrai": {
		id: "dankrai",
		name: "Dankrai",
		//infiltrator sheerforce
		onModifyMove: function (move, pokemon) {
			move.infiltrates = true;
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
			move.stab = 2;
			move.ignoreAbility = true;
		},
		suppressWeather: true,
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//special attack and speed boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spa: 1,
					spe: 1,
				});
			}
			if (!pokemon.hp) return;
			for (let i = 0; i < pokemon.side.foe.active.length; i++) {
				let target = pokemon.side.foe.active[i];
				if (!target || !target.hp) continue;
				if (target.status === 'slp') {
					this.damage(target.maxhp / 8, target, pokemon);
				}
			}
		},
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function () {
			return this.chainModify(2);
		},
		//special attack moxie
		onSourceFaint: function (source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1,
				}, source);
			}
		},
		//no guard
		onAnyAccuracy: function (accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
	},
	"anorexia": {
		id: "anorexia",
		name: "Anorexia",
		//infiltrator
		onModifyMove: function (move, pokemon) {
			move.infiltrates = true;
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
			move.stab = 2;
			move.ignoreAbility = true;
		},
		suppressWeather: true,
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function () {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//reverse special attack and speed boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spa: -1,
					spe: -1,
				});
			}
		},
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function () {
			return this.chainModify(2);
		},
		//reverse special attack moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: -1,
				}, source);
			}
		},
		//no guard
		onAnyAccuracy: function (accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
		//contrary
		onBoost: function (boost) {
			for (let i in boost) {
				boost[i] *= -1;
			}
		},
	},
	"ninja": {
		id: "ninja",
		name: "Ninja",
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
			move.ignoreAbility = true;
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
		suppressWeather: true,
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
		//special attack and speed boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spa: 1,
					spe: 1,
				});
			}
		},
		//special and speed moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1,
					spe: 1,
				}, source);
			}
		},
		//stakeout
		onModifyDamage: function (damage, source, target) {
			if (!target.activeTurns) {
				this.debug('Ninja boost');
				return this.chainModify(2);
			}
		},
		//mega launcher
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['pulse']) {
				return this.chainModify(1.5);
			}
		},
		//protean
		onPrepareHit: function (source, target, move) {
			if (move.hasBounced) return;
			let type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] Ninja');
			}
		},
	},
	"flappyrowlet": {
		id: "flappyrowlet",
		name: "Flappy Rowlet",
		//regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
			if (!pokemon.status) return;
			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Flappy Rowlet');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) delete pokemon.showCure;
		},
		//tough claws
		onBasePowerPriority: 8,
		onBasePower: function (move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
			move.infiltrates = true;
			delete move.flags['contact'];
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
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
		//attack boost every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1,
				});
			}
		},
		//moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
				}, source);
			}
		},
		//stamina
		onAfterDamage: function (move, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					def: 1,
				});
			}
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
		},
		//stakeout
		onModifyDamage: function (damage, source, target) {
			if (!target.activeTurns) {
				this.debug('Flappy Rowlet boost');
				return this.chainModify(2);
			}
		},
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//magic guard
		onDamage: function (effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//multiscale
		onSourceModifyDamage: function (target) {
			if (target.hp >= target.maxhp) {
				this.debug('Flappy Rowlet weaken');
				return this.chainModify(0.5);
			}
		},
		//naturalcure
		onCheckShow: function (pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

			let active = pokemon.side.active;
			let cureList = [];
			let noCureCount = 0;
			for (let i = 0; i < active.length; i++) {
				let curPoke = active[i];
				// pokemon not statused
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				let template = Dex.getTemplate(curPoke.species);
				// pokemon can't get Natural Cure
				if (Object.values(template.abilities).indexOf('Natural Cure') < 0) {
					// this.add('-message', "" + curPoke + " skipped: no Natural Cure");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!template.abilities['1'] && !template.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility('naturalcure')) {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (let i = 0; i < cureList.length; i++) {
					cureList[i].showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Flappy Rowlet.)");

				for (let i = 0; i < cureList.length; i++) {
					cureList[i].showCure = false;
				}
			}
		},
		//battle armor
		onCriticalHit: false,
		//power-up healing moves
		onTryHealPriority: 1,
		onTryHeal: function (damage, target, source, effect) {
			let heals = {
				drain: 1,
				leechseed: 1,
				ingrain: 1,
				aquaring: 1,
			};
			if (heals[effect.id]) {
				return Math.ceil((damage * 1.3) - 0.5); // Big Root rounds half down
			}
		},
	},
	"fuckingsmashing": {
		id: "fuckingsmashing",
		name: "FUCKING SMASHING",
		//regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: FUCKING SMASHING');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) delete pokemon.showCure;
		},
		//tough claws
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
			move.infiltrates = true;
			delete move.flags["contact"];
			move.ignoreAbility = true;
		},
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
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
		suppressWeather: true,
		//special attack boost every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spa: 1,
				});
			}
		},
		//Special moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1,
				}, source);
			}
		},
		//stamina
		onAfterDamage: function (move, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					def: 1,
					spd: 1,
				});
			}
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
		},
		//stakeout
		onModifyDamage: function (damage, source, target) {
			if (!target.activeTurns) {
				this.debug('FUCKING SMASHING boost');
				return this.chainModify(2);
			}
		},
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//magic guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//multiscale
		onSourceModifyDamage: function (damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('FUCKING SMASHING weaken');
				return this.chainModify(0.5);
			}
		},
		//naturalcure
		onCheckShow: function (pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

			let active = pokemon.side.active;
			let cureList = [];
			let noCureCount = 0;
			for (let i = 0; i < active.length; i++) {
				let curPoke = active[i];
				// pokemon not statused
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				let template = Dex.getTemplate(curPoke.species);
				// pokemon can't get Natural Cure
				if (Object.values(template.abilities).indexOf('FUCKING SMASHING') < 0) {
					// this.add('-message', "" + curPoke + " skipped: no Natural Cure");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!template.abilities['1'] && !template.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility('fuckingsmashing')) {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (let i = 0; i < cureList.length; i++) {
					cureList[i].showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by FUCKING SMASHING.)");

				for (let i = 0; i < cureList.length; i++) {
					cureList[i].showCure = false;
				}
			}
		},
		//battle armor
		onCriticalHit: false,
		//power-up healing moves
		onTryHealPriority: 1,
		onTryHeal: function (damage, target, source, effect) {
			let heals = {
				drain: 1,
				leechseed: 1,
				ingrain: 1,
				aquaring: 1,
			};
			if (heals[effect.id]) {
				return Math.ceil((damage * 1.3) - 0.5); // Big Root rounds half down
			}
		},
	},
	"melodicharmony": {
		id: "melodicharmony",
		name: "Melodic Harmony",
		//infiltrator
		onModifyMove: function (move, pokemon) {
			move.infiltrates = true;
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
			move.stab = 2;
			move.ignoreAbility = true;
		},
		suppressWeather: true,
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//special attack and speed boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spa: 1,
					spe: 1,
				});
			}
			if (!pokemon.hp) return;
			for (let i = 0; i < pokemon.side.foe.active.length; i++) {
				let target = pokemon.side.foe.active[i];
				if (!target || !target.hp) continue;
				if (target.status === 'slp') {
					this.damage(target.maxhp / 8, target, pokemon);
				}
			}
		},
		//special huge power
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
		//special attack moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					spa: 1,
				}, source);
			}
		},
		//no guard
		onAnyAccuracy: function (accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
	},
	"cellmanipulation": {
		id: "cellmanipulation",
		name: "Cell Manipulation",
		//tough claws
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
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
		suppressWeather: true,
		//sheer force
		onModifyMove: function (move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
			move.stab = 2;
			move.infiltrates = true;
			move.ignoreAbility = true;
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//attack and speed boost every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1,
					spe: 1,
				});
			}
		},
		//boosts attack and speed when it faints its target
		onSourceFaint: function (source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
					spe: 1,
				}, source);
			}
		},
		//super luck
		onModifyCritRatio: function (critRatio) {
			return critRatio + 1;
		},
		//sniper
		onModifyDamage: function (move) {
			if (move.crit) {
				this.debug('Cell Manipulation boost');
				return this.chainModify(1.5);
			}
		},
		//quick feet
		onModifySpe: function (spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
	},
	"masterevolutionlord": {
		id: "masterevolutionlord",
		name: "Master Evolution Lord",
		//tough claws
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		//adaptability
		onModifyMove: function (move, pokemon) {
			move.stab = 2;
			move.infiltrates = true;
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
			move.ignoreAbility = true;
			delete move.flags['contact'];
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
		onStart: function (pokemon) {
			this.useMove('Protect', pokemon);
		},
		suppressWeather: true,
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//attack and speed boost every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1,
					spe: 1,
				});
			}
		},
		//boosts attack and speed when it faints its target
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
					spe: 1,
				}, source);
			}
		},
		//super luck
		onModifyCritRatio: function (critRatio) {
			return critRatio + 1;
		},
		//sniper
		onModifyDamage: function (damage, source, target, move) {
			if (move.crit) {
				this.debug('Master Evolution Lord boost');
				return this.chainModify(1.5);
			}
		},
		//quick feet
		onModifySpe: function (spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		//protean
		onPrepareHit: function (source, target, move) {
			if (move.hasBounced) return;
			let type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] Master Evolution Lord');
			}
		},
	},
	"originality": {
		id: "originality",
		name: "Originality",
		//sets up all hazards + uses Rapid Spin & Topsy Turvy + Protect + Mold Breaker activates + Adaptability
		onStart: function (pokemon) {
			this.useMove('Spikes', pokemon);
			this.useMove('Spikes', pokemon);
			this.useMove('Spikes', pokemon);
			this.useMove('Toxic Spikes', pokemon);
			this.useMove('Toxic Spikes', pokemon);
			this.useMove('Stealth Rock', pokemon);
			this.useMove('Sticky Web', pokemon);
			this.useMove('Rapid Spin', pokemon);
			this.useMove('Topsy Turvy', pokemon);
			this.useMove('Protect', pokemon);
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		suppressWeather: true,
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
			move.ignoreAbility = true;
		},
	},
	"guardianofmelemele": {
		id: "guardianofmelemele",
		name: "Guardian of Melemele",
		shortDesc: "Summons Electric Terrain, Huge Power, Moxie, Speed Boost, Tough Claws, Long Reach, Mold Breaker, Unaware, Adaptability, Reckless",
		desc: "Summons Electric Terrain, Huge Power, Moxie, Speed Boost, Tough Claws, Long Reach, Mold Breaker, Unaware, Adaptability, Reckless",
		//electric surge
		onStart: function (source) {
			this.setTerrain('electricterrain');
		},
		//moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
				}, source);
			}
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
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
		//tough claws
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
			if (move.recoil || move.hasCustomRecoil) {
				this.debug('Reckless boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		//long reach
		onModifyMove: function (move) {
			delete move.flags['contact'];
			move.stab = 2;
			move.ignoreAbility = true;
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
	},
	"slowwww": {
		id: "slowwww",
		name: "Slowwww",
		shortDesc: "4x agility and -4x attack. Primordial Sea. Water Absorb. Lightning Rod. Thick Fat. Flash Fire. Tailwind. Aqua Ring. Ingrain. Levitate. Reflect. Light Screen. Infiltrator. Rough Skin. Iron Barbs. Magic Bounce. Insomnia. Oblivious. Immunity. Magma Armor. Clear Body. Pressure. Simple. Serene Grace. Unaware. Mold Breaker. Aftermath. Paralysis and -4x agility on target on switch in.",
		desc: "4x agility and -4x attack. Primordial Sea. Water Absorb. Lightning Rod. Thick Fat. Flash Fire. Tailwind. Aqua Ring. Ingrain. Levitate. Reflect. Light Screen. Infiltrator. Rough Skin. Iron Barbs. Magic Bounce. Insomnia. Oblivious. Immunity. Magma Armor. Clear Body. Pressure. Simple. Serene Grace. Unaware. Mold Breaker. Aftermath. Paralysis and -4x agility on target on switch in.",
		onStart: function (pokemon) {
			this.boost({
				spe: 6,
				atk: -6,
			});
			this.useMove('Tailwind', pokemon);
			this.useMove('Aqua Ring', pokemon);
			this.useMove('Ingrain', pokemon);
			this.useMove('Reflect', pokemon);
			this.useMove('Light Screen', pokemon);
			this.useMove('Thunder Wave', pokemon);
			this.setWeather('primordialsea');
			this.add('-ability', pokemon, 'Levitate');
			//makes opposing pokemon's speed lowered by 6
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
					this.boost({
						spe: -6,
					}, foeactive[i], pokemon);
				}
			}
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'primordialsea' && !(weather.id in {
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
					if (target && target.hp && target.hasAbility('primordialsea')) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
			pokemon.removeVolatile('flashfire');
		},
		//water absorb
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Water Absorb');
				}
				return null;
			}
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[msg]', '[from] ability: Lightning Rod');
				}
				return null;
			}
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
				}
				return null;
			}
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAnyRedirectTarget: function (target, source, source2, move) {
			if (move.type !== 'Electric' || move.id in {firepledge: 1, grasspledge: 1, waterpledge: 1}) return;
			if (this.validTarget(this.effectData.target, source, move.target)) {
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Lightning Rod');
				}
				return this.effectData.target;
			}
		},
		//thick fat
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function (target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function (atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd: function (target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			},
		},
		//infiltrator
		onModifyMove: function (move) {
			move.infiltrates = true;
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 2;
				}
			}
			move.ignoreAbility = true;
		},
		//rough skin iron barbs and aftermath
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target);
			}
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target);
			}
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		//insomnia
		onUpdate: function (pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Insomnia');
				pokemon.cureStatus();
			}
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Oblivious');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Magma Armor');
				pokemon.cureStatus();
			}
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				this.add('-activate', pokemon, 'ability: Immunity');
				pokemon.cureStatus();
			}
		},
		onSetStatus: function (status, target, source, effect) {
			if (status.id !== 'slp') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[msg]', '[from] ability: Insomnia');
			if (status.id !== 'psn' && status.id !== 'tox') return;
			if (!effect || !effect.status) return false;
			this.add('-immune', target, '[msg]', '[from] ability: Immunity');
			return false;
		},
		onImmunity: function (type, pokemon) {
			if (type === 'attract') return false;
			if (type === 'frz') return false;
		},
		//clear body
		onBoost: function (boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				if (boost[i] < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			for (let i in boost) {
				boost[i] *= 2;
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
		},
		//pressure
		onDeductPP: function (target, source) {
			if (target.side === source.side) return;
			return 1;
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
	},
	"toucannonsam": {
		id: "toucannonsam",
		name: "Toucannon Sam",
		rating: 4,
		desc: "Adaptability, Huge Power, Moxie, Stakeout, Tough Claws, Long Reach, Mold Breaker, Unaware, Gen 6 Gale Wings, uses Defog and Tailwind upon entry",
		shortDesc: "Adaptability, Huge Power, Moxie, Stakeout, Tough Claws, Long Reach, Mold Breaker, Unaware, Gen 6 Gale Wings, uses Defog and Tailwind upon entry",
		onStart: function (pokemon) {
			this.useMove('Defog', pokemon);
			this.useMove('Tailwind', pokemon);
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
			delete move.flags['contact'];
			if (move.multihit && move.multihit.length) {
				move.multihit = move.multihit[1];
			}
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
			move.ignoreAbility = true;
		},
		//moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
				}, source);
			}
		},
		//stakeout
		onModifyDamage: function (damage, source, target) {
			if (!target.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
		},
		//tough claws
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
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
		//gen 6 gale wings
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
	},
	"fairyprincess": {
		id: "fairyprincess",
		name: "Fairy Princess",
		//rough skin and iron barbs
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
		},
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
				this.debug('Fairy Princess neutralize');
				return this.chainModify(0.75);
			}
		},
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		//magic guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		//boosts stats every turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					spa: 1,
					def: 1,
					spd: 1,
					spe: 1,
				});
			}
		},
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
		//spa huge power
		onModifySpAPriority: 5,
		onModifySpA: function (spa) {
			return this.chainModify(2);
		},
		//adaptability
		onModifyMove: function (move, pokemon) {
			move.stab = 2;
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (let i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance *= 2;
				}
			}
			if (move.secondaries) {
				delete move.secondaries;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				pokemon.addVolatile('sheerforce');
			}
		},
		//simple
		onBoost: function (boost) {
			for (let i in boost) {
				boost[i] *= 2;
			}
		},
		//soul heart
		onAnyFaint: function () {
			this.boost({
				spa: 1,
			}, this.effectData.target);
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x14CD, 0x1000]);
			},
		},
		//stakeout
		onModifyDamage: function (damage, source, target) {
			if (!target.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
		},
		//fairy aura
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Fairy Aura');
		},
		onAnyTryPrimaryHit: function (target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Fairy') {
				source.addVolatile('aura');
			}
		},
	},
	"sharpsprayer": {
		id: "sharpsprayer",
		name: "Sharp's Prayer",
		//noguard
		onAnyAccuracy: function (accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
		//takes opponent down with them
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && !target.hp) {
				this.damage(source.maxhp / 1, source, target);
			}
		},
	},
	"stainlesssteel": {
		id: "stainlesssteel",
		name: "Stainless Steel",
		//iron barbs and rough skin
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move, effect) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			//aftermath
			if (source && source !== target && move && move.flags['contact'] && !target.hp) {
				this.damage(source.maxhp / 4, source, target, null, true);
			}
			if (effect && effect.effectType === 'Move') {
				this.boost({
					def: 1,
					spd: 1,
				});
			}
			if (effect && effect.type === 'Dark') {
				this.boost({
					atk: 1,
				});
			}
		},
		//heatproof
		onBasePowerPriority: 7,
		onSourceBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onDamage: function (damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				return damage / 2;
			}
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//filter
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Filter neutralize');
				return this.chainModify(0.75);
			}
		},
		//stakeout
		onModifyDamage: function (damage, source, target, move) {
			if (!target.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
			if (move.crit) {
				this.debug('Sniper boost');
				return this.chainModify(1.5);
			}
			if (move.typeMod < 0) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
		},
		//moxie
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({
					atk: 1,
				}, source);
			}
		},
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		//speed boost
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({
					atk: 1,
					def: 1,
				});
			}
		},
		//long reach
		onModifyMove: function (move) {
			delete move.flags['contact'];
			move.stab = 2;
			move.infiltrates = true;
			move.ignoreAbility = true;
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
					this.boost({
						atk: -1,
					}, foeactive[i], pokemon);
				}
			}
			this.add('-start', pokemon, 'typechange', 'Steel/Psychic/Fire');
			pokemon.types = ["Steel", "Psychic", "Fire"];
		},
		//magnet pull
		onFoeTrapPokemon: function (pokemon) {
			if (pokemon.hasType('Steel') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon: function (pokemon, source) {
			if (!source) source = this.effectData.target;
			if ((!pokemon.knownType || pokemon.hasType('Steel')) && this.isAdjacent(pokemon, source)) {
				pokemon.maybeTrapped = true;
			}
		},
		//own tempo
		onUpdate: function (pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Own Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile: function (status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit: function (target, source, move) {
			if (move && move.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Own Tempo');
			}
		},
		//parental bond
		onPrepareHit: function (source, target, move) {
			if (move.id in {iceball: 1, rollout: 1}) return;
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
				} else {
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
		//pressure
		onDeductPP: function (target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		isUnbreakable: true,
		//can't be crit'ed
		onCriticalHit: false,
		//soundproof
		onTryHit: function (target, source, move) {
			if (target !== source && move.flags['sound']) {
				this.add('-immune', target, '[msg]', '[from] ability: Soundproof');
				return null;
			}
		},
		onAllyTryHitSide: function (target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', this.effectData.target, '[msg]', '[from] ability: Soundproof');
			}
		},
		//thick fat
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
	},
};
