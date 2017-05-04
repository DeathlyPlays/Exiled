'use strict';

exports.BattleScripts = {
	randomAdvancedWarsTeam: function (side) {
		let team = [];
		let sets = {
			"Infantry": {
				species: "Infantry",
				ability: "Lucky",
				moves: ['infgun'],
				nature: "Serious",
			},
			"Mech": {
				species: "Mech",
				ability: "Lucky",
				moves: ['bazooka', 'mechgun'],
				nature: "Serious",
			},
			"Light Tank": {
				species: "Light Tank",
				ability: "Lucky",
				moves: ['lcannon', 'tankgun'],
				nature: "Serious",
			},
			"MD Tank": {
				species: "MD Tank",
				ability: "Lucky",
				moves: ['mdcannon', 'mdtankgun'],
				nature: "Serious",
			},
			"Neotank": {
				species: "Neotank",
				ability: "Lucky",
				moves: ['neocannon', 'neogun'],
				nature: "Serious",
			},
			"Artillery": {
				species: "Artillery",
				ability: "Lucky",
				moves: ['artilleryception'],
				nature: "Serious",
			},
			"Rocket": {
				species: "Rocket",
				ability: "Lucky",
				moves: ['rocketception'],
				nature: "Serious",
			},
			"Missile": {
				species: "Missile",
				ability: "Lucky",
				moves: ['missileception'],
				nature: "Serious",
			},
			"Anti-Air": {
				species: "Anti-Air",
				ability: "Lucky",
				moves: ['vulcan'],
				nature: "Serious",
			},
			"Cruiser": {
				species: "Cruiser",
				ability: "Lucky",
				moves: ['cmissiles', 'aairgun'],
				nature: "Serious",
			},
			"Battleship": {
				species: "Battleship",
				ability: "Lucky",
				moves: ['battleception'],
				nature: "Serious",
			},
			"Submarine": {
				species: "Submarine",
				ability: "Lucky",
				moves: ['torps'],
				nature: "Serious",
			},
			"Battle Copter": {
				species: "Battle Copter",
				ability: "Lucky",
				moves: ['bmissile', 'bcoptergun'],
				nature: "Serious",
			},
			"Fighter": {
				species: "Fighter",
				ability: "Lucky",
				moves: ['fmissiles'],
				nature: "Serious",
			},
			"Bomber": {
				species: "Bomber",
				ability: "Lucky",
				moves: ['bombs'],
				nature: "Serious",
			},
		};

		let pool = Object.keys(sets);
		for (let i = 0; i < 6; i++) {
			let name = this.sampleNoReplace(pool);
			let set = sets[name];
			set.name = name;
			set.level = 100;
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)];
			team.push(set);
		}
		return team;
	},
};