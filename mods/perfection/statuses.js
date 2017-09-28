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
};