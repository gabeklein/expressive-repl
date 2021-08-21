import { editor } from 'monaco-editor';

export * from "monaco-editor";

export type Options = editor.IStandaloneEditorConstructionOptions;
export type Editor = editor.IStandaloneCodeEditor;

const DEFAULTS: Options = {
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

export function createEditor(into: HTMLElement, opts?: Options){
  return editor.create(into, { ...DEFAULTS, ...opts });
}