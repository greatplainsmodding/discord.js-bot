const Event = require('../Models/Event');

class Ready extends Event {
    get name() {
        return 'ready';
    }

    async execute() {
        console.log(`${this.client.user.tag} is now online`);
    }
}
module.exports = Ready;