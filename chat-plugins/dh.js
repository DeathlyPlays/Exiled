'use strict';

const ProcessManager = require('./../process-manager');

const MAX_PROCESSES = 1;

const PM = exports.PM = new ProcessManager({
    maxProcesses: MAX_PROCESSES,
    execFile: __filename,
    onMessageUpstream: function (message) {
        // Protocol:
        // "[id]|JSON"
        let pipeIndex = message.indexOf('|');
        let id = +message.substr(0, pipeIndex);
        let result = JSON.parse(message.slice(pipeIndex + 1));

        if (this.pendingTasks.has(id)) {
            this.pendingTasks.get(id)(result);
            this.pendingTasks.delete(id);
            this.release();
        }
    },
    onMessageDownstream: function (message) {
        // protocol:
        // "[id]|{data, sig}"
        let pipeIndex = message.indexOf('|');
        let id = message.substr(0, pipeIndex);

        let data = JSON.parse(message.slice(pipeIndex + 1));
        process.send(id + '|' + JSON.stringify(this.receive(data)));
    },
    receive: function (data) {
        let result;
        try {
            switch (data.cmd) {
            case 'randpoke':
            case 'dexsearch':
                result = runDexsearch(data.target, data.cmd, data.canAll, data.message);
                break;
            case 'movesearch':
                result = runMovesearch(data.target, data.cmd, data.canAll, data.message);
                break;
            case 'itemsearch':
                result = runItemsearch(data.target, data.cmd, data.canAll, data.message);
                break;
            case 'learn':
                result = runLearn(data.target, data.message);
                break;
            default:
                result = null;
            }
        } catch (err) {
            require('./../crashlogger')(err, 'A search query', data);
            result = {
                error: "Sorry! Our search engine crashed on your query. We've been automatically notified and will fix this crash."
            };
        }
        return result;
    },
    isChatBased: true,
});

if (process.send && module === process.mainModule) {
    // This is a child process!

    global.Config = require('../config/config');

    if (Config.crashguard) {
        process.on('uncaughtException', err => {
            require('../crashlogger')(err, 'A dexsearch process', true);
        });
    }

    global.Tools = require('../tools');
    global.toId = Tools.getId;
    Tools.includeData();
    Tools.includeMods();
    global.TeamValidator = require('../team-validator');

    process.on('message', message => PM.onMessageDownstream(message));
    process.on('disconnect', () => process.exit());

    require('../repl').start('dexsearch', cmd => eval(cmd));
} else if (!PM.maxProcesses) {
    process.nextTick(() => Tools.includeMods());
}

exports.commands = {
    fuse: function (target, room, user) {
        if (!this.runBroadcast()) return;
        let text = "";
        let separated = target.split(",");
        let name = (("" + separated[0]).trim()).toLowerCase();
        let name2 = (("" + separated[1]).trim()).toLowerCase();
        name = toId(name);
        name2 = toId(name2);
        let pokemen = Tools.data.Pokedex;
        if (pokemen[name] == undefined || pokemen[name2] == undefined) {
            this.errorReply("Error: Pokemon not found");
            return;
        } else {
            let baseStats = {};
            baseStats['avehp'] = Math.floor((pokemen[name].baseStats.hp + pokemen[name2].baseStats.hp) / 2);
            baseStats['aveatk'] = Math.floor((pokemen[name].baseStats.atk + pokemen[name2].baseStats.atk) / 2);
            baseStats['avedef'] = Math.floor((pokemen[name].baseStats.def + pokemen[name2].baseStats.def) / 2);
            baseStats['avespa'] = Math.floor((pokemen[name].baseStats.spa + pokemen[name2].baseStats.spa) / 2);
            baseStats['avespd'] = Math.floor((pokemen[name].baseStats.spd + pokemen[name2].baseStats.spd) / 2);
            baseStats['avespe'] = Math.floor((pokemen[name].baseStats.spe + pokemen[name2].baseStats.spe) / 2);
            let type = pokemen[name].types[0];
            let ability = "";
            let weight = (pokemen[name].weightkg + pokemen[name2].weightkg) / 2;
            for (let i in pokemen[name].abilities) {
                ability += pokemen[name].abilities[i] + "/";
            }
            ability = ability.substring(0, ability.length - 1);
            ability = ability + " + " + pokemen[name2].abilities['0'];
            if (separated[2] && toId(separated[2]) === "shiny" && pokemen[name2].types[1])
                type = type + '/' + pokemen[name2].types[1];
            else if (pokemen[name].types[0] != pokemen[name2].types[0])
                type = type + '/' + pokemen[name2].types[0];
            if (type.split("/")[0] === type.split("/")[1]) {
                type = type.split("/")[0];
            }
            let bst = baseStats['avehp'] + baseStats['aveatk'] + baseStats['avedef'] + baseStats['avespa'] + baseStats['avespd'] + baseStats['avespe'];
            text = "<b>Stats</b>: " + baseStats['avehp'] + "/" + baseStats['aveatk'] + "/" + baseStats['avedef'] + "/" + baseStats['avespa'] + "/" + baseStats['avespd'] + "/" + baseStats['avespe'] + "<br /><b>BST</b>:" + bst + "<br /><b>Type:</b> " + type + "<br /><b>Abilities</b>: " + ability + "<br /><b>Weight</b>: " + weight + " kg";
            this.sendReplyBox(text);
        }
    },

	newfakemon: function(target, room, user, connection, cmd) {
		if (!this.runBroadcast()) return;
		if (!target) return this.parse('/help newfakemon');
		if (!target) target = 'help';
		let separated = target.split(",");
		let target1 = (("" + separated[0]).trim());
		let target2 = (("" + separated[1]).trim());
		let target3 = (("" + separated[2]).trim());
		let target4 = (("" + separated[3]).trim());
		let target5 = (("" + separated[4]).trim());
		let target6 = (("" + separated[5]).trim());
		let target7 = (("" + separated[6]).trim());
		let target8 = (("" + separated[7]).trim());
		let target9 = (("" + separated[8]).trim());
		let target10 = (("" + separated[9]).trim());
		let target11 = (("" + separated[10]).trim());
		let target12 = (("" + separated[11]).trim());
		let target13 = (("" + separated[12]).trim()).toLowerCase();
		let tot = parseInt(target7) + parseInt(target8) + parseInt(target9) + parseInt(target10) + parseInt(target11) + parseInt(target12);
		this.sendReplyBox('<ul class="utilichart"><li class="result"><span class="col numcol"><b>Fakemons</b></span> <span class="col iconcol"><img src="http://www.pokestadium.com/assets/img/sprites/misc/icons/old/' + target13 + '.png" width="32" height="32"></span></span> <span class="col pokemonnamecol" style="white-space: nowrap"><a href="https://github.com/DeathlyPlays/Exiled/blob/master/mods/fakemons" target="_blank">' + target1 + '</a></span> <span class="col typecol"><img src="//play.pokemonshowdown.com/sprites/types/' + target2 + '.png" alt="' + target2 + '" height="14" width="32"><img src="//play.pokemonshowdown.com/sprites/types/' + target3 + '.png" alt="' + target3 + '" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col twoabilitycol">' + target4 + '<br>' + target5 + '</span><span class="col abilitycol"><em>' + target6 + '</em></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>' + target7 + '</span> <span class="col statcol"><em>Atk</em><br>' + target8 + '</span> <span class="col statcol"><em>Def</em><br>' + target9 + '</span> <span class="col statcol"><em>SpA</em><br>' + target10 + '</span> <span class="col statcol"><em>SpD</em><br>' + target11 + '</span> <span class="col statcol"><em>Spe</em><br>' + target12 + '</span> <span class="col bstcol"><em>BST<br>'+tot+'</em></span> </span></li><li style="clear: both"></li></ul><center><button name="receive" value="|html|<h1>Insert Table here</h1>" style="background-color: #1ec990 ; color: white ; font-size: 24px ; border: none">Movepool</button><br><br><button name="receive" value="|c|~Coad|<ul class=&quot;utilichart&quot;><li class=&quot;result&quot;><span class=&quot;col numcol&quot;><b>Istor</b></span> <span class=&quot;col iconcol&quot;><img src=&quot;http://www.pokestadium.com/assets/img/sprites/misc/icons/old/' + target13 + '.png&quot;  width=&quot;32&quot; height=&quot;32&quot;></span> <span class=&quot;col pokemonnamecol&quot; style=&quot;white-space: nowrap&quot;><a href=&quot; https://github.com/XpRienzo/DragonHeaven/blob/master/mods/aurora/README.md&quot; target=&quot;_blank&quot;>**' + target1 + '**</a></span> <span class=&quot;col typecol&quot;><img src=&quot;https://play.pokemonshowdown.com/sprites/types/' + target2 + '.png&quot; alt=&quot;**' + target2 + '**&quot; height=&quot;14&quot; width=&quot;32&quot;><img src=&quot;//play.pokemonshowdown.com/sprites/types/' + target3 + '.png&quot; alt=**&quot;' +target3 + '&quot;** height=&quot;14&quot; width=&quot;32&quot;></span> <span style=&quot;float: left ; min-height: 26px&quot;><span class=&quot;col twoabilitycol&quot;>**' + target4 + '**<br>**' + target5 + '**</span><span class=&quot;col abilitycol&quot;><em>**' + target6 + '**</em></span></span><span style=&quot;float: left ; min-height: 26px&quot;><span class=&quot;col statcol&quot;><em>HP</em><br>**' + target7 + '**</span> <span class=&quot;col statcol&quot;><em>Atk</em><br>**' + target8 + '**</span> <span class=&quot;col statcol&quot;><em>Def</em><br>**' + target9 + '**</span> <span class=&quot;col statcol&quot;><em>SpA</em><br>**' + target10 + '**</span> <span class=&quot;col statcol&quot;><em>SpD</em><br>**' + target11 + '**</span> <span class=&quot;col statcol&quot;><em>Spe</em><br>**' + target12 + '**</span> <span class=&quot;col bstcol&quot;><em>BST<br>**'+tot+'**</em></span> </span></li><li style=&quot;clear: both&quot;></li></ul><center><button name=&quot;receive&quot; value=&quot;|html|<h1>Insert Table here</h1>&quot; style=&quot;background-color: #1ec990 ; color: white ; font-size: 24px ; border: none&quot;>Movepool</button></center>" style="background-color:black;color:yellow;font-size:24px;border:4px solid yellow;">Generate</button><br><button name="receive" value="|html|'+target1+'   <br>!['+target2+'](http://play.pokemonshowdown.com/sprites/types/'+target2+'.png) <br>!['+target3+'](http://play.pokemonshowdown.com/sprites/types/'+target3+'.png)  <br><br>Abilities: '+target4+' , '+target5+',  '+target6+' <br><br>| HP          | Atk         |     Def     | SpA          | SpD          | Spe          | BST     |<br>|-------------|-------------|:-----------:|--------------|--------------|--------------|---------|<br>| '+target7+' | '+target8+' | '+target9+' | '+target10+' | '+target11+' | '+target12+' | '+tot+' | <br><br><a href=https://github.com/XpRienzo/DragonHeaven/blob/master/mods/aurora/README.md>Readme file </a>">Readme code</button></center>')
	},

	newfakemonhelp: ["/newfakemon Pokemon, Primary Type, Secondary Type, Primary Ability, Secondary Ability, Hidden Ability, HP, Atk, Def, SpA, SpD, Spe, Mascot"],
};
