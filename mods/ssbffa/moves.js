"use strict";

exports.BattleMovedex = {
	//DEFAULT CUSTOM MOVES
	//Normal
	stretch: {
		category: "Status",
		accuracy: 100,
		id: "stretch",
		name: "Stretch",
		isNonstandard: true,
		flags: {
			snatch: 1,
			mirror: 1,
		},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wrap", source);
		},
		pp: 10,
		self: {
			boosts: {
				atk: 1,
				spa: 1,
				spe: 1,
			},
		},
		target: "Self",
		type: "Normal",
	},
	//Fire
	flametower: {
		category: "Special",
		accuracy: 100,
		basePower: 80,
		id: "flametower",
		name: "Flame Tower",
		isNonstandard: true,
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fire Spin", target);
		},
		pp: 15,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
		},
		volatileStatus: 'partiallytrapped',
		secondary: {
			chance: 50,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
	//Water
	rainspear: {
		category: "Special",
		accuracy: 100,
		basePower: 70,
		id: "rainspear",
		name: "Rain Spear",
		isNonstandard: true,
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icicle Spear", target);
		},
		pp: 15,
		priority: 1,
		flags: {
			protect: 1,
			mirror: 1,
		},
		weather: 'raindance',
		secondary: {
			chance: 20,
			volatileStatus: 'Flinch',
		},
		target: "normal",
		type: "Water",
	},
	//Grass
	healingherbs: {
		category: "Status",
		accuracy: 100,
		id: "healingherbs",
		name: "Healing Herbs",
		isNonstandard: true,
		flags: {
			mirror: 1,
			snatch: 1,
		},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Recover", source);
		},
		onHit: function (target, pokemon, move) {
			this.useMove('Aromatherapy', pokemon);
		},
		self: {
			heal: [1, 2],
		},
		pp: 5,
		priority: 0,
		target: "Self",
		type: "Grass",
	},
	//Electric
	electrodrive: {
		category: "Special",
		accuracy: 100,
		basePower: 0,
		id: "electrodrive",
		name: "Electro Drive",
		isNonstandard: true,
		basePowerCallback: function (pokemon, target) {
			let ratio = (pokemon.getStat('spe') / target.getStat('spe'));
			this.debug([40, 60, 80, 120, 150][(Math.floor(ratio) > 4 ? 4 : Math.floor(ratio))] + ' bp');
			if (ratio >= 4) {
				return 150;
			}
			if (ratio >= 3) {
				return 120;
			}
			if (ratio >= 2) {
				return 80;
			}
			if (ratio >= 1) {
				return 60;
			}
			return 40;
		},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Electro Ball", target);
		},
		flags: {
			bullet: 1,
			protect: 1,
			mirror: 1,
		},
		self: {
			boosts: {
				spe: 1,
			},
		},
		pp: 10,
		priority: 0,
		target: "normal",
		type: "Electric",
	},
	//Ice
	hailstorm: {
		category: "Status",
		accuracy: 100,
		id: "hailstorm",
		name: "Hailstorm",
		isNonstandard: true,
		flags: {
			protect: 1,
		},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blizzard", source);
		},
		onHit: function (target, pokemon, move) {
			this.useMove('Blizzard', pokemon);
		},
		pp: 10,
		weather: 'hail',
		priority: 0,
		target: "normal",
		type: "Ice",
	},
	//Fighting
	beatdown: {
		category: "Physical",
		basePower: 200,
		accuracy: 80,
		id: "beatdown",
		name: "Beat Down",
		isNonstandard: true,
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dynamic Punch", target);
		},
		flags: {
			recharge: 1,
			protect: 1,
			mirror: 1,
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: {
			chance: 50,
			status: 'par',
		},
		pp: 5,
		priority: -1,
		target: "normal",
		type: "Fighting",
	},
	//Poison
	nuclearwaste: {
		category: "Status",
		accuracy: 95,
		id: "nuclearwaste",
		name: "Nuclear Waste",
		isNonstandard: true,
		flags: {
			protect: true,
			reflectable: true,
		},
		status: 'tox',
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Toxic", target);
			this.add('-anim', target, "Fire Blast", target);
		},
		boosts: {
			atk: -1,
		},
		pp: 20,
		priority: 0,
		target: "normal",
		type: "Poison",
	},
	//Ground
	terratremor: {
		category: "Physical",
		accuracy: 75,
		basePower: 140,
		id: "terratremor",
		name: "Terratremor",
		isNonstandard: true,
		flags: {
			protect: true,
		},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Precipice Blades", target);
		},
		pp: 5,
		priority: 0,
		secondary: {
			chance: 15,
			volatileStatus: 'Flinch',
		},
		target: "normal",
		type: "Ground",
	},
	//Flying
	ventilation: {
		category: "Status",
		accuracy: 100,
		id: "ventilation",
		name: "Ventilation",
		isNonstandard: true,
		flags: {
			protect: 1,
			reflectable: 1,
			mirror: 1,
			authentic: 1,
		},
		priority: 0,
		pp: 15,
		onHit: function (target, source, move) {
			if (!target.volatiles['substitute'] || move.infiltrates) {
				this.boost({
					evasion: -1,
				});
				let removeTarget = {
					reflect: 1,
					lightscreen: 1,
					safeguard: 1,
					mist: 1,
				};
				let removeAll = {
					spikes: 1,
					toxicspikes: 1,
					stealthrock: 1,
					stickyweb: 1,
				};
				for (let targetCondition in removeTarget) {
					if (target.side.removeSideCondition(targetCondition)) {
						if (!removeAll[targetCondition]) continue;
						this.add('-sideend', target.side, this.getEffect(targetCondition).name, '[from] move: Ventilation', '[of] ' + target);
					}
				}
				for (let sideCondition in removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Ventilation', '[of] ' + source);
					}
				}
				this.clearWeather();
			}
		},
		target: "normal",
		type: "Flying",
	},
	//Psychic
	psychicshield: {
		category: "Status",
		accuracy: 100,
		id: "psychicshield",
		name: "Psychic Shield",
		isNonstandard: true,
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Protect", source);
		},
		onHit: function (target, pokemon, move) {
			this.useMove('Light Screen', pokemon);
			this.useMove('Reflect', pokemon);
		},
		pp: 5,
		target: "Self",
		type: "Psychic",
	},
	//Bug
	swarmcharge: {
		category: "Physical",
		basePower: 100,
		accuracy: 90,
		id: "swarmcharge",
		name: "Swarm Charge",
		isNonstandard: true,
		flags: {
			protect: 1,
			mirror: 1,
		},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Attack Order", target);
		},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
					spe: 1,
				},
			},
		},
		pp: 10,
		target: "normal",
		type: "Bug",
	},
	//Rock
	rockcannon: {
		category: "Special",
		basePower: 110,
		accuracy: 100,
		id: "rockcannon",
		name: "Rock Cannon",
		isNonstandard: true,
		flags: {
			protect: 1,
			mirror: 1,
		},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Gem", target);
		},
		secondary: {
			chance: 30,
			volatileStatus: 'Flinch',
		},
		pp: 10,
		priority: 0,
		target: "normal",
		type: "Rock",
	},
	//Ghost
	spook: {
		category: "Special",
		basePower: 80,
		accuracy: 100,
		id: "spook",
		name: "Spook",
		isNonstandard: true,
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Trick-or-Treat", source);
		},
		flags: {
			protect: 1,
			mirror: 1,
		},
		willCrit: true,
		secondary: {
			chance: 30,
			volatileStatus: 'Flinch',
		},
		pp: 10,
		priority: 0,
		target: "normal",
		type: "Ghost",
	},
	//Dragon
	imperialrampage: {
		category: "Physical",
		basePower: 175,
		accuracy: 100,
		id: "imperialrampage",
		name: "Imperial Rampage",
		isNonstandard: true,
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage", target);
		},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove: function (pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
				this.boost({
					atk: -2,
				});
			}
		},
		pp: 10,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
		},
		priority: 0,
		target: "normal",
		type: "Dragon",
	},
	//Dark
	shadowrun: {
		category: "Physical",
		basePower: 100,
		accuracy: 95,
		id: "shadowrun",
		name: "Shadow Run",
		isNonstandard: true,
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Sneak", target);
			this.add('-anim', target, "Knock Off", target);
		},
		onAfterHit: function (target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Shadow Run', '[of] ' + source);
				}
			}
		},
		pp: 10,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
		},
		priority: 1,
		target: "normal",
		type: "Dark",
	},
	//Steel
	magnorang: {
		category: "Physical",
		accuracy: 90,
		basePower: 120,
		id: "magnorang",
		name: "Magnorang",
		isNonstandard: true,
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magnet Bomb", target);
		},
		onHit: function (target, source, move) {
			if (target.types.indexOf('Steel') > -1) {
				if (!target.addVolatile('trapped', source, move, 'trapper')) {
					this.add('-fail', target);
				}
			}
		},
		pp: 10,
		flags: {
			protect: 1,
			mirror: 1,
		},
		target: "normal",
		type: "Steel",
	},
	//Fairy
	majesticdust: {
		category: "Special",
		accuracy: 100,
		basePower: 120,
		id: "majesticdust",
		name: "Majestic Dust",
		isNonstandard: true,
		flags: {
			protect: true,
			powder: true,
		},
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Powder", target);
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		pp: 10,
		target: "normal",
		type: "Fairy",
	},
};