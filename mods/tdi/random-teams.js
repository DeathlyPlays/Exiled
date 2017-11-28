'use strict';

const RandomTeams = require('../../data/random-teams');

class RandomTDITeams extends RandomTeams {
	randomTDITeam() {
		let team = [];
		let sets = {
			'Heather': {
				species: 'Arbok',
				ability: 'Prankster',
				item: 'Grip Claw',
				gender: 'F',
				moves: ['bitchslap', 'flee', 'kick', 'trashtalk'],
				evs: {
					atk: 252,
					spe: 248,
					spd: 8,
				},
				nature: 'Sassy',
			},
			'Gwen': {
				species: 'Gothorita',
				ability: 'Inner Focus',
				item: 'Eviolite',
				gender: 'F',
				moves: ['insult', 'scratch', 'charm', 'stealboyfriend'],
				evs: {
					atk: 96,
					spa: 132,
					hp: 252,
					def: 32,
				},
				nature: 'Impish',
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

module.exports = RandomTDITeams;
