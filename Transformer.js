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

  transformIncToSet(incExp) {
    const [_tag, exp] = incExp;
    return ["set", exp, ["+", exp, 1]];
  }

  transformDecToSet(decExp) {
    const [_tag, exp] = decExp;
    return ["set", exp, ["-", exp, 1]];
  }

  transformIncValToSet(incExp) {
    const [_tag, exp, val] = incExp;
    return ["set", exp, ["+", exp, val]];
  }

  transformDecValToSet(decExp) {
    const [_tag, exp, val] = decExp;
    return ["set", exp, ["-", exp, val]];
  }

  transformMulValToSet(mulExp) {
    const [_tag, exp, val] = mulExp;
    return ["set", exp, ["*", exp, val]];
  }

  transformDivValToSet(divExp) {
    const [_tag, exp, val] = divExp;
    return ["set", exp, ["/", exp, val]];
  }
}

module.exports = Transformer;
