import { Component } from 'react';

import { evaluate } from '../transform';
import { REPL } from './control';
import { InputEditor, OutputView } from '../editor/editor';

const Editor = ({ font, stale }) => do {
  className = stale && "cm-stale";

  forward: ref, className;
  fontSize: `${font}px`;
  overflow: hidden;
  margin: 3;
}

export const EditInput = () => do {
  const { element, parent } = InputEditor.use();

  <Editor ref={element} font={parent.fontSize} />
}

export const MockOutput = () => do {
  const { element, parent } = OutputView.use();
  const { stale, fontSize } = parent;

  <Editor ref={element} font={fontSize} stale={stale} />
}

export const LiveResult = () => do {
  const { document, Render } = REPL.tap();
  const error = document.error;
  const message = error.current;

  flex: 1;
  flexAlign: center;
  border: dashed, 2, 0xccc;
  margin: 3;
  radius: 8;
  position: relative;
  overflow: hidden;
  
  issue: {
    color: 0xd47878;
    fontSize: 0.7, em;
  }

  if(message)
    <issue>{message}</issue>
  else if(!Render)
    <issue>Waiting for exports...</issue>
  else
    <Boundary onError={error}>
      <Render />
    </Boundary>
}

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