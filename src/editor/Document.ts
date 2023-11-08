import Model, { get } from '@expressive/react';

import { Main } from './Main';
import { prettify, transform } from './transform';

const DEFAULT_CODE =
`export const Hi = () => {
  color: red;

  <this>Hello World!</this>
}`

export class Document extends Model {
  main = get(Main);

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