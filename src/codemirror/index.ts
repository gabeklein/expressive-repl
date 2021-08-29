import './editor.css';

import Model, { on, parent, use } from '@expressive/mvc';

import { compile, runtime } from '../transform';
import { editor, jsx, lines, onKey, onUpdate, readOnly } from './config';
import Editor from './editor';

class OutputView extends Editor {
  plugin = [
    lines,
    jsx,
    readOnly
  ];
}

class InputEditor extends Editor {
  parent = parent(CodeMirror, true);

  plugin = [
    lines,
    jsx,
    editor,
    onUpdate(() => {
      this.parent.stale = true;
    }),
    onKey("Meta-s", () => {
      this.parent.compile();
    })
  ]
}

export default class CodeMirror extends Model {
  input = use(InputEditor);
  output = use(OutputView);

  output_js = "";
  output_jsx = on("", code => {
    this.output.setText(code);
  });

  stale = true;
  options = {
    output: "jsx",
    printStyle: "pretty"
  };

  didMount(){
    const example = localStorage.getItem("REPL:file");
    (window as any).REPL = this;
    this.input.setText(example);
    this.compile();
  }

  compile = () => {
    const from = this.input.getText();
    let output: string;
    let code: string;

    localStorage.setItem("REPL:file", from);
    
    try {
      output = compile(from, this.options);
      code = runtime(from);
    }
    catch(err){
      debugger;
    }

    this.output_jsx = output;
    this.output_js = code;
    this.stale = false;
  }
}