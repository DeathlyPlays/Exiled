'use strict';

const RandomTeams = require('../../data/random-teams');

class RandomSeasonalMeleeTeams extends RandomTeams {
	randomSeasonalMeleeTeam() {
		let team = [];
		let sets = {
			//Admemes
			"~Mewth": {
				species: "Furret-Mega",
				ability: "Roarplaying",
				item: "Scope Lens",
				gender: "F",
				moves: ['fireblast', 'blizzard', 'boomburst'],
				baseSignatureMove: "oblivionbanisher",
				signatureMove: "Oblivion Banisher",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Modest",
			},
			"~AlfaStorm": {
				species: "Hydreigon",
				ability: "Attack Shield",
				item: "Focus Sash",
				gender: "M",
				moves: ['flashcannon', 'dracometeor', 'dragonpulse'],
				baseSignatureMove: "darkstorm",
				signatureMove: "Dark Storm",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Timid",
			},
			//Gods
			"☥Sota Higurashi": {
				species: "Victini",
				ability: "feelssota",
				item: "Expert Belt",
				gender: "M",
				moves: ['vcreate', 'boltstrike', 'uturn'],
				baseSignatureMove: "zencreate",
				signatureMove: "Zen Create",
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			//Leaders
			"&Chandie": {
				species: "Chandelure-Mega",
				ability: "Magma Overdrive",
				item: "Life Orb",
				gender: "M",
				moves: ['secretsword', 'moongeistbeam', 'ember'],
				baseSignatureMove: "solareruption",
				signatureMove: "Solar Eruption",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Modest",
			},
			"&flufi": {
				species: "Minccino",
				ability: "Sneaky Fluffer",
				item: "Silk Scarf",
				gender: "M",
				moves: ['extremespeed', 'uturn', 'fakeout'],
				baseSignatureMove: "awailofatail",
				signatureMove: "A Wail of a Tail",
				evs: {
					atk: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Adamant",
			},
			"&Kraken Mare": {
				species: "Gardevoir-Mega",
				ability: "krakensboost",
				shiny: true,
				item: "Focus Sash",
				gender: "F",
				moves: ['moonblast', 'calmmind', 'psychic'],
				baseSignatureMove: "revengeofkrakenmare",
				signatureMove: "Revenge of Kraken Mare",
				evs: {
					hp: 248,
					spa: 252,
					def: 8,
				},
				nature: "Modest",
			},
			//Bots
			"*The Exiler": {
				species: "Darkrai",
				ability: "The Exiled Ones",
				item: "Leftovers",
				gender: "M",
				shiny: true,
				moves: ['aurasphere', 'sludgewave', 'psychic'],
				baseSignatureMove: "exile",
				signatureMove: "Exile",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			'*Stabby the Krabby': {
				species: 'Krabby',
				ability: 'Ready to Stab',
				item: 'Eviolite',
				gender: 'M',
				moves: ['Crabhammer', 'Swords Dance', 'Knock Off'],
				baseSignatureMove: "stabstab",
				signatureMove: 'Stab Stab',
				evs: {
					atk: 252,
					spe: 252,
					hp: 6,
				},
				nature: 'Adamant',
			},
			//Moderators
			"@C733937 123": {
				species: "Gengar-Mega",
				ability: "Chaotic Armor",
				item: "Aguav Berry",
				gender: "M",
				moves: ['shadowball', 'darkpulse', 'painsplit'],
				baseSignatureMove: "voodoomagic",
				signatureMove: "Voodoo Magic",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Timid",
			},
			"@Insist": {
				species: "Ludicolo-Mega",
				ability: "Crippling Depression",
				item: "Playnium Z",
				gender: "M",
				shiny: true,
				moves: ['freezedry', 'gigadrain', 'focusblast'],
				baseSignatureMove: "aquasubscribe",
				signatureMove: "Aqua Subscribe",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			//Drivers
			"%Horrific17": {
				species: "Arcanine",
				ability: "Horrific Plays",
				item: "Arcanium Z",
				gender: "M",
				moves: ['closecombat', 'extremespeed', 'morningsun'],
				baseSignatureMove: "horrificroasts",
				signatureMove: "Horrific Roasts",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Adamant",
			},
			"%Jigglykong": {
				species: "Porygon2",
				ability: "3Bawlky5U",
				item: "Eviolite",
				gender: "M",
				shiny: true,
				moves: ['recover', 'hex', 'toxic'],
				baseSignatureMove: "plasmablast",
				signatureMove: "Plasma Blast",
				evs: {
					hp: 252,
					def: 100,
					spa: 60,
					spd: 92,
				},
				nature: "Bold",
			},
			"%Shivay": {
				species: "Charizard-Mega-X",
				ability: "Bird Claws",
				item: "Health Orb",
				gender: "M",
				moves: ['outrage', 'flareblitz', 'roost'],
				baseSignatureMove: "dragonify",
				signatureMove: "Dragonify",
				evs: {
					atk: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Adamant",
			},
			//Voices
			"+LinkCode": {
				species: "Marill",
				ability: "Call of the Haunted",
				item: "Marillium",
				gender: "M",
				moves: ['spectralthief', 'liquidation', 'drainpunch'],
				baseSignatureMove: "shadowretreat",
				signatureMove: "Shadow Retreat",
				evs: {
					hp: 252,
					atk: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			//Regs
			" Gligars": {
				species: "Guzzlord",
				ability: "Last Laugh",
				item: "Perception",
				gender: "M",
				moves: ['partingshot', 'rest', 'taunt'],
				baseSignatureMove: "aggrodraw",
				signatureMove: "Aggro Draw",
				evs: {
					hp: 252,
				},
				ivs: {
					atk: 0,
					def: 0,
					spd: 0,
				},
				nature: "Serious",
			},
			" Back At My Day": {
				species: "Camerupt-Mega",
				ability: "Time Traveler",
				item: "Rocky Helmet",
				gender: "M",
				moves: ['aeroblast', 'steameruption', 'freezedry'],
				baseSignatureMove: "roleplaying",
				signatureMove: "Roleplaying",
				evs: {
					def: 148,
					spa: 252,
					spd: 108,
				},
				nature: "Modest",
			},
			" Good Egg Galaxy": {
				species: "Togepi",
				ability: "Best Egg",
				item: "Eviolite",
				gender: "M",
				moves: ['partingshot', 'softboiled', 'moonblast'],
				baseSignatureMove: "geg4life",
				signatureMove: "GEG 4 LIFE",
				evs: {
					hp: 252,
					def: 252,
					spd: 4,
				},
				nature: "Bold",
			},
			" Almighty Judgment": {
				species: "Arceus",
				ability: "Almighty Presence",
				item: "Rainbow Plate",
				gender: "M",
				moves: ['judgment', 'substitute', 'quiverdance'],
				baseSignatureMove: "holydance",
				signatureMove: "Holy Dance",
				evs: {
					spa: 252,
					spe: 252,
					def: 4,
				},
				nature: "Timid",
			},
<<<<<<< HEAD:mods/dssb/random-teams.js
			" Wobbleleez": {
=======
			"+Blooded❤Draco": {
				species: "Kyurem-Black",
				ability: "Poison Heal",
				item: "Toxic Orb",
				moves: ['dragonclaw', 'willowisp', 'dragonpulse'],
				baseSignatureMove: "hellfire",
				signatureMove: "Hellfire",
				evs: {
					hp: 4,
					spa: 252,
					spe: 252,
				},
				nature: "Naive",
			},
			"+Randbat Spam": {
				species: "Giratina",
				ability: "Distorted Dimensions",
				item: "Giratinite",
				moves: ["sunsteelstrike", "shadowforce", "dragonrush"],
				baseSignatureMove: "thousandarrows",
				signatureMove: "Thousand Arrows",
				evs: {
					atk: 252,
					def: 4,
					spe: 252,
				},
				nature: "Jolly",
			},
			//Trusteds
			"✓Wobbleleez": {
>>>>>>> cee2e9e3c4aa81d811f55fcc03c888197cc8e36d:mods/essb/random-teams.js
				species: "Musharna",
				ability: "WobzDoezJobz",
				item: "Leftovers",
				gender: "M",
				moves: ['storedpower', 'chargebeam', 'drainingkiss'],
				baseSignatureMove: "Crippling Kiss",
				signatureMove: "Crippling Kiss",
				evs: {
					hp: 252,
					spa: 220,
					spd: 16,
					def: 16,
				},
				nature: "Modest",
			},
			" Ransei": {
				species: "Rayquaza-Mega",
				ability: "Aerilate",
				item: "Life Orb",
				gender: "M",
				shiny: true,
				moves: ['extremespeed', 'surf', 'dragonpulse'],
				signatureMove: "Legend's Ambition",
				evs: {
					atk: 4,
					spa: 252,
					spe: 252,
				},
				nature: "Naive",
			},
			" ggdaca":{
				species: "Rayquaza-Mega",
				ability: "Lord's Grace",
				item: "Legendinium Z",
				gender: 'M',
				moves: ['dragonascent', 'earthquake', 'extremespeed'],
				baseSignatureMove: "lordswrath",
				signatureMove: "Lord's Wrath",
				evs: {
					spe: 252,
					atk: 252,
					spd: 4,
				},
				nature: "Adamant",
			},
			" GuiltasBR": {
				species: "Conkeldurr",
				ability: "handsBurn",
				item: "Douglasinium Z",
				gender: "M",
				moves: ['drainpunch', 'poisonjab', 'thunderpunch'],
				baseSignatureMove: "punchyfury",
				signatureMove: "Punchy Fury",
				evs: {
					atk: 252,
					hp: 252,
					spd: 4,
				},
				nature: "Adamant",
			},
			" douglasgamer": {
				species: "Greninja-Ash",
				ability: "Get Bonded",
				item: "Life Orb",
				gender: "M",
				moves: ['scald', 'icebeam', 'thunder'],
				baseSignatureMove: "copywaterclones",
				signatureMove: "Copy Water Clones",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Modest",
			},
			" Paradox03": {
				species: "Dodrio",
				ability: "DustKickUp",
				item: "BrightPowder",
				gender: "M",
				moves: ['bravebird', 'knockoff', 'jumpkick'],
				baseSignatureMove: "triplepeakmegasmash",
				signatureMove: "Triple Peak Mega Smash",
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: "Jolly",
			},
			" DivineSaiyanScaris": {
				species: "Infernape-Mega",
				ability: "Fighter's Heart",
				item: "Life Orb",
				gender: "M",
				moves: ['closecombat', 'moonblast', 'solarbeam'],
				baseSignatureMove: "warriorsinferno",
				signatureMove: "Warriors Inferno",
				evs: {
					atk: 128,
					spe: 252,
					spa: 128,
				},
				nature: "Hasty",
			},
			"!LovethisMagikarp": {
				species: "Magikarp",
				ability: "How Dare You Hate",
				item: "Focus Sash",
				gender: "F",
				shiny: true,
				moves: ['charm', 'captivate', 'babydolleyes'],
				signatureMove: "Attract",
				evs: {
					hp: 252,
					spe: 252,
				},
				nature: "Jolly",
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
			/*if (i === 1) {
				let monIds = pool.slice(0, 6).map(function (p) {
					return toId(p);
				});
				for (let mon in sets) {
					if (toId(mon) === userid && monIds.indexOf(userid) === -1) {
						pool[1] = mon;
						break;
					}
				}
			}*/
			let set = sets[pool[i]];
			set.level = 100;
			set.name = pool[i];
			if (!set.ivs) {
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (let iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = set.ivs[iv] || set.ivs[iv] === 0 ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			team.push(set);
		}
		return team;
	}
}

module.exports = RandomSeasonalMeleeTeams;
