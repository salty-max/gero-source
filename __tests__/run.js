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
];

const gero = new Gero();

function exec(code) {
  return gero.eval(code);
}

tests.forEach((test) => test(gero));
gero.eval(["print", '"Hello"', '"World!"']);

console.log("👌  All tests passed!");
