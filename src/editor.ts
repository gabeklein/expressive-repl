import { editor, KeyCode, KeyMod, languages } from 'monaco-editor';
import Controller, { ref } from "react-use-controller";

const DEFAULTS: editor.IStandaloneEditorConstructionOptions = {
  language: "javascript",
  renderLineHighlight: "none",
  renderIndentGuides: false,
  fontSize: 14,
  glyphMargin: false,
  hideCursorInOverviewRuler: true,
  lineNumbersMinChars: 3,
  lineDecorationsWidth: "15px",
  folding: false,
  automaticLayout: true,
  scrollbar: {
    alwaysConsumeMouseWheel: true,
    vertical: "hidden",
    verticalScrollbarSize: 0
  },
  tabSize: 2,
  minimap: {
    enabled: false
  },
  autoIndent: "full",
  autoClosingBrackets: "always"
}

// languages.setLanguageConfiguration('javascript', {
//   onEnterRules: [
//     {
//       afterText: />/,
//       beforeText: /</,
//       action: {
//         indentAction: 1
//       }
//     }
//   ]
// })

languages.registerCompletionItemProvider('javascript', {
  triggerCharacters: ['>'],
  provideCompletionItems: (model, position) => {
    const codePre: string = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });

    const match = codePre.match(/.*<(\w+)>$/);
    const tag = match && match[1];

    if(!tag)
      return;

    const word = model.getWordUntilPosition(position);

    return {
      suggestions: [
        {
          label: `</${tag}>`,
          kind: languages.CompletionItemKind.EnumMember,
          insertText: `$0</${tag}>`,
          insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range:  {
             startLineNumber: position.lineNumber,
             endLineNumber: position.lineNumber,
             startColumn: word.startColumn,
             endColumn: word.endColumn,
          },
        },
      ]
    };
  },
});

export class Editor extends Controller {
  editorOutput: editor.IStandaloneCodeEditor;
  editorSource: editor.IStandaloneCodeEditor;

  stale = false;

  inputWindow = ref(this.gotInputWindow);
  outputWindow = ref(this.gotOutputWindow);

  gotOutputWindow(e: HTMLElement){
    this.editorOutput = editor.create(e, {
      ...DEFAULTS,
      readOnly: true
    });
  }

  gotInputWindow(e: HTMLElement){
    const CMD_S = KeyMod.CtrlCmd | KeyCode.KEY_S;

    const instance = editor.create(e, {
      ...DEFAULTS,
      language: "javascript"
    });

    this.editorSource = instance;

    instance.onDidChangeModelContent(() => {
      this.stale = true;
    })

    instance.addCommand(CMD_S, () => {
      const source = instance.getValue();
      
      this.stale = false;
      this.editorOutput.setValue(source);
    });
  }
}