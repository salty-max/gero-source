const assert = require("assert");

/**
 * (if <condition>
 *     <consequent>
 *     <alternate>)
 */
module.exports = (gero) => {
  assert.strictEqual(
    // prettier-ignore
    gero.eval(
      ["begin", 
        ["var", "age", 15],
        ["var", "canDrink", "false"],

        ["if", [">", "age", 21],
          ["set", "canDrink", "true"],
        ],

        "canDrink"
      ]),
    false
  );

  assert.strictEqual(
    // prettier-ignore
    gero.eval(
      ["begin", 
        ["var", "age", 15],
        ["var", "canDrink", "false"],

        ["if", [">", "age", 21],
          ["set", "canDrink", "true"],
          ["set", "canDrink", "false"],
        ],

        "canDrink"
      ]),
    false
  );
};
