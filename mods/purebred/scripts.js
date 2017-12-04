'use strict';

exports.BattleScripts = {
	breedable: function () {
		if (party[0].gender === 'M' && party[1].gender === 'F' || party[0].gender === 'F' && party[1].gender === 'M') {
			return true;
		} else {
			return false;
		}
	},
	onValidateTeam: function (pokemon) {
		if (!pokemon.breedable) return ["The Pok\u00E9mon in your first and second slot must be opposite genders."];
	},
};