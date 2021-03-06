# eGauge Visualizer

[deployed app](http://react-solar.herokuapp.com/)


### Overview

This app leverages the [eGauge home energy monitor API](https://www.egauge.net/docs/egauge-xml-api.pdf) to create a mobile-friendly quick visualizer to give an overview of solar production and electricity consumption.


### Architecture
Built with React.js
Leverages chart.js for data visualization

### Installation
* ```git clone``` this repository
* ```npm i```
* set your eGauge ID as the environment variable ```EGAUGE_ID```, or use [dotenv](https://www.npmjs.com/package/dotenv) to do it for you.
* if using dotenv, use the format ```EGAUGE_ID=XXXXXX```


### Testing
karma test runner


### NPM Scripts
* ```build``` webpack deployment script
* ```watch``` webpack dev server script
* ```test``` run all tests with karma
* ```test-watch``` run tests on fs changes

