'use strict';

exports.BattleScripts = {
	randomSeasonalMeleeTeam: function (side) {
		let userid = toId(side.name);
		let team = [];
		let sets = {
			//Admins
			"~Insist": {
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
			"&Back At My Day": {
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
				nature: "Timid",
			},
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
				ability: "Contrary",
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
			"☥Jigglykong": {
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
			"@Kraken Mare": {
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
			"@flufi": {
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
			"@Perison": {
				species: "Xerneas",
				ability: "Adaptability",
				item: "Power Herb",
				gender: "M",
				moves: ['psystrike', 'moonblast', 'hypervoice'],
				shiny: true,
				baseSignatureMove: "ooga",
				signatureMove: "Ooga",
				evs: {
					spa: 252,
					hp: 252,
					spe: 4,
				},
				nature: "Modest",
			},
			"@Klefkei": {
			   species: "Klefki",
			   ability: "Deadass",
			   item: "Tarnationium Z",
			   gender: "F",
			   moves: ['swagger', 'foulplay', 'toxic'],
			   baseSignatureMove: "thinking",
			   signatureMove: "thinking",
			   evs: {
				   hp: 252,
				   def: 252,
				   atk: 4,
			   },
			   nature: "Impish",
			},
			"@Revival Clair": {
				species: "Garchomp",
				ability: "Rough Skin",
				item: "Leftovers",
				shiny: true,
				gender: "F",
				moves: ['outrage', 'earthquake', 'swordsdance'],
				baseSignatureMove: "dragonblitz",
				signatureMove: "Dragon Blitz",
				evs: {
					atk: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Jolly",
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
			"%HoeenHero": {
				species: "Ludicolo",
				ability: "Programmers Domain",
				item: "Leftovers",
				gender: "M",
				moves: ['scald', 'icebeam', 'gigadrain'],
				baseSignatureMove: "scripting",
				signatureMove: "Scripting",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			"%GoodEggGalaxy": {
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
			"%vxn": {
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
			//Voices
			"+cyt0pl4sm": {
				species: "Zygarde-10%",
				ability: "Energy Overflow",
				item: "Choice Band",
				gender: "M",
				moves: ['extremespeed', 'playrough', 'crunch'],
				signatureMove: "Thousand Arrows",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Jolly",
			},
			"+Renfur": {
				species: "Flygon-Mega",
				ability: "DesertDragon",
				item: "Life Orb",
				gender: "M",
				moves: ['flamethrower', 'earthpower', 'dragonpulse'],
				baseSignatureMove: "itsmytimenow",
				signatureMove: "It's My Time Now",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Mild",
			},
			"+Alpha Shivam": {
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
			"+Chesnaught90000": {
				species: "Chesnaught",
				ability: "Nice 0u0",
				item: "Life Orb",
				moves: ['doubleedge', 'drainpunch', 'woodhammer'],
				gender: "F",
				baseSignatureMove: "cookiestorm",
				signatureMove: "Cookie Storm",
				evs: {
					atk: 252,
					spd: 4,
					spe: 252,
				},
				nature: "Jolly",
			},
			"+Almighty Judgment": {
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
			//Regs
			" Wobbleleez": {
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
			" Noviex": {
				species: "Tyranitar",
				ability: "Phat Ass",
				item: "Armor Vest",
				gender: "M",
				moves: ['stoneedge', 'crunch', 'earthquake'],
				baseSignatureMove: "methmemesandedgyteens",
				signatureMove: "Meth, Memes, and Edgy Teens",
				evs: {
					atk: 252,
					hp: 248,
					def: 8,
				},
				nature: "Jolly",
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
			" EchoSierra": {
				species: "Swellow",
				ability: "No Guts, No Glory",
				item: "Toxic Orb",
				gender: "F",
				moves: ['bravebird', 'doubleedge', 'protect'],
				baseSignatureMove: "kamikaze",
				signatureMove: "Kamikaze",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Adamant",
			},
			" Kevso": {
				species: "Deoxys-Defense",
				ability: "Defense",
				item: "Leftovers",
				gender: "M",
				moves: ['roar', 'storedpower', 'recover'],
				baseSignatureMove: "cripplinghazards",
				signatureMove: "Crippling Hazards",
				evs: {
					hp: 252,
					def: 252,
					spd: 4,
				},
				nature: "Bold",
			},
			" Player Shadow br": {
				species: "Dragonite",
				ability: "Law of the Dragon",
				item: "Playerinium Z",
				gender: "M",
				moves: ['firelash', 'fusionbolt', 'dragonrush'],
				baseSignatureMove: "rushofdragonbolt",
				signatureMove: "Rush of Dragon Bolt",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Jolly",
			},
			" TheGodOfPie": {
				species: "Mawile-Mega",
				ability: "Mad Tings",
				item: "Life Orb",
				gender: "M",
				moves: ['suckerpunch', 'quickattack', 'bulletpunch'],
				baseSignatureMove: "thepowerofpi",
				signatureMove: "The Power of Pi",
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			" Failures": {
				species: "Greninja-Ash",
				ability: "Catch me in the Ball",
				item: "Bag of Ls",
				moves: ['hydropump', 'blueflare', 'moongeistbeam'],
				gender: "M",
				baseSignatureMove: "imdepressed",
				signatureMove: "Im Depressed",
				evs: {
					spa: 252,
					def: 4,
					spe: 252,
				},
				nature: "Modest",
			},
			" Ia♪♫Planets": {
				species: "Audino-Mega",
				ability: "Cute Face",
				item: "Ultra Leftovers",
				gender: "F",
				moves: ['vcreate', 'drainingkiss', 'judgment'],
				baseSignatureMove: "perfectend",
				signatureMove: "Perfect End",
				evs: {
					hp: 64,
					atk: 64,
					def: 64,
					spa: 64,
					spd: 64,
					spe: 188,
				},
				nature: "Timid",
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
					spd: 252,
					spe: 4,
				},
				nature: "Careful",
			},
			" 007Nilo": {
				species: "Zoroark-Mega",
				ability: "Illusion",
				item: "Life Orb",
				gender: "M",
				moves: ['nastyplot', 'nightdaze', 'focusblast'],
				baseSignatureMove: "powerofdarkness",
				signatureMove: "Power Of Darkness",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Modest",
			},
			" Princess Teddiursa": {
				species: "Ninetales-Alola",
				ability: "prfmlmao",
				item: "Life Orb",
				gender: "F",
				moves: ['boomburst', 'psychic', 'earthpower'],
				baseSignatureMove: "prfmador",
				signatureMove: "prfmador",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Timid",
			},
			" KanekiPlayerBR": {
				species: "Ninetales",
				ability: "JOOJ",
				item: "Kanekinium Z",
				gender: "M",
				moves: ['flamethrower', 'psyshock', 'energyball'],
				baseSignatureMove: "superultraflamethrowerdestroyerofuniverses",
				signatureMove: "Super Ultra Flamethrower Destroyer of Universes",
				evs: {
					spa: 252,
					hp: 236,
					spd: 16,
				},
				nature: "Modest",
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
			" Volco": {
				species: "Volcanion",
				ability: "Volcanic Ash",
				item: "Volcanionite",
				gender: "M",
				moves: ['steameruption', 'gigadrain', 'earthpower'],
				baseSignatureMove: "volcanosrevenge",
				signatureMove: "Volcano's Revenge",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Modest",
			},
			" UniversalCraftr": {
				species: "Snorlax",
				ability: "Gluttony",
				item: "Iapapa Berry",
				gender: "M",
				moves: ['thousandarrows', 'recycle', 'curse'],
				baseSignatureMove: "slowtownking",
				signatureMove: "Slowtown King",
				evs: {
					hp: 252,
					atk: 136,
					spd: 52,
					def: 68,
				},
				nature: "Brave",
			},
			" Mysticoz": {
				species: "Absol-Mega",
				ability: "Dark Boost",
				item: "Life Orb",
				gender: "M",
				moves: ['swordsdance', 'playrough', 'suckerpunch'],
				baseSignatureMove: "punchofdarkness",
				signatureMove: "Punch of Darkness",
				evs: {
					atk: 252,
					def: 4,
					spe: 252,
				},
				nature: "Adamant",
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
				species: "Infernape",
				ability: "Fighters Heart",
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
				moves: ['charm', 'captivate', 'baby-dolleyes'],
				signatureMove: "Attract",
				evs: {
					hp: 252,
					spe: 252,
				},
				nature: "Jolly",
			},
		};
		// Generate the team randomly.
		let pool = Dex.shuffle(Object.keys(sets));
		let levels = {'~':99, '☥':98, '&':97, '*': 96, '@':96, '%':95, '+':95, ' ': 94};
		for (let i = 0; i < 6; i++) {
			if (i === 1) {
				let monIds = pool.slice(0, 6).map(function (p) {
					return toId(p);
				});
				let monName;
				for (let mon in sets) {
					if (toId(mon) === userid) {
						monName = mon;
						break;
					}
				}
				if (monIds.indexOf(userid) === -1 && monName) {
					pool[2] = monName;
				}
			}
			let rank = pool[i].charAt(0);
			let set = sets[pool[i]];
			set.level = levels[rank];
			set.name = pool[i];
			if (!set.ivs) {
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (let iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = set.ivs[iv] ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal. LOLOLOLOLOL
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			team.push(set);
		}
		return team;
	},
	canMegaEvo: function (pokemon) {
		let altForme = pokemon.baseTemplate.otherFormes && this.getTemplate(pokemon.baseTemplate.otherFormes[0]);
		if (altForme && altForme.isMega && altForme.requiredMove && pokemon.moves.indexOf(toId(altForme.requiredMove)) >= 0) return altForme.species;
		let item = pokemon.getItem('');
		if (item.megaEvolves !== pokemon.baseTemplate.baseSpecies || item.megaStone === pokemon.species) return false;
		return item.megaStone;
	},
	runMegaEvo: function (pokemon) {
		let template = this.getTemplate(pokemon.canMegaEvo);
		let side = pokemon.side;

		// Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
		let foeActive = side.foe.active;
		for (let i = 0; i < foeActive.length; i++) {
			if (foeActive[i].volatiles['skydrop'] && foeActive[i].volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		if (pokemon.species === 'Volcanion') {
			this.add('c| Volco| GO MEGA EVOLUTION IT\'S TIME FOR MY REAL POWER!');
			pokemon.baseTemplate = template; // mega evolution is permanent
			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			this.add('-mega', pokemon, template.baseSpecies, template.requiredItem);
			this.add('detailschange', pokemon, pokemon.details);
			pokemon.setAbility(template.abilities['0']);
			pokemon.baseAbility = pokemon.ability;
		} else {
			pokemon.formeChange(template);
			pokemon.baseTemplate = template; // mega evolution is permanent
			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			this.add('detailschange', pokemon, pokemon.details);
			this.add('-mega', pokemon, template.baseSpecies, template.requiredItem);
			pokemon.setAbility(template.abilities['0']);
			pokemon.baseAbility = pokemon.ability;
		}

		// Limit one mega evolution
		for (let i = 0; i < side.pokemon.length; i++) {
			side.pokemon[i].canMegaEvo = false;
		}
		return true;
	},
};
