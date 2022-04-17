import Model, { from, parent } from '@expressive/mvc';

import { transform } from '../transform';
import { REPL } from './control';

const DEFAULT_CODE =
`export const Hi = () => {
  <this>Hello World!</this>
}`

export class Document extends Model {
  parent = parent(REPL);
  source = "";

  output_jsx = from(() => this.transform);

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
}