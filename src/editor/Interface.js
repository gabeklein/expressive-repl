import { Editor } from 'codemirror/Editor';
import { Col, Row } from 'layout';
import Preview from 'preview/Preview';
import { Fragment } from 'react';

import { InputEditor } from './InputEditor';
import { Main } from './Main';
import { OutputView } from './OutputView';

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

/**
 * @type {React.FC<{
 *   type: typeof Editor;
 *   className?: string;
 * }>}
 **/
export const View = ({ type }) => {
  const {
    element,
    main: {
      fontSize
    }
  } = type.use();

  forward: className;
  fontSize: `${fontSize}px`;
  overflow: hidden;

  <this ref={element} />
}