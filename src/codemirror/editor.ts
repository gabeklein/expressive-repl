import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import Model, { ref } from '@expressive/mvc';

export function createView(
  parent: HTMLElement, extensions: Extension){

  const state = EditorState.create({ extensions });

  return new EditorView({ parent, state });
}

export default class Editor extends Model {
  view: EditorView;
  plugin?: Extension;

  element = ref(parent => {
    this.view = createView(parent, this.plugin);

    return () => {
      this.view.destroy();
      this.view = undefined;
    }
  })

  getText(){
    return this.view.state.doc.toString();
  }

  setText(to: string){
    if(this.view)
      this.view.dispatch({
        changes: {
          from: 0,
          to: this.view.state.doc.length,
          insert: to
        }
      })
  }
}