const { test } = require("../test-util");

module.exports = (gero) => {
  test(
    gero,
    `
    (var l (list "apple" "banana" "orange"))
    (idx l 0)
    `,
    "apple"
  );
};
