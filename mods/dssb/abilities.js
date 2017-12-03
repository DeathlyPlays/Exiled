'use strict';

exports.BattleAbilities = {
	//mewth
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
	//insist
	"cripplingdepression": {
		id: "cripplingdepression",
		name: "Crippling Depression",
		//primordialseas
		onStart: function (source) {
			this.setWeather('primordialsea');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'primordialsea' && !['desolateland', 'primordialsea', 'deltastream'].includes(weather.id)) return false;
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
		desc: "Primordial Sea, Rain Dish, and Swift Swim.",
	},
	//bamd
	"bulkymoxie": {
		id: "bulkymoxie",
		name: "Bulky Moxie",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk:1, def:1, spd:1}, source);
			}
		},
		desc: "This Pokemon's Attack, Defense and Special Defense is raised by 1 stage if it attacks and KOes another Pokemon.",
	},
};
