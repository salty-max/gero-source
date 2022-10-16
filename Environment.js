/**
 * Environment: names storage.
 */
class Environment {
  /**
   * Creates an environment with the given record.
   */
  constructor(record = {}, parent = null) {
    this.record = record;
    this.parent = parent;
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
   * Assigns given value to variable with the given name or
   * throws if the variable is not defined.
   * @param {string} name
   * @param {any} value
   */
  assign(name, value) {
    this.resolve(name).record[name] = value;
    return value;
  }

  /**
   * Returns the value of a defined variable, or throws
   * if the variable is not defined.
   * @param {string} name
   * @returns {any} the value of variable with the given name.
   */
  lookup(name) {
    return this.resolve(name).record[name];
  }

  /**
   * Returns specific environment in which a variable is defined, or
   * throws if a variable is not defined
   * @param {string} name
   * @returns {Environment} the environment in which the variable with the given name is defined
   */
  resolve(name) {
    if (this.record.hasOwnProperty(name)) {
      return this;
    }

    if (this.parent == null) {
      throw new ReferenceError(`Variable ${name} is not defined.`);
    }

    return this.parent.resolve(name);
  }
}

module.exports = Environment;
