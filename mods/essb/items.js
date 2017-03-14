'use strict';

exports.BattleItems = {
    "playniumz": {
        spritenum: 656,
		onTakeItem: false,
		id: "playniumz",
		name: "Playnium Z",
		zMove: "Exiled From All Others",
		zMoveFrom: "Aqua Subscribe",
		zMoveUser: ["Ludicolo"],
		num: -1,
		gen: -1,
		desc: "If holder is a Ludicolo with Aqua Subscribe, it can use Exiled From All Others.",
    },
    "flarez": {
        spritenum: 656,
        onTakeItem: false,
        zMove: "Teraflare",
        zMoveFrom: "Megaflare",
        name: "Flare Z",
        id: "flarez",
        zMoveUser: ["Groudon-Primal"],
        num: -2,
        gen: -1,
        desc: "If holder is a Groudon-Primal with Megaflare, it can use Teraflare.",
    },
    "thekidz": {
        spritenum: 656,
        onTakeItem: false,
        zMove: "Accept The Memes",
        zMoveFrom: "Attitude Adjustment",
        name: "thekidz",
        id: "thekidz",
        zMoveUser: ["Mewtwo"],
        num: -3,
        gen: -1,
        desc: "If holder is Mewtwo with Attitude Adjustment, it can use Accept The Memes.",
    },
    "relicofchoiceness": {
		id: "relicofchoiceness",
		name: "Relic of Choiceness",
		spritenum: 69,
		fling: {
			basePower: 10,
		},
		onStart: function (pokemon) {
			if (pokemon.volatiles['choicelock']) {
				this.debug('removing choicelock: ' + pokemon.volatiles.choicelock);
			}
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove: function (move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifySpe: function (spe) {
			return this.chainModify(1.5);
		},
		onModifySpAPriority: 1,
		onModifySpA: function (spa) {
			return this.chainModify(1.5);
		},
		isChoice: true,
		num: -4,
		gen: -1,
		desc: "Holder's Speed & Special Attack is 1.5x, but it can only select the first move it executes.",
	},
};