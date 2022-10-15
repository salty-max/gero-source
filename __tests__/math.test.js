const { test } = require("../test-util");

module.exports = (gero) => {
  test(gero, `(+ 1 5)`, 6);
  test(gero, `(- (+ (+ 3 2) (+ 3 2)) 5)`, 5);
  test(gero, `(* (* 3 2) 5)`, 30);
  test(gero, `(/ (* 5 4) 2)`, 10);
  test(gero, `(% 32 5)`, 2);
};
