import Model, { on, parent, use } from '@expressive/mvc';

import { build, transform } from '../transform';
import { editor, jsx, jsxEditor, onKey, onUpdate, readOnly } from './config';
import Editor from './editor';

class OutputView extends Editor {
  plugin = [ jsx, readOnly ];
}

class InputEditor extends Editor {
  parent = parent(REPL, true);

  plugin = [
    jsx,
    jsxEditor,
    editor,
    onUpdate(() => this.parent.stale = true),
    onKey("Meta-s", () => this.parent.compile()),
    onKey("Meta-=", () => { this.parent.fontSize++ }),
    onKey("Meta--", () => { this.parent.fontSize-- })
  ]
}

type Layout = "compact" | "fill" | "code" | "view"

export class REPL extends Model {
  input = use(InputEditor);
  output = use(OutputView);

  layout: Layout = "compact";

  fontSize = on(15, () => {
    this.input.view.requestMeasure();
    this.output.view.requestMeasure();
  });

  output_js = "";
  output_jsx = on("", code => {
    this.output.setText(code);
  });

  stale = true;
  options = {
    output: "jsx",
    printStyle: "pretty"
  };

  didCreate(){
    (window as any).REPL = this;
  }

  didMount(){
    const example = localStorage.getItem("REPL:file");
    this.input.setText(example);
    this.compile();
  }

  compile = () => {
    const from = this.input.getText();
    let output: string;
    let code: string;

    localStorage.setItem("REPL:file", from);
    
    try {
      output = transform(from, this.options);
      code = build(from);
    }
    catch(err){
      debugger;
    }

    this.output_jsx = output;
    this.output_js = code;
    this.stale = false;
  }
}