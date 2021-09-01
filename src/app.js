import { Provider } from '@expressive/mvc';

import { Interface, REPL } from './codemirror';

export const App = () => do {
  const { get, layout } = REPL.use();

  Interface: {
    height: "100vh";
    boxSizing: border-box;
    padding: 10;
  }

  <Provider of={get}>
    <Interface layout={layout} />
  </Provider>
}

export default App;