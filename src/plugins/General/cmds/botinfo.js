const {
    Commands
} = require('../../../utils/base');

module.exports = class extends Commands {
    constructor(client) {
        super(client, {
            name: 'botinfo'
        })
    }

    run(msg) {
        msg.delete()
        let totalSeconds = (this.client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.round(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours and ${minutes} minutes.`;
        const embed = new this.client.Embed()
            .setAuthor(this.client.user.username, this.client.config.logo)
            .addField('» Total Servers', this.client.guilds.size, true)
            .addField('» Total Commands', 'N/A', true)
            .addField('» Total Users', this.client.users.size, true)
            .addField('» Total Shards', '1', true)
            .addField('» Ram and CPU Usage', 'N/A', true)
            .addField('» Uptime', uptime, true)
            .addField('» Links', '<:bot:608046707258949672> [Invite Bot](http://projectx.xyz) **|** <:staff:608046707367739393> [Support Server](https://discord.gg/3SZ9Rx4)')
            .setFooter('Requested By: ' + msg.author.username)
            .setTimestamp()
        msg.channel.send(embed);
    }
};
