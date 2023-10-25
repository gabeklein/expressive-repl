import Model, { get } from '@expressive/react';

import { Main } from './Main';
import { transform } from './transform';

const DEFAULT_CODE =
`export const Hi = () => {
  <this>Hello World!</this>
}`

export class Document extends Model {
  main = get(Main);

  stale = false;
  error = "";

  input_jsx = "";

  output_js = "";
  output_css = "";

  constructor(){
    super(() => {
      this.input_jsx = localStorage.getItem("REPL:file") || DEFAULT_CODE;
      this.build();
    });
  }

  build(){
    const { options } = this.main;

    try {
      let css = "";
      const js = transform(this.input_jsx, {
        ...options,
        output: "jsx",
        cssModule: false,
        printStyle: "pretty",
        extractCss: (text: string) => {
          css = text;
        }
      });

      this.output_js = js;
      this.output_css = css;
      this.stale = false;
    }
    catch(error){
      console.error(error);
      this.error = "Error while compiling module.";
    }
  }
}