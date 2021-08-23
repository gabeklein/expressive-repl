import Editor from './codemirror';

import SaveOverlay from "./components/SaveOverlay";

import { forwardRef, useState } from "react";
import "./styles.css"

const App = () => do {
  const { inputWindow, outputWindow, stale } = Editor.use();
  
  height: "100vh";
  gridColumns: "50%", "50%";
  gridRows: "100%";
  fontFamily: "Lato";

  portal: {
    position: relative;
    margin: 10;
    overflow: hidden;
    radius: 5;
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
      <SaveOverlay active={stale} />
    </column>
  </this>
}

export default App;