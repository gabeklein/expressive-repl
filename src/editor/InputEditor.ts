import { get } from '@expressive/react';
import { Editor, editor, jsx, cmd, onUpdate } from 'codemirror/Editor';

import { Document } from './Document';
import { Main } from './Main';

export class InputEditor extends Editor {
  main = get(Main);
  doc = get(Document);

  fontSize = get(Main, x => x.fontSize);

  extends = [
    jsx,
    editor,
    cmd("=", () => {
      this.main.fontSize++;
    }),
    cmd("-", () => {
      this.main.fontSize--;
    }),
    cmd("s", () => {
      this.doc.source = this.text;
    }),
    onUpdate(() => {
      this.doc.stale = true;
    })
  ];

  ready(){
    this.text = this.doc.source;
  }
}

