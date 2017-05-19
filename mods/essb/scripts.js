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
			"~Volco": {
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
			"&Back At My Day": {
				species: "Dialga",
				ability: "Time Traveler",
				item: "Rocky Helmet",
				gender: "M",
				moves: ['aeroblast', 'steameruption', 'freezedry'],
				baseSignatureMove: "roleplaying",
				signatureMove: "Roleplaying",
				evs: {
					def: 48,
					spa: 252,
					spd: 208,
				},
				ivs: {
					hp: 31,
					atk: 0,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 0,
				},
				nature: "Quiet",
			},
			"&Mewth": {
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
			"&ggdaca":{
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
			"*Princess Teddiursa": {
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
			"@Letter W": {
				species: "Scizor-Mega",
				ability: "Heavenly Guard",
				item: "Manna",
				gender: "M",
				moves: ['sunsteelstrike', 'knockoff', 'precipiceblades'],
				baseSignatureMove: "insectplague",
				signatureMove: "Insect Plague",
				evs: {
					spe: 252,
					atk: 252,
					spd: 4,
				},
				nature: "Jolly",
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
			"@Chandie": {
				species: "Chandelure",
				ability: "Magma Overdrive",
				item: "Life Orb",
				gender: "M",
				moves: ['fierydance', 'moongeistbeam', 'energyball'],
				baseSignatureMove: "solareruption",
				signatureMove: "Solar Eruption",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Modest",
			},
			//Drivers
			"%Wobbleleez": {
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
			"%flufi": {
				species: "Altaria-Mega",
				ability: "The Waggling",
				item: "Eject Button",
				gender: "M",
				moves: ['Fleur Cannon', 'Draco Meteor', 'Volt Switch', 'Cotton Guard'],
				evs: {
					hp: 252,
					spa: 108,
					spd: 144,
				},
				nature: "Modest",
			},
			"%AlfaStorm": {
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
			"%Noviex": {
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
			"%Kraken Mare": {
				species: "Gardevoir-Mega",
				ability: "Moody",
				shiny: true,
				item: "Leftovers",
				gender: "F",
				moves: ['moonblast', 'calmmind', 'psychic'],
				baseSignatureMove: "megarage",
				signatureMove: "Mega Rage",
				evs: {
					hp: 248,
					spa: 252,
					def: 8,
				},
				nature: "Modest",
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
				species: "Flygon",
				ability: "DesertDragon",
				item: "Focus Sash",
				moves: ['earthquake', 'dragonclaw', 'stoneedge'],
				baseSignatureMove: "outripper",
				signatureMove: "Outripper",
				evs: {
					atk: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Jolly",
			},
			"+Kevso": {
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
			//Regs
			" UB-01 Symbi0nt": {
				species: "Mawile-Mega",
				ability: "No Hax",
				item: "Choice Scarf",
				gender: "F",
				moves: ['knockoff', 'playrough', 'icepunch'],
				shiny: true,
				baseSignatureMove: "doublejawtackle",
				signatureMove: "Double Jaw Tackle",
				evs: {
					atk: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Adamant",
			},
			" HoeenHero": {
				species: "Ludicolo",
				ability: "Swift Swim",
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
				nature: "Modest",
			},
			" Kimisumi": {
				species: "Gallade-Mega",
				ability: "God Complex",
				item: "Life Orb",
				gender: "F",
				moves: ['precipiceblades', 'closecombat', 'extremespeed'],
				baseSignatureMove: "strikeyoudown",
				signatureMove: "Strike You Down",
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
				moves: ['suckerpunch', 'extremespeed', 'bulletpunch'],
				baseSignatureMove: "thepowerofpi",
				signatureMove: "The Power of Pi",
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			" Chesnaught90000": {
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
			" 007Nilo": {
				species: "Zoroark",
				ability: "Master of Illusions",
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
			" Bronze0re": {
				species: "Kyurem-White",
				ability: "Lord of Winter",
				item: "Never-Melt Ice",
				gender: "M",
				shiny: true,
				moves: ['quiverdance', 'iceburn', 'oblivionwing'],
				baseSignatureMove: "soulreaper",
				signatureMove: "Soul Reaper",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			" Horrific17": {
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
			this.add('c|~Volco| GO MEGA EVOLUTION IT\'S TIME FOR MY REAL POWER!');
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
