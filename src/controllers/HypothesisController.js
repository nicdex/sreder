import uuid from 'uuid';
import Hypothesis from '../domain/Hypothesis';
import ProposeHypothesis from '../commands/ProposeHypothesis';

export default class HypothesisController {
  constructor(app, readRepository, commandHandler, logger) {

    function proposeHypothesis(req, res) {
      //TODO: validate req.body input
      const command = new ProposeHypothesis(uuid.v4(), req.body.description);
      commandHandler(command.hypothesisId, new Hypothesis(), command)
          .then(() => {
            res.json(command);
          })
          .catch(err => {
            logger.error(err.stack);
            res.status(500).json({message: err.message});
          });
    }

    app.post('/api/v1/hypotheses/propose', proposeHypothesis);

    function getAllHypotheses(req, res) {
      readRepository.findAll('hypotheses')
          .then(results => {
            res.json(results);
          })
          .catch(err => {
            logger.error(err);
            res.status(500).json(err);
          });
    }

    app.get('/api/v1/hypotheses', getAllHypotheses);
  }
}