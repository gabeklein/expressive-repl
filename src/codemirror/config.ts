import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { commentKeymap } from '@codemirror/comment';
import { lineNumbers } from '@codemirror/gutter';
import { classHighlightStyle } from '@codemirror/highlight';
import { history, historyKeymap } from '@codemirror/history';
import { javascript } from '@codemirror/lang-javascript';
import { indentOnInput } from '@codemirror/language';
import { searchKeymap } from '@codemirror/search';
import { EditorState, Extension } from '@codemirror/state';
import { drawSelection, EditorView, KeyBinding, keymap } from '@codemirror/view';
import { insertClosingTag, insertNewlineAndIndentJSX } from './jsx';

/** JSX view plugins */
export const jsx = [
  classHighlightStyle,
  javascript({ jsx: true }),
  drawSelection()
]

/** Set editor to read-only */
export const readOnly = [
  EditorView.editable.of(false)
]

/** Display lines-numbers */
export const lines = [
  lineNumbers()
]

/** Custom JSX editor shortcuts */
export const jsxEditor = [
  EditorView.inputHandler.of(insertClosingTag),
  keyBind({
    key: "Enter",
    run: insertNewlineAndIndentJSX
  }),
]

/** Default editor extensions */
export const editor = [
  history(),
  indentOnInput(),
  closeBrackets(),
  keyBind(
    closeBracketsKeymap,
    defaultKeymap,
    searchKeymap,
    historyKeymap,
    commentKeymap,
    indentWithTab
  )
]

type KeyBindings = KeyBinding | readonly KeyBinding[];

/** Register keymap helper */
export function keyBind(...args: KeyBindings[]){
  return keymap.of([].concat(...args));
}

/** Callback on specified keyboard event. */
export function onKey<T extends string>(
  key: T, action: (key: T) => boolean | void){

  return keyBind({
    key, run: () => action(key) !== false
  });
}

/** Callback on document update. */
export function onUpdate(callback: () => void){
  return EditorView.updateListener.of((update) => {
    if(update.docChanged)
      callback();
  })
}

export function createEditor(
  element: HTMLElement, extensions: Extension[] = []){

  return new EditorView({
    parent: element,
    state: EditorState.create({ extensions })
  });
}