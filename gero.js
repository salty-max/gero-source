"use strict";

const Environment = require("./Environment");
const Transformer = require("./Transformer");

/**
 * Gero interpreter.
 */
class Gero {
  /**
   * Creates a Gero instance with the global environment.
   */
  constructor(global = GlobalEnvironment) {
    this.global = global;
    this._transformer = new Transformer();
  }

  /**
   * Evaluates an expression in the given environment.
   * @param {any} e
   * @param {Environment} env
   */
  eval(e, env = this.global) {
    //---------------------------------------------------
    // Self-evaluating expressions: <exp>
    if (this._isNumber(e)) {
      return e;
    }
    if (this._isString(e)) {
      return e.slice(1, -1);
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
    if (this._isVariableName(e)) {
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
    /** Switch: (switch (<cond1> <consequent1> ... (<condn> <consequentn>)(else <alternate>)))
     * Syntactic sugar for nested if statements
     */
    if (e[0] === "switch") {
      const ifExp = this._transformer.transformSwitchToIf(e);

      return this.eval(ifExp, env);
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

    //---------------------------------------------------
    /** For-loop: (for <init> <condition> <modifier> <exp>)
     *  Syntactic sugar for (begin <init> (while <condition> (begin <body> <modifier>)))
     */
    if (e[0] === "for") {
      const whileExp = this._transformer.transformForToWhile(e);
      return this.eval(whileExp, env);
    }

    //---------------------------------------------------
    // Lambda declaration: (lambda (<params>) <body>)
    if (e[0] === "lambda") {
      const [_tag, params, body] = e;

      return {
        params,
        body,
        env,
      };
    }

    //---------------------------------------------------
    /**
     * Function declaration: (def <name> (<params>) <body>)
     * Syntactic sugar for (var <name> (lambda (<args>) <body>))
     */

    if (e[0] === "def") {
      // JIT-transpile to a variable declaration
      const varExp = this._transformer.transformDefToVarLambda(e);

      return this.eval(varExp, env);
    }

    //---------------------------------------------------
    // Function call: (<name> ...<args>)
    if (Array.isArray(e)) {
      const fn = this.eval(e[0], env);
      const args = e.slice(1).map((arg) => this.eval(arg, env));

      // 1. Native functions
      if (typeof fn === "function") {
        return fn(...args);
      }

      // 2. User-defined functions
      const activationRecord = {};
      fn.params.forEach((p, index) => {
        activationRecord[p] = args[index];
      });

      const activationEnv = new Environment(activationRecord, fn.env);

      return this._evalBody(fn.body, activationEnv);
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

  _evalBody(body, env) {
    if (body[0] === "begin") {
      return this._evalBlock(body, env);
    }

    return this.eval(body, env);
  }

  _isNumber(e) {
    return typeof e === "number";
  }

  _isString(e) {
    return typeof e === "string" && e[0] === '"' && e.slice(-1) === '"';
  }

  _isVariableName(e) {
    return typeof e === "string" && /^[+\-*/%<>=a-zA-Z0-9_]+$/.test(e);
  }
}

/**
 * Default global environment.
 */
const GlobalEnvironment = new Environment({
  null: null,
  true: true,
  false: false,
  VERSION: "0.1",

  // Math operators
  "+"(op1, op2) {
    return op1 + op2;
  },
  "-"(op1, op2 = null) {
    if (op2 == null) {
      return -op1;
    }

    return op1 - op2;
  },
  "*"(op1, op2) {
    return op1 * op2;
  },
  "/"(op1, op2) {
    return op1 / op2;
  },
  "%"(op1, op2) {
    return op1 % op2;
  },

  // Comparison operators
  ">"(op1, op2) {
    return op1 > op2;
  },
  "<"(op1, op2) {
    return op1 < op2;
  },
  ">="(op1, op2) {
    return op1 >= op2;
  },
  "<="(op1, op2) {
    return op1 <= op2;
  },
  "="(op1, op2) {
    return op1 === op2;
  },

  // Console output
  print(...args) {
    console.log(...args);
  },
});

module.exports = Gero;
