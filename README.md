# SR&EDER

An opensource SR&ED process/time capture system

![SREDER](Shredder.png)

## Requirements

* [nodejs](https://nodejs.org) v6.x\*

\* For some reason zmq on Node 6.x doesn't build on Windows and I haven't tested for Linux


## Getting Started

### Install & run Eventstore on localhost

See http://docs.geteventstore.com/introduction/3.9.0/ . 

### Install modules

`npm install`

### Run the tests

`npm test`

### Start app

`npm start`

## Using the API

### Propose a hypothesis

Research and other activities intended to prove or disprove a hypothesis requires an investment: 
We pay the people who contribute to doing it and we can claim SR & ED tax credit for their salaries and consulting fees. 

To propose a hypothesis:

```
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '
  {
    "description": "A brilliant hypothesis we should prove and claim SR&ED tax credits for."
  }
' "http://localhost:8080/api/v1/hypotheses/propose"
```
This will return the hypothesisId of the newly created hypothesis, e.g. '7ed623e6-b947-418d-87c5-b97fd8769acb'. 


### Add a contributor to a hypothesis

Copy the id of an existing hypthesis (e.g. 7ed623e6-b947-418d-87c5-b97fd8769acb ) and use it as hypothesisId in the curl below:

```
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '
  {
  	"hypothesisId": "7ed623e6-b947-418d-87c5-b97fd8769acb",
    "name": "Albert Einstein"
  }
' "http://localhost:8080/api/v1/hypotheses/addcontributor"
```

### GET a list of hypotheses

```
curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" "http://localhost:8080/api/v1/hypotheses"
```

## TODO

This is how far we got on https://www.meetup.com/DDD-CQRS-ES/events/233962161/. For a (extremely) minimum (just barely) viable SR & ED claims system one might proceed as follows:

- We could do with a contributor aggregate which allows creating, updating and deleting potential contributors and knows what rules apply when doing so (e.g. a contributor cannot have a blank name.)
- New API endpoint for POSTing new contributors: http://localhost:8080/api/v1/contributors/create
- The hypothesis aggregate (domain/Hypothesis.js) should perform a check to prevent the same contributor from being added a second time.
- A http://localhost:8080/api/v1/contributors URI for GETting a list of all people who can contribute to hyptheses would be nice.
- When we eventstormed the system we concluded that what makes it really useful is that it's able to receive (e.g.) TimesheetEntryRecorded events from external, already existing\
time tracking systems so that SR & ED admins can look at them and attribute them to projects. We could build a read model for this: Whenever a TimeEntryRecorded by one
of our project contributors occurs, update the read model so the entry can be seen by an admin who may decide that it represents a contribution to one or more hypotheses we 
were trying to prove at the time and clicks buttons to issue an AddContributor commands.
- We are missing commands to update or delete hypotheses. 
- A UI would be nice. Usability is probably what would sell this product; learning and iterating on user experience early on seems important.
