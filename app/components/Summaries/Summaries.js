'use strict';

import React, {Component} from 'react';
import moment from 'moment';

import {fetchData} from '../../service/apiService.js';

import './_summaries.scss';

class Summaries extends Component{
  constructor(props){
    super(props);

    this.state={
      lastYear: moment().subtract(1, 'year').unix(),
      now: moment().unix(),
      chartData:[]
    };
  }
  componentDidMount(){
    // fetchData(this.lastYear, this.now, 'd', 363)
    // .then( res => {
    //   this.setState({
    //     chartData:[
    //       {value: parseInt(res.solar)},
    //       {value: parseInt(res.solar + res.grid)}
    //     ]
    //   });
    // });
    // debugger;
  }
  render(){
    return null
  }
  // getLastYear(){
  //   return new Promise( (resolve, reject) => {
  //     request.post('http://www.zacharycrumbo.com/widgets/solar-vanilla/solar-xml.php')
  //     .set('Accept', 'application/json')
  //     .set('Content-type', 'application/x-www-form-urlencoded')
  //     .send({
  //       start: this.state.lastYear,
  //       end: this.state.now,
  //       interval: 'd',
  //       skip: 363,
  //     }).end ((err, res) => {
  //       if (err) reject('server error');
  //       parser.parseString(res.text, (err, results) => {
  //         if (err) reject('xml parse error');
  //         resolve(results.group.data[0]);
  //       });
  //     });
  //   });
  // }
}

export default Summaries;