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

  Render = from(() => this.generatePreview);

  layout = Layout.Columns;
  fontSize = 15;

  options = {
    output: "jsx",
    printStyle: "pretty"
  }

  didCreate(){
    (window as any).REPL = this;
  }

  generatePreview(){
    const module = this.document.output;
    const exported = Object.values(module)[0];

    if(exported)
      return exported as React.FC<{}>;
  }
}