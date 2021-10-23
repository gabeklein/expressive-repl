import Model, { from, parent, ref, use } from '@expressive/mvc';

import { build, transform } from '../transform';
import { extractComponent } from './evaluate';

enum Layout {
  Compact = "compact",
  Columns = "fill",
  CodeOnly = "code",
  PreviewOnly = "view"
}

export class REPL extends Model {
  document = use(Document, doc => {
    doc.source = localStorage.getItem("REPL:file");
  });

  Render = from(this.generatePreview);

  layout = Layout.Compact;
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
      if(output_js)
        return extractComponent(output_js);
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
      this.error("Error while compiling module.");
      console.error(error)
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