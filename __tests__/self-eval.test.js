const assert = require("assert");

module.exports = (gero) => {
  assert.strictEqual(gero.eval(1), 1);
  assert.strictEqual(gero.eval('"foo"'), "foo");
};
