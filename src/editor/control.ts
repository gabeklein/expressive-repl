import Model, { from, on, parent, ref, use } from '@expressive/mvc';

import { build, transform } from '../transform';
import { extractComponent } from './evaluate';

enum Layout {
  Compact = "compact",
  Columns = "fill",
  CodeOnly = "code",
  PreviewOnly = "view"
}

export class REPL extends Model {
  document = use(Document);
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

  didMount(){
    this.document.source = localStorage.getItem("REPL:file");
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
  source = on("", this.compile);
  output_jsx = "";
  output_js = "";

  error = ref<string>();
  stale = false;

  compile(from: string){
    try {
      this.output_js = build(from);
      this.output_jsx = transform(from, this.parent.options);
      this.stale = false;
      localStorage.setItem("REPL:file", from);
    }
    catch(err){
      console.error(err)
      this.error("Error while compiling module.");
    }
  }
}