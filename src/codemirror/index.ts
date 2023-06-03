import './editor-light.css';
import './editor.css';

import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { searchKeymap } from '@codemirror/search';
import { EditorState, EditorStateConfig, Extension } from '@codemirror/state';
import { drawSelection, EditorView, lineNumbers } from '@codemirror/view';
import { classHighlighter } from '@lezer/highlight';

import { autoCloseTab, autoElementSplit } from './extensions';
import { keyBind } from './helpers';

export * from './helpers';

export function createView(
  container: HTMLElement,
  config?: EditorStateConfig){

  const state = EditorState.create(config);
  return new EditorView({ parent: container, state });
}

/** Base plugins for displaying JSX */
export const jsx: Extension[] = [
  syntaxHighlighting(classHighlighter),
  javascript({ jsx: true }),
  lineNumbers(),
  drawSelection()
]

/** Set editor to read-only */
export const readOnly = [
  EditorView.editable.of(false)
]

/** Custom JSX editor shortcuts */
export const jsxEditor = [
  autoCloseTab(),
  autoElementSplit()
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
    indentWithTab
  )
]