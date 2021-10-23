import './editor-light.css';
import './editor.css';

import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { commentKeymap } from '@codemirror/comment';
import { lineNumbers } from '@codemirror/gutter';
import { classHighlightStyle } from '@codemirror/highlight';
import { history, historyKeymap } from '@codemirror/history';
import { javascript } from '@codemirror/lang-javascript';
import { indentOnInput } from '@codemirror/language';
import { searchKeymap } from '@codemirror/search';
import { EditorState, EditorStateConfig } from '@codemirror/state';
import { drawSelection, EditorView } from '@codemirror/view';

import { keyBind } from './helpers';
import { autoCloseTab, autoElementSplit } from './extensions';

export * from './helpers';

export function createView(
  container: HTMLElement,
  config?: EditorStateConfig){

  const state = EditorState.create(config);
  return new EditorView({ parent: container, state });
}

/** Base plugins for displaying JSX */
export const jsx = [
  classHighlightStyle,
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
    commentKeymap,
    indentWithTab
  )
]