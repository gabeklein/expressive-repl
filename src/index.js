import Controller from "deep-state";
import { REPL } from "./control";
import { EditSource, Output } from "./editor";

import "./styles.css"

REPL.create();

export default () => do {
  Editor()
}

const Editor = () => do {
  const {
    source,
    set,
    tryToCompile,
    sourceContainer
  } = REPL.tap();

  padding: 20, 30;
  bg: white;
  shadow: 0x06, 5, 2;
  border: 0x1;
  margin: 10;
  radius: 20;

  !button `try to compile!`, do {
    onClick = tryToCompile;
  }

  container, do {
    gridColumns: 1.0, 1.0;
    padding: 24, 30;
    radius: 10;
    bg: 0x07;
    font: 16;
    border: 0x1;

    EditSource(
      value = source,
      ref = sourceContainer,
      onChanged = v => set.source = v
    );
    Output();
  }
}