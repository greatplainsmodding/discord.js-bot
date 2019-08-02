const { Client, Collection, MessageEmbed } = require('discord.js');
const walk = require('walk');

class Embed extends MessageEmbed {
  constructor(data) {
    super(data);

    this.hexColor = '#7289da';
  }
};

class Equalizer extends Client {
  constructor(options) {
    super(options);

    this.config = require('./config.json');
    this.Embed = Embed;
    
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

// plugin system reee
walk.walk(`${__dirname}/src/plugins`)
.on('directories', function(root, dirs) {
  for (var dir of dirs) {
    let plugin = new (require(`./src/plugins/${dir.name}/plugin`))(client);

    client.plugins.set(plugin.name, plugin);

    // handle the commands of each plugin
    walk.walk(`${__dirname}/src/plugins/${dir.name}/${plugin.CommandsFolder}`)
    .on('files', function(root, files) {
      for (var file of files) {
        let Command = new (require(`./src/plugins/${dir.name}/${plugin.CommandsFolder}/${file.name}`))(client);

        if (!Command.plugin)
          Command.plugin = plugin.name;

        client.commands.set(Command.name.toLowerCase(), Command);
      }
    });
  }
});

// Handle the events
walk.walk(`${__dirname}/src/events`)
.on('files', function(root, files) {
  files = files.filter(file => file.name.endsWith('.js'));

  for (var file of files) {
    let event = new (require(`./src/events/${file.name}`))(client);

    if (event.ignored) continue;

    client.on(event.name, (...args) => event.run(...args));
  }
});

client.login(client.config.token);