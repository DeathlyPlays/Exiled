r i in boost) {
				boost[i] *= 2;
			}
		},
		id: "gdaygday",
		name: "gday gday",
	},
	//deathlyplays
	"turbo": {
		id: "turbo",
		name: "Turbo",
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
		//no guard
		onAnyAccuracy: function (accuracy, target, source, move) {
			if (move && (source === this.effectData.target || target === this.effectData.target)) {
				return true;
			}
			return accuracy;
		},
		//sheer force
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
	//snobalt
	"amityabsorb": {
		id: "amityabsorb",
		name: "Amity Absorb",
		onTryHit: 
