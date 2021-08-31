import { Provider } from '@expressive/mvc';
import { forwardRef, useMemo, useState } from 'react';

import Control from './codemirror';
import { Col, Row, Layout } from './resizable';
import { EditInput, LiveResult, MockOutput } from './components/Editor';

export default () => do {
  const { get, layout } = Control.use();

  Layout: {
    height: "100vh";
    boxSizing: border-box;
    padding: 10;
  }

  <Provider of={get}>
    <Layout as="row">
      <EditInput />
      <Interface layout={layout} />
    </Layout>
  </Provider>
}

const Interface = ({ layout }) => do {
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