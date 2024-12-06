import { get } from '@expressive/react';
import { Editor, KeyCode, KeyMod, monaco } from '@local/monaco';

import { Document } from './Document';
import { Main } from './Main';

export class InputEditor extends Editor {
  doc = get(Document);
  main = get(Main);

  onEditor(editor: monaco.IStandaloneCodeEditor) {
    this.model.setValue(this.doc.input);
    editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () => {
      this.doc.build(editor.getValue());
      return null;
    });
  }
}

export class OutputJSX extends Editor {
  doc = get(Document);
  readonly = true;

  onEditor(editor: monaco.IStandaloneCodeEditor) {
    this.doc.get(doc => {
      this.model.setValue(doc.output);
    })
  }
}