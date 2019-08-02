const { Commands } = require('../../../utils/base');

module.exports = class extends Commands {
  constructor(client) {
    super(client, {
      name: 'help'
    })
  }

  async run(msg, args, level) {
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
  }
};