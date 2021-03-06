export const filters = {
  eventType: ['HypothesisProposed', 'ContributorIdentified']
};

export function reducer(hypotheses, eventData) {
  const event = eventData.event;
  const metadata = eventData.metadata;
  switch(eventData.typeId) {
    case 'HypothesisProposed':
      hypotheses.push({
        id: event.hypothesisId,
        description: event.description,
        contributors: []
      });
      break;
    case 'ContributorIdentified':
      const oneHypothesis = hypotheses.filter(hype => hype.id === event.hypothesisId );
      console.log(event);
      console.log(hypotheses);
      oneHypothesis[0].contributors.push({
        contributorId: event.contributorId
      });
      break;
    case 'ContributorIdentified':
      var hypothesis = hypotheses.filter(x => x.id === event.hypothesisId)[0];
      if (hypothesis)
        hypothesis.contributors.push(event.contributorId);
      break;
  }
  return hypotheses;
}