"use strict";

const Environment = require("./environment");

/**
 * Gero interpreter.
 */
class Gero {
  /**
   * Creates a Gero instance with the global environment.
   */
  constructor(
    global = new Environment({
      null: null,
      true: true,
      false: false,
      VERSION: "0.1",
    })
  ) {
    this.global = global;
  }

  /**
   * Evaluates an expression in the given environment
   * @param {any} e
   * @param {Environment} env
   */
  eval(e, env = this.global) {
    //---------------------------------------------------
    // Self-evaluating expressions
    if (isNumber(e)) {
      return e;
    }
    if (isString(e)) {
      return e.slice(1, -1);
    }

    //---------------------------------------------------
    // Math operations
    if (e[0] === "+") {
      return this.eval(e[1]) + this.eval(e[2]);
    }
    if (e[0] === "-") {
      return this.eval(e[1]) - this.eval(e[2]);
    }
    if (e[0] === "*") {
      return this.eval(e[1]) * this.eval(e[2]);
    }
    if (e[0] === "/") {
      return this.eval(e[1]) / this.eval(e[2]);
    }
    if (e[0] === "%") {
      return this.eval(e[1]) % this.eval(e[2]);
    }

    //---------------------------------------------------
    // Variable declaration
    if (e[0] === "var") {
      const [_, name, value] = e;
      return env.define(name, this.eval(value));
    }

    //---------------------------------------------------
    // Variable access
    if (isVariableName(e)) {
      return env.lookup(e);
    }

    throw `Unimplemented: ${JSON.stringify(e)}`;
  }
}

function isNumber(e) {
  return typeof e === "number";
}

function isString(e) {
  return typeof e === "string" && e[0] === '"' && e.slice(-1) === '"';
}

function isVariableName(e) {
  return typeof e === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(e);
}

module.exports = Gero;
