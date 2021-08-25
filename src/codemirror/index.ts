import './styles.css';

import Model, { parent, use } from '@expressive/mvc';

import { compile } from '../transform';
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

  stale = true;
  options = {
    output: "jsx",
    printStyle: "pretty"
  };

  didMount(){
    const example = require("./example");
    (window as any).REPL = this;
    this.input.setText(example);
  }

  compile(){
    const from = this.input.getText();
    let output: string;
    
    try {
      output = compile(from, this.options);
    }
    catch(err){
      debugger;
    }

    this.output.setText(output);
    this.stale = false;
  }
}