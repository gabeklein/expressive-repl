import { getIndentation, IndentContext, indentString, syntaxTree } from "@codemirror/language"
import { EditorSelection, EditorState, StateCommand, Text } from "@codemirror/state"
import { NodeProp } from "@lezer/common";

function isBetweenBrackets(state: EditorState, pos: number): { from: number, to: number } | null {
  const selection = state.sliceDoc(pos - 1, pos + 1);
  
  // Indent when cursor is between JSX tags.
  if(selection == "><")
    return { from: pos, to: pos }
  
  if(/\(\)|\[\]|\{\}/.test(selection))
    return { from: pos, to: pos }

  const context = syntaxTree(state).resolveInner(pos);
  
  const before = context.childBefore(pos);
  const after = context.childAfter(pos)

  if(before && after && before.to <= pos && after.from >= pos){
    const closedBy = before.type.prop(NodeProp.closedBy);

    if(closedBy && closedBy.indexOf(after.name) > -1){
      const begin = before.to;
      const end = after.from;

      const lineBefore = state.doc.lineAt(begin);
      const lineAfter = state.doc.lineAt(end);

      if(lineBefore.from == lineAfter.from)
        return { from: begin, to: end }
    }
  }

  return null
}

/** Monkeypatched to include JSX tags as indent target. */
export const insertNewlineAndIndent: StateCommand = ({ state, dispatch }): boolean => {
  let changes = state.changeByRange(({ from, to }) => {
    let explode = from == to && isBetweenBrackets(state, from);
    let cx = new IndentContext(state, {
      simulateBreak: from,
      simulateDoubleBreak: !!explode
    });

    let indent = getIndentation(cx, from);

    if(indent == null)
      indent = /^\s*/.exec(state.doc.lineAt(from).text)![0].length;

    let line = state.doc.lineAt(from);

    while(to < line.to && /\s/.test(line.text[to - line.from]))
      to++;

    if(explode)
      ({ from, to } = explode)
    else if(from > line.from && from < line.from + 100 && !/\S/.test(line.text.slice(0, from)))
      from = line.from

    let insert = ["", indentString(state, indent)];

    if(explode)
      insert.push(indentString(state, cx.lineIndent(line.from, -1)));

    return {
      changes: { from, to, insert: Text.of(insert) },
      range: EditorSelection.cursor(from + 1 + insert[1].length)
    }
  });

  dispatch(
    state.update(changes, { scrollIntoView: true, userEvent: "input" })
  );

  return true
}