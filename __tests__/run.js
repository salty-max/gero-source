const Gero = require("../Gero");
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
  require("./module.test"),
  require("./import.test"),
  require("./exports.test"),
  require("./list.test"),
];

const gero = new Gero();

function exec(code) {
  return gero.eval(code);
}

res = gero.eval(["print", '"๐งช   Running tests..."']);
tests.forEach((test) => test(gero));

console.log("๐  All tests passed!");
