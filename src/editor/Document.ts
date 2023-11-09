import Model, { get } from '@expressive/react';

import { Main } from './Main';
import { evaluate, hash, prettify, transform } from './transform';

const DEFAULT_CODE =
`export const Hi = () => {
  color: red;

  <this>Hello World!</this>
}`

export class Document extends Model {
  main = get(Main);
  
  key = get(this, $ => hash($.input));
  Preview = get(this, $ => evaluate($.output_jsx));

  stale = false;
  error = "";

  input = "";

  output_jsx = "";
  output_css = "";

  constructor(){
    super(() => {
      this.input = localStorage.getItem("REPL:file") || DEFAULT_CODE;
      this.build();
    });
  }

  onError = (error: Error) => {
    this.error = error.toString();
    console.error(error);
  }

  build(){
    try {
      const { jsx, css } = transform(this.input);

      this.output_jsx = prettify(jsx);
      this.output_css = css;
      this.stale = false;
    }
    catch(error){
      console.error(error);
      this.error = "Error while compiling module.";
    }
  }
}