import { autocompletion } from '@codemirror/autocomplete';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { commentKeymap } from '@codemirror/comment';
import { highlightActiveLineGutter, lineNumbers } from '@codemirror/gutter';
import { classHighlightStyle } from '@codemirror/highlight';
import { history, historyKeymap } from '@codemirror/history';
import { javascript } from '@codemirror/lang-javascript';
import { indentOnInput } from '@codemirror/language';
import { searchKeymap } from '@codemirror/search';
import { EditorState, Extension } from '@codemirror/state';
import { drawSelection, EditorView, highlightActiveLine, KeyBinding, keymap } from '@codemirror/view';

export const jsx = [
  classHighlightStyle,
  javascript({ jsx: true }),
  drawSelection()
]

export const readOnly = [
  EditorView.editable.of(false)
]

export const autocomplete = [
  autocompletion()
]

export const lines = [
  lineNumbers(),
  highlightActiveLine(),
  highlightActiveLineGutter()
]

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

export function keyBind(...args: KeyBindings[]){
  return keymap.of([].concat(...args));
}

export function onKey<T extends string>(
  key: T, action: (key: T) => void){

  return keyBind({
    key,
    run(){
      action(key);
      return true
    }
  });
}

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