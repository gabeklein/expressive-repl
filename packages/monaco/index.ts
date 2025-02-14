import Model, { ref, set } from '@expressive/react';
import { editor as monaco } from 'monaco-editor';

import 'monaco-editor/min/vs/editor/editor.main.css';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

export { editor as monaco, KeyMod, KeyCode } from 'monaco-editor';

monaco.defineTheme('myDarkTheme', {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#1f2328',
  }
});

export abstract class Editor extends Model {
  editor = set(undefined, this.onEditor);
  model = set<monaco.ITextModel>();
  parent = ref(this.createEditor);
  readonly = false;

  get text() {
    return this.model.getValue();
  }

  set text(value: string) {
    if(this.text !== value)
      this.model.setValue(value);
  }

  protected onEditor?(editor: monaco.IStandaloneCodeEditor): void

  protected createEditor(parent: HTMLDivElement) {
    const model = this.model = monaco.createModel("", "javascript");
    const editor = this.editor = monaco.create(parent, {
      model,
      theme: "myDarkTheme",
      language: "javascript",
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      automaticLayout: true,
      readOnly: this.readonly,
      renderLineHighlight: "none",
      lineDecorationsWidth: 5,
      lineNumbersMinChars: 3,
      padding: {
        top: 15
      },
      minimap: {
        enabled: false
      },
      scrollbar: {
        vertical: "hidden",
        verticalSliderSize: 0,
        verticalScrollbarSize: 0
      }
    });

    return () => {
      editor.dispose();
    }
  }
}