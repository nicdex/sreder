import ProposeHypothesis from '../commands/ProposeHypothesis';
import HypothesisProposed from '../events/HypothesisProposed';
import AddContributor from '../commands/AddContributor';
import ContributorIdentified from '../events/ContributorIdentified';

export default class Hypothesis {
  constructor() {
    this._id = null;
    this._contributorId = null;
    this._description = null;
    this._contributors = [];
  }

  hydrate(evt) {
    if (evt instanceof HypothesisProposed) {
      this._onHypothesisProposed(evt);
    } 
    if (evt instanceof ContributorIdentified) {
      console.log(evt)
      this._onContributorIdentified(evt);
    } 
  }
  

  _onHypothesisProposed(evt) {
    this._id = evt.hypothesisId;
    this._description = evt.description;
    this._contributors = [];
  }

  _onContributorIdentified(evt) {
    console.log("PUSHING CONTRIBUTOR " + evt.contributorId);
    this._contributors.push(evt.contributorId);
  }

  execute(command) {
    if (command instanceof ProposeHypothesis) {
      return this._propose(command);
    }
    if (command instanceof AddContributor) {
      return this._addContributor(command);
    }
    throw new Error('Unknown command.');
  }

  _propose(command) {
    if (this._id) {
      throw new Error('Hypothesis already exists.');
    }
    return new HypothesisProposed(command.hypothesisId, command.description);
  }

  _addContributor(command) {
    // TODO: Test for duplicate contributors. Should be idempotent.
    // if (this._contributorId) {
    //   throw new Error('Contributor already added.'); 
    // }
    return new ContributorIdentified(command.hypothesisId, command.contributorId, command.name);
  }
};