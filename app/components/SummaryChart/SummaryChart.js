'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {processResultsPie} from '../../service/apiService.js';
import {Pie} from 'react-chartjs-2';

//const PieChart = require('react-chartjs').Pie;

import './_summaryChart.scss';

class SummaryChart extends Component{
  constructor(props){
    super(props);

    this.state = {
      chartData: {
        labels: [
          'Produced',
          'Consumed',
        ],
        datasets: [{
          data: [1,1],
          backgroundColor:[
            '#12DC12',
            '#ff0000',
          ],
          hoverBackgroundColor:[
            '#62ff62',
            '#ff5656',
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
      this.setState(
        {chartData:{
          datasets:[{
            data:[
              parseFloat(proc.solar.toFixed(2)),
              parseFloat((proc.solar + proc.grid).toFixed(2))
            ]}
          ]}
        });
    }
  }

  render(){
    return(
      <section className="summary piechart">
        <h2>{this.props.label} Summary (kwh)</h2>
        <Pie data={this.state.chartData} options={this.state.chartOptions} width={300} height={300} />
      </section>
    );
  }
}

SummaryChart.propTypes = {
  data: PropTypes.object,
  label: PropTypes.string
};

export default SummaryChart;
