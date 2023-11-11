import { Document } from 'editor/Document';
import React, { Component, createElement, Fragment } from 'react';

export const Preview = () => {
  const {
    key,
    error,
    onError,
    Preview,
    output_css,
  } = Document.get();

  flex: 1;
  flexAlign: center;
  border: dashed, 2, 0xccc;
  radius: 8;
  position: relative;
  overflow: hidden;

  if(error)
    <Issue>{error}</Issue>
  else if(!Preview)
    <Issue>Waiting for exports...</Issue>
  else
    <Boundary key={key} onError={onError}>
      <Preview />
      <style>{output_css}</style>
    </Boundary>
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