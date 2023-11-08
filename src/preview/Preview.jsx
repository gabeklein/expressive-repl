import React, { Component, Fragment, createElement } from 'react';

import Control from './Control';
import { Consumer } from '@expressive/react';
import { Document } from 'editor/Document';
import { renderFactory } from './evaluate';

const Preview = () => {
  const {
    error,
    key,
    onError
  } = Control.use();

  flex: 1;
  flexAlign: center;
  border: dashed, 2, 0xccc;
  radius: 8;
  position: relative;
  overflow: hidden;

  if(error)
    <Issue>{error}</Issue>
  else
    <Sandbox key={key} onError={onError} />
}

const Waiting = () => {
  color: 0xd47878;
  fontSize: 0.7, em;

  <this>Waiting for exports...</this>
}

const Issue = ({ children }) => {
  color: 0xd47878;
  fontSize: 0.7, em;

  <this>{children}</this>

}

class Sandbox extends Component {
  static getDerivedStateFromError(){
    return { hasError: true };
  }

  componentDidCatch = this.props.onError;

  render(){
    if(this.state && this.state.hasError)
      return null;

    return (
      <Consumer for={Document}>
        {({ output_jsx, output_css }) => {
          const Component = renderFactory(output_jsx);

          if(!Component)
            return <Waiting />;

          return (
            <Fragment>
              <style>{output_css}</style>
              <Component />
            </Fragment>
          );
        }}
      </Consumer>
    )
  };
}

export default Preview;