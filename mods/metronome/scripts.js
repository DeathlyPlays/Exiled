'use strict';

exports.BattleScripts = {
	randomSeasonalMeleeTeam: function (side) {
		let team = [];
		let sets = {
			"Alakazam": {
				species: "Alakazam-Mega",
				ability: "Trace",
				item: "Leppa Berry",
				shiny: true,
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Mew": {
				species: "Mew",
				ability: "Parental Bond",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Ambipom": {
				species: "Ambipom",
				ability: "Technician",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Banette": {
				species: "Banette-Mega",
				ability: "Prankster",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Blissey": {
				species: "Blissey",
				ability: "Serene Grace",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Celebi": {
				species: "Celebi",
				ability: "Natural Cure",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Clefable": {
				species: "Clefable",
				ability: "Unaware",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Dusknoir": {
				species: "Dusknoir",
				ability: "Pressure",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Gengar": {
				species: "Gengar-Mega",
				ability: "Levitate",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Golem": {
				species: "Golem",
				ability: "Sturdy",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Granbull": {
				species: "Granbull",
				ability: "Quick Feet",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Hariyama": {
				species: "Hariyama",
				ability: "Thick Fat",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Hitmonchan": {
				species: "Hitmonchan",
				ability: "Iron Fist",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Hitmonlee": {
				species: "Hitmonlee",
				ability: "Hitmonlee",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Hypno": {
				species: "Hypno",
				ability: "Insomnia",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Jirachi": {
				species: "Jirachi",
				ability: "Serene Grace",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Jynx": {
				species: "Jynx",
				ability: "Dry Skin",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Ludicolo": {
				species: "Ludicolo",
				ability: "Swift Swim",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Machamp": {
				species: "Machamp",
				ability: "No Guard",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Medicham": {
				species: "Medicham-Mega",
				ability: "Pure Power",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Mewtwo": {
				species: "Mewtwo",
				ability: "Unnerve",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Miltank": {
				species: "Miltank",
				ability: "Thick Fat",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Mr. Mime": {
				species: "Mr. Mime",
				ability: "Technician",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Politoed": {
				species: "Politoed",
				ability: "Drizzle",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Poliwrath": {
				species: "Poliwrath",
				ability: "Water Absorb",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Primeape": {
				species: "Primeape",
				ability: "Vital Spirit",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Sableye": {
				species: "Sableye-Mega",
				ability: "Magic Bounce",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Snorlax": {
				species: "Snorlax",
				ability: "Thick Fat",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Togekiss": {
				species: "Togekiss",
				ability: "Serene Grace",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
			},
			"Ursaring": {
				species: "Ursaring",
				ability: "Quick Feet",
				item: "Leppa Berry",
				moves: ['metronome', 'metronome', 'metronome'],
				signatureMove: "Metronome",
				nature: "Bashful",
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
