'use strict';

import React, {Component} from 'react';
import moment from 'moment';
import {fetchData, processResults} from '../../service/apiService.js';

const PieChart = require('react-chartjs').Pie;

import './_usageChart.scss';

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
    fetchData(this.state.lastYear, this.state.now)
    .then( res => {
      let proc = processResults(res);
      this.setState( () => ({
        chartData:[
          {
            value: parseInt(proc.heat_pump)
          },
          {
            value: parseInt(proc.water_heater)
          },
          {
            value: parseInt((proc.grid + proc.solar)
            - (proc.heat_pump
            + proc.water_heater))
          }
        ]
      }));
    })
    .catch(err => {
      console.error(err);
    });
  }

  render(){

    return (
        <section className="usage piechart">
          <h2>Usage: Last 12 Months (kWh)</h2>
          <PieChart data={this.state.chartData} options={this.state.chartOptions}  height="300" width="300"/>
        </section>
    );
  }
}

export default UsageChart;
