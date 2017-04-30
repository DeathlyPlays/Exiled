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
				species: "Furret-Mega",
				ability: "Roarplaying",
				item: "Scope Lens",
				gender: "F",
				moves: ['nightslash', 'shadowclaw', 'return'],
				baseSignatureMove: "oblivionbanisher",
				signatureMove: "Oblivion Banisher",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Adamant",
			},
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
			//Drivers
			"@VXN": {
				species: "Pikachu",
				ability: "Sys-OP",
				item: "Faustian Bargain",
				gender: "M",
				moves: ['boltstrike', 'iciclecrash', 'sacredsword'],
				baseSignatureMove: "hotpatch",
				signatureMove: "Hotpatch",
				evs: {
					spe: 252,
					atk: 252,
					def: 4,
				},
				nature: "Jolly",
			},
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
			"%AlfaStorm": {
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
				nature: "Hasty",
			},
			//Voices
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
			"+beeky": {
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
			"+Chandie": {
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
			"+Noviex": {
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
			//Regs
			" TheAquaPhoenix": {
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
			" Nightcraven": {
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
			" Sukesha": {
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
			" CielTSnow": {
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
			" EmoGuy3000": {
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
			" Vivid is a God": {
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
			" AB Starfox": {
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
			" Speckeldorft": {
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
			" UB-03 Xurkitree": {
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
			" Hax Orus 04": {
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
			" Almighty Bronzong": {
				species: "Bronzong",
				ability: "Conflict of Interest",
				item: "Leftovers",
				moves: ['recover', 'toxic', 'earthquake'],
				gender: "N",
				baseSignatureMove: "momentofinertia",
				signatureMove: "Moment of Inertia",
				evs: {
					hp: 252,
					def: 88,
					spd: 168,
				},
				ivs: {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 0,
				},
				nature: "Relaxed",
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
			" UniversalCraftr": {
				species: "Pyukumuku",
				ability: "Trade-Off",
				item: "General Annoyance",
				moves: ['batonpass', 'shoreup', 'substitute'],
				gender: "M",
				baseSignatureMove: "hinderance",
				signatureMove: "Hinderance",
				evs: {
					hp: 252,
					def: 4,
					spd: 252,
				},
				nature: "Bold",
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
		};
		// Generate the team randomly.
		let pool = Tools.shuffle(Object.keys(sets));
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
