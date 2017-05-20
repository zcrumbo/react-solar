'use strict';

import React, {Component} from 'react';
import moment from 'moment';

import UsageChart from '../UsageChart/UsageChart.js';
import SummaryChart from '../SummaryChart/SummaryChart.js';
import LineSummary from '../LineSummary/LineSummary.js';

import {fetchData} from '../../service/apiService.js';

import './_summaries.scss';

class Summaries extends Component{
  constructor(props){
    super(props);

    this.updateState = this.updateState.bind(this);
    this.state={
      lastYear: moment().subtract(1, 'year').unix(),
      now: moment().unix(),
      solarData:{}
    };
  }

  componentDidMount(){
    this.updateState();
  }
  updateState(){
    fetchData(this.state.lastYear, this.state.now, 'd', '5')
    .then( res => {
      this.setState({solarData: res});
      //console.log(this.state.solarData)
    });
  }
  render(){
    return (
      <section>
        <UsageChart data={this.state.solarData} />
        <SummaryChart data = {this.state.solarData} />
        <LineSummary data = {this.state.solarData} />
      </section>
    );
  }
}

export default Summaries;