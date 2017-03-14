'use strict';

function MewthBadges(user, image) {
	this.user = user || null;
	this.image = image;
}
MewthBadges.prototype.mewthbadges = function (pal) {
    let mewthbadgecss = ';border:none;background:none;';
    let mewthbadges = Db('mewthbadges').get(pal);
    if (!Db('mewthbadges').has(pal)) return '<br>';
    let mewthbadgeDisplay = '<br><br><div style="' + mewthbadgecss + '"><center>';
    if (!Db('mewthbadges').has(pal)) return '';
    for (let i = 0; i < badges.length; i++) {
        let img = Db('mewthbadgelist').get([mewthbadges[i], 'img']);
        let desc = Db('mewthbadgelist').get([mewthbadges[i], 'desc']);
        let id = Db('mewthbadgelist').get([mewthbadges[i], 'name'])
        mewthbadgeDisplay += '<button name="send" style="background:transparent;border:none;" value="/mewthbadge info, ' + id + '"><img src="' + img + '" title="' + id + ' : ' + desc + '"></button>';
    }
    mewthbadgeDisplay += '</center></div>';
    return mewthbadgeDisplay;
};

exports.commands = {

    tmc: 'mewthbadges',
    mbadge: 'mewthbadges',
    mewthbadge: 'mewthbadges',
    mewthbadges: function (target, room, user) {
        let parts = target.split(',');
        let acceptable = ['set', 'take', 'delete', 'add', 'list', 'info'];
        if (!acceptable.includes(parts[0])) return this.parse('/mewthbadgehelp');
        switch (parts[0]) {
        case 'add':
            let id = parts[1].trim().toLowerCase();
            let name = parts[1].trim();
            let img = parts[2].trim();
            let desc = parts[3].trim();
            if (!parts[3]) return this.errorReply('USAGE: /mewthbadge add, (name), (img), Description.');
            if (Db('mewthbadgelist').has(id)) return this.errorReply('There is a badge with this name already.');
            Db('mewthbadgelist')
                .set([id, 'name'], name)
                .set([id, 'img'], img)
                .set([id, 'desc'], desc);
            let total = Db('mewthbadgelist').get('all');
            if (!Db('mewthbadgelist').has('all')) total = [];
            total.push(id);
            Db('mewthbadgelist').set('all', total);
            this.sendReplyBox('This badge has been successfully added.');
            break;
        case 'delete':
            let targmewthbadge = parts[1].trim().toLowerCase();
            if (parts[2]) return this.errorReply('USAGE: /mewthbadge delete, (name)');
            if (!Db('mewthbadgelist').has(targmewthbadge)) return this.errorReply('This badge does not exist.');
            Db('mewthbadgelist').delete(targmewthbadge);
            let allmewthbadgez = Db('mewthbadgelist').get('all');
            allmewthbadgez = allmewthbadgez.filter(b => b !== targmewthbadge);
            Db('mewthbadgehlist').set('all', allmewthbadgez);
            this.errorReply('This badge has been deleted.');
            let mewthbadgeUserObject = Db('userMewthBadges').object();
            let users = Object.keys(badgeUserObject);
            users.forEach(u => Db('userMewthBadges').set(u, (mewthbadgeUserObject[u].filter(b => b !== targmewthbadge))));
            break;
        case 'set':
            let targUser = parts[1].trim().toLowerCase();
            let mewthbadge = parts[2].trim();
            if (!Db('mewthbadgelist').has(mewthbadge)) return this.errorReply('This badge does not exist.');
            if (!parts[2]) return this.errorReply('USAGE: /mewthbadge set, (user), (badge name)');
            let userMewthBadges = Db('mewthbadges').get(targUser);
            if (!Db('mewthbadges').has(targUser)) userMewthBadges = [];
            userMewthBadges.push(mewthbadge);
            Db('mewthbadges').set(targUser, userMewthBadges);
            let kekmewthbadge = Db('mewthbadgelist').get([mewthbadge, 'img']);
            this.sendReply('This user has been succesfully given the ' + mewthbadge + ' badge.');
            Users(targUser).popup('|html|You have been given the <img src="' + kekmewthbadge + '"> Badge.');
            break;
        case 'take':
            let usertarget = parts[1].trim().toLowerCase();
            let hasmewthbadges = Db('mewthbadges').get(usertarget);
            let deletemewthbadge = parts[2].trim().toLowerCase();
            let imgofmewthbadge = Db('mewthbadgelist').get([deletemewthbadge, 'img']);
            if (!parts[2]) this.errorReply('USAGE: /mewthbadge take, (user), (badge name).');
            hasmewthbadges = hasmewthbadges.filter(b => b !== deletemewthbadge);
            Db('mewthbadges').set(usertarget, hasmewthbadges);
            this.sendReply('This user has been stripped of the ' + deletemewthbadge + ' badge.');
            Users(usertarget).popup('|html|You have been stripped of the the ' + imgofmewthbadge + ' Badge.');
            break;
        case 'list':
            if (!this.runBroadcast()) return;
            let mewthbadgelist = '<table border="1" width="100%" cellpadding="5px" cellspacing="0"><th>Mewth Badge Img</th><th>Mewth Badge Name</th><th>Mewth Badge Description</th>';
            let allmewthbadges = Db('mewthbadgelist').get('all');
            for (let i = 0; i < allmewthbadges.length; i++) {
                let mewthbadgeimg = Db('mewthbadgelist').get([allmewthbadges[i], 'img']);
                let mewthbadgedesc = Db('mewthbadgelist').get([allmewthbadges[i], 'desc']);
                let mewthbadgename = Db('mewthbadgelist').get([allmewthbadges[i], 'name']);
                mewthbadgelist += '<tr>';
                mewthbadgelist += '<td><center><button style="background:transparent;border:none;" name="send" value="/mewthbadge info, ' + mewthbadgename + '"><img src="' + mewthbadgeimg + '" title="' + mewthbadgename + ' : ' + mewthbadgedesc + '"></button></center></td>';
                mewthbadgelist += '<td><b>' + mewthbadgename + '</b></td>';
                mewthbadgelist += '<td>' + mewthbadgedesc + '</td>';
                mewthbadgelist += '</tr>';
            }
            this.sendReply('|html|' + mewthbadgelist);
            break;
        case 'info':
            if (!this.runBroadcast()) return;
            if (!parts[1]) return this.errorReply('USAGE: /mewthbadge info, (badge name)');
            let infomewthbadge = parts[1].trim().toLowerCase();
            let all = Db('mewthbadgelist').get('all');
            if (!all.includes(infomewthbadge)) return this.errorReply('This badge does not exist.');
            let imginfo = Db('mewthbadgelist').get([infomewthbadge, 'img']);
            let infodesc = Db('mewthbadgelist').get([infomewthbadge, 'desc']);
            let infoname = Db('mewthbadgelist').get([infobadge, 'name']);
            this.sendReplyBox('<img src="' + imginfo + '">' + SPACE + infoname + ' : ' + infodesc);
            break;
        }
    },

    tmchelp: 'mewthbadgehelp',
    mewthbadgehelp: function (target, room, user) {
        let display = '';
        display += '<div class="infobox-limited"><center><b>Exiled Mewth Badge Plugin By DeathlyPlays.</b></center>';
        display += '<b>/mewthbadgehelp</b> - Shows all the commands that are related to badges.<br>';
        display += '<b>/mewthbadge add, (badge name), (badge image), (badge description)</b> - Adds a badge to the servers code.<br>';
        display += '<b>/mewthbadge delete, (badge name)</b> - Deletes a badge from the server code.<br>';
        display += '<b>/mewthbadge set, (user), (badge name)</b> - Gives a user a certain badge.<br>';
        display += '<b>/mewthbadge take, (user), (badgename)</b< - Takes a badge from a user.<br>';
        display += '<b>/mewthbadge list</b> - Shows all the servers badges.';
        this.sendReply('|html|' + display);
    },
};
