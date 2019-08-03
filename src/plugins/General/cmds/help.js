const { Commands } = require('../../../utils/base');

module.exports = class extends Commands {
  constructor(client) {
    super(client, {
      name: 'help'
    })
  }

  async run(msg, args, level) {
    let CommandDetail = args[0];
    let settings = this.client.db.get(msg.guild.id);

    if (!CommandDetail || !this.client.commands.has(CommandDetail.toLowerCase()) || this.client.commands.get(CommandDetail.toLowerCase()).permlevel > level) {
      let settings = this.client.db.get(msg.guild.id);
      let embed = new this.client.Embed()
        .setAuthor(`Available Commands`, msg.author.displayAvatarURL())

      for (var [, plugin] of this.client.plugins) {
        if (settings.disabledPlugins.includes(plugin.name.toLowerCase()) || plugin.disabled) continue;
        let commands = this.client.commands.filter(cmd => cmd.plugin === plugin.name && cmd.permlevel <= level);

        if (commands.length < 1) continue;

        embed.addField(`» ${plugin.name}`, `\`${commands.map(cmd => cmd.name).join('`, `')}\``)
      }

      msg.channel.send(embed);
    } else {
      let command = this.client.commands.get(CommandDetail);

      let embed = new this.client.Embed()
        .setAuthor('Command Information', msg.author.displayAvatarURL())
        .addField('» Name', command.name, true)
        .addField('» Description', command.desc || 'No Description Provided', true)
        .addField('» Aliases', command.aliases.length > 0 ? `\`${command.aliases.join('`, `')}\`` : 'No Aliases', true)
        .addField('» Permissions Required', this.client.config.PermissionNames[command.permlevel], true)
        .addField('» Usage', command.usage ? `${settings.prefix}${command.name} ${command.usage}` : `${settings.prefix}${command.name}`)
        .setThumbnail(msg.author.displayAvatarURL({ size: 2048 }))
        .setTimestamp()
      msg.channel.send(embed);
    };
  }
};