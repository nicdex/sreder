var Hypothesis = require('../dist/domain/Hypothesis').default;
var ProposeHypothesis = require('../dist/commands/ProposeHypothesis').default;
var HypothesisProposed = require('../dist/events/HypothesisProposed').default;
var AddContributor = require('../dist/commands/AddContributor').default;
var ContributorIdentified = require('../dist/events/ContributorIdentified').default;

module.exports = {
  'Test ProposeHypothesis': function (test) {
    var hypothesis = new Hypothesis();
    var result = hypothesis.execute(new ProposeHypothesis("134564","the earth is flat."));
    test.ok(result instanceof HypothesisProposed);
    test.equal(result.hypothesisId, "134564");
    test.equal(result.description, "the earth is flat.");
    test.done();
  },
  'Test AddContributor': function (test) {
    var hypothesis = new Hypothesis();
    hypothesis.hydrate(new HypothesisProposed("hyp-1","the earth is flat."));
    var result = hypothesis.execute(new AddContributor("hyp-1", "contrib-666666","Albert Einstein"));
    test.ok(result instanceof ContributorIdentified);
    test.equal(result.hypothesisId, "hyp-1");
    test.equal(result.contributorId, "contrib-666666")
    test.equal(result.name, "Albert Einstein");
    test.done();
  }
};