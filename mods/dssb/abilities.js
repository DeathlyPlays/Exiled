"use strict";

exports.BattleAbilities = {
	//Insist
	"cripplingdepression": {
		id: "cripplingdepression",
		name: "Crippling Depression",
		// Primordial Sea
		onStart: function () {
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
		onModifySpe: function () {
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
		onStart: function (pokemon) {
			this.add("-start", pokemon, "typechange", "Normal/Ghost");
			pokemon.types = ["Normal", "Ghost"];
			this.useMove("roar", pokemon);
			this.useMove("focusenergy", pokemon);
			this.add("c|~Mewth|LEMME HEAR YOU ROARRRRRRRRRRRR");
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
			onBasePower: function () {
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
		// Magic Bounce
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
		// Overcoat
		onImmunity: function (type) {
			if (type === "sandstorm" || type === "hail" || type === "powder") return false;
		},
		// Adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
		desc: "Adaptability, Overcoat, and Magic Bounce.",
	},

	// C733937 123
	"chaoticarmor": {
		id: "chaoticarmor",
		name: "Chaotic Armor",
		// Prankster
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
		// Magic Bounce
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
		desc: "Magic Bounce & Prankster.",
	},

	// Chandie
	"magmaoverdrive": {
		id: "magmaoverdrive",
		name: "Magma Overdrive",
		rating: 4.5,
		desc: "Desolate Land, Adaptability & Flash Fire.",
		// Adaptability
		onModifyMove: function (move) {
			move.stab = 2;
		},
		// Flash Fire
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === "Fire") {
				move.accuracy = true;
				if (!target.addVolatile("flashfire")) {
					this.add("-immune", target, "[msg]", "[from] ability: Magma Overdrive");
				}
				return null;
			}
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function (target) {
				this.add("-start", target, "ability: Magma Overdrive");
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, attacker, defender, move) {
				if (move.type === "Fire") {
					this.debug("Magma Overdrive boost");
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA: function (atk, attacker, defender, move) {
				if (move.type === "Fire") {
					this.debug("Magma Overdrive boost");
					return this.chainModify(1.5);
				}
			},
			onEnd: function (target) {
				this.add("-end", target, "ability: Magma Overdrive", "[silent]");
			},
		},
		// Desolate Land
		onStart: function () {
			this.setWeather("desolateland");
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === "desolateland" && !["desolateland", "primordialsea", "deltastream"].includes(weather.id)) return false;
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					let target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && target.hasAbility("desolateland")) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
			//Piece of Flash Fire
			pokemon.removeVolatile("flashfire");
		},
	},

	"theexiledones": {
		id: "theexiledones",
		name: "The Exiled Ones",
		//dazzling
		onFoeTryMove: function (target, source, effect) {
			if ((source.side === this.effectData.target.side || effect.id === "perishsong") && effect.priority > 0.1 && effect.target !== "foeSide") {
				this.attrLastMove("[still]");
				this.add("cant", this.effectData.target, "ability: The Exiled Ones", effect, "[of] " + target);
				return false;
			}
		},
		// Infiltrator & Mold Breaker
		onModifyMove: function (move) {
			move.infiltrates = true;
			move.ignoreAbility = true;
		},
		// Unaware
		onAnyModifyBoost: function (boosts, target) {
			let source = this.effectData.target;
			if (source === target) return;
			if (source === this.activePokemon && target === this.activeTarget) {
				boosts["def"] = 0;
				boosts["spd"] = 0;
				boosts["evasion"] = 0;
			}
			if (target === this.activePokemon && source === this.activeTarget) {
				boosts["atk"] = 0;
				boosts["spa"] = 0;
				boosts["accuracy"] = 0;
			}
		},
		// Air Lock
		suppressWeather: true,
		// Cannot be ignored
		isUnbreakable: true,
		// uses Topsy Turvy
		onStart: function (pokemon) {
			this.useMove("topsyturvy", pokemon);
		},
		desc: "Dazzling, Infiltrator, Mold Breaker, Air Lock, Unaware, and this ability cannot be ignored.  On switch-in, the user uses Topsy Turvy.",
		shortDesc: "Immune to being ignored, and priority. Ignores opponent's abilities, priority, stat changes, and substitutes. Uses Topsy-Turvy on switch-in.",
	},

	// SnorlaxTheRain
	"scraroom": {
		id: "scraroom",
		name: "Scraroom",
		desc: "Combination of Trick Room & Scrappy",
		shortDesc: "Trick Room + Scrappy",
		onStart: function (pokemon) {
			this.useMove("trickroom", pokemon);
		},
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity["Fighting"] = true;
				move.ignoreImmunity["Normal"] = true;
			}
		},
	},

	// Shivay
	"birdclaws": {
		id: "birdclaws",
		name: "Bird Claws",
		desc: "Tough Claws, and immune to Ground",
		//Tough Claws
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags["contact"]) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onTryHit: function (target, source, move) {
			if (move.type === "Ground" && !target.activeTurns) {
				this.add("-immune", target, "[msg]", "[from] ability: Bird Claws");
				return null;
			}
		},
	},

	// Back At My Day
	"cheapmove": {
		id: "cheapmove",
		name: "Cheap Move",
		desc: "Turns into Fairy/Ghost and uses Cheap Attack.",
		onStart: function (pokemon) {
			this.add("-start", pokemon, "typechange", "Fairy/Ghost");
			pokemon.types = ["Fairy", "Ghost"];
			//uses Cheap Attack
			this.useMove("cheapattack", pokemon);
		},
	},

	// Bouns
	"thisqueengotkicks": {
		id: "thisqueengotkicks",
		name: "This queen got kicks",
		desc: "Turns into Grass/Electric and has Queenly Majesty + Tough Claws.",
		onStart: function (pokemon) {
			this.add("-start", pokemon, "typechange", "Grass/Electric");
			pokemon.types = ["Grass", "Electric"];
		},
		// Queenly Majesty
		onFoeTryMove: function (target, source, effect) {
			if ((source.side === this.effectData.target.side || effect.id === "perishsong") && effect.priority > 0.1 && effect.target !== "foeSide") {
				this.attrLastMove("[still]");
				this.add("cant", this.effectData.target, "ability: This Queen Got Kicks", effect, "[of]" + target);
				return false;
			}
		},
		// Tough Claws
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags["contact"]) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
	},

	// Almighty Judgment
	"almightypresence": {
		desc: "Adaptability, changes type every turn, and Dazzling.",
		onModifyMove: function (move) {
			move.stab = 2;
		},
		onFoeTryMove: function (target, source, effect) {
			if ((source.side === this.effectData.target.side || effect.id === "perishsong") && effect.priority > 0.1 && effect.target !== "foeSide") {
				this.attrLastMove("[still]");
				this.add("cant", this.effectData.target, "ability: Almighty Presence", effect, "[of] " + target);
				return false;
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual: function (pokemon) {
			if (pokemon.activeTurns) {
				let r = this.random(17);
				if (r === 1) {
					this.add("-start", pokemon, "typechange", "Normal");
					pokemon.types = ["Normal"];
				} else if (r === 2) {
					this.add("-start", pokemon, "typechange", "Fighting");
					pokemon.types = ["Fighting"];
				} else if (r === 3) {
					this.add("-start", pokemon, "typechange", "Psychic");
					pokemon.types = ["Psychic"];
				} else if (r === 4) {
					this.add("-start", pokemon, "typechange", "Ice");
					pokemon.types = ["Ice"];
				} else if (r === 5) {
					this.add("-start", pokemon, "typechange", "Grass");
					pokemon.types = ["Grass"];
				} else if (r === 6) {
					this.add("-start", pokemon, "typechange", "Fairy");
					pokemon.types = ["Fairy"];
				} else if (r === 7) {
					this.add("-start", pokemon, "typechange", "Dark");
					pokemon.types = ["Dark"];
				} else if (r === 8) {
					this.add("-start", pokemon, "typechange", "Water");
					pokemon.types = ["Water"];
				} else if (r === 9) {
					this.add("-start", pokemon, "typechange", "Steel");
					pokemon.types = ["Steel"];
				} else if (r === 10) {
					this.add("-start", pokemon, "typechange", "Fire");
					pokemon.types = ["Fire"];
				} else if (r === 11) {
					this.add("-start", pokemon, "typechange", "Bug");
					pokemon.types = ["Bug"];
				} else if (r === 12) {
					this.add("-start", pokemon, "typechange", "Electric");
					pokemon.types = ["Electric"];
				} else if (r === 13) {
					this.add("-start", pokemon, "typechange", "Poison");
					pokemon.types = ["Poison"];
				} else if (r === 14) {
					this.add("-start", pokemon, "typechange", "Ghost");
					pokemon.types = ["Ghost"];
				} else if (r === 15) {
					this.add("-start", pokemon, "typechange", "Rock");
					pokemon.types = ["Rock"];
				} else if (r === 16) {
					this.add("-start", pokemon, "typechange", "Ground");
					pokemon.types = ["Ground"];
				} else if (r === 17) {
					this.add("-start", pokemon, "typechange", "Flying");
					pokemon.types = ["Flying"];
				} else {
					this.add("-start", pokemon, "typechange", "Dragon");
					pokemon.types = ["Dragon"];
				}
			}
		},
		id: "almightypresence",
		name: "Almighty Presence",
	},
};
