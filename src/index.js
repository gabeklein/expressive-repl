import Controller from "deep-state";
import { REPL } from "./control";
import { EditSource, Output } from "./editor";

import "./styles.css"

if(!REPL.current)
  REPL.create();

export default () => do {
  height: "100vh";
  fontFamily: Lato;
  gridRows: min, 1.0, min;

  "Expressive React REPL", do {
    font: 20;
    flexAlign: center;
    margin: 30, 0, 10;
  };

  container, do {
    Editor()
  }

  footer, do {
    textAlign: center;
    marginB: 20;
    font: 15;
    
    "MIT - Gabe Klein"
  }
}

const Editor = () => do {
  const {
    source,
    set,
    keyboardEvents
  } = REPL.sub();

  maxWidth: 1600;
  height: fill;
  margin: auto;
  padding: 20;
  boxSizing: border-box;
  gridRows: 0, 1.0;
  gridColumns: 1.0, 1.0;
  gridGap: "14px";
  font: 16;

  editor: {
    padding: 40, 30;
    position: relative;
    shadow: 0x06, 5, 2;
    radius: 10;
    bg: 0xf7f7f7;
    border: 0x1;
  }

  header, do {
    gridColumn: 1-3;
    position: relative;
    
    after: {
      absolute: fill-bottom;
      height: 2;
      bg: 0x06;
      radius: 4;
    }
  }

  editor >>
    EditSource(
      value = source,
      ref = keyboardEvents.ref,
      onChanged = v => set.source = v
    );

  editor, do {
    SaveOverlay;

    Output();
  }
}

const SaveOverlay = () => do {
  const { stale, set, tryToCompile } = REPL.sub();

  if(!stale){
    pointerEvents: none;
    opacity: 0;
  }

  transition: "opacity 0.1s ease-in";
  bg: 0xf7f7f7bb;
  radius: 10;
  absolute: fill;
  flexAlign: center;
  zIndex: 20;
  shadow: inset, 0x3;
  color: 0x2181BD;

  code: {
    display: inline-block;
    verticalAlign: middle;
    background: 0x1;
    padding: ".1em", ".4em";
    margin: 0, "0.2em"
    radius: 5;
    fontSize: "1.4em";
    color: 0x999;
  }
  
  <div propmt>
    Press or click
    <code onClick={tryToCompile}>⌘-S</code>
    to rebuild
  </div>
}