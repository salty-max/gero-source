const { test } = require("../test-util");

module.exports = (gero) => {
  test(gero, `(var x 1)`, 1);

  // Complex declaration
  test(gero, `(var y (* 2 2))`, 4);

  // String declaration
  test(gero, `(var foo "bar")`, "bar");

  // Boolean declaration
  test(gero, `(var is_true true)`, true);
};
