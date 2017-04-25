			sound: 1,
			authentic: 1,
			reflectable: 1,
		},
		type: "Normal",
		target: "normal",
	},
	"fastasfucc": {
		id: "fastasfucc",
		name: "Fast as Fucc",
		basePower: 60,
		pp: 15,
		accuracy: 100,
		flags: {
			protect: 1,
			mirror: 1,
		},
		desc: "Base 60 Normal Type priority move which is super effective on steel types, 30% chance to raise Speed by 1",
		priority: 1,
		onTryHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quick Attack", target);
		},
		onEffectiveness: function (typeMod, type) {
			if (type === 'Steel') return 1;
		},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		onHit: function (target, source, move) {
			this.add('c| AB Starfox|I don\'t think you have any idea how fast I really am, I\'m fast as fucc boiiiiii');
		},
		target: "normal",
		type: "Normal",
	},
	"attitudeadjustment": {
		id: "attitudeadjustment",
		name: "Attitude Adjustment",
		basePower: 0,
		accuracy: 30,
		category: "Physical",
		onHit: function (target, source, move) {
			this.add('c| THEMEMES69|**YOU CAN\'T SEE ME!!!!!!!!!!**');
		},
		ohko: true,
		pp: 5,
		priority: 0,
		secondary: false,
		flags: {
			protect: 1,
			contact: 1,
		},
		target: "normal",
		type: "Fighting",
		zMovePower: 150,
	},
	"acceptthememes": {
		id: "acceptthememes",
		name: "Accept The Memes",
		basePower: 0,
		accuracy: true,
		category: "Physical",
		onHit: function (target, source, move) {
			this.add('c| THEMEMES69|GET MEMED OR DIE TRYING!');
		},
		ohko: true,
