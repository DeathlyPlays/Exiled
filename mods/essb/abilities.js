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
	//catequil
	"gawd": {
		id: "gawd",
		name: "GAWD",
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
		//hugepower
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
	},
	//vividisagod
	"jetstream": {
		id: "jetstream",
		name: "JetStream",
		//multiscale
		onSourceModifyDamage: function (damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('Multiscale weaken');
				return this.chainModify(0.5);
			}
		},
	},
	//jigglykongisfum16
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
				this.debug('Bawlky neutralize');
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
	//backatmyday
	"landlord": {
		id: "landlord",
		name: "Landlord",
		//thickfat
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
		//Fire Absorb
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Landlord');
				}
				return null;
			}
		},
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
	//happysong
	"godcomplex": {
		id: "godcomplex",
		name: "God Complex",
		onStart: function (source) {
			this.useMove('topsyturvy', source);
		},
		//rough skin
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 8, source, target, null, true);
			}
		},
	},
	//philmiester
	"demonsblade": {
		id: "demonsblade",
		name: "Demon's Blade",
		//toughclaws
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
	},
	//kairak
	"gjsquad": {
		id: "gjsquad",
		name: "gj Squad",
		//toughclaws
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, deflcender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		//sheerforce
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
	//volco
	"volcanicash": {
		id: "volcanicash",
		name: "Volcanic Ash",
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
		//adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
	},
	//bronze0re
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
	//supanova
	"supanova": {
		id: "supanova",
		name: "Supanova",
		//multiscale
		onSourceModifyDamage: function (damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('Supanova weaken');
				return this.chainModify(0.5);
			}
		},
		//flamebody
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.random(10) < 3) {
					source.trySetStatus('brn', target);
				}
			}
		},
	},
	//theaquaphoenix
	"howtobeop101": {
		id: "howtobeop101",
		name: "How to be OP 101",
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
		//multiscale
		onSourceModifyDamage: function (damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('How to be OP 101 weaken');
				return this.chainModify(0.5);
			}
		},
		//regenerator
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 3);
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: How to be OP 101');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) delete pokemon.showCure;
		},
		//roughskin
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact']) {
				this.damage(source.maxhp / 8, source, target, null, true);
			}
		},
		//special fur coat
		onModifySpDPriority: 6,
		onModifySpD: function (spd) {
			return this.chainModify(2);
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
				let template = Tools.getTemplate(curPoke.species);
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
	},
	//abstarfox
	"hiya": {
		id: "hiya",
		name: "Hiya",
		desc: "Intimidate + Technician + Adaptability + Magic Guard",
		shortDesc: "Intimidate + Technician + Adaptability + Magic Guard",
		gen: -1,
		//intimidate
		onStart: function (pokemon) {
			let foeactive = pokemon.side.foe.active;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Hiya!', 'boost');
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
		},
		//technician
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (basePower <= 60) {
				this.debug('Hiya! boost');
				return this.chainModify(1.5);
			}
		},
		//magic guard
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
	"connecticutyankee": {
		id: "connecticutyankee",
		name: "Connecticut Yankee",
		//Sets TR when out
		onStart: function (pokemon) {
			this.useMove('trickroom', pokemon);
		},
		//Dazzling
		onFoeTryMove: function (target, source, effect) {
			if ((source.side === this.effectData.target.side || effect.id === 'perishsong') && effect.priority > 0.1 && effect.target !== 'foeSide') {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Connecticut Yankee', effect, '[of] ' + target);
				return false;
			}
		},
		//Fire absorb
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Connecticut Yankee');
				}
				return null;
			}
		},
	},
	"feelsflys": {
		id: "feelsflys",
		name: "feelsflys",
		onStart: function (pokemon) {
			this.useMove('magnetrise', pokemon);
			this.boost({
				spa: 2,
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
					[stat]: 1,
				}, source);
			}
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
};
