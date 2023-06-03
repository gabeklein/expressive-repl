import Model, { use } from '@expressive/react';

import { Document } from './document';

declare namespace REPL {
  type Layout = "compact" | "fill" | "code" | "view";
}

class REPL extends Model {
  document = use(Document);

  constructor(){
    super();
    (window as any).REPL = this;
  }

  layout: REPL.Layout = "compact";
  fontSize = 15;
  options = {
    output: "jsx",
    printStyle: "pretty"
  }
}

export { REPL }