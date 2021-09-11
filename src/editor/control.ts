import Model, { on, parent, ref, use } from '@expressive/mvc';
import React from 'react';

import { build, evaluate, transform } from '../transform';

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

  get Render(){
    const { output_js, error } = this.document;

    if(!output_js)
      return;

    try {
      const module = evaluate(output_js);
      let FC = Object.values(module)[0];

      if(typeof FC !== "function")
        FC = undefined;

      return FC as React.FC<{}>;
    }
    catch(err){
      console.error(err);
      error("Error while evaluating module.");
    }
  }
}

class Document extends Model {
  parent = parent(REPL);
  source = on("", this.compile);
  output_jsx = "";
  output_js = "";

  error = ref<string>();
  stale = false;

  compile(from: string){
    try {
      this.output_js = build(from);
      this.output_jsx = transform(from, this.parent.options);
      this.stale = false;
      localStorage.setItem("REPL:file", from);
    }
    catch(err){
      console.error(err)
      this.error("Error while compiling module.");
    }
  }
}