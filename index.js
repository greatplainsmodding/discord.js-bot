const { Client, Collection, MessageEmbed } = require('discord.js');
const { statSync, readdirSync } = require('fs');
const Mysql = require('./src/utils/MysqlWrapper');

class Embed extends MessageEmbed {
  constructor(data) {
    super(data);

    this.color = 0x36393E;
  }
};

class Equalizer extends Client {
  constructor(options) {
    super(options);

    this.config = require('./config.json');
    this.Embed = Embed;
    this.db = new Mysql(this.config.Mysql);
    
    // cache
    this.plugins = new Collection();
    this.commands = new Collection();
  }

  permCheck(msg) {
    let perm = 0;

    if (msg.member.hasPermission('MANAGE_MESSAGE')) perm = 1;
    if (msg.member.hasPermission('KICK_MEMBERS')) perm = 2;
    if (msg.member.hasPermission('BAN_MEMBERS')) perm = 3;
    if (msg.member.hasPermission('ADMINISTRATOR')) perm = 4;
    if (msg.guild.ownerID === msg.author.id) perm = 5;
    if (this.config.admins.includes(msg.author.id)) perm = 6;
    if (this.config.owners.includes(msg.author.id)) perm = 7;

    return perm;
  }
};

const client = new Equalizer({
  fetchAllMembers: true,
  disableEveryone: true
});

// plugin system ree
let PluginsDir = readdirSync(`${__dirname}/src/plugins`)
.filter(plugin => statSync(`${__dirname}/src/plugins/${plugin}`).isDirectory());

for (var dir of PluginsDir) {
  let plugin = new (require(`./src/plugins/${dir}/plugin`))(client);

  client.plugins.set(plugin.name.toLowerCase(), plugin);

  // command handler
  let files = readdirSync(`${__dirname}/src/plugins/${dir}/${plugin.CommandsFolder}`)
  .filter(command => statSync(`${__dirname}/src/plugins/${dir}/${plugin.CommandsFolder}/${command}`).isFile());

  for (var file of files) {
    let Command = new (require(`./src/plugins/${dir}/${plugin.CommandsFolder}/${file}`))(client);

    if (!Command.plugin)
      Command.plugin = plugin.name;

    client.commands.set(Command.name.toLowerCase(), Command);
  }
}

// Handle the events
let Events = readdirSync(`${__dirname}/src/events`)
.filter(event => statSync(`${__dirname}/src/events/${event}`).isFile());

for (var file of Events) {
  let event = new (require(`./src/events/${file}`))(client);

  if (event.ignored) continue;

  client.on(event.name, (...args) => event.run(...args));
}

client.login(client.config.token);