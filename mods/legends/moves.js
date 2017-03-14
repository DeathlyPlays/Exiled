'use strict';

exports.BattleMovedex = {
    "subzerofrostbite": {
        accuracy: 100,
        basePower: 90,
        category: "Special",
        id: "subzerofrostbite",
        isViable: true,
        name: "Subzero Frostbite",
        pp: 15,
        priority: 0,
        flags: {
            protect: 1,
            mirror: 1
        },
        secondary: {
            chance: 50,
            status: 'frz',
        },
        onEffectiveness: function (typeMod, type) {
            if (type === 'Water') return 1;
        },
        target: "normal",
        type: "Ice",
        zMovePower: 175,
        contestType: "Beautiful",
    },
    "zapblast": {
        accuracy: 100,
        basePower: 90,
        category: "Special",
        id: "zapblast",
        name: "Zap Blast",
        pp: 15,
        priority: 0,
        flags: {
            protect: 1,
            mirror: 1
        },
        secondary: {
            chance: 50,
            status: 'par',
        },
        target: "normal",
        type: "Electric",
        zMovePower: 175,
        contestType: "Cool",
    },
    "sacredbirb": {
        accuracy: 100,
        basePower: 150,
        category: "Special",
        id: "sacredbirb",
        isViable: true,
        name: "Sacred Birb",
        pp: 15,
        priority: 0,
        flags: {
            contact: 1,
            protect: 1,
            mirror: 1,
            distance: 1
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
                // protect
                this.useMove("Protect", pokemon);
                let subs = [
                    ["seedflare", "roost"],
                    ["hurricane", "sacredfire"],
                    ["blueflare", "thousandarrows"]
                ];
                if (pokemon.template.speciesid === 'moltres' && pokemon.formeChange('Ho-Oh')) {
                    subs.forEach(s => setMove(s[0], s[1]));
                    this.add('-formechange', pokemon, 'Ho-Oh', '[msg]');
                }
                else if (pokemon.formeChange('Ho-Oh')) {
                    subs.forEach(s => setMove(s[1], s[0]));
                    this.add('-formechange', pokemon, 'Ho-Oh', '[msg]');
                }
                // make changing form available in consecutive turns
                delete pokemon.volatiles.stall;
            },
        },
        recoil: [33, 100],
        secondary: false,
        target: "any",
        type: "Flying",
        zMovePower: 250,
        contestType: "Cool",
    },
    "bravebirb": {
        accuracy: 100,
        basePower: 150,
        category: "Physical",
        id: "bravebirb",
        isViable: true,
        name: "Brave Birb",
        pp: 15,
        priority: 0,
        flags: {
            contact: 1,
            protect: 1,
            mirror: 1,
            distance: 1
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
                // protect
                this.useMove("Protect", pokemon);
                let subs = [
                    ["roost", "seedflare"],
                    ["sacredfire", "hurricane"],
                    ["thousandarrows", "blueflare"],
                ];
                if (pokemon.template.speciesid === 'hooh' && pokemon.formeChange('Moltres')) {
                    subs.forEach(s => setMove(s[0], s[1]));
                    this.add('-formechange', pokemon, 'Moltres', '[msg]');
                }
                else if (pokemon.formeChange('Moltres')) {
                    subs.forEach(s => setMove(s[1], s[0]));
                    this.add('-formechange', pokemon, 'Ho-Oh', '[msg]');
                }
                // make changing form available in consecutive turns
                delete pokemon.volatiles.stall;
            },
        },
        recoil: [33, 100],
        secondary: false,
        target: "any",
        type: "Flying",
        zMovePower: 250,
        contestType: "Cool",
    },
    "greatwallofhealing": {
        accuracy: true,
        basePower: 0,
        category: "Status",
        id: "greatwallofhealing",
        isViable: true,
        name: "Great Wall of Healing",
        pp: 10,
        self: {
            heal: [1, 2],
        },
        allyTeam: {
            onHit: function (pokemon, source) {
                this.add('-activate', source, 'move: Heal Bell');
                let side = pokemon.side;
                for (let i = 0; i < side.pokemon.length; i++) {
                    if (side.pokemon[i].hasAbility('soundproof')) continue;
                    side.pokemon[i].cureStatus();
                }
            },
        },
        priority: 0,
        flags: {
            snatch: 1,
            sound: 1,
            distance: 1,
            authentic: 1
        },
        target: "normal",
        type: "Psychic",
    },
    "genesissupernova": {
        inherit: true,
        pp: 10,
    },
};
