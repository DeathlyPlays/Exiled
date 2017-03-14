'use strict';

exports.BattleMovedex = {
    "aircutter": {
        num: 314,
        accuracy: 100,
        basePower: 90,
        category: "Special",
        desc: "Has a higher chance for a critical hit.",
        shortDesc: "High critical hit ratio. Hits adjacent foes.",
        id: "aircutter",
        name: "Air Cutter",
        pp: 25,
        priority: 0,
        flags: {
            protect: 1,
            mirror: 1
        },
        critRatio: 2,
        secondary: false,
        target: "allAdjacentFoes",
        type: "Flying",
        contestType: "Cool",
    },
    "flamethrower": {
        inherit: true,
        basePower: 95,
    },
    "icebeam": {
        inherit: true,
        basePower: 95,
    },
    "surf": {
        inherit: true,
        basePower: 95,
    },
    "thunderbolt": {
        inherit: true,
        basePower: 95,
    },
};
