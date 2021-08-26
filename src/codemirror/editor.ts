import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import Model, { ref } from '@expressive/mvc';

export default class Editor extends Model {
  view: EditorView;
  plugin?: Extension;

  element = ref(parent => {
    const state = EditorState.create({ extensions: this.plugin });
    const view = this.view = new EditorView({ parent, state });

    return () => {
      view.destroy();
      this.view = undefined;
    }
  });

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