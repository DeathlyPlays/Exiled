'use strict';

//Credit to Gen NEXT for the style concept for this
exports.BattleScripts = {
	init: function () {
		//Type Adjustments
		this.modData('Pokedex', 'cherrimsunshine').types = ['Grass', 'Fire'];
		this.modData('Pokedex', 'golduck').types = ['Water', 'Psychic'];
		this.modData('Pokedex', 'flygon').types = ['Bug', 'Dragon'];
		this.modData('Pokedex', 'luxray').types = ['Electric', 'Dark'];
		this.modData('Pokedex', 'milotic').types = ['Water', 'Fairy'];
		this.modData('Pokedex', 'granbull').types = ['Fairy', 'Fighting'];

		// Tail Glow :D
		this.modData('Learnsets', 'finneon').learnset.tailglow = ['7L100'];
		this.modData('Learnsets', 'lumineon').learnset.tailglow = ['7L100'];
		this.modData('Learnsets', 'mareep').learnset.tailglow = ['7L100'];
		this.modData('Learnsets', 'ampharos').learnset.tailglow = ['7L100'];
		this.modData('Learnsets', 'chinchou').learnset.tailglow = ['7L100'];
		this.modData('Learnsets', 'lanturn').learnset.tailglow = ['7L100'];

		// Spinda: Contrary
		this.modData('Learnsets', 'spinda').learnset.vcreate = ['7L100'];
		this.modData('Learnsets', 'spinda').learnset.superpower = ['7L100'];
		this.modData('Learnsets', 'spinda').learnset.closecombat = ['7L100'];
		this.modData('Learnsets', 'spinda').learnset.overheat = ['7L100'];
		this.modData('Learnsets', 'spinda').learnset.leafstorm = ['7L100'];
		this.modData('Learnsets', 'spinda').learnset.dracometeor = ['7L100'];
	},
};
