import Model, { has, use } from '@expressive/react';
import { Editor } from '@local/codemirror';

import { Document } from './Document';

declare global {
  interface Window {
    editor: Main;
  }
}

declare namespace Main {
  type Layout = "compact" | "fill" | "code" | "view";
}

class Main extends Model {
  document = use(Document);

  editors = has(Editor, editor => {
    const type = editor.constructor.name;
    const key = type === "InputEditor" ? "input" : "output"
  
    this.document.get(doc => {
      editor.text = doc[key];
    })
  });

  fontSize = 15;
  layout: Main.Layout = "compact";
  options = {
    output: "jsx",
    printStyle: "pretty"
  }
}

export { Main }