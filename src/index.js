import './styles.css';

import { forwardRef, useState } from 'react';

import Editor from './codemirror';
import SaveOverlay from './components/SaveOverlay';

const App = () => do {
  const { input, output, stale, compile } = Editor.use();
  
  height: "100vh";
  gridColumns: "50%", "50%";
  gridRows: "100%";
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

  <this>
    <column>
      <portal ref={input.element} />
    </column>
    <column>
      <portal ref={output.element} />
      <SaveOverlay active={stale} onClick={compile} />
    </column>
  </this>
}

export default App;