'use strict';

exports.BattleItems = {
	"cosmicmemory": {
		id: "cosmicmemory",
		name: "Cosmic Memory",
		spritenum: 680,
		onMemory: 'Cosmic',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Cosmic",
		num: 1,
		gen: -100,
		desc: "Holder's Multi-Attack is Cosmic type.",
	},
	"cosmiumz": {
		id: "cosmiumz",
		name: "Cosmium Z",
		spritenum: 641,
		onPlate: 'Cosmic',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Cosmic",
		forcedForme: "Arceus-Cosmic",
		num: 2,
		gen: -100,
		desc: "If holder has a Cosmic move, this item allows it to use a Cosmic Z-Move.",
	},
	"spacialplate": {
		id: "spacialplate",
		name: "Spacial Plate",
		spritenum: 291,
		onPlate: 'Cosmic',
		onBasePowerPriority: 6,
		onBasePower: function (basePower, user, target, move) {
			if (move && move.type === 'Cosmic') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 493) || pokemon.baseTemplate.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Cosmic",
		num: 3,
		gen: -100,
		desc: "Holder's Cosmic-type attacks have 1.2x power. Judgment is Cosmic type.",
	},
	"oblivionorb": {
		id: "oblivionorb",
		name: "Oblivion Orb",
		spritenum: 145,
		fling: {
			basePower: 30,
			status: 'oblivion',
		},
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			pokemon.trySetStatus('oblivion');
		},
		num: 273,
		gen: 4,
		desc: "At the end of every turn, this item attempts to inflict Oblivion onto the holder.",
	},
	//GEN Next Concept
	"zoomlens": {
		inherit: true,
		onSourceModifyAccuracy: function (accuracy, target) {
			if (typeof accuracy === 'number' && !this.willMove(target)) {
				this.debug('Zoom Lens boosting accuracy');
				return accuracy * 1.6;
			}
		},
		desc: "The accuracy of attacks by the holder is 1.6x if it moves after its target.",
	},
	"bigroot": {
		inherit: true,
		onAfterMoveSecondarySelf: function (source, target) {
			if (source.hasType('Grass')) {
				this.heal(source.lastDamage / 8, source);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			if (pokemon.hasType('Grass')) {
				this.heal(pokemon.maxhp / 16);
			}
		},
		desc: "Holder gains 1.3x HP from draining/Aqua Ring/Ingrain/Leech Seed/Strength Sap; If the user is a Grass type, the holder heals 1/16 of its max HP every turn, and for every damaging move the holder uses 1/8th of the damage dealt is restored.",
		shortDesc: "Holder gains 1.3x from most healing moves; if the user is a Grass type, Leftovers & Shell Bell effects occur.",
	},
	"wiseglasses": {
		inherit: true,
		onBasePower: function (basePower, user, target, move) {
			if (move.category === 'Special') {
				let types = user.getTypes();
				if (types.length === 1 && types[0] === 'Psychic') {
					return basePower * 1.2;
				}
				return basePower * 1.1;
			}
		},
		desc: "Holder's special attacks have 1.1x power. Pure Psychic types special attacks have 1.2x power.",
		shortDesc: "Holder's SpA have 1.1x power. Pure Psychic types SpA have 1.2x power.",
	},
	"muscleband": {
		inherit: true,
		onBasePower: function (basePower, user, target, move) {
			if (move.category === 'Physical') {
				let types = user.getTypes();
				if (types.length === 1 && types[0] === 'Fighting') {
					return basePower * 1.2;
				}
				return basePower * 1.1;
			}
		},
		desc: "Holder's physical attacks have 1.1x power. Pure Fighting types physical attacks have 1.2x power.",
		shortDesc: "Holder's Atk have 1.1x power. Pure Fighting types Atk have 1.2x power.",
	},
};
