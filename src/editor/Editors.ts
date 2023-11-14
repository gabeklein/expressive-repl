import { get } from '@expressive/react';
import { CIRCULAR, cmd, code, Editor, editor, jsx, jsxMixed, onUpdate, readOnly } from 'codemirror/Editor';

import { Document } from './Document';
import { Main } from './Main';

export class InputEditor extends Editor {
  doc = get(Document);
  main = get(Main);

  constructor(){
    super();
    this.get($ => {
      this.text = $.doc.input;
    })
  }

  extends(){
    const { main, doc } = this;

    return [
      code(),
      jsx(),
      editor(),
      cmd("=", () => {
        main.fontSize++;
      }),
      cmd("-", () => {
        main.fontSize--;
      }),
      cmd("s", () => {
        doc.build(this.text);
      }),
      onUpdate((update) => {
        if(!update.docChanged)
          return;

        doc.stale = true;
        this.text = update.state.doc.toString();
        this.set(CIRCULAR);
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
  })

  extends(){
    return [
      code(),
      jsxMixed(),
      readOnly()
    ];
  }
}