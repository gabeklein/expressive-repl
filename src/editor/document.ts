import Model, { get } from '@expressive/react';

import { transform } from '../transform';
import { REPL } from './control';

const DEFAULT_CODE =
`export const Hi = () => {
  <this>Hello World!</this>
}`

export class Document extends Model {
  parent = get(REPL);
  source = "";

  output_jsx = get(() => this.transform);

  error = "";
  stale = false;

  constructor(){
    super();
    this.get(() => {
      const saved = localStorage.getItem("REPL:file");
      this.source = saved || DEFAULT_CODE;
    })
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
      // localStorage.setItem("REPL:file", source);
    }
  }
}