import Model, { get } from '@expressive/react';

import { Main } from './Main';
import { transformPretty } from './transform';

const DEFAULT_CODE =
`export const Hi = () => {
  <this>Hello World!</this>
}`

export class Document extends Model {
  main = get(Main);

  stale = false;
  error = "";

  input = "";

  output_js = "";
  output_css = "";

  constructor(){
    super(() => {
      this.input = localStorage.getItem("REPL:file") || DEFAULT_CODE;
      this.build();
    });
  }

  build(){
    try {
      const { jsx, css } = transformPretty(this.input);

      this.output_js = jsx;
      this.output_css = css;
      this.stale = false;
    }
    catch(error){
      console.error(error);
      this.error = "Error while compiling module.";
    }
  }
}