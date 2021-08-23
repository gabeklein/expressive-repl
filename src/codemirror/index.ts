import { basicSetup } from "@codemirror/basic-setup";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import Model, { ref } from '@expressive/mvc';

// import { compile } from '../transform';

export default class CodeMirror extends Model {
  inputEditor: EditorState;
  outputEditor: EditorState;

  inputWindow = ref(this.setupInputWindow);
  outputWindow = ref(this.setupOutputWindow);

  stale = false;

  setupOutputWindow(parent: HTMLElement){
    const view = createView(parent);

    return () => view.destroy();
  }

  setupInputWindow(parent: HTMLElement){
    const view = createView(parent);
    
    // instance.onDidChangeModelContent(() => this.stale = true);
    // instance.addCommand(CONTROL_S, this.recompile);

    return () => view.destroy();
  }

  recompile = () => {
    // const source = this.inputEditor.getValue();
    // const result = compile(source, {
    //   output: "jsx",
    //   printStyle: "pretty"
    // });
    
    // this.outputEditor.setValue(result);
    // this.stale = false;
  }
}

function createView(parent: HTMLElement){
  const state = EditorState.create({
    doc: "",
    extensions: [
      basicSetup,
      javascript()
    ]
  });

  return new EditorView({ state, parent });
}