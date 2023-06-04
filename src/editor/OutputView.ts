import { jsx, readOnly } from '../codemirror';
import { Editor } from './InputEditor';
import { transform } from './transform';

export class OutputView extends Editor {
  extensions = [jsx, readOnly];
  
  ready(){
    const main = this.main;
    const doc = this.document;

    return doc.get(current => {
      try {
        this.text = transform(current.source, main.options);
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
  }
}
