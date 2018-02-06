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
};
