'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Stealth Rock', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should succeed against Substitute', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: "Smeargle", moves: ['stealthrock']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Ninjask", moves: ['substitute']}]);
		battle.makeChoices('move stealthrock', 'move substitute');
		assert(battle.p2.sideConditions['stealthrock']);
	});

	it('should deal damage to Pokemon switching in based on their type effectiveness against Rock-type', function () {
		battle = common.createBattle();
		battle.join('p1', 'Guest 1', 1, [{species: "Smeargle", moves: ['splash', 'stealthrock']}]);
		battle.join('p2', 'Guest 2', 1, [
			{species: "Ninjask", moves: ['protect']},
			{species: "Volcarona", moves: ['roost']},
			{species: "Staraptor", moves: ['roost']},
			{species: "Chansey", moves: ['wish']},
			{species: "Hitmonchan", moves: ['rest']},
			{species: "Steelix", moves: ['rest']},
		]);
		battle.makeChoices('move stealthrock', 'move protect');
		let pokemon;
		for (let i = 2; i <= 6; i++) {
			battle.makeChoices('move splash', 'switch ' + i);
			pokemon = battle.p2.active[0];
			assert.strictEqual(pokemon.maxhp - pokemon.hp, Math.floor(pokemon.maxhp * Math.pow(0.5, i - 1)));
		}
	});
});
