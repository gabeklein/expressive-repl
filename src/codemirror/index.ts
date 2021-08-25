import './styles.css';

import { EditorView, keymap, ViewUpdate } from '@codemirror/view';
import Model, { on, ref } from '@expressive/mvc';

import { compile } from '../transform';
import { createEditor, createView, keyBind } from './config';

export default class CodeMirror extends Model {
  inputEditor: EditorView;
  outputEditor: EditorView;

  stale = true;
  compilerOptions = {
    output: "jsx",
    printStyle: "pretty"
  };

  didCreate(){
    (window as any).REPL = this;
  }

  compile = () => {
    const source = this.inputEditor.state.doc.toString();
    let output: string;
    
    try {
      output = compile(source, this.compilerOptions);
    }
    catch(err){
      debugger;
    }

    this.outputText = output;
    this.stale = false;
  }

  inputWindow = ref(e => {
    const onUpdate = (update: ViewUpdate) => {
      if(update.docChanged)
        this.stale = true;
    }

    const detectSave = keyBind({
      key: "Meta-s",
      run: () => {
        this.compile();
        return true;
      }
    })

    const view = createEditor(e, [
      EditorView.updateListener.of(onUpdate),
      detectSave
    ]);

    this.inputEditor = view;

    view.dispatch({
      changes: {
        from: 0,
        insert: require("./example")
      }
    })

    return () => view.destroy();
  });

  outputWindow = ref(e => {
    const view = this.outputEditor = createView(e);
    return () => view.destroy();
  });

  sourceText = on("", next => {
    this.outputText = compile(next, this.compilerOptions);
    this.stale = false;
  });

  outputText = on("", next => {
    const view = this.outputEditor;
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: next
      }
    })
  });
}