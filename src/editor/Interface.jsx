import { Col, Row } from 'layout';
import { Fragment } from 'react';

import { InputEditor, OutputView } from './Editors';
import { Preview } from './Preview';

/** @type {React.FC} */
const OutputJS = () => {
  const { element } = OutputView.use();

  <this ref={element} />
}

/** @type {React.FC} */
const InputJSX = () => {
  const { element } = InputEditor.use();

  <this ref={element} />
}

export const Interface = () => {
  <Row>
    <InputJSX />
    <Col>
      <OutputJS />
      <Preview />
    </Col>
  </Row>
}