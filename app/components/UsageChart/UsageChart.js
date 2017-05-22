'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { processResultsPie } from '../../service/apiService.js';

const PieChart = require('react-chartjs').Pie;

import './_usageChart.scss';

class UsageChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData : [
        {
          value: null,
          color:'#F7464A',
          highlight: '#FF5A5E',
          label: 'Heat Pump'
        },
        {
          value: null,
          color: '#46BFBD',
          highlight: '#5AD3D1',
          label: 'Water Heater'
        },
        {
          value: null,
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

  componentWillReceiveProps(nextProps){
    if (nextProps.data.cname){
      let proc = processResultsPie(nextProps.data);

      this.setState({
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
      });
      debugger
    }
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

UsageChart.propTypes = {
  data: PropTypes.object
};

export default UsageChart;
