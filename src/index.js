import './styles.css';

import { forwardRef, useMemo, useState } from 'react';

import Editor from './codemirror';
import SaveOverlay from './components/SaveOverlay';
import { evalModule } from './transform';

const App = () => do {
  const {
    input,
    output,
    code,
    stale,
    compile,
    output_js
  } = Editor.use();
  
  height: "100vh";
  gridRows: "50%", "50%";
  gridColumns: "100%";
  fontFamily: "Lato";
  padding: 0, 5;

  portal: {
    position: relative;
    overflow: hidden;
    border: 0xddd;
    padding: 20;
  }

  column: {
    gridColumns: "1fr";
    position: relative;
  }

  OutputRenderer: {
    border: 0xddd;
  }

  row: {
    gridColumns: "50%", "50%";
    gridRows: "100%";
  }

  <this>
    <row>
      <portal ref={input.element} />
      <column>
        <portal ref={output.element} />
        <SaveOverlay active={stale} onClick={compile} />
      </column>
    </row>
    <row>
      <portal ref={code.element} />
      <OutputRenderer code={output_js} />
    </row>
  </this>
}

const OutputRenderer = ({ code }) => do {
  const Default = useMemo(() => evalModule(code).default, [code])

  forward: className;
  flexAlign: center;

  if(Default)
    <Default />
}

export default App;