import { getIndentation, IndentContext, indentString } from '@codemirror/language';
import { EditorSelection, StateCommand, Text } from '@codemirror/state';

/** Monkeypatched to include JSX tags as indent target. */
export const insertNewlineAndIndentJSX: StateCommand = ({ state, dispatch }): boolean => {
  const notBetweenTags = state.selection.ranges.find(range => 
    state.sliceDoc(range.from - 1, range.to + 1) !== "><"  
  );

  if(notBetweenTags)
    return false;

  let changes = state.changeByRange(({ from, to }) => {
    let cx = new IndentContext(state, {
      simulateBreak: from,
      simulateDoubleBreak: true
    });

    let offset = getIndentation(cx, from);

    if(offset == null){
      const line = state.doc.lineAt(from).text;
      offset = /^\s*/.exec(line)![0].length;
    }

    let line = state.doc.lineAt(from);

    while(to < line.to && /\s/.test(line.text[to - line.from]))
      to++;

    const indent = indentString(state, offset);
    const closing = indentString(state, cx.lineIndent(line.from, -1));
    const insert = Text.of(["", indent, closing]);

    return {
      changes: { from, to, insert },
      range: EditorSelection.cursor(from + 1 + indent.length)
    }
  });

  dispatch(
    state.update(changes, { scrollIntoView: true, userEvent: "input" })
  );

  return true
}