'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { processResultsPie } from '../../service/apiService.js';
import {Pie} from 'react-chartjs-2';
//const PieChart = require('react-chartjs').Pie;

import './_usageChart.scss';

class UsageChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: [
          'Heat Pump',
          'Water Heater',
          'Everything Else'
        ],
        datasets: [{
          data: [1,1,1],
          backgroundColor:[
            '#F7464A',
            '#46BFBD',
            '#FDB45C'
          ],
          hoverBackgroundColor:[
            '#FF5A5E',
            '#5AD3D1',
            '#FFC870'
          ]
        }]
      },
      chartOptions:{
        duration: 300,
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
        chartData:{
          datasets: [{
            data: [
              parseFloat((proc.heat_pump).toFixed(2)),
              parseFloat((proc.water_heater).toFixed(2)),
              parseFloat(((proc.grid + proc.solar)
                        - (proc.heat_pump
                        + proc.water_heater)).toFixed(2))
            ]
          }]
        }
      });
    }
  }

  render(){
    return (
        <section className="usage piechart">
          <h2>Usage: Last {this.props.label} (kWh)</h2>
          <Pie data={this.state.chartData} options={this.state.chartOptions}  height={300} width={300}/>
        </section>
    );
  }
}

UsageChart.propTypes = {
  data: PropTypes.object,
  label: PropTypes.string
};

export default UsageChart;
