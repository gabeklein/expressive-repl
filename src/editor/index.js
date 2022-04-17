import { Col, Row } from '@expressive/layout';

import Preview from '../preview/Preview';
import { EditInput, MockOutput } from './components';

export { REPL } from "./control";

export const Interface = () => {
  const layout = "compact";
  const View =
    layout == "compact" ? Columns :
    layout == "fill" ? Fill :
    layout == "view" ? Preview :
    layout == "code" ? MockOutput : null;

  Row: {
    forward: className;
  }

  <Row>
    <EditInput />
    <View />
  </Row>
}

export const Fill = () => {
  <this>
    <MockOutput />
    <Preview />
  </this>
}

export const Columns = () => {
  <Col>
    <MockOutput />
    <Preview />
  </Col>
}