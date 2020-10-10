import { ref, Singleton } from 'deep-state';

import { compile } from './compiler';

export class REPL extends Singleton { 
  source = "const Hello = () => 'Hello World'";
  output = "";
  fontSize = 12;
  err = "";

  sourceContainer = ref(elem => {
    const handle = this.keyPress;
    elem.addEventListener("keydown", handle);
    () => elem.removeEventListener("keydown", handle);
  });

  keyPress = (e: KeyboardEvent) => {
    const { metaKey, code, key } = e;

    if(key == "Meta" || !metaKey)
      return;

    let prevent = true;

    switch(key){
      case "s":
        this.tryToCompile();
      break;

      case "=":
        this.fontSize++;
      break;

      case "-":
        this.fontSize--;
      break;
      
      default:
        prevent = false;
    }

    if(prevent)
      e.preventDefault();
  }

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