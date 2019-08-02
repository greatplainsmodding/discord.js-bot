const { Commands } = require('../../../utils/base');

module.exports = class extends Commands {
  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: ['pong']
    })
  }

  async run(msg) {
    let m = await msg.channel.send('*Pinging...*');

    let embed = new this.client.Embed()
      .setDescription(`Shard **#${msg.guild.shard.id}** Latency: \`${msg.guild.shard.ping}ms\``);

    setTimeout(() => {
      m.edit(null, { embed })
    }, 1500);
  }
};