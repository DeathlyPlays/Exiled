'use strict';

exports.BattleAbilities = {
    "thefrozenone": {
        onStart: function (source) {
            this.setWeather('hail');
        },
        onAfterDamage: function (damage, target, source, move) {
            if (move && move.flags['contact']) {
                if (this.random(10) < 3) {
                    source.trySetStatus('frz', target);
                }
            }
        },
        id: "thefrozenone",
        name: "The Frozen One",
    },
    "instinct": {
        id: "instinct",
        name: "Instinct",
        onAfterDamage: function (damage, target, source, move) {
            if (move && move.flags['contact']) {
                if (this.random(10) < 3) {
                    source.trySetStatus('par', target);
                }
            }
        },
        onStart: function (source) {
            this.setTerrain('electricterrain');
        },
    },
    "valor": {
        id: "valor",
        name: "Valor",
        onAfterDamage: function (damage, target, source, move) {
            if (move && move.flags['contact']) {
                if (this.random(10) < 3) {
                    source.trySetStatus('brn', target);
                }
            }
        },
        onStart: function (source) {
            this.setWeather('desolateland');
        },
        onAnySetWeather: function (target, source, weather) {
            if (this.getWeather().id === 'desolateland' && !(weather.id in {
                    desolateland: 1,
                    primordialsea: 1,
                    deltastream: 1
                })) return false;
        },
        onEnd: function (pokemon) {
            if (this.weatherData.source !== pokemon) return;
            for (let i = 0; i < this.sides.length; i++) {
                for (let j = 0; j < this.sides[i].active.length; j++) {
                    let target = this.sides[i].active[j];
                    if (target === pokemon) continue;
                    if (target && target.hp && target.hasAbility('desolateland')) {
                        this.weatherData.source = target;
                        return;
                    }
                }
            }
            this.clearWeather();
        },
        onModifyPriority: function (priority, pokemon, target, move) {
            if (move && move.type === 'Flying') return priority + 1;
        },
    },
    "failedexperiment": {
        id: "failedexperiment",
        name: "Failed Experiment",
        //sets up all hazards + uses Rapid Spin & Topsy Turvy + Protect + Mold Breaker activates + Adaptability
        onStart: function (pokemon) {
            this.useMove('Spikes', pokemon);
            this.useMove('Spikes', pokemon);
            this.useMove('Spikes', pokemon);
            this.useMove('Toxic Spikes', pokemon);
            this.useMove('Toxic Spikes', pokemon);
            this.useMove('Stealth Rock', pokemon);
            this.useMove('Sticky Web', pokemon);
            this.useMove('Rapid Spin', pokemon);
            this.useMove('Topsy Turvy', pokemon);
            this.useMove('Protect', pokemon);
        },
        stopattackevents: true,
        suppressweather: true,
        //adaptability
        onModifyMove: function (move) {
            move.stab = 2;
        },
    },
    "amjustclone": {
        id: "amjustclone",
        name: "Am Just Clone",
        onModifyMove: function (move) {
            move.stab = 2;
        },
        onPrepareHit: function (source, target, move) {
            if (move.hasBounced) return;
            let type = move.type;
            if (type && type !== '???' && source.getTypes().join() !== type) {
                if (!source.setType(type)) return;
                this.add('-start', source, 'typechange', type, '[from] Am Just Clone');
            }
        },
    },
    "thanksgiving": {
        id: "thanksgiving",
        name: "Thanksgiving",
        onAfterDamage: function (damage, target, source, move) {
            if (move && move.flags['contact']) {
                if (this.random(10) < 3) {
                    source.trySetStatus('brn', target);
                }
            }
        },
        onStart: function (source) {
            this.setWeather('desolateland');
        },
        onAnySetWeather: function (target, source, weather) {
            if (this.getWeather().id === 'desolateland' && !(weather.id in {
                    desolateland: 1,
                    primordialsea: 1,
                    deltastream: 1
                })) return false;
        },
        onEnd: function (pokemon) {
            if (this.weatherData.source !== pokemon) return;
            for (let i = 0; i < this.sides.length; i++) {
                for (let j = 0; j < this.sides[i].active.length; j++) {
                    let target = this.sides[i].active[j];
                    if (target === pokemon) continue;
                    if (target && target.hp && target.hasAbility('desolateland')) {
                        this.weatherData.source = target;
                        return;
                    }
                }
            }
            this.clearWeather();
        },
        onModifyPriority: function (priority, pokemon, target, move) {
            if (move && move.type === 'Flying') return priority + 1;
        },
    },
    "bulklord": {
        id: "bulklord",
        name: "Bulk Lord",
        //prankster
        onModifyPriority: function (priority, pokemon, target, move) {
            if (move && move.category === 'Status') {
                return priority + 1;
            }
        },
        //multiscale
        onSourceModifyDamage: function (damage, source, target, move) {
            if (target.hp >= target.maxhp) {
                this.debug('Bulk Lord weaken');
                return this.chainModify(0.5);
            }
        },
        //regenerator
        onSwitchOut: function (pokemon) {
            pokemon.heal(pokemon.maxhp / 3);
        },
        //naturalcure
        onCheckShow: function (pokemon) {
            // This is complicated
            // For the most part, in-game, it's obvious whether or not Natural Cure activated,
            // since you can see how many of your opponent's pokemon are statused.
            // The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
            // that could have Natural Cure switch out, but only some of them get cured.
            if (pokemon.side.active.length === 1) return;
            if (pokemon.showCure === true || pokemon.showCure === false) return;

            let active = pokemon.side.active;
            let cureList = [];
            let noCureCount = 0;
            for (let i = 0; i < active.length; i++) {
                let curPoke = active[i];
                // pokemon not statused
                if (!curPoke || !curPoke.status) {
                    // this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
                    continue;
                }
                if (curPoke.showCure) {
                    // this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
                    continue;
                }
                let template = Tools.getTemplate(curPoke.species);
                // pokemon can't get Natural Cure
                if (Object.values(template.abilities).indexOf('Natural Cure') < 0) {
                    // this.add('-message', "" + curPoke + " skipped: no Natural Cure");
                    continue;
                }
                // pokemon's ability is known to be Natural Cure
                if (!template.abilities['1'] && !template.abilities['H']) {
                    // this.add('-message', "" + curPoke + " skipped: only one ability");
                    continue;
                }
                // pokemon isn't switching this turn
                if (curPoke !== pokemon && !this.willSwitch(curPoke)) {
                    // this.add('-message', "" + curPoke + " skipped: not switching");
                    continue;
                }

                if (curPoke.hasAbility('naturalcure')) {
                    // this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (and is)");
                    cureList.push(curPoke);
                }
                else {
                    // this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (but isn't)");
                    noCureCount++;
                }
            }

            if (!cureList.length || !noCureCount) {
                // It's possible to know what pokemon were cured
                for (let i = 0; i < cureList.length; i++) {
                    cureList[i].showCure = true;
                }
            }
            else {
                // It's not possible to know what pokemon were cured

                // Unlike a -hint, this is real information that battlers need, so we use a -message
                this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Bulk Lord.)");

                for (let i = 0; i < cureList.length; i++) {
                    cureList[i].showCure = false;
                }
            }
        },
        onSwitchOut: function (pokemon) {
            if (!pokemon.status) return;

            // if pokemon.showCure is undefined, it was skipped because its ability
            // is known
            if (pokemon.showCure === undefined) pokemon.showCure = true;

            if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Bulk Lord');
            pokemon.setStatus('');

            // only reset .showCure if it's false
            // (once you know a Pokemon has Natural Cure, its cures are always known)
            if (!pokemon.showCure) delete pokemon.showCure;
        },
        stopattackevents: true,
    },
};
