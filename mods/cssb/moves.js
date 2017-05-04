,
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
