const { Commands } = require('../../../utils/base');

module.exports = class extends Commands {
    constructor(client) {
        super(client, {
            name: 'userinfo'
        })
    }

    run(msg) {
        msg.delete()
        if (msg.mentions.members.first()) {
            const status = {
                online: "Online",
                idle: "Idle",
                dnd: "Do Not Disturb",
                offline: "Offline/Invisible"
            };

            const roles = msg.mentions.members.first().roles.sort((a, b) => a.position - b.position);
            let userroles = roles.filter(r => r.id !== msg.guild.id).map(role => " " + "<@&" + role + ">");
            if (userroles === undefined || userroles.length == 0) {
                userroles = "No Roles";
            }

            const id = msg.mentions.members.first().roles.highest.id


            // Sends Embed
            const embed = new this.client.Embed()
                .setAuthor(this.client.user.username, this.client.config.logo)
                .setThumbnail(msg.mentions.users.first().displayAvatarURL())
                .addField('» Discord Tag', msg.mentions.users.first().tag, true)
                .addField('» Discord ID', msg.mentions.members.first().id, true)
                .addField('» Status', status[msg.mentions.members.first().presence.status], true)
                .addField('» Highest Role', '<@&' + id + '>', true)
                .addField('» User Roles', "" + userroles + "", false)
                .addField('» Joined at', msg.mentions.members.first().joinedAt)
                .addField('» Account Created', msg.mentions.users.first().createdAt)
                .setFooter('Requested By: ' + msg.author.username)
                .setTimestamp()
            msg.channel.send(embed);
            console.log('User mentioned')
        } else {
            const status = {
                online: "Online",
                idle: "Idle",
                dnd: "Do Not Disturb",
                offline: "Offline/Invisible"
            };

            const roles = msg.member.roles.sort((a, b) => a.position - b.position);
            let userroles = roles.filter(r => r.id !== msg.guild.id).map(role => " " + "<@&" + role + ">");
            if (userroles === undefined || userroles.length == 0) {
                userroles = "No Roles";
            }

            const id = msg.member.roles.highest.id


            // Sends Embed
            const embed = new this.client.Embed()
                .setAuthor(this.client.user.username, this.client.config.logo)
                .setThumbnail(msg.author.displayAvatarURL())
                .addField('» Discord Tag', msg.author.tag, true)
                .addField('» Discord ID', msg.author.id, true)
                .addField('» Status', status[msg.author.presence.status], true)
                .addField('» Highest Role', '<@&' + id + '>', true)
                .addField('» User Roles', "" + userroles + "", false)
                .addField('» Joined at', msg.member.joinedAt)
                .addField('» Account Created', msg.author.createdAt)
                .setFooter('Requested By: ' + msg.author.username)
                .setTimestamp()
            msg.channel.send(embed);
        }
    }
};
