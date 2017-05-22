'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {processResultsPie} from '../../service/apiService.js';

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
  componentWillReceiveProps(nextProps){
    if (nextProps.data.cname){
      let proc = processResultsPie(nextProps.data);
      this.setState(
        {chartData:[
          {value: parseFloat(proc.solar.toFixed(2))},
          {value: parseFloat((proc.solar + proc.grid).toFixed(2))},
        ]
        }
      );
    }
  }

  render(){
    return(
      <section className="summary piechart">
        <h2>{this.props.label} Summary (kwh)</h2>
        <PieChart data={this.state.chartData} options={this.state.chartOptions} width="300" height="300" />
      </section>
    );
  }
}

SummaryChart.propTypes = {
  data: PropTypes.object
};

export default SummaryChart;
