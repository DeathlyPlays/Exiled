"use strict";

const RandomTeams = require("../../data/random-teams");

class RandomSeasonalMeleeTeams extends RandomTeams {
	randomSeasonalMeleeTeam() {
		let team = [];
		let sets = {
			//Admins
			"~AlfaStorm": {
				species: "Hydreigon",
				ability: "Attack Shield",
				item: "Focus Sash",
				gender: "M",
				moves: ["Flash Cannon", "Dark Pulse", "Draco Meteor"],
				signatureMove: "Dark Storm",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Timid",
			},
			"~flufi": {
				species: "Pikachu-Libre",
				ability: "Fighting Spirit",
				item: "Light Ball",
				gender: "M",
				moves: ["Thunder Punch", "High Jump Kick", "Fake Out"],
				signatureMove: "Cranberry Cutter",
				evs: {
					spe: 252,
					atk: 252,
					spd: 4,
				},
				nature: "Adamant",
			},
			"~Mewth": {
				species: "Furret",
				ability: "Roarplaying",
				item: "Scope Lens",
				gender: "F",
				moves: ["Fire Blast", "Blizzard", "Boomburst"],
				signatureMove: "Oblivion Banisher",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				ivs: {
					hp: 0,
				},
				nature: "Modest",
			},
			//Leaders
			"&C733937 123": {
				species: "Gengar-Mega",
				ability: "Chaotic Armor",
				item: "Aguav Berry",
				gender: "M",
				moves: ["Shadow Ball", "Pain Split", "Dark Pulse"],
				signatureMove: "Voodoo Magic",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Timid",
			},
			"&Chandie": {
				species: "Chandelure",
				ability: "Magma Overdrive",
				item: "Life Orb",
				gender: "M",
				moves: ["Secret Sword", "Moongeist Beam", "Conflagration"],
				signatureMove: "Solar Eruption",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Modest",
			},
			//Mods
			"@Insist": {
				species: "Ludicolo",
				ability: "Crippling Depression",
				item: "Playnium Z",
				gender: "M",
				shiny: true,
				moves: ["Freeze Dry", "Giga Drain", "Focus Blast"],
				signatureMove: "npm test",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				ivs: {
					hp: 0,
				},
				nature: "Timid",
			},
			"@Renfur": {
				species: "Flygon",
				ability: "Desert Dragon",
				item: "Life Orb",
				gender: "M",
				moves: ["Flamethrower", "Earth Power", "Dragon Pulse"],
				signatureMove: "It's My Time Now",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Modest",
			},
			//Drivers
			"%Almighty Judgment": {
				species: "Arceus",
				ability: "Almighty Presence",
				item: "Rainbow Plate",
				gender: "M",
				moves: ["Judgment", "Substitute", "Quiver Dance"],
				signatureMove: "Holy Dance",
				evs: {
					spa: 252,
					spe: 252,
					def: 4,
				},
				nature: "Timid",
			},
			"%Back At My Day": {
				species: "Zapdos",
				ability: "Cheap Move",
				item: "Choice Specs",
				gender: "M",
				moves: ["Moongeist Beam", "Earth Power", "Freeze-Dry"],
				signatureMove: "Fairy Beams",
				evs: {
					def: 4,
					spa: 252,
					spe: 252,
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
				moves: ["Aura Sphere", "Sludge Wave", "Psychic"],
				signatureMove: "Dark Storm",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			//Voices
			"+SnorlaxTheRain": {
				species: "Snorlax",
				ability: "Scraroom",
				item: "Snorlium Z",
				gender: "M",
				moves: ["Giga Impact", "Curse", "Rest"],
				signatureMove: "Snorlax Slam",
				evs: {
					hp: 164,
					atk: 224,
					spd: 120,
				},
				nature: "Adamant",
			},
			"+CielTSnow": {
				species: "Lucario-Mega",
				ability: "Adaptability",
				item: "Life Orb",
				moves: ["Flash Cannon", "Flamethrower", "Ice Beam"],
				gender: "M",
				signatureMove: "Pimp Slap",
				evs: {
					spa: 252,
					spe: 252,
					def: 6,
				},
				nature: "Timid",
			},
			"+shivay": {
				species: "Charizard-Mega-X",
				ability: "Bird Claws",
				item: "Health Orb",
				gender: "M",
				moves: ["Outrage", "Flare Blitz", "Roost"],
				signatureMove: "Dragonify",
				evs: {
					atk: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Adamant",
			},
			//Regs
			" Bouns": {
				species: "Tsareena",
				ability: "This queen got kicks",
				item: "LEGSium Z",
				gender: "F",
				moves: ["High Jump Kick", "Horn Leech", "Anchor Shot"],
				signatureMove: "Storm Kick",
				evs: {
					hp: 252,
					atk: 252,
					def: 4,
				},
				nature: "Adamant",
			},
		};
		// convert moves to IDs.
		for (let k in sets) {
			sets[k].moves = sets[k].moves.map(toId);
			sets[k].baseSignatureMove = toId(sets[k].baseSignatureMove);
		}

		// Generate the team randomly.
		let pool = this.shuffle(Object.keys(sets));
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

module.exports = RandomSeasonalMeleeTeams;
