import { get } from '@expressive/react';

import { Editor, editor, jsx, jsxEditor, metaKey, onUpdate } from '../codemirror/Editor';
import { Main } from './Main';
import { Document } from './Document';

export class InputEditor extends Editor {
  main = get(Main);
  doc = get(Document);

  extends = [
    jsx,
    jsxEditor,
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

