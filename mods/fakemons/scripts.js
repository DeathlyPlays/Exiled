'use strict';

exports.BattleScripts = {
    getCategory(move) {
        move = this.getMove(move);
        let cat = move.category;
        if (this.pseudoWeather["midlifecrisis"]) {
            if (cat === "Special") return "Physical";
            if (cat === "Physical") return "Special";
        }
        return cat || 'Physical';
    }
};
