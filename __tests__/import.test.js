const { test } = require("../test-util");

module.exports = (gero) => {
  test(
    gero,
    `
      (import Math)

      ((prop Math abs) (- 10))
    `,
    10
  );

  // Assign a module prop to a variable
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

  console.log(gero.global);
};
