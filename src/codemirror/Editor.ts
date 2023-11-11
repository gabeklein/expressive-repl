import './editor-dark.css';
import './editor.css';

import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { get, Model, ref, set } from '@expressive/react';
import { Main } from 'editor/Main';

export * from './helpers';
export * from './extends';

const INTERNAL = Symbol("INTERNAL");

export abstract class Editor extends Model {
  main = get(Main);
  view = set<EditorView>();
  element = ref(this.createEditor);

  text = "";

  onReady?(): (() => void) | void;
  protected abstract extends(): Extension;

  protected createEditor(parent: HTMLDivElement){
    // inlclue extension which will watch for updates to state
    const state = EditorState.create({
      extensions: [
        this.extends(),
        EditorView.updateListener.of(update => {
          if(update.docChanged){
            this.text = update.state.doc.toString();
            this.set(INTERNAL);
          }
        })
      ]
    });

    const view = this.view = new EditorView({ parent, state });

    const done1 = this.onReady && this.onReady();
    const done2 = this.main.get(({ fontSize }) => {
      parent.style.fontSize = fontSize + "px";
      view.requestMeasure();
    });
    const done3 = this.get(({ text }, update) => {
      if(!update.has(INTERNAL))
        view.dispatch({
          changes: {
            from: 0,
            to: view.state.doc.length,
            insert: text
          }
        });
    });

    return () => {
      done3();
      done2();
      done1 && done1();
      view.destroy();
    }
  }
}