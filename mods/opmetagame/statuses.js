	/* * * * * * * *
	 *	Exiled     *
	 *	Custom     *
	 *  Statuses   *
	 *	by         *
	 *	Deathly    *
	 * * * * * * * */



	'use strict';

	exports.BattleStatuses = {

	    trickroom: {
	        effectType: 'PseudoWeather',
	        duration: 5,
	        durationCallback: function(source, effect) {
	            if (source && source.hasItem('trickyrock')) {
	                return 8;
	            }
	            if (source && source.hasAbility('persistent')) {
	                return 7;
	            }
	            return 5;
	        },
	        onStart: function(target, source) {
	            this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
	        },
	        // Speed modification is changed in BattlePokemon.getDecisionSpeed() in battle-engine.js
	        onResidualOrder: 23,
	        onEnd: function() {
	            this.add('-fieldend', 'move: Trick Room');
	        },
	    },
	    onHitField: function(target, source, effect) {
	        if (this.pseudoWeather['trickroom']) {
	            this.removePseudoWeather('trickroom', source, effect, '[of] ' + source);
	        }
	        else {
	            this.addPseudoWeather('trickroom', source, effect, '[of] ' + source);
	        }
	    },
	};
	
