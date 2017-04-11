'use strict';

exports.BattleScripts = {
	randomSeasonalMeleeTeam: function (side) {
		let team = [];
		let sets = {
			'Scrafty': {
				species: 'Scrafty',
				ability: 'Rock Head',
				item: 'Leftovers',
				gender: 'M',
				moves: ['highjumpkick', 'headsmash', 'bravebird'],
				baseSignatureMove: "hoodlumswarm",
				signatureMove: "Hoodlum Swarm",
				evs: {
					atk: 252,
					hp: 248,
					def: 8,
				},
				nature: 'Adamant',
			},
			'Aggron': {
				species: 'Aggron-Mega',
				ability: 'Rock Head',
				item: 'Leftovers',
				gender: 'M',
				moves: ['headsmash', 'woodhammer', 'flareblitz'],
				baseSignatureMove: 'ironwarhammer',
				signatureMove: 'Iron War Hammer',
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: 'Adamant',
			},
			'Relicanth': {
				species: 'Relicanth',
				ability: 'Rock Head',
				item: 'Choice Band',
				gender: 'F',
				moves: ['headsmash', 'headcharge', 'flareblitz'],
				baseSignatureMove: "ireallycan",
				signatureMove: "I Really Can",
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: 'Adamant',
			},
			'Emboar': {
				species: 'Emboar',
				ability: 'Reckless',
				item: 'Choice Scarf',
				gender: 'M',
				moves: ['flareblitz', 'highjumpkick', 'volttackle'],
				signatureMove: 'Head Smash',
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: 'Jolly',
			},
			'Hydreigon': {
				species: 'Hydreigon',
				ability: 'Reckless',
				item: 'Life Orb',
				gender: 'M',
				moves: ['headsmash', 'hydra', 'bravebird'],
				baseSignatureMove: 'evilintentions',
				signatureMove: 'Evil Intentions',
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: 'Jolly',
			},
			'Corsola': {
				species: 'Corsola',
				ability: 'Rock Head',
				item: 'Zoom Lens',
				gender: 'F',
				moves: ['headsmash', 'lightofruin', 'flareblitz'],
				baseSignatureMove: "toostronk",
				signatureMove: "TOO STRONK",
				evs: {
					spa: 252,
					hp: 252,
					atk: 4,
				},
				nature: 'Quiet',
			},
			'Nidoking': {
				species: 'Nidoking',
				ability: 'Sheer Force',
				item: 'Life Orb',
				gender: 'M',
				moves: ['headsmash', 'volttackle', 'shatteringearth'],
				baseSignatureMove: 'trashtalk',
				signatureMove: 'Trash Talk',
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: 'Jolly',
			},
			'Gyaratoast': {
				species: 'Gyarados',
				ability: 'Rock Head',
				item: 'Choice Scarf',
				gender: 'F',
				shiny: true,
				moves: ['headsmash', 'bravebird', 'doubleedge'],
				baseSignatureMove: "breadsmash",
				signatureMove: "BREADSMASH",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: 'Jolly',
			},
			'Smeargle': {
				species: 'Smeargle',
				ability: 'Huge Power',
				item: 'Focus Sash',
				gender: 'M',
				moves: ['headsmash', 'highjumpkick', 'bravebird'],
				signatureMove: 'Head Charge',
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: 'Jolly',
			},
			'Rampardos': {
				species: 'Rampardos',
				ability: 'Reckless',
				item: 'Choice Scarf',
				gender: 'M',
				moves: ['headsmash', 'highjumpkick', 'doubleedge'],
				signatureMove: 'Brave Bird',
				evs: {
					atk: 252,
					spe: 252,
					hp: 4,
				},
				nature: 'Jolly',
			},
			'Donphan': {
				species: 'Donphan',
				ability: 'Rock Head',
				item: 'Leftovers',
				gender: 'M',
				moves: ['headsmash', 'flareblitz', 'woodhammer'],
				baseSignatureMove: 'shatteringearth',
				signatureMove: 'Shattering Earth',
				evs: {
					atk: 252,
					hp: 248,
					def: 8,
				},
				nature: 'Adamant',
			},
			'Aegislash': {
				species: 'Aegislash',
				ability: 'Stance Change',
				item: 'Air Balloon',
				gender: 'M',
				moves: ['metalsword', 'headsmash', 'flareblitz'],
				baseSignatureMove: "livingintheshadows",
				signatureMove: "Living in the Shadows",
				evs: {
					atk: 252,
					hp: 252,
					def: 4,
				},
				nature: 'Adamant',
			},
			'Tyrantrum': {
				species: 'Tyrantrum',
				ability: 'Rock Head',
				item: 'Choice Scarf',
				gender: 'M',
				moves: ['headsmash', 'flareblitz', 'bravebird'],
				baseSignatureMove: "tyrantsrage",
				signatureMove: "Tyrant's Rage",
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: 'Jolly',
			},
			'Archeops': {
				species: 'Archeops',
				ability: 'Reckless',
				item: 'Life Orb',
				moves: ['headsmash', 'bravebird', 'flareblitz'],
				signatureMove: 'Wood Hammer',
				evs: {
					atk: 252,
					spe: 252,
					def: 4,
				},
				nature: 'Jolly',
			},
		};

		let pool = Object.keys(sets);
		for (let i = 0; i < 6; i++) {
			let name = this.sampleNoReplace(pool);
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
