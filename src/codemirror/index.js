import { EditInput, LiveResult, MockOutput } from './components';
import { Col, Row } from '@expressive/layout';

export { REPL } from "./control";

export const Interface = ({ layout }) => do {
  Row: {
    forward: className;
  }

  results: {
    if(layout == "compact")
      <Col>
        <MockOutput />
        <LiveResult />
      </Col>
    else if(layout == "fill")
      <this>
        <MockOutput />
        <LiveResult />
      </this>
    else if(layout == "view")
      <LiveResult />
    else if(layout == "code")
      <EditInput />
  }

  <Row>
    <EditInput />
    <results />
  </Row>
}