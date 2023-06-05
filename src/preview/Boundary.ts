import React, { Component } from "react";

interface Props {
  onError: (error: Error, info: any) => void;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class Boundary extends Component<Props, State> {
  static getDerivedStateFromError = () => ({ hasError: true });

  public componentDidCatch = this.props.onError;

  render(){
    return this.state?.hasError ? null : this.props.children;
  }
}

export default Boundary;