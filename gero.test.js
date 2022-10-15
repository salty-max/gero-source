const assert = require("assert");
const Gero = require("./gero");

const gero = new Gero();

// Self-evaluating expressions
assert.strictEqual(gero.eval(1), 1);
assert.strictEqual(gero.eval('"hello"'), "hello");

// Math operations
assert.strictEqual(gero.eval(["+", 1, 5]), 6);
assert.strictEqual(gero.eval(["-", ["+", ["+", 3, 2], ["+", 3, 2]], 5]), 5);
assert.strictEqual(gero.eval(["*", ["*", 3, 2], 5]), 30);
assert.strictEqual(gero.eval(["/", ["*", 5, 4], 2]), 10);
assert.strictEqual(gero.eval(["%", 62, 5]), 2);

// Variable declaration
assert.strictEqual(gero.eval(["var", "foo", 1]), 1);
assert.strictEqual(gero.eval(["var", "bar", ["*", 2, 2]]), 4);
assert.strictEqual(gero.eval(["var", "isTrue", "true"]), true);
// Variable access
assert.strictEqual(gero.eval("foo"), 1); // Access
assert.strictEqual(gero.eval("VERSION"), "0.1"); // Access global default variable

console.log("All assertions passed");
