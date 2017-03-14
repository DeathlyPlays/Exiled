'use strict';

Array.prototype.randomize = function () {
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
    randomSeasonalMeleeTeam: function (side) {
        let team = [];
        var variant = (this.random(2) === 1);
        var sets = {
            //Admins
            '~Insist': {
                species: 'Ludicolo',
                ability: 'Crippling Depression',
                item: 'Playnium Z',
                gender: 'M',
                shiny: true,
                moves: ['freezedry', 'gigadrain', 'focusblast'],
                baseSignatureMove: 'aquasubscribe',
                signatureMove: 'Aqua Subscribe',
                evs: {
                    spa: 252,
                    spe: 252,
                    hp: 4
                },
                nature: 'Timid',
            },
            "~UB-03 Xurkitree": {
                species: "Xurkitree",
                ability: "feelsfly",
                item: "Choice Scarf",
                gender: "M",
                moves: ['energyball', 'fireblast', 'icebeam'],
                baseSignatureMove: "superflyslazers",
                signatureMove: "Super Flys Lazers",
                evs: {
                    spa: 252,
                    spe: 252,
                    spd: 6
                },
                nature: "Modest",
            },
            //Bots
            "*Drago Bot": {
                species: "Latios",
                ability: "No Guard",
                item: "Leftovers",
                gender: "N",
                moves: ['zapcannon', 'inferno', 'dynamicpunch'],
                baseSignatureMove: "botpowers",
                signatureMove: "Bot Powers",
                evs: {
                    spa: 252,
                    spe: 252,
                    atk: 4
                },
                nature: "Hasty",
            },
            "*59BoT": {
                species: "Arcanine",
                ability: "Solar Rule",
                item: "Life Orb",
                gender: "N",
                moves: ['solarblade', 'sacredfire', 'diamondstorm'],
                baseSignatureMove: "solargain",
                signatureMove: "Solar Gain",
                evs: {
                    atk: 252,
                    spe: 252,
                    spd: 4
                },
                nature: "Jolly",
            },
            //Moderator
            "@Sukesha": {
                species: "Ninetales-Alola",
                ability: "prfmlmao",
                item: "Life Orb",
                gender: "F",
                moves: ['boomburst', 'psychic', 'earthpower'],
                baseSignatureMove: "prfmador",
                signatureMove: "prfmador",
                evs: {
                    spa: 252,
                    spe: 252,
                    spd: 4
                },
                nature: "Timid",
            },
            "@earl of karp": {
                species: "Marshadow",
                ability: "Adaptability",
                item: "Life Orb",
                gender: "M",
                moves: ['shadowsneak', 'spectralthief', 'drainpunch'],
                baseSignatureMove: "karpsfist",
                signatureMove: "Karp's Fist",
                evs: {
                    atk: 252,
                    spe: 252,
                    def: 4
                },
                nature: "Jolly",
            },
            //Drivers
            "%FiftyNine": {
                species: "Sylveon",
                ability: "Hypothesis",
                item: "Leftovers",
                gender: "M",
                moves: ['revelationdance', 'protect', 'wish'],
                baseSignatureMove: "trialanderror",
                signatureMove: "Trial and Error",
                evs: {
                    hp: 252,
                    def: 252,
                    spa: 4
                },
                nature: "Calm",
            },
            '%Bronze0re': {
                species: 'Volcarona',
                ability: 'Brilliant Scale',
                item: 'Weakness Policy',
                gender: 'M',
                moves: ['quiverdance', 'fierydance', 'oblivionwing'],
                baseSignatureMove: 'dyingstar',
                signatureMove: 'Dying Star',
                evs: {
                    spa: 252,
                    spe: 252,
                    hp: 4
                },
                nature: 'Timid',
            },
            "%nitro62": {
                species: "Infernape",
                ability: "Contrary",
                item: "Leftovers",
                gender: "M",
                moves: ['superpower', 'vcreate', 'icehammer'],
                baseSignatureMove: "searingsarcasm",
                signatureMove: "Searing Sarcasm",
                evs: {
                    atk: 252,
                    spe: 252,
                    spd: 4
                },
                nature: "Jolly",
            },
            //Voices
            "+Mosmero": {
                species: "Hydreigon",
                ability: "Mosmic Power",
                item: "Leftovers",
                gender: "M",
                moves: ['fireblast', 'dragonpulse', 'earthquake'],
                baseSignatureMove: "mosmerobeam",
                signatureMove: "Mosmero Beam",
                evs: {
                    spa: 252,
                    spe: 252,
                    atk: 4
                },
                nature: "Hasty",
            },
            "+Storm Minority": {
                species: "Qwilfish",
                ability: "Iron Barbs",
                item: "Rocky Helmet",
                gender: "M",
                moves: ['spikes', 'toxicspikes', 'taunt'],
                baseSignatureMove: "littering",
                signatureMove: "Littering",
                evs: {
                    hp: 252,
                    spe: 252,
                    atk: 4
                },
                nature: "Jolly",
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
