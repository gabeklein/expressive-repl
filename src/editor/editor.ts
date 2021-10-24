import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { Model, ref, tap } from '@expressive/mvc';

import { createView, editor, jsx, jsxEditor, onKey, onUpdate, readOnly } from '../codemirror';
import { REPL } from './control';

export default class Editor extends Model {
  parent = tap(REPL, true);
  element = ref(this.init);

  view: EditorView;
  apply?: Extension;

  init(parent: HTMLElement){
    const view = this.view = createView(parent, {
      extensions: this.apply
    })

    const rerender = () => view.requestMeasure();
    const release = this.parent.on("fontSize", rerender);

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
  apply = [
    jsx,
    jsxEditor,
    editor,
    onUpdate(() => this.stale()),
    onKey("Meta-s", () => this.save()),
    onKey("Ctrl-s", () => this.save()),
    onKey("Meta-=", () => { this.parent.fontSize++ }),
    onKey("Meta--", () => { this.parent.fontSize-- })
  ];

  stale(){
    this.parent.document.stale = true;
  }

  save(){
    this.parent.document.source = this.getText();
  }

  init(container: HTMLElement){
    try {
      return super.init(container);
    }
    finally {
      this.setText(this.parent.document.source);
    }
  }
}

export class OutputView extends Editor {
  apply = [ jsx, readOnly ];

  init(container: HTMLElement){
    const release = super.init(container);
    const release2 = this.parent.effect(state => {
      this.setText(state.document.output_jsx);
    })
      
    return () => {
      release();
      release2();
    }
  }
}