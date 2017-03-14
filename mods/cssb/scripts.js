'use strict';

Array.prototype.randomize = function() {
	let arr = this.slice(0);
	var i = arr.length,
		j, x;
	while (i) {
		j = (Math.random() * i) | 0;
		x = arr[--i];
		arr[i] = arr[j];
		arr[j] = x;
	}
	return arr;
};

const replaceAlts = {};

exports.BattleScripts = {
	randomSeasonalMeleeTeam: function(side) {
		let team = [];
		var variant = (this.random(2) === 1);
		var sets = {
			//Room Owners
			'#HealNDeal': {
				species: 'Magmar',
				ability: 'Fluffy',
				item: 'Eviolite',
				gender: 'M',
				moves: ['quiverdance', 'seedflare', 'substitute'],
				baseSignatureMove: "uberboober",
				signatureMove: "Uber Boober",
				evs: {
					hp: 248,
					spa: 92,
					spe: 168
				},
				nature: "Modest",
			},
			//Mods
			'@Deck Knight': {
				species: "Cyclohm",
				ability: "Fluffy",
				gender: "M",
				item: 'Binding Band',
				moves: ['dracometeor', 'discharge', 'slackoff'],
				baseSignatureMove: "piratedfirewall",
				signatureMove: "Pirated Firewall",
				evs: {
					hp: 252,
					def: 144,
					spd: 112
				},
				nature: 'Bold',
			},
			'@Animus Majulous': {
				species: "Sunkern",
				ability: "Chlorophyll",
				item: "Bright Powder",
				gender: "M",
				moves: ['leechseed', 'earthpower', 'sunnyday'],
				baseSignatureMove: "empoweredendeavor",
				signatureMove: "Empowered Endeavor",
				evs: {
					hp: 252,
					spe: 252,
					spa: 4
				},
				nature: "Serious",
			},
			'@gday': {
				species: "Jigglypuff",
				ability: "gday gday",
				item: "Eviolite",
				gender: "M",
				moves: ['recover', 'storedpower', 'moonblast'],
				baseSignatureMove: "feelsjig",
				signatureMove: "feelsjig",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				nature: "Modest",
			},
			'@cbrevan': {
				species: "Revenankh",
				ability: "Speed Boost",
				item: "Choice Band",
				gender: "M",
				moves: ['closecombat', 'diamondstorm', 'meteormash'],
				baseSignatureMove: "randsalad",
				signatureMove: "randsalad",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				nature: "Adamant",
			},
			//Drivers
			'%Exclaimer': {
				species: 'Camerupt',
				ability: 'Persistent',
				item: 'Cameruptite',
				gender: "F",
				moves: ['trickroom', 'fireblast', 'paleowave'],
				baseSignatureMove: 'stickyearthpower',
				signatureMove: 'Sticky Earth Power',
				evs: {
					spa: 252,
					hp: 252,
					def: 4
				},
				nature: 'Quiet',
			},
			'%Sunfished': {
				species: "Stunfisk",
				ability: "Prankster",
				item: "Leftovers",
				gender: "M",
				moves: ['thunderwave', 'toxic', 'earthpower'],
				signatureMove: "Thunderbolt",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				nature: "Modest",
			},
			'%Khosro': {
				species: "Sceptile-Mega",
				ability: "Tough Claws",
				item: "Life Orb",
				gender: "M",
				moves: ['leafblade', 'precipiceblades', 'closecombat'],
				baseSignatureMove: "choke",
				signatureMove: "Choke",
				evs: {
					atk: 252,
					spe: 252,
					def: 4
				},
				nature: "Jolly",
			},
			'%EpicUmbreon29': {
				species: 'Umbreon',
				ability: 'Simple',
				item: 'Leftovers',
				gender: 'M',
				moves: ['trickpower', 'cosmicpower', 'storedpower'],
				baseSignatureMove: "sorry",
				signatureMove: "Sorry",
				evs: {
					hp: 248,
					spd: 252,
					def: 8
				},
				nature: 'Calm',
			},
			//Voices
			'+JigglykongisFUM16': {
				species: "Spheal",
				ability: "MLG Sunglasses",
				item: "Eviolite",
				gender: "M",
				moves: ['scald', 'recover', 'toxic'],
				baseSignatureMove: 'sphealwithit',
				signatureMove: "Spheal with It",
				evs: {
					hp: 252,
					def: 252,
					spa: 4
				},
				nature: 'Bold',
			},
			'+vulpix mayhem': {
				species: "Vulpix",
				ability: "Prepare for Mayhem",
				item: "Focus Sash",
				gender: "F",
				moves: ['moonblast', 'aurasphere', 'protect'],
				baseSignatureMove: "mayhem",
				signatureMove: "MAYHEM",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				nature: "Timid",
			},
			'+DJTHED': {
				species: "Leafeon",
				ability: "Adaptability",
				item: "Life Orb",
				gender: "M",
				moves: ['leafblade', 'knockoff', 'stoneedge'],
				signatureMove: "Swords Dance",
				evs: {
					atk: 252,
					spe: 136,
					hp: 120
				},
				nature: "Adamant",
			},
			'+boxofkangaroos': {
				species: "Kangaskhan",
				ability: "Scrappy",
				item: "Silk Scarf",
				gender: "M",
				moves: ['fakeout', 'doubleedge', 'closecombat'],
				baseSignatureMove: "boxcutter",
				signatureMove: "Box Cutter",
				evs: {
					atk: 252,
					spe: 252,
					hp: 4
				},
				nature: "Adamant",
			},
			'+Snobalt': {
				species: "Voodoom",
				ability: "Amity Absorb",
				item: "Life Orb",
				gender: "M",
				moves: ['quiverdance', 'aurasphere', 'vacuumwave'],
				baseSignatureMove: "capbust",
				signatureMove: "CAP Bust",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4
				},
				nature: "Timid",
			},
			'+Tamas': {
				species: "Paras",
				ability: "Dank Sunlord",
				item: "Life Orb",
				gender: "M",
				moves: ['bugbuzz', 'flamethrower', 'gigadrain'],
				baseSignatureMove: "smokeweederryday",
				signatureMove: "Smoke Weed Erry Day",
				evs: {
					spa: 252,
					spe: 252,
					hp: 4
				},
				nature: "Timid",
			},
			'+GiantWhirlpool': {
				species: "Slowbro-Mega",
				ability: "Regenerator",
				item: "Leftovers",
				gender: "M",
				moves: ['slackoff', 'toxic', 'calmmind'],
				signatureMove: 'Whirlpool',
				evs: {
					hp: 252,
					def: 252,
					spd: 4
				},
				nature: "Bold",
			},
			'+Bionic Puppy': {
				species: "Amoonguss",
				ability: "Shadow Tag",
				item: "Mental Herb",
				gender: "M",
				moves: ['spore', 'nightmare', 'dreameater'],
				baseSignatureMove: "mushroomascent",
				signatureMove: "Mushroom Ascent",
				evs: {
					spa: 252,
					hp: 252,
					spe: 4
				},
				nature: "Modest",
			},
			'+Quanyalis': {
				species: "Ninetales",
				ability: "Pixilate",
				item: "Life Orb",
				gender: "F",
				moves: ['nastyplot', 'spacialrend', 'technoblast'],
				baseSignatureMove: "raycast",
				signatureMove: "Raycast",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4
				},
				nature: "Timid",
			},
			//Regs
			"Insist": {
				species: "Mollux",
				item: "Choice Scarf",
				ability: "Turbo",
				gender: "M",
				shiny: true,
				moves: ['fireblast', 'hydropump', 'thunder'],
				baseSignatureMove: 'borkthecode',
				signatureMove: "Bork the Code",
				evs: {
					spa: 252,
					spe: 252,
					spd: 4
				},
				nature: "Timid",
			},
		};

		let pool = Object.keys(sets);

		// Generate the team randomly.
		pool = Object.keys(sets).randomize();

		// replace the user into the 4th slot
		let userid = toId(side.name);
		if (replaceAlts[userid]) userid = replaceAlts[userid];

		let usermon = Object.keys(sets).filter(n => toId(n) === userid),
			self = null;
		if (usermon && usermon.length) self = usermon[0]; // this is the user's pokemon. 
		if (self && pool.indexOf(self) > 5) pool[4] = self;

		for (let i = 0; i < 6; i++) {
			let name = pool[i];
			let set = sets[name];
			set.name = name;
			set.level = 100;
			if (!set.ivs) {
				set.ivs = {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31
				};
			}
			else {
				for (let iv in {
						hp: 31,
						atk: 31,
						def: 31,
						spa: 31,
						spd: 31,
						spe: 31
					}) {
					set.ivs[iv] = iv in set.ivs ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {
				hp: 84,
				atk: 84,
				def: 84,
				spa: 84,
				spd: 84,
				spe: 84
			};
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			team.push(set);
		}

		return team;
	},
};
