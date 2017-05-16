'use strict';

exports.BattleScripts = {
        onSwitchInPriority: 1,
        onSwitchIn: function (pokemon) {
            if (pokemon.types ===  ["Fire"]) this.useMove("Sunny Day", pokemon);
        }
            if (pokemon.types ===  ["Water"]) this.useMove("Rain Dance", pokemon);
        }
            if (pokemon.types ===  ["Grass"]) this.useMove("Grassy Terrain", pokemon);
        }
            if (pokemon.types ===  ["Dark"]) this.useMove("Topsy-Turvy", pokemon);
        }
            if (pokemon.types ===  ["Ghost"]) this.useMove("Trick-or-Treat", pokemon);
        }
            if (pokemon.types ===  ["Fairy"]) this.useMove("Misty Terrain", pokemon);
        }
            if (pokemon.types ===  ["Psychic"]) this.useMove("Role Play", pokemon);
        }
            if (pokemon.types ===  ["Bug"]) this.useMove("Quiver Dance", pokemon);
        }
            if (pokemon.types ===  ["Ice"]) this.useMove("Hail", pokemon);
        }
            if (pokemon.types ===  ["Fighting"]) this.useMove("Bulk Up", pokemon);
        }
            if (pokemon.types ===  ["Rock"]) this.useMove("Sandstorm", pokemon);
        }
            if (pokemon.types ===  ["Ground"]) this.useMove("Spikes", pokemon);
        }
            if (pokemon.types ===  ["Steel"]) this.useMove("Autotomize", pokemon);
        }
            if (pokemon.types ===  ["Flying"]) this.useMove("Mirror Move", pokemon);
        }
            if (pokemon.types ===  ["Normal"]) this.useMove("Heal Bell", pokemon);
        }
            if (pokemon.types ===  ["Poison"]) this.useMove("Toxic Spikes", pokemon);
        }
            if (pokemon.types ===  ["Electric"]) this.useMove("Electric Terrain", pokemon);
        }
};
