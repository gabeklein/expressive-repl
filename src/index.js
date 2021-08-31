import './styles.css';

import { Provider } from '@expressive/mvc';
import { forwardRef, useMemo, useState } from 'react';

import Control from './codemirror';
import { EditInput, LiveResult, MockOutput } from './components/Editor';
import { Column, Row } from './resizable';

const App = () => do {
  const { get, layout } = Control.use();

  height: "100vh";
  display: grid;
  boxSizing: border-box;
  padding: 10;

  <Provider of={get}>
    <Row>
      <EditInput />
      <Interface layout={layout} />
    </Row>
  </Provider>
}

const Interface = ({ layout }) => do {
  if(layout == "compact")
    <Column>
      <MockOutput />
      <LiveResult />
    </Column>
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