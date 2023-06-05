import Model, { use } from '@expressive/react';

import { Document } from './Document';

declare global {
  interface Window {
    editor: Main;
  }
}

declare namespace Main {
  type Layout = "compact" | "fill" | "code" | "view";
}

class Main extends Model {
  document = use(Document);

  constructor(){
    super();
    window.editor = this;
  }

  fontSize = 15;
  layout: Main.Layout = "compact";
  options = {
    output: "jsx",
    printStyle: "pretty"
  }
}

export { Main }