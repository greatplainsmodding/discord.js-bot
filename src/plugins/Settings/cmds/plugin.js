const { Commands } = require('../../../utils/base');

module.exports = class extends Commands {
  constructor(client) {
    super(client, {
      name: 'plugin',
      aliases: ['module'],
      usage: '<Plugin> <Enable/Disable>',
      permlevel: 4
    })
  }

  run(msg, args) {
    let settings = this.client.db.get(msg.guild.id);
    let Plugin = args[0];
    let Option = args[1];

    if (!Plugin || !this.client.plugins.has(Plugin.toLowerCase()))
      return msg.reply('Invalid plugin given.');

    Plugin = args[0].toLowerCase()

    if (Plugin === 'settings')
      return msg.reply('You can\'t disable the Settings plugin.');

    if (!Option || Option.toLowerCase() !== 'enable' && Option.toLowerCase() !== 'disable')
      return msg.reply('Please choose whether you want to disable or enable the plugin by typing: **enable/disable**');

    if (Option.toLowerCase() === 'disable') {
      settings.disabledPlugins.push(Plugin);
      msg.channel.send(`Successfully disabled the **${this.client.plugins.get(Plugin).name}** plugin.`);
    } else {
      let index = settings.disabledPlugins.indexOf(Plugin);

      if (index > -1) {
        settings.disabledPlugins.splice(index, 1);
        msg.channel.send(`Successfully enabled the **${this.client.plugins.get(Plugin).name}** plugin.`);
      } else {
        msg.channel.send(`The **${this.client.plugins.get(Plugin).name}** plugin is already enabled.`);
      };
    }

    this.client.db.set(msg.guild.id, settings);
  }
};