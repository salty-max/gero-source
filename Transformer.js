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
    const ifExp = ["if", null, null, null];
    let current = ifExp;

    cases.forEach((c, index) => {
      const [currentCond, currentBlock] = c;
      current[1] = currentCond;
      current[2] = currentBlock;

      const next = cases[index + 1];
      const [nextCond, nextBlock] = next;

      current[3] = nextCond === "else" ? nextBlock : ["if"];

      current = current[3];
    });

    return ifExp;
  }
}

module.exports = Transformer;
