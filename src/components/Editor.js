import { Provider } from '@expressive/mvc';

import SaveOverlay from './SaveOverlay';
import { useEvalComponent } from '../transform';
import REPL from '../codemirror';

portal: {
  position: relative;
  overflow: hidden;
  margin: 8;
  radius: 8;
  background: 0xF7F7F7;
  border: 0xddd;
  font: 14;
  padding: 20;
  flex: 1;
}

export const EditInput = () => do {
  const { input } = REPL.tap();
  
  <portal ref={input.element} />
}

export const MockOutput = () => do {
  const { output, stale, compile } = REPL.tap();

  <portal ref={output.element}>
    <SaveOverlay active={stale} onClick={compile} />
  </portal>
}

export const LiveResult = () => do {
  const { output_js } = REPL.tap();
  const Preview = useEvalComponent(output_js);

  flex: 1;
  flexAlign: center;
  border: dashed, 2, 0xccc;
  margin: 8;
  radius: 8;

  err: {
    color: 0xaaa;
    fontSize: 0.7, em;
  }

  if(Preview)
    <Preview />
  else
    <err>Forget to export something?</err>
}