const Gero = require("../Gero");
const Environment = require("../Environment");

const tests = [
  require("./self-eval.test"),
  require("./math.test"),
  require("./variables.test"),
  require("./block.test"),
];

const gero = new Gero();

function exec(code) {
  return gero.eval(code);
}

tests.forEach((test) => test(gero));

console.log("👌 All tests passed!");
