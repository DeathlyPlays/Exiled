'use strict';

exports.BattleMovedex = {
    //Scrafty
    "hoodlumswarm": {
        id: "hoodlumswarm",
        name: "Hoodlum Swarm",
        recoil: [1, 3],
        category: "Physical",
        secondary: false,
        pp: 5,
        flags: {
            protect: 1,
            mirror: 1,
            contact: 1
        },
        basePower: 140,
        accuracy: 80,
        priority: 0,
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Beat Up", target);
        },
        target: "Normal",
        type: "Dark",
    },
    //Aggron
    "ironwarhammer": {
        id: "ironwarhammer",
        name: "Iron War Hammer",
        recoil: [1, 2],
        basePower: 150,
        accuracy: 80,
        pp: 10,
        flags: {
            protect: 1,
            mirror: 1,
            contact: 1
        },
        secondary: false,
        category: "Physical",
        priority: 0,
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Iron Head", target);
        },
        target: "normal",
        type: "Steel",
    },
    //Relicanth
    "ireallycan": {
        id: "ireallycan",
        name: "I Really Can",
        recoil: [1, 2],
        basePower: 170,
        accuracy: 80,
        pp: 5,
        secondary: false,
        flags: {
            mirror: 1,
            protect: 1
        },
        category: "Physical",
        priority: 0,
        target: "Normal",
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Waterfall", target);
        },
        type: "Water",
    },
    //Hydreigon
    "hydra": {
        id: "hydra",
        name: "Hydra",
        recoil: [1, 4],
        category: "Physical",
        basePower: 130,
        flags: {
            protect: 1,
            mirror: 1,
            contact: 1
        },
        accuracy: 90,
        secondary: false,
        pp: 5,
        target: "Normal",
        priority: 0,
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Draco Meteor", target);
        },
        type: "Dragon",
    },
    //Hydreigon
    "evilintentions": {
        id: "evilintentions",
        name: "Evil Intentions",
        recoil: [1, 4],
        category: "Physical",
        basePower: 130,
        flags: {
            protect: 1,
            mirror: 1
        },
        accuracy: 90,
        secondary: false,
        pp: 5,
        target: "Normal",
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Nasty Plot", target);
        },
        priority: 0,
        type: "Dark",
    },
    //Corsola
    "toostronk": {
        id: "toostronk",
        name: "TOO STRONK",
        recoil: [1, 3],
        category: "Special",
        basePower: 160,
        accuracy: 90,
        secondary: false,
        flags: {
            protect: 1,
            mirror: 1
        },
        pp: 15,
        priority: 0,
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Hydro Pump", target);
        },
        target: "normal",
        type: "Water",
    },
    //Nidoking
    "shatteringearth": {
        id: "shatteringearth",
        name: "Shattering Earth",
        recoil: [1, 3],
        category: "Physical",
        basePower: 110,
        accuracy: 100,
        flags: {
            protect: 1,
            mirror: 1
        },
        secondary: false,
        pp: 10,
        priority: 0,
        target: "Normal",
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Earthquake", target);
        },
        type: "Ground",
    },
    //Nidoking
    "trashtalk": {
        id: "trashtalk",
        name: "Trash Talk",
        recoil: [1, 4],
        category: "Physical",
        basePower: 120,
        accuracy: 80,
        pp: 10,
        priority: 0,
        flags: {
            protect: 1,
            mirror: 1
        },
        secondary: {
            chance: 30,
            status: 'psn',
        },
        target: "Normal",
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Gunk Shot", target);
        },
        type: "Poison",
    },
    //Gyaratoast
    "breadsmash": {
        accuracy: 85,
        basePower: 150,
        category: "Physical",
        id: "breadsmash",
        name: "BREADSMASH",
        pp: 10,
        priority: 0,
        flags: {
            contact: 1,
            protect: 1,
            mirror: 1
        },
        secondary: {
            chance: 20,
            volatileStatus: 'flinch'
        },
        onHit: function() {
            this.add('c|~Gyaratoast|FUCKING SMASHING!');
        },
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Waterfall", target);
        },
        recoil: [1, 2],
        target: "normal",
        type: "Water",
    },
    //Aegislash
    "livingintheshadows": {
        id: "livingintheshadows",
        name: "Living in the Shadows",
        category: "Physical",
        basePower: 130,
        accuracy: 100,
        recoil: [1, 3],
        secondary: false,
        pp: 10,
        priority: 0,
        target: "normal",
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Shadow Sneak", target);
        },
        type: "Ghost",
    },
    //Aegislash
    "metalsword": {
        id: "metalsword",
        name: "Metal Sword",
        pp: 10,
        basePower: 140,
        accuracy: 90,
        recoil: [1, 3],
        secondary: false,
        priority: 0,
        category: "Physical",
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Sacred Sword", target);
        },
        target: "Normal",
        type: "Steel",
    },
    //Tyrantrum
    "tyrantsrage": {
        id: "tyrantsrage",
        name: "Tyrant's Rage",
        recoil: [1, 3],
        priority: 0,
        pp: 5,
        basePower: 150,
        accuracy: 80,
        secondary: false,
        category: "Physical",
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Outrage", target);
        },
        target: "normal",
        type: "Dragon",
    },
};
