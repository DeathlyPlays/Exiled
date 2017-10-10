'use strict';

exports.BattleMovedex = {
	"cosmicpower": {
		inherit: true,
		type: "Cosmic",
	},
	"meteormash": {
		inherit: true,
		type: "Cosmic",
	},
	"cometpunch": {
		inherit: true,
		accuracy: true,
		priority: 1,
		type: "Cosmic",
	},
	"healingwish": {
		inherit: true,
		type: "Cosmic",
	},
	"wish": {
		inherit: true,
		type: "Cosmic",
	},
	"magicalpunch": {
		num: -9000,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "magicalpunch",
		name: "Magical Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: [2, 5],
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power-Up Punch", target);
		},
		secondary: false,
		target: "normal",
		type: "Fairy",
		zMovePower: 100,
		contestType: "Beautiful",
	},
	"pitfall": {
		num: -9001,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target.",
		shortDesc: "30% chance to flinch the target.",
		id: "pitfall",
		isViable: true,
		name: "Pitfall",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dig", target);
		},
		target: "any",
		type: "Ground",
		zMovePower: 160,
		contestType: "Tough",
	},
	"ultimatesupernova": {
		num: -9004,
		accuracy: true,
		basePower: 1,
		category: "Physical",
		shortDesc: "Power is equal to the base move's Z-Power.",
		id: "ultimatesupernova",
		isViable: true,
		name: "Ultimate Supernova",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Cosmic Power", target);
			this.add('-anim', source, "Giga Impact", target);
			this.add('-anim', target, "Explosion", source);
		},
		isZ: "cosmiumz",
		secondary: false,
		target: "normal",
		type: "Cosmic",
		contestType: "Clever",
	},
	"prismaticlaser": {
		inherit: true,
		type: "Cosmic",
		contestType: "Clever",
	},
	"steampunkslam": {
		num: -9002,
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		desc: "Has a 20% chance to raise the user's Attack by 1 stage.",
		shortDesc: "20% chance to raise the user's Attack by 1.",
		id: "steampunkslam",
		isViable: true,
		name: "Steampunk Slam",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shift Gear", target);
			this.add('-anim', source, "Heavy Slam", target);
		},
		target: "normal",
		type: "Steel",
		zMovePower: 175,
		contestType: "Cool",
	},
	"blindingbeam": {
		num: -9003,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Has a 30% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "30% chance to lower the target's accuracy by 1.",
		id: "blindingbeam",
		isViable: true,
		name: "Blinding Beam",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Light of Ruin", target);
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 175,
		contestType: "Beautiful",
	},
	"spacialstrike": {
		num: -9004,
		accuracy: true,
		basePower: 90,
		category: "Special",
		desc: "Has a 30% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "30% chance to lower the target's SpD by 1.",
		id: "spacialstrike",
		isViable: true,
		name: "Spacial Strike",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		secondary: {
			chance: 50,
			boosts: {
				spd: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Strike", target);
		},
		target: "normal",
		type: "Cosmic",
		zMovePower: 175,
		contestType: "Beautiful",
	},
	"cosmickick": {
		num: -9005,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		desc: "If this attack is not successful, the user loses a quarter of its maximum HP, rounded down, as crash damage. Pokemon with the Ability Magic Guard are unaffected by crash damage.",
		shortDesc: "User is hurt by 25% of its max HP if it misses.",
		id: "cosmickick",
		isViable: true,
		name: "Cosmic Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, gravity: 1},
		hasCustomRecoil: true,
		onMoveFail: function (source) {
			this.damage(source.maxhp / 2, source, source, 'cosmickick');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "High Jump Kick", target);
			this.add('-anim', source, "Rollout", target);
			this.add('-anim', source, "Low Kick", target);
		},
		secondary: false,
		target: "normal",
		type: "Cosmic",
		zMovePower: 180,
		contestType: "Cool",
	},
	"nebulablast": {
		num: -9006,
		basePower: 150,
		category: "Special",
		accuracy: 100,
		secondary: {
			self: {
				boosts: {
					spa: -2,
				},
			},
		},
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Techno Blast", target);
		},
		isViable: true,
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		type: "Cosmic",
		zMovePower: 200,
		contestType: "Cool",
	},
	"supernovaslash": {
		num: -9007,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		id: "supernovaslash",
		isViable: true,
		name: "Supernova Slash",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Energy", target);
			this.add('-anim', source, "Night Slash", target);
		},
		secondary: false,
		target: "normal",
		type: "Cosmic",
		zMovePower: 140,
		contestType: "Cool",
	},
	"eclipseforce": {
		num: -9008,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "If this move is successful, it breaks through the target's Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks. If the user is holding a Power Herb, the move completes in one turn. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "Disappears turn 1. Hits turn 2. Breaks protection.",
		id: "eclipseforce",
		isViable: true,
		name: "Eclipse Force",
		pp: 5,
		priority: 0,
		flags: {contact: 1, charge: 1, mirror: 1},
		breaksProtect: true,
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
			onAccuracy: function (target, source, move) {
				if (move.id === 'helpinghand') {
					return;
				}
				if (source.hasAbility('noguard') || target.hasAbility('noguard')) {
					return;
				}
				if (source.volatiles['lockon'] && target === source.volatiles['lockon'].source) return;
				return 0;
			},
		},
		secondary: false,
		target: "normal",
		type: "Cosmic",
		zMovePower: 190,
		contestType: "Cool",
	},
	"asteroidpulse": {
		num: -9009,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 20% chance to flinch/burn the target.",
		shortDesc: "20% chance to flinch/burn the target.",
		id: "asteroidpulse",
		isViable: true,
		name: "Asteroid Pulse",
		pp: 15,
		priority: 0,
		flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
		secondaries: [
			{
				chance: 20,
				status: 'brn',
			}, {
				chance: 20,
				volatileStatus: 'flinch',
			},
		],
		target: "any",
		type: "Cosmic",
		zMovePower: 160,
		contestType: "Cool",
	},
	"celestialbreak": {
		num: -9010,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated.",
		shortDesc: "Destroys screens, unless the target is immune.",
		id: "celestialbreak",
		isViable: true,
		name: "Celestial Break",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit: function (pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Cosmic')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: false,
		target: "normal",
		type: "Cosmic",
		zMovePower: 140,
		contestType: "Cool",
	},
	"solarflare": {
		num: -9011,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a 30% chance to burn the target.",
		shortDesc: "30% chance to burn adjacent Pokemon.",
		id: "solarflare",
		isViable: true,
		name: "Solar Flare",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "allAdjacent",
		type: "Cosmic",
		zMovePower: 175,
		contestType: "Cool",
	},
	"gravity": {
		inherit: true,
		type: "Cosmic",
	},
	"doomdesire": {
		inherit: true,
		type: "Cosmic",
	},
	"magicroom": {
		inherit: true,
		type: "Cosmic",
	},
	"miracleeye": {
		inherit: true,
		type: "Cosmic",
	},
	"swift": {
		inherit: true,
		type: "Cosmic",
	},
	"trickroom": {
		inherit: true,
		type: "Cosmic",
	},
	"wonderroom": {
		inherit: true,
		type: "Cosmic",
	},
	"lunardance": {
		inherit: true,
		type: "Cosmic",
	},
	"fireblast": {
		inherit: true,
		onModifyMove: function (move) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				move.accuracy = true;
			} else if (this.isWeather(['raindance', 'primordialsea'])) {
				move.accuracy = 60;
			}
		},
		desc: "10% chance to burn, never misses in sun, 60% accuracy in Rain.",
	},
	"hydropump": {
		inherit: true,
		onModifyMove: function (move) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				move.accuracy = true;
			} else if (this.isWeather(['sunnyday', 'desolateland'])) {
				move.accuracy = 60;
			}
		},
		desc: "Never misses in Rain, 60% accuracy in Sun.",
	},
	"supernovaburst": {
		num: -9012,
		accuracy: 100,
		basePower: 250,
		category: "Special",
		desc: "The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokemon has the Ability Damp.",
		shortDesc: "Hits adjacent Pokemon. The user faints.",
		id: "supernovaburst",
		isViable: true,
		name: "Supernova Burst",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: false,
		target: "allAdjacent",
		type: "Cosmic",
		zMovePower: 300,
		contestType: "Beautiful",
	},
	"mysticalfire": {
		inherit: true,
		desc: "Has a 100% chance to lower target's Special Attack by one stage, gains Psychic effectiveness.",
		shortDesc: "Lowers target's SpA by 1 stage, gains Psychic effectiveness.",
		onEffectiveness: function (typeMod, type) {
			return typeMod + this.getEffectiveness('Psychic', type);
		},
	},
	"dragonascent": {
		inherit: true,
		onEffectiveness: function (typeMod, type) {
			return typeMod + this.getEffectiveness('Dragon', type);
		},
		desc: "Lowers the user's Defense and Special Defense by 1 stage, Gains Dragon Effectiveness.",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1, Gains Dragon Effectiveness.",
	},
	"galacticfang": {
		num: -9013,
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		desc: "Has a 10% chance to inflict Oblivion onto the target and a 10% chance to flinch it.",
		shortDesc: "10% chance to inflict Oblivion. 10% chance to flinch.",
		id: "galacticfang",
		isViable: true,
		name: "Galactic Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondaries: [
			{
				chance: 10,
				status: 'oblivion',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Cosmic",
		zMovePower: 120,
		contestType: "Cool",
	},
	"electrohavoc": {
		num: -9014,
		accuracy: 100,
		basePower: 150,
		basePowerCallback: function (pokemon, target, move) {
			return move.basePower * pokemon.hp / pokemon.maxhp;
		},
		category: "Special",
		desc: "Power is equal to (user's current HP * 150 / user's maximum HP), rounded down, but not less than 1.",
		shortDesc: "Less power as user's HP decreases. Hits foe(s).",
		id: "electrohavoc",
		isViable: true,
		name: "Electro Havoc",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: false,
		target: "allAdjacentFoes",
		type: "Electric",
		zMovePower: 200,
		contestType: "Beautiful",
	},
	"darkvoid": {
		inherit: true,
		accuracy: 80,
	},
	"powercooldown": {
		num: -9015,
		accuracy: 95,
		basePower: 140,
		category: "Physical",
		desc: "Has a 30% chance to paralyze the target. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Charges turn 1. Hits turn 2. 30% par.",
		id: "powercooldown",
		name: "Power Cooldown",
		pp: 5,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
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
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 200,
		contestType: "Beautiful",
	},
	"powergem": {
		inherit: true,
		basePower: 90,
	},
	"focusblast": {
		inherit: true,
		accuracy: 85,
	},
	"rapidspin": {
		inherit: true,
		onEffectiveness: function (typeMod, type, move) {
			if (move.type !== 'Normal') return;
			let target = this.activeTarget;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Flying type and immune to Ground
			if (!target.runImmunity('Normal')) {
				if (target.hasType('Ghost')) return 0;
			}
		},
		basePower: 30,
		onBasePower: function (power, user) {
			let doubled = false;
			if (user.removeVolatile('leechseed')) {
				this.add('-end', user, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + user);
				doubled = true;
			}
			let sideConditions = {spikes:1, toxicspikes:1, stealthrock:1};
			for (let i in sideConditions) {
				if (user.side.removeSideCondition(i)) {
					this.add('-sideend', user.side, this.getEffect(i).name, '[from] move: Rapid Spin', '[of] ' + user);
					doubled = true;
				}
			}
			if (user.volatiles['partiallytrapped']) {
				this.add('-remove', user, user.volatiles['partiallytrapped'].sourceEffect.name, '[from] move: Rapid Spin', '[of] ' + user, '[partiallytrapped]');
				doubled = true;
				delete user.volatiles['partiallytrapped'];
			}
			if (doubled) return power * 2;
		},
		self: undefined,
		desc: "If this move is successful the user removes hazards before it attacks, the effects of Leech Seed and partial-trapping moves end for the user, and all hazards are removed from the user's side of the field. This move does double the damage, if a hazard is removed.",
		shortDesc: "Frees user from hazards/partial trap/Leech Seed. Ignores Ghost immunity.",
	},
	"knockoff": {
		inherit: true,
		basePower: 60,
	},
	"drainingkiss": {
		inherit: true,
		basePower: 75,
	},
	"razorwind": {
		inherit: true,
		type: "Flying",
	},
	"disarmingvoice": {
		inherit: true,
		basePower: 65,
	},
	"hammerslammer": {
		num: -9016,
		basePower: 100,
		accuracy: 100,
		category: "Physical",
		shortDesc: "No additional effects.",
		id: "hammerslammer",
		name: "Hammer Slammer",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 180,
		contestType: "Cool",
	},
	"pixiepunch": {
		num: -9017,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Has a 20% chance to confuse the target.",
		shortDesc: "20% chance to confuse the target.",
		id: "pixiepunch",
		name: "Pixie Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 170,
		contestType: "Cute",
	},
	"sewersmash": {
		num: 15000,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "Has a 10% chance to raise the user's Attack and Speed by 1 stage.",
		shortDesc: "10% chance to raise the user's Atk and Spe by 1.",
		id: "sewersmash",
		isViable: true,
		name: "Sewer Smash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
					spe: 1,
				},
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gunk Shot", target);
		},
		target: "normal",
		type: "Poison",
		zMovePower: 145,
		contestType: "Cool",
	},
	"colossalvoltthunderbolt": {
		num: -719,
		accuracy: true,
		basePower: 215,
		category: "Special",
		desc: "Super effective against Ground type Pokemon.",
		shortDesc: "Super effective against Ground type Pokemon.",
		id: "colossalvolthunderbolt",
		name: "Colossal Volt Thunderbolt",
		pp: 1,
		priority: 0,
		flags: {},
		onEffectiveness: function (typeMod, type) {
			if (type === 'Ground') return 1;
		},
		ignoreImmunity: {'Electric': true},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder", target);
			this.add('-anim', source, "Thunderbolt", target);
			this.add('-anim', source, "Gigavolt Havoc", target);
		},
		isZ: "ampharniumz",
		secondary: false,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	"drinkbleach": {
		num: 9001,
		accuracy: 100,
		basePower: 0,
		selfdestruct: "ifHit",
		category: "Status",
		desc: "Lowers target's stats by -6, and locks target from switching, but faints user.",
		shortDesc: "Target's stats go down by -6, get locked in, faints user.",
		id: "drinkbleach",
		isViable: true,
		name: "Drink Bleach",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: {
			volatileStatus: 'trapped',
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Memento", target);
		},
		boosts: {atk: -6, def: -6, spa: -6, spd: -6, spe: -6, accuracy: -6, evasion: -6},
		target: "normal",
		type: "Dark",
		zMoveBoost: {atk: 6},
		contestType: "Cool",
	},
	aerialace: {
		inherit: true,
		basePower: 90,
	},
	feintattack: {
		inherit: true,
		basePower: 90,
	},
	shadowpunch: {
		inherit: true,
		basePower: 90,
	},
	magnetbomb: {
		inherit: true,
		basePower: 90,
	},
	magicalleaf: {
		inherit: true,
		basePower: 90,
	},
	bonemerang: {
		inherit: true,
		ignoreImmunity: true,
		accuracy: true,
	},
	bonerush: {
		inherit: true,
		basePower: 20,
		ignoreImmunity: true,
		accuracy: true,
	},
	boneclub: {
		inherit: true,
		ignoreImmunity: true,
		accuracy: 90,
	},
	silverwind: {
		inherit: true,
		basePowerCallback: function () {
			if (this.isWeather('hail')) {
				return 90;
			}
			return 60;
		},
		secondary: {
			chance: 100,
			self: {
				onHit: function (target, source) {
					let stats = [];
					for (let stat in target.boosts) {
						if (stat !== 'accuracy' && stat !== 'evasion' && stat !== 'atk' && target.boosts[stat] < 6) {
							stats.push(stat);
						}
					}
					if (stats.length) {
						let randomStat = stats[this.random(stats.length)];
						let boost = {};
						boost[randomStat] = 1;
						this.boost(boost);
					} else {
						return false;
					}
				},
			},
		},
		desc: "Has a 100% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage. This attack's base power becomes 90, if the weather is set to Hail.",
		shortDesc: "Raises all stats by 1 (not acc/eva).",
	},
	ominouswind: {
		inherit: true,
		basePowerCallback: function () {
			if (this.isWeather('hail')) {
				return 90;
			}
			return 60;
		},
		secondary: {
			chance: 100,
			self: {
				onHit: function (target, source) {
					let stats = [];
					for (let stat in target.boosts) {
						if (stat !== 'accuracy' && stat !== 'evasion' && stat !== 'atk' && target.boosts[stat] < 6) {
							stats.push(stat);
						}
					}
					if (stats.length) {
						let randomStat = stats[this.random(stats.length)];
						let boost = {};
						boost[randomStat] = 1;
						this.boost(boost);
					} else {
						return false;
					}
				},
			},
		},
		desc: "Has a 100% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage. This attack's base power becomes 90, if the weather is set to Hail.",
		shortDesc: "Raises all stats by 1 (not acc/eva).",
	},
	ancientpower: {
		inherit: true,
		basePower: 75,
		secondary: {
			chance: 100,
			self: {
				onHit: function (target, source) {
					let stats = [];
					for (let stat in target.boosts) {
						if (stat !== 'accuracy' && stat !== 'evasion' && stat !== 'atk' && target.boosts[stat] < 6) {
							stats.push(stat);
						}
					}
					if (stats.length) {
						let randomStat = stats[this.random(stats.length)];
						let boost = {};
						boost[randomStat] = 1;
						this.boost(boost);
					} else {
						return false;
					}
				},
			},
		},
		desc: "Has a 100% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "Raises all stats by 1 (not acc/eva).",
	},
	relicsong: {
		inherit: true,
		basePower: 60,
		ignoreImmunity: true,
		onHit: function (target, pokemon) {
			if (pokemon.baseTemplate.species !== 'Meloetta' || pokemon.transformed) {
				return;
			}
			let natureChange = {
				'Modest': 'Adamant',
				'Adamant': 'Modest',
				'Timid': 'Jolly',
				'Jolly': 'Timid',
			};
			let tmpAtkEVs;
			let Atk2SpA;
			if (pokemon.template.speciesid === 'meloettapirouette' && pokemon.formeChange('Meloetta')) {
				this.add('-formechange', pokemon, 'Meloetta');
				tmpAtkEVs = pokemon.set.evs.atk;
				pokemon.set.evs.atk = pokemon.set.evs.spa;
				pokemon.set.evs.spa = tmpAtkEVs;
				if (natureChange[pokemon.set.nature]) pokemon.set.nature = natureChange[pokemon.set.nature];
				Atk2SpA = (pokemon.boosts.spa || 0) - (pokemon.boosts.atk || 0);
				this.boost({
					atk: Atk2SpA,
					spa: -Atk2SpA,
				}, pokemon);
			} else if (pokemon.formeChange('Meloetta-Pirouette')) {
				this.add('-formechange', pokemon, 'Meloetta-Pirouette');
				tmpAtkEVs = pokemon.set.evs.atk;
				pokemon.set.evs.atk = pokemon.set.evs.spa;
				pokemon.set.evs.spa = tmpAtkEVs;
				if (natureChange[pokemon.set.nature]) pokemon.set.nature = natureChange[pokemon.set.nature];
				Atk2SpA = (pokemon.boosts.spa || 0) - (pokemon.boosts.atk || 0);
				this.boost({
					atk: Atk2SpA,
					spa: -Atk2SpA,
				}, pokemon);
			}
			// renderer takes care of this for us
			pokemon.transformed = false;
		},
		priority: 1,
		secondary: null,
		desc: "Has a 10% chance to cause the target to fall asleep. If this move is successful on at least one target and the user is a Meloetta, it changes to Pirouette Forme if it is currently in Aria Forme, or changes to Aria Forme if it is currently in Pirouette Forme. This forme change does not happen if the Meloetta has the Ability Sheer Force. The Pirouette Forme reverts to Aria Forme when Meloetta is not active. This move also switches Meloetta's SpA and Atk EVs, boosts, and certain natures, specifically: Modest <-> Adamant, Jolly <-> Timid, other natures are left untouched.",
	},
	//Signature Pokemon Move Boost Things - GEN Next Concept
	avalanche: {
		inherit: true,
		basePowerCallback: function (pokemon, source, user, power) {
			if ((source.lastDamage > 0 && pokemon.lastAttackedBy && pokemon.lastAttackedBy.thisTurn)) {
				this.debug('Boosted for getting hit by ' + pokemon.lastAttackedBy.move);
				return this.isWeather('hail') ? 180 : 120;
			}
			if (user.template.id === 'avalugg') return power * 1.5;
			return this.isWeather('hail') ? 90 : 60;
		},
		desc: "Power doubles if the user was hit by the target this turn. If the weather is set to hail, this move does 1.5x more damage.  If the user is an Avalugg, this move does 1.5x more damage.",
		shortDesc: "Power doubles if user is damaged by the target.",
	},
	snore: {
		inherit: true,
		basePower: 100,
		onBasePower: function (power, user) {
			if (user.template.id === 'snorlax') return power * 1.5;
		},
		ignoreImmunity: true,
		desc: "Has a 30% chance to flinch the target. Fails if the user is not asleep. If the user is a Snorlax, this move does 1.5x more damage.",
	},
	doublehit: {
		inherit: true,
		accuracy: true,
	},
	armthrust: {
		inherit: true,
		accuracy: true,
	},
	barrage: {
		inherit: true,
		accuracy: true,
	},
	beatup: {
		inherit: true,
		accuracy: true,
	},
	bulletseed: {
		inherit: true,
		accuracy: true,
	},
	doublekick: {
		inherit: true,
		accuracy: true,
	},
	doubleslap: {
		inherit: true,
		accuracy: true,
	},
	dualchop: {
		inherit: true,
		accuracy: true,
	},
	furyattack: {
		inherit: true,
		accuracy: true,
	},
	furyswipes: {
		inherit: true,
		accuracy: true,
	},
	geargrind: {
		inherit: true,
		accuracy: true,
	},
	iciclespear: {
		inherit: true,
		accuracy: true,
	},
	pinmissile: {
		inherit: true,
		accuracy: true,
	},
	rockblast: {
		inherit: true,
		accuracy: true,
	},
	spikecannon: {
		inherit: true,
		accuracy: true,
	},
	tailslap: {
		inherit: true,
		accuracy: true,
	},
	watershuriken: {
		inherit: true,
		accuracy: true,
	},
	wingattack: {
		inherit: true,
		basePower: 40,
		accuracy: true,
		multihit: [2, 2],
		desc: "This move hits twice.",
		shortDesc: "Hits twice.",
	},
	steameruption: {
		inherit: true,
		accuracy: 100,
		onModifyMove: function (move) {
			switch (this.effectiveWeather()) {
			case 'sunnyday':
				move.secondary.chance = 60;
				break;
			}
		},
		desc: "Has a 30% chance to burn the target. The target thaws out if it is frozen. If the weather is set to Sunny Day, there is a 60% chance to burn the target.",
	},
	rockthrow: {
		inherit: true,
		accuracy: 100,
		onBasePower: function (power, user) {
			if (user.side.removeSideCondition('stealthrock')) {
				this.add('-sideend', user.side, "Stealth Rock", '[from] move: Rapid Spin', '[of] ' + user);
				return power * 2;
			}
		},
		desc: "This move attempts to remove Stealth Rocks from the user's side, if Stealth Rocks are removed this move does double the damage.",
		shortDesc: "Frees the user of Stealth Rock, does 2x damage if it does.",
	},
	firefang: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'flareon') return this.chainModify(1.5);
		},
		accuracy: 100,
		secondaries: [
			{chance:20, status:'brn'},
			{chance:30, volatileStatus:'flinch'},
		],
		desc: "Has a 20% chance to burn the target and a 30% chance to flinch it. If the user is a Flareon, this move does 1.5x more damage.",
		shortDesc: "20% chance to burn. 30% chance to flinch.",
	},
	icefang: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'walrein') return this.chainModify(1.5);
		},
		accuracy: 100,
		secondaries: [
			{chance:20, status:'frz'},
			{chance:30, volatileStatus:'flinch'},
		],
		desc: "Has a 20% chance to freeze the target and a 30% chance to flinch it. If the user is a Walrein, this move does 1.5x more damage.",
		shortDesc: "20% chance to freeze. 30% chance to flinch.",
	},
	thunderfang: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'luxray') return this.chainModify(1.5);
		},
		accuracy: 100,
		secondaries: [
			{chance:20, status:'par'},
			{chance:30, volatileStatus:'flinch'},
		],
		desc: "Has a 20% chance to paralyze the target and a 30% chance to flinch it. If the user is a Luxray, this move does 1.5x more damage.",
		shortDesc: "20% chance to paralyze. 30% chance to flinch.",
	},
	poisonfang: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'drapion') return this.chainModify(1.5);
		},
		accuracy: 100,
		secondaries: [
			{chance:100, status:'tox'},
			{chance:30, volatileStatus:'flinch'},
		],
		desc: "Has a 100% chance to badly poison the target and a 30% chance to flinch it. If the user is a Drapion, this move does 1.5x more damage.",
		shortDesc: "100% chance to badly poison. 30% chance to flinch.",
	},
	poisontail: {
		inherit: true,
		basePower: 60,
		onBasePower: function (power, user) {
			if (user.template.id === 'seviper') return this.chainModify(1.5);
		},
		accuracy: 100,
		secondary: {
			chance: 60,
			status: 'tox',
		},
		desc: "Has a 60% chance to badly poison the target and a higher chance for a critical hit. If the user is a Seviper, this move does 1.5x more damage.",
		shortDesc: "High critical hit ratio. 60% chance to badly poison.",
	},
	slash: {
		inherit: true,
		basePower: 60,
		onBasePower: function (power, user) {
			if (user.template.id === 'persian') return this.chainModify(1.5);
		},
		secondary: {
			chance: 30,
			boosts: {
				def: -1,
			},
		},
		desc: "Has a higher chance for a critical hit. 30% chance to lower the target's Defense by one stage. If the user is a Persian, this move does 1.5x more damage.",
		shortDesc: "High critical hit ratio. 30% chance to lower Def by 1.",
	},
	sludge: {
		inherit: true,
		basePower: 60,
		onBasePower: function (power, user) {
			if (user.template.id === 'muk') return this.chainModify(1.5);
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		desc: "Has a 100% chance to poison the target. If the user is a Muk, this move does 1.5x more damage.",
		shortDesc: "100% chance to poison the target.",
	},
	smog: {
		inherit: true,
		basePower: 75,
		accuracy: 100,
		onBasePower: function (power, user) {
			if (user.template.id === 'weezing') return this.chainModify(1.5);
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		desc: "Has a 100% chance to poison the target. If the user is a Weezing, this move does 1.5x more damage.",
		shortDesc: "100% chance to poison the target.",
	},
	flamecharge: {
		inherit: true,
		basePower: 60,
		onBasePower: function (power, user) {
			if (user.template.id === 'rapidash') return this.chainModify(1.5);
		},
		desc: "Has a 100% chance to raise the user's Speed by 1 stage. If the user is a Rapidash, this move does 1.5x more damage.",
	},
	flamewheel: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'darmanitan') return this.chainModify(1.5);
		},
		desc: "Has a 10% chance to burn the target. If the user is a Darmanitan, this move does 1.5x more damage.",
	},
	spark: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'eelektross') return this.chainModify(1.5);
		},
		desc: "Has a 30% chance to paralyze the target. If the user is an Eelektross, this move does 1.5x more damage.",
	},
	triplekick: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'hitmontop') return this.chainModify(1.5);
		},
		accuracy: true,
		desc: "Hits three times. Power increases to 20 for the second hit and 30 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids any of the hits. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit three times. If the user is a Hitmontop, this move does 1.5x more damage.",
	},
	bubblebeam: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'kingdra') return this.chainModify(1.5);
		},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		desc: "Has a 30% chance to lower the target's Speed by 1 stage. If the user is a Kingdra, this move does 1.5x more damage.",
		shortDesc: "30% chance to lower the target's Speed by 1.",
	},
	electroweb: {
		inherit: true,
		basePower: 60,
		onBasePower: function (power, user) {
			if (user.template.id === 'galvantula') return this.chainModify(1.5);
		},
		desc: "Has a 100% chance to lower the target's Speed by 1 stage. If the user is a Galvantula, this move does 1.5x more damage.",
		accuracy: 100,
	},
	gigadrain: {
		inherit: true,
		basePower: 60,
		onBasePower: function (power, user) {
			if (user.template.id === 'beautifly') return this.chainModify(1.5);
		},
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. If the user is a Beautifly, this move does 1.5x more damage.",
		accuracy: 100,
	},
	icywind: {
		inherit: true,
		basePower: 60,
		onBasePower: function (power, user) {
			if (user.template.id === 'glaceon') return this.chainModify(1.5);
		},
		desc: "Has a 100% chance to lower the target's Speed by 1 stage. If the user is a Glaceon, this move does 1.5x more damage.",
		accuracy: 100,
	},
	mudshot: {
		inherit: true,
		basePower: 60,
		onBasePower: function (power, user) {
			if (user.template.id === 'swampert') return this.chainModify(1.5);
		},
		desc: "Has a 100% chance to lower the target's Speed by 1 stage. If the user is a Swampert, this move does 1.5x more damage.",
		accuracy: 100,
	},
	glaciate: {
		inherit: true,
		basePower: 80,
		onBasePower: function (power, user) {
			if (user.template.id === 'kyurem') return this.chainModify(1.5);
		},
		desc: "Has a 100% chance to lower the target's Speed by 1 stage. If the user is a Kyurem, this move does 1.5x more damage.",
		accuracy: 100,
	},
	octazooka: {
		inherit: true,
		basePower: 75,
		onBasePower: function (power, user) {
			if (user.template.id === 'octillery') return this.chainModify(1.5);
		},
		accuracy: 90,
		secondary: {
			chance: 100,
			boosts: {
				accuracy: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's accuracy by 1 stage. If the user is a Octillery, this move does 1.5x more damage.",
		shortDesc: "100% chance to lower the target's accuracy by 1.",
	},
	leaftornado: {
		inherit: true,
		basePower: 75,
		onBasePower: function (power, user) {
			if (user.template.id === 'serperior') return this.chainModify(1.5);
		},
		accuracy: 90,
		secondary: {
			chance: 100,
			boosts: {
				accuracy: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's accuracy by 1 stage. If the user is a Serperior, this move does 1.5x more damage.",
		shortDesc: "100% chance to lower the target's accuracy by 1.",
	},
	iceshard: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'weavile') return this.chainModify(1.5);
		},
		desc: "If the user is a Weavile, this move does 1.5x more damage.",
	},
	aquajet: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'sharpedo') return this.chainModify(1.5);
		},
		desc: "If the user is a Sharpedo, this move does 1.5x more damage.",
	},
	machpunch: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'hitmonchan') return this.chainModify(1.5);
		},
		desc: "If the user is a Hitmonchan, this move does 1.5x more damage.",
	},
	shadowsneak: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'banette') return this.chainModify(1.5);
		},
		desc: "If the user is a Banette, this move does 1.5x more damage.",
	},
	steelwing: {
		inherit: true,
		basePower: 60,
		onBasePower: function (power, user) {
			if (user.template.id === 'skarmory') return this.chainModify(1.5);
		},
		accuracy: 100,
		secondary: {
			chance: 50,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
		desc: "Has a 50% chance to raise the user's Defense by 1 stage. If the user is a Skarmory, this move does 1.5x more damage.",
		shortDesc: "50% chance to raise the user's Defense by 1.",
	},
	surf: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'masquerain') return this.chainModify(1.5);
		},
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		desc: "Damage doubles if the target is using Dive. 10% chance to lower the target's Speed by one stage. If the user is a Masquerain, this move does 1.5x more damage.",
		shortDesc: "Power doubles on Dive. 10% chance to lower Spe by 1.",
	},
	hiddenpower: {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'unown') return this.chainModify(1.5);
		},
	},
};
