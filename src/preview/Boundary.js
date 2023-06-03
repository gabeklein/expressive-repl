import { Component } from "react";

class Boundary extends Component {
  state = {
    hasError: false,
    error: { message: '', stack: '' },
    info: { componentStack: '' }
  };

  static getDerivedStateFromError = error => {
    return { hasError: true };
  };

  // componentDidCatch = (error, info) => {
  //   debugger;
  //   this.setState({ error, info, hasError: true });
  // };

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;

    if(hasError)
      <div>There was an error</div>
    else
      <this>{children}</this>

    // return hasError
    //   ? <div>There was error or something.</div>
    //   : children;
  }
}

export default Boundary;