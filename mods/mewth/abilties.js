'use strict';

exports.BattleAbilities = {
	"insectize": {
		desc: "This Pokemon's Normal-type moves become Bug-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Bug Type and have 1.2x power.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift' && !move.isZ) {
				move.type = 'Bug';
				if (move.category !== 'Status') pokemon.addVolatile('insectize');
			}
		},
		effect: {
			duration: 1,
			onBasePowerPriority: 8,
			onBasePower: function (basePower, pokemon, target, move) {
				return this.chainModify([0x1333, 0x1000]);
			},
		},
		id: "insectize",
		name: "Insectize",
		rating: 4,
		num: -182,
	},
	"frozenspectral": {
		shortDesc: "This Pokemon's ballistic moves have a 50% chance of freezing.",
		// upokecenter says this is implemented as an added secondary effect
		onModifyMove: function (move) {
			if (!move || !move.flags["bullet"]) return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 50,
				status: 'frz',
				ability: this.getAbility('frozenspectral'),
			});
		},
		id: "frozenspectral",
		name: "Frozen Spectral",
		rating: 4,
		num: -143,
	},
	"pikabond": {
		desc: "If this Pokemon is a Pikachu, it transforms into Ash-Pikachu after knocking out a Pokemon. As Ash-Pikachu Thunderbolt hits twice.",
		shortDesc: "After KOing a Pokemon: becomes Ash-Pikachu. Thunderbolt hits twice.",
		onSourceFaint: function (target, source, effect) {
			if (effect && effect.effectType === 'Move' && source.template.speciesid === 'pikachu' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Pika Bond');
				let template = this.getTemplate('Pikachu-Ash');
				source.formeChange(template);
				source.baseTemplate = template;
				source.details = template.species + (source.level === 100 ? '' : ', L' + source.level) + (source.gender === '' ? '' : ', ' + source.gender) + (source.set.shiny ? ', shiny' : '');
				this.add('detailschange', source, source.details);
			}
		},
		onModifyMove: function (move, attacker) {
			if (move.id === 'thunderbolt' && attacker.template.species === 'Pikachu-Ash') {
				move.multihit = 2;
			}
		},
		id: "pikabond",
		name: "Pika Bond",
		rating: 3,
		num: 0,
	},
	"luster": {
		id: "luster",
		name: "Luster",
		onStart: function (pokemon, source) {
			this.useMove('Reflect', pokemon);
			this.useMove('Light Screen', pokemon);
		},
	},
};