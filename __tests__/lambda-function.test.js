const { test } = require("../test-util");

module.exports = (gero) => {
  // Lambda as callback
  test(
    gero,
    `
      (def on_click (callback)
        (begin
          (var x 10)
          (var y 20)
          (callback (+ x y))
        )
      )

      (on_click (lambda (data) (* data 10)))
    `,
    300
  );

  // Immediately-invoked lambda expression - IILE
  test(gero, `((lambda (x) (* x x)) 2)`, 4);

  // Save lambda as a variable
  test(
    gero,
    `
      (var square (lambda (x) (* x x)))
      (square 2)
    `,
    4
  );
};
