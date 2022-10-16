const { test } = require("../test-util");

module.exports = (gero) => {
  test(
    gero,
    `
      (var result 10)
      (for 
        (var i result)
        (>= i 0)
        (set i (- i 1))
        (set result i)
      )

      result
    `,
    0
  );
};
