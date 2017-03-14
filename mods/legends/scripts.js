'use strict';

exports.BattleScripts = {
    randomLegendaryTeam: function (side) {
        let userid = toId(side.name);
        let team = [];
        var variant = (this.random(2) === 1);
        var sets = {
            //gen 1
            'Articuno': {
                species: 'Articuno',
                item: 'Leftovers',
                ability: 'The Frozen One',
                moves: ['calmmind', 'hurricane', 'roost'],
                baseSignatureMove: "subzerofrostbite",
                signatureMove: "Subzero Frostbite",
                evs: {
                    hp: 252,
                    spd: 252,
                    spa: 4
                },
                ivs: {
                    hp: 31,
                    atk: 0,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31
                },
                nature: 'Calm',
            },
            "Zapdos": {
                species: "Zapdos",
                item: "Leftovers",
                ability: "Instinct",
                moves: ['roost', 'defog', 'hurricane'],
                baseSignatureMove: "zapblast",
                signatureMove: "Zap Blast",
                evs: {
                    spa: 252,
                    hp: 252,
                    spd: 4
                },
                ivs: {
                    hp: 31,
                    atk: 0,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31
                },
                nature: "Modest",
            },
            "Moltres": {
                species: "Moltres",
                item: "Choice Scarf",
                ability: "Valor",
                moves: ['seedflare', 'hurricane', 'blueflare'],
                baseSignatureMove: "sacredbirb",
                signatureMove: "Sacred Birb",
                evs: {
                    spa: 252,
                    spe: 252,
                    hp: 4
                },
                ivs: {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31
                },
                nature: "Timid",
            },
            "Mew": {
                species: "Mew",
                item: "Leftovers",
                ability: "Failed Experiment",
                moves: ['moonblast', 'secretsword', 'recover'],
                signatureMove: "Genesis Supernova",
                evs: {
                    spa: 252,
                    hp: 252,
                    spd: 4
                },
                ivs: {
                    hp: 31,
                    atk: 0,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31
                },
                nature: "Modest",
            },
            "Mewtwo": {
                species: "Mewtwo-Mega-Y",
                item: "Choice Specs",
                ability: "Am Just Clone",
                moves: ['aurasphere', 'moonblast', 'blueflare'],
                signatureMove: "Psystrike",
                evs: {
                    spa: 252,
                    spe: 252,
                    hp: 4
                },
                ivs: {
                    hp: 31,
                    atk: 0,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31
                },
                nature: "Timid",
            },
            // gen 2
            "Ho-Oh": {
                species: "Ho-Oh",
                ability: "Thanksgiving",
                item: "Leftovers",
                moves: ['roost', 'sacredfire', 'thousandarrows'],
                baseSignatureMove: "bravebirb",
                signatureMove: "Brave Birb",
                evs: {
                    atk: 252,
                    hp: 252,
                    def: 4
                },
                ivs: {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31
                },
                nature: "Adamant",
            },
            "Lugia": {
                species: "Lugia",
                item: "Leftovers",
                ability: "Bulk Lord",
                moves: ['roost', 'toxic', 'cosmicpower'],
                baseSignatureMove: "greatwallofhealing",
                signatureMove: "Great Wall of Healing",
                evs: {
                    hp: 252,
                    spd: 252,
                    def: 4
                },
                ivs: {
                    hp: 31,
                    atk: 0,
                    def: 31,
                    spa: 31,
                    spd: 31,
                    spe: 31
                },
                nature: "Calm",
            },
        };

        let pool = Object.keys(sets);
        for (let i = 0; i < 6; i++) {
            let name = this.sampleNoReplace(pool);
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
