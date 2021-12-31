import Model, { from, parent } from '@expressive/mvc';

import { build, transform } from '../transform';
import { evaluate } from '../transform/evaluate';
import { REPL } from './control';

const DEFAULT_CODE =
`export const Hi = () => do {
  <this>Hello World!</this>
}`

export class Document extends Model {
  parent = parent(REPL);
  source = "";

  output_jsx = from(() => this.transform);
  output_js = from(() => this.build);
  output = from(() => this.eval);

  error = "";
  stale = false;

  didCreate(){
    this.source =
      localStorage.getItem("REPL:file") || DEFAULT_CODE;
  }

  transform(){
    const { source, parent } = this;

    try {
      return transform(source, parent.options);
    }
    catch(error){
      console.error(error);
      this.error = "Error while compiling module.";
    }
    finally {
      this.stale = false;
      localStorage.setItem("REPL:file", source);
    }
  }

  build(){
    try {
      return build(this.source);
    }
    catch(error){
      this.error = "Error while building preview.";
      console.error(error)
    }
  }

  eval(){
    if(!this.output_js)
      return {};

    try {
      return evaluate(this.output_js);
    }
    catch(error){
      this.error = "Error while building preview.";
      console.error(error);
      return {};
    }
  }
}