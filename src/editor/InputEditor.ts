import { get } from '@expressive/react';
import { Editor, editor, jsx, cmd, onUpdate } from 'codemirror/Editor';

import { Document } from './Document';
import { Main } from './Main';

export class InputEditor extends Editor {
  main = get(Main);
  doc = get(Document);

  fontSize = get(Main, x => x.fontSize);

  extends = () => {
    const { main, doc } = this;

    return [
      jsx,
      editor,
      cmd("=", () => {
        main.fontSize++;
      }),
      cmd("-", () => {
        main.fontSize--;
      }),
      cmd("s", () => {
        doc.source = this.text;
      }),
      onUpdate(() => {
        doc.stale = true;
      })
    ];
  }

  ready(){
    this.text = this.doc.source;
  }
}

