const { test } = require("../test-util");

module.exports = (gero) => {
  test(
    gero,
    `
      (module Math
        (begin
          (def abs (value)
            (if (< value 0)
              (- value)
              value
            )
          )

          (def square (x)
            (* x x)
          )

          (var MAX_VALUE 1000)
        )
      )

      ((prop Math abs) (- 10))
    `,
    10
  );

  // Assign a module prop to a variable
  test(
    gero,
    `
      (var abs (prop Math abs))
      (abs (- 10))
    `,
    10
  );

  // Access a constant from a module
  test(gero, `(prop Math MAX_VALUE)`, 1000);
};
