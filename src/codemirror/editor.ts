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

  get doc(){
    return this.view.state.doc;
  }

  init(parent: HTMLElement){
    const extensions = this.plugin;
    const state = EditorState.create({ extensions });
    const view = new EditorView({ parent, state });

    const refresh = () => view.requestMeasure();
    const release = this.parent.on("fontSize", refresh);

    this.view = view;

    return () => {
      release();
      view.destroy();
      this.view = undefined;
    }
  }

  getText(){
    return this.doc.toString();
  }

  setText(to: string){
    this.view.dispatch({
      changes: {
        from: 0,
        to: this.doc.length,
        insert: to
      }
    })
  }
}

export class InputEditor extends Editor {
  plugin = [ jsx, jsxEditor, editor, this.hotkeys ];

  private get hotkeys(){
    return [
      onUpdate(() => { this.parent.stale = true }),
      onKey("Meta-=", () => { this.parent.fontSize++ }),
      onKey("Meta--", () => { this.parent.fontSize-- }),
      onKey("Meta-s", () => { this.parent.input_jsx = this.getText() })
    ]
  }

  init(container: HTMLElement){
    const release = super.init(container);
    const release2 =
      this.parent.once("input_jsx", (text) => {
        this.setText(text);
      })
    
    return () => {
      release();
      release2();
    }
  }
}

export class OutputView extends Editor {
  plugin = [ jsx, readOnly ];

  init(container: HTMLElement){
    const release = super.init(container);
    const release2 =
      this.parent.on("output_jsx", (text) => {
        this.setText(text);
      })
      
    return () => {
      release();
      release2();
    }
  }
}