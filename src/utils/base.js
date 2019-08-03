module.exports = {
  Events: class {
    constructor(client, {
      name = null,
      ignored = false
    }) {
      Object.defineProperty(this, 'client', { value: client, enumerable: false, writable: true });

      this.name = name;
      this.ignored = ignored;
    }
  },

  Plugins: class {
    constructor(client, {
      name = null,
      canBeDisabledByGuild = true,
      disabled = false,
      CommandsFolder = 'cmds'
    }) {
      Object.defineProperty(this, 'client', { value: client, enumerable: false, writable: true });

      this.name = name;
      this.canBeDisabledByGuild = canBeDisabledByGuild;
      this.disabled = disabled;
      this.CommandsFolder = CommandsFolder;
    }
  },

  Commands: class {
    constructor(client, {
      name = null,
      desc = null,
      aliases = [],
      plugin = null,
      usage = null,
      permlevel = 0
    }) {
      Object.defineProperty(this, 'client', { value: client, enumerable: false, writable: true });

      this.name = name;
      this.desc = desc;
      this.aliases = aliases;
      this.plugin = plugin;
      this.usage = usage;
      this.permlevel = permlevel;
    }
  }
};