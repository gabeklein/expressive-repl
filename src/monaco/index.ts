import './language';

import Model, { ref } from '@expressive/mvc';

import { compile } from '../compiler';
import { createEditor, Editor, KeyCode, KeyMod } from './editor';

const CONTROL_S = KeyMod.CtrlCmd | KeyCode.KEY_S;

export default class MonacoREPL extends Model {
  inputEditor: Editor;
  inputWindow = ref(this.setupInputWindow);

  outputEditor: Editor;
  outputWindow = ref(this.setupOutputWindow);

  setupOutputWindow(e: HTMLElement){
    this.outputEditor = createEditor(e, {
      readOnly: true
    })
  }

  setupInputWindow(e: HTMLElement){
    const instance = this.inputEditor = createEditor(e);

    instance.onDidChangeModelContent(() => this.stale = true);
    instance.addCommand(CONTROL_S, this.recompile);
  }

  stale = false;

  recompile = () => {
    const source = this.inputEditor.getValue();
    const result = compile(source, {
      output: "jsx",
      printStyle: "pretty"
    });
    
    this.outputEditor.setValue(result);
    this.stale = false;
  }
}