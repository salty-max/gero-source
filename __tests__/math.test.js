const assert = require("assert");

module.exports = (gero) => {
  assert.strictEqual(gero.eval(["+", 1, 5]), 6);
  assert.strictEqual(gero.eval(["-", ["+", ["+", 3, 2], ["+", 3, 2]], 5]), 5);
  assert.strictEqual(gero.eval(["*", ["*", 3, 2], 5]), 30);
  assert.strictEqual(gero.eval(["/", ["*", 5, 4], 2]), 10);
  assert.strictEqual(gero.eval(["%", 62, 5]), 2);
};
