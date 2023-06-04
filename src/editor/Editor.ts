import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { get, Model, ref, set } from '@expressive/react';

import { createView, editor, jsx, jsxEditor, metaKey, onUpdate, readOnly } from '../codemirror';
import { Main } from './Main';
import { Document } from './Document';

export abstract class Editor extends Model {
  abstract extensions: Extension;
  protected abstract ready(): (() => void) | void;

  parent = get(Main);
  document = get(Document);

  view = set<EditorView>();

  element = ref(e => {
    const view = this.view = createView(e, {
      extensions: this.extensions
    });

    const done = this.ready();
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
      this.document.source = this.text;
    }),
    onUpdate(() => {
      this.document.stale = true;
    })
  ];

  ready(){
    this.text = this.document.source;
  }
}

export class OutputView extends Editor {
  extensions = [ jsx, readOnly ];

  ready(){
    return this.parent.document.get($ => {
      this.text = $.output_jsx;
    })
  }
}