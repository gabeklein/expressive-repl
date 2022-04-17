import { Component } from "react";

class Boundary extends Component {
  state = {};

  static getDerivedStateFromError(error){
    console.error(error);
    return {
      error: "Something went wrong while rendering."
    };
  }

  componentDidCatch(err){
    this.props.onError(err);
  }

  render(){
    return this.state.error || this.props.children;
  }
}

export default Boundary;