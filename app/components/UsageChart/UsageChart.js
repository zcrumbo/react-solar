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
          value: 1,
          color:'#F7464A',
          highlight: '#FF5A5E',
          label: 'Heat Pump'
        },
        {
          value: 1,
          color: '#46BFBD',
          highlight: '#5AD3D1',
          label: 'Water Heater'
        },
        {
          value: 1,
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
            value: parseFloat((proc.heat_pump).toFixed(2))
          },
          {
            value: parseFloat((proc.water_heater).toFixed(2))
          },
          {
            value: parseFloat(((proc.grid + proc.solar)
                        - (proc.heat_pump
                        + proc.water_heater)).toFixed(2))
          }
        ]
      });
    }
  }

  render(){
    return (
        <section className="usage piechart">
          <h2>Usage: Last {this.props.label} (kWh)</h2>
          <PieChart data={this.state.chartData} options={this.state.chartOptions}  height="300" width="300"/>
        </section>
    );
  }
}

UsageChart.propTypes = {
  data: PropTypes.object
};

export default UsageChart;
