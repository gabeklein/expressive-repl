import { Fragment } from 'react';

import { Col, Row } from '../layout';
import Preview from '../preview/Preview';
import { InputEditor, OutputView } from './Editor';
import { REPL } from './REPL';
import { View } from './View';

export { REPL };

export const Interface = (props) => {
  const { layout } = REPL.get();

  <Row {...props}>
    <EditInput />
    {layout == "compact" ? (
      <Col>
        <MockOutput />
        <Preview />
      </Col>
    ) : layout == "fill" ? (
      <Fragment>
        <MockOutput />
        <Preview />
      </Fragment>
    ) : layout == "view" ? (
      <Preview />
    ) : (
      layout == "code" && <MockOutput />
    )}
  </Row>
}

/** @type {React.FC} */
const EditInput = () => {
  <View type={InputEditor} />
}

/** @type {React.FC} */
const MockOutput = () => {
  <View type={OutputView} />
}