'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {processResultsLine} from '../../service/apiService.js';
import {Line} from 'react-chartjs-2';

import './_lineSummary.scss';

//const LineChart = require('react-chartjs').Line;

class LineSummary extends Component{
  constructor(props){
    super(props);

    this.state = {
      chartOptions:{
        legend:{
          labels:{
            boxWidth: 50,
            fontSize: 14
          }
        },
        scales: {
          xAxes:[{
            display:false
          }],
          yAxes:[{
            display:false,
            ticks:{
              min:0
            }
          }]
        },
        pointRadius:3,
        responsive: true,
        tooltips:{
          mode: 'index',
          intersect:false,
        }
      },
      chartData: {}
    };
  }
  componentWillReceiveProps(nextProps){
    let proc = processResultsLine(nextProps.data);
    //console.log(proc);
    let dates = proc.grid.map(el => {
      if(el) return el.date;
    });
    let gridData = proc.grid.map((el, i) => {
      if(el) return parseFloat((el.kwh + proc.solar[i].kwh).toFixed(2));
    });
    let solarData = proc.solar.map(el => {
      if(el) return parseFloat((el.kwh).toFixed(2));
    });

    this.setState({
      chartData:{
        labels: dates.splice(1).reverse(),
        datasets:[
          {
            label: 'kWh generated',
            backgroundColor: 'rgba(18, 220, 18, .4)',
            borderColor: 'rgba(18,220,18,.3)',
            borderWidth: 1,
            pointColor: 'rgba(18,220,18,1)',
            pointStrokeColor: '#9bff9b',
            pointHighlightFill: '#9bff9b',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            pointRadius: 0,
            data:solarData.splice(1).reverse()
          },
          {
            label: 'kWh consumed',
            backgroundColor: 'rgba(255,0,0,0.4)',
            borderColor: 'rgba(255,0,0,.3)',
            borderWidth: 1,
            pointColor: 'rgba(255,0,0,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            pointRadius: 0,
            data:gridData.splice(1).reverse()}
        ]
      }
    });
  }
  shouldComponentUpdate(nextProps){
    if(nextProps.label===this.props.label)return false;
    return true;
  }
  render(){
    return(
        <section className="linechart">
          <div><h2>{this.props.label} Summary</h2></div>
          <Line data={this.state.chartData} options={this.state.chartOptions} height={175}/>
        </section>
    );
  }

}

LineSummary.propTypes = {
  data: PropTypes.object,
  label: PropTypes.string
};
export default LineSummary;
