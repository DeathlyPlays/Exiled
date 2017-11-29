'use strict';

const RandomTeams = require('../../data/random-teams');

class RandomSeasonalMeleeTeams extends RandomTeams {
	randomSeasonalMeleeTeam() {
		let team = [];
		let sets = {
			//Admins
			"~Mewth": {
				species: "Furret-Mega",
				ability: "Roarplaying",
				item: "Scope Lens",
				gender: "F",
				moves: ['fireblast', 'blizzard', 'boomburst', 'oblivionbanisher'],
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Modest",
			},
			//Leaders
			"&flufi": {
				species: "Darmanitan",
				ability: "Iron Fist",
				item: "Fist Plate",
				gender: "M",
				moves: ['Fire Punch', 'Thunder Punch', 'Mega Kick'],
				baseSignatureMove: "knockoutpunch",
				signatureMove: "Knockout Punch",
				evs: {
					spe: 252,
					atk: 252,
					spd: 4,
				},
				nature: "Adamant",
			},
			//Mods
			"@Insist": {
				species: "Ludicolo-Mega",
				ability: "Crippling Depression",
				item: "Playnium Z",
				gender: "M",
				shiny: true,
				moves: ['freezedry', 'gigadrain', 'focusblast'],
				baseSignatureMove: "npmtest",
				signatureMove: "npm test",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			//Drivers
			//Voices
			//Regs
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
