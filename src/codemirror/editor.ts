import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import Model, { ref } from '@expressive/mvc';

export function createView(
  element: HTMLElement,
  plugins: Extension){

  const state = EditorState.create({
    extensions: plugins
  });

  return new EditorView({
    parent: element, state
  });
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
    this.view.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: to
      }
    })
  }
}