'use strict';

import React, {Component} from 'react';
import moment from 'moment';
import {fetchData, processResults} from '../../service/apiService.js';

const PieChart = require('react-chartjs').Pie;

import './_summaryChart.scss';

class SummaryChart extends Component{
  constructor(props){
    super(props);

    this.state = {
      chartData : [
        {
          value: 100,
          color:'#12DC12',
          highlight: '#62ff62',
          label: 'Produced'
        },
        {
          value: 100,
          color: '#ff0000',
          highlight: '#ff5656',
          label: 'Consumed'
        },
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
    fetchData(this.state.lastYear, this.state.now)
    .then( res => {
      let proc = processResults(res);
      this.setState( () => ({
        chartData:[
          {
            value: parseInt(proc.solar)
          },
          {
            value: parseInt(proc.solar + proc.grid)
          },

        ]
      }));
    })
    .catch(err => {
      console.error(err);
    });
  }



  render(){
    return(
      <section className="summary piechart">
        <h2>12 Month Summary (kwh)</h2>
        <PieChart data={this.state.chartData} options={this.state.chartOptions} width="300" height="300" />
      </section>
    );
  }

}

export default SummaryChart;
