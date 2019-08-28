const { Commands } = require('../../../utils/base');

module.exports = class extends Commands {
    constructor(client) {
        super(client, {
            name: 'ping'
        })
    }

    run(msg) {
        msg.delete()
        const embed = new this.client.Embed()
            .setAuthor(this.client.user.username, this.client.config.logo)
            .setDescription("Bot Ping: **" + msg.guild.shard.ping + '** ms | Status: Connected')
            .setFooter('Requested By: ' + msg.author.username)
            .setTimestamp()
        msg.channel.send(embed);
    }
};
