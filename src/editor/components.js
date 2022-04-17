import { Component } from 'react';

import { evaluate } from '../transform';
import { REPL } from './control';
import { InputEditor, OutputView } from '../editor/editor';

const Editor = ({ font, stale }) => {
  className = stale && "cm-stale";

  forward: ref, className;
  fontSize: `${font}px`;
  overflow: hidden;
  margin: 3;

  <this />
}

export const EditInput = () => {
  const { element, parent } = InputEditor.use();

  <Editor ref={element} font={parent.fontSize} />
}

export const MockOutput = () => {
  const { element, parent } = OutputView.use();
  const { stale, fontSize } = parent;

  <Editor ref={element} font={fontSize} stale={stale} />
}

export const LiveResult = () => {
  const { document: doc, Render } = REPL.tap();

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

  if(doc.error)
    <issue>{doc.error}</issue>
  else if(!Render)
    <issue>Waiting for exports...</issue>
  else
    <Boundary onError={err => doc.error = err}>
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