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
};