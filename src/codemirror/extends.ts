import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { searchKeymap } from '@codemirror/search';
import { Extension } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
import { classHighlighter } from '@lezer/highlight';

import { autoCloseTab, autoElementSplit } from './extend';
import { keyBind } from './helpers';

/** Base plugins for displaying JSX */
export const jsx: Extension[] = [
  syntaxHighlighting(classHighlighter),
  javascript({ jsx: true }),
  lineNumbers()
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