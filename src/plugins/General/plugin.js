const { Plugins } = require('../../utils/base');

module.exports = class extends Plugins {
  constructor(client) {
    super(client, {
      name: 'General'
    })
  }

  run() {
    // you can add checks here, for example if the user is not in db, then add here
  }
};