'use strict';

exports.BattleScripts = {
	randomSeasonalMeleeTeam: function(side) {
		let team = [];
		let sets = {
			"New Years": {
				species: "Spinda",
				ability: "Contrary",
				item: "Leftovers",
				gender: "M",
				level: 95,
				moves: ['drainpunch', 'vcreate', 'superpower'],
				signatureMove: "Extreme Speed",
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Christmas": {
				species: "Delibird",
				ability: "Gale Wings",
				item: "Focus Sash",
				gender: "M",
				level: 96,
				moves: ['present', 'iciclecrash', 'swordsdance'],
				signatureMove: "Acrobatics",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Jolly",
			},
			"Hanukkhah": {
				species: "Chandelure",
				ability: "Sheer Force",
				item: "Choice Scarf",
				gender: "M",
				level: 86,
				moves: ['shadowball', 'blueflare', 'seedflare'],
				signatureMove: "Moonblast",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4,
				},
				nature: "Timid",
			},
			"Thanksgiving": {
				species: "Ho-Oh",
				ability: "Multiscale",
				item: "Leftovers",
				gender: "M",
				level: 72,
				moves: ['sacredfire', 'precipiceblades', 'roost'],
				signatureMove: "Brave Bird",
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: "Adamant",
			},
			"Independence Day": {
				species: "Braviary",
				ability: "Sheer Force",
				item: "Choice Scarf",
				gender: "M",
				shiny: true,
				level: 85,
				moves: ['rockslide', 'bodyslam', 'bravebird'],
				signatureMove: "U-Turn",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Jolly",
			},
			"Valentines": {
				species: "Luvdisc",
				ability: "Primordial Sea",
				item: "Focus Sash",
				gender: "F",
				level: 96,
				moves: ['hydropump', 'blizzard', 'hurricane'],
				signatureMove: "Attract",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4,
				},
				nature: "Timid",
			},
			"April Fools": {
				species: "Sableye",
				ability: "Prankster",
				item: "Leftovers",
				level: 84,
				moves: ['willowisp', 'recover', 'cosmicpower'],
				signatureMove: "Foul Play",
				evs: {
					hp: 252,
					def: 252,
					spd: 4,
				},
				nature: "Bold",
			},
			"Earth Day": {
				species: "Exeggutor",
				ability: "Harvest",
				item: "Sitrus Berry",
				gender: "M",
				level: 93,
				moves: ['aromatherapy', 'toxic', 'synthesis'],
				signatureMove: "Giga Drain",
				evs: {
					hp: 252,
					def: 252,
					spd: 4,
				},
				nature: "Bold",
			},
			"Halloween": {
				species: "Gourgeist-Super",
				ability: "Prankster",
				item: "Leftovers",
				gender: "M",
				level: 94,
				moves: ['spore', 'hornleech', 'synthesis'],
				signatureMove: "Cosmic Power",
				evs: {
					hp: 252,
					def: 252,
					atk: 4,
				},
				nature: "Impish",
			},
			"St. Patricks": {
				species: "Budew",
				ability: "Prankster",
				item: "Power Herb",
				gender: "M",
				level: 100,
				moves: ['gigadrain', 'geomancy', 'recycle'],
				signatureMove: "Toxic",
				evs: {
					hp: 252,
					spd: 252,
					spa: 4,
				},
				nature: "Calm",
			},
		};

		let pool = Object.keys(sets);
		for (let i = 0; i < 6; i++) {
			let name = this.sampleNoReplace(pool);
			let set = sets[name];
			set.name = name;
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
