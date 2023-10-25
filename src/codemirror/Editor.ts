import './editor-dark.css';
import './editor.css';

import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { get, Model, ref, set } from '@expressive/react';
import { Main } from 'editor/Main';

export * from './helpers';
export * from './extends';

export abstract class Editor extends Model {
  main = get(Main);
  view = set<EditorView>();
  element = ref(this.createEditor);

  protected abstract ready(): (() => void) | void;
  protected abstract extends(): Extension;

  protected createEditor(parent: HTMLDivElement){
    const state = EditorState.create({ extensions: this.extends() });
    const view = this.view = new EditorView({ parent, state });
    const done = this.ready();
    const release = this.main.get(({ fontSize }) => {
      parent.style.fontSize = fontSize + "px";
      view.requestMeasure();
    });

    return () => {
      release();
      if(done) done();
      view.destroy();
    }
  }

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