import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import Model, { on, ref } from '@expressive/mvc';

export default class Editor extends Model {
  view: EditorView;
  plugin?: Extension;

  element = ref(parent => {
    const state = EditorState.create({
      extensions: this.plugin
    });

    this.view = new EditorView({ parent, state });

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