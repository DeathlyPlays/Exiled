'use strict';
exports.BattleStatuses = {

};

//Example

insist: {
		exists: true,
		//Effect or Message when switching in
		onStart: function () {
			this.add('c', '@Insist', '__**^^Let\'s get roooooiiiiiiight into le noose!^^**__');
		},
		//Effect or Message when switching out
		onSwitchOut: function () {
			this.add('c', '@Insist', '/away coding');
		},
		//Effect or Message when fainting
		onFaint: function () {
			this.add('c', '@Insist', 'Oh now that I\'m dead, I guess that just means more time to code.');
		},
		//Effect or Message when KOing an opposing Pokemon
		onSourceFaint: function () {
			this.add('c', '@Insist', '**FOH THIS IS MY HOUSE KIDDO**');
		},
	},

