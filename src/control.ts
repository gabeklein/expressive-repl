import Controller, { Singleton, use } from 'deep-state';

import { compile } from './compiler';
import { Shortcuts } from './shortcuts';

export class REPL extends Singleton { 
  source = "const Hello = () => 'Hello World'";
  output = "";
  fontSize = 16;
  err = "";

  keyboardEvents = use(Shortcuts, kbe => {
    kbe.on<any>("save", this.tryToCompile);
    kbe.on<any>("increaseFont", () => this.fontSize++);
    kbe.on<any>("decreaseFont", () => this.fontSize--);
  });

  tryToCompile = () => {
    try {
      this.output = this.compile();
      this.err = "";
    } catch (e) {
      console.error(e.message)
      this.err = e.message;
      throw e;
    }
  }

  compile(){
    return compile(this.source, {
      output: "jsx",
      printStyle: "pretty",
      // styleMode: "compile",
      // useImport: false
    });
  }
}

