const { test } = require("../test-util");

module.exports = (gero) => {
  test(
    gero,
    `
      (var x 10)

      (switch
        ((= x 10) 100)
        ((> x 10) 200)
        (else 300)
      )
    `,
    100
  );
};
