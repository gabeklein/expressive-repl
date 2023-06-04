import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { get, Model, ref, set } from '@expressive/react';

import { createView, editor, jsx, jsxEditor, metaKey, onUpdate, readOnly } from '../codemirror';
import { Main } from './Main';

export abstract class Editor extends Model {
  abstract extensions: Extension;

  protected init?(parent: HTMLElement): (() => void) | void;

  parent = get(Main);

  view = set<EditorView>();

  element = ref(e => {
    const view = this.view = createView(e, {
      extensions: this.extensions
    });

    const done = this.init && this.init(e);
    const release = this.parent.get(state => {
      void state.fontSize;
      view.requestMeasure();
    });

    return () => {
      release();
      if(done) done();
      view.destroy();
    }
  });

  get text(){
    return this.view.state.doc.toString();
  }

  set text(to: string){
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
  extensions = [
    jsx,
    jsxEditor,
    editor,
    metaKey("=", () => {
      this.parent.fontSize++;
    }),
    metaKey("-", () => {
      this.parent.fontSize--;
    }),
    metaKey("s", () => {
      this.parent.document.source = this.text;
    }),
    onUpdate(() => {
      this.parent.document.stale = true;
    })
  ];

  init(){
    this.text = this.parent.document.source;
  }
}

export class OutputView extends Editor {
  extensions = [ jsx, readOnly ];

  init(){
    return this.parent.get(repl => {
      this.text = repl.document.output_jsx;
    })
  }
}