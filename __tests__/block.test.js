const assert = require("assert");

module.exports = (gero) => {
  assert.strictEqual(
    gero.eval(
      // prettier-ignore
      [
      "begin",
        ["var", "x", 10],
        ["var", "y", 20],

        ["+", ["*", "x", "y"], 30],
    ]
    ),
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
};
