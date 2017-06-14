'use strict';

import React, {Component} from 'react';
import moment from 'moment';
import Alert from 'react-s-alert';

import UsageChart from '../UsageChart/UsageChart.js';
import SummaryChart from '../SummaryChart/SummaryChart.js';
import LineSummary from '../LineSummary/LineSummary.js';

import {fetchDataProxy} from '../../service/apiService.js';
import initData from '../../assets/init.json';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import './_summaries.scss';


class Summaries extends Component{
  constructor(props){
    super(props);

    this.updateState = this.updateState.bind(this);
    this.state={
      lastYear: moment().subtract(1, 'year').unix(),
      now: moment().unix(),
      solarData:initData,
      label: 'Loading',
      loading: true,
    };
  }

  componentDidMount(){
    this.updateState();
  }

  updateState(start, end, intv, skip, label){
    if (!this.state.loading) this.setState({loading:true});
    if (skip === undefined) skip=9;
    if(!label) label='24 Hour';
    this.timeout = setTimeout(() => {
      Alert.error('Loading error, please retry request');
      this.setState({label:'', loading:false});
    }, 5000);
    //debugger
    fetchDataProxy(start || moment().subtract(1, 'day').unix(), end || moment().unix(), intv || 'm', skip)
    .then( res => {
      clearTimeout(this.timeout);
      this.setState({solarData: res, label, loading:false});
    })
    .catch(err => {
      clearTimeout(this.timeout);
      Alert.error(`${err.message}, please try again`);
      this.setState({label:'', loading:false});
    });
  }
  render(){
    let loading = null;
    if(this.state.loading) {
      loading  = <div className="loader-parent">
                  <div className="loader"></div>
                  </div>;
    }
    return (
      <section className="summaries">
        {loading}
        <LineSummary data = {this.state.solarData} label={this.state.label}/>
        <div>
          <button className="btn-classic"
            onClick={() => this.updateState(moment().subtract(1, 'year').unix(), moment().unix(), 'd', '0', '12 Month')}>
            12 months
          </button>
          <button className="btn-classic"
            onClick={() => this.updateState(moment().subtract(3, 'month').unix(), moment().unix(), 'h', '11', '3 Month')}>
            3 months
          </button>
          <button className="btn-classic"
            onClick={() => this.updateState(moment().subtract(1, 'month').unix(), moment().unix(), 'h', '5', '1 Month')}>
            1 month
          </button>
          <button className="btn-classic"
            onClick={() => this.updateState(moment().subtract(1, 'week').unix(), moment().unix(), 'h', '0', '7 Day')}>
            7 days
          </button>
          <button className="btn-classic"
            onClick={() => this.updateState(moment().subtract(1, 'day').unix(), moment().unix(), 'm', 9, '24 Hour')}>
            24 hours
          </button>
        </div>
        <SummaryChart data = {this.state.solarData} label={this.state.label}/>
        <UsageChart data={this.state.solarData} label={this.state.label} />
        <Alert stack={{limit:3}} effect={'stackslide'} timeout={2000}/>
      </section>
    );
  }
}

export default Summaries;