import { get } from '@expressive/react';
import { cmd, Editor, editor, jsx, onUpdate, readOnly } from 'codemirror/Editor';

import { Document } from './Document';
import { Main } from './Main';

export class InputEditor extends Editor {
  doc = get(Document);
  main = get(Main);

  onReady(){
    return this.doc.get(current => {
      this.text = current.input;
    })
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
        doc.input = this.text;
        doc.stale = true;
      })
    ];
  }
}

export class OutputView extends Editor {
  doc = get(Document);
  
  onReady(){
    return this.doc.get(current => {
      this.text = current.output_jsx;
    });
  }

  extends(){
    return [
      jsx,
      readOnly
    ];
  }
}