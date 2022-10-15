const { test } = require("../test-util");

module.exports = (gero) => {
  // Consequent only
  test(
    gero,
    `
    (begin
      (var age 15)
      (var can_drink false)

      (if (>= age 21)
        (set can_drink true)
      )

      can_drink
    )
    `,
    false
  );

  // Consequent and alternate
  test(
    gero,
    `
    (begin
      (var age 15)
      (var can_drink false)

      (if (>= age 21)
        (set can_drink true)
        (set can_drink false)
      )

      can_drink
    )
    `,
    false
  );
};
