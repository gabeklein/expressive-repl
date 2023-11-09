import { Row } from 'components/layout';
import { Fragment } from 'react';

import { InputEditor, OutputView } from './Editors';
import { Preview } from './Preview';

/** @type {React.FC} */
const InputJSX = () => {
  const { element } = InputEditor.use();

  <div ref={element} />
}

/** @type {React.FC} */
const OutputJS = () => {
  const { element } = OutputView.use();

  <div ref={element} />
}

export const Interface = () => {
  <Row>
    <InputJSX />
    <OutputJS />
    <Preview />
  </Row>
}