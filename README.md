# SR&EDER

An opensource SR&ED process/time capture system

![SREDER](Shredder.png)

## Requirements

* [nodejs](https://nodejs.org) v4.x\*

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

### GET a list of hypotheses

```
curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" "http://localhost:8080/api/v1/hypotheses"
```

### Add a contributor to a hypothesis

```
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '
  {
  	"hypothesisId": "7ed623e6-b947-418d-87c5-b97fd8769acb",
    "name": "Albert Einstein"
  }
' "http://localhost:8080/api/v1/hypotheses/addcontributor"
```

