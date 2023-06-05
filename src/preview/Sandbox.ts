import React, { Component, createElement } from "react";

interface Props {
  component: React.FunctionComponent<any>;
  onError: (error: Error, info: any) => void;
  children: React.ReactNode;
}

class Sandbox extends Component<Props, { hasError: boolean }> {
  static getDerivedStateFromError = () => ({ hasError: true });

  public componentDidCatch = this.props.onError;

  render = () => this.state?.hasError
    ? null : createElement(this.props.component, {});
}

export default Sandbox;