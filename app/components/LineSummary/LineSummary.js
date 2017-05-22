'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {processResultsLine} from '../../service/apiService.js';

import './_lineSummary.scss';

const LineChart = require('react-chartjs').Line;

class LineSummary extends Component{
  constructor(props){
    super(props);

    this.state = {
      chartOptions:{
        showScale: false,
        animationSteps: 50,
        animationEasing: 'easeInOutQuart',
        responsive: true,
        scaleShowVerticalLines : true,
        pointDotRadius: 3,
        pointHitDetectionRadius: 5,

      },
      chartData: {
        labels: [],
        datasets: [{},{}]
      }
    };
  }
  componentWillReceiveProps(nextProps){
    let proc = processResultsLine(nextProps.data);
    let dates = proc.grid.map(el => {
      if(el) return el.date;
    });
    let gridData = proc.grid.map((el, i) => {
      if(el) return parseInt(el.kwh + proc.solar[i].kwh);
    });
    let solarData = proc.solar.map(el => {
      if(el) return parseInt(el.kwh);
    });
        //debugger
    //LineChart.defaults.global.legend.display = false;
    this.setState({
      chartData:{
        labels: dates.splice(1),
        datasets:[
          {
            label: 'generated',
            fillColor: 'rgba(18, 220, 18, .2)',
            strokeColor: 'rgba(18,220,18,1)',
            pointColor: 'rgba(18,220,18,1)',
            pointStrokeColor: '#9bff9b',
            pointHighlightFill: '#9bff9b',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data:solarData.splice(1)
          },
          {
            label: 'consumed',
            fillColor: 'rgba(255,0,0,0.2)',
            strokeColor: 'rgba(255,0,0,1)',
            pointColor: 'rgba(255,0,0,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data:gridData.splice(1)}
        ]
      }
    });
  }

  render(){
    return(
        <section className="linechart">
          <div><h2>12 Month Summary</h2></div>
          <LineChart data={this.state.chartData} options={this.state.chartOptions} redraw/>
        </section>
    );
  }

}

LineSummary.propTypes = {
  data: PropTypes.object
};
export default LineSummary;
