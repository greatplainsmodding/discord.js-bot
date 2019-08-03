const fs = require('fs');

class EventHandler {
    // Commands initialization
    load(client) {
        const folder = fs.readdirSync('./src/Events', { withFileTypes: true });
        for (const item of folder) {
            const Module = require(`../Events/${item.name}`);
            const Handler = new Module(client);
            const Execute = Handler.execute.bind(Handler);
            client.on(Handler.name, Execute);
        }
        console.log('Events Loaded');
    }
}
module.exports = EventHandler;