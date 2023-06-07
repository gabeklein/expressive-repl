import { getIndentation, IndentContext, indentString } from '@codemirror/language';
import { EditorSelection, EditorState, Text, Transaction } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { keyBind } from './helpers';

/**
 * Input handler will auto-close a JSX tag when '>' is typed.
 */
export const autoCloseTab = () =>
  EditorView.inputHandler.of(insertClosingTag);

/**
 * Key command will line-split and indent, if cursor is between '>' and '<'.
 */
export const autoElementSplit = () => keyBind({
  key: "Enter",
  run: insertNewlineAndIndentJSX
})

function insertClosingTag(
  view: EditorView,
  from: number,
  to: number,
  inserted: string){

  const { doc } = view.state;
  
  if(inserted !== ">")
    return false;
  
  const { text } = doc.lineAt(from);
  const tagName = /<([a-zA-Z-]+)$/.exec(text);

  if(!tagName)
    return false;

  const insert = `></${tagName[1]}>`;

  view.dispatch({
    changes: { from, to, insert },
    selection: { anchor: from + 1 }
  })

  return true;
}

type CommandTarget = {
  state: EditorState;
  dispatch: (transaction: Transaction) => void;
}

/**
 * Key command will line-split and indent, if cursor is between '>' and '<'.
 */
function insertNewlineAndIndentJSX(target: CommandTarget){
  const { state } = target;

  const notBetweenTags = state.selection.ranges.find(range => 
    state.sliceDoc(range.from - 1, range.to + 1) !== "><"  
  );

  if(notBetweenTags)
    return false;

  const changes = state.changeByRange(({ from, to }) => {
    const cx = new IndentContext(state, {
      simulateBreak: from,
      simulateDoubleBreak: true
    });

    let offset = getIndentation(cx, from);

    if(offset == null){
      const line = state.doc.lineAt(from).text;
      offset = /^\s*/.exec(line)![0].length;
    }

    const line = state.doc.lineAt(from);

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

  target.dispatch(
    state.update(changes, {
      scrollIntoView: true,
      userEvent: "input"
    })
  );

  return true
}