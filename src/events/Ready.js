const { Events } = require('../utils/base')
const chalk = require('chalk');
const Discord = require("discord.js");
const readyWebhook = new Discord.WebhookClient("", "");

module.exports = class extends Events {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run() {
        console.log(chalk.greenBright('\n>> Bot is ready!'));
        console.log('>> Logged in as ' + this.client.user.username + '\n>> Running on version: 1.0.0.0')
        this.client.user.setActivity("Аматэрасу", { type: "WATCHING" });

        const embed = new this.client.Embed()
            .setTitle('Bot Status')
            .setDescription(':satellite: ' + this.client.user.username + ' is now ready.')
            .setTimestamp()
        readyWebhook.send(embed);
    }
};
