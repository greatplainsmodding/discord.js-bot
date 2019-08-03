class Event {
    constructor(client) {
        this.client = client;
    }

    get name() {
        throw new Error('Must be extended to be used');
    }

    async execute() {
        throw new Error('Must be extended to be used');
    }
}
module.exports = Event;