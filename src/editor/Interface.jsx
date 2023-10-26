import { Col, Row } from 'layout';
import Preview from 'preview/Preview';
import { Fragment } from 'react';

import { InputEditor } from './InputEditor';
import { Main } from './Main';
import { OutputView } from './OutputView';

export const Interface = () => {
  const { layout } = Main.get();

  <Row>
    <InputJSX />
    {layout == "compact" ? (
      <Col>
        <OutputJS />
        <Preview />
      </Col>
    ) : layout == "fill" ? (
      <Fragment>
        <OutputJS />
        <Preview />
      </Fragment>
    ) : layout == "view" ? (
      <Preview />
    ) : (
      layout == "code" && <OutputJS />
    )}
  </Row>
}

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