const { test } = require("../test-util");

module.exports = (gero) => {
  test(
    gero,
    `
      (class Point null
        (begin
          (def constructor (self x y)
            (set (prop self x) x)
            (set (prop self y) y)
          )

          (def add (self other)
            (+= (prop self x) (prop other x))
            (+= (prop self y) (prop other y))
          )
        )
      )

      (var p1 (new Point 10 20))
      (var p2 (new Point 5 10))

      ((prop p1 add) p1 p2)
      (prop p1 x)
    `,
    15
  );
};
