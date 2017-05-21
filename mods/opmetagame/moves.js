'use strict';

exports.BattleMovedex = {
    "supahawtmixtape": {
        id: "supahawtmixtape",
        name: "SUPA HAWT MIXTAPE",
        pp: 5,
        priority: 1,
        category: "Special",
        basePower: 250,
        accuracy: true,
        secondary: {
            self: {
                boosts: {
                    spa: 2,
                    spe: 2,
                    evasion: 2,
                }
            }
        },
        target: "Normal",
        type: "Grass",
        flags: {
            protect: 1,
            mirror: 1
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Blue Flare", target);
        },
    },
    "flowergarden": {
        id: "flowergarden",
        name: "Flower Garden",
        pp: 10,
        priority: 1,
        category: "Special",
        basePower: 150,
        accuracy: true,
        secondary: {
            self: {
                boosts: {
                    spa: 1,
                    spe: 1,
                }
            }
        },
        target: "Normal",
        flags: {
            protect: 1,
            mirror: 1
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Blue Flare", target);
        },
        type: "Fire",
    },
    "ignite": {
        id: "ignite",
        name: "Ignite",
        pp: 10,
        basePower: 20,
        category: "Special",
        priority: 1,
        accuracy: true,
        flags: {
            protect: 1,
            mirror: 1,
        },
        secondary: {
		chance: 100,
		status: 'brn',
	},
        target: "normal",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Ember", target);
        },
        type: "Fire",
    },
    "fastclaw": {
        id: "fastclaw",
        name: "Fast Claw",
        pp: 10,
        basePower: 60,
        category: "Special",
        priority: 3,
        accuracy: true,
        flags: {
            protect: 1,
            mirror: 1,
        },
        secondary: {
		chance: 20,
		volatileStatus: 'flinch',
	},
        target: "normal",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Quick Attack", target);
            this.add('-anim', source, "Slash", target);
        },
        type: "Normal",
    },
    "fieryoutburst": {
        id: "fieryoutburst",
        name: "Fiery Outburst",
        pp: 5,
        basePower: 135,
        category: "Physical",
        priority: 0,
        accuracy: true,
        flags: {
            protect: 1,
            mirror: 1,
        },
        secondary: {
		chance: 100,
		self: {
			boosts: {
				atk: -1,
				spa: -1,
				spe: 1,
			},
		},
	},
        target: "normal",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Agility", target);
            this.add('-anim', source, "Flash", target);
            this.add('-anim', source, "Flare Blitz", target);
        },
        type: "Normal",
    },
    "tailswipe": {
        id: "tailswipe",
        name: "Tail Swipe",
        pp: 20,
        basePower: 50,
        category: "Physical",
        priority: -1,
        accuracy: 90,
        multihit: [2, 3],
        self: {
		boosts: {
			spd: 1,
		},
	},
        flags: {
            protect: 1,
            mirror: 1,
        },
        secondary: false,
        target: "normal",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Tail Slap", target);
        },
        type: "Normal",
    },
    "badtime": {
        id: "badtime",
        name: "Bad Time",
        pp: 20,
        priority: 0,
        basePower: 1,
        accuracy: true,
        secondary: {
            status: 'tox',
        },
        ignoreImmunity: true,
        flags: {
            protect: 1,
            mirror: 1
        },
        boosts: {
            atk: 6,
            def: -6
        },
        ignoreResistance: true,
        volatileStatus: "confusion",
        target: "normal",
        category: "Special",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Sludge Wave", target);
            this.add('-anim', source, "Toxic", target);
            this.add('-anim', source, "Mean Look", target);
        },
        type: "Poison",
    },
    "orangeattack": {
        id: "orangeattack",
        name: "Orange Attack",
        desc: "1 BP power. Never misses. Ignores resistance and immunity. Fire type. If target has a speed reduction, paralyzed or frozen, bp will be boosted 100x and will ignore user's stat reductions and target's defense boosts. Fails if target is burned or electric terrain.",
        pp: 15,
        category: "Special",
        basePower: 1,
        onBasePowerPriority: 4,
        onBasePower: function (basePower, pokemon, target) {
            if (target.status === 'par' || target.status === 'frz') {
                if (target.boosts.spe === -1 || target.boosts.spe === -2 || target.boosts.spe === -3 || target.boosts.spe === -4 || target.boosts.spe === -5 || target.boosts.spe === -6) return false;
                return this.chainModify(100);
            }
        },
        flags: {
            protect: 1
        },
        onHit: function (target) {
            if (target.status === 'brn') target.cureStatus();
        },
        boosts: {
            spe: -1
        },
        status: "par",
        accuracy: true,
        ignoreImmunity: true,
        ignoreResistance: true,
        ignoreDefensive: true,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Ember", target);
        },
        onTryAddVolatile: function (status, target) {
            if (status.id === 'brn') {
                this.add('-immune', target, '[msg]', '[from] move: Orange Attack');
                return null;
            }
        },
        target: "normal",
        type: "Fire",
    },
    "blueattack": {
        id: "blueattack",
        name: "Blue Attack",
        basePower: 1,
        category: "Special",
        desc: "1 BP power. Never misses. Ignores resistance and immunity. Water type. If target has a speed boost, bp will be boosted 100x and will ignore user's stat reductions and target's defense boosts. Fails if target is paralyzed.",
        accuracy: true,
        ignoreResistance: true,
        ignoreImmunity: true,
        onBasePowerPriority: 4,
        onBasePower: function (basePower, pokemon, target) {
            if (target.boosts.spe === 1 || target.boosts.spe === 2 || target.boosts.spe === 3 || target.boosts.spe === 4 || target.boosts.spe === 5 || target.boosts.spe === 6) return false;
            return this.chainModify(100);
        },
        flags: {
            protect: 1
        },
        boosts: {
            spe: 1
        },
        onHit: function (target) {
            if (target.status === 'par') target.cureStatus();
            if (target.status === 'frz') target.cureStatus();
        },
        status: "brn",
        accuracy: true,
        ignoreDefensive: true,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Water Gun", target);
        },
        onTryAddVolatile: function (status, target) {
            if (status.id === 'par') {
                this.add('-immune', target, '[msg]', '[from] move: Blue Attack');
                return null;
            }
        },
        pp: 15,
        target: "normal",
        type: "Water",
    },
    "dunkedon": {
        id: "dunkedon",
        name: "Dunked On",
        category: "Special",
        desc: "Last Resort. 999 BP power. Ignores user's stat reduction and target's defense boosts.",
        basePower: 999,
        accuracy: 100,
        pp: 15,
        priority: 0,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Last Resort", target);
        },
        flags: {
            protect: 1
        },
        ignoreDefensive: true,
        onTryHit: function (target, source) {
            if (source.moveset.length === 1) return false; // Last Resort fails unless the user knows at least 2 moves
            let hasLastResort = false; // User must actually have Last Resort for it to succeed
            for (let i in source.moveset) {
                if (source.moveset[i].id === 'lastresort') {
                    hasLastResort = true;
                    continue;
                }
                if (!source.moveset[i].used) return false;
            }
            return hasLastResort;
        },
        target: "normal",
        type: "Normal",
    },
    "passengermode": {
        id: "passengermode",
        name: "Passenger Mode",
        pp: 15,
        basePower: 90,
        category: "Special",
        priority: 0,
        accuracy: true,
        flags: {
            protect: 1,
            mirror: 1
        },
        secondary: {
            chance: 30,
            volatileStatus: 'flinch',
        },
        target: "normal",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "U-Turn", target);
        },
        selfSwitch: true,
        type: "Fire",
    },
    "gamble": {
        id: "gamble",
        name: "Gamble",
        pp: 15,
        basePower: 60,
        basePowerCallback: function (pokemon, target, move) {
            if (!pokemon.volatiles.furycutter) {
                pokemon.addVolatile('furycutter');
            }
            return this.clampIntRange(move.basePower * pokemon.volatiles.furycutter.multiplier, 1, 250);
        },
        category: "Special",
        accuracy: 100,
        flags: {
            protect: 1,
            mirror: 1
        },
        target: "Normal",
        type: "Normal",
        onHit: function (target, source) {
            source.addVolatile('furycutter');
        },
        effect: {
            duration: 2,
            onStart: function () {
                this.effectData.multiplier = 1;
            },
            onRestart: function () {
                if (this.effectData.multiplier < 4) {
                    this.effectData.multiplier <<= 1;
                }
                this.effectData.duration = 2;
            },
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Glare", target);
        },
        ignoreImmunity: true,
        secondary: false,
    },
    "error404": {
        id: "error404",
        name: "ERROR 404",
        pp: 15,
        self: {
            boosts: {
                atk: 2,
                def: 2,
                spa: 2,
                spd: 2,
                spe: 2,
                accuracy: 2,
                evasion: 2
            }
        },
        secondary: {
            status: "tox"
        },
        basePower: 80,
        accuracy: true,
        priority: 2,
        category: "Physical",
        ignoreImmunity: true,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Swords Dance");
            this.add('-anim', source, "Iron Defense");
            this.add('-anim', source, "Nasty Plot");
            this.add('-anim', source, "Calm Mind");
            this.add('-anim', source, "Agility");
            this.add('-anim', source, "Hone Claws");
        },
        target: "normal",
        type: "Normal",
    },
    "murrinslash": {
        id: "murrinslash",
        name: "Murrin Slash",
        ohko: true,
        accuracy: true,
        target: "any",
        type: "Dark",
        basePower: 0,
        priority: 0,
        secondary: false,
        category: "Special",
        pp: 20,
        self: {
            boosts: {
                spe: 6,
                evasion: 2
            }
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Night Daze", target);
            this.add('-anim', source, "Slash", target);
        },
        flags: {
            distance: 1
        },
        breaksProtect: true,
    },
    "shade": {
        id: "shade",
        name: "Shade",
        basePower: 130,
        accuracy: 90,
        priority: 0,
        secondary: false,
        category: "Special",
        pp: 5,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Night Daze", target);
            this.add('-anim', source, "Night Shade", target);
            this.add('-anim', source, "Nightmare", target);
        },
        self: {
            boosts: {
                spa: -2
            }
        },
        target: "normal",
        type: "Dark",
    },
    "luckyprediction": {
        id: "luckyprediction",
        name: "Lucky Prediction",
        accuracy: true,
        basePower: 90,
        category: "Physical",
        pp: 20,
        priority: 1,
        flags: {
            snatch: 1,
            protect: 1,
            mirror: 1,
            contact: 1
        },
        isCrit: true,
        self: {
            volatileStatus: 'focusenergy',
            effect: {
                onStart: function (pokemon) {
                    this.add('-start', pokemon, 'move: Focus Energy');
                },
                onModifyCritRatio: function (critRatio) {
                    return critRatio + 2;
                },
            },
        },
        secondary: false,
        target: "normal",
        type: "Fairy",
    },
    "ultima": {
        id: "ultima",
        name: "Ultima",
        basePower: 150,
        priority: 0,
        accuracy: true,
        ignoreImmunity: true,
        category: "Special",
        pp: 15,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Draco Meteor", target);
        },
        secondary: false,
        flags: {
            protect: 1,
            mirror: 1,
            distance: 1
        },
        target: "normal",
        type: "Dragon",
    },
    "northerncross": {
        id: "northerncross",
        name: "Northern Cross",
        basePower: 0,
        accuracy: 90,
        pp: 15,
        secondary: false,
        status: 'frz',
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Icy Wind", target);
            this.add('-anim', source, "Mist", target);
        },
        priority: 0,
        category: "Status",
        flags: {
            protect: 1,
            mirror: 1,
            reflectable: 1
        },
        target: "normal",
        type: "Ice",
    },
    "curaga": {
        id: "curaga",
        name: "Curaga",
        basePower: 0,
        accuracy: true,
        category: "Status",
        pp: 15,
        priority: 0,
        secondary: false,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Recover", target);
        },
        flags: {
            snatch: 1,
            heal: 1
        },
        heal: [1, 1],
        target: "self",
        type: "Normal",
    },
    "dispel": {
        id: "dispel",
        name: "Dispel",
        accuracy: 100,
        basePower: 0,
        category: "Status",
        pp: 15,
        priority: 0,
        flags: {
            authentic: 1,
            snatch: 1
        },
        onTryHit: function (pokemon) {
            // will shatter screens through sub, before you hit
            if (pokemon.runImmunity('Fighting')) {
                pokemon.side.removeSideCondition('reflect');
                pokemon.side.removeSideCondition('lightscreen');
            }
        },
        all: {
            onHitField: function () {
                this.add('-clearallboost');
                for (let i = 0; i < this.sides.length; i++) {
                    for (let j = 0; j < this.sides[i].active.length; j++) {
                        if (this.sides[i].active[j] && this.sides[i].active[j].isActive) this.sides[i].active[j].clearBoosts();
                    }
                }
            },
        },
        secondary: false,
        target: "normal",
        type: "Fighting",
    },
    "meltdown": {
        id: "meltdown",
        name: "Meltdown",
        basePower: 150,
        accuracy: true,
        category: "Physical",
        pp: 15,
        priority: 0,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Rage", target);
            this.add('-anim', source, "Overheat", target);
            this.add('-anim', source, "Outrage", target);
        },
        secondary: false,
        flags: {
            protect: 1,
            mirror: 1,
            defrost: 1,
            distance: 1
        },
        target: "allAdjacent",
        type: "Fire",
    },
    "mightyguard": {
        id: "mightyguard",
        name: "Mighty Guard",
        basePower: 0,
        category: "Status",
        accuracy: 100,
        pp: 15,
        priority: 0,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Curse");
        },
        boosts: {
            def: 1,
            spd: 1
        },
        secondary: false,
        flags: {
            snatch: 1
        },
        target: "self",
        type: "Fighting",
    },
    "death": {
        id: "death",
        name: "Death",
        basePower: 0,
        ohko: true,
        pp: 5,
        category: "Physical",
        accuracy: 30,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Guillotine");
        },
        secondary: false,
        flags: {
            contact: 1,
            protect: 1,
            mirror: 1
        },
        target: "normal",
        type: "Dark",
    },
    "eraser": {
        id: "eraser",
        name: "Eraser",
        accuracy: 100,
        basePower: 0,
        category: "Status",
        pp: 15,
        priority: 0,
        flags: {
            authentic: 1,
            snatch: 1
        },
        onTryHit: function (pokemon) {
            // will shatter screens through sub, before you hit
            if (pokemon.runImmunity('Fighting')) {
                pokemon.side.removeSideCondition('reflect');
                pokemon.side.removeSideCondition('lightscreen');
            }
        },
        all: {
            onHitField: function () {
                this.add('-clearallboost');
                for (let i = 0; i < this.sides.length; i++) {
                    for (let j = 0; j < this.sides[i].active.length; j++) {
                        if (this.sides[i].active[j] && this.sides[i].active[j].isActive) this.sides[i].active[j].clearBoosts();
                    }
                }
            },
        },
        secondary: false,
        target: "normal",
        type: "Fighting",
    },
    "zenpunch": {
        id: "zenpunch",
        name: "Zen Punch",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Drain Punch", target);
            this.add('-anim', source, "Zen Headbutt", target);
        },
        pp: 15,
        accuracy: 100,
        basePower: 90,
        secondary: false,
        drain: [1, 2],
        flags: {
            punch: 1,
            contact: 1,
            protect: 1,
            mirror: 1
        },
        priority: 0,
        category: "Physical",
        target: "normal",
        type: "Psychic",
    },
    "armytank": {
        id: "armytank",
        name: "Army Tank",
        basePower: 0,
        basePowerCallback: function (pokemon, target) {
            let power = (Math.floor(25 * target.getStat('spe') / pokemon.getStat('spe')) || 1);
            if (power > 250) power = 250;
            this.debug('' + power + ' bp');
            return power;
        },
        pp: 20,
        accuracy: 100,
        category: "Physical",
        secondary: false,
        flags: {
            protect: 1,
            mirror: 1
        },
        priority: 0,
        self: {
            boosts: {
                atk: 2,
                def: 2,
                spd: 2,
                spe: -2
            }
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Heavy Slam", target);
            this.add('-anim', source, "Gyro Ball", target);
        },
        target: "normal",
        type: "Steel",
    },
    "spitfire": {
        id: "spitfire",
        name: "Spitfire",
        basePower: 120,
        pp: 15,
        accuracy: 100,
        category: "Physical",
        secondary: {
            status: "brn"
        },
        priority: 0,
        flags: {
            protect: 1,
            mirror: 1,
            defrost: 1
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Will O Wisp", target);
            this.add('-anim', source, "Flame Wheel", target);
        },
        target: "normal",
        type: "Fire",
    },
    "immabitechu": {
        id: "immabitechu",
        name: "Immabitechu",
        basePower: 150,
        accuracy: true,
        pp: 20,
        category: "Physical",
        secondary: {
            status: "tox"
        },
        priority: 0,
        drain: [1, 2],
        flags: {
            bite: 1,
            contact: 1,
            protect: 1,
            mirror: 1
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still');
            this.add('-anim', source, "Bite", target);
        },
        self: {
            boosts: {
                atk: 1,
                def: 1,
                spd: 1,
                spe: 1
            },
        },
        boosts: {
            def: 1
        },
        ignoreImmunity: true,
        target: "normal",
        type: "Fighting",
    },
    "bibarelroll": {
        id: "bibarelroll",
        name: "BIBAREL ROLL",
        basePower: 90,
        basePowerCallback: function (pokemon, target, move) {
            if (!pokemon.volatiles.furycutter) {
                pokemon.addVolatile('furycutter');
            }
            return this.clampIntRange(move.basePower * pokemon.volatiles.furycutter.multiplier, 1, 250);
        },
        onHit: function (target, source) {
            source.addVolatile('furycutter');
        },
        effect: {
            duration: 2,
            onStart: function () {
                this.effectData.multiplier = 1;
            },
            onRestart: function () {
                if (this.effectData.multiplier < 4) {
                    this.effectData.multiplier <<= 1;
                }
                this.effectData.duration = 2;
            },
        },

        self: {
            boosts: {
                atk: 1,
                def: 1,
                spd: 1,
                spe: 1,
                accuracy: 1,
                evasion: 1
            }
        },
        accuracy: true,
        priority: 0,
        pp: 20,
        drain: [1, 2],
        noPPBoosts: true,
        flags: {
            protect: 1,
            mirror: 1,
            contact: 1
        },
        ignoreImmunity: true,
        secondary: false,
        category: "Physical",
        target: "normal",
        type: "Normal",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still');
            this.add('-anim', source, "Rollout", target);
        },
    },
    "sandydestruction": {
        id: "sandydestruction",
        name: "Sandy Destruction",
        basePower: 100,
        accuracy: 100,
        category: "Physical",
        secondary: false,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Earthquake", target);
            this.add('-anim', source, "Sandstorm", target);
            this.add('-anim', source, "Stone Edge", target);
        },
        pp: 20,
        flags: {
            nonsky: 1,
            mirror: 1,
            protect: 1,
            distance: 1,
            gravity: 1,
            contact: 1
        },
        onEffectiveness: function (typeMod, type, move) {
            return typeMod + this.getEffectiveness('Ground', type);
        },
        self: {
            boosts: {
                atk: 1,
                def: 1,
                spd: 1,
                spe: 1,
                accuracy: 1
            }
        },
        sideCondition: 'stealthrock',
        effect: {
            // this is a side condition
            onStart: function (side) {
                this.add('-sidestart', side, 'move: Stealth Rock');
            },
            onSwitchIn: function (pokemon) {
                let typeMod = this.clampIntRange(pokemon.runEffectiveness('Rock'), -6, 6);
                this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
            },
        },
        target: "normal",
        type: "Rock",
    },
    "derp": {
        id: "derp",
        name: "DERP",
        basePower: 180,
        accuracy: true,
        pp: 15,
        secondary: {
            boosts: {
                def: -1,
                spd: -1
            }
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Curse");
            this.add('-anim', source, "Extreme Speed", target);
        },
        status: 'tox',
        self: {
            boosts: {
                atk: 2,
                def: 2,
                spd: 2,
                spe: 2,
                accuracy: 2,
                evasion: 2
            }
        },
        priority: 0,
        flags: {
            protect: 1,
            mirror: 1,
            contact: 1,
            distance: 1
        },
        category: "Physical",
        drain: [3, 4],
        target: 'normal',
        type: "Normal",
    },
    "dancehappily": {
        id: "dancehappily",
        name: "Dance Happily",
        pp: 15,
        basePower: 120,
        accuracy: true,
        category: "Special",
        self: {
            boosts: {
                spa: 2,
                spe: 2
            }
        },
        boosts: {
            def: -1,
            spd: -1
        },
        drain: [1, 2],
        flags: {
            protect: 1,
            mirror: 1,
            distance: 1,
            defrost: 1
        },
        secondary: {
            volatileStatus: "confusion"
        },
        priority: 1,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Teeter Dance", target);
            this.add('-anim', source, "Giga Drain", target);
            this.add('-anim', source, "Hydro Pump", target);
        },
        target: "normal",
        type: "Water",
    },
    "tweet": {
        id: "tweet",
        name: "Tweet",
        pp: 20,
        basePower: 120,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Celebrate");
            this.add('-anim', source, "Boomburst");
            this.add('-anim', source, "Chatter");
        },
        category: "Special",
        flags: {
            snatch: 1,
            sound: 1,
            authentic: 1,
            protect: 1,
            mirror: 1
        },
        secondary: {
            volatileStatus: "confusion"
        },
        priority: 1,
        self: {
            boosts: {
                def: 1,
                spa: 1,
                spd: 1,
                spe: 1
            }
        },
        ignoreImmunity: true,
        accuracy: 100,
        target: "normal",
        type: "Normal",
    },
    "prfmayy": {
        id: "prfmayy",
        name: "prfmayy",
        category: "Special",
        self: {
            boosts: {
                def: 2,
                spa: 2,
                spd: 2,
                spe: 2
            }
        },
        pp: 15,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Ice Beam", target);
        },
        priority: 1,
        accuracy: 100,
        basePower: 120,
        secondary: {
            status: "frz"
        },
        flags: {
            protect: 1,
            mirror: 1
        },
        target: "normal",
        type: "Ice",
    },
    "expose": {
        id: "expose",
        name: "Expose",
        pp: 15,
        category: "Status",
        basePower: 0,
        accuracy: 100,
        secondary: {
            volatileStatus: 'taunt',
        },
        volatileStatus: 'healblock',
        self: {
            volatileStatus: 'aquaring'
        },
        volatileStatus: 'leechseed',
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
        flags: {
            protect: 1,
            snatch: 1,
            authentic: 1,
            sound: 1,
            reflectable: 1
        },
        priority: 0,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Taunt", target);
            this.add('-anim', source, "Heal Block", target);
            this.add('-anim', source, "Leech Seed", target);
            this.add('-anim', source, "Aqua Ring", target);
        },
        target: "normal",
        type: "Psychic",
    },
    "eye": {
        id: "eye",
        name: "Eye",
        basePower: 0,
        accuracy: 100,
        category: "Status",
        pp: 15,
        flags: {
            protect: 1,
            reflectable: 1
        },
        priority: 0,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Hypnosis", target);
            this.add('-anim', source, "Nightmare", target);
        },
        status: 'slp',
        volatileStatus: 'nightmare',
        effect: {
            noCopy: true,
            onStart: function (pokemon) {
                if (pokemon.status !== 'slp') {
                    return false;
                }
                this.add('-start', pokemon, 'Nightmare');
            },
            onResidualOrder: 9,
            onResidual: function (pokemon) {
                this.damage(pokemon.maxhp / 4);
            },
            onUpdate: function (pokemon) {
                if (pokemon.status !== 'slp') {
                    pokemon.removeVolatile('nightmare');
                    this.add('-end', pokemon, 'Nightmare', '[silent]');
                }
            },
        },
        secondary: false,
        target: "normal",
        type: "Ghost",
    },
    "illuminaticonfirmed": {
        id: "illuminaticonfirmed",
        name: "Illuminati Confirmed",
        basePower: 0,
        category: "Status",
        accuracy: true,
        pp: 20,
        flags: {
            snatch: 1
        },
        priority: 0,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Nasty Plot", target);
        },
        boosts: {
            spa: 6,
            spd: 6,
            def: 6,
            spe: 6,
            atk: -6,
            evasion: 6
        },
        secondary: false,
        target: "self",
        type: "Psychic",
    },
    "tridisaster": {
        id: "tridisaster",
        name: "Tri Disaster",
        basePower: 333,
        accuracy: true,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still');
            this.add('-anim', source, "Tri Attack", target);
        },
        pp: 20,
        flags: {
            protect: 1
        },
        category: "Special",
        priority: 0,
        onEffectiveness: function (typeMod, type, move) {
            return typeMod + this.getEffectiveness('Electric', type);
            return typeMod + this.getEffectiveness('Ice', type);
        },
        secondary: {
            chance: 33,
            onHit: function (target, source) {
                let result = this.random(3);
                if (result === 0) {
                    target.trySetStatus('brn', source);
                }
                else if (result === 1) {
                    target.trySetStatus('par', source);
                }
                else {
                    target.trySetStatus('frz', source);
                }
            },
        },
        target: "normal",
        type: "Fire",
    },
    "volcaniceruption": {
        id: "volcaniceruption",
        name: "Volcanic Eruption",
        accuracy: 100,
        basePower: 130,
        category: "Special",
        desc: "Has a 100% chance to confuse the target. The target thaws out if it is frozen. 100% chance to burn the target.",
        shortDesc: "100% chance to confuse the target, 100% chance to burn.",
        pp: 5,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still');
            this.add('-anim', source, "Steam Eruption", target);
        },
        priority: 0,
        flags: {
            protect: 1,
            mirror: 1,
            defrost: 1
        },
        self: {
            boosts: {
                def: 1,
                spa: 1,
                spd: 1,
                spe: 1
            }
        },
        thawsTarget: true,
        secondary: {
            volatileStatus: 'confusion'
        },
        status: 'brn',
        target: "normal",
        type: "Fire",
    },
    "steelbeams": {
        id: "steelbeams",
        name: "STEEL BEAMS",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still');
            this.add('-anim', source, "Meteor Mash", target);
        },
        desc: "JET FUMES CAN'T MELT STEEL BEAMS!!!!!!!!!!!!!!",
        shortDesc: "Dank Memez kek",
        basePower: 90,
        accuracy: 100,
        self: {
            boosts: {
                atk: 2,
                def: 2,
                spd: 2
            }
        },
        secondary: false,
        pp: 15,
        thawsTarget: true,
        flags: {
            protect: 1,
            mirror: 1,
            defrost: 1
        },
        category: "Physical",
        target: "allAdjacentFoes",
        type: "Steel",
    },
    "bestinsupersmashbros": {
        id: "bestinsupersmashbros",
        name: "Best in Super Smash Bros",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Quiver Dance", target);
            this.add('-anim', source, "Geomancy", target);
        },
        desc: "Nice meme",
        shortDesc: "top kek",
        basePower: 100,
        accuracy: true,
        pp: 20,
        priority: 1,
        drain: [3, 4],
        secondary: {
            volatileStatus: "confusion"
        },
        self: {
            boosts: {
                atk: 2,
                def: 2,
                spa: 2,
                spd: 2,
                spe: 2,
                accuracy: 2,
                evasion: 2
            }
        },
        category: "Special",
        flags: {
            protect: 1
        },
        target: "normal",
        type: "Fairy",
    },
    "dragonsassault": {
        id: "dragonsassault",
        name: "Dragon's Assault",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Dragon Dance", target);
            this.add('-anim', source, "Outrage", target);
        },
        desc: "Dragons are liek so kewl kek",
        shortDesc: "Much move, such wew",
        basePower: 120,
        accuracy: 100,
        pp: 15,
        secondary: false,
        self: {
            boosts: {
                atk: 1,
                def: 1,
                spd: 1,
                spe: 1
            }
        },
        ignoreImmunity: true,
        category: "Physical",
        flags: {
            protect: 1,
            contact: 1
        },
        target: "normal",
        type: "Dragon",
    },
    "frosty": {
        id: "frosty",
        name: "Frosty",
        basePower: 90,
        accuracy: 100,
        pp: 15,
        secondary: false,
        category: "Special",
        status: "frz",
        self: {
            boosts: {
                def: 1,
                spd: 1
            }
        },
        flags: {
            protect: 1,
            mirror: 1
        },
        boosts: {
            spe: -1
        },
        self: {
            heal: [1, 2]
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Icy Wind", target);
            this.add('-anim', source, "Freeze Dry", target);
        },
        target: "normal",
        type: "Ice",
    },
    "dracoblast": {
        id: "dracoblast",
        name: "Draco Blast",
        basePower: 140,
        accuracy: 100,
        pp: 5,
        category: "Special",
        secondary: {
            chance: 50,
            volatileStatus: "flinch"
        },
        status: "brn",
        self: {
            boosts: {
                spa: 2
            }
        },
        flags: {
            protect: 1,
            defrost: 1
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Draco Meteor", target);
        },
        target: "normal",
        type: "Dragon",
    },
    "superearthpower": {
        id: "superearthpower",
        name: "Super Earth Power",
        basePower: 120,
        accuracy: true,
        pp: 15,
        secondary: {
            chance: 30,
            status: "brn"
        },
        flags: {
            protect: 1
        },
        category: "Special",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Superpower", target);
            this.add('-anim', source, "Earth Power", target);
        },
        target: "normal",
        type: "Ground"
    },
    "groundbreaker": {
        id: "groundbreaker",
        name: "Ground Breaker",
        ohko: true,
        accuracy: true,
        basePower: 0,
        category: "Special",
        pp: 5,
        flags: {
            protect: 1
        },
        secondary: false,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Fissure", target);
        },
        target: "normal",
        type: "Ground",
    },
    "gtfo": {
        id: "gtfo",
        name: "gtfo",
        accuracy: 100,
        ignoreImmunity: true,
        category: "Special",
        basePower: 100,
        pp: 15,
        flags: {
            protect: 1
        },
        onEffectiveness: function (typeMod, type, move) {
            if (move.type !== 'Ground') return;
            let target = this.activeTarget;
            if (!target) return; // avoid crashing when called from a chat plugin
            // ignore effectiveness if the target is Flying type and immune to Ground
            if (!target.runImmunity('Ground')) {
                if (target.hasType('Flying')) return 0;
            }
        },
        volatileStatus: 'smackdown',
        ignoreImmunity: {
            'Ground': true
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still');
            this.add('-anim', source, "Parting Shot", target);
        },
        secondary: false,
        target: "normal",
        type: "Psychic",
    },
    "nomansland": {
        id: "nomansland",
        name: "No Man's Land",
        basePower: 100,
        pp: 15,
        accuracy: 100,
        flags: {
            protect: 1
        },
        onEffectiveness: function (typeMod, type, move) {
            if (move.type !== 'Ground') return;
            let target = this.activeTarget;
            if (!target) return; // avoid crashing when called from a chat plugin
            // ignore effectiveness if the target is Flying type and immune to Ground
            if (!target.runImmunity('Ground')) {
                if (target.hasType('Flying')) return 0;
            }
        },
        volatileStatus: 'smackdown',
        ignoreImmunity: {
            'Ground': true
        },
        category: "Special",
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Earth Power", target);
        },
        target: "normal",
        type: "Ground",
    },
    "wdtdttm": {
        id: "wdtdttm",
        name: "WDTDTTM",
        basePower: 250,
        accuracy: 100,
        pp: 10,
        flags: {
            protect: 1
        },
        category: "Special",
        secondary: false,
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, 'Psystrike', target);
        },
        target: "normal",
        type: "Psychic",
    },
    "makeexiledgreatagain": {
        id: "makeexiledgreatagain",
        name: "Make Exiled Great Again",
        basePower: 120,
        priority: 3,
        accuracy: true,
        pp: 20,
        flags: {
            protect: 1
        },
        category: "Physical",
        secondary: {
            status: "tox"
        },
        self: {
            boosts: {
                atk: 3,
            }
        },
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Reflect");
            this.add('-anim', source, "Light Screen");
            this.add('-anim', target, "Brick Break");
            this.add('-anim', source, "Rage");
            this.add('-anim', source, "Outrage");
        },
        target: "normal",
        type: "Normal",
    },
    "mascotplz": {
        id: "mascotplz",
        name: "Mascot Plz",
        desc: "feelsbadman I was teh reel mascot but dey abandoned me bc I wuz possessed feelscri",
        shortDesc: "Plz make me mascot again",
        recoil: [1, 2],
        basePower: 120,
        accuracy: 100,
        secondary: {
            chance: 50,
            volatileStatus: "flinch"
        },
        flags: {
            protect: 1,
            contact: 1
        },
        pp: 15,
        category: "Physical",
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Nightmare", target);
        },
        target: "normal",
        type: "Fairy",
    },
    "trojanhorse": {
        id: "trojanhorse",
        name: "Trojan Horse",
        basePower: 120,
        accuracy: 100,
        desc: "Le Trojan War Horse.",
        shortDesc: "Horse game too stronk",
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Stomp", target);
        },
        ignoreImmunity: true,
        secondary: {
            chance: 50,
            volatileStatus: "flinch"
        },
        pp: 15,
        category: "Physical",
        flags: {
            contact: 1,
            protect: 1
        },
        self: {
            boosts: {
                atk: 1,
                def: 1,
                spd: 1,
                spe: 1
            }
        },
        target: "normal",
        type: "Fighting",
    },
    "guard": {
        accuracy: true,
        basePower: 0,
        category: "Status",
        id: "guard",
        isViable: true,
        name: "Guard",
        pp: 10,
        priority: 4,
        flags: {
            snatch: 1
        },
        stallingMove: true,
        volatileStatus: 'kingsshield',
        onTryHit: function (pokemon) {
            return !!this.willAct() && this.runEvent('StallMove', pokemon);
        },
        onHit: function (pokemon) {
            pokemon.addVolatile('stall');
        },
        effect: {
            duration: 1,
            onStart: function (target) {
                this.add('-singleturn', target, 'Protect');
            },
            onSourcePrepareHit: function (source, target, effect) {
                if (effect.effectType !== 'Move' || !effect.flags['protect'] || effect.category === 'Status') return;
                if (effect.flags['contact']) {
                    effect.ignoreImmunity = true;
                }
            },
            onTryHitPriority: 3,
            onTryHit: function (target, source, move) {
                if (!move.flags['protect'] || move.category === 'Status') return;
                this.add('-activate', target, 'move: Protect');
                let lockedmove = source.getVolatile('lockedmove');
                if (lockedmove) {
                    // Outrage counter is reset
                    if (source.volatiles['lockedmove'].duration === 2) {
                        delete source.volatiles['lockedmove'];
                    }
                }
                if (move.flags['contact']) {
                    this.boost({
                        atk: -2,
                        spa: -2
                    }, source, target, this.getMove("Guard"));
                }
                return null;
            },
        },
        secondary: false,
        boosts: {
            def: 1,
            spd: 1
        },
        onTryHit: function (source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "King's Shield");
            this.add('-anim', source, "Cosmic Power");
        },
        target: "self",
        type: "Steel",
        contestType: "Cool",
    },
    "stab": {
        id: "stab",
        name: "Stab",
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Sacred Sword", target);
        },
        basePower: 100,
        accuracy: 100,
        pp: 15,
        category: "Physical",
        priority: 3,
        self: {
            boosts: {
                atk: 2
            }
        },
        flags: {
            protect: 1,
            contact: 1
        },
        secondary: false,
        type: "Steel",
        target: "normal",
    },
    "megalixir": {
        id: "megalixir",
        name: "Megalixir",
        basePower: 0,
        category: "Status",
        pp: 15,
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Heal Bell");
        },
        onHit: function (pokemon, source, move) {
            this.add('-activate', source, 'move: Megalixir');
            let side = pokemon.side;
            for (let i = 0; i < side.pokemon.length; i++) {
                if (side.pokemon[i] !== source && ((side.pokemon[i].hasAbility('sapsipper')) ||
                        (side.pokemon[i].volatiles['substitute'] && !move.infiltrates))) {
                    continue;
                }
                side.pokemon[i].cureStatus();
            }
        },
        flags: {
            snatch: 1
        },
        accuracy: 100,
        heal: [1, 1],
        target: "allyTeam",
        type: "Normal",
    },
    "spook": {
        id: "spook",
        name: "Spook",
        volatileStatus: "healblock",
        status: 'par',
        secondary: {
            volatileStatus: "confusion"
        },
        basePower: 0,
        category: "Status",
        accuracy: true,
        boosts: {
            atk: -2,
            spa: -2,
            spe: -2
        },
        flags: {
            protect: 1,
            reflectable: 1,
            snatch: 1
        },
        pp: 15,
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Heal Block", target);
            this.add('-anim', source, "Confuse Ray", target);
        },
        target: "allAdjacentFoes",
        type: "Ghost",
    },
    "gyroball": {
        num: 360,
        accuracy: 100,
        basePower: 0,
        basePowerCallback: function (pokemon, target) {
            let power = (Math.floor(25 * target.getStat('spe') / pokemon.getStat('spe')) || 1);
            if (power > 150) power = 150;
            this.debug('' + power + ' bp');
            return power;
        },
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Gyro Ball", target);
        },
        category: "Physical",
        desc: "Power is equal to (25 * target's current Speed / user's current Speed), rounded down, + 1, but not more than 150.",
        shortDesc: "More power the slower the user than the target.",
        id: "gyroball",
        isViable: true,
        name: "Gyro Ball",
        pp: 99,
        noPPBoosts: true,
        priority: 0,
        flags: {
            protect: 1
        },
        secondary: false,
        target: "normal",
        type: "Steel",
    },
    "virus": {
        id: "virus",
        name: "Virus",
        basePower: 120,
        accuracy: true,
        category: "Special",
        priority: 0,
        pp: 15,
        ignoreImmunity: true,
        secondary: {
            status: "tox"
        },
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Toxic", target);
        },
        flags: {
            snatch: 1,
            protect: 1
        },
        self: {
            heal: [1, 2]
        },
        target: "normal",
        type: "Poison",
    },
    "knowledgeispower": {
        id: "knowledgeispower",
        name: "Knowledge is Power",
        basePower: 140,
        accuracy: 100,
        category: "Physical",
        secondary: {
            volatileStatus: "partiallytrapped"
        },
        self: {
            onHit: function (source) {
                this.setWeather('raindance');
                source.addVolatile('magiccoat');
                source.addVolatile('aquaring');
            },
            boosts: {
                atk: 1,
                def: 1,
                spd: 1
            }
        },
        drain: [7, 8],
        priority: 0,
        pp: 20,
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Whirlpool", target);
        },
        desc: "\"Knowledge is Power!\" They truly weren't wrong after all feelsnv",
        shortDesc: "They weren't wrong.....",
        target: "normal",
        type: "Water",
    },
    "clownroutine": {
        id: "clownroutine",
        name: "Clown Routine",
        desc: "kek",
        shortDesc: "kek",
        basePower: 140,
        accuracy: 100,
        priority: 0,
        pp: 15,
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Water Pledge", target);
        },
        flags: {
            protect: 1
        },
        self: {
            boosts: {
                def: 1,
                spa: 1,
                spd: 1,
                spe: 1
            },
            heal: [1, 2]
        },
        category: "Special",
        secondary: false,
        target: "normal",
        type: "Fairy",
    },
    "timetravel": {
        id: "timetravel",
        name: "Time Travel",
        basePower: 120,
        accuracy: 100,
        pp: 20,
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Teleport", target);
        },
        secondary: false,
        priority: 0,
        volatileStatus: 'confusion',
        self: {
            boosts: {
                spa: 1,
                spe: -1
            }
        },
        boosts: {
            spd: -1
        },
        ignoreImmunity: true,
        target: "normal",
        type: "Dragon",
    },
    "exile": {
        id: "exile",
        name: "Exile",
        basePower: 140,
        accuracy: 100,
        pp: 15,
        onHit: function (target, source, move) {
            this.add('c|~Exiled Server|Exiled from all others, we shall become greater than ever before!');
        },
        secondary: false,
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Dark Void", target);
            this.add('-anim', source, "Dark Pulse", target);
        },
        status: "slp",
        priority: 0,
        target: "normal",
        type: "Dark",
    },
    "megastoredpower": {
        accuracy: 100,
        basePower: 20,
        basePowerCallback: function (pokemon, target, move) {
            return move.basePower + 20 * pokemon.positiveBoosts();
        },
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Stored Power", target);
        },
        ignoreImmunity: true,
        category: "Special",
        id: "megastoredpower",
        name: "Mega Stored Power",
        pp: 20,
        priority: 0,
        flags: {
            protect: 1,
            mirror: 1
        },
        self: {
            boosts: {
                def: -2,
                spa: -2,
                spd: -2,
                spe: -2,
                accuracy: -2,
                evasion: -2
            }
        },
        secondary: false,
        target: "normal",
        type: "Psychic",
    },
    "eternalbond": {
        id: "eternalbond",
        name: "Eternal Bond",
        basePower: 130,
        accuracy: true,
        pp: 15,
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Water Pulse", target);
        },
        self: {
            boosts: {
                spa: 1,
                spe: 1
            }
        },
        secondary: false,
        flags: {
            pulse: 1,
            protect: 1
        },
        category: "Special",
        priority: 0,
        target: "normal",
        type: "Water",
    },
    "extremeleech": {
        id: "extremeleech",
        name: "Extreme Leech",
        basePower: 130,
        accuracy: true,
        pp: 15,
        target: "normal",
        type: "Grass",
        ignoreImmunity: true,
        priority: 0,
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Horn Leech", target);
            this.add('-anim', source, "Ingrain");
            this.add('-anim', source, "Toxic", target);
            this.add('-anim', source, "Haze", target);
            this.add('-anim', source, "Leech Seed", target);
            this.add('-anim', source, "Light Screen");
            this.add('-anim', source, "Reflect");
        },
        flags: {
            protect: 1,
            snatch: 1,
            contact: 1
        },
        category: "Physical",
        drain: [1, 2],
        self: {
            volatileStatus: 'ingrain',
            effect: {
                onStart: function (pokemon) {
                    this.add('-start', pokemon, 'move: Extreme Leech');
                },
                onResidualOrder: 7,
                onResidual: function (pokemon) {
                    this.heal(pokemon.maxhp / 16);
                },
                onTrapPokemon: function (pokemon) {
                    pokemon.tryTrap();
                },
                // groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
                onDragOut: function (pokemon) {
                    this.add('-activate', pokemon, 'move: Extreme Leech');
                    return null;
                },
            },
        },
        status: 'tox',
        onHitField: function () {
            this.add('-clearallboost');
            for (let i = 0; i < this.sides.length; i++) {
                for (let j = 0; j < this.sides[i].active.length; j++) {
                    if (this.sides[i].active[j] && this.sides[i].active[j].isActive) this.sides[i].active[j].clearBoosts();
                }
            }
        },
        volatileStatus: 'leechseed',
        effect: {
            onStart: function (target) {
                this.add('-start', target, 'move: Extreme Leech');
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
        allyside: {
            sideCondition: 'lightscreen',
            effect: {
                duration: 5,
                durationCallback: function (target, source, effect) {
                    if (source && source.hasItem('lightclay')) {
                        return 8;
                    }
                    return 5;
                },
                onAnyModifyDamage: function (damage, source, target, move) {
                    if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Special') {
                        if (!move.crit && !move.infiltrates) {
                            this.debug('Extreme Leech weaken');
                            if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
                            return this.chainModify(0.5);
                        }
                    }
                },
                onStart: function (side) {
                    this.add('-sidestart', side, 'move: Extreme Leech');
                },
                onResidualOrder: 21,
                onResidualSubOrder: 1,
                onEnd: function (side) {
                    this.add('-sideend', side, 'move: Extreme Leech');
                },
            },
            sideCondition: 'reflect',
            effect: {
                duration: 5,
                durationCallback: function (target, source, effect) {
                    if (source && source.hasItem('lightclay')) {
                        return 8;
                    }
                    return 5;
                },
                onAnyModifyDamage: function (damage, source, target, move) {
                    if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Physical') {
                        if (!move.crit && !move.infiltrates) {
                            this.debug('Extreme Leech weaken');
                            if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
                            return this.chainModify(0.5);
                        }
                    }
                },
                onStart: function (side) {
                    this.add('-sidestart', side, 'Extreme Leech');
                },
                onResidualOrder: 21,
                onEnd: function (side) {
                    this.add('-sideend', side, 'Extreme Leech');
                },
            },
        },
    },
    "melody": {
        id: "melody",
        name: "Melody",
        basePower: 130,
        accuracy: 100,
        pp: 15,
        ignoreImmunity: true,
        secondary: {
            chance: 50,
            status: "slp"
        },
        priority: 0,
        //Changes forme to Meloetta-P
        onHit: function (target, pokemon) {
            if (pokemon.baseTemplate.baseSpecies === 'Meloetta' && !pokemon.transformed) {
                pokemon.addVolatile('relicsong');
            }
        },
        effect: {
            duration: 1,
            onAfterMoveSecondarySelf: function (pokemon, target, move) {
                if (pokemon.formeChange(pokemon.template.speciesid === 'meloettapirouette' ? 'Meloetta' : 'Meloetta-Pirouette')) {
                    this.add('-formechange', pokemon, pokemon.illusion ? pokemon.illusion.template.species : pokemon.template.species, '[msg]');
                }
                pokemon.removeVolatile('relicsong');
            },
        },
        drain: [1, 2],
        flags: {
            sound: 1,
            authentic: 1,
            protect: 1
        },
        boosts: {
            spd: -1
        },
        self: {
            boosts: {
                spa: 1,
                spe: 1
            }
        },
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Relic Song", target);
        },
        target: "allAdjacentFoes",
        type: "Psychic",
    },
    "ultradrain": {
        id: "ultradrain",
        name: "Ultra Drain",
        basePower: 120,
        //revenge boost
        basePowerCallback: function (pokemon, target, move) {
            if (target.lastDamage > 0 && pokemon.lastAttackedBy && pokemon.lastAttackedBy.thisTurn && pokemon.lastAttackedBy.pokemon === target) {
                this.debug('Boosted for getting hit by ' + pokemon.lastAttackedBy.move);
                return move.basePower * 2;
            }
            return move.basePower;
        },
        accuracy: 100,
        drain: [1, 2],
        pp: 15,
        flags: {
            protect: 1,
            heal: 1
        },
        priority: 0,
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Giga Drain", target);
        },
        target: "normal",
        type: "Grass",
    },
    "cellmutation": {
        id: "cellmutation",
        name: "Cell Mutation",
        basePower: 120,
        accuracy: 100,
        ignoreImmunity: true,
        self: {
            heal: [1, 2]
        },
        category: "Physical",
        priority: 0,
        flags: {
            protect: 1,
            contact: 1,
            heal: 1
        },
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Outrage", target);
        },
        secondary: false,
        pp: 15,
        target: "normal",
        type: "Dragon",
    },
    "itslit": {
        id: "itslit",
        name: "It's Lit",
        basePower: 130,
        accuracy: true,
        status: "brn",
        pp: 15,
        flags: {
            protect: 1,
            contact: 1
        },
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Flare Blitz", target);
        },
        self: {
            boosts: {
                atk: 2
            }
        },
        category: "Physical",
        drain: [1, 2],
        secondary: false,
        target: "normal",
        type: "Fire",
    },
    "whenthesquadgotyourback": {
        accuracy: 100,
        basePower: 100,
        category: "Physical",
        desc: "Fucking badass af",
        shortDesc: "Them are some fighting words :^]",
        id: "whenthesquadgotyourback",
        name: "When The Squad Got Your Back",
        pp: 20,
        priority: 5,
        flags: {
            mirror: 1,
            contact: 1
        },
        self: {
            boosts: {
                atk: 2,
                def: 2,
                spd: 2,
                spe: 2,
                accuracy: 2,
                evasion: 2,
            },
            heal: [1, 2],
        },
        boosts: {
            atk: -2,
            def: -2,
            spa: -2,
            spd: -2,
            spe: -2,
            accuracy: -2,
            evasion: -2
        },
        onTry: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Extreme Evoboost", target);
        },
        ignoreImmunity: true,
        ignoreEvasion: true,
        ignoreDefensive: true,
        secondary: false,
        target: "normal",
        type: "Normal"
    },
    "failedexperiment": {
        basePower: 120,
        accuracy: 100,
        noSketch: true,
        category: "Special",
        desc: "Special, 100 BP, 100% accuracy, Psychic, Special, 250 Z-Move Power, Badly poisons and confuses target, Mirrorable, and Blocked by Protect.",
        flags: {
            protect: 1,
            mirror: 1
        },
        status: "tox",
        shortDesc: "Badly poison + Confuses target, 120 BP, 100% accuracy, Special.",
        pp: 15,
        secondary: false,
        volatileStatus: "confusion",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Transform", target);
        },
        target: "normal",
        type: "Psychic",
        gen: -1,
        contestType: "Tough",
        zMovePower: 250,
    },
    "unaffected": {
        id: "unaffected",
        name: "Unaffected",
        desc: "Boosts own Defense, Special Attack by 3 stages, and its Special Defense by 2 stages.",
        shortDesc: "+2 SpD, +3 Def & SpA",
        basePower: 0,
        category: "Status",
        flags: {
            snatch: 1
        },
        boosts: {
            def: 3,
            spa: 3,
            spd: 2
        },
        pp: 20,
        accuracy: 100,
        gen: -1,
        contestType: "Cool",
        zMovePower: 250,
        secondary: false,
        onTryHit: function (source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Cosmic Power");
            this.add('-anim', source, "Calm Mind");
            this.add('-anim', source, "Nasty Plot");
            this.add('-anim', source, "Iron Defense");
        },
        type: "Psychic",
        target: "self",
    },
    "smw": {
        id: "smw",
        name: "SM+W",
        shortDesc: "Scald + Muddy Water",
        basePower: 100,
        category: "Special",
        flags: {
            protect: 1,
            mirror: 1
        },
        accuracy: 100,
        secondary: {
            chance: 50,
            status: "brn",
            boosts: {
                accuracy: -1
            }
        },
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Scald", target);
            this.add('-anim', source, "Muddy Water", target);
        },
        pp: 15,
        target: "normal",
        type: "Water",
        contestType: "Cool",
        zMovePower: 180,
    },
    "wha": {
        id: "wha",
        name: "Wha?",
        category: "Special",
        basePower: 100,
        volatileStatus: "partiallytrapped",
        secondaries: [{
            volatileStatus: 'confusion',
        }, {
            chance: 15,
            volatileStatus: 'flinch',
        }, ],
        boosts: {
            spe: -6
        },
        status: "par",
        pp: 15,
        flags: {
            protect: 1,
            mirror: 1
        },
        accuracy: 100,
        target: "normal",
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Psyshock", target);
            this.add('-anim', source, "Whirlpool", target);
        },
        contestType: "Tough",
        type: "Psychic",
        zMovePower: 180,
    },
    "irm": {
        id: "irm",
        name: "IRM",
        basePower: 0,
        accuracy: 100,
        heal: [1, 2],
        pp: 20,
        category: "Status",
        flags: {
            snatch: 1,
            heal: 1
        },
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Aromatherapy");
            this.add('-anim', source, "Rapid Spin", target);
        },
        secondary: false,
        onHit: function (pokemon, source, move) {
            this.add('-activate', source, 'move: IRM');
            let side = pokemon.side;
            for (let i = 0; i < side.pokemon.length; i++) {
                if (side.pokemon[i] !== source && ((side.pokemon[i].hasAbility('sapsipper')) ||
                        (side.pokemon[i].volatiles['substitute'] && !move.infiltrates))) {
                    continue;
                }
                side.pokemon[i].cureStatus();
            }
            if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
                this.add('-end', pokemon, 'Leech Seed', '[from] move: IRM', '[of] ' + pokemon);
            }
            let sideConditions = {
                spikes: 1,
                toxicspikes: 1,
                stealthrock: 1,
                stickyweb: 1
            };
            for (let i in sideConditions) {
                if (pokemon.hp && pokemon.side.removeSideCondition(i)) {
                    this.add('-sideend', pokemon.side, this.getEffect(i).name, '[from] move: IRM', '[of] ' + pokemon);
                }
            }
            if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
                pokemon.removeVolatile('partiallytrapped');
            }
        },
        contestType: "Cool",
        target: "self",
        zMoveEffect: 'clearnegativeboost',
    },
    "topkeko": {
        id: "topkeko",
        name: "top keko",
        basePower: 100,
        accuracy: true,
        pp: 15,
        selfSwitch: true,
        contestType: "Cool",
        zMovePower: 210,
        flags: {
            protect: 1,
            contact: 1
        },
        secondary: false,
        priority: 0,
        category: "Physical",
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Volt Switch", target);
        },
        boosts: {
            atk: -1
        },
        target: "normal",
        type: "Fairy",
    },
    "firethecannons": {
        id: "firethecannons",
        name: "Fire the Cannons",
        basePower: 100,
        accuracy: 100,
        pp: 15,
        category: "Physical",
        secondary: {
            chance: 50,
            status: "brn"
        },
        priority: 1,
        boosts: {
            def: -1
        },
        self: {
            boosts: {
                atk: 1
            }
        },
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Fire Blast", target);
        },
        target: "any",
        flags: {
            protect: 1,
            mirror: 1,
            contact: 1,
            distance: 1,
            nonsky: 1,
            gravity: 1,
            defrost: 1
        },
        zMovePower: 100,
        contestType: "Tough",
        onEffectiveness: function (typeMod, type, move) {
            return typeMod + this.getEffectiveness('Fire', type);
        },
        desc: "Normal, Fire effectiveness, 100 BP, Lowers target's Defense by one stage, Physical, 15 PP, +1 priority, Distance, Boosts own Attack by one stage",
        shortDesc: "Normal, Fire effectiveness, 100 BP, Lowers target's Defense by one stage, Physical, 15 PP, +1 priority, Distance, Boosts own Attack by one stage",
        type: "Normal",
    },
    "secretservice": {
        isNonstandard: true,
        accuracy: true,
        category: "Special",
        id: "secretservice",
        isViable: true,
        name: "Secret Service",
        pp: 5,
        priority: 5,
        basePower: 80,
        flags: {},
        onTryHit: function (source, target) {
            this.attrLastMove("[still]");
        },
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
                // protect
                this.useMove("Protect", pokemon);
                let subs = [
                    ["shellsmash", "cosmicpower"],
                    ["earthpower", "recover"]
                ];
                if (pokemon.template.speciesid === 'dianciemega' && pokemon.formeChange('Carbink')) {
                    subs.forEach(s => setMove(s[0], s[1]));
                    this.add('-formechange', pokemon, 'Carbink', '[msg]');
                }
                else if (pokemon.formeChange('Carbink')) {
                    subs.forEach(s => setMove(s[1], s[0]));
                    this.add('-formechange', pokemon, 'Diancie-Mega', '[msg]');
                }
                // make changing form available in consecutive turns
                delete pokemon.volatiles.stall;
            },
        },
        target: "normal",
        type: "Rock",
    },
    "nowimfire": {
        id: "nowimfire",
        name: "Now I'm Fire",
        basePower: 120,
        accuracy: 100,
        pp: 15,
        secondary: false,
        priority: false,
        flags: {
            contact: 1,
            protect: 1,
            mirror: 1
        },
        self: {
            boosts: {
                atk: 1,
                def: 1,
                spd: 1,
                spe: 1
            }
        },
        drain: [1, 2],
        onHit: function (source) {
            this.setWeather('sunnyday');
        },
        onTryHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Flare Blitz", target);
        },
        category: "Physical",
        type: "Fire",
        target: "normal",
    },
};
