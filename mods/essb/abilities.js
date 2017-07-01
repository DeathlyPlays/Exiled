'use strict';

exports.BattleAbilities = {
	//Insist
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
	//bedevil
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
		//boosts damage by 1.5x in hail
		onModifySpAPriority: 5,
		onModifySpA: function (spa, pokemon) {
			if (this.isWeather(['hail'])) {
				return this.chainModify(1.5);
			}
		},
		onModifySpe: function (spe, pokemon) {
			if (this.isWeather('hail')) {
				return this.chainModify(1.5);
			}
		},
	},
	"lastlaugh": {
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Dark Aura');
		},
		onModifyMove: function (move) {
			move.ignoreAbility = true;
		},
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.effectType === 'Move' && !target.hp) {
				this.damage(damage * 2, source, target);
			}
		},
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		onFoeTrapPokemon: function (pokemon) {
			if (!pokemon.hasAbility('lastlaugh') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		id: "lastlaugh",
		name: "Last Laugh",
	},
	"phatass": {
		id: "phatass",
		name: "Phat Ass",
		onStart: function (source) {
			this.setWeather('sandstorm');
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
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (this.isWeather('sandstorm')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'sandstorm') return false;
		},
	},
	//jigglykongisfum16
	"3bawlky5u": {
		id: "3bawlky5u",
		name: "3Bawlky5U",
		isUnbreakable: true,
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
		//Parts of Natural Cure + Regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: 3Bawlky5U');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) delete pokemon.showCure;
		},
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
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Cure.)");

				for (let i = 0; i < cureList.length; i++) {
					cureList[i].showCure = false;
				}
			}
		},
		//magicbounce
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
		//magicguard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
	},
	"lawofthedragon": {
		shortDesc: "This Pokemon's contact moves have their power multiplied by 1.3.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('Multiscale weaken');
				return this.chainModify(0.5);
			}
		},
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		onStart: function (pokemon) {
			this.useMove('Stealth Rock', pokemon);
			this.useMove('Toxic Spikes', pokemon);
		},
		id: "lawofthedragon",
		name: "Law of the Dragon",
	},
	//backatmyday
	"timetraveler": {
		id: "timetraveler",
		name: "Time Traveler",
		//trickroom
		onStart: function (pokemon) {
			this.useMove('trickroom', pokemon);
		},
		//pressure
		onDeductPP: function (target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		//roughskin
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 8, source, target);
			}
		},
	},
	//astralwobz
	"wobzdoezjobz": {
		id: "wobzdoezjobz",
		name: "WobzDoezJobz",
		//technician
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (basePower <= 60) {
				this.debug('WobzDoezJobz boost');
				return this.chainModify(1.5);
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
		},
		//simple
		onBoost: function (boost) {
			for (let i in boost) {
				boost[i] *= 2;
			}
		},
	},
	//volco
	"volcanicash": {
		id: "volcanicash",
		name: "Volcanic Ash",
		//magic bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			if (move.type === 'Ground' && !target.activeTurns) {
				this.add('-immune', target, '[msg]', '[from] ability: Volcanic Ash');
				return null;
			}
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
		//magicguard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
	},
	//C7
	"chatoicarmor": {
		id: "chaoticarmor",
		name: "Chaotic Armor",
		//Prankster
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
		},
		onModifyMove: function (move) {
			if (move && move.category === 'Status') {
				move.pranksterBoosted = true;
			}
		},
		//Magic Bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
	},
	//TheGodOfPie
	"madtings": {
		id: "madtings",
		name: "Mad Tings",
		//huge power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
		//pixilate
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift' && !move.isZ) {
				move.type = 'Fairy';
				if (move.category !== 'Status') pokemon.addVolatile('pixilate');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x1333, 0x1000]);
			},
		},
		//uses topsy turvy upon entry
		onStart: function (pokemon) {
			this.useMove('topsyturvy', pokemon);
		},
	},
	"lordofwinter": {
		id: "lordofwinter",
		name: "Lord of Winter",
		onChargeMove: function (pokemon, target, move) {
			this.debug('Delete charge for ' + move.id);
			return false; // skip charge turn
		},
		//sets hail
		onStart: function (source) {
			this.setWeather('hail');
		},
	},
	"nohax": {
		id: "nohax",
		name: "No Hax",
		//No Guard
		onAnyAccuracy: function (accuracy, target, source, move, basePower) {
			if (basePower <= 100 && move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
		//Shield Dust
		onModifySecondaries: function (secondaries) {
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		//Huge Power
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
	},
	"conflictofinterest": {
		id: "conflictofinterest",
		name: "Conflict of Interest",
		//Since levitate cant be coded in
		onStart: function (pokemon) {
			this.useMove('magnetrise', pokemon);
		},
		//HeatProof and fliter other types
		onBasePowerPriority: 7,
		onSourceBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Fire' || move.type === 'Ghost' || move.type === 'Dark') {
				return this.chainModify(0.5);
			}
		},
		onDamage: function (damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				return damage / 2;
			}
		},
	},
	"nice0u0": {
		id: "nice0u0",
		name: "Nice 0u0",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.recoil || move.hasCustomRecoil) {
				this.debug('Reckless boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
	},
	"tradeoff": {
		id: "tradeoff",
		name: "Trade-Off",
		onStart: function (pokemon) {
			this.useMove('heartswap', pokemon);
		},
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
		},
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
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Cure.)");

				for (let i = 0; i < cureList.length; i++) {
					cureList[i].showCure = false;
				}
			}
		},
		onSwitchOut: function (pokemon) {
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Natural Cure');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) delete pokemon.showCure;
		},
	},
	"catchmeintheball": {
		id: "catchmeintheball",
		name: "Catch me in the Ball",
		desc: "Adaptability + Protean",
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onPrepareHit: function (source, target, move) {
			if (move.hasBounced) return;
			let type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] Catch me in the Ball');
			}
		},
	},
	//alfastorm
	"attackshield": {
		id: "attackshield",
		name: "Attack Shield",
		//Magic Bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		//overcoat
		onImmunity: function (type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder') return false;
		},
		//Adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
	},
	"magmaoverdrive": {
		id: "magmaoverdrive",
		name: "Magma Overdrive",
		rating: 4.5,
		desc: "Desolate Land + Adaptability + Tinted Lens; If hit by a Fire Move, it Special Attack raises by 1 stage.",
		//Adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
		//Tinted Lens
		onModifyDamage: function (damage, source, target, move) {
			if (move.typeMod < 0) {
				this.debug('Magma Overdrive boost');
				return this.chainModify(2);
			}
		},
		//Flash Fire
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[msg]', '[from] ability: Magma Overdrive');
				}
				return null;
			}
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function (target) {
				this.add('-start', target, 'ability: Magma Overdrive');
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Magma Overdrive boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function (atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Magma Overdrive boost');
					return this.chainModify(1.5);
				}
			},
			onEnd: function (target) {
				this.add('-end', target, 'ability: Magma Overdrive', '[silent]');
			},
		},
		//Desolate Land
		onStart: function (source) {
			this.setWeather('desolateland');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'desolateland' && !(weather.id in {desolateland:1, primordialsea:1, deltastream:1})) return false;
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
			//Piece of Flash Fire
			pokemon.removeVolatile('flashfire');
		},
	},
	"roarplaying": {
		id: "roarplaying",
		name: "Roarplaying",
		desc: "Uses Roar then Focus Energy.",
		onStart: function (pokemon, source) {
			this.useMove('roar', pokemon);
			this.useMove('focusenergy', pokemon);
			this.add('c|~Mewth|LEMME HEAR YOU ROARRRRRRRRRRRR');
		},
	},
	"desertdragon": {
		id: "desertdragon",
		name: "DesertDragon",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa:2, spe: 2}, source);
			}
		},
		//Insectize
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift' && !move.isZ) {
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
	},
	"defense": {
		id: "defense",
		name: "Defense",
		//Unaware
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
		//Magic Bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//Defense and Special Defense Boost Every Turn
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({def: 1, spd: 1});
			}
		},
	},
	"handsburn": {
		id: "handsburn",
		name: "handsBurn",
		desc: "Immune to Frz, 3x Guts, Skill Link, Dazzling, and Trick Room",
		//immune to freezing
		onUpdate: function (pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: handsBurn');
				pokemon.cureStatus();
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'frz') return false;
		},
		//3x Attack Guts
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(3);
			}
		},
		//Skill Link
		onModifyMove: function (move) {
			if (move.multihit && move.multihit.length) {
				move.multihit = move.multihit[1];
			}
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
		},
		//Dazzling
		onFoeTryMove: function (target, source, effect) {
			if ((source.side === this.effectData.target.side || effect.id === 'perishsong') && effect.priority > 0.1 && effect.target !== 'foeSide') {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: handsBurn', effect, '[of] ' + target);
				return false;
			}
		},
		//trickroom
		onStart: function (pokemon) {
			this.useMove('trickroom', pokemon);
		},
	},
	"almightypresence": {
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onFoeTryMove: function (target, source, effect) {
			if ((source.side === this.effectData.target.side || effect.id === 'perishsong') && effect.priority > 0.1 && effect.target !== 'foeSide') {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Almighty Presence', effect, '[of] ' + target);
				return false;
			}
		},
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
		id: "almightypresence",
		name: "Almighty Presence",
	},
	"theexiledones": {
		id: "theexiledones",
		name: "The Exiled Ones",
		//dazzling
		onFoeTryMove: function (target, source, effect) {
			if ((source.side === this.effectData.target.side || effect.id === 'perishsong') && effect.priority > 0.1 && effect.target !== 'foeSide') {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: The Exiled Ones', effect, '[of] ' + target);
				return false;
			}
		},
		//infiltrator + mold breaker
		onModifyMove: function (move) {
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
		//air lock
		suppressWeather: true,
		//This Ability can't be ignored
		isUnbreakable: true,
		//uses Topsy Turvy
		onStart: function (pokemon) {
			this.useMove('topsyturvy', pokemon);
		},
	},
	//EchoSierra
	"nogutsnoglory": {
		id: "nogutsnoglory",
		name: "No Guts, No Glory",
		//Quick Feet
		onModifySpe: function (spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		//Guts
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		//Gale Wings
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
		//adaptability + scrappy
		onModifyMove: function (move) {
			move.stab = 2;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		//reckless
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.recoil || move.hasCustomRecoil) {
				this.debug('No Guts, No Glory boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		//poison heal
		onDamage: function (damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.maxhp / 8);
				return false;
			}
		},
	},
	//ggdaca
	"lordsgrace": {
		id: "lordsgrace",
		name: "Lord's Grace",
		desc: "Boosts own atk + def + spd + spe by 1 stage",
		onStart: function (pokemon) {
			this.boost({atk: 1, def: 1, spd: 1, spe: 1});
		},
	},
	//Horrific17
	"horrificplays": {
		id: "horrificplays",
		name: "Horrific Plays",
		desc: "Fur Coat + Ignores Abilities + Magic Room",
		//starts up Magic Room upon entry
		onStart: function (pokemon) {
			this.useMove('magicroom', pokemon);
		},
		//fur coat
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		//ignores abilities
		onModifyMove: function (move) {
			move.ignoreAbility = true;
		},
	},
	//Stabby the Krabby
	"readytostab": {
		id: "readytostab",
		name: "Ready to Stab",
		desc: "Boosts user's Atk and Spe by 2 stages",
		onStart: function (pokemon) {
			let foeactive = pokemon.side.foe.active;
			for (let i = 0; i < foeactive.length; i++) {
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost({atk: 2, spe: 2});
				}
			}
		},
	},
	//Kraken Mare (Mostly Ripped from other abilities... I'm lazy)
	"krakensboost": {
		id: "krakensboost",
		name: "Kraken's Boost",
		desc: "Moody + No Guard",
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
		onModifyAccuracy: function (accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
	},
	//HoeenHero
	"programmersdomain": {
		id: "programmersdomain",
		name: "Programmer's Domain",
		desc: "Primordial Sea + Rain Dish + Swift Swim + Adaptability",
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
		onWeather: function (target, source, effect) {
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.maxhp / 16);
			}
		},
		onModifySpe: function (spe, pokemon) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
		},
		onModifyMove: function (move) {
			move.stab = 2;
		},
	},
	"jooj": {
		id: "jooj",
		name: "JOOJ",
		desc: "Deso Land + Flash Fire + Adaptability + Magic Guard + Dazzling",
		//Deso Land
		onStart: function (source) {
			this.setWeather('desolateland');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'desolateland' && !(weather.id in {desolateland:1, primordialsea:1, deltastream:1})) return false;
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
			pokemon.removeVolatile('flashfire');
		},
		//Adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
		//Flash Fire
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[msg]', '[from] ability: Flash Fire');
				}
				return null;
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
		//Magic Guard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		//Dazzling
		onFoeTryMove: function (target, source, effect) {
			if ((source.side === this.effectData.target.side || effect.id === 'perishsong') && effect.priority > 0.1 && effect.target !== 'foeSide') {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Dazzling', effect, '[of] ' + target);
				return false;
			}
		},
	},
	"getbonded": {
		id: "getbonded",
		name: "Get Bonded",
		desc: "Magic Bounce + Primordial Sea + 1 layer of spikes and toxic spikes",
		//Magic Bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		//Heavy Rain
		onStart: function (pokemon) {
			this.setWeather('primordialsea');
			this.useMove('Spikes', pokemon);
			this.useMove('Toxic Spikes', pokemon);
			this.add('c| douglasgamer|You just got screwed brother >:D');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'primordialsea' && !(weather.id in {desolateland:1, primordialsea:1, deltastream:1})) return false;
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
		//Mold Breaker
		onModifyMove: function (move) {
			move.ignoreAbility = true;
		},
	},
	"birdclaws": {
		id: "birdclaws",
		name: "Bird Claws",
		desc: "Tough Claws + Immune to Ground",
		//Tough Claws
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onTryHit: function (target, source, move) {
			if (move.type === 'Ground' && !target.activeTurns) {
				this.add('-immune', target, '[msg]', '[from] ability: Bird Claws');
				return null;
			}
		},
	},
	"darkpower": {
		id: "darkpower",
		name: "Dark Power",
		desc: "Boosts Dark moves by 2x",
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Dark Power boost');
				return this.chainModify(2);
			}
		},
	},
	"sneakyfluffer": {
		shortDesc: "Normalize + Scrappy + Skill Link.",
		onModifyMovePriority: 1,
		onModifyMove: function (move, pokemon) {
			if (!move.isZ && move.id !== 'struggle' && this.getMove(move.id).type !== 'Normal') {
				move.type = 'Normal';
			}
			if (move.category !== 'Status') pokemon.addVolatile('normalize');
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
			if (move.multihit && move.multihit.length) {
				move.multihit = move.multihit[1];
			}
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x1333, 0x1000]);
			},
		},
		onStart: function (pokemon) {
			this.boost({spe:1});
			this.useMove('Wrap', pokemon);
			this.useMove('Tail Whip', pokemon);
			this.useMove('Cute Charm', pokemon);
			this.useMove('Tearful Look', pokemon);
			this.useMove('Play Nice', pokemon);
		},
		id: "sneakyfluffer",
		name: "Sneaky Fluffer",
		rating: 4,
		num: 14,
	},
	"fightersheart": {
		id: "fightersheart",
		name: "Fighter's Heart",
		shortDesc: "Boosts user's Attack Special Attack and Spe upon entry.",
		onStart: function (pokemon) {
			this.boost({atk: 1, spa: 1, spe: 1});
		},
	},
	"dustkickup": {
		id: "dustkickup",
		name: "DustKickUp",
		desc: "Lowers all foes stats by 1 (except acc & eva) upon entry",
		onStart: function (pokemon) {
			let foeactive = pokemon.side.foe.active;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'DustKickUp', 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost({atk: -1, def: -1, spa: -1, spd: -1, spe: -1}, foeactive[i], pokemon);
				}
			}
		},
	},
	//honestly mostly stolen from VXN
	"howdareyouhate": {
		desc: "Prankster, Ignores Ability + Innards Out",
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'How Dare You Hate');
		},
		onModifyMove: function (move) {
			move.ignoreAbility = true;
		},
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.effectType === 'Move' && !target.hp) {
				this.damage(damage * 2, source, target);
			}
		},
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
			this.add('c|!LovethisMagikarp|I just wanted to love you.');
		},
		id: "howdareyouhate",
		name: "How Dare You Hate",
	},
	"deadass": {
		id: "deadass",
		name: "Deadass",
		desc: "Prankster",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
		},
	},
	"bestegg": {
		id: "bestegg",
		name: "Best Egg",
		desc: "Doubles Defense and Special Defense + Regenerator + Prankster",
		onModifyDefPriority: 6,
		onModifyDef: function (def) {
			return this.chainModify(2);
		},
		onModifySpdPriority: 6,
		onModifySpd: function (spd) {
			return this.chainModify(2);
		},
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
		},
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority + 1;
			}
		},
	},
	"cuteface": {
		id: "cuteface",
		name: "Cute Face",
		desc: "Contrary + Magic Guard + Soul Heart that raises Spa and Spd.",
		//contrary
		onBoost: function (boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				boost[i] *= -1;
			}
		},
		//soulheart
		onAnyFaint: function () {
			this.boost({spa:1, spd: 1}, this.effectData.target);
		},
		//magicguard
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
	},
	"callofthehaunted": {
		id: "callofthehaunted",
		name: "Call of the Haunted",
		desc: "+1 Attack, +1 Defense, +1 Special Defense. Changes type to Water/Ghost. Activates Reflect and Light Screen on switchin. Doubles the user's Attack.",
		shortDesc: "+1 Atk Def & SpD, Sets dual screens, Changes type.",
		onStart: function (pokemon) {
			this.add('-start', pokemon, 'typechange', 'Water/Ghost');
			pokemon.types = ["Water", "Ghost"];
			this.boost({atk: 1, def: 1, spd: 1});
			this.useMove('Reflect', pokemon);
			this.useMove('Light Screen', pokemon);
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
	},
	"feelssota": {
		id: "feelssota",
		name: "feelssota",
		desc: "Contrary + Reverse Speed Boost + Adaptability",
		onBoost: function (boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				boost[i] *= -1;
			}
		},
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: -1});
			}
		},
	},
	//Desokoro
	"wavecall": {
		desc: "Boosts Water type moves by 2x if status'ed or if below 1/2 max HP",
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, pokemon, move, attacker) {
			if (pokemon.status && move.type === 'Water' || move.type === 'Water' && attacker.hp <= attacker.maxhp / 2) {
				return this.chainModify(2);
			}
		},
		id: "wavecall",
		name: "Wave Call",
	},
};
