const Command = require('../../Models/Command');

class Ping extends Command {
    get description() {
        return 'Classic Ping command';
    }

    get usage() {
        return 'ping';
    }

    async run(client, msg) {
        await msg.channel.send(`The ping is: **${Math.round(msg.guild.shard.ping)} ms**`);
    }
}
module.exports = Ping;