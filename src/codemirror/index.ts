import './styles.css';

import Model, { on, parent, use } from '@expressive/mvc';

import { compile, evalModule, runtime } from '../transform';
import { editor, jsx, keyBind, onUpdate, readOnly } from './config';
import Editor from './editor';

class OutputView extends Editor {
  plugin = [ jsx, readOnly ];
}

class InputEditor extends Editor {
  parent = parent(CodeMirror, true);

  plugin = [
    jsx,
    editor,
    onUpdate(() => {
      this.parent.stale = true;
    }),
    keyBind({
      key: "Meta-s",
      run: () => {
        this.parent.compile();
        return true;
      }
    })
  ]
}

export default class CodeMirror extends Model {
  input = use(InputEditor);
  output = use(OutputView);

  output_jsx = on("", code => {
    this.output.setText(code);
  });
  output_js = "";

  stale = true;
  options = {
    output: "jsx",
    printStyle: "pretty"
  };

  get Preview(){
    const module: any = evalModule(this.output_js);
    return module.default || (() => false);
  }

  didMount(){
    const example = require("./example");
    (window as any).REPL = this;
    this.input.setText(example);
  }

  compile = () => {
    const from = this.input.getText();
    let output: string;
    let code: string;
    
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