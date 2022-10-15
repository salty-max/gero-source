const assert = require("assert");
const { test } = require("../test-util");

module.exports = (gero) => {
  // Math functions
  test(`(+ 1 5)`, 6);
  test(`(+ (+ 2 3) 5)`, 10);
  test(`(+ (* 2 3) 5)`, 11);

  // Comparison
  test(`(> 1 5)`, false);
  test(`(< 1 5)`, true);
  test(`(>= 5 5)`, true);
  test(`(<= 5 5)`, true);
  test(`(= 5 5)`, true);
};
