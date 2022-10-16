const Gero = require("../Gero");
const Environment = require("../Environment");
const testUtil = require("../test-util");

const tests = [
  require("./self-eval.test"),
  require("./math.test"),
  require("./variables.test"),
  require("./block.test"),
  require("./if.test"),
  require("./while.test"),
  require("./built-in-function.test"),
  require("./user-defined-function.test"),
  require("./lambda-function.test"),
  require("./switch.test"),
  require("./for-loop.test"),
  require("./class.test"),
];

const gero = new Gero();

function exec(code) {
  return gero.eval(code);
}

res = gero.eval(["print", '"🧪   Running tests..."']);
tests.forEach((test) => test(gero));

console.log("👌  All tests passed!");
