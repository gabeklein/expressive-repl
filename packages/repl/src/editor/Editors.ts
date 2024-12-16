import { get } from '@expressive/react';
import { Editor, KeyCode, KeyMod, monaco } from '@local/monaco';

import { Document } from './Document';

const CtrlS = KeyMod.CtrlCmd | KeyCode.KeyS;

export class InputEditor extends Editor {
  doc = get(Document);

  onEditor(editor: monaco.IStandaloneCodeEditor) {
    this.doc.get(doc => { this.text = doc.input });
    editor.addCommand(CtrlS, () => {
      this.doc.build(editor.getValue());
      return null;
    });
  }
}

export class OutputJSX extends Editor {
  doc = get(Document);
  readonly = true;

  onEditor(editor: monaco.IStandaloneCodeEditor) {
    this.doc.get(doc => { this.text = doc.output });
  }
}