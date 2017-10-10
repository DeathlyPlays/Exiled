'use strict';

exports.BattleStatuses = {
	oblivion: {
		effectType: 'Status',
		onStart: function (target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'oblivionorb') {
				this.add('-status', target, 'oblivion', '[from] item: Oblivion Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'oblivion', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'oblivion');
			}
		},
		// Damage reduction is handled directly in the battle-engine.js damage function
		onResidualOrder: 9,
		onResidual: function (pokemon) {
			this.damage(pokemon.maxhp / 16);
		},
	},
	//Gen NEXT
	unown: {
		// Unown: Shadow Tag
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'shadowtag';
				pokemon.baseAbility = 'shadowtag';
			}
			if (pokemon.transformed) return;
			pokemon.setType(pokemon.hpType || 'Dark');
		},
	},
	bronzong: {
		// Bronzong: Heatproof
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'heatproof';
				pokemon.baseAbility = 'heatproof';
			}
		},
	},
	weezing: {
		// Weezing: Aftermath
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'aftermath';
				pokemon.baseAbility = 'aftermath';
			}
		},
	},
	flygon: {
		// Flygon: Compoundeyes
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'compoundeyes';
				pokemon.baseAbility = 'compoundeyes';
			}
		},
	},
	eelektross: {
		// Eelektross: Poison Heal
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'poisonheal';
				pokemon.baseAbility = 'poisonheal';
			}
		},
	},
	claydol: {
		// Claydol: Filter
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'filter';
				pokemon.baseAbility = 'filter';
			}
		},
	},
	gengar: {
		// Gengar: Cursed Body
		onImmunity: function (type, pokemon) {
			if (pokemon.template.id !== 'gengarmega' && type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'cursedbody';
				pokemon.baseAbility = 'cursedbody';
			}
		},
	},
	mismagius: {
		// Mismagius: Cursed Body
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'cursedbody';
				pokemon.baseAbility = 'cursedbody';
			}
		},
	},
	mesprit: {
		// Mesprit: Serene Grace
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'serenegrace';
				pokemon.baseAbility = 'serenegrace';
			}
		},
	},
	uxie: {
		// Uxie: Synchronize
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'synchronize';
				pokemon.baseAbility = 'synchronize';
			}
		},
	},
	azelf: {
		// Azelf: Steadfast
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'steadfast';
				pokemon.baseAbility = 'steadfast';
			}
		},
	},
	hydreigon: {
		// Hydreigon: Sheer Force
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'sheerforce';
				pokemon.baseAbility = 'sheerforce';
			}
		},
	},
	rotom: {
		// All Rotoms: Trace
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'trace';
				pokemon.baseAbility = 'trace';
			}
		},
	},
	rotomheat: {
		// All Rotoms: Trace
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'trace';
				pokemon.baseAbility = 'trace';
			}
		},
	},
	rotomwash: {
		// All Rotoms: Trace
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'trace';
				pokemon.baseAbility = 'trace';
			}
		},
	},
	rotomfan: {
		// All Rotoms: Trace
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'trace';
				pokemon.baseAbility = 'trace';
			}
		},
	},
	rotomfrost: {
		// All Rotoms: Trace
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'trace';
				pokemon.baseAbility = 'trace';
			}
		},
	},
	rotommow: {
		// All Rotoms: Trace
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'trace';
				pokemon.baseAbility = 'trace';
			}
		},
	},
	cryogonal: {
		// Cryogonal: infinite hail, Ice Body
		onModifyMove: function (move) {
			if (move.id === 'hail') {
				let weather = move.weather;
				move.weather = null;
				move.onHit = function (target, source) {
					this.setWeather(weather, source, this.getAbility('snowwarning'));
					this.weatherData.duration = 0;
				};
				move.target = 'self';
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'Ground' && (!this.suppressingAttackEvents() || this.activePokemon === pokemon)) return false;
		},
		onStart: function (pokemon) {
			if (pokemon.ability === 'levitate') {
				pokemon.ability = 'icebody';
				pokemon.baseAbility = 'icebody';
			}
		},
	},
	probopass: {
		// Probopass: infinite sand
		onModifyMove: function (move) {
			if (move.id === 'sandstorm') {
				let weather = move.weather;
				move.weather = null;
				move.onHit = function (target, source) {
					this.setWeather(weather, source, this.getAbility('sandstream'));
					this.weatherData.duration = 0;
				};
				move.target = 'self';
			}
		},
	},
	phione: {
		// Phione: infinite rain
		onModifyMove: function (move) {
			if (move.id === 'raindance') {
				let weather = move.weather;
				move.weather = null;
				move.onHit = function (target, source) {
					this.setWeather(weather, source, this.getAbility('drizzle'));
					this.weatherData.duration = 0;
				};
				move.target = 'self';
			}
		},
	},
};
