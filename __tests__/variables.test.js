const assert = require("assert");

module.exports = (gero) => {
  assert.strictEqual(gero.eval(["var", "foo", 1]), 1);
  assert.strictEqual(gero.eval(["var", "bar", ["*", 2, 2]]), 4);
  assert.strictEqual(gero.eval(["var", "isTrue", "true"]), true);
};
