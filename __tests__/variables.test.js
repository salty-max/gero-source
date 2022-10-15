const assert = require("assert");

module.exports = (gero) => {
  assert.strictEqual(gero.eval(["var", "x", 1]), 1);
  assert.strictEqual(gero.eval(["var", "y", ["*", 2, 2]]), 4);
  assert.strictEqual(gero.eval(["var", "foo", '"bar"']), "bar");
  assert.strictEqual(gero.eval(["var", "isTrue", "true"]), true);
};
