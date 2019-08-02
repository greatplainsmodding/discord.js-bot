const { Commands } = require('../../../utils/base');

module.exports = class extends Commands {
  constructor(client) {
    super(client, {
      name: 'config',
      aliases: ['settings', 'set'],
      usage: '<key> <value>',
      permlevel: 4
    })
  }

  run(msg, args) {
    let settings = this.client.db.get(msg.guild.id);
    let keys = ['prefix'];
    let key = args[0];

    if (!key || !keys.includes(key.toLowerCase()))
      return msg.reply(`Please choose from the following keys: **${keys.join('**, **')}**`);
    
    key = args[0].toLowerCase();

    switch(key) {
      case 'prefix': {
        let newPrefix = args.slice(1).join(/ +/g);

        if (newPrefix.length < 1 || newPrefix.length > 1500)
          return msg.reply(`Please give a proper prefix length!`)

        if (msg.mentions.users.size > 1)
          return msg.reply('Mentions are not allowed');

        settings.prefix = newPrefix;
        this.client.db.set(msg.guild.id, settings);

        msg.channel.send(`Changed the prefix to ${newPrefix}`);
      }
    };
  }
};