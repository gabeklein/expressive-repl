import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { Model, ref, tap } from '@expressive/mvc';

import { editor, jsx, jsxEditor, onKey, onUpdate, readOnly } from './config';
import { REPL } from './control';

export default class Editor extends Model {
  parent = tap(REPL, true);
  element = ref(this.init);

  view: EditorView;
  plugin?: Extension;

  init(parent: HTMLElement){
    const extensions = this.plugin;
    const state = EditorState.create({ extensions });
    const view = this.view = new EditorView({ parent, state });

    const releaseFont = 
      this.parent.on("fontSize", () => view.requestMeasure());

    return () => {
      releaseFont();
      view.destroy();
      this.view = undefined;
    }
  }

  getText(){
    return this.view.state.doc.toString();
  }

  setText(to: string){
    this.view.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: to
      }
    })
  }
}

export class InputEditor extends Editor {
  plugin = [
    jsx,
    jsxEditor,
    editor,
    onUpdate(() => this.parent.stale = true),
    onKey("Meta-=", () => this.fontSize(+1)),
    onKey("Meta--", () => this.fontSize(-1)),
    onKey("Meta-s", () => this.save())
  ]

  save(){
    this.parent.input_jsx = this.getText();
  }

  fontSize(by: number){
    this.parent.fontSize += by;
  }

  init(container: HTMLElement){
    const release = super.init(container);
    const releaseUpdate =
      this.parent.once("input_jsx", (text) => {
        this.setText(text);
      })
    
    return () => {
      release();
      releaseUpdate();
    }
  }
}

export class OutputView extends Editor {
  plugin = [ jsx, readOnly ];

  init(container: HTMLElement){
    const release = super.init(container);
    const releaseUpdate =
      this.parent.on("output_jsx", (text) => {
        this.setText(text);
      })
      
    return () => {
      release();
      releaseUpdate();
    }
  }
}