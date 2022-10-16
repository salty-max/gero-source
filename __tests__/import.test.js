const { test } = require("../test-util");

module.exports = (gero) => {
  // Default import
  test(
    gero,
    `
      (import Math)

      ((prop Math abs) (- 10))
    `,
    10
  );

  // Specific import from module exports
  test(
    gero,
    `
      (import (Cat) Animal)
      (var p (new Cat "Max"))
      ((prop p get_name) p)
    `,
    "Max"
  );

  // Access a constant from a module
  test(gero, `(prop Math MAX_VALUE)`, 1000);
};
