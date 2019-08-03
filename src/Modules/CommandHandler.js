const fs = require('fs');
const { Collection } = require('discord.js');

class CommandHandler extends Collection {
    // Commands initialization
    load() {
        const folder = fs.readdirSync('./src/Commands', { withFileTypes: true });
        for (const item of folder) {
            if (item.isDirectory) {
                const _folder = fs.readdirSync(`./src/Commands/${item.name}`);
                for (const _item of _folder) {
                    if (!_item.endsWith('.js')) continue;
                    const __item = require(`../Commands/${item.name}/${_item}`);
                    const Command = new __item();
                    Command.name = _item.split('.')[0].toLowerCase();
                    Command.category = item.name;
                    this.set(Command.name, Command);
                }
            }
        }
        console.log('Commands Loaded');
    }

    // Hotswappable Commands, Actually can be not a promise :smug:
    reload(command) {
        return new Promise((resolve, reject) => {
            try {
                if (!command)
                    return reject(new Error('No command specified to reload'));
                command = this.get(commannd);
                if (!command)
                    return reject(new Error('This command is not one of my commands'));
                const item = require(`../Commands/${command.category}/${command}.js`);
                const Command = new item();
                Command.name = command.name.repeat(1);
                Command.category = command.category.repeat(1);
                this.delete(Command.name);
                this.set(Command.name, Command);
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }
}
module.exports = CommandHandler;