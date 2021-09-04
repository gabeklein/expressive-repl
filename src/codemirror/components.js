import './editor-light.css';
import './editor.css';

import { Component } from 'react';

import { evaluate } from '../transform';
import { REPL } from './control';

const Editor = ({ font, stale }) => do {
  className = stale && "cm-stale";

  forward: ref, className;
  fontSize: `${font}px`;
  overflow: hidden;
  margin: 3;
}

export const EditInput = () => do {
  const { input, fontSize } = REPL.tap();

  <Editor ref={input.element} font={fontSize} />
}

export const MockOutput = () => do {
  const { output, stale, fontSize } = REPL.tap();

  <Editor ref={output.element} stale={stale} font={fontSize} />
}

export const LiveResult = () => do {
  const { output_js } = REPL.tap();

  <ExampleBoundary code={output_js} />
}

class ExampleBoundary extends Component {
  state = {};

  static getDerivedStateFromError(error){
    console.error(error);

    return {
      error: "Something went wrong while rendering."
    };
  }

  static getDerivedStateFromProps(props, state){
    let { code } = props;
    let component;
    let message;

    if(!code || state.code == code)
      return null;

    try {
      const module = evaluate(code);
      component = Object.values(module)[0];
  
      if(typeof component !== "function")
        component = undefined;
    }
    catch(error){
      console.error(error);
      message = "Error while evaluating module.";
    }

    return {
      code,
      component,
      error: message
    }
  }

  render(){
    const { error, component: Preview } = this.state;

    return do {
      flex: 1;
      flexAlign: center;
      border: dashed, 2, 0xccc;
      margin: 3;
      radius: 8;
      position: relative;
      
      issue: {
        color: 0xd47878;
        fontSize: 0.7, em;
      }

      if(error)
        <issue>{error}</issue>;
      else if(!Preview)
        <issue>Waiting for exports...</issue>
      else
        <Preview />
    }
  }
}