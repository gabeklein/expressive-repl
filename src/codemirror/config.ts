import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { commentKeymap } from '@codemirror/comment';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { history, historyKeymap } from '@codemirror/history';
import { javascript } from '@codemirror/lang-javascript';
import { indentOnInput } from '@codemirror/language';
import { searchKeymap } from '@codemirror/search';
import { EditorState, Extension } from '@codemirror/state';
import { drawSelection, EditorView, KeyBinding, keymap } from '@codemirror/view';

type KeyBindings = KeyBinding | readonly KeyBinding[];

export function keyBind(...args: KeyBindings[]){
  return keymap.of([].concat(...args));
}

export const jsx = [
    defaultHighlightStyle.fallback,
    javascript({ jsx: true }),
    drawSelection()
]

export const readOnly = [
  EditorView.editable.of(false)
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