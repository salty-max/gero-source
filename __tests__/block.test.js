const assert = require("assert");

module.exports = (gero) => {
  assert.strictEqual(
    // prettier-ignore
    gero.eval(
      ["begin",
        ["var", "x", 10],
        ["var", "y", 20],

        ["+", ["*", "x", "y"], 30],
      ]),
    230
  );

  assert.strictEqual(
    // prettier-ignore
    gero.eval(
      ["begin",
        ["var", "x", 10],

        ["begin",
          ["var", "x", 20],
          "x"
        ],

        "x",
      ]),
    10
  );

  assert.strictEqual(
    // prettier-ignore
    gero.eval(
      ["begin",
        ["var", "y", 10],

        ["var", "result", ["begin",
          ["var", "x", ["+", "y", 10]],
          "x"
        ]],

        "result",
      ]),
    20
  );

  assert.strictEqual(
    //prettier-ignore
    gero.eval(
      ["begin",
        ["var", "foo", 10],

        ["begin",
          ["set", "foo", 100]
        ],
        
        "foo"
      ]),
    100
  );

  assert.strictEqual(
    //prettier-ignore
    gero.eval(
      ["begin",
        ["var", "foo", '"hello"'],

        ["begin",
          ["set", "foo", '"world"']
        ],
        
        "foo"
      ]),
    "world"
  );
};
