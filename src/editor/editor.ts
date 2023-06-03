import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { get, Model, ref, set } from '@expressive/react';

import { createView, editor, jsx, jsxEditor, metaKey, onUpdate, readOnly } from '../codemirror';
import { REPL } from './control';

export default class Editor extends Model {
  parent = get(REPL);
  element = ref(this.init);

  view = set<EditorView>();
  apply?: Extension;

  init(parent: HTMLElement){
    const view = this.view = createView(parent, {
      extensions: this.apply
    })

    const release = this.parent.get(state => {
      void state.fontSize;
      view.requestMeasure();
    });

    return () => {
      release();
      view.destroy();
      // @ts-ignore
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

  init(container: HTMLElement){
    const done = super.init(container);
    this.setText(this.parent.document.source);
    return done;
  }
}

export class OutputView extends Editor {
  apply = [ jsx, readOnly ];

  init(container: HTMLElement){
    const release = super.init(container);
    const release2 = this.parent.get(({ document }) => {
      this.setText(document.output_jsx);
    })
      
    return () => {
      release();
      release2();
    }
  }
}