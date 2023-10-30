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

  get text(){
    return this.view.state.doc.toString();
  }

  set text(content: string){
    if(this.text === content)
      return;

    this.view.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: content
      }
    })
  }

  protected abstract onReady(): (() => void) | void;
  protected abstract extends(): Extension;

  protected createEditor(parent: HTMLDivElement){
    const state = EditorState.create({ extensions: this.extends() });
    const view = this.view = new EditorView({ parent, state });

    const d1 = this.onReady();
    const d2 = this.main.get(({ fontSize }) => {
      parent.style.fontSize = fontSize + "px";
      view.requestMeasure();
    });

    return () => {
      d2();
      d1 && d1();
      view.destroy();
    }
  }
}