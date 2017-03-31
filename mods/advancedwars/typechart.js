'use strict';

exports.BattleTypeChart = {
    "INF": {
		damageTaken: {
			"INF": 1,
			"MECH": 1,
			"LTank": 1,
			"MDTank": 1,
			"Neotank": 1,
			"BCopter": 1,
			"Fighter": 3,
			"Bomber": 1,
		},
	},
	"MECH": {
		damageTaken: {
			"INF": 1,
			"MECH": 1,
			"LTank": 1,
			"MDTank": 1,
			"Neotank": 1,
			"BCopter": 1,
			"Fighter": 3,
			"Bomber": 1,
		},
	},
	"LTank": {
		damageTaken: {
			"INF": 2,
			"MECH": 1,
			"LTank": 1,
			"MDTank": 1,
			"Neotank": 1,
			"BCopter": 1,
			"Fighter": 3,
			"Bomber": 1,
		},
	},
	"MDTank": {
		damageTaken: {
			"INF": 0,
			"MECH": 0,
			"LTank": 0,
			"MDTank": 1,
			"Neotank": 1,
			"BCopter": 1,
			"Fighter": 3,
			"Bomber": 1,
		},
	},
	"Neotank": {
		damageTaken: {
			"INF": 0,
			"MECH": 1,
			"LTank": 1,
			"MDTank": 1,
			"Neotank": 1,
			"BCopter": 0,
			"Fighter": 3,
			"Bomber": 1,
		},
	},
	"BCopter": {
		damageTaken: {
			"INF": 2,
			"MECH": 2,
			"LTank": 2,
			"MDTank": 2,
			"Neotank": 2,
			"BCopter": 0,
			"Fighter": 1,
			"Bomber": 3,
		},
	},
	"Fighter": {
		damageTaken: {
			"INF": 3,
			"MECH": 3,
			"LTank": 3,
			"MDTank": 3,
			"Neotank": 3,
			"BCopter": 3,
			"Fighter": 1,
			"Bomber": 3,
		},
	},
	"Bomber": {
		damageTaken: {
			"INF": 3,
			"MECH": 3,
			"LTank": 3,
			"MDTank": 1,
			"Neotank": 1,
			"BCopter": 3,
			"Fighter": 1,
			"Bomber": 3,
		},
	},
};
