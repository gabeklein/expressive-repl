import { InputEditor, OutputView } from './Editor';

const Editor = ({ font, stale }) => {
  forward: ref, className;
  fontSize: `${font}px`;
  overflow: hidden;
  margin: 3;

  <this className={stale && "cm-stale"} />
}

export const EditInput = () => {
  const { element, parent } = InputEditor.use();

  <Editor ref={element} font={parent.fontSize} />
}

export const MockOutput = () => {
  const { element, parent } = OutputView.use();
  const { stale, fontSize } = parent;

  <Editor ref={element} font={fontSize} stale={stale} />
}