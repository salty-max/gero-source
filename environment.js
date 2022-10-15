/**
 * Environment: names storage.
 */
class Environment {
  /**
   * Creates an environment with the given record.
   */
  constructor(record = {}) {
    this.record = record;
  }

  /**
   * Creates a variable with the given name and value.
   * @param {string} name
   * @param {any} value
   */
  define(name, value) {
    this.record[name] = value;
    return value;
  }

  /**
   * Returns the value of a defined variable, or throws
   * if the variable is not defined.
   * @param {string} name
   * @returns {any} the value of variable with the given name.
   */
  lookup(name) {
    if (!this.record.hasOwnProperty(name)) {
      throw new ReferenceError(`Variable ${name} is not defined.`);
    }

    return this.record[name];
  }
}

module.exports = Environment;
