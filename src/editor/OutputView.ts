import { get } from '@expressive/react';

import { Editor, jsx, readOnly } from '../codemirror/Editor';
import { Main } from './Main';
import { transform } from './transform';

export class OutputView extends Editor {
  extends = [jsx, readOnly];

  main = get(Main);

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
    const main = this.main;
    const doc = main.document;

    const release = doc.get(x => this.build(x.source));
    const release2 = main.get("fontSize", () => {
      this.view.requestMeasure();
    });

    return () => {
      release();
      release2();
    }
  }
}
