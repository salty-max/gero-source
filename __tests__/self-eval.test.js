const { test } = require("../test-util");

module.exports = (gero) => {
  // Number
  test(gero, `1`, 1);

  // String
  test(gero, `"foo"`, "foo");

  // Boolean
  test(gero, `true`, true);
};
