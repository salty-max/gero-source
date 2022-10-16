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

  test(
    gero,
    `
    (var l (list "apple" "banana" "orange"))
    (push l "pineapple")
    (idx l 3)
    `,
    "pineapple"
  );

  test(
    gero,
    `
    (var l (list "apple" "banana" "orange"))
    (pop l)
    (push l "pineapple")
    (idx l 2)
    `,
    "pineapple"
  );
};
