import { get } from '@expressive/react';
import { Editor, editor, jsx, metaKey, onUpdate } from 'codemirror/Editor';

import { Document } from './Document';
import { Main } from './Main';

export class InputEditor extends Editor {
  main = get(Main);
  doc = get(Document);

  extends = [
    jsx,
    editor,
    metaKey("=", () => {
      this.main.fontSize++;
    }),
    metaKey("-", () => {
      this.main.fontSize--;
    }),
    metaKey("s", () => {
      this.doc.source = this.text;
    }),
    onUpdate(() => {
      this.doc.stale = true;
    })
  ];

  ready(){
    this.text = this.doc.source;

    return this.main.get("fontSize", () => {
      this.view.requestMeasure();
    });
  }
}

