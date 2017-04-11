'use strict';

exports.BattleMovedex = {
	"metronome": {
		num: 118,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "A random move is selected for use, other than After You, Assist, Belch, Bestow, Celebrate, Chatter, Copycat, Counter, Covet, Crafty Shield, Destiny Bond, Detect, Diamond Storm, Endure, Feint, Focus Punch, Follow Me, Freeze Shock, Happy Hour, Helping Hand, Hold Hands, Hyperspace Hole, Ice Burn, King's Shield, Light of Ruin, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Protect, Quash, Quick Guard, Rage Powder, Relic Song, Secret Sword, Sketch, Sleep Talk, Snarl, Snatch, Snore, Spiky Shield, Steam Eruption, Struggle, Switcheroo, Techno Blast, Thief, Thousand Arrows, Thousand Waves, Transform, Trick, V-create, or Wide Guard.",
		shortDesc: "Picks a random move.",
		id: "metronome",
		name: "Metronome",
		pp: 10,
		priority: 0,
		flags: {},
		onHit: function (target) {
			let moves = [];
			for (let i in exports.BattleMovedex) {
				let move = exports.BattleMovedex[i];
				if (i !== move.id) continue;
				if (move.isNonstandard) continue;
				let noMetronome = {
					afteryou: 1,
					assist: 1,
					belch: 1,
					bestow: 1,
					celebrate: 1,
					chatter: 1,
					circlethrow: 1,
					copycat: 1,
					counter: 1,
					covet: 1,
					craftyshield: 1,
					detect: 1,
					dragontail: 1,
					endure: 1,
					feint: 1,
					focuspunch: 1,
					followme: 1,
					happyhour: 1,
					helpinghand: 1,
					holdhands: 1,
					kingsshield: 1,
					matblock: 1,
					mefirst: 1,
					metronome: 1,
					mimic: 1,
					mirrorcoat: 1,
					mirrormove: 1,
					naturepower: 1,
					protect: 1,
					quash: 1,
					quickguard: 1,
					ragepowder: 1,
					sketch: 1,
					sleeptalk: 1,
					snarl: 1,
					snatch: 1,
					snore: 1,
					spikyshield: 1,
					struggle: 1,
					switcheroo: 1,
					thief: 1,
					trick: 1,
					voltswitch: 1,
					whirlwind: 1,
					wideguard: 1,
				};
				if (!noMetronome[move.id]) {
					moves.push(move);
				}
			}
			let randomMove = '';
			if (moves.length) {
				moves.sort((a, b) => a.num - b.num);
				randomMove = moves[this.random(moves.length)].id;
			}
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, target);
		},
		secondary: false,
		target: "self",
		type: "Normal",
		contestType: "Cute",
	},
};
