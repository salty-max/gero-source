const assert = require("assert");
const geroParser = require("./parser/gero-parser");

function test(gero, code, expected) {
  const exp = geroParser.parse(code);
  assert.strictEqual(gero.eval(exp), expected);
}

module.exports = {
  test,
};
