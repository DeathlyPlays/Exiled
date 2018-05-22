"use strict";

exports.BattleItems = {
	"playniumz": {
		spritenum: 656,
		onTakeItem: false,
		id: "playniumz",
		name: "Playnium Z",
		zMove: "EXTREME SUPER MEGA ULTIMATE ALPHA GIGA SUPREME FANTASTIC EXTRA PREFIX COMBO BREAKER",
		zMoveFrom: "npm test",
		zMoveUser: ["Ludicolo"],
		num: -1,
		gen: -1,
		desc: "If holder is a Ludicolo with npm test, it can use EXTREME SUPER MEGA ULTIMATE ALPHA GIGA SUPREME FANTASTIC EXTRA PREFIX COMBO BREAKER.",
	},

	"legsiumz": {
		spritenum: 634,
		onTakeItem: false,
		id: "legsiumz",
		name: "LEGSium Z",
		zMove: "ALIVE AND KICKING",
		zMoveFrom: "Storm Kick",
		zMoveUser: ["Tsareena"],
		num: -3,
		gen: -1,
		desc: "If holder is a Tsareena with Storm Kick, it can use ALIVE AND KICKING.",
	},

	"rainbowplate": {
		id: "rainbowplate",
		name: "Rainbow Plate",
		spritenum: 572,
		onBasePowerPriority: 6,
		onBasePower: function (basePower, user, target, move) {
			if (move && move.stab || move.type === '???') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			this.heal(pokemon.maxhp / 8);
		},
		onTakeItem: false,
		num: -12,
		gen: -1,
		desc: "Every turn, the user's HP restores 1/8 of their max HP. STAB moves get boosted by 1.3x. This item can not be knocked off.",
	},

	"healthorb": {
		id: "healthorb",
		name: "Health Orb",
		spritenum: 249,
		fling: {
			basePower: 30,
		},
		onModifyDamage: function (damage, source, target, move) {
			return this.chainModify([0x14CC, 0x1000]);
		},
		onAfterMoveSecondarySelf: function (source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !move.ohko) {
				this.damage(source.maxhp / 32, source, source, this.getItem('healthorb'));
			}
		},
		num: -17,
		gen: -1,
		desc: "Holder's attacks do 1.3x damage, and it loses 1/32 its max HP after the attack.",
	},
};
