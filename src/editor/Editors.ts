import { get } from '@expressive/react';
import { cmd, Editor, editor, jsx, onUpdate, readOnly } from 'codemirror/Editor';

import { Document } from './Document';
import { Main } from './Main';

export class InputEditor extends Editor {
  main = get(Main);
  doc = get(Document);

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

  onReady(){
    return this.doc.get(current => {
      this.text = current.input_jsx;
    })
  }
}

export class OutputView extends Editor {
  doc = get(Document);

  extends(){
    return [
      jsx,
      readOnly
    ];
  }
  
  onReady(){
    return this.doc.get(current => {
      this.text = current.output_js;
    });
  }
}