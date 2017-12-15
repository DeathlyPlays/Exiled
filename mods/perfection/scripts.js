'use strict';

//Credit to Gen NEXT for the style concept for this
exports.BattleScripts = {
	init: function () {
		// Type Adjustments
		this.modData('Pokedex', 'cherrimsunshine').types = ['Grass', 'Fire'];
		this.modData('Pokedex', 'golduck').types = ['Water', 'Psychic'];
		this.modData('Pokedex', 'flygon').types = ['Bug', 'Dragon'];
		this.modData('Pokedex', 'luxray').types = ['Electric', 'Dark'];
		this.modData('Pokedex', 'milotic').types = ['Water', 'Fairy'];
		this.modData('Pokedex', 'granbull').types = ['Fairy', 'Fighting'];
		this.modData('Pokedex', 'huntail').types = ['Water', 'Dark'];
		this.modData('Pokedex', 'gorebyss').types = ['Water', 'Psychic'];
		this.modData('Pokedex', 'lunatone').types = ['Rock', 'Psychic', 'Fairy'];
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
		// Various Things
		this.modData('Learnsets', 'aerodactyl').learnset.bravebird = ['7L100'];
		this.modData('Learnsets', 'stunfisk').learnset.recover = ['7L100'];
		this.modData('Learnsets', 'bastiodon').learnset.kingsshield = ['7L100'];
		this.modData('Learnsets', 'phione').learnset.calmmind = ['7M'];
		this.modData('Learnsets', 'castform').learnset.earthpower = ['7L100'];
		this.modData('Learnsets', 'milotic').learnset.moonblast = ['7L100'];
		this.modData('Learnsets', 'bronzong').learnset.healbell = ['7T'];
		this.modData('Learnsets', 'magikarp').learnset.magikarpsrevenge = ['7L100'];
		this.modData('Learnsets', 'raticate').learnset.honeclaws = ['7M'];
		this.modData('Learnsets', 'sharpedo').learnset.firefang = ['7L100'];
		this.modData('Learnsets', 'sharpedo').learnset.thunderfang = ['7L100'];
		this.modData('Learnsets', 'huntail').learnset.firefang = ['7L100'];
		this.modData('Learnsets', 'huntail').learnset.thunderfang = ['7L100'];
		this.modData('Learnsets', 'huntail').learnset.psychicfang = ['7L100'];
		this.modData('Learnsets', 'qwilfish').learnset.spikyshield = ['7L100'];
		// Abilities
		this.modData('Pokedex', 'unown').abilities['1'] = 'Shadow Tag';
		this.modData('Pokedex', 'huntail').abilities['1'] = 'Strong Jaw';
		this.modData('Pokedex', 'gorebyss').abilities['1'] = 'Magic Bounce';
		this.modData('Pokedex', 'carbink').abilities['1'] = 'Luster';
		this.modData('Pokedex', 'kecleon').abilities['1'] = 'Type Camo';
		this.modData('Pokedex', 'castform').abilities['H'] = 'Climate Change';
		this.modData('Pokedex', 'flygon').abilities['1'] = 'Compound Eyes';
		this.modData('Pokedex', 'flygon').abilities['H'] = 'Insectize';
		this.modData('Pokedex', 'pangoro').abilities['H'] = 'Shadow Rush';
		this.modData('Pokedex', 'zangoose').abilities['1'] = 'Belligerent';
	},
};
