'use strict';

import React, {Component} from 'react';
import {processResultsLine} from '../../service/apiService.js';

import {processResultsPie} from '../../service/apiService.js';

import './_lineSummary.scss';

const LineChart = require('react-chartjs').Line;

class LineSummary extends Component{
  constructor(props){
    super(props);

    this.state = {
      chartOptions:{
        animationSteps: 50,
        animationEasing: 'easeInOutQuart',
        responsive: true
      },
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Generated',
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: []
          },
          {
            label: 'consumed',
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: []
          }
        ]
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
    this.setState({
      chartData:{
        labels: dates.splice(1),
        datasets:[
          {data:solarData.splice(1)},
          {data:gridData.splice(1)}
        ]
      }
    });
  }



  render(){
    return(
        <section className="linechart">
          <h2>12 Month Summary</h2>
          <LineChart data={this.state.chartData} options={this.state.chartOptions}/>
        </section>
    );
  }

}

export default LineSummary;
/*
var data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: "My Second dataset",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90]
    }
  ]
};
*/