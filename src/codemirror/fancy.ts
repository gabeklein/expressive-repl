import { autocompletion } from '@codemirror/autocomplete';
import { highlightActiveLineGutter, lineNumbers } from '@codemirror/gutter';
import { highlightActiveLine } from '@codemirror/view';

export const autocomplete = [
  autocompletion()
]

export const lines = [
  lineNumbers(),
  highlightActiveLine(),
  highlightActiveLineGutter()
]