import Editor from './monaco';
import SaveOverlay from "./components/SaveOverlay";

import { forwardRef, useState } from "react";
import "./styles.css"

const App = () => do {
  const { inputWindow, outputWindow, stale } = Editor.use();
  
  window: {
    height: "100vh";
    gridColumns: "50%", "50%";
    gridRows: "100%"
    fontFamily: "Lato"
  }

  column: {
    gridColumns: "1fr";
    position: relative;
  }

  <window>
    <column>
      <Portal ref={inputWindow} />
    </column>
    <column>
      <Portal ref={outputWindow} />
      <SaveOverlay active={stale} />
    </column>
  </window>
}

const Portal = () => do {
  forward: ref;
  position: relative;
  margin: 10;
  overflow: hidden;
  radius: 5;

  <this />
}

export default App;