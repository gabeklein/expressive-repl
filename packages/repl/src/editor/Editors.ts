import Model, { get, ref, set } from '@expressive/react';
import { editor as monaco, KeyMod, KeyCode } from 'monaco-editor';

import 'monaco-editor/min/vs/editor/editor.main.css';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

import { Document } from './Document';
import { Main } from './Main';

monaco.defineTheme('myDarkTheme', {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#1f2328',
  }
});

abstract class Editor extends Model {
  editor: monaco.IStandaloneCodeEditor = set();
  model: monaco.ITextModel = set();
  parent = ref(this.createEditor);
  readonly = false;

  text = "";

  abstract onEditor(editor: monaco.IStandaloneCodeEditor): void

  createEditor(parent: HTMLDivElement) {
    const model = this.model = monaco.createModel("", "javascript");
    const editor = this.editor = monaco.create(parent, {
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      automaticLayout: true,
      readOnly: this.readonly,
      // fontSize: this.fontSize,
      renderLineHighlight: "none",
      lineDecorationsWidth: 5,
      lineNumbersMinChars: 3,
      padding: { top: 15 },
      minimap: {
        enabled: false
      },
      theme: "myDarkTheme",
      scrollbar: {
        vertical: "hidden",
        verticalSliderSize: 0,
        verticalScrollbarSize: 0
      },
      language: "javascript",
      model
    });

    this.onEditor(editor);

    return () => {
      editor.dispose();
    }
  }
}

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