const { Commands } = require('../../../utils/base');

module.exports = class extends Commands {
  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: ['pong']
    })
  }

  run(msg) {
    return msg.reply('pong')
  }
};