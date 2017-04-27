import { Component } from 'react';

export class Header extends Component{
  constructor(props){
    super(props);
    //this.state = initial state; //only place you can assign state
  }

  componentDidMount() {
    //update state with setState()
    // if synchronous updates required w/props, use pattern below
    // this.setState((prevState, props) => ({
    // state-to-be-updated: prevState.state-name + props.prop-name
    // }));

  }

  componentWillUnmount() {

  }
  render() {
    return (
      <div> this.state </div>
      );
  }
}