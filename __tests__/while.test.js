const { test } = require("../test-util");

module.exports = (gero) => {
  test(
    gero,
    `
      (var counter 0)
      (var result 0)

      (while (< counter 10)
        (begin
          (set result (+ result 1))
          (set counter (+ counter 1))
        )
      )

      result
    `,
    10
  );
};
