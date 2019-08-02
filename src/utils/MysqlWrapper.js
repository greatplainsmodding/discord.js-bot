const Mysql = require('sync-mysql');

module.exports = class {
  constructor(options = {}) {
    this.db = new Mysql(options);
    this.cache = new Map();
    this.table = options.table;

    this.init();
  }

  // will be ran to get values to the cache

  init() {
    this.db.query(`CREATE TABLE IF NOT EXISTS ${this.table} (_key VARCHAR(255) PRIMARY KEY, _val TEXT);`);

    let results = this.db.query(`SELECT * FROM ${this.table}`);
    
    for (var result of results) {
      try {
        result._val = JSON.parse(result._val)
      } catch(e) {
        result._val;
      }

      this.cache.set(result._key, result._val);
    }
  }

  /**
   * Sets a value to the database and cache
   * @param {String} key The key
   * @param {Object|String|Number|Array|Buffer} value The value
   */

  set(key, value) {
    this.cache.set(key, value)

    if (typeof value === 'object' && !Array.isArray(value))
      value = JSON.stringify(value);

    this.db.query(`INSERT INTO ${this.table} (_key, _val) VALUES (?, ?) ON DUPLICATE KEY UPDATE _val = ?`, [key, value, value])

    return undefined;
  }

  get(key) {
    return this.cache.get(key);
  }

  has(key) {
    return this.cache.has(key);
  }

  delete(key) {
    this.cache.delete(key);
    this.db.query(`DELETE FROM ${this.table} WHERE _key = ?`, [key]);

    return undefined;
  }
};