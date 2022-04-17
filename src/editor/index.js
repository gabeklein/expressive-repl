import { Col, Row } from '@expressive/layout';

import { EditInput, LiveResult, MockOutput } from './components';

export { REPL } from "./control";

export const Interface = () => {
  const layout = "compact";
  const View =
    layout == "compact" ? Columns :
    layout == "fill" ? Fill :
    layout == "view" ? LiveResult :
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
    <LiveResult />
  </this>
}

export const Columns = () => {
  <Col>
    <MockOutput />
    <LiveResult />
  </Col>
}