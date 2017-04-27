import React from 'react';
import { Component } from 'react';
import request from 'superagent';

export class InstantDisplay extends Component{
  constructor(props){
    super(props);
    this.state = {
      instant:{
        consumption:'...',
        generation: '...',
      }
    }; //only place you can assign state
  }
  componentDidMount() {
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
    });
  }
  render() {
    return  (
      <ul>
       <li> <span> Consumed:</span> {this.state.instant.consumption} Watts </li>
       <li> <span> Produced:</span> {this.state.instant.generation} Watts </li>
      </ul>
    );
  }
}

export default InstantDisplay;