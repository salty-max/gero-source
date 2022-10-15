const assert = require("assert");

module.exports = (gero) => {
  assert.strictEqual(
    // prettier-ignore
    gero.eval(
      ["begin", 
        ["var", "counter", 0],
        ["var", "result", 0],

        ["while", ["<", "counter", 10],
          // TODO: implements ["++", <Exp>]
          ["begin",
            ["set", "result", ["+", "result", 1]],
            ["set", "counter", ["+", "counter", 1]],
          ]
        ],

        "result"
      ]),
    10
  );
};
