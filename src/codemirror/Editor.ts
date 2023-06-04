import { Model, ref, set } from '@expressive/react';
import './editor-light.css';
import './editor.css';

import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

export * from './helpers';
export * from './extends';

export abstract class Editor extends Model {
  abstract extends: Extension;

  protected abstract ready(): (() => void) | void;

  view = set<EditorView>();

  element = ref(parent => {
    const state = EditorState.create({ extensions: this.extends });
    const view = this.view = new EditorView({ parent, state });
    const done = this.ready();

    return () => {
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