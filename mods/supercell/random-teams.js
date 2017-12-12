/* * * * * * * * * * * * * * * * * * * * * * * *
 *  Supercell Games Metagame                   *
 *  Coded by: Insist                           *
 * -I do not claim any of the Supercell games  *
 * as my own this is purely made for enjoyment *
 * of fans                                     *
 * * * * * * * * * * * * * * * * * * * * * * * */
'use strict';

const RandomTeams = require('../../data/random-teams');

class RandomSupercellTeams extends RandomTeams {
	randomSupercellTeam() {
		let team = [];
		let sets = {
			"Barbarian": {
				species: "Barbarian",
				item: "Leftovers",
				ability: "Adaptability",
				moves: ['knockoff', 'closecombat', 'playrough'],
				signatureMove: "Battle Ram",
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Archer": {
				species: "Archer",
				item: "Life Orb",
				ability: "Sharpshooter",
				moves: ['psyshock', 'focusblast', 'vacuumwave'],
				signatureMove: "Arrow Siege",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			"Goblin": {
				species: "Goblin",
				item: "Focus Sash",
				ability: "Theft",
				moves: ['thief', 'endeavor', 'extremespeed'],
				signatureMove: "Greed",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Jolly",
			},
			"Giant": {
				species: "Regular Giant",
				item: "Leftovers",
				ability: "Meatshield",
				moves: ['recover', 'bulkup', 'drainpunch'],
				signatureMove: "Rebound",
				evs: {
					hp: 252,
					atk: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Wizard": {
				species: "Wizard",
				item: "Life Orb",
				ability: "Wizardry",
				moves: ['moonblast', 'icebeam', 'aurasphere'],
				signatureMove: "Fireball",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Timid",
			},
			"Balloon": {
				species: "Balloon",
				item: "Leftovers",
				ability: "I Gotz a Bomb",
				moves: ['roost', 'knockoff', 'suckerpunch'],
				signatureMove: "Air Strike",
				evs: {
					hp: 252,
					atk: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Minion": {
				species: "Minion",
				item: "Focus Sash",
				ability: "Mayhem",
				moves: ['hurricane', 'sludgewave', 'nastyplot'],
				signatureMove: "Evil Biding",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Timid",
			},
			"Hog Rider": {
				species: "Hog Rider",
				item: "Leftovers",
				ability: "HOG RIDDAH",
				moves: ['rockslide', 'drainpunch', 'extremespeed'],
				signatureMove: "Hammer Slammer",
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: "Jolly",
			},
			"Witch": {
				species: "Witch",
				item: "Leftovers",
				ability: "Witchcraft",
				moves: ['recover', 'psystrike', 'moonblast'],
				signatureMove: "Raise the Dead",
				evs: {
					hp: 252,
					spd: 252,
					spa: 4,
				},
				nature: "Calm",
			},
			"Lava Hound": {
				species: "Lava Hound",
				item: "Leftovers",
				ability: "Burnout",
				moves: ['oblivionwing', 'defog', 'roost'],
				signatureMove: "Combustion",
				evs: {
					hp: 252,
					spd: 252,
					spa: 4,
				},
				nature: "Calm",
			},
			"PEKKA": {
				species: "PEKKA",
				ability: "Masked Warrior",
				item: "Leftovers",
				moves: ['sacredsword', 'nightslash', 'psychocut'],
				signatureMove: "Metallic Sword",
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Healer": {
				species: "Healer",
				item: "Leftovers",
				ability: "Pixie Blessing",
				moves: ['cosmicpower', 'oblivionwing', 'storedpower'],
				signatureMove: "Heal Spell",
				evs: {
					hp: 252,
					spd: 252,
					def: 4,
				},
				nature: "Calm",
			},
			"Baby Dragon": {
				species: "Baby Dragon",
				item: "Leftovers",
				ability: "Parental Guidance",
				moves: ['roost', 'oblivionwing', 'gigadrain'],
				signatureMove: "Dragon Pulse",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Modest",
			},
			"Princess": {
				species: "Princess",
				item: "Scope Lens",
				ability: "Ranged Sniper",
				moves: ['psyshock', 'searingshot', 'vacuumwave'],
				signatureMove: "Royal Arrow",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			"Giant Skeleton": {
				species: "Giant Skeleton",
				ability: "Giant Bomb",
				item: "Leftovers",
				moves: ['drainpunch', 'knockoff', 'recover'],
				signatureMove: "Explode",
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Spear Goblin": {
				species: "Spear Goblin",
				ability: "Spear Link",
				item: "King's Rock",
				moves: ['pinmissile', 'iciclespear', 'rockblast'],
				signatureMove: "Toss Spears",
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: "Jolly",
			},
			"Miner": {
				species: "Miner",
				ability: "Minefield",
				item: "Leftovers",
				moves: ['rockslide', 'recover', 'stealthrock'],
				signatureMove: "Mine Rush",
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: "Jolly",
			},
			"Sparky": {
				species: "Sparky",
				ability: "Power Cooldown",
				item: "Leftovers",
				moves: ['focusblast', 'recover', 'gigadrain'],
				signatureMove: "Lightning Spell",
				evs: {
					spa: 252,
					hp: 252,
					def: 4,
				},
				nature: "Modest",
			},
			"Ice Wizard": {
				species: "Ice Wizard",
				ability: "Glacier Wizardry",
				item: "Life Orb",
				moves: ['moonblast', 'aurasphere', 'psyshock'],
				signatureMove: "Freeze Spell",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Modest",
			},
			"Knight": {
				species: "Knight",
				ability: "Knightly Honor",
				item: "Leftovers",
				moves: ['suckerpunch', 'playrough', 'shadowsneak'],
				signatureMove: "Extreme Speed",
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Lumberjack": {
				species: "Lumberjack",
				ability: "Timber",
				item: "Leftovers",
				moves: ['headsmash', 'highjumpkick', 'wildcharge'],
				signatureMove: "Log",
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Electro Wizard": {
				species: "Electro Wizard",
				ability: "Zap Wizardry",
				item: "Life Orb",
				moves: ['gigadrain', 'focusblast', 'psychic'],
				signatureMove: "Zap Spell",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			"Skeleton": {
				species: "Skeleton",
				ability: "Graveyard",
				item: "Focus Sash",
				moves: ['playrough', 'knockoff', 'extremespeed'],
				signatureMove: "Bone Slash",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Jolly",
			},
			"Executioner": {
				species: "Executioner",
				ability: "Fatality",
				item: "Leftovers",
				moves: ['recover', 'drainpunch', 'shadowsneak'],
				signatureMove: "Axemerang",
				evs: {
					atk: 252,
					hp: 252,
					spd: 4,
				},
				nature: "Adamant",
			},
			"Golem": {
				species: "Supercell Golem",
				ability: "Continental Crush",
				item: "Leftovers",
				moves: ['stealthrock', 'earthquake', 'recover'],
				signatureMove: "Binary Fission",
				evs: {
					hp: 252,
					def: 252,
					atk: 4,
				},
				nature: "Relaxed",
			},
			"Fire Spirits": {
				species: "Fire Spirits",
				ability: "Inferno Blaze",
				item: "Choice Scarf",
				moves: ['earthpower', 'gigadrain', 'flamethrower'],
				signatureMove: "Inferno Blitz",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			"Ice Spirits": {
				species: "Ice Spirits",
				ability: "Subzero Frost",
				item: "Choice Scarf",
				moves: ['earthpower', 'gigadrain', 'freezedry'],
				signatureMove: "Subzero Frostbite",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			"Guard": {
				species: "Guard",
				ability: "Steel Enforced Shield",
				item: "Leftovers",
				moves: ['knockoff', 'swordsdance', 'shadowsneak'],
				signatureMove: "Shield",
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: "Jolly",
			},
			"Royal Giant": {
				species: "Royal Giant",
				ability: "Cannonball",
				item: "Leftovers",
				moves: ['drainpunch', 'knockoff', 'recover'],
				signatureMove: "Cannon",
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Prince": {
				species: "Prince",
				ability: "Ye Royale Joust",
				item: "Choice Band",
				moves: ['knockoff', 'playrough', 'closecombat'],
				signatureMove: "Royal Joust",
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Wallbreaker": {
				species: "Wallbreaker",
				ability: "Allahu Akbar",
				item: "Choice Scarf",
				moves: ['explode', 'explosion', 'healingwish'],
				signatureMove: "Break the Wall",
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: "Jolly",
			},
			"Valkyrie": {
				species: "Valkyrie",
				ability: "Bravery",
				item: "Leftovers",
				moves: ['knockoff', 'recover', 'bulkup'],
				signatureMove: "Axe Hax",
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Bomber": {
				species: "Bomber",
				ability: "Master Detonator",
				item: "Life Orb",
				moves: ['gigadrain', 'earthpower', 'vacuumwave'],
				signatureMove: "Toss Bombs",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Modest",
			},
			"Bowler": {
				species: "Bowler",
				ability: "Champion Bowler",
				item: "Leftovers",
				moves: ['gigadrain', 'earthpower', 'recover'],
				signatureMove: "STRIKE",
				evs: {
					spa: 252,
					hp: 252,
					def: 4,
				},
				nature: "Modest",
			},
			"Musketeer": {
				species: "Musketeer",
				ability: "Top Tier Musketeer",
				item: "Leftovers",
				moves: ['focusblast', 'gigadrain', 'earthpower'],
				signatureMove: "Psystrike",
				evs: {
					spa: 252,
					hp: 252,
					spd: 4,
				},
				nature: "Modest",
			},
		};
		// convert moves to ids.
		for (let k in sets) {
			sets[k].moves = sets[k].moves.map(toId);
			sets[k].baseSignatureMove = toId(sets[k].baseSignatureMove);
		}

		// Generate the team randomly.
		let pool = Dex.shuffle(Object.keys(sets));
		for (let i = 0; i < 6; i++) {
			let set = sets[pool[i]];
			set.level = 100;
			set.name = pool[i];
			if (!set.ivs) {
				set.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
			} else {
				for (let iv in {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31}) {
					set.ivs[iv] = set.ivs[iv] || set.ivs[iv] === 0 ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84};
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			team.push(set);
		}
		return team;
	}
}

module.exports = RandomSupercellTeams;
