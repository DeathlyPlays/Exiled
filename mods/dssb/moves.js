'use strict';

exports.BattleMovedex = {
    //deathlyplays
    "aquasubscribe": {
        id: "aquasubscribe",
        name: "Aqua Subscribe",
        priority: 1,
        self: {
            boosts: {
                spa: 1,
                spe: 1
            }
        },
        flags: {
            protect: 1,
            mirror: 1
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
    //DeathlyPlays
    "exiledfromallothers": {
        id: "exiledfromallothers",
        name: "Exiled From All Others",
        basePower: 140,
        accuracy: 100,
        pp: 1,
        secondary: false,
        category: "Special",
        isViable: true,
        isZ: "playniumz",
        priority: 1,
        flags: {
            protect: 1
        },
        self: {
            boosts: {
                atk: 1,
                def: 1,
                spa: 1,
                spd: 1,
                spe: 1,
                accuracy: 1,
                evasion: 1
            }
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
    "superflyslazers": {
        id: "superflyslazers",
        name: "Super Flys Lazers",
        priority: 0,
        flags: {
            protect: 1,
            mirror: 1
        },
        secondary: {
            chance: 20,
            volatileStatus: "confusion"
        },
        category: "Special",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Thunderbolt", target);
        },
        basePower: 120,
        pp: 15,
        accuracy: 80,
        target: "normal",
        type: "Electric",
        zMovePower: 240,
        contestType: "Cool",
    },
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
                spe: 1
            }
        },
        status: "frz",
        category: "Special",
        flags: {
            protect: 1,
            mirror: 1
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Nasty Plot", target);
            this.add('-anim', source, "Blizzard", target);
        },
        type: "Ice",
        target: "normal",
    },
    "karpsfist": {
        id: "karpsfist",
        name: "Karp's Fist",
        category: "Physical",
        basePower: 150,
        pp: 5,
        priority: false,
        flags: {
            protect: 1,
            contact: 1,
            punch: 1,
            authentic: 1
        },
        self: {
            onHit: function (pokemon, target, move) {
                // substitute moves
                function setMove(oldMove, moveid) {
                    let index = pokemon.moves.indexOf(oldMove);
                    if (index === -1) return;
                    let move = Tools.getMove(moveid);
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
                    ["shadowsneak", "shadowsneak"],
                    ["spectralthief", "spectralthief"],
                    ["drainpunch", "drainpunch"]
                ];
                if (pokemon.template.speciesid === 'marshadow' && pokemon.formeChange('Magikarp')) {
                    subs.forEach(s => setMove(s[0], s[1]));
                    this.add('-formechange', pokemon, 'Magikarp', '[msg]');
                }
                else if (pokemon.formeChange('Magikarp')) {
                    subs.forEach(s => setMove(s[1], s[0]));
                    this.add('-formechange', pokemon, 'Marshadow', '[msg]');
                }
                // make changing form available in consecutive turns
                delete pokemon.volatiles.stall;
            },
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Magikarp's Revenge", target);
        },
        type: "Water",
        target: "normal",
    },
    "zombiekiller": {
        id: "zombiekiller",
        name: "Zombie Killer",
        basePower: 100,
        accuracy: 100,
        onEffectiveness: function (typeMod, type) {
            if (type === 'Ghost') return 1;
        },
        category: "Special",
        pp: 5,
        priority: false,
        secondary: false,
        flags: {
            protect: 1
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Flash Cannon", target);
        },
        type: "Steel",
        target: "normal",
    },
    "dyingstar": {
        id: "dyingstar",
        name: "Dying Star",
        selfdestruct: "always",
        basePower: 250,
        category: "Special",
        accuracy: true,
        priority: 1,
        pp: 5,
        flags: {
            protect: 1,
            mirror: 1,
            defrost: 1
        },
        onHit: function (target, source, move) {
            this.add('c|%Bronze0re|RIP Star');
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Explosion", target);
        },
        type: "Fire",
        target: "normal",
        secondary: false,
    },
    "mosmerobeam": {
        id: "mosmerobeam",
        name: "mosmerobeam",
        basePower: 90,
        pp: 15,
        category: "Special",
        accuracy: 95,
        secondary: {
            chance: 30,
            volatileStatus: "attract"
        },
        priority: false,
        flags: {
            protect: 1,
            mirror: 1
        },
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Dark Pulse", target)
            this.add('-anim', source, "10,000,000 Volt Thunderbolt", target);
        },
        type: "Dark",
        target: "normal",
    },
    "littering": {
        id: "littering",
        name: "Littering",
        basePower: 250,
        category: "Physical",
        accuracy: 100,
        secondary: false,
        sideCondition: 'stealthrock',
        priority: false,
        flags: {
            protect: 1,
            mirror: 1
        },
        selfdestruct: "always",
        pp: 5,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Stealth Rock", target);
            this.add('-anim', source, "Explosion", target);
        },
        type: "Water",
        target: "normal",
    },
    "botpowers": {
        id: "botpowers",
        name: "Bot Powers",
        basePower: 140,
        accuracy: 40,
        forceSwitch: true,
        priority: -2,
        flags: {
            protect: 1,
            mirror: 1
        },
        secondary: false,
        pp: 5,
        category: "Special",
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Draco Meteor", target);
        },
        type: "Dragon",
        target: "normal",
    },
    "dankmemes": {
        id: "dankmemes",
        name: "DANK MEMES",
        basePower: 90,
        accuracy: 90,
        multihit: 2,
        category: "Physical",
        pp: 5,
        secondaries: [{
            chance: 20,
            status: 'par',
        }, {
            chance: 20,
            status: 'psn',
        }, ],
        flags: {
            protect: 1,
            mirror: 1
        },
        priority: 0,
        onPrepareHit: function (target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Double Hit", target);
        },
        type: "Normal",
        target: "normal",
    },
    "solargain": {
        id: "solargain",
        name: "Solar Gain",
        accuracy: true,
        basePower: 0,
        category: "Status",
        pp: 5,
        priority: 0,
        flags: {
            snatch: 1,
            heal: 1
        },
        boosts: {
            atk: 2,
            spe: 2
        },
        onHit: function (pokemon) {
            if (this.isWeather(['sunnyday', 'desolateland'])) {
                this.heal(this.modify(pokemon.maxhp, 0.667));
            }
            else if (this.isWeather(['raindance', 'primordialsea', 'sandstorm', 'hail'])) {
                this.heal(this.modify(pokemon.maxhp, 0.25));
            }
            else {
                this.heal(this.modify(pokemon.maxhp, 0.5));
            }
        },
        secondary: false,
        target: "self",
        type: "Grass",
        zMoveEffect: 'clearnegativeboost',
        contestType: "Clever",
    },
    "searingsarcasm": {
        id: "searingsarcasm",
        name: "Searing Sarcasm",
        basePower: 100,
        accuracy: 100,
        onHit: function (pokemon) {
            this.setWeather('sunnyday');
        },
        pp: 15,
        priority: 0,
        category: "Physical",
        secondary: false,
        target: "normal",
        flags: {
            protect: 1,
            mirror: 1
        },
        type: "Fire",
    },
    "trialanderror": {
        id: "trialanderror",
        name: "Trial and Error",
        basePower: 60,
        accuracy: true,
        onPrepareHit: function (target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Focus Blast", target);
            move.type = Object.keys(Tools.data.TypeChart).randomize()[0];
        },
        ignoreAbility: true,
        pp: 15,
        multihit: 2,
        self: {
            boosts: {
                spa: 1
            }
        },
        category: "Special",
        flags: {
            protect: 1,
            mirror: 1
        },
        target: "normal",
        type: "Normal",
    },
};
