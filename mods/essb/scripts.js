'use strict';

exports.BattleScripts = {
	randomSeasonalMeleeTeam: function (side) {
		let userid = toId(side.name);
		let team = [];
		let sets = {
			//Admins
			"~Insist": {
				species: "Ludicolo",
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
				item: "Assault Vest",
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
				moves: ['slackoff', 'dragonforce', 'earthpower'],
				baseSignatureMove: "bump",
				signatureMove: "Bump",
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
			"&Lord Coldwraith": {
				species: "Froslass",
				ability: "Necropower",
				item: "Focus Sash",
				gender: "M",
				moves: ['quiverdance', 'iceburn', 'oblivionwing'],
				baseSignatureMove: "shadowforceimpact",
				signatureMove: "Shadowforce Impact",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Modest",
			},
			//Bots
			"*Crystal Ludicolo": {
				species: "Ludicolo",
				ability: "Desolate Land",
				item: "Life Orb",
				gender: "M",
				shiny: true,
				moves: ['freezedry', 'solarbeam', 'earthpower'],
				baseSignatureMove: "mymixtape",
				signatureMove: "My Mixtape",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			//Moderators
			"@Mewth": {
				species: "Glameow",
				ability: "Sniper",
				item: "Scope Lens",
				gender: "F",
				moves: ['extremespeed', 'nightslash', 'psychocut'],
				baseSignatureMove: "roleplaying",
				signatureMove: "Roleplaying",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Jolly",
			},
			"@Eelek": {
				species: "Eelektross",
				ability: "Ace in the Hole",
				item: "Power Current",
				gender: "M",
				moves: ['Bug Buzz', 'Glaciate', 'Hydro Pump'],
				baseSignatureMove: "electrofryer",
				signatureMove: "Electro-Fryer",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Timid",
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
			//Voices
			"+C733937 123": {
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
			"+AlfaStorm": {
				species: "Hydreigon",
				ability: "Attack Shield",
				item: "Focus Sash",
				gender: "M",
				moves: ['crunch', 'dracometeor', 'darkpulse'],
				baseSignatureMove: "darkstorm",
				signatureMove: "Dark Storm",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Adamant",
			},
			"+Perison": {
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
			"+Beeky": {
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
			//Regs
			"TheAquaPhoenix": {
				species: "Articuno",
				ability: "How to be OP 101",
				item: "Leftovers",
				gender: "M",
				shiny: true,
				moves: ['freezedry', 'oblivionwing', 'roost'],
				signatureMove: "Scald",
				evs: {
					hp: 252,
					spd: 252,
					spa: 4,
				},
				nature: "Calm",
			},
			"Nightcraven": {
				species: "Missingno.",
				ability: "Derp",
				item: "Focus Sash",
				moves: ['closecombat', 'knockoff', 'dragonascent'],
				gender: "M",
				baseSignatureMove: "evictus",
				signatureMove: "Evictus",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Adamant",
			},
			"PaxAxeBrichu": {
				species: "Golbat",
				ability: "RIP You",
				item: "Eviolite",
				gender: "M",
				moves: ['roost', 'airslash', 'uturn'],
				baseSignatureMove: "repel",
				signatureMove: "Repel",
				evs: {
					hp: 248,
					def: 252,
					spa: 8,
				},
				nature: "Impish",
			},
			"THEMEMES69": {
				species: "Mewtwo",
				ability: "Speed Boost",
				item: "thekidz",
				gender: "M",
				moves: ['psystrike', 'aurasphere', 'icebeam'],
				baseSignatureMove: "attitudeadjustment",
				signatureMove: "Attitude Adjustment",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			"HoeenHero": {
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
			"Sukesha": {
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
			"Kimisumi": {
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
			"CielTSnow": {
				species: "Lucario-Mega",
				ability: "Adaptability",
				item: "Life Orb",
				gender: "M",
				moves: ['flashcannon', 'flamethrower', 'icebeam'],
				baseSignatureMove: "pimpslap",
				signatureMove: "Pimp Slap",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			"EmoGuy3000": {
				species: "Mewtwo-Mega-Y",
				ability: "Contrary",
				item: "Choice Specs",
				gender: "M",
				moves: ['vcreate', 'dracometeor'],
				signatureMove: "Psycho Boost",
				evs: {
					spa: 252,
					spe: 252,
					atk: 4,
				},
				nature: "Hasty",
			},
			"Vivid is a God": {
				species: "Latios",
				ability: "JetStream",
				item: "Life Orb",
				gender: "M",
				moves: ['psychic', 'surf', 'fireblast'],
				baseSignatureMove: "jetblast",
				signatureMove: "Jet Blast",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			"AB Starfox": {
				species: "Staraptor",
				ability: "Hiya",
				item: "Life Orb",
				gender: "M",
				shiny: true,
				moves: ['swordsdance', 'pluck', 'roost'],
				baseSignatureMove: "fastasfucc",
				signatureMove: "Fast as Fucc",
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Kairak": {
				species: "Nidorina",
				ability: "gj squad",
				item: "Focus Sash",
				gender: "M",
				moves: ['extremespeed', 'precipiceblades', 'knockoff'],
				baseSignatureMove: "bowingandblowing",
				signatureMove: "Bowing and Blowing",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Jolly",
			},
			"Speckeldorft": {
				species: "Jigglypuff",
				ability: "The Cute Charm",
				item: "Eviolite",
				gender: "M",
				moves: ['recover', 'storedpower', 'boomburst'],
				baseSignatureMove: "fuckingnormies",
				signatureMove: "FUCKING NORMIES",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Timid",
			},
			"Yoshonic": {
				species: "Zoroark",
				ability: "Too Fast",
				item: "Life Orb",
				gender: "M",
				moves: ['aurasphere', 'psystrike', 'sludgewave'],
				baseSignatureMove: "downb",
				signatureMove: "Down B",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			"UB-03 Xurkitree": {
				species: "Xurkitree",
				ability: "feelsfly",
				item: "Relic of Choiceness",
				gender: "M",
				moves: ['energyball', 'fireblast', 'icebeam'],
				baseSignatureMove: "superflyslaser",
				signatureMove: "Super Flys Laser",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Modest",
			},
			"Philmiester": {
				species: "Gallade-Mega",
				ability: "Demon's Blade",
				item: "Leftovers",
				gender: "M",
				moves: ['drainpunch', 'psychocut', 'icepunch'],
				baseSignatureMove: "heathcliffsrevenge",
				signatureMove: "Heathcliff's Revenge",
				evs: {
					atk: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Jolly",
			},
			"TheGodOfPie": {
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
			"Hax Orus 04": {
				species: "Haxorus",
				ability: "Prism Armor",
				item: "Haxium Z",
				moves: ['dragondance', 'dragonclaw', 'earthquake'],
				gender: "M",
				baseSignatureMove: "haxe",
				signatureMove: "H-Axe",
				evs: {
					atk: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Adamant",
			},
		};
		// Generate the team randomly.
		let pool = Tools.shuffle(Object.keys(sets));
		let levels = {'~':99, '☥':98, '&':97, '@':96, '%':95, '+':95, ' ': 94};
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

		pokemon.formeChange(template);
		pokemon.baseTemplate = template; // mega evolution is permanent
		pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
		this.add('detailschange', pokemon, pokemon.details);
		this.add('-mega', pokemon, template.baseSpecies, template.requiredItem);
		pokemon.setAbility(template.abilities['0']);
		pokemon.baseAbility = pokemon.ability;

		// Limit one mega evolution
		for (let i = 0; i < side.pokemon.length; i++) {
			side.pokemon[i].canMegaEvo = false;
		}
		return true;
	},
};
