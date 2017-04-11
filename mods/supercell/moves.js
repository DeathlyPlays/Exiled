'use strict';

exports.BattleMovedex = {
	"battleram": {
		basePower: 120,
		//add Substitute
		self: {
			volatileStatus: 'Substitute',
		},
		accuracy: 100,
		priority: 0,
		pp: 10,
		//lock user into the move
		secondary: {
			self: {
				volatileStatus: 'lockedmove',
			},
		},
		category: "Physical",
		flags: {
			protect: 1,
			contact: 1,
		},
		target: "normal",
		type: "Normal",
	},
	"arrowsiege": {
		id: "arrowsiege",
		name: "Arrow Siege",
		basePower: 80,
		priority: 1,
		pp: 15,
		self: {
			boosts: {
				spa: 1,
				spe: 1,
			},
		},
		accuracy: true,
		secondary: false,
		category: "Special",
		flags: {
			protect: 1,
			distance: 1,
		},
		target: "any",
		type: "Normal",
	},
	"rebound": {
		id: "rebound",
		name: "Rebound",
		basePower: 90,
		drain: [1, 2],
		accuracy: 100,
		pp: 15,
		category: "Physical",
		flags: {
			protect: 1,
			contact: 1,
		},
		secondary: false,
		priority: 0,
		self: {
			//remove hazards on own side
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rebound', '[of] ' + pokemon);
				}
				let sideConditions = {
					spikes: 1,
					toxicspikes: 1,
					stealthrock: 1,
					stickyweb: 1,
				};
				for (let i in sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(i)) {
						this.add('-sideend', pokemon.side, this.getEffect(i).name, '[from] move: Rebound', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		target: "normal",
		type: "Fighting",
	},
	"fireball": {
		id: "fireball",
		name: "Fireball",
		basePower: 110,
		accuracy: 100,
		category: "Special",
		pp: 10,
		flags: {
			protect: 1,
			distance: 1,
		},
		//add Fire type effectiveness
		onEffectiveness: function (typeMod, type) {
			if (type === 'Fire') return 1;
		},
		secondary: {
			chance: 30,
			status: "brn",
		},
		priority: 0,
		target: "any",
		type: "Psychic",
	},
	"airstrike": {
		id: "airstrike",
		name: "Air Strike",
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		pp: 15,
		flags: {
			protect: 1,
		},
		self: {
			heal: [1, 2],
		},
		secondary: {
			self: {
				//remove hazards
				onHit: function (pokemon) {
					if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
						this.add('-end', pokemon, 'Leech Seed', '[from] move: Air Strike', '[of] ' + pokemon);
					}
					let sideConditions = {
						spikes: 1,
						toxicspikes: 1,
						stealthrock: 1,
						stickyweb: 1,
					};
					for (let i in sideConditions) {
						if (pokemon.hp && pokemon.side.removeSideCondition(i)) {
							this.add('-sideend', pokemon.side, this.getEffect(i).name, '[from] move: Air Strike', '[of] ' + pokemon);
						}
					}
					if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
						pokemon.removeVolatile('partiallytrapped');
					}
				},
			},
		},
		priority: 0,
		target: "normal",
		type: "Flying",
	},
	"evilbiding": {
		id: "evilbiding",
		name: "Evil Biding",
		basePower: 90,
		accuracy: 100,
		category: "Special",
		pp: 10,
		flags: {
			protect: 1,
		},
		secondary: false,
		self: {
			boosts: {
				spe: 1,
			},
		},
		priority: 0,
		target: "normal",
		type: "Dark",
	},
	"hammerslammer": {
		id: "hammerslammer",
		name: "Hammer Slammer",
		basePower: 130,
		drain: [1, 3],
		accuracy: 90,
		pp: 10,
		priority: 0,
		secondary: false,
		category: "Physical",
		flags: {
			protect: 1,
			contact: 1,
			distance: 1,
		},
		ignoreImmunity: true,
		target: "any",
		type: "Ground",
	},
	"raisethedead": {
		id: "raisethedead",
		name: "Raise the Dead",
		basePower: 120,
		accuracy: 90,
		pp: 10,
		priority: 0,
		category: "Special",
		flags: {
			protect: 1,
			distance: 1,
		},
		boosts: {
			def: -1,
			spd: -1,
			spe: -1,
		},
		volatileStatus: "partiallytrapped",
		secondaries: [{
			chance: 30,
			status: 'par',
		}, {
			chance: 30,
			volatileStatus: 'confusion',
		}],
		target: "any",
		type: "Ghost",
	},
	"combustion": {
		isNonstandard: true,
		accuracy: 100,
		category: "Special",
		id: "combustion",
		isViable: true,
		name: "Combustion",
		pp: 10,
		priority: 0,
		basePower: 110,
		self: {
			onHit: function (pokemon, target, move) {
				// substitute moves
				function setMove(oldMove, moveid) {
					let index = pokemon.moves.indexOf(oldMove);
					if (index === -1) return;
					let move = Tools.getMove(moveid);
					let sketchedMove = {
						move: move.name,
						id: move.id,
						pp: move.pp,
						maxpp: move.pp,
						target: move.target,
						disabled: false,
						used: false,
					};
					pokemon.moveset[index] = sketchedMove;
					pokemon.moves[index] = toId(move.name);
				}
				let subs = [
					["defog", "seedflare"],
					["oblivionwing", "hurricane"],
					["roost", "earthpower"],
				];
				if (pokemon.template.speciesid === 'lavahound' && pokemon.formeChange('Lava Pup')) {
					subs.forEach(s => setMove(s[0], s[1]));
					this.add('-formechange', pokemon, 'Lava Pup', '[msg]');
				} else if (pokemon.formeChange('Lava Pup')) {
					subs.forEach(s => setMove(s[1], s[0]));
					this.add('-formechange', pokemon, 'Lava Hound', '[msg]');
				}
				// make changing form available in consecutive turns
				delete pokemon.volatiles.stall;
			},
		},
		flags: {
			protect: 1,
			distance: 1,
			defrost: 1,
		},
		target: "any",
		type: "Fire",
	},
	"metallicsword": {
		id: "metallicsword",
		name: "Metallic Sword",
		basePower: 120,
		accuracy: 90,
		category: "Physical",
		pp: 10,
		priority: 0,
		drain: [1, 3],
		flags: {
			protect: 1,
			contact: 1,
		},
		secondary: false,
		target: "normal",
		type: "Steel",
	},
	"healspell": {
		id: "healspell",
		onHit: function (pokemon, source, move) {
			this.add('-activate', source, 'move: Heal Spell');
			let side = pokemon.side;
			for (let i = 0; i < side.pokemon.length; i++) {
				if (side.pokemon[i] !== source && ((side.pokemon[i].hasAbility('sapsipper')) ||
						(side.pokemon[i].volatiles['substitute'] && !move.infiltrates))) {
					continue;
				}
				side.pokemon[i].cureStatus();
			}
		},
		basePower: 0,
		accuracy: true,
		pp: 30,
		category: "Status",
		heal: [1, 1],
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Heal Spell', '[of] ' + pokemon);
				}
				let sideConditions = {
					spikes: 1,
					toxicspikes: 1,
					stealthrock: 1,
					stickyweb: 1,
				};
				for (let i in sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(i)) {
						this.add('-sideend', pokemon.side, this.getEffect(i).name, '[from] move: Heal Spell', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		secondary: false,
		priority: 1,
		flags: {
			snatch: 1,
			distance: 1,
		},
		target: "allyTeam",
		type: "Fairy",
	},
	"royalarrow": {
		id: "royalarrow",
		name: "Royal Arrow",
		isCrit: true,
		critRatio: 2,
		accuracy: 100,
		pp: 15,
		self: {
			boosts: {
				spe: 1,
			},
		},
		basePower: 100,
		priority: 0,
		secondary: false,
		category: "Special",
		flags: {
			protect: 1,
			distance: 1,
		},
		isNonstandard: true,
		target: "any",
		type: "Fairy",
	},
	"greed": {
		id: "greed",
		name: "Greed",
		basePower: 90,
		onHit: function (target, source) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			let yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (!source.setItem(yourItem)) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-item', source, yourItem, '[from] move: Greed', '[of] ' + target);
		},
		secondary: {
			self: {
				boosts: {
					atk: 3,
					spe: 3,
				},
			},
		},
		self: {
			volatileStatus: "confusion",
		},
		accuracy: 100,
		category: "Physical",
		pp: 10,
		flags: {
			protect: 1,
			distance: 1,
			contact: 1,
		},
		priority: 0,
		target: "any",
		type: "Bug",
	},
	"explode": {
		id: "explode",
		name: "Explode",
		selfdestruct: "always",
		breaksProtect: true,
		basePower: 0,
		ohko: true,
		accuracy: true,
		pp: 5,
		category: "Physical",
		secondary: false,
		flags: {
			distance: 1,
		},
		target: "allAdjacent",
		type: "Dark",
	},
	"tossspears": {
		id: "tossspears",
		name: "Toss Spears",
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		isViable: true,
		pp: 10,
		priority: 0,
		flags: {
			bullet: 1,
			protect: 1,
			mirror: 1,
		},
		multihit: [2, 5],
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Fighting",
	},
	"minerush": {
		id: "minerush",
		name: "Mine Rush",
		basePower: 130,
		accuracy: 100,
		recoil: [1, 3],
		self: {
			boosts: {
				atk: 1,
				def: 1,
			},
		},
		category: "Physical",
		pp: 10,
		priority: 1,
		onTry: function (attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				this.add('-anim', attacker, move.name, defender);
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		effect: {
			duration: 2,
			onImmunity: function (type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onAccuracy: function (accuracy, target, source, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude' || move.id === 'helpinghand') {
					return;
				}
				if (source.hasAbility('noguard') || target.hasAbility('noguard')) {
					return;
				}
				if (source.volatiles['lockon'] && target === source.volatiles['lockon'].source) return;
				return 0;
			},
			onSourceModifyDamage: function (damage, source, target, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude') {
					return this.chainModify(2);
				}
			},
		},
		flags: {
			protect: 1,
			mirror: 1,
			nonsky: 1,
			distance: 1,
		},
		target: "any",
		type: "Ground",
	},
	"lightningspell": {
		id: "lightningspell",
		name: "Lightning Spell",
		basePower: 150,
		accuracy: 90,
		pp: 5,
		category: "Special",
		flags: {
			mirror: 1,
			recharge: 1,
		},
		self: {
			volatileStatus: "mustrecharge",
		},
		breaksProtect: true,
		priority: -1,
		secondary: false,
		target: "normal",
		type: "Electric",
	},
	"freezespell": {
		id: "freezespell",
		name: "Freeze Spell",
		basePower: 60,
		accuracy: true,
		pp: 15,
		secondary: false,
		status: "frz",
		priority: 0,
		category: "Special",
		flags: {
			protect: 1,
			distance: 1,
			mirror: 1,
		},
		target: "any",
		type: "Ice",
	},
	"log": {
		id: "log",
		name: "Log",
		basePower: 130,
		accuracy: 100,
		category: "Physical",
		recoil: [1, 3],
		secondary: false,
		priority: 0,
		pp: 10,
		self: {
			volatileStatus: 'Substitute',
		},
		flags: {
			protect: 1,
			contact: 1,
			mirror: 1,
		},
		target: "normal",
		type: "Grass",
	},
	"zapspell": {
		id: "zapspell",
		name: "Zap Spell",
		basePower: 80,
		priority: 1,
		accuracy: true,
		status: "par",
		pp: 15,
		secondary: false,
		flags: {
			protect: 1,
			distance: 1,
		},
		target: "any",
		type: "Electric",
	},
	"boneslash": {
		id: "boneslash",
		name: "Bone Slash",
		accuracy: 100,
		pp: 15,
		volatileStatus: "curse",
		self: {
			boosts: {
				atk: 1,
				spe: 1,
			},
		},
		ignoreImmunity: true,
		basePower: 80,
		priority: 0,
		secondary: false,
		category: "Physical",
		flags: {
			protect: 1,
		},
		target: "normal",
		type: "Ghost",
	},
	"axemerang": {
		id: "axemerang",
		name: "Axemerang",
		basePower: 90,
		multihit: 2,
		pp: 15,
		ignoreImmunity: true,
		accuracy: 100,
		priority: 0,
		secondary: false,
		category: "Physical",
		flags: {
			protect: 1,
			mirror: 1,
		},
		target: "normal",
		type: "Dark",
	},
	"binaryfission": {
		id: "binaryfission",
		name: "Binary Fission",
		basePower: 150,
		accuracy: 80,
		pp: 10,
		priority: 0,
		secondary: false,
		category: "Physical",
		isNonstandard: true,
		flags: {
			protect: 1,
			mirror: 1,
			contact: 1,
			nonsky: 1,
		},
		self: {
			heal: [1, 2],
		},
		type: "Rock",
		target: "normal",
	},
	"infernoblitz": {
		id: "infernoblitz",
		name: "Inferno Blitz",
		basePower: 250,
		accuracy: 100,
		pp: 5,
		selfdestruct: "ifHit",
		category: "Special",
		secondary: {
			chance: 40,
			status: "brn",
		},
		flags: {
			protect: 1,
			mirror: 1,
			contact: 1,
			distance: 1,
			defrost: 1,
		},
		type: "Fire",
		target: "allPokemon",
	},
	"subzerofrostbite": {
		id: "subzerofrostbite",
		name: "Subzero Frostbite",
		basePower: 250,
		accuracy: 100,
		pp: 5,
		selfdestruct: "ifHit",
		category: "Special",
		secondary: {
			chance: 40,
			status: "frz",
		},
		flags: {
			protect: 1,
			mirror: 1,
			contact: 1,
			distance: 1,
		},
		type: "Ice",
		target: "allPokemon",
	},
	"shield": {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "shield",
		heal: [1, 4],
		stallingMove: true,
		volatileStatus: 'kingsshield',
		onTryHit: function (pokemon) {
			return !!this.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart: function (target) {
				this.add('-singleturn', target, 'Protect');
			},
			onSourcePrepareHit: function (source, target, effect) {
				if (effect.effectType !== 'Move' || !effect.flags['protect'] || effect.category === 'Status') return;
				if (effect.flags['contact']) {
					effect.ignoreImmunity = true;
				}
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (move.isZ) move.zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Protect');
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					this.boost({atk:-2}, source, target, this.getMove("King's Shield"));
				}
				return null;
			},
		},
		isViable: true,
		name: "Shield",
		pp: 10,
		priority: 4,
		flags: {},
		secondary: false,
		target: "self",
		type: "Steel",
	},
	"cannon": {
		id: "cannon",
		name: "Cannon",
		basePower: 120,
		accuracy: true,
		category: "Physical",
		defensiveCategory: "Special",
		volatileStatus: "partiallytrapped",
		pp: 15,
		secondary: false,
		priority: 0,
		flags: {
			protect: 1,
			distance: 1,
			mirror: 1,
		},
		type: "Fighting",
		target: "any",
	},
	"royaljoust": {
		id: "royaljoust",
		name: "Royal Joust",
		basePower: 120,
		accuracy: 95,
		pp: 10,
		category: "Physical",
		secondary: false,
		priority: 0,
		self: {
			boosts: {
				atk: 1,
				spe: 1,
			},
		},
		drain: [1, 2],
		flags: {
			protect: 1,
			distance: 1,
			mirror: 1,
			contact: 1,
		},
		type: "Normal",
		target: "any",
	},
	"breakthewall": {
		id: "breakthewall",
		name: "Break the Wall",
		selfdestruct: "always",
		accuracy: 100,
		priority: 3,
		flags: {
			protect: 1,
			contact: 1,
			distance: 1,
		},
		secondary: false,
		pp: 5,
		basePower: 250,
		ignoreImmunity: true,
		category: "Physical",
		target: "any",
		type: "Ghost",
	},
	"axehax": {
		id: "axehax",
		name: "Axe Hax",
		basePower: 110,
		accuracy: 100,
		pp: 15,
		priority: 0,
		flags: {
			protect: 1,
			contact: 1,
		},
		self: {
			boosts: {
				atk: 1,
			},
		},
		secondary: false,
		category: "Physical",
		drain: [1, 2],
		target: "allAdjacentFoes",
		ignoreImmunity: true,
		ignoreDefensive: true,
		ignoreAbility: true,
		type: "Fighting",
	},
	"tossbombs": {
		id: "tossbombs",
		name: "Toss Bombs",
		basePower: 120,
		onBasePowerPriority: 4,
		onBasePower: function (basePower, source, target, move) {
			let item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, source, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit: function (target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Toss Bombs', '[of] ' + source);
				}
			}
		},
		accuracy: true,
		pp: 15,
		boosts: {
			def: 1,
		},
		flags: {
			protect: 1,
			distance: 1,
		},
		priority: 0,
		secondary: false,
		category: "Special",
		target: "allAdjacentFoes",
		type: "Dark",
	},
	"strike": {
		id: "strike",
		name: "STRIKE",
		basePower: 115,
		accuracy: 95,
		pp: 15,
		secondary: false,
		priority: 0,
		flags: {
			protect: 1,
		},
		foeSide: {
			sideCondition: 'stealthrock',
			effect: {
				// this is a side condition
				onStart: function (side) {
					this.add('-sidestart', side, 'move: Stealth Rock');
				},
				onSwitchIn: function (pokemon) {
					let typeMod = this.clampIntRange(pokemon.runEffectiveness('Rock'), -6, 6);
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
				},
			},
		},
		drain: [1, 2],
		category: "Special",
		target: "allAdjacentFoes",
		type: "Rock",
	},
};
