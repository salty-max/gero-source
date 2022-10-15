"use strict";

const Environment = require("./Environment");

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
    // Self-evaluating expressions: <exp>
    if (isNumber(e)) {
      return e;
    }
    if (isString(e)) {
      return e.slice(1, -1);
    }

    //---------------------------------------------------
    // Math operations: (+ <exp>, <exp>)
    if (e[0] === "+") {
      return this.eval(e[1], env) + this.eval(e[2], env);
    }
    if (e[0] === "-") {
      return this.eval(e[1], env) - this.eval(e[2], env);
    }
    if (e[0] === "*") {
      return this.eval(e[1], env) * this.eval(e[2], env);
    }
    if (e[0] === "/") {
      return this.eval(e[1], env) / this.eval(e[2], env);
    }
    if (e[0] === "%") {
      return this.eval(e[1], env) % this.eval(e[2], env);
    }

    //---------------------------------------------------
    // Comparison operators: (> <exp> <exp>)
    if (e[0] === ">") {
      return this.eval(e[1], env) > this.eval(e[2], env);
    }
    if (e[0] === ">=") {
      return this.eval(e[1], env) >= this.eval(e[2], env);
    }
    if (e[0] === "<") {
      return this.eval(e[1], env) < this.eval(e[2], env);
    }
    if (e[0] === "<=") {
      return this.eval(e[1], env) <= this.eval(e[2], env);
    }
    if (e[0] === "=") {
      return this.eval(e[1], env) === this.eval(e[2], env);
    }

    //---------------------------------------------------
    // Variable declaration: (var <name> <value>)
    if (e[0] === "var") {
      const [_, name, value] = e;
      return env.define(name, this.eval(value, env));
    }

    //---------------------------------------------------
    // Variable assignment: (set <name> <value>)
    if (e[0] === "set") {
      const [_, name, value] = e;
      return env.assign(name, this.eval(value, env));
    }

    //---------------------------------------------------
    // Variable access: <name>
    if (isVariableName(e)) {
      return env.lookup(e);
    }

    //---------------------------------------------------
    // Block: (begin <exp>)
    if (e[0] === "begin") {
      const blockEnv = new Environment({}, env);
      return this._evalBlock(e, blockEnv);
    }

    //---------------------------------------------------
    // If: (if <condition> <consequent> <alternate>)
    if (e[0] === "if") {
      const [_tag, condition, consequent, alternate] = e;
      if (this.eval(condition, env)) {
        return this.eval(consequent, env);
      }
      if (alternate) {
        return this.eval(alternate, env);
      }

      return;
    }

    //---------------------------------------------------
    // While: (while <condition> <body>)
    if (e[0] === "while") {
      let result;
      const [_tag, condition, body] = e;
      while (this.eval(condition, env)) {
        result = this.eval(body, env);
      }

      return result;
    }

    throw `Unimplemented: ${JSON.stringify(e)}`;
  }

  _evalBlock(block, env) {
    let result;
    const [_tag, ...exps] = block;

    exps.forEach((e) => {
      result = this.eval(e, env);
    });

    return result;
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
