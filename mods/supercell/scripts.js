/* * * * * * * * * * * * * * * * * * * * * * * *
 *  Supercell Games Metagame                   *
 *  Coded by: Insist                           *
 * -I do not claim any of the Supercell games  *
 * as my own this is purely made for enjoyment *
 * of fans                                     *
 * * * * * * * * * * * * * * * * * * * * * * * */
'use strict';

exports.BattleScripts = {
	randomSeasonalMeleeTeam: function (side) {
		let team = [];
		let sets = {
			"Barbarian": {
				species: "Barbarian",
				item: "Leftovers",
				ability: "Adaptability",
				moves: ['knockoff', 'closecombat', 'playrough'],
				baseSignatureMove: "battleram",
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
				baseSignatureMove: "arrowsiege",
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
				baseSignatureMove: "greed",
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
				baseSignatureMove: "rebound",
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
				baseSignatureMove: "fireball",
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
				baseSignatureMove: "airstrike",
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
				baseSignatureMove: "evilbiding",
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
				baseSignatureMove: "hammerslammer",
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
				baseSignatureMove: "raisethedead",
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
				baseSignatureMove: "combustion",
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
				baseSignatureMove: "metallicsword",
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
				baseSignatureMove: "healspell",
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
				baseSignatureMove: "royalarrow",
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
				baseSignatureMove: "explode",
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
				baseSignatureMove: "tossspears",
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
				baseSignatureMove: "minerush",
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
				baseSignatureMove: "lightningspell",
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
				baseSignatureMove: "freezespell",
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
				baseSignatureMove: "Log",
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
				baseSignatureMove: "zapspell",
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
				baseSignatureMove: "boneslash",
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
				baseSignatureMove: "axemerang",
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
				baseSignatureMove: "binaryfission",
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
				baseSignatureMove: "infernoblitz",
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
				baseSignatureMove: "subzerofrostbite",
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
				baseSignatureMove: "shield",
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
				baseSignatureMove: "cannon",
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
				baseSignatureMove: "royaljoust",
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
				baseSignatureMove: "breakthewall",
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
				baseSignatureMove: "axehax",
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
				baseSignatureMove: "tossbombs",
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
				baseSignatureMove: "strike",
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

		let pool = Object.keys(sets);

		for (let i = 0; i < 6; i++) {
			let name = pool[i];
			let set = sets[name];
			set.name = name;
			set.level = 100;
			if (!set.ivs) {
				set.ivs = {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31,
				};
			} else {
				for (let iv in {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31,
				}) {
					set.ivs[iv] = iv in set.ivs ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) {
				set.evs = {
					hp: 84,
					atk: 84,
					def: 84,
					spa: 84,
					spd: 84,
					spe: 84,
				};
			}
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			team.push(set);
		}

		return team;
	},
};
