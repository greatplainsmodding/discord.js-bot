const Event = require('../Models/Event');
const Prefix = '?'; // Temporary Value

class Message extends Event {
    constructor(client) {
        super(client);

        this.cooldowns = new Set();
    }

    get name() {
        return 'message';
    }

    async execute(msg) {
        if (msg.author.bot || !msg.guild || !msg.content.startsWith(Prefix)) return;
        const raw = msg.content.split(' ');
        const query = raw[0].toLowerCase().slice(Prefix.length);
        const command = this.client.commands.get(query);
        if (!command) return;
        if (this.cooldowns.has(msg.author.id)) {
            await msg.channel.send(`Chill down. This command can only be used once per ${command.cooldown} seconds.`);
            return;
        }
        if (command.perms) {
            if (!msg.channel.permissionsFor(msg.member).has(command.perms)) {
                await msg.channel.send('You have no permissions to use this command');
                return;
            }
        }
        const args = raw.slice(1);
        const cooldown = command.cooldown > 0 ? command.cooldown * 1000 : this.client.defaultCooldown * 1000;
        this.cooldowns.add(msg.author.id);
        await command.run(this.client, msg, args)
            .finally(() => setTimeout(() => this.cooldowns.delete(msg.author.id), cooldown));
    }
}
module.exports = Message;