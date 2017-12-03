'use strict';

exports.BattleMovedex = {
	//flufi
	"knockoutpunch": {
		num: 1000,
		accuracy: 75,
		basePower: 150,
		category: "Physical",
		desc: "Has a 30% chance to confuse the target.",
		shortDesc: "30% chance to confuse the target.",
		id: "knockoutpunch",
		name: "Knockout Punch",
		pp: 5,
		priority: 0,
		flags: {punch: 1, contact: 1, protect: 1},
		secondary: false,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	//insist
	"npmtest": {
		id: "npmtest",
		name: "npm test",
		priority: 1,
		desc: "Boosts user's SpA and Spe by one stage",
		self: {
			boosts: {
				spa: 1,
				spe: 1,
			},
		},
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: false,
		category: "Special",
		onHit: function () {
			this.add('c|@Insist|Don\'t fucking ``npm test`` me.....');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Pump", target);
		},
		basePower: 90,
		pp: 15,
		accuracy: 100,
		target: "normal",
		type: "Water",
		zMovePower: 140,
		contestType: "Cool",
	},
	//insist
	"extremesupermegaultimatealphagigasupremefantasticextraprefixcombobreaker": {
		id: "extremesupermegaultimatealphagigasupremefantasticextraprefixcombobreaker",
		name: "EXTREME SUPER MEGA ULTIMATE ALPHA GIGA SUPREME FANTASTIC EXTRA PREFIX COMBO BREAKER",
		basePower: 150,
		accuracy: 100,
		pp: 1,
		noPPBoosts: true,
		desc: "No additional information",
		secondary: false,
		category: "Special",
		isViable: true,
		isZ: "playniumz",
		priority: 0,
		flags: {
			protect: 1,
		},
		onHit: function () {
			this.add('c|@Insist|**EXTREME SUPER MEGA ULTIMATE ALPHA GIGA SUPREME FANTASTIC EXTRA PREFIX COMBO BREAKER**');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Pump", target);
		},
		target: "normal",
		type: "Water",
	},
	//bamd
	"meteor": {
		id: "meteor",
		name: "Meteor",
		priority: 0,
		desc: "Inflicts damage.",
		flags: {
			protect: 1,
			mirror: 1,
		},
		secondary: false,
		category: "Physical",
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Draco Meteor", target);
		},
		basePower: 120,
		pp: 16,
		accuracy: 100,
		target: "normal",
		type: "Normal",
		zMovePower: 180,
		contestType: "Cool",
	},
};
