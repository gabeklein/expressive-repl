import './styles.css';

import { Provider } from '@expressive/mvc';
import { forwardRef, useMemo, useState } from 'react';

import REPL from './codemirror';
import { Col, Row } from './components'
import { EditInput, LiveResult, MockOutput } from './components/Editor'

const App = () => do {
  const controller = REPL.use();

  height: "100vh";
  display: flex;
  flexDirection: column;
  boxSizing: border-box;
  fontFamily: "Lato";
  padding: 5, 10;

  <Provider of={controller}>
    <Row>
      <EditInput />
      <Col>
        <MockOutput />
        <LiveResult />
      </Col>
    </Row>
  </Provider>
}

export default App;