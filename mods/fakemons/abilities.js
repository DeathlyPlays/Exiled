'use strict';

exports.BattleAbilities = {
	"midlifecrisis": {
		id: "midlifecrisis",
		name: "Midlife Crisis",
		desc: "Boosts power of moves that faLint the target by 1.3x (i.e. Self-Destruct, Explosion, Memento, etc.), and activates Midlife Crisis.",
		shortDesc: "Boosts the power of moves that faint the target by 1.3x.",
		rating: 4.5,
		num: 9001,
		onStart: function (source, effect) {
			this.addPseudoWeather('midlifecrisis', source, effect, '[of] ' + source);
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.selfdestruct) {
				this.debug('Midlife Crisis boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
	},
	"rust": {
		id: "rust",
		name: "Rust",
		desc: "Powers up steel moves by 1.2, and lowers Electric moves that attack user by 0.75x",
		shortDesc: "Powers up steel moves by 1.2 but takes 2x damage from Water type attacks.",
		rating: 3.5,
		num: 9002,
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Rust boost');
				return this.chainModify(1.2);
			}
		},
		onBasePowerPriority: 7,
		onFoeBasePower: function (basePower, attacker, defender, move) {
			if (this.effectData.target !== defender) return;
			if (move.type === 'Electric') {
				return this.chainModify(0.75);
			}
		},
	},
	"vengeful": {
		id: "vengeful",
		name: "Vengeful",
		desc: "User is taken down the opponent, if its OK'ed by the opponent.",
		rating: 4.5,
		num: 9003,
		onAfterDamageOrder: 1,
		onAfterDamage: function (damage, target, source) {
			if (source && source !== target && !target.hp) {
				this.damage(source.maxhp / 1, source, target);
			}
		},
	},
	"hatred": {
		id: "hatred",
		name: "Hatred",
		desc: "User gains a 1.5 boost in all stats, if its hit with a super effective move.",
		num: 9004,
		rating: 3,
		onHit: function (target, source, move) {
			if (target.hp && move.category !== 'Status' && !move.damage && !move.damageCallback && move.typeMod > 0 && target.useItem()) {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1});
			}
		},
	},
};
