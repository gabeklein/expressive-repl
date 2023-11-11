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
        doc.build(this.text);
      }),
      onUpdate(() => {
        doc.stale = true;
      })
    ];
  }
}

export class OutputJSX extends Editor {
  text = get(Document, ({ output_css, output_jsx }) => {
    if(output_css){
      const format = output_css.replace(/^|\t/g, "  ").replace(/\n/g, "\n  ");

      output_jsx += `\n\n/* ~~~~~~~ CSS ~~~~~~~ */`;
      output_jsx += `\n\n<style>\n${format}\n</style>`;
    }
    
    return output_jsx;
  });

  extends(){
    return [
      jsx,
      readOnly
    ];
  }
}