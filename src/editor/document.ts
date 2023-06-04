import Model, { get, set } from '@expressive/react';

import { transform } from './transform';
import { REPL } from './REPL';

const DEFAULT_CODE =
`export const Hi = () => {
  <this>Hello World!</this>
}`

export class Document extends Model {
  parent = get(REPL);

  source = set(() => {
    const saved = localStorage.getItem("REPL:file");
    return saved || DEFAULT_CODE;
  });

  output_jsx = get(() => this.transform);

  stale = false;
  error = "";

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
      // localStorage.setItem("REPL:file", source);
    }
  }
}