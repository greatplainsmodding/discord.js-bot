const { Commands } = require('../../../utils/base');

module.exports = class extends Commands {
  constructor(client) {
    super(client, {
      name: 'plugin',
      aliases: ['module'],
      usage: '<Plugin> <Enable/Disable>'
    })
  }

  run(msg, args) {
    let settings = this.client.db.get(msg.guild.id);
    let Plugin = args[0];
    let Option = args[1];

    if (!Plugin || !this.client.plugins.has(Plugin.toLowerCase()))
      return msg.reply('Invalid plugin given.');

    if (Plugin.toLowerCase() === 'settings')
      return msg.reply('You can\'t disable the Settings plugin.');

    if (!Option || Option.toLowerCase() !== 'enable' && Option.toLowerCase() !== 'disable')
      return msg.reply('Please choose whether you want to disable or enable the plugin by typing: **enable/disable**');

    settings.disabledPlugins.push(Plugin);
    msg.channel.send(`Successfully ${Option}d the **${this.client.plugins.get(Plugin.toLowerCase()).name}** plugin.`);
  }
};