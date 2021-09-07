import Model, { on, parent, use } from '@expressive/mvc';

import { build, transform } from '../transform';

type Layout = "compact" | "fill" | "code" | "view";

export class REPL extends Model {
  document = use(Document);
  layout: Layout = "compact";
  fontSize = 15;

  options = {
    output: "jsx",
    printStyle: "pretty"
  }

  didCreate(){
    (window as any).REPL = this;
  }

  didMount(){
    this.document.source = localStorage.getItem("REPL:file");
  }
}

class Document extends Model {
  parent = parent(REPL);
  source = on("", this.compile);
  output_jsx = "";
  output_js = "";

  stale = false;

  compile(from: string){
    let output: string;
    let code: string;
    
    try {
      code = build(from);
      output = transform(from, this.parent.options);
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