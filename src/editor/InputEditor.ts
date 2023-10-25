import { get } from '@expressive/react';
import { cmd, Editor, editor, jsx, onUpdate } from 'codemirror/Editor';

import { Document } from './Document';
import { Main } from './Main';

export class InputEditor extends Editor {
  main = get(Main);
  doc = get(Document);

  onReady(){
    this.text = this.doc.input_jsx;
  }

  extends(){
    const { main, doc } = this;

    return [
      jsx,
      editor,
      cmd("=", () => {
        main.fontSize++;
      }),
      cmd("-", () => {
        main.fontSize--;
      }),
      cmd("s", () => {
        doc.build();
      }),
      onUpdate(() => {
        doc.input_jsx = this.text;
        doc.stale = true;
      })
    ];
  }
}

