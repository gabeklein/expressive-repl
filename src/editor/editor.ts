import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { Model, ref, tap } from '@expressive/mvc';

import { createView, editor, jsx, jsxEditor, onKey, onUpdate, readOnly } from '../codemirror';
import { REPL } from './control';

export default class Editor extends Model {
  parent = tap(REPL, true);
  element = ref(this.init);

  view: EditorView;
  plugin?: Extension;

  init(parent: HTMLElement){
    const view = createView(parent, {
      extensions: this.plugin
    })

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
  plugin = [ jsx, jsxEditor, editor, this.hotkeys() ];

  private hotkeys(){
    return [
      onUpdate(() => this.stale()),
      onKey("Meta-=", () => this.fontSize(+1)),
      onKey("Meta--", () => this.fontSize(-1)),
      onKey("Meta-s", () => this.save())
    ]
  }

  fontSize(by: number){
    this.parent.fontSize += by;
  }

  stale(){
    this.parent.document.stale = true;
  }

  save(){
    this.parent.document.source = this.getText();
  }

  init(container: HTMLElement){
    const release = super.init(container);
    const release2 =
      this.parent.document.once("source", (text) => {
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
      this.parent.document.on("output_jsx", (text) => {
        this.setText(text);
      })
      
    return () => {
      release();
      release2();
    }
  }
}