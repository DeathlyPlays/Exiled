"use strict";

exports.BattleStatuses = {
	insist: {
		exists: true,
		onStart: function () {
			this.add("c", "@Insist", "__**^^Let's get roooooiiiiiiight into le noose!^^**__");
		},
		onSwitchOut: function () {
			this.add("c", "~Insist", "/away coding");
		},
		onFaint: function () {
			this.add("c", "~Insist", "Oh now that I'm dead, I guess that just means more time to code.");
		},
		onSourceFaint: function () {
			this.add("c", "~Insist", "**FOH THIS IS MY HOUSE KIDDO**");
		},
	},

	flufi: {
		exists: true,
		onStart: function () {
			this.add("c", "~flufi", "Howdy");
		},
	},

	chandie: {
		exists: true,
		onModifyMove: function (move) {
			if (move.id === "ember") {
				move.name = "Fast Flame";
				move.basePower = 85;
				move.priority = 2;
				move.onTryHit = function (target, source) {
					this.attrLastMove("[still]");
					this.add("-anim", source, "Flame Burst", target);
				};
			}
		},
	},
	snorlaxtherain: {
		exists: true,
		onStart: function () {
			this.add('c', '+SnorlaxTheRain', 'Fat Snorlax has arrived!');
		},
		onSwitchOut: function (pokemon) {
			this.add('c', '+SnorlaxTheRain', 'Be right back enemies! Snorsnor');
		},
		onFaint: function (pokemon) {
			this.add('c', '+SnorlaxTheRain', 'Even though u have won, I will still sleep and regain my energy in order to fight against u once more!');
		},
	},
};
