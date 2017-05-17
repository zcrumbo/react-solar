'use strict';

import React, {Component} from 'react';
import moment from 'moment';
import request from 'superagent';
import {Parser} from 'xml2js';

const parser = new Parser({mergeAttrs:true, charkey:'val'});
const PieChart = require('react-chartjs').Pie;

import './_SummaryChart.scss';

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
    this.getLastYear()
    .then( res => {
      this.setState( () => ({
        chartData:[
          {
            value: parseInt(res.solar)
          },
          {
            value: parseInt(res.solar + res.grid)
          },

        ]
      }));
    })
    .catch(err => {
      console.error(err);
    });
  }

  getLastYear(){
    return new Promise( (resolve, reject) => {
      request.post('http://www.zacharycrumbo.com/widgets/solar-vanilla/solar-xml.php')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({
        start: this.state.lastYear,
        end: this.state.now,
        interval: 'd',
        skip: 363,
      }).end ((err, res) => {
        if (err) reject('server error');
        parser.parseString(res.text, (err, results) => {
          if (err) reject('xml parse error');
          var data = this.processResults(results.group.data[0]);
          resolve(data);
        });
      });
    });
  }

  processResults(resObj){
    let procObj = {};
    resObj.r[0].c.forEach((el, index) => {
      let name = resObj.cname[index].val.replace(/[D\s]/g, '_').replace(/[!@|]/g, '').toLowerCase();

      procObj[name]=(el - resObj.r[1].c[index])/3600000;
    });
    return procObj;
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
