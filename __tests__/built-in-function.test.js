const { test } = require("../test-util");

module.exports = (gero) => {
  // Math functions
  test(gero, `(+ 1 5)`, 6);
  test(gero, `(+ (+ 2 3) 5)`, 10);
  test(gero, `(+ (* 2 3) 5)`, 11);

  // Comparison
  test(gero, `(> 1 5)`, false);
  test(gero, `(< 1 5)`, true);
  test(gero, `(>= 5 5)`, true);
  test(gero, `(<= 5 5)`, true);
  test(gero, `(= 5 5)`, true);
};
