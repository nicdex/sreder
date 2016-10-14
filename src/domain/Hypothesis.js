var ProposeHypothesis = require('../commands/ProposeHypothesis');
var HypothesisProposed = require('../events/HypothesisProposed');

module.exports = class Hypothesis {
  constructor() {
    this._hypothesisId = null;
    this._description = null;
  }

  hydrate(evt) {
    if (evt instanceof HypothesisProposed) {
      this._onHypothesisProposed(evt);
    }
  }

  _onHypothesisProposed(evt) {
    this._hypothesisId = evt.hypothesisId
  }

  execute(command) {
    if (command instanceof ProposeHypothesis) {
      return this._propose(command);
    }
    throw new Error('Unknown command.');
  }

  _propose(command) {
    if (this._hypothesisId) {
      throw new Error('Hypothesis already exists.');
    }
    return new HypothesisProposed(command.id, command.description);
  }
}