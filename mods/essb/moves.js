'use strict';

exports.BattleMovedex = {
	//insist
	"aquasubscribe": {
		id: "aquasubscribe",
		name: "Aqua Subscribe",
		priority: 1,
		self: {
			boosts: {
				spa: 1,
				spe: 1,
			},
		},
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: false,
		category: "Special",
		onHit: function (target, source, move) {
			this.add('c|~Insist|Subscribe to http://youtube.com/DeathlyPlays');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Pump", target);
		},
		basePower: 90,
		pp: 15,
		accuracy: 100,
		target: "normal",
		type: "Water",
		zMovePower: 140,
		contestType: "Cool",
	},
	//Insist
	"exiledfromallothers": {
		id: "exiledfromallothers",
		name: "Exiled From All Others",
		basePower: 140,
		accuracy: 100,
		pp: 0.625,
		secondary: false,
		category: "Special",
		isViable: true,
		isZ: "playniumz",
		priority: 1,
		flags: {
			protect: 1,
		},
		self: {
			boosts: {
				atk: 1,
				def: 1,
				spa: 1,
				spd: 1,
				spe: 1,
			},
		},
		shortDesc: "Like so amazing mannnnn, like look at dem boosts boi",
		onHit: function (target, source, move) {
			this.add('c|~Insist|Exiled from all others, we shall become greater than ever before.');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Pump", target);
		},
		target: "normal",
		type: "Water",
	},
	//Jigglykong
	"plasmablast": {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		id: "plasmablast",
		name: "Plasma Blast",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: [{
			chance: 20,
			status: 'brn',
		}],
		onPrepareHit: function (target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Techno Blast", target);
		},
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Electric', type);
		},
		target: "normal",
		type: "Normal",
	},
	//cieltsnow
	"pimpslap": {
		id: "pimpslap",
		name: "Pimp Slap",
		basePower: 90,
		accuracy: 100,
		pp: 15,
		priority: 1,
		self: {
			boosts: {
				spa: 1,
				spe: 1,
			},
		},
		secondary: false,
		category: "Special",
		onHit: function (target, source, move) {
			this.add('c| CielTSnow|Who\'s getting slapped next!?!?!');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Blast", target);
		},
		flags: {
			protect: 1,
			mirror: 1,
		},
		target: "normal",
		type: "Fighting",
	},
	//catequil
	"fuckingsplashing": {
		id: "fuckingsplashing",
		name: "FUCKING SPLASHING",
		self: {
			boosts: {
				atk: 2,
				spe: 2,
				def: 2,
				spd: 2,
				accuracy: 2,
			},
		},
		basePower: 120,
		accuracy: 100,
		pp: 15,
		priority: 0,
		secondary: false,
		category: "Physical",
		onHit: function (target, source, move) {
			this.add('c| CateQuil|SPLASH');
		},
		flags: {},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Splash", target);
			this.add('-anim', source, "Magikarp's Revenge", target);
		},
		type: "Water",
		target: "normal",
	},
	"methmemesandedgyteens": {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		id: "methmemesandedgyteens",
		name: "Meth, Memes, and Edgy Teens",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spd: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
		zMovePower: 120,
		contestType: "Tough",
	},
	//vividisagod
	"jetblast": {
		id: "jetblast",
		name: "Jet Blast",
		pp: 5,
		priority: 0,
		basePower: 140,
		category: "Special",
		accuracy: 100,
		onHit: function (target, source, move) {
			this.add('c| Vivid is a God|JET FUMES DON\'T MELT STEEL BEAMS!!!!!!');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Draco Meteor", target);
			this.add('-anim', source, "Focus Blast", target);
		},
		type: "Dragon",
		flags: {
			protect: 1,
			mirror: 1,
		},
		target: "normal",
	},
	//Jigglykong
	"sphealwithit": {
		id: "sphealwithit",
		name: "Spheal with It",
		basePower: 0,
		priority: 0,
		accuracy: 100,
		pp: 15,
		category: "Status",
		secondary: false,
		onHit: function (target, source, move) {
			this.add('c|&Jigglykong|Spheal with It!');
		},
		boosts: {
			def: 2,
			spa: 2,
			spe: 2,
			spd: 2,
			accuracy: 2,
		},
		flags: {
			snatch: 1,
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('-still');
			this.add('-anim', source, "Quiver Dance", target);
		},
		target: "self",
		type: "Water",
	},
	"exile": {
		isNonstandard: true,
		accuracy: 100,
		category: "Special",
		id: "exile",
		isViable: true,
		name: "Exile",
		pp: 10,
		priority: 0,
		basePower: 80,
		self: {
			onHit: function (pokemon, target, move) {
				// substitute moves
				function setMove(oldMove, moveid) {
					let index = pokemon.moves.indexOf(oldMove);
					if (index === -1) return;
					let move = Dex.getMove(moveid);
					let sketchedMove = {
						move: move.name,
						id: move.id,
						pp: move.pp,
						maxpp: move.pp,
						target: move.target,
						disabled: false,
						used: false,
					};
					pokemon.moveset[index] = sketchedMove;
					pokemon.moves[index] = toId(move.name);
				}
				let subs = [
					["aurasphere", "recover"],
					["sludgewave", "storedpower"],
					["psychic", "cosmicpower"],
				];
				if (pokemon.template.speciesid === 'darkrai' && pokemon.formeChange('Cresselia')) {
					subs.forEach(s => setMove(s[0], s[1]));
					this.add('-formechange', pokemon, 'Cresselia', '[msg]');
				} else if (pokemon.formeChange('Cresselia')) {
					subs.forEach(s => setMove(s[1], s[0]));
					this.add('-formechange', pokemon, 'Darkrai', '[msg]');
				}
				// make changing form available in consecutive turns
				delete pokemon.volatiles.stall;
			},
		},
		flags: {
			protect: 1,
			distance: 1,
		},
		target: "any",
		type: "Dark",
	},
	//backatmyday
	"roleplaying": {
		id: "roleplaying",
		name: "Roleplaying",
		basePower: 120,
		accuracy: 100,
		pp: 10,
		priority: 0,
		secondary: false,
		category: "Special",
		onHit: function (target, source, move) {
			this.add('c|&Back At My Day|Am I the only one who roleplays?');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Roar of Time", target);
		},
		flags: {
			protect: 1,
			mirror: 1,
		},
		type: "Steel",
		target: "normal",
	},
	//happysong
	"strikeyoudown": {
		id: "strikeyoudown",
		name: "Strike You Down",
		basePower: 110,
		accuracy: 100,
		priority: 0,
		pp: 10,
		secondary: false,
		category: "Physical",
		type: "Psychic",
		onHit: function (target, source, move) {
			this.add('c| Kimisumi|I\'m gonna strike you down right now!');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psycho Cut", target);
		},
		flags: {
			protect: 1,
			mirror: 1,
			contact: 1,
		},
		target: "Normal",
	},
	//bedevil
	"prfmador": {
		id: "prfmador",
		name: "prfmador",
		accuracy: 100,
		basePower: 90,
		pp: 15,
		priority: 0,
		self: {
			boosts: {
				spa: 1,
				spe: 1,
			},
		},
		status: "frz",
		category: "Special",
		flags: {
			protect: 1,
			mirror: 1,
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Nasty Plot", target);
			this.add('-anim', source, "Blizzard", target);
		},
		type: "Ice",
		target: "normal",
	},
	//sotahigurashi
	"zencreate": {
		id: "zencreate",
		name: "Zen Create",
		accuracy: 95,
		basePower: 180,
		category: "Physical",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1,
			protect: 1,
			mirror: 1,
		},
		self: {
			boosts: {
				spe: -1,
				def: -1,
				spd: -1,
			},
		},
		onHit: function (target, source, move) {
			this.add('c|☥Sota Higurashi|Don\'t forget about me....');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "V-Create", target);
		},
		secondary: false,
		target: "normal",
		type: "Psychic",
	},
	//philmiester
	"heathcliffsrevenge": {
		id: "heathcliffsrevenge",
		name: "Heathcliff's Revenge",
		category: "Status",
		basePower: 0,
		priority: 0,
		accuracy: 100,
		flags: {
			snatch: 1,
		},
		boosts: {
			atk: 2,
			spe: 2,
		},
		pp: 20,
		secondary: false,
		onHit: function (target, source, move) {
			this.add('c| Philmiester|I\'m here to avenge Heathcliff <3');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Dance", target);
		},
		type: "Psychic",
		target: "self",
	},
	//AB Starfox
	"fuckthismatchup": {
		accuracy: 70,
		basePower: 110,
		category: "Special",
		id: "fuckthismatchup",
		name: "Fuck This Matchup",
		pp: 15,
		priority: 1,
		flags: {
			protect: 1,
			mirror: 1,
		},
		onTryHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
		},
		onEffectiveness: function (typeMod, type) {
			if (type === 'Steel') return 1;
		},
		secondary: {
			chance: 30,
			volatileStatus: "confusion",
		},
		target: "normal",
		type: "Flying",
	},
	//kairak
	"bowingandblowing": {
		id: "bowingandblowing",
		name: "Bowing and Blowing",
		category: "Physical",
		basePower: 95,
		accuracy: 100,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			contact: 1,
		},
		secondary: {
			chance: 40,
			status: "tox",
		},
		pp: 15,
		onHit: function (target, source, move) {
			this.add('c| Kairak|Bowing and blowing, gj squad.');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Jab", target);
		},
		type: "Poison",
		target: "normal",
	},
	//volco
	"volcanosrevenge": {
		id: "volcanosrevenge",
		name: "Volcano's Revenge",
		pp: 10,
		basePower: 120,
		accuracy: 100,
		flags: {
			protect: 1,
			mirror: 1,
			defrost: 1,
		},
		secondary: {
			chance: 20,
			volatileStatus: "confusion",
		},
		defensiveCategory: "Physical",
		self: {
			chance: 20,
			boosts: {
				spa: 1,
				spe: 1,
			},
		},
		category: "Special",
		priority: 0,
		onHit: function (target, source, move) {
			this.add('c|~Volco|SEE YOU ALL IN HELL!!!!!!!!');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Steam Eruption", target);
		},
		target: "normal",
		type: "Fire",
	},
	//bronze0re
	"dyingstar": {
		id: "dyingstar",
		name: "Dying Star",
		basePower: 250,
		category: "Special",
		accuracy: true,
		priority: 1,
		pp: 5,
		flags: {
			protect: 1,
			mirror: 1,
			defrost: 1,
		},
		selfdestruct: "always",
		onHit: function (target, source, move) {
			this.add('c|&Bronze0re|RIP Star');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Explosion", target);
		},
		type: "Fire",
		target: "normal",
		secondary: false,
	},
	//supanova
	"supernova": {
		id: "supernova",
		name: "Supernova",
		ohko: true,
		accuracy: true,
		selfdestruct: true,
		basePower: 0,
		category: "Physical",
		priority: 1,
		pp: 5,
		flags: {
			protect: 1,
			mirror: 1,
			defrost: 1,
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Explosion", target);
		},
		type: "Fire",
		target: "normal",
		secondary: false,
	},
	//speckeldorft
	"fuckingnormies": {
		id: "fuckingnormies",
		name: "FUCKING NORMIES",
		basePower: 70,
		accuracy: true,
		pp: 15,
		category: "Special",
		priority: 0,
		drain: [1, 2],
		self: {
			boosts: {
				def: 1,
				spa: 1,
				spd: 1,
				spe: 1,
			},
		},
		secondary: {
			volatileStatus: 'confusion',
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Voice", target);
		},
		onHit: function (target, source, move) {
			this.add('c| Speckeldorft|FUCKING NORMIES');
			this.add('c| Speckeldorft|RRRRRRRRRRRRRRREEEEEEEEEEEEEEEEEEEEEEE');
		},
		target: "normal",
		flags: {
			snatch: 1,
			protect: 1,
		},
		type: "Fairy",
	},
	//yoshonic
	"downb": {
		id: "downb",
		name: "Down B",
		pp: 15,
		basePower: 120,
		accuracy: 100,
		category: "Special",
		priority: 1,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Extreme Speed", target);
			this.add('-anim', source, "Storm Throw", target);
			this.add('-anim', source, "Egg Bomb", target);
		},
		flags: {
			protect: 1,
			mirror: 1,
		},
		self: {
			boosts: {
				spa: 1,
				spe: 1,
			},
		},
		secondary: false,
		target: "normal",
		type: "Dark",
	},
	"cripplingkiss": {
		id: "cripplingkiss",
		name: "Crippling Kiss",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
			reflectable: 1,
		},
		onHit: function (target, source, move) {
			if (target.status === 'psn' || target.status === 'tox') {
				return this.boost({atk:-1, spa:-1, spe:-1}, target, source, move);
			}
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Leech Seed', target);
			this.add('-anim', source, 'Attract', target);
			this.add('-anim', source, 'Confuse Ray', target);
			this.add('-anim', source, "String Shot", target);
			return false;
		},
		secondary: {
			volatileStatus: "confusion",
		},
		status: "tox",
		volatileStatus: "leechseed",
		effect: {
			onStart: function (target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onResidualOrder: 8,
			onResidual: function (pokemon) {
				let target = this.effectData.source.side.active[pokemon.volatiles['leechseed'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				let damage = this.damage(pokemon.maxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onTryHit: function (target) {
			if (target.hasType('Grass')) {
				this.add('-immune', target, '[msg]');
				return null;
			}
		},
		boosts: {
			spe: -2,
		},
		self: {
			heal: [1, 4],
		},
		target: "normal",
		type: "Fairy",
	},
	"evictus": {
		id: "evictus",
		name: "Evictus",
		basePower: 120,
		accuracy: 100,
		pp: 15,
		secondary: false,
		category: "Physical",
		self: {
			boosts: {
				atk: 1,
				spe: 1,
			},
		},
		priority: 1,
		onHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Quick Attack', target);
		},
		flags: {
			protect: 1,
			contact: 1,
		},
		target: "normal",
		type: "Normal",
	},
	"repel": {
		id: "repel",
		name: "Repel",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		secondary: false,
		volatileStatus: 'confusion',
		onHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Teleport', target);
		},
		status: 'par',
		priority: 0,
		category: "Status",
		ignoreImmunity: true,
		onModifyMove: function (move, pokemon, target) {
			move.type = '???';
		},
		flags: {
			protect: 1,
			sound: 1,
			authentic: 1,
			reflectable: 1,
		},
		type: "Normal",
		target: "normal",
	},
	"fastasfucc": {
		id: "fastasfucc",
		name: "Fast as Fucc",
		basePower: 60,
		pp: 15,
		accuracy: 100,
		flags: {
			protect: 1,
			mirror: 1,
		},
		desc: "Base 60 Normal Type priority move which is super effective on steel types, 30% chance to raise Speed by 1",
		priority: 1,
		onTryHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quick Attack", target);
		},
		onEffectiveness: function (typeMod, type) {
			if (type === 'Steel') return 1;
		},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		onHit: function (target, source, move) {
			this.add('c| AB Starfox|I don\'t think you have any idea how fast I really am, I\'m fast as fucc boiiiiii');
		},
		target: "normal",
		type: "Normal",
	},
	"attitudeadjustment": {
		id: "attitudeadjustment",
		name: "Attitude Adjustment",
		basePower: 0,
		accuracy: 30,
		category: "Physical",
		onHit: function (target, source, move) {
			this.add('c| THEMEMES69|**YOU CAN\'T SEE ME!!!!!!!!!!**');
		},
		ohko: true,
		pp: 5,
		priority: 0,
		secondary: false,
		flags: {
			protect: 1,
			contact: 1,
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 150,
	},
	"acceptthememes": {
		id: "acceptthememes",
		name: "Accept The Memes",
		basePower: 0,
		accuracy: true,
		category: "Physical",
		onHit: function (target, source, move) {
			this.add('c| THEMEMES69|GET MEMED OR DIE TRYING!');
		},
		ohko: true,
		pp: 0.625,
		secondary: false,
		flags: {
			protect: 1,
			contact: 1,
		},
		priority: 0,
		target: "normal",
		type: "Fighting",
		isZ: "thekidz",
	},
	//VXN
	"psychocrusher": {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		id: "psychocrusher",
		name: "Psycho Crusher",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Darkest Lariat", target);
		},
		ignoreEvasion: true,
		ignoreDefensive: true,
		ignoreImmunity: {'Psychic': true},
		secondary: false,
		target: "normal",
		type: "Psychic",
	},
	//HoeenHero
	"scripting": {
		category: "Special",
		id: "scripting",
		isNonstandard: true,
		name: "Scripting",
		pp: 10,
		basePower: 60,
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		priority: 0,
		self: {
			boosts: {
				spa: 2,
				spd: 1,
			},
		},
		onHit: function (source) {
			this.setWeather('raindance');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('', '>>> let p=p2.pokemon.find(p => p.speciesid===\'ludicolo\'); battle.boost({spa:1,spe:1},p); battle.setWeather(\'raindance\', p); for(let i in p1.pokemon) if(p1.pokemon[i].isActive) { p1.pokemon[i].setStatus(\'confusion\'); break;}');
			this.add('-anim', source, "Calm Mind", target);
			this.add('-anim', source, "Geomancy", target);
		},
		target: "Normal",
		type: "Psychic",
	},
	"superflyslaser": {
		id: "superflyslaser",
		name: "Super Flys Laser",
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: {
			chance: 30,
			volatileStatus: "confusion",
		},
		category: "Special",
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Beam", target);
		},
		basePower: 120,
		pp: 15,
		accuracy: 95,
		target: "normal",
		type: "Electric",
	},
	//C7
	"voodoomagic": {
		id: "voodoomagic",
		name: "Voodoo Magic",
		//added the description mainly so I can see what all he wanted since this is quite a lot
		desc: "Voodoo Magic: ??? type, Priority 0(1), Status, 90% Acc, Goes through Substitutes, Ignores Abilities, Doesn't Bounce. Puts a curse on the opponent that does a hideous amount of bad effects. (User takes 1/4 HP damage then Taunts, Torments, Mean Looks, Embargos, Clears Stats, Heal Blocks, Removes ability, Spites, Flinches, and removes all shields. Taunt, Embargo, and Heal Block last for 10 turns, Stat Clear, Flinch, and Spite happen on turn move used, rest last till switch (haha lol no switching for you) Does not fail if user is less than 1/4 hp)",
		basePower: 0,
		category: "Status",
		priority: 0,
		accuracy: 90,
		pp: 10,
		flags: {
			authentic: 1,
			reflectable: 1,
		},
		ignoresAbility: true,
		self: {
			onHit: function (target, source) {
				this.directDamage(source.maxhp / 4, source, source);
			},
			effect: {
				duration: 10,
				onStart: function (pokemon, source) {
					this.add('-start', pokemon, 'Voodoo Magic', '[of] ' + source);
				},
				onResidualOrder: 10,
				onResidual: function (pokemon) {
					this.damage(pokemon.maxhp / 4);
				},
			},
		},
		onStart: function (pokemon, source) {
			this.add('-start', pokemon, 'Voodoo Magic');
		},
		// Item suppression implemented in BattlePokemon.ignoringItem() within battle-engine.js
		onResidualOrder: 18,
		onEnd: function (pokemon) {
			this.add('-end', pokemon, 'Voodoo Magic');
		},
		onHit: function (target, source, move) {
			if (!target.addVolatile('trapped', source, move, 'trapper')) {
				this.add('-fail', target);
			}
		},
		onHitField: function () {
			this.add('-clearallboost');
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					if (this.sides[i].active[j] && this.sides[i].active[j].isActive) this.sides[i].active[j].clearBoosts();
				}
			}
		},
		effect: {
			duration: 10,
			durationCallback: function (target, source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 15;
				}
				return 10;
			},
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'move: Voodoo Magic');
				this.add('-endability', pokemon);
				this.singleEvent('End', this.getAbility(pokemon.ability), pokemon.abilityData, pokemon, pokemon, 'gastroacid');
			},
			onDisableMove: function (pokemon) {
				for (let i = 0; i < pokemon.moveset.length; i++) {
					if (this.getMove(pokemon.moveset[i].id).flags['heal']) {
						pokemon.disableMove(pokemon.moveset[i].id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				if (move.flags['heal']) {
					this.add('cant', pokemon, 'move: Voodoo Magic', move);
					return false;
				}
			},
			onResidualOrder: 17,
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'move: Voodoo Magic');
			},
			onTryHeal: false,
			onAccuracyPriority: 6,
			onAccuracy: function (accuracy, target, source, move, pokemon) {
				if (move && !pokemon.maxhp / 4) return true;
			},
		},
		onTryHit: function (pokemon) {
			let bannedAbilities = {comatose:1, multitype:1, schooling:1, stancechange:1};
			if (bannedAbilities[pokemon.ability]) {
				return false;
			}
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Normal')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondaries: [
			{
				chance: 100,
				volatileStatus: "taunt",
			}, {
				chance: 100,
				volatileStatus: "torment",
			}, {
				chance: 100,
				volatileStatus: "embargo",
			}, {
				chance: 100,
				volatileStatus: "flinch",
			}, {
				chance: 100,
				volatileStatus: "healblock",
			}, {
				chance: 100,
				volatileStatus: "gastroacid",
			},
		],
		onModifyMove: function (move, pokemon, target) {
			move.type = '???';
			this.add('-activate', pokemon, 'move: Voodoo Magic');
		},
		type: "Normal",
		target: "normal",
	},
	//alfastorm
	"darkstorm": {
		id: "darkstorm",
		name: "Dark Storm",
		basePower: 60,
		accuracy: 100,
		pp: 15,
		secondary: false,
		category: "Special",
		self: {
			boosts: {
				spa: 1,
				spe: 1,
				spd: 1,
			},
		},
		priority: 1,
		onHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dark Pulse', target);
		},
		flags: {
			protect: 1,
			contact: 1,
		},
		target: "normal",
		type: "Dark",
	},
	"thepowerofpi": {
		id: "thepowerofpi",
		name: "The Power of Pi",
		basePower: 100,
		pp: 0.625,
		priority: 1,
		category: "Physical",
		secondary: {
			volatileStatus: "flinch",
		},
		volatileStatus: "trapped",
		drain: [1, 1],
		self: {
			boosts: {
				atk: 1,
			},
		},
		onHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Power Trick', target);
			this.add('c| TheGodOfPie|Oh... I\'m actually not The God of Pie....');
			this.add('c| TheGodOfPie|That was a typo....');
			this.add('c| TheGodOfPie|I\'m actually The God of Pi');
			this.add('c| TheGodOfPie|3.141592654');
			this.add('c| TheGodOfPie|**THE POWER OF PI**');
		},
		flags: {
			protect: 1,
			contact: 1,
		},
		target: "normal",
		type: "Steel",
	},
	//Perison
	"ooga": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "ooga",
		name: "Ooga",
		pp: 5,
		priority: 0,
		flags: {charge: 1, nonsky: 1},
		onTry: function (attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				this.add('-anim', attacker, move.name, defender);
				attacker.removeVolatile(move.id);
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		boosts: {
			spa: 2,
			spd: 2,
			spe: 2,
			def: 3,
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight", target);
		},
		secondary: false,
		target: "self",
		type: "Fairy",
		zMoveBoost: {spe: 6},
		contestType: "Beautiful",
	},
	//Lord Coldwraith
	"soulreaper": {
		id: "soulreaper",
		name: "Soul Reaper",
		basePower: 95,
		secondaries: [
			{
				chance: 20,
				status: 'frz',
			}, {
				chance: 30,
				volatileStatus: 'flinch',
			},
		],
		accuracy: 100,
		pp: 10,
		category: "Special",
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Force", target);
			this.add('-anim', source, "Ice Burn", target);
		},
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Ice', type);
		},
		flags: {protect: 1, mirror: 1},
		target: "normal",
		priority: 0,
		type: "Ghost",
		zMovePower: 150,
		contestType: "Cool",
	},
	//Haxorus04
	"haxe": {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		id: "haxe",
		name: "H-Axe",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 100,
		contestType: "Tough",
	},
	"toomuchhax": {
		id: "toomuchhax",
		name: "Too Much Hax",
		basePower: 100,
		accuracy: 100,
		category: "Physical",
		pp: 0.625,
		secondary: false,
		flags: {
			protect: 1,
			contact: 1,
		},
		self: {
			boosts: {
				spe: 1,
			},
		},
		stealsBoosts: true,
		priority: 3,
		target: "normal",
		type: "Dragon",
		isZ: "haxiumz",
	},
	"doublejawtackle": {
		accuracy: 100,
		basePower: 99,
		category: "Physical",
		id: "doublejawtackle",
		name: "Double Jaw Tackle",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		willCrit: true,
		multihit: 2,
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 200,
		contestType: "Tough",
	},
	"momentofinertia": {
		id: "momentofinertia",
		name: "Moment of Inertia",
		accuracy: 100,
		basePower: 0,
		basePowerCallback: function (pokemon, target) {
			let power = (Math.floor(25 * target.getStat('spe') / pokemon.getStat('spe')) || 1);
			if (power > 150) power = 150;
			this.debug('' + power + ' bp');
			return power;
		},
		pp: 10,
		onHit: function (target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		effect: {
			duration: 1,
			onAfterMoveSecondarySelf: function (pokemon, target, move) {
				if (target.clearBoosts) this.boost({def: 1, spd: 1, spe: -1}, pokemon, pokemon, move);
			},
		},
		category: "Physical",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: false,
		target: "normal",
		type: "Steel",
		zMovePower: 160,
		contestType: "Cool",
	},
	//ches
	"cookiestorm": {
		accuracy: 100,
		basePower: 180,
		category: "Physical",
		id: "cookiestorm",
		name: "Cookie Storm",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		recoil: [70, 100],
		secondary: false,
		target: "normal",
		type: "Fairy",
		zMovePower: 190,
		contestType: "Cute",
	},
	"hinderance": {
		accuracy: 100,
		basePower: 0,
		damageCallback: function (pokemon, target) {
			return this.clampIntRange(Math.floor(target.hp / 2), 1);
		},
		category: "Special",
		id: "hinderance",
		name: "Hinderance",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: 1,
				atk: 1,
				def: 1,
				spd: 1,
				spa: 1,
			},
		},
		secondary: {
			chance: 30,
			volatileStatus: "flinch",
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 100,
		contestType: "Tough",
	},
	"imdepressed": {
		id: "imdepressed",
		name: "Im Depressed",
		priority: 0,
		self: {
			boosts: {
				spa: 2,
			},
		},
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: false,
		category: "Special",
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moongeist Beam", target);
		},
		basePower: 120,
		pp: 15,
		accuracy: 100,
		target: "normal",
		type: "Dark",
		zMovePower: 140,
		contestType: "Cool",
	},
	"solareruption": {
		id: "solareruption",
		name: "Solar Eruption",
		basePower: 110,
		accuracy: 100,
		desc: "Fire, Special, 100% Accuracy, 100% burn chance, very high critical hit ratio. Raises the Speed by 2 stages, and Special Attack by 1 stage. The User has to recharge after using.",
		category: "Special",
		flags: {
			protect: 1,
			mirror: 1,
			recharge: 1,
			defrost: 1,
		},
		critRatio: 3,
		self: {
			boosts: {
				spa: 1,
				spe: 1,
			},
		},
		secondary: {
			self: {
				volatileStatus: "mustrecharge",
			},
		},
		status: "brn",
		pp: 10,
		target: "normal",
		type: "Fire",
		zMovePower: 190,
		contestType: "Cool",
	},
	"outripper": {
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		id: "outripper",
		isViable: true,
		name: "Outripper",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove: function (pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		secondary: false,
		target: "randomNormal",
		type: "Dragon",
		zMovePower: 190,
		contestType: "Cool",
	},
	"cripplinghazards": {
		id: "cripplinghazards",
		name: "Crippling Hazards",
		basePower: 0,
		accuracy: true,
		pp: 5,
		priority: 0,
		category: "Status",
		flags: {reflectable: 1},
		onHit: function (target, pokemon, move) {
			this.useMove('Stealth Rock', target);
			this.useMove('Spikes', target);
			this.useMove('Spikes', target);
			this.useMove('Spikes', target);
			this.useMove('Toxic Spikes', target);
			this.useMove('Toxic Spikes', target);
			this.useMove('Sticky Web', target);
		},
		secondary: false,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Toxic", target);
		},
		target: "normal",
		type: "Rock",
	},
	"punchyfury": {
		id: "punchyfury",
		name: "Punchy Fury",
		basePower: 30,
		category: "Physical",
		accuracy: 100,
		multihit: [2, 5],
		priority: 0,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Drain Punch", target);
			this.add('-anim', source, "Barrage", target);
		},
		onHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('c| GuiltasBR|jooj jooj jooj');
		},
		flags: {protect: 1, contact: 1, mirror: 1},
		secondary: false,
		pp: 15,
		target: "normal",
		type: "Fighting",
	},
	"punchyrumassacrez": {
		id: "punchyrumassacrez",
		name: "Punchyru Massacre Z",
		basePower: 50,
		accuracy: 100,
		pp: 0.625,
		secondary: false,
		category: "Physical",
		isViable: true,
		isZ: "douglasiniumz",
		priority: 0,
		flags: {
			protect: 1,
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Close Combat", target);
		},
		onHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('c| GuiltasBR|ORA ORA ORA ORA ORA ORA ORA ORA ORA');
		},
		multihit: [2, 3],
		target: "normal",
		type: "Fighting",
	},
	"holydance": {
		id: "holydance",
		name: "Holy Dance",
		basePower: 80,
		category: "Special",
		accuracy: 100,
		priority: 0,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Power", target);
		},
		onHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('c| Almighty Judgment|/me /me\'s /me /me\'s /me /me\'s, let that sink in.');
		},
		onEffectiveness: function (typeMod) {
			return 1;
		},
		flags: {protect: 1, mirror: 1},
		secondary: false,
		pp: 15,
		target: "normal",
		type: "???",
	},
	"judgment": {
		inherit: true,
		onModifyMove: function (move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
	},
	"firststrike": {
		accuracy: 100,
		basePower: 180,
		category: "Physical",
		desc: "Fails if the target did not select a physical attack, special attack, or Me First for use this turn, or if the target moves before the user.",
		shortDesc: "Usually goes first. Fails if target is not attacking.",
		id: "firststrike",
		isViable: true,
		name: "First Strike",
		pp: 5,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry: function (source, target) {
			let decision = this.willMove(target);
			if (!decision || decision.choice !== 'move' || (decision.move.category === 'Status' && decision.move.id !== 'mefirst') || target.volatiles.mustrecharge) {
				this.attrLastMove('[still]');
				this.add('-fail', source);
				return null;
			}
		},
		self: {
			boosts: {
				atk: 1,
			},
		},
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 240,
		contestType: "Clever",
	},
	"powerofdarkness": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Ignores the Abilities of other Pokemon.",
		id: "powerofdarkness",
		name: "Power of Darkness",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreAbility: true,
		secondary: false,
		target: "normal",
		type: "Dark",
		zMovePower: 180,
		contestType: "Cool",
	},
};
