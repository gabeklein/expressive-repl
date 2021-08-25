import Editor from './codemirror';

import SaveOverlay from "./components/SaveOverlay";

import { forwardRef, useState } from "react";
import "./styles.css"

const App = () => do {
  const { inputWindow, outputWindow, stale, compile } = Editor.use();
  
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
      <portal ref={inputWindow} />
    </column>
    <column>
      <portal ref={outputWindow} />
      <SaveOverlay active={stale} onClick={compile} />
    </column>
  </this>
}

export default App;