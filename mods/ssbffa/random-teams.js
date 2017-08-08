'use strict';

const RandomTeams = require('../../data/random-teams');

const fs = require('fs');

function extend(obj, src) {
	for (let key in src) {
		if (src.hasOwnProperty(key)) obj[key] = src[key];
	}
	return obj;
}

let ESSB = JSON.parse(fs.readFileSync('config/ssb.json', 'utf-8'));

class RandomCustomSSBTeams extends RandomTeams {
	randomCustomSSBTeam() {
		//let ESSB = JSON.parse(fs.readFileSync('config/ssb.json', 'utf-8'));
		let team = [];
		let variant = this.random(2);

		//Parse player objects into sets.
		let ssbSets = {};
		for (let key in ESSB) {
			if (!ESSB[key].active) continue; //This pokemon is not to be used yet.
			ssbSets[(ESSB[key].symbol + ESSB[key].name)] = {};
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].name = ESSB[key].name;
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].species = ESSB[key].species;
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].ability = ESSB[key].ability;
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].item = ESSB[key].item;
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].gender = (ESSB[key].gender === 'random' ? ((variant === 1) ? 'M' : 'F') : ESSB[key].gender);
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].moves = ESSB[key].movepool;
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].signatureMove = ESSB[key].cMove;
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].evs = ESSB[key].evs;
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].ivs = ESSB[key].ivs;
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].nature = ESSB[key].nature;
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].level = parseInt(ESSB[key].level);
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].shiny = ESSB[key].shiny;
			ssbSets[(ESSB[key].symbol + ESSB[key].name)].happiness = ESSB[key].happiness;
		}

		//var sets = extend(baseSets, ssbSets);
		let backupSet = {
			'Unown': {
				species: 'Unown',
				ability: 'Levitate',
				item: 'Choice Specs',
				moves: ['Hidden Power'],
				evs: {
					spa: 252,
					spd: 252,
					hp: 4,
				},
				nature: 'Modest',
			},
		};
		let sets;
		if (Object.keys(ssbSets).length === 0) {
			sets = extend(ssbSets, backupSet);
		} else {
			sets = ssbSets;
		}

		for (let k in sets) {
			sets[k].moves = sets[k].moves.map(toId);
			if (sets[k].baseSignatureMove) sets[k].baseSignatureMove = toId(sets[k].baseSignatureMove);
		}

		// Generate the team randomly.
		let pool = Object.keys(sets);
		for (let i = 0; i < (Object.keys(sets).length < 6 ? Object.keys(sets).length : 6); i++) {
			let name = this.sampleNoReplace(pool);
			/*if (i === 1 && ESSB[toId(side.name)] && ESSB[toId(side.name)].active && sets[(ESSB[toId(side.name)].symbol + ESSB[toId(side.name)].name)] && pool.indexOf((ESSB[toId(side.name)].symbol + ESSB[toId(side.name)].name)) !== -1) {
				pool.push(name); //re-add
				name = pool[pool.indexOf((ESSB[toId(side.name)].symbol + ESSB[toId(side.name)].name))];
				pool.splice(pool.indexOf(name), 1);
			}*/
			let set = sets[name];
			set.name = name;
			if (!set.level) set.level = 100;
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
			if (set.signatureMove) {
				set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			}
			team.push(set);
		}
		return team;
	}
}

module.exports = RandomCustomSSBTeams;