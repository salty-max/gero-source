const { test } = require("../test-util");

module.exports = (gero) => {
  // Class
  test(
    gero,
    `
      (class Point null
        (begin
          (def constructor (self x y)
            (begin
              (set (prop self x) x)
              (set (prop self y) y)
            )
          )

          (def translate_x (self other)
            (+= (prop self x) (prop other x))
          )

          (def translate_y (self other)
            (+= (prop self y) (prop other y))
          )
        )
      )

      (var p1 (new Point 10 20))
      (var p2 (new Point 5 10))

      ((prop p1 translate_x) p1 p2)
      (prop p1 x)
    `,
    15
  );

  // Inheritance
  test(
    gero,
    ` 
      (class Point3D Point
        (begin
          (def constructor (self x y z)
            (begin
              ((prop (super Point3D) constructor) self x y)
              (set (prop self z) z)
            )
          )

          (def translate_z (self other)
            (+= (prop self z) (prop other z))
          )

          (def translate (self other)
            (begin
              ((prop (super Point3D) translate_x) self other)
              ((prop (super Point3D) translate_y) self other)
              ((prop self translate_z) self other)
            )
          )
        )
      )

      (var p1 (new Point3D 10 20 60))
      (var p2 (new Point3D 5 10 30))

      ((prop p1 translate) p1 p2)
      (prop p1 x)
    `,
    15
  );
};
