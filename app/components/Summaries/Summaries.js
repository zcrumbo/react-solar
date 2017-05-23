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
    if (skip === undefined) skip=9;
    if(!label) label='24 Hour';
    ///debugger
    fetchData(start || moment().subtract(1, 'day').unix(), end || this.state.now, intv || 'm', skip)
    .then( res => {
      this.setState({solarData: res, label});
      //console.log(this.state.solarData)
    });
  }
  render(){
    return (
      <section className="summaries">
        <LineSummary data = {this.state.solarData} label={this.state.label}/>
        <div>
          <button className="btn-classic"
            onClick={() => this.updateState(moment().subtract(1, 'year').unix(), moment().unix(), 'd', '0', '12 Month')}>
            past 12 months
          </button>
          <button className="btn-classic"
            onClick={() => this.updateState(moment().subtract(1, 'month').unix(), moment().unix(), 'd', '0', '1 Month')}>
            past 1 month
          </button>
          <button className="btn-classic"
            onClick={() => this.updateState(moment().subtract(1, 'week').unix(), moment().unix(), 'h', '0', '7 Day')}>
            past 7 days
          </button>
          <button className="btn-classic"
            onClick={() => this.updateState(moment().subtract(1, 'day').unix(), moment().unix(), 'm', 9, '24 Hour')}>
            past 24 hours
          </button>
        </div>
        <UsageChart data={this.state.solarData} label={this.state.label} />
        <SummaryChart data = {this.state.solarData} label={this.state.label}/>
      </section>
    );
  }
}

export default Summaries;