import { get } from '@expressive/react';
import { Editor, jsx, readOnly } from 'codemirror/Editor';

import { Document } from './Document';
import { Main } from './Main';
import { transform } from './transform';

export class OutputView extends Editor {
  main = get(Main);
  doc = get(Document);

  extends(){
    return [jsx, readOnly];
  }

  build(source: string){
    const { document, options } = this.main;

    try {
      this.text = transform(source, options);
    }
    catch(error){
      console.error(error);
      document.error = "Error while compiling module.";
    }
    finally {
      document.stale = false;
      // localStorage.setItem("REPL:file", source);
    }
  }
  
  ready(){
    return this.doc.get(current => {
      this.text = current.output_js;
    });
  }
}
