import React, { Component, Fragment, createElement } from 'react';

import Control from './Control';
import { Consumer } from '@expressive/react';
import { Document } from 'editor/Document';
import { renderFactory } from './evaluate';

const Preview = () => {
  const { key, error, onError } = Control.use();

  flex: 1;
  flexAlign: center;
  border: dashed, 2, 0xccc;
  radius: 8;
  position: relative;
  overflow: hidden;

  if(error)
    <Issue>{error}</Issue>
  else
    <Boundary key={key} onError={onError}>
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
    </Boundary>
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

class Boundary extends Component {
  componentDidCatch = this.props.onError;

  render(){
    return (this.state || {}).hasError
      ? null : this.props.children;
  };

  static getDerivedStateFromError(){
    return { hasError: true };
  }
}

export default Preview;