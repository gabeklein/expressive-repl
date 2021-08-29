import { Component } from 'react';

import REPL from '../codemirror';
import { useEvalComponent } from '../transform';

portal: {
  position: relative;
  overflow: hidden;
  margin: 8;
  radius: 8;
  background: 0xF5F5F5;
  border: 0xddd;
  font: 14;
  padding: 20, 20, 20, 12;
  flex: 1;
}

export const EditInput = () => do {
  const { input } = REPL.tap();
  
  <portal ref={input.element} />
}

export const MockOutput = () => do {
  const { output, stale, compile } = REPL.tap();

  <portal ref={output.element} className={stale && "cm-stale"} />
}

export const LiveResult = () => do {
  const { output_js } = REPL.tap();
  const Preview = useEvalComponent(output_js);

  <ExampleBoundary component={Preview} key={output_js} />
}

class ExampleBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error){
    return { hasError: error };
  }

  componentDidCatch(error){
    console.error(error);
  }

  render(){
    const Preview = this.props.component;

    return do {
      flex: 1;
      flexAlign: center;
      border: dashed, 2, 0xccc;
      margin: 8;
      radius: 8;
      
      err: {
        color: 0xd47878;
        fontSize: 0.7, em;
      }

      if(this.state.hasError)
        <err>Something went wrong while rendering.</err>;
      else if(Preview instanceof Error)
        <err>Error while evaluating module.</err>
      else if(!Preview)
        <err>Forget to export something?</err>
      else
        <Preview />
    }
  }
}