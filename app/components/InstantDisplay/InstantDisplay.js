'use strict';

import React from 'react';
import { Component } from 'react';
import request from 'superagent';
import CountUp from 'react-countup';


import './_InstantDisplay.scss';

export class InstantDisplay extends Component{
  constructor(props){
    super(props);
    this.state = {
      consumed:.5,
      generated:.5,
      prevGen:0,
      prevCons:0,
      instant: {
        generation:0,
        consumption:0,
      }

    }; //only place you can assign state
  }
  componentDidMount() {
    this.updateInst();
    this.reqTimer = setInterval(
      () => this.updateInst(),
      2000
    );
  }
  componentWillUnmount() {
    clearInterval(this.reqTimer);

  }
  updateInst(){
    request.post('http://www.zacharycrumbo.com/widgets/solar-vanilla/solar-instant.php')
    .set('Accept', 'application/json')
    .end( (err, res)=> {
      if (err) return new Error('api error');
      let total = res.body.instant.consumption+res.body.instant.generation;
      let percentMade = res.body.instant.generation/total;
      let percentUsed = res.body.instant.consumption/total;
      this.setState( (prevState) => ({
        generated:percentMade,
        consumed: percentUsed,
        prevGen: prevState.instant.generation,
        prevCons: prevState.instant.consumption,
      }));
      this.setState(res.body);
    });
  }


  render() {

    return  (
      <section className="instant-display">
        <div className="data-vis">
          <div className="made" style={{width: this.state.generated*100+'vw'}}>
            <p>generated</p>
          </div>
          <div className="used" style={{width: this.state.consumed*100+'vw'}}>
            <p>consumed</p>

          </div>
        </div>
        <ul>
         <li className="consumed">
          Consumed:
          <span> <CountUp  start={this.state.prevCons} end={this.state.instant.consumption} duration={2} useEasing={false}/> Watts </span>
         </li>
         <li className="generated">
         Generated:
          <span> <CountUp  start={this.state.prevGen} end={this.state.instant.generation} duration={2} useEasing={false} /> Watts  </span>
          </li>
        </ul>
      </section>
    );
  }
}

export default InstantDisplay;