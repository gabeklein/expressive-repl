import { get } from '@expressive/react';
import { Editor, KeyCode, KeyMod, monaco } from '@local/monaco';

import { Document } from './Document';

const CtrlS = KeyMod.CtrlCmd | KeyCode.KeyS;

export class InputEditor extends Editor {
  doc = get(Document, doc => {
    this.text = doc.input;
  });

  onEditor(editor: monaco.IStandaloneCodeEditor) {
    editor.addCommand(CtrlS, () => {
      this.doc.build(editor.getValue());
      return null;
    });
  }
}

export class OutputJSX extends Editor {
  readonly = true;

  doc = get(Document, doc => {
    this.text = doc.output;
  });
}