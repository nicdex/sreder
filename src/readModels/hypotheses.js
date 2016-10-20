export const filters = {
  eventType: ['HypothesisProposed']
};

export function reducer(hypotheses, eventData) {
  const event = eventData.event;
  const metadata = eventData.metadata;
  switch(eventData.typeId) {
    case 'HypothesisProposed':
      hypotheses.push({
        id: event.hypothesisId,
        description: event.description
      });
      break;
  }
  return hypotheses;
}