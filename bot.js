const Discord = require("discord.js")
const config = require("./config.json")
const chalk = require('chalk');
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log(chalk.red(" Couldn't find commands."));
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(chalk.yellow(`\n Loaded - ${f}`));
        bot.commands.set(props.help.name, props);
    });

});


// Logs when bot is ready and sets bot game
bot.on("ready", () => {
    console.log(chalk.greenBright('\n >> Bot is ready!'));
    console.log(' >> Logged in as ' + bot.user.username);
    console.log(' >> Running on version: 1.0.0.0');
    bot.user.setActivity("you", { type: "WATCHING" });
});


bot.on("message", async message => {
    // General Check
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = config.prefix;


    // Checks for command
    let commandfile = bot.commands.get(command.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
})


bot.login(config.token)