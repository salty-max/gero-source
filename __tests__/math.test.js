const { test } = require("../test-util");

module.exports = (gero) => {
  test(gero, `(+ 1 5)`, 6);
  test(gero, `(- (+ (+ 3 2) (+ 3 2)) 5)`, 5);
  test(gero, `(* (* 3 2) 5)`, 30);
  test(gero, `(/ (* 5 4) 2)`, 10);
  test(gero, `(% 32 5)`, 2);

  // Sugar operators
  test(
    gero,
    `
    (begin
      (var foo 1)
      (++ foo)
      foo  
    )
    `,
    2
  );

  test(
    gero,
    `
    (begin
      (var foo 2)
      (-- foo)
      foo  
    )
    `,
    1
  );

  test(
    gero,
    `
    (begin
      (var foo 1)
      (+= foo 2)
      foo  
    )
    `,
    3
  );

  test(
    gero,
    `
    (begin
      (var foo 3)
      (-= foo 2)
      foo  
    )
    `,
    1
  );

  test(
    gero,
    `
    (begin
      (var foo 3)
      (*= foo 2)
      foo  
    )
    `,
    6
  );

  test(
    gero,
    `
    (begin
      (var foo 4)
      (/= foo 2)
      foo  
    )
    `,
    2
  );
};
