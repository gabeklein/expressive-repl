import { Component } from 'react';
import { evaluate } from '../transform';

import { REPL } from "./control";

portal: {
  overflow: hidden;
  margin: 3;
  radius: 8;
  background: 0xF5F5F5;
  border: 0xddd;
  font: 14;
  padding: 0, 0, 0, 5;
}

export const EditInput = () => do {
  const { input } = REPL.tap();

  use: portal;

  <this ref={input.element} />
}

export const MockOutput = () => do {
  const { output, stale, compile } = REPL.tap();

  use: portal;

  <this ref={output.element} className={stale && "cm-stale"} />
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