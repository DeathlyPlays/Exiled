'use strict';

exports.BattleScripts = {
	//added in order to implement we have a Cosmic Z-Move
	zMoveTable: {
		Poison: "Acid Downpour",
		Fighting: "All-Out Pummeling",
		Dark: "Black Hole Eclipse",
		Grass: "Bloom Doom",
		Normal: "Breakneck Blitz",
		Rock: "Continental Crush",
		Steel: "Corkscrew Crash",
		Dragon: "Devastating Drake",
		Electric: "Gigavolt Havoc",
		Water: "Hydro Vortex",
		Fire: "Inferno Overdrive",
		Ghost: "Never-Ending Nightmare",
		Bug: "Savage Spin-Out",
		Psychic: "Shattered Psyche",
		Ice: "Subzero Slammer",
		Flying: "Supersonic Skystrike",
		Ground: "Tectonic Rage",
		Fairy: "Twinkle Tackle",
		Cosmic: "Ultimate Supernova",
	},

	getCategory(move) {
		move = this.getMove(move);
		let cat = move.category;
		if (this.pseudoWeather["midlifecrisis"]) {
			if (cat === "Special") return "Physical";
			if (cat === "Physical") return "Special";
		}
		return cat || 'Physical';
	},
};
