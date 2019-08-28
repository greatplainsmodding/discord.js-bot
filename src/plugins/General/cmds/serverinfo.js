const { Commands } = require('../../../utils/base');

module.exports = class extends Commands {
    constructor(client) {
        super(client, {
            name: 'serverinfo'
        })
    }

    run(msg) {
        msg.delete()

        // Gets region flag
        let region = {
            "brazil": ":flag_br: Brazil",
            "eu-central": ":flag_eu: Central Europe",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "eu-west": ":flag_eu: Western Europe",
            "vip-us-east": ":flag_us: VIP U.S. East",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Russia",
            "southafrica": ":flag_za:  South Africa"
        };

        // Sends Embed
        const embed = new this.client.Embed()
            .setAuthor(this.client.user.username, this.client.config.logo)
            .setThumbnail(msg.guild.iconURL())
            .addField('» Server Name', msg.guild.name, true)
            .addField('» Server ID', msg.guild.id, true)
            .addField('» Total | Humans | Bots', msg.guild.members.size + ' | ' + msg.guild.members.filter(member => !member.user.bot).size + ' | ' + msg.guild.members.filter(member => member.user.bot).size, true)
            .addField('» Location', region[msg.guild.region], true)
            .addField('» Verification Level', msg.guild.verificationLevel, true)
            .addField('» Owner', msg.guild.owner.user.username, true)
            .addField('» Total Roles', msg.guild.roles.size, true)
            .addField('» Channels', msg.guild.channels.size)
            .addField('» Server Creation Date', msg.channel.guild.createdAt.toUTCString())
            .setFooter('Requested By: ' + msg.author.username)
            .setTimestamp()
        msg.channel.send(embed);
    }
};
