'use strict';

import React from 'react';
import { Component } from 'react';
import request from 'superagent';

import './_InstantDisplay.scss';

export class InstantDisplay extends Component{
  constructor(props){
    super(props);
    this.state = {
      consumed:.5,
      generated:.5,
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
      this.setState(res.body);
      let total = res.body.instant.consumption+res.body.instant.generation;
      let percentMade = res.body.instant.generation/total;
      let percentUsed = res.body.instant.consumption/total;
      this.setState({generated:percentMade, consumed: percentUsed});
    });
  }
  render() {

    return  (
      <div >
        <div className="data-vis">
          <div className="made" style={{width: this.state.generated*100+'vw'}}>
            <p>generated</p>
          </div>
          <div className="used" style={{width: this.state.consumed*100+'vw'}}>
            <p>consumed</p>

          </div>
        </div>
        <ul>
         <li> <span> Consumed:</span> {this.state.instant.consumption} Watts </li>
         <li> <span> Produced:</span> {this.state.instant.generation} Watts </li>
        </ul>
      </div>
    );
  }
}

export default InstantDisplay;