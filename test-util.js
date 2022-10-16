const assert = require("assert");
const geroParser = require("./parser/gero-parser");

function test(gero, code, expected) {
  const exp = geroParser.parse(`(begin ${code})`);
  assert.strictEqual(gero.evalGlobal(exp), expected);
}

module.exports = {
  test,
};
