const fs = require("fs");

const Environment = require("./Environment");
const Transformer = require("./transform/Transformer");
const evaParser = require("./parser/gero-parser");

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
   * Evaluates global code wrapping into a block.
   */
  evalGlobal(exps) {
    return this._evalBlock(exps, this.global);
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
      const [_, ref, value] = e;

      // Assignment to a property
      if (ref[0] === "prop") {
        const [_tag, instance, propName] = ref;
        const instanceEnv = this.eval(instance, env);

        return instanceEnv.define(propName, this.eval(value, env));
      }

      // Simple assignment
      return env.assign(ref, this.eval(value, env));
    }

    //---------------------------------------------------
    // Variable access: <name>
    if (this._isVariableName(e)) {
      return env.lookup(e);
    }

    //---------------------------------------------------
    /** Increment: (++ <name>)
     * Syntactic sugar for: (set <name> (+ <name> 1)).
     */
    if (e[0] === "++") {
      const setExp = this._transformer.transformIncToSet(e);
      return this.eval(setExp, env);
    }

    //---------------------------------------------------
    /** Increment: (-- <name>)
     * Syntactic sugar for: (set <name> (- <name> 1)).
     */
    if (e[0] === "--") {
      const setExp = this._transformer.transformDecToSet(e);
      return this.eval(setExp, env);
    }

    //---------------------------------------------------
    /** Increment by value: (+= <name> <val>)
     * Syntactic sugar for: (set <name> (+ <name> <val>)).
     */
    if (e[0] === "+=") {
      const setExp = this._transformer.transformIncValToSet(e);
      return this.eval(setExp, env);
    }

    //---------------------------------------------------
    /** Decrement by value: (-= <name> <val>)
     * Syntactic sugar for: (set <name> (- <name> <val>)).
     */
    if (e[0] === "-=") {
      const setExp = this._transformer.transformDecValToSet(e);
      return this.eval(setExp, env);
    }

    //---------------------------------------------------
    /** Multiply by value: (*= <name> <val>)
     * Syntactic sugar for: (set <name> (* <name> <val>)).
     */
    if (e[0] === "*=") {
      const setExp = this._transformer.transformMulValToSet(e);
      return this.eval(setExp, env);
    }

    //---------------------------------------------------
    /** Divide by value: (/= <name> <val>)
     * Syntactic sugar for: (set <name> (/ <name> <val>)).
     */
    if (e[0] === "/=") {
      const setExp = this._transformer.transformDivValToSet(e);
      return this.eval(setExp, env);
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
     * Syntactic sugar for nested if statements.
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
     *  Syntactic sugar for (begin <init> (while <condition> (begin <body> <modifier>))).
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
     * Syntactic sugar for (var <name> (lambda (<args>) <body>)).
     */

    if (e[0] === "def") {
      // JIT-transpile to a variable declaration.
      const varExp = this._transformer.transformDefToVarLambda(e);

      return this.eval(varExp, env);
    }

    //---------------------------------------------------
    // Class declaration: (class <name> <parent> <body>)
    if (e[0] === "class") {
      const [_tag, name, parent, body] = e;

      // A class is an environment -- a storage of methods
      // and shared properties.
      const parentEnv = this.eval(parent, env) || env;
      const classEnv = new Environment({}, parentEnv);

      // Body is evaluated in the class environment.
      this._evalBody(body, classEnv);

      // Class is accessible by name.
      return env.define(name, classEnv);
    }

    //---------------------------------------------------
    // Class instantiation: (new <class> ...<args>)
    if (e[0] === "new") {
      const classEnv = this.eval(e[1], env);
      // An instance of a class is an environment --
      // the `parent`component of the instance environment
      // is set to its class.
      const instanceEnv = new Environment({}, classEnv);

      const args = e.slice(2).map((arg) => this.eval(arg, env));

      this._callUserDefinedFunction(classEnv.lookup("constructor"), [
        instanceEnv,
        ...args,
      ]);

      return instanceEnv;
    }

    //---------------------------------------------------
    /**
     * Class inheritance
     * Super: (super <class>)
     */
    if (e[0] === "super") {
      const [_tag, className] = e;

      return this.eval(className, env).parent;
    }

    //---------------------------------------------------
    // Property access: (prop <instance> <name>)
    if (e[0] === "prop") {
      const [_tag, instance, name] = e;
      const instanceEnv = this.eval(instance, env);

      return instanceEnv.lookup(name);
    }

    //---------------------------------------------------
    // List declaration: (list ...<items>)
    if (e[0] === "list") {
      const [_tag, ...items] = e;
      const listEnv = new Environment({}, env);
      items.forEach((item, index) => {
        listEnv.define(index, this.eval(item, listEnv));
      });

      return listEnv;
    }

    //---------------------------------------------------
    // List value at index: (idx <list> <index>)
    if (e[0] === "idx") {
      const [_tag, listName, index] = e;
      const listEnv = env.lookup(listName);

      return listEnv.lookup(String(index));
    }

    //---------------------------------------------------
    // List push: (push <list> <value>)
    if (e[0] === "push") {
      const [_tag, listName, value] = e;
      const listEnv = env.lookup(listName);
      return listEnv.define(
        Object.keys(listEnv.record).length,
        this.eval(value, listEnv)
      );
    }

    //---------------------------------------------------
    // List pop: (pop <list>)
    if (e[0] === "pop") {
      const [_tag, listName] = e;
      const listEnv = env.lookup(listName);
      delete listEnv.record[String(Object.keys(listEnv.record).length - 1)];
      console.log(listEnv);
      return listEnv;
    }

    //---------------------------------------------------
    // Module declaration: (module <name> <body>)
    if (e[0] === "module") {
      const [_tag, name, body] = e;

      const moduleEnv = new Environment({}, env);

      this._evalBody(body, moduleEnv);

      return env.define(name, moduleEnv);
    }

    //---------------------------------------------------
    // Module import: (import <name>) | (import (...<property>) <name>)
    if (e[0] === "import") {
      if (Array.isArray(e[1])) {
        const [_tag, exps, name] = e;
        const moduleSrc = fs.readFileSync(
          `${__dirname}/modules/${name}.gero`,
          "utf-8"
        );
        const body = evaParser.parse(`(begin ${moduleSrc})`);
        const moduleExp = ["module", name, body];

        this.eval(moduleExp, this.global);

        return exps.forEach((exp) => {
          const moduleEnv = env.lookup(name);
          const exportsEnv = moduleEnv.lookup("exports");
          const expProp = exportsEnv.lookup(exp);

          if (exportsEnv.record.hasOwnProperty(exp)) {
            env.define(exp, expProp);
          }
        });
      } else {
        const [_tag, name] = e;
        const moduleSrc = fs.readFileSync(
          `${__dirname}/modules/${name}.gero`,
          "utf-8"
        );

        const body = evaParser.parse(`(begin ${moduleSrc})`);
        const moduleExp = ["module", name, body];

        return this.eval(moduleExp, this.global);
      }
    }

    //---------------------------------------------------
    // Module exports: (exports ...<property>)
    if (e[0] === "exports") {
      const [_tag, ...exps] = e;
      const exportsEnv = new Environment({}, env);

      exps.forEach((exp) => {
        const prop = env.lookup(exp);
        exportsEnv.define(exp, prop);
      });

      return env.define("exports", exportsEnv);
    }

    //---------------------------------------------------
    // Function call: (<name> ...<args>)
    if (Array.isArray(e)) {
      const fn = this.eval(e[0], env);
      const args = e.slice(1).map((arg) => this.eval(arg, env));

      // 1. Native functions.
      if (typeof fn === "function") {
        return fn(...args);
      }

      // 2. User-defined functions.
      return this._callUserDefinedFunction(fn, args);
    }

    throw `Unimplemented: ${JSON.stringify(e)}`;
  }

  _callUserDefinedFunction(fn, args) {
    const activationRecord = {};

    fn.params.forEach((p, index) => {
      activationRecord[p] = args[index];
    });

    const activationEnv = new Environment(activationRecord, fn.env);

    return this._evalBody(fn.body, activationEnv);
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

  // Math operators.
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

  // Comparison operators.
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

  // Console output.
  print(...args) {
    console.log(...args);
  },
});

module.exports = Gero;
