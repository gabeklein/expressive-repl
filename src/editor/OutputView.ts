import { get } from '@expressive/react';

import { Editor, jsx, readOnly } from '../codemirror/Editor';
import { Main } from './Main';
import { transform } from './transform';

export class OutputView extends Editor {
  extends = [jsx, readOnly];

  main = get(Main);
  
  ready(){
    const main = this.main;
    const doc = main.document;

    const release = doc.get(({ source }) => {
      try {
        this.text = transform(source, main.options);
      }
      catch(error){
        console.error(error);
        doc.error = "Error while compiling module.";
      }
      finally {
        doc.stale = false;
        // localStorage.setItem("REPL:file", source);
      }
    });

    const release2 = main.get("fontSize", () => {
      this.view.requestMeasure();
    });

    return () => {
      release();
      release2();
    }
  }
}
