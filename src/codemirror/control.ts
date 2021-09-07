import Model, { on } from '@expressive/mvc';

import { build, transform } from '../transform';

type Layout = "compact" | "fill" | "code" | "view"

export class REPL extends Model {
  layout: Layout = "compact";
  fontSize = 15;
  stale = false;
  options = {
    output: "jsx",
    printStyle: "pretty"
  };

  input_jsx = on("", this.compile);
  output_jsx = "";
  output_js = "";

  didCreate(){
    (window as any).REPL = this;
  }

  didMount(){
    this.input_jsx = localStorage.getItem("REPL:file");
  }

  compile(from: string){
    let output: string;
    let code: string;
    
    try {
      code = build(from);
      output = transform(from, this.options);
      localStorage.setItem("REPL:file", from);
    }
    catch(err){
      debugger;
    }

    this.output_jsx = output;
    this.output_js = code;
    this.stale = false;
  }
}