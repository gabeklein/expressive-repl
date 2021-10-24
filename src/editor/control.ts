import Model, { from, parent, ref, use } from '@expressive/mvc';

import { build, transform } from '../transform';
import { evaluate } from '../transform/evaluate';

enum Layout {
  Compact = "compact",
  Columns = "fill",
  CodeOnly = "code",
  PreviewOnly = "view"
}

const DEFAULT_CODE =
`export const Hi = () => do {
  <this>Hello World!</this>
}`

export class REPL extends Model {
  document = use(Document, doc => {
    doc.source = localStorage.getItem("REPL:file") || DEFAULT_CODE;
  });

  Render = from(this.generatePreview);

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
    const { output_js, error } = this.document;

    try {
      if(!output_js)
        return;

      const module = evaluate(output_js);
      const output = Object.values(module)[0];

      if(typeof output === "function")
        return output as React.FC<{}>;
    }
    catch(err){
      console.error(err);
      error("Error while evaluating module.");
    }
  }
}

class Document extends Model {
  parent = parent(REPL);
  source = "";

  output_jsx = from(this.transform);
  output_js = from(this.build);

  error = ref<string>();
  stale = false;

  transform(){
    const { source, parent } = this;

    try {
      return transform(source, parent.options);
    }
    catch(error){
      console.error(error);
      this.error("Error while compiling module.");
    }
    finally {
      this.stale = false;
      localStorage.setItem("REPL:file", source);
    }
  }

  build(){
    try {
      return build(this.source);
    }
    catch(error){
      this.error("Error while building preview.");
      console.error(error)
    }
  }
}