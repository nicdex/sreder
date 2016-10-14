var Hypothesis = require('../dist/domain/Hypothesis'); // aggregate
var ProposeHypothesis = require('../dist/commands/ProposeHypothesis');
var HypothesisProposed = require('../dist/events/HypothesisProposed');

module.exports = {
  'Test ProposeHypothesis': function (test) {
    var hypothesis = new Hypothesis();
    var result = hypothesis.execute(new ProposeHypothesis(134564,"the earth is flat."));
    console.log(result)
    test.ok(result instanceof HypothesisProposed);
    test.done();
  }
};