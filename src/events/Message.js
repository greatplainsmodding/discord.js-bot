const { Events } = require('../utils/base')

module.exports = class extends Events {
  constructor(client) {
    super(client, {
      name: 'message'
    })
  }

  run(msg) {
    if (!msg.guild || msg.author.bot) return;

    if (!this.client.db.has(msg.guild.id)) {
      this.client.db.set(msg.guild.id, this.client.config.guildConfig);
    };

    let settings = this.client.db.get(msg.guild.id);
    let args = msg.content.slice(settings.prefix.length).split(/ +/g);
    let plugins = this.client.plugins.keyArray();
    let level = this.client.permCheck(msg);

    for (var plugin of plugins) {
      let PluginData = this.client.plugins.get(plugin.toLowerCase());

      if (PluginData.disabled) continue;
      if (settings.disabledPlugins.includes(PluginData.name)) continue;

      PluginData.run(msg, args, level);
    }

    if (msg.content.indexOf(settings.prefix) !== 0) return;

    let cmd = args.shift().toLowerCase();
    let command = this.client.commands.get(cmd) || this.client.commands.find(c => c.aliases.includes(cmd))

    if (command) {
      if (settings.disabledPlugins.includes(command.plugin)) return;

      if (command.permlevel > level)
        return msg.channel.send(`
Sorry, but you cannot use this Command! You lack the permissions.
You need the permission: **${this.client.config.PermissionNames[command.permlevel]}** to execute this Command!`);

      command.run(msg, args, level);
    } else return;
  }
};