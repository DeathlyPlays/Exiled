"use strict";

exports.BattleAbilities = {
	//Insist
	"cripplingdepression": {
		id: "cripplingdepression",
		name: "Crippling Depression",
		//primordialseas
		onStart: function (source) {
			this.setWeather("primordialsea");
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === "primordialsea" && !["desolateland", "primordialsea", "deltastream"].includes(weather.id)) return false;
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					let target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && target.hasAbility("primordialsea")) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
		//raindish
		onWeather: function (target, source, effect) {
			if (effect.id === "raindance" || effect.id === "primordialsea") {
				this.heal(target.maxhp / 16);
			}
		},
		//swiftswim
		onModifySpe: function (spe, pokemon) {
			if (this.isWeather(["raindance", "primordialsea"])) {
				return this.chainModify(2);
			}
		},
		desc: "Primordial Sea, Rain Dish, and Swift Swim.",
	},

	// Mewth
	"roarplaying": {
		id: "roarplaying",
		name: "Roarplaying",
		desc: "Uses Roar then Focus Energy.",
		onStart: function (pokemon, source) {
			this.useMove("roar", pokemon);
			this.useMove("focusenergy", pokemon);
			this.add("c|~Mewth|LEMME HEAR YOU ROARRRRRRRRRRRR");
		},
		onStart: function (pokemon) {
			this.add("-start", pokemon, "typechange", "Normal/Ghost");
			pokemon.types = ["Normal", "Ghost"];
		},
	},

	// Renfur
	"desertdragon": {
		id: "desertdragon",
		name: "Desert Dragon",
		desc: "Normal type moves become Bug type and if the user makes a Pokemon faint, its SpA and Spe raise two stages.",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === "Move") {
				this.boost({spa: 2, spe: 2}, source);
			}
		},
		// Insectize
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === "Normal" && move.id !== "naturalgift" && !move.isZ) {
				move.type = "Bug";
				if (move.category !== "Status") pokemon.addVolatile("insectize");
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
			this.add("-start", pokemon, "typechange", "Bug/Dragon");
			pokemon.types = ["Bug", "Dragon"];
		},
	},

	// AlfaStorm
	"attackshield": {
		id: "attackshield",
		name: "Attack Shield",
		//Magic Bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags["reflectable"]) {
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
			if (type === "sandstorm" || type === "hail" || type === "powder") return false;
		},
		//Adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
		desc: "Adaptability, Overcoat, and Magic Bounce.",
	},

	// C733937 123
	"chatoicarmor": {
		id: "chaoticarmor",
		name: "Chaotic Armor",
		//Prankster
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === "Status") {
				return priority + 1;
			}
		},
		onModifyMove: function (move) {
			if (move && move.category === "Status") {
				move.pranksterBoosted = true;
			}
		},
		//Magic Bounce
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target === source || move.hasBounced || !move.flags["reflectable"]) {
				return;
			}
			let newMove = this.getMoveCopy(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags["reflectable"]) {
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
		desc: "Magic Bounce, and Prankster.",
	},

	//Chandie
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
			if (this.getWeather().id === 'desolateland' && !['desolateland', 'primordialsea', 'deltastream'].includes(weather.id)) return false;
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
		desc: "Dazzling, Infiltrator, Mold Breaker, Air Lock, Unaware, and this ability cannot be ignored.  On switch-in, the user uses Topsy Turvy.",
	},

	//SnorlaxTheRain
	"scraroom": {
		id: "scraroom",
		name: "Scraroom",
		desc: "Combination of Trick Room & Scrappy",
		shortDesc: "Trick Room + Scrappy",
		onStart: function (pokemon) {
			this.useMove('trickroom', pokemon);
		},
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
	},
};
