/**
 * AST transformer.
 */
class Transformer {
  /**
   * Translates `def`-expression (function declaration)
   * into a variable declaration with a lambda
   * expression.
   * @param {string} defExp
   */
  transformDefToVarLambda(defExp) {
    const [_tag, name, params, body] = defExp;
    return ["var", name, ["lambda", params, body]];
  }

  transformSwitchToIf(switchExp) {
    const [_tag, ...cases] = switchExp;

    for (let i = cases.length - 1; i > 0; i--) {
      let current = i === 0 ? 0 : i - 1;

      cases[current].push(cases[i]);
      cases[current].unshift("if");
    }

    return cases[0];
  }

  transformForToWhile(forExp) {
    const [_tag, init, condition, modifier, exp] = forExp;

    return ["begin", init, ["while", condition, ["begin", exp, modifier]]];
  }
}

module.exports = Transformer;
