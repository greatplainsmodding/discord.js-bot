const { Events } = require('../utils/base')

module.exports = class extends Events {
  constructor(client) {
    super(client, {
      name: 'ready'
    })
  }

  run() {
    console.log(`Logged in as ${this.client.user.tag}`);
  }
};