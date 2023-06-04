import { Fragment } from 'react';

import { Col, Row } from '../layout';
import Preview from '../preview/Preview';
import { InputEditor, OutputView } from './Editor';
import { Main } from './Main';
import { View } from './View';

export const Interface = () => {
  const { layout } = Main.get();

  <Row>
    <View type={InputEditor} />
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
const MockOutput = () => {
  <View type={OutputView} />
}