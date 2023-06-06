import { Editor } from 'codemirror/Editor';
import { Col, Row } from 'layout';
import Preview from 'preview/Preview';
import { Fragment } from 'react';

import { InputEditor } from './InputEditor';
import { Main } from './Main';
import { OutputView } from './OutputView';

export const Interface = () => {
  <Row>
    <View type={InputEditor} />
    <Layout />
  </Row>
}

const Layout = () => {
  const { layout } = Main.get();

  switch (layout) {
    case 'columns':
      return (
        <Col>
          <MockOutput />
          <Preview />
        </Col>
      );
    case 'fill':
      return (
        <Fragment>
          <MockOutput />
          <Preview />
        </Fragment>
      );
    case 'view':
      return <Preview />;
    case 'code':
      return <MockOutput />;
  }
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
export const View = ({ type, className }) => {
  const { element } = type.use();

  overflow: hidden;

  <this ref={element} className={className} />
}