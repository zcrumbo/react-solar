import React from 'react';
import { Component } from 'react';
import request from 'superagent';

export class EnergyDisplay extends Component{
  constructor(props){
    super(props);
    this.state = {
      instant:{
        consumption:'',
        generation: '',
      },
      fromBeginning: {
        consumption:'',
        generation: '',


      }
    }; //only place you can assign state
  }
  componentDidMount() {
  //update state with setState()
  // if synchronous updates required w/props, use pattern below
  // this.setState((prevState, props) => ({
  // state-to-be-updated: prevState.state-name + props.prop-name
  // }));
    request.post('http://www.zacharycrumbo.com/widgets/solar-vanilla/solar.php')
    .set('Accept', 'application/json')
    .end( (err, res)=> {
      if (err) return new Error('api error');
      this.setState(res.body);
    });
  }
  render() {
    return  (
      <div>
       <span> Consumed: {this.state.instant.consumption} Watts </span>
       <span> Produced:{this.state.instant.generation} Watts </span>
      </div>
    );
  }
}

export default EnergyDisplay;