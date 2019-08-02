const { Plugins } = require('../../utils/base');

module.exports = class extends Plugins {
  constructor(client) {
    super(client, {
      name: 'Settings'
    })
  }

  run() {}
};