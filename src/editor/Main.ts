import Model, { use } from '@expressive/react';

import { Document } from './Document';

declare namespace Main {
  type Layout = "compact" | "fill" | "code" | "view";
}

class Main extends Model {
  document = use(Document);

  constructor(){
    super();
    (window as any).editor = this;
  }

  fontSize = 15;
  layout: Main.Layout = "fill";
  options = {
    output: "jsx",
    printStyle: "pretty"
  }
}

export { Main }