import { get } from '@expressive/react';
import { Editor, editor, jsx, meta, onUpdate } from 'codemirror/Editor';

import { Document } from './Document';
import { Main } from './Main';

export class InputEditor extends Editor {
  main = get(Main);
  doc = get(Document);

  fontSize = get(Main, x => x.fontSize);

  extends = [
    jsx,
    editor,
    meta("=", () => {
      this.main.fontSize++;
    }),
    meta("-", () => {
      this.main.fontSize--;
    }),
    meta("s", () => {
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

