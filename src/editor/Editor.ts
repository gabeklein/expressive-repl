import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { get, Model, ref, set } from '@expressive/react';

import { createView, editor, jsx, jsxEditor, metaKey, onUpdate, readOnly } from '../codemirror';
import { REPL } from './REPL';

export abstract class Editor extends Model {
  abstract extensions: Extension;

  parent = get(REPL);
  editor = set<EditorView>();
  element = ref(this.initialize);

  initialize(parent: HTMLElement){
    const editor = createView(parent, {
      extensions: this.extensions
    });

    const release = this.parent.get(state => {
      void state.fontSize;
      editor.requestMeasure();
    });

    this.editor = editor;

    return () => {
      release();
      editor.destroy();
    }
  }

  getText(){
    return this.editor.state.doc.toString();
  }

  setText(to: string){
    this.editor.dispatch({
      changes: {
        from: 0,
        to: this.editor.state.doc.length,
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
      this.parent.document.source = this.getText();
    }),
    onUpdate(() => {
      this.parent.document.stale = true;
    })
  ];

  initialize(container: HTMLElement){
    const done = super.initialize(container);
    this.setText(this.parent.document.source);
    return done;
  }
}

export class OutputView extends Editor {
  extensions = [ jsx, readOnly ];

  initialize(container: HTMLElement){
    const release = super.initialize(container);
    const release2 = this.parent.get(({ document }) => {
      this.setText(document.output_jsx);
    })
      
    return () => {
      release();
      release2();
    }
  }
}