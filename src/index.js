import './styles.css';

import { forwardRef, useMemo, useState } from 'react';

import Editor from './codemirror';
import SaveOverlay from './components/SaveOverlay';

App: {
  height: "100vh";
  display: flex;
  flexDirection: column;
  fontFamily: "Lato";
  padding: 0, 5;

  portal: {
    position: relative;
    overflow: hidden;
    border: 0xddd;
    padding: 20;
    flex: 1;
  }

  OutputRenderer: {
    border: 0xddd;
    flex: 1;
  }

  column: {
    display: flex;
    flexDirection: column;
    flex: 1;
  }

  row: {
    display: flex;
    flexDirection: row;
    flex: 1;
  }

  window: {
    flex: 1;
    flexAlign: center;
  }
}

const App = () => do {
  const { input, output, stale, compile, Preview } = Editor.use();

  <row>
    <portal ref={input.element} />
    <column>
      <portal ref={output.element}>
        <SaveOverlay active={stale} onClick={compile} />
      </portal>
      <window>
        <Preview />
      </window>
    </column>
  </row>
}

export default App;