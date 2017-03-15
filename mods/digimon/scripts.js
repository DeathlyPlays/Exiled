/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  Digimon Showdown                                             *
 *  Created By:                                                  *
 *  Insist + Ashley the Pikachu + Stellation + AlfaStorm + Volco *
 *  Special Thanks to:                                           *
 *  HoeenCoder (Assisted with Mechanics)                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

'use strict';

exports.BattleScripts = {
    randomDigimonTeam: function (side) {
        let team = [];
        var variant = (this.random(2) === 1);
        var sets = {
            "Botamon": {
                species: "Botamon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Poyomon": {
                species: "Poyomon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Punimon": {
                species: "Punimon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Yuramon": {
                species: "Yuramon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Koromon": {
                species: "Koromon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Tokomon": {
                species: "Tokomon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Tsunomon": {
                species: "Tsunomon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Tanemon": {
                species: "Tanemon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Agumon": {
                species: "Agumon",
                ability: "Vaccine",
                moves: ['firetower', 'spitfire', 'redinferno', 'magmabomb', 'heatlaser', 'musclecharge', 'sonicjab'],
                baseSignatureMove: "pepperbreath",
                signatureMove: "Pepper Breath",
                nature: "Serious",
            },
            "Gabumon": {
                species: "Gabumon",
                ability: "Data",
                moves: ['firetower', 'heatlaser', 'tremar', 'warcry', 'sonicjab', 'dynamitekick', 'megatonpunch'],
                baseSignatureMove: "blueblaster",
                signatureMove: "Blue Blaster",
                nature: "Serious",
            },
            "Patamon": {
                species: "Patamon",
                ability: "Data",
                moves: ['warcry', 'sonicjab', 'dynamitekick', 'busterdrive', 'spinningshot', 'windcutter', 'confusedstorm'],
                baseSignatureMove: "boombubble",
                signatureMove: "Boom Bubble",
                nature: "Serious",
            },
            "Elecmon": {
                species: "Elecmon",
                ability: "Data",
                moves: ['musclecharge', 'dynamitekick', 'counter', 'electriccloud', 'megalospark', 'staticelect', 'windcutter'],
                baseSignatureMove: "superthunderstrike",
                signatureMove: "Super Thunder Strike",
                nature: "Serious",
            },
            "Biyomon": {
                species: "Biyomon",
                ability: "Vaccine",
                moves: ['spitfire', 'heatlaser', 'spinningshot', 'electriccloud', 'windcutter', 'confusedstorm', 'hurricane'],
                signatureMove: "Spiral Twister",
                nature: "Serious",
            },
            "Kunemon": {
                species: "Kunemon",
                ability: "Virus",
                moves: ['electriccloud', 'megalospark', 'staticelect', 'poisonpowder', 'massmorph', 'poisonclaw', 'dangersting'],
                baseSignatureMove: "electricthread",
                signatureMove: "Electric Thread",
                nature: "Serious",
            },
            "Palmon": {
                species: "Palmon",
                ability: "Vaccine",
                moves: ['poisonpowder', 'massmorph', 'charmperfume', 'poisonclaw', 'waterblit', 'aquamagic', 'teardrop'],
                baseSignatureMove: "poisonivy",
                signatureMove: "Poison Ivy",
                nature: "Serious",
            },
            "Betamon": {
                species: "Betamon",
                ability: "Virus",
                moves: ['electriccloud', 'staticelect', 'gigafreeze', 'winterblast', 'iceneedle', 'waterblit', 'aquamagic'],
                baseSignatureMove: "electricshock",
                signatureMove: "Electric Shock",
                nature: "Serious",
            },
            "Penguinmon": {
                species: "Penguinmon",
                ability: "Data",
                moves: ['charmperfume', 'poisonclaw', 'gigafreeze', 'winterblast', 'iceneedle', 'waterblit', 'aquamagic'],
                baseSignatureMove: "superslap",
                signatureMove: "Super Slap",
                nature: "Serious",
            },
            "Greymon": {
                species: "Greymon",
                ability: "Vaccine",
                moves: ['firetower', 'promiencebeam', 'spitfire', 'redinferno', 'magmabomb', 'heatlaser', 'meltdown', 'musclecharge', 'dynamitekick', 'counter', 'spinningshot', 'megalospark'],
                baseSignatureMove: "megaflame",
                signatureMove: "Mega Flame",
                nature: "Serious",
            },
        };
        //Generate the team randomly.
        let pool = Object.keys(sets);
        for (let i = 0; i < 6; i++) {
            let name = this.sampleNoReplace(pool);
            let set = sets[name];
            set.level = 100;
            set.name = name;
            let sigItems = ['Small Recovery', 'Medium Recovery', 'Large Recovery', 'Super Recovery Floppy', 'MP Floppy', 'Medium MP Floppy', 'Large MP Floppy', 'Various', 'Protection', 'Omnipotent', 'Double Floppy', 'Restore Floppy', 'Super Restore Floppy', 'Offense Disk', 'Defense Disk', 'Hi Speed Disk', 'Super Defense Disk', 'Super Offense Disk', 'Super Speed Disk', 'Omnipotent Disk'];
            let choosenItems = [];
            for (let h = 0; h < 4; h++) {
                let itemChoosen = sigItems[Math.floor(Math.random() * sigItems.length)];
                let rejected = false;
                if (choosenItems.length !== 0) {
                    for (let k = 0; k < choosenItems.length; k++) {
                        if (choosenItems[k] === itemChoosen) rejected = true;
                    }
                }
                if (!rejected) {
                    choosenItems.push(itemChoosen);
                }
                else {
                    h--;
                }
                if (h === 3 && choosenItems.length !== 4) h--;
            }
            set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), 'Protect', set.protectingMove].concat(choosenItems);
            team.push(set);
        }
        return team;
    },
};
