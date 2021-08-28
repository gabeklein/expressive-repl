import './styles.css';

import { Provider } from '@expressive/mvc';
import { forwardRef, useMemo, useState } from 'react';

import REPL from './codemirror';
import { EditInput, LiveResult, MockOutput } from './components/Editor'

App: {
  height: "100vh";
  display: flex;
  flexDirection: column;
  boxSizing: border-box;
  fontFamily: "Lato";
  padding: 5, 10;
}

column: {
  display: flex;
  flexDirection: column;
  flex: 1;
}

row: {
  display: flex;
  flexDirection: row;
  flex: 1;
}

const App = () => do {
  const controller = REPL.use();

  <Provider of={controller}>
    <row>
      <EditInput />
      <column>
        <MockOutput />
        <LiveResult />
      </column>
    </row>
  </Provider>
}

export default App;