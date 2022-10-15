const { test } = require("../test-util");

module.exports = (gero) => {
  test(
    gero,
    `
    (begin
      (var x 10)
      (var y 20)

      (+ (* x y) 30)
    )
    `,
    230
  );

  // Nested blocks
  test(
    gero,
    `
    (begin
      (var x 10)

      (begin
        (var x 20)
        x
      )
      
      x
    )
    `,
    10
  );

  // Block as variable
  test(
    gero,
    `
    (begin
      (var y 10)

      (var result (begin
        (var x (+ y 10))
        x
      ))

      result
    )
    `,
    20
  );

  // Identifier resolution
  test(
    gero,
    `
    (begin
      (var foo 10)

      (begin
        (set foo 100)
      )

      foo
    )
    `,
    100
  );

  // Identifier resolution (string)
  test(
    gero,
    `
    (begin
      (var foo "hello")

      (begin
        (set foo "world")
      )

      foo
    )
    `,
    "world"
  );
};
