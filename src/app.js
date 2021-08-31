import { Provider } from '@expressive/mvc';
import { forwardRef, useMemo, useState } from 'react';

import Control from './codemirror';
import { Col, Row } from './resizable';
import { EditInput, LiveResult, MockOutput } from './components/Editor';

export const App = () => do {
  const { get, layout } = Control.use();

  Row: {
    height: "100vh";
    boxSizing: border-box;
    padding: 10;
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

  <Provider of={get}>
    <Row>
      <EditInput />
      <results />
    </Row>
  </Provider>
}

export default App;