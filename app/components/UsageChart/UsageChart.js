'use strict';

import React, {Component} from 'react';
import moment from 'moment';
import request from 'superagent';
const PieChart = require('react-chartjs').Pie;

import './_UsageChart.scss';

class UsageChart extends Component{
  constructor(props){
    super(props);

    this.state = {
      chartData : [
        {
          value: 100,
          color:'#F7464A',
          highlight: '#FF5A5E',
          label: 'Heat Pump'
        },
        {
          value: 100,
          color: '#46BFBD',
          highlight: '#5AD3D1',
          label: 'Water Heater'
        },
        {
          value: 100,
          color: '#FDB45C',
          highlight: '#FFC870',
          label: 'Everything Else'
        }
      ],
      chartOptions:{
        animationSteps: 50,
        animationEasing: 'easeInOutQuart',
        responsive: true
      },
      lastYear: moment().subtract(1, 'year').unix(),
      now: moment().unix()
    };
  }

  componentDidMount(){
    this.getLastYear();
  }

  getLastYear(){
    console.log('lastYear')
    request.post('http://www.zacharycrumbo.com/widgets/solar-vanilla/solar.php')
    .set('Accept', 'application/json')
    .set('Content-type', 'application/x-www-form-urlencoded')
    .send({
      start: this.state.lastYear,
      end: this.state.now,
      interval: 'd'
    }).end ((err, res) => {
      if (err) return new Error('server error');
      console.log(res);


    });
  }



  render(){

    return (
        <section className="usage piechart">
          <h2>Last 12 Months {}</h2>
          <PieChart data={this.state.chartData} options={this.state.chartOptions}  height="300" width="300"/>
        </section>
    );
  }
}

export default UsageChart;
