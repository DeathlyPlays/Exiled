'use strict';
exports.BattleStatuses = {
	insist: {
		exists: true,
		onStart: function () {
			this.add('c', '~Insist', '__**^^Let\'s get roooooiiiiiiight into le noose!^^**__');
		},
		onSwitchOut: function () {
			this.add('c', '~Insist', '/away coding');
		},
		onFaint: function () {
			this.add('c', '~Insist', 'Oh now that I\'m dead, I guess that just means more time to code.');
		},
		onSourceFaint: function () {
			this.add('c', '~Insist', '**FOH THIS IS MY HOUSE KIDDO**');
		},
	},
	lycaniumz: {
		exists: true,
		onStart: function () {
			this.add('c', '%Lycanium Z', 'Hi. Im that random guy noone thinks about');
		},
		onSwitchOut: function (pokemon) {
			this.add('c', '%Autograph', 'brb gonna change alts');
		},
		onFaint: function (pokemon) {
			this.add('c', '%Bellhop', 'lol im dead. Back to alt hunting');
		},
	},
	speckeldorft: {
		exists: true,
		onStart: function () {
			this.add('c', ' Speckeldorft', '**YYYEEAAHHHHHHHH BBBBBBBBBBBBBBBBOOOOOOOOOOOOOOOOOOOOIIIIIIIIIIIIIIIIIIIIIIIIII**');
		},
		onSwitchOut: function () {
			this.add('c', ' Speckeldorft', 'fuck you');
		},
		onFaint: function () {
			this.add('c', ' Speckeldorft', '__I was a ded meme.......__');
		},
	},
	abstarfox: {
		exists: true,
		onStart: function () {
			this.add('c', ' AB Starfox', 'Hello, just here to clean up');
		},
		onSwitchOut: function () {
			this.add('c', ' AB Starfox', 'Time for me to get a life');
		},
		onFaint: function () {
			this.add('c', ' AB Starfox', 'Once again I get lucked out smh');
		},
	},
	flufi: {
		exists: true,
		onStart: function () {
			this.add('c', '&flufi', 'Howdy');
		},
	},
	hoeenhero: {
		exists: true,
		onStart: function () {
			this.add('c', '%HoeenHero', 'Do I have to? I\'m in the middle of programming.');
		},
		onSwitchOut: function () {
			this.add('c', '%HoeenHero', 'I can\'t battle now, I\'m too busy.');
		},
		onFaint: function () {
			this.add('c', '%HoeenHero', 'Hey! Thats more hax than I get to use >:(');
		},
	},
	thegodofpie: {
		exists: true,
		onStart: function () {
			this.add('c', ' TheGodOfPie', 'my HP literally represents the amount of stupidity you have lol');
		},
		onSwitchOut: function () {
			this.add('c', ' TheGodOfPie', 'you\'re not using me properly ~~wait what~~');
		},
		onFaint: function () {
			this.add('c', ' TheGodOfPie', 'ur mom');
		},
		onSourceFaint: function () {
			this.add('c', ' TheGodOfPie', 'lmao dora fights better than you');
		},
	},
	almightyjudgment: {
		exists: true,
		onStart: function () {
			this.add('c', '+Almighty Judgment', 'M3RP');
		},
		onFaint: function () {
			this.add('c', '+Almighty Judgment', 'YOU THINK YOU HAVE BESTED ME? HAH, DON\'T MAKE ME LAUGH! I WILL BE BACK AND I WILL BE BACK STRONGER THAN EVER BEFORE!');
		},
		onSourceFaint: function () {
			this.add('c', '+Almighty Judgment', 'You Have Been Judged!');
		},
	},
	guiltasbr: {
		exists: true,
		onStart: function () {
			this.add('c', ' GuiltasBR', 'Prepare to get JOOJ!!!');
		},
		onFaint: function () {
			this.add('c', ' GuiltasBR', 'oh wow now i became a Ghost, Fighting type and be biatch');
		},
		onSourceFaint: function () {
			this.add('c', ' GuiltasBR', '');
		},
	},
	echosierra: {
		exists: true,
		onStart: function () {
			this.add('c', ' EchoSierra', 'lol fite me irl');
		},
		onFaint: function () {
			this.add('c', ' EchoSierra', '~~IIIINNNNSSSSIIISSSTTT~~ i mean gg wp');
		},
		onSwitchOut: function () {
			this.add('c', ' EchoSierra', 'bbl fam');
		},
		onSourceFaint: function () {
			this.add('c', ' EchoSierra', 'dasWRIGHT.jpg');
		},
	},
	krakenmare: {
		exists: true,
		onStart: function () {
			this.add('c', '@Kraken Mare', 'Today, I prove Gardevoir is the best Pokemon!');
		},
		onFaint: function () {
			this.add('c', '@Kraken Mare', 'Trust me, I\'ll be back to prove how strong Gardevoir is. __splashes__');
		},
		onSwitchOut: function () {
			this.add('c', '@Kraken Mare', 'I shall spare you today, young one!');
		},
		onSourceFaint: function () {
			this.add('c', '@Kraken Mare', 'Told Ya Gardevoir is Strong!');
		},
	},
	horrific17: {
		exists: true,
		onStart: function () {
			this.add('c', '%Horrific17', 'It seems you\'ve made a __horrific__ mistake');
		},
		onFaint: function () {
			this.add('c', '%Horrific17', 'I never expected my death to be this... __horrific__');
		},
	},
	klefkei: {
		exists: true,
		onStart: function () {
			this.add('c', '@Klefkei', 'Hi Toxic Whore :) Ready To Die? kappa');
		},
		onFaint: function () {
			this.add('c', '@Klefkei', '/exile');
		},
	},
	linkcode: {
		exists: true,
		onStart: function () {
			this.add('c', ' LinkCode', 'I\'m a cool cat makin\' waves all over town! When they see me comin\', everybody\'s heads turn \'round!');
		},
		onSwitchOut: function () {
			this.add('c', ' LinkCode', '**Later, Nerd.**');
		},
		onFaint: function () {
			this.add('c', ' LinkCode', 'Yeah, well, you know, that\'s just, like, uh... your opinion, man.');
		},
	},
	douglasgamer: {
		exists: true,
		onFaint: function () {
			this.add('c', ' douglasgamer', 'I\'ve lost! But I have a message! I AM NOT A NINETALES AMATEUR');
		},
		onStart: function () {
			this.boost({spa: 1});
		},
	},
	volco: {
		exists: true,
		onStart: function () {
			this.boost({spe: 1});
		},
	},
	wobbleleez: {
		exists: true,
		onStart: function () {
			this.boost({def: 1, spd: 1});
		},
	},
	failures: {
		exists: true,
		onStart: function () {
			this.boost({spe: 1});
		},
	},
	chesnaught90000: {
		exists: true,
		onStart: function () {
			this.boost({spe: 1});
		},
	},
	chandie: {
		exists: true,
		onModifyMove: function (move) {
			if (move.id === 'ember') {
				move.name = 'Fast Flame';
				move.basePower = 85;
				move.priority = 2;
				move.onTryHit = function (target, source) {
					this.attrLastMove('[still]');
					this.add('-anim', source, "Flame Burst", target);
				};
			}
		},
	},
};
