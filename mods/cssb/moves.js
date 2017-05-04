'use strict';

exports.BattleMovedex = {
    //exclaimer
    "stickyearthpower": {
        id: "stickyearthpower",
        name: "Sticky Earth Power",
        basePower: 90,
        accuracy: 100,
        category: "Special",
        secondary: {
            chance: 20,
            boosts: {
                spd: -1,
            }
        },
        flags: {
            protect: 1,
            mirror: 1,
            nonsky: 1
        },
        pp: 15,
        onHit: function(target, source, move) {
            if (!target.addVolatile('trapped', source, move, 'trapper')) {
                this.add('-fail', target);
            }
            this.add('c|%Exclaimer|Ugh, a disgusting user!');
        },
        onPrepareHit: function(target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Earth Power", target);
        },
        target: "normal",
        type: "Ground",
    },
    //returningavenger
    "borkthecode": {
        id: "borkthecode",
        name: "Bork the Code",
        basePower: 130,
        accuracy: 70,
        pp: 15,
        category: "Special",
        onHit: function(target, source, move) {
            this.add('c|ReturningAvenger|Uh oh..... I need assistance....');
        },
        secondary: {
            chance: 40,
            status: 'tox',
        },
        flags: {
            protect: 1,
            mirror: 1
        },
        onPrepareHit: function(target, source) {
            this.attrLastMove('-still');
            this.add('-anim', source, "Sludge Wave", target);
        },
        target: "normal",
        type: "Poison",
    },
    //epicumbreon29
    "trickpower": {
        id: "trickpower",
        name: "Trick Power",
        pp: 10,
        priority: 0,
        flags: {
            snatch: 1
        },
        volatileStatus: 'powertrick',
        effect: {
            onStart: function(pokemon) {
                this.add('-start', pokemon, 'Trick Power');
                let newspa = pokemon.stats.spd;
                let newspd = pokemon.stats.spa;
                pokemon.stats.spa = newspa;
                pokemon.stats.spd = newspd;
            },
            onCopy: function(pokemon) {
                let newspa = pokemon.stats.spd;
                let newspd = pokemon.stats.spa;
                pokemon.stats.spa = newspa;
                pokemon.stats.spd = newspd;
            },
            onEnd: function(pokemon) {
                this.add('-end', pokemon, 'Trick Power');
                let newspa = pokemon.stats.spd;
                let newspd = pokemon.stats.spa;
                pokemon.stats.spa = newspa;
                pokemon.stats.spd = newspd;
            },
            onRestart: function(pokemon) {
                pokemon.removeVolatile('Trick Power');
            },
        },
        secondary: false,
        target: "self",
        type: "Dark",
    },
    //epicumbreon29
    "sorry": {
        id: "sorry",
        name: "Sorry",
        pp: 20,
        target: "normal",
        accuracy: 100,
        flags: {
            snatch: 1
        },
        secondary: {
            onTryHit: function(pokemon) {
                let foeactive = pokemon.side.foe.active;
                let stolenBoosts = {};
                for (let i = 0; i < foeactive.length; i++) {
                    let target = foeactive[i];
                    if (!target || !this.isAdjacent(target, pokemon)) continue;
                    // steal boosts
                    ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"].forEach(s => {
                        if (target.boosts[s] && target.boosts[s] > 0) {
                            if (!stolenBoosts[s]) stolenBoosts[s] = 0;
                            stolenBoosts[s] += target.boosts[s];
                            this.add("-unboost", target, s, target.boosts[s]);
                            target.boosts[s] = 0;
                        }
                    });
                }
                this.boost(stolenBoosts, pokemon);
            },
        },
        type: "Dark",
    },
    //jigglykongisfum16
    "sphealwithit": {
        id: "sphealwithit",
        name: "Spheal with It",
        basePower: 0,
        accuracy: 100,
        pp: 15,
        category: "Status",
        secondary: false,
        onHit: function(target, source, move) {
            this.add('c|+JigglykongisFUM16|Spheal with It!');
        },
        boosts: {
            def: 2,
            spa: 2,
            spe: 2,
            spd: 2,
            accuracy: 2,
        },
        flags: {
            snatch: 1
        },
        onPrepareHit: function(target, source) {
            this.attrLastMove('-still');
            this.add('-anim', source, "Quiver Dance", target);
        },
        target: "self",
        type: "Water",
    },
    //animus
    "empoweredendeavor": {
        id: "empoweredendeavor",
        name: "Empowered Endeavor",
        basePower: 9000,
        accuracy: 50,
        noFaint: true,
        category: "Special",
        pp: 40,
        secondary: false,
        flags: {
            protect: 1,
            mirror: 1
        },
        onPrepareHit: function(target, source) {
            this.attrLastMove('-still');
            this.add('-anim', source, "False Swipe", target);
            this.add('-anim', source, "Endeavor", target);
        },
        target: "normal",
        type: "Grass",
    },
    //vulpixmayhem
    "mayhem": {
        id: "mayhem",
        name: "MAYHEM",
        basePower: 120,
        accuracy: 100,
        category: "Special",
        pp: 15,
        secondary: false,
        self: {
            boosts: {
                spa: 1,
                def: 1,
                spd: 1,
                spe: 1,
                accuracy: 1,
            },
        },
        flags: {
            protect: 1,
            mirror: 1
        },
        onHit: function(target, source, move) {
            this.add('c|+vulpix mayhem|Time to cause some mayhem!');
        },
        onPrepareHit: function(target, source) {
            this.attrLastMove('-still');
            this.add('-anim', source, "Overheat");
            this.add('-anim', source, "Outrage");
            this.add('-anim', source, "Rage");
        },
        target: "normal",
        type: "Fire",
    },
    //healndeal
    "uberboober": {
        id: "uberboober",
        name: "Uber Boober",
        accuracy: 100,
        basePower: 80,
        category: "Special",
        pp: 10,
        priority: 0,
        flags: {
            protect: 1,
            mirror: 1,
            distance: 1,
            heal: 1
        },
        drain: [1, 2],
        onHit: function(target, source, move) {
            this.add('c|#HealNDeal|ima uber and you\'re a n00ber');
        },
        onPrepareHit: function(target, source) {
            this.attrLastMove('-still');
            this.add('-anim', source, "Oblivion Wing");
        },
        secondary: false,
        target: "any",
        type: "Fire",
    },
    //cbrevan
    "randsalad": {
        id: "randsalad",
        name: "randsalad",
        accuracy: 90,
        basePower: 120,
        category: "Physical",
        priority: 0,
        pp: 15,
        flags: {
            protect: 1,
            mirror: 1,
            contact: 1
        },
        secondary: {
            chance: 50,
            status: "brn",
        },
        onHit: function(target, source, move) {
            this.add('c|+Art2D2|Random Salad: FUCK YOU');
        },
        onPrepareHit: function(target, source) {
            this.attrLastMove('-still');
            this.add('-anim', source, "Phantom Force");
        },
        target: "Normal",
        type: "Ghost",
    },
    //gday
    "feelsjig": {
        accuracy: true,
        basePower: 0,
        category: "Status",
        id: "feelsjig",
        name: "feelsjig",
        pp: 10,
        priority: 0,
        flags: {
            snatch: 1
        },
        boosts: {
            atk: 1,
            def: 1,
            spa: 1,
            spd: 1,
            spe: 1,
            accuracy: 1,
        },
        onTry: function(pokemon, target) {
            if (pokemon.activeTurns > 1) {
                this.add('-fail', pokemon);
                this.add('-hint', "feelsjig only works on your first turn out.");
                return null;
            }
        },
        onTryHit: function(target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', target, "Geomancy", target);
        },
        secondary: false,
        target: "self",
        type: "Fairy",
    },
    //bionicpuppy
    "mushroomascent": {
        id: "mushroomascent",
        name: "Mushroom Ascent",
        basePower: 0,
        accuracy: true,
        ohko: true,
        category: "Special",
        pp: 15,
        secondary: false,
        flags: {
            protect: 1,
            mirror: 1
        },
        onPrepareHit: function(target, source) {
            this.attrLastMove('-still');
            this.add('-anim', source, "Dragon Ascent");
        },
        onTryHit: function(target, source) {
            return target.hasType(source.getTypes());
        },
        target: "normal",
        type: "Grass",
    },
    //quanyalis
    "raycast": {
        id: "raycast",
        name: "Raycast",
        pp: 10,
        basePower: 25,
        multihit: [2, 8],
        category: "Special",
        accuracy: 50,
        secondary: false,
        flags: {
            protect: 1,
            mirror: 1
        },
        chance: 10,
        boosts: {
            accuracy: -1,
        },
        onPrepareHit: function(target, source) {
            this.attrLastMove('-still');
            this.add('-anim', source, "Bullet Seed");
        },
        target: "normal",
        type: "Fire",
    },
    //boxofkangaroos
    "boxcutter": {
        id: "boxcutter",
        name: "Box Cutter",
        pp: 15,
        basePower: 95,
        accuracy: 100,
        category: "Physical",
        secondary: false,
        critRatio: 2,
        onPrepareHit: function(target, source) {
            this.attrLastMove('-still');
            this.add('-anim', source, "Meteor Mash");
        },
        target: "normal",
        flags: {
            protect: 1,
            mirror: 1,
            contact: 1
        },
        type: "Steel",
    },
    //tamas
    "smokeweederryday": {
        accuracy: 100,
        category: "Status",
        id: "smokeweederryday",
        name: "Smoke Weed Erry Day",
        basePower: 0,
        pp: 5,
        priority: 1,
        flags: {
            protect: 1,
            mirror: 1,
            reflectable: 1,
            powder: 1
        },
        secondary: false,
        sideCondition: "stickyweb",
        onHit: function(target, source, move) {
            if (!target.addVolatile('trapped', source, move, 'trapper')) {
                this.add('-fail', target);
            }
        },
        status: "slp",
        onPrepareHit: function(target, source) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Sticky Web", target);
            this.add('-anim', source, "Spore", target);
        },
        target: "normal",
        type: "Grass",
    },
    //khosro	
    "choke": {
        accuracy: 100,
        basePower: 100,
        category: "Physical",
        id: "choke",
        name: "Choke",
        pp: 10,
        priority: 0,
        flags: {
            protect: 1,
            mirror: 1,
            contact: 1
        },
        secondary: false,
        target: "normal",
        type: "Dragon",
    },
    //snobalt   
    "capbust": {
        id: "capbust",
        name: "CAP Bust",
        basePower: 90,
        accuracy: 100,
        pp: 10,
        drain: [1, 2],
        onEffectiveness: function(typeMod, type, move) {
            return typeMod + this.getEffectiveness('Poison', type);
        },
        onPrepareHit: function(target, source) {
            this.attrLastMove('-still');
            this.add('-anim', source, "Night Shade");
        },
        category: "Special",
        target: "normal",
        type: "Dark",
    },
    //deckknight
    "piratedfirewall": {
        id: "piratedfirewall",
        name: "Pirated Firewall",
        basePower: 90,
        accuracy: 100,
        pp: 15,
        category: "Special",
        secondary: false,
        self: {
            boosts: {
                def: 1,
                spd: 1,
            },
        },
        onHit: function(target, source, move) {
            this.add('c|@Deck Knight|Just hold there a sec, making system changes....');
        },
        volatileStatus: 'partiallytrapped',
        flags: {
            protect: 1,
            mirror: 1
        },
        onPrepareHit: function(target, source) {
            this.attrLastMove('-still');
            this.add('-anim', source, "Flamethrower", target);
            this.add('-anim', source, "Fire Spin", target);
        },
        target: "normal",
        type: "Fire",
    },
};
