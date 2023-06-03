import { Fragment } from 'react';
import { Col, Row } from '../layout';
import Preview from '../preview/Preview';
import { EditInput, MockOutput } from './components';
import { REPL } from './control';

export { REPL };

export const Interface = () => {
  const { layout } = REPL.get();

  Row: {
    forward: className;
  }

  <Row>
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