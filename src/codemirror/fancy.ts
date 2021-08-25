import { autocompletion } from '@codemirror/autocomplete';
import { foldGutter } from '@codemirror/fold';
import { highlightActiveLineGutter, lineNumbers } from '@codemirror/gutter';
import { bracketMatching } from '@codemirror/matchbrackets';
import { highlightSelectionMatches } from '@codemirror/search';
import { EditorState } from '@codemirror/state';
import { highlightActiveLine, highlightSpecialChars } from '@codemirror/view';

export const fancy = [
  EditorState.allowMultipleSelections.of(true),
  highlightSelectionMatches(),
  bracketMatching(),
  highlightSpecialChars(),
  autocompletion()
]

export const lines = [
  foldGutter(),
  lineNumbers(),
  highlightActiveLine(),
  highlightActiveLineGutter()
]