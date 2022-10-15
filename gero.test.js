const assert = require("assert");
const Gero = require("./gero");

const gero = new Gero();

assert.strictEqual(gero.eval(1), 1);
assert.strictEqual(gero.eval('"hello"'), "hello");

assert.strictEqual(gero.eval(["+", 1, 5]), 6);
assert.strictEqual(gero.eval(["-", ["+", ["+", 3, 2], ["+", 3, 2]], 5]), 5);
assert.strictEqual(gero.eval(["*", ["*", 3, 2], 5]), 30);
assert.strictEqual(gero.eval(["/", ["*", 5, 4], 2]), 10);
assert.strictEqual(gero.eval(["%", 62, 5]), 2);

console.log("All assertions passed");
