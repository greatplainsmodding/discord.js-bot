const { Client } = require('discord.js');
const CommandHandler = require('./Modules/CommandHandler');
const EventHandler = require('./Modules/EventHandler');
class Equalizer extends Client {
    constructor(options) {
        super(options);

        this.commands = new CommandHandler();
        this.events = new EventHandler();
        this.defaultCooldown = 3;
    }

    login(token) {
        this.commands.load();
        this.events.load(this);
        return super.login(token);
    }
}
module.exports = Equalizer;