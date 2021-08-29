import './styles.css';

import { Provider } from '@expressive/mvc';
import { forwardRef, useMemo, useState } from 'react';

import REPL from './codemirror';
import { Col, Row } from './components';
import { EditInput, LiveResult, MockOutput } from './components/Editor';

const App = () => do {
  const { get: controller, layout } = REPL.use();

  height: "100vh";
  display: flex;
  flexDirection: row;
  boxSizing: border-box;
  fontFamily: "Lato";
  padding: 5, 10;

  <Provider of={controller}>
    <Row>
      <EditInput />
      <Interface layout={layout} />
    </Row>
  </Provider>
}

const Interface = ({ layout }) => do {
  if(layout == "compact")
    <Col>
      <LiveResult />
      <MockOutput />
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

export default App;