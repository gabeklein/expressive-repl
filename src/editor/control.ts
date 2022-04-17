import Model, { from, use } from '@expressive/mvc';

import { Document } from './document';

enum Layout {
  Compact = "compact",
  Columns = "fill",
  CodeOnly = "code",
  PreviewOnly = "view"
}

export class REPL extends Model {
  document = use(Document);

  layout = Layout.Columns;
  fontSize = 15;
  options = {
    output: "jsx",
    printStyle: "pretty"
  }

  didCreate(){
    (window as any).REPL = this;
  }
}