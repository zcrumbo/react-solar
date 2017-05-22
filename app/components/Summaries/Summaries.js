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
      solarData:{},
      label: '12 Month'
    };
  }

  componentDidMount(){
    this.updateState();
  }
  updateState(start, end, intv, skip, label){
    //debugger;
    if(!label) label='12 Month';
    fetchData(start || this.state.lastYear, end || this.state.now, intv || 'd', skip || '0')
    .then( res => {
      this.setState({solarData: res, label});
      //console.log(this.state.solarData)
    });
  }
  render(){
    return (
      <section className="summaries">
        <UsageChart data={this.state.solarData} label={this.state.label} />
        <SummaryChart data = {this.state.solarData} label={this.state.label}/>
        <div>
          <button className="btn-classic"
            onClick={() => this.updateState(moment().subtract(1, 'year').unix(), moment().unix(), 'd', 0, '12 Months')}>
            past 12 months
          </button>
                    <button className="btn-classic"
            onClick={() => this.updateState(moment().subtract(1, 'week').unix(), moment().unix(), 'h', 3, '7 days')}>
            past 7 days
          </button>
          <button className="btn-classic"
            onClick={() => this.updateState(moment().subtract(1, 'day').unix(), moment().unix(), 'm', 19, '24 Hours')}>
            past 24 hours
          </button>
        </div>
        <LineSummary data = {this.state.solarData} label={this.state.label}/>
      </section>
    );
  }
}

export default Summaries;